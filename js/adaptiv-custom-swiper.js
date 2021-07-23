(document.querySelector('#focused-tooltip') || {focus : ()=>{}} ).focus()

const defaultSelest = () => {
  const elements = document.querySelectorAll(".select");

  Array.prototype.map.call(elements, (element) => {

    const choices = new Choices(element, {
        silent: true,
        searchEnabled: false,
        maxItemCount: -1,
        itemSelectText: "",
      });
    
      if(element.classList.contains('select-opened'))
      { 
        choices.showDropdown()
      }
  })
 };
defaultSelest();  
  
 let swiper = ( () => {

        let swiper = new CustomSwiper(".gallery1", {
          pagination: {
          el: ".custom-swiper-pagination",
          type: "fraction"
        },
        navigation: {
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev"
        },
        breakpoints: {
          1502: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerGroup : 3,
            spaceBetween: 50
          },
          500: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerGroup : 2,
            spaceBetween : 30
          },
          0 : {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup : 1
          }
        }
      })
       

        const galery = document.querySelector('.gallery1')
        const filterSelector = document.querySelector('#gallery-filter')

        function onGaleryFilterChange(filter){
          console.log('value-changed', filter)

         // const choices__list = 

          document.querySelector('.gallery').querySelector('.choices__list--dropdown').querySelectorAll('.choices__item').forEach(option => {
            option.hidden = option.dataset.value !== filter ? false : true
    
          })
  
          galery.querySelectorAll('.custom-swiper-slide').forEach(slide => {
          slide.hidden = slide.dataset.filter_type === filter ? false : true
        })
        swiper.update()
      }

      onGaleryFilterChange(filterSelector.value)
      filterSelector.addEventListener('change', (event) => onGaleryFilterChange(event.target.value))
      return swiper
      })()

    


