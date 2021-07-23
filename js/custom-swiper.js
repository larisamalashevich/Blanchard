function duplicateDropDecorator(functor, delay=10){
    let lastCall = 0;
    return function(){
      const now = +new Date()
      if(now >= lastCall + delay){
        lastCall = now
        functor.apply(this, arguments)
      }
    }
  }

  function throttle(functor, delay){
    let lastCall = 0;
    let args = null;
    let context = null;
    let timeout = null;

    return function(){
      const now = +new Date()
      if(now >= lastCall + delay){
        lastCall = now
        functor.apply(this, arguments)
      }else{
        lastCall = now
        args = arguments
        context = this

        if(!timeout){
          timeout = setTimeout(() => {
            timeout = null
            functor.apply(context, args)
          }, delay)
        }
      }
    }
  }


  const SWIPER_MULTIPLYER = 0.5; //часть пути, которую необходимо пройти пальцу, чтобы свайп защитался

  function CustomSwiper(selector, props){
    this.element = document.querySelector(selector)

    this.wrapperElement = this.element.querySelector('.custom-swiper-wrapper')
    
    this.slideSelector = '.custom-swiper-slide'
    if(props.pagination)
    {
      this.paginationElement = document.querySelector(props.pagination.el)
      this.pagination = {
          type : props.pagination.type
      }
    }

    const defaultSizes = {
        spaceBetween : props.spaceBetween || 0,
        slidesPerView: props.slidesPerView || 1,
        slidesPerColumn: props.slidesPerColumn || 1,
        slidesPerGroup : props.slidesPerGroup || 1
      }

    this.currentBreakpoint = null;
    this.breakpoints = Object.entries(props.breakpoints).concat([[-1, defaultSizes]]).map(([key, value]) => ({
      minWidth : + key,
      params : value
    })).sort((a,b) => b.minWidth - a.minWidth)
    

    this.sizes = defaultSizes

    this.slide = 0
    if(props.navigation)
    {
      this.initNavigation(props.navigation)
    }
    
    
    this.update()
    this.onWindowResize()

    window.addEventListener('resize', () => this.onWindowResize())

    this.wrapperElement.addEventListener('pointerdown' , (event) => this.onTouchStart(event))

    this.wrapperElement.addEventListener('pointerup' , (event) => this.onTouchEnd(event, 'up'))
    this.wrapperElement.addEventListener('pointercancel' , (event) => this.onTouchEnd(event, 'cansel'))
    this.wrapperElement.addEventListener('pointerout' , (event) => this.onTouchEnd(event, 'out'))

    this.wrapperElement.addEventListener('pointermove' , (event) => this.onTouchMove(event))
  }
  CustomSwiper.prototype.onSwap = function(event){
    console.log(event.detail)
  }
  
  const positionExtractor = (event) => event.clientX

  CustomSwiper.prototype.onTouchStart = function(event){
    event.preventDefault();
    this.wrapperElement.setPointerCapture(event.pointerId)
    this.wrapperElement.style.transition = "none"

    this.moveAnchor = {
      startPosition : positionExtractor(event),
      startSlide : this.slide,
      baseWrapperTransform : this.wrapperElement.style.transform || '',
    }

  }

  CustomSwiper.prototype.onTouchEnd = function(event, reason){
  
    if(this.moveAnchor){
      this.wrapperElement.releasePointerCapture(event.pointerId)

      const columnWidth = this.wrapperElement.getBoundingClientRect().width / this.fullColumnsCount
      
      if(columnWidth * this.sizes.slidesPerGroup * SWIPER_MULTIPLYER < Math.abs(this.moveAnchor.endPosition - this.moveAnchor.startPosition)){
        this.slidePage((this.moveAnchor.endPosition > this.moveAnchor.startPosition ? -1 : 1) * Math.ceil(Math.abs(this.moveAnchor.endPosition - this.moveAnchor.startPosition) / (columnWidth * this.sizes.slidesPerGroup)))

        this.moveAnchor.startPosition = this.moveAnchor.endPosition
        this.moveAnchor.baseWrapperTransform = this.wrapperElement.style.transform || ''
      }
      
      this.wrapperElement.style.transition = null
      
      this.wrapperElement.style.transform = this.moveAnchor.baseWrapperTransform
      this.moveAnchor = null
    }
  }

  CustomSwiper.prototype.onTouchMove = throttle(function(event){
    event.preventDefault();
    if(this.moveAnchor){
      const currentPostion = positionExtractor(event)
      this.wrapperElement.style.transform = this.moveAnchor.baseWrapperTransform + ` translate3d(${currentPostion - this.moveAnchor.startPosition}px, 0, 0)`
      this.moveAnchor.endPosition = currentPostion


    }
  }, 10)

  CustomSwiper.prototype.onWindowResize = throttle(function(){
    const width = document.documentElement.clientWidth
    const breakpoint = this.breakpoints.find(breakpoint => breakpoint.minWidth <= width)
    if(this.currentBreakpoint != breakpoint.minWidth){
      

      this.currentBreakpoint = breakpoint.minWidth
      this.sizes = {...this.sizes, ...breakpoint.params}
      this.updateSizes()
    }

  }, 100)


  CustomSwiper.prototype.updateSizes = throttle(function(){
    console.log(this.sizes)

    const columnsCount = Math.ceil(this.slides.length / this.sizes.slidesPerColumn)
    this.pages = Math.ceil(columnsCount / this.sizes.slidesPerGroup)

    const fullSlidesCount = Math.ceil(columnsCount / this.sizes.slidesPerView)
    this.fullColumnsCount = fullSlidesCount * this.sizes.slidesPerView

    const slideHeight = `calc((100% - ${this.sizes.spaceBetween * (this.sizes.slidesPerColumn - 1)}px) / ${this.sizes.slidesPerColumn})`
    const slideWidth = `calc((100% - ${this.sizes.spaceBetween * (this.fullColumnsCount - 1)}px) / ${this.fullColumnsCount})`

    this.slides.forEach((slide, index) => {
      
      slide.style.marginLeft = (index >= this.sizes.slidesPerColumn) ? `${this.sizes.spaceBetween}px` : `0px`
      //slide.style.marginTop = (index % this.sizes.slidesPerColumn) ? `${this.sizes.spaceBetween}px` : `0px`

      slide.style.height = slideHeight
      slide.style.width = slideWidth
    })

    this.wrapperElement.style.width = `calc(${100 * fullSlidesCount}% + ${(fullSlidesCount - 1) * this.sizes.spaceBetween}px)`
    this.updatePosition()
    this.updatePaginator()
  }, 200)

  CustomSwiper.prototype.initNavigation = function(config){

    if(config.nextEl){
      this.nextButton = document.querySelector(config.nextEl)
      this.nextButton.addEventListener('click', () => this.nextPage())
    }

    if(config.prevEl){
      this.prevButton = document.querySelector( config.prevEl)
      this.prevButton.addEventListener('click', () => this.prevPage())
    }
    

    this.updateNavigation()
  }

  CustomSwiper.prototype.update = function(){
    

    this.scanNodes()
    this.updateSizes()
    this.moveTo(0)

    this.updateNavigation()
    this.updatePaginator()
  }

  CustomSwiper.prototype.scanNodes = function(){
    this.slides = [...this.wrapperElement.querySelectorAll(this.slideSelector)].filter(element => !element.hidden)
  }

  CustomSwiper.prototype.moveTo = function(slide){
    if(slide < 0)
      slide = 0
    if(slide >= this.slides.length)
      slide = this.slides.length - 1

    this.slide = slide

    this.updatePosition()
    this.updatePaginator()
  }
  
  CustomSwiper.prototype.getCurrentPage = function(slide=null){
    if(slide === null)
      slide = this.slide
    return Math.trunc(slide / (this.sizes.slidesPerColumn * this.sizes.slidesPerGroup))
  }
  CustomSwiper.prototype.updatePosition = function(){

    const currentColumn= this.getCurrentPage() * this.sizes.slidesPerGroup


    const translate = `translate3d(calc((100% - ${(this.fullColumnsCount-1) * this.sizes.spaceBetween}px) / ${-this.fullColumnsCount} * ${currentColumn} - ${currentColumn * this.sizes.spaceBetween}px), 0, 0  )`  


    this.wrapperElement.style.transform = translate
    
    this.updateNavigation()
  }
  CustomSwiper.prototype.updatePaginator = function(){
    if(this.paginationElement)
      this.paginationElement.textContent = `${this.getCurrentPage() + 1} / ${this.pages}`

  }
  CustomSwiper.prototype.updateNavigation = function(){
    const currentPage = this.getCurrentPage()

    if(currentPage == 0 && this.prevButton ){
      this.prevButton.classList.add('custom-swiper-button-disabled')
      this.prevButton.disabled = true
    }
    else{
      this.prevButton.classList.remove('custom-swiper-button-disabled')
      this.prevButton.disabled = false
    }

    if(currentPage >= this.pages - 1 && this.nextButton ){
      this.nextButton.classList.add('custom-swiper-button-disabled')
      this.nextButton.disabled = true
    }
    else{
      this.nextButton.classList.remove('custom-swiper-button-disabled')
      this.nextButton.disabled = false
    }
  }
  CustomSwiper.prototype.nextPage = function(){
    this.slidePage(+1)
  }
  CustomSwiper.prototype.prevPage = function(){
    this.slidePage(-1)
  }
  CustomSwiper.prototype.slidePage = function(direction){
  
    this.moveTo(this.slide + direction * this.sizes.slidesPerGroup * this.sizes.slidesPerColumn)

  }
