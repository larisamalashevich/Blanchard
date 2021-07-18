document.addEventListener('DOMContentLoaded',function() {

    menuSearch = document.querySelector('#menu-search')

    menuSearchInput = menuSearch.querySelector('.search-input')

      document.querySelector('#search').addEventListener('click',function() {
      menuSearch.classList.toggle('menu-search_is-active')  

      menuSearchInput.focus()
      
    })
  
    document.querySelector('.close-menu-search-btn').addEventListener('click',function() {
      menuSearch.classList.remove('menu-search_is-active')  
      
    })
  
  })