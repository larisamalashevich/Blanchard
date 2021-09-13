//бургер-меню
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#burger").addEventListener("click", function () {
    const menutag = document.querySelector("#menu");

    menutag.classList.toggle("menu_is-active");
  });

  const closeMenu = () =>
    document.querySelector("#menu").classList.remove("menu_is-active");

  document
    .querySelector(".close-menu-btn")
    .addEventListener("click", closeMenu);

  document
    .querySelector("#menu")
    .querySelectorAll(".nav_link")
    .forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
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
  document
    .querySelectorAll(".catalog_btn_step")
    .forEach(function (catalogBtnStep) {
      catalogBtnStep.addEventListener("click", function (event) {
        const path = event.currentTarget.dataset.path;

        document
          .querySelectorAll(".catalog_tabs_content")
          .forEach(function (catalogTabContent) {
            catalogTabContent.classList.remove(
              "catalog_tabs_content_is_visible"
            );
            catalogTabContent.classList.add(
              "catalog_tabs_content_is_invisible"
            );
          });

        document
          .querySelector(`[data-target="${path}"]`)
          .classList.remove("catalog_tabs_content_is_invisible");
        document
          .querySelector(`[data-target="${path}"]`)
          .classList.add("catalog_tabs_content_is_visible");

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

let [swiper, bookSwiper, projectSwiper] = (() => {
  const swiper = new CustomSwiper(".gallery1", {
    pagination: {
      el: ".custom-swiper-pagination.gallery-nav",
      type: "fraction",
    },
    navigation: {
      nextEl: ".custom-swiper-button-next.gallery-nav",
      prevEl: ".custom-swiper-button-prev.gallery-nav",
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

  const gallery = document.querySelector(".gallery1");
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
    gallery.querySelectorAll(".custom-swiper-slide").forEach((slide) => {
      slide.hidden = slide.dataset.filter_type === filter ? false : true;
    });
    swiper.update();
  }

  onGaleryFilterChange(filterSelector.value);
  filterSelector.addEventListener("change", (event) =>
    onGaleryFilterChange(event.target.value)
  );

  //adaptiv-custom-swiper-books
  const bookSwiper = new CustomSwiper(".books1", {
    pagination: {
      el: ".custom-swiper-pagination.books-nav",
      type: "fraction",
    },
    navigation: {
      nextEl: ".custom-swiper-button-next.books-nav",
      prevEl: ".custom-swiper-button-prev.books-nav",
    },
    breakpoints: {
      1250: {
        slidesPerView: 3,
        slidesPerColumn: 1,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      800: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      
      501: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 0,
        slidesPerColumn: 4,
      },
    },
  });

  // adaptiv - custom - swiper - project;
  const projectSwiper = new CustomSwiper(".projects1", {
    // pagination: {
    //   el: ".custom-swiper-pagination.projects-nav",
    //   type: "fraction",
    // },
    navigation: {
      nextEl: ".custom-swiper-button-next.projects-nav",
      prevEl: ".custom-swiper-button-prev.projects-nav",
    },
    breakpoints: {
      1302: {
        slidesPerView: 3,
        slidesPerColumn: 1,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      800: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      500: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      0: {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        spaceBetween: 17,
      },
    },
  });
  bookSwiper.update();
  projectSwiper.update();
  return [swiper, bookSwiper, projectSwiper];
})();

//accordion-init
$(function () {
  $("#accordion").accordion({
    collapsible: true,
    active: 0,
    heightStyle: "content",
    header: "div",
  });
});

//переключение карточек по имени художника
document.addEventListener("DOMContentLoaded", function () {
  const ids = document.querySelector("#ids").querySelectorAll("a");

  document
    .querySelector("#content")
    .querySelectorAll(".artist")
    .forEach((artist) => {
      artist.hidden = true;
    });
  document.querySelector("#Доменико_Гирландайо").hidden = false;

  ids.forEach((link) => {
    link.addEventListener("click", (event) => {
      document
        .querySelector("#content")
        .querySelectorAll(".artist")
        .forEach((artist) => {
          artist.hidden = true;
        });
      document.querySelector(link.dataset.target).hidden = false;
    });
  });
});
//Подключение Enter
function check(event) {
  if (event.code === "Enter" || event.code === "Space") {
    const checkbox = document.querySelector("#show-all");
    checkbox.checked = !checkbox.checked;
  }
}

//Отключение фокусф при клике
document.querySelectorAll(".catalog_list_item").forEach((accordionHeader) => {
  accordionHeader.addEventListener("click", (event) => {
    event.currentTarget.blur();
  });
});

//Подключение tooltip
function throttle(functor, delay) {
  let lastCall = 0;
  let args = null;
  let context = null;
  let timeout = null;

  return function () {
      const now = +new Date();
      if (now >= lastCall + delay) {
          lastCall = now;
          functor.apply(this, arguments);
      } else {
          lastCall = now;
          args = arguments;
          context = this;

          if (!timeout) {
              timeout = setTimeout(() => {
                  timeout = null;
                  functor.apply(context, args);
              }, delay);
          }
      }
  };
}

function initCustomTooltips(selector = ".projects_tooltip") {


  document.querySelectorAll(selector).forEach((tooltip) => {
      const popup = tooltip.querySelector('.tooltiptext')


      if (popup) {
          let initTransform =  '' + popup.computedStyleMap().get('transform')
          initTransform = initTransform == 'none' ? '' : initTransform

          let currentShift = 0;

          function reposition() {
              const clientWidth = Math.min(document.documentElement.clientWidth, window.innerWidth)
            
              const rect = popup.getBoundingClientRect()

              const primary_right = rect.width + rect.x - currentShift
              const primary_left = rect.x - currentShift
              if (primary_right <= clientWidth && primary_left >= 0) {
                  currentShift = 0
              } else if (primary_left < 0) {
                  currentShift = -primary_left
              } else {
                  currentShift = clientWidth - primary_right
              }
              popup.style.transform = '' + initTransform + ` translate3d(${currentShift}px, 0, 0)`
          }

          window.addEventListener('resize', throttle(reposition, 20))
          reposition()

      }
  })

}

initCustomTooltips()

