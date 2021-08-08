document.addEventListener('DOMContentLoaded',function() {

 document.querySelectorAll('.catalog_btn_step').forEach(function(catalogBtnStep) {
  
  catalogBtnStep.addEventListener('click',function(event) {
        // const path=event.currentTarget.dataset.path

        // document.querySelectorAll('.catalog_elements').forEach(function(catalogElements) {
        //   catalogElements.classList.add('catalog_content_is_invisible')
        // })
   
        // document.querySelector(`[data-target="${path}"]`).classList.remove('catalog_content_is_invisible')


      document.querySelectorAll('.catalog_btn_step__is_active').forEach(function(button){
        button.setAttribute('aria-selected', 'false')
        button.classList.remove('catalog_btn_step__is_active')
      })

      catalogBtnStep.classList.add('catalog_btn_step__is_active')
      catalogBtnStep.setAttribute('aria-selected', 'true')

    })

})

})
