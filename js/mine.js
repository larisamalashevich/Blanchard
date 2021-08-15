//бургер-меню
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#burger").addEventListener("click", function () {
    const menutag = document.querySelector("#menu");

    menutag.classList.toggle("menu_is-active");
  });

  const closeMenu = () => document.querySelector("#menu").classList.remove("menu_is-active")

  document
    .querySelector(".close-menu-btn")
    .addEventListener("click", closeMenu);

  document.querySelector("#menu").querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('click', closeMenu)
  })

  

});

//меню-поиска
document.addEventListener("DOMContentLoaded", function () {
  menuSearch = document.querySelector("#menu-search");

  menuSearchInput = menuSearch.querySelector(".search-input");

  document.querySelector("#search").addEventListener("click", function () {
    menuSearch.classList.toggle("menu-search_is-active");

    menuSearchInput.focus();
  });

  document
    .querySelector(".close-menu-search-btn")
    .addEventListener("click", function () {
      menuSearch.classList.remove("menu-search_is-active");
    });
});
//tab
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".catalog_btn_step").forEach(function (catalogBtnStep) {
      catalogBtnStep.addEventListener("click", function (event) {
         const path=event.currentTarget.dataset.path

         document.querySelectorAll('.catalog_tabs_content').forEach(function(catalogTabContent) {
          catalogTabContent.classList.remove('catalog_tabs_content_is_visible')
          catalogTabContent.classList.add('catalog_tabs_content_is_invisible')
        })

         document.querySelector(`[data-target="${path}"]`).classList.remove('catalog_tabs_content_is_invisible')
         document.querySelector(`[data-target="${path}"]`).classList.add('catalog_tabs_content_is_visible')
        
         document
          .querySelectorAll(".catalog_btn_step__is_active")
          .forEach(function (button) {
            button.setAttribute("aria-selected", "false");
            button.classList.remove("catalog_btn_step__is_active");
          });

        catalogBtnStep.classList.add("catalog_btn_step__is_active");
        catalogBtnStep.setAttribute("aria-selected", "true");
      });
    });
});

//swiper-init
new Swiper(".swiper-container", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // effect : 'fade',
  // fadeEffect : {
  //     crossFade: true,
  // },
  //
  //  autoplay: {
  //  delay: 3000,
  // },
});

//adaptiv-custom-swiper
(document.querySelector("#focused-tooltip") || { focus: () => {} }).focus();

const defaultSelest = () => {
  const elements = document.querySelectorAll(".select");

  Array.prototype.map.call(elements, (element) => {
    const choices = new Choices(element, {
      silent: true,
      searchEnabled: false,
      maxItemCount: -1,
      itemSelectText: "",
    });

    if (element.classList.contains("select-opened")) {
      choices.showDropdown();
    }
  });
};
defaultSelest();

let swiper = (() => {
  let swiper = new CustomSwiper(".gallery1", {
    pagination: {
      el: ".custom-swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
    },
    breakpoints: {
      1502: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      500: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
      },
      0: {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
      },
    },
  });

  const galery = document.querySelector(".gallery1");
  const filterSelector = document.querySelector(".gallery-filter");

  function onGaleryFilterChange(filter) {
    console.log("value-changed", filter);

    // const choices__list =

    document
      .querySelector(".gallery")
      .querySelector(".choices__list--dropdown")
      .querySelectorAll(".choices__item")
      .forEach((option) => {
        option.hidden = option.dataset.value !== filter ? false : true;
      });

    galery.querySelectorAll(".custom-swiper-slide").forEach((slide) => {
      slide.hidden = slide.dataset.filter_type === filter ? false : true;
    });
    swiper.update();
  }

  onGaleryFilterChange(filterSelector.value);
  filterSelector.addEventListener("change", (event) =>
    onGaleryFilterChange(event.target.value)
  );
  return swiper;
})();

//accordion-init
$( function() {
    $( "#accordion" ).accordion({
      collapsible: true,
      active : false,
      heightStyle: "content",
      header: 'div'
    });
  } );
//переключение карточек по имени художника
document.addEventListener('DOMContentLoaded',function() {
    const ids = document.querySelector('#ids').querySelectorAll('a')
    
    
    document.querySelector('#content').querySelectorAll('.artist').forEach((artist) => {
        
        artist.hidden = true
            } )
        document.querySelector('#Доменико_Гирландайо').hidden = false
    
    ids.forEach(link => {
        link.addEventListener('click', (event) => {
            document.querySelector('#content').querySelectorAll('.artist').forEach((artist) => {
                
                artist.hidden = true
            } )
            document.querySelector(link.dataset.target).hidden = false
        })
    })
    })
//Подключение Enter
 function check(event) {
  
      if(event.code === 'Enter' || event.code === 'Space')
      {
        const checkbox = document.querySelector('#show-all')
        checkbox.checked = !checkbox.checked
      }
    }