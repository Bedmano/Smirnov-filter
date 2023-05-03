$(document).ready(function () {
  // массив со значениями для дата атрибутов
  var groupNamesArray = [
    "all",
    "free",
    "basics",
    "gameGraphics",
    "around",
    "characters",
    "unrealEngine",
    "thirdDimension",
  ];

  (function () {
    // выбранные катеории по умолчанию
    var _type = "all";
    var _category = "all";
    var _group = "all";

    // добавляем класс с иконкой скидки;
    DATA.forEach(function (item) {
      if (item.sale === "sale") {
        $("#" + item.id).addClass("sale");
      }
    });

    // функция для отображения текста,если фильтрация не дала результатов
    var checkCardsContainer = function () {
      var currentContainerHeight;

      if (screen.width <= 639) {
        currentContainerHeight = '2762px'
      } else if (screen.width >= 640 && screen.width <= 959) {
        currentContainerHeight = '1800px'
      } else if (screen.width >= 960 && screen.width <= 1199) {
        currentContainerHeight = '1860px'
      } else {
        currentContainerHeight = '1710px'
      };

      if (screen.width >= 960) {
        var emptyPageText = $(".nothingFoundDesktop");
        var filtersBlock = $("#rec342416466");
        var cardsContainer = $(".cardsDesktop");
      } else {
        var emptyPageText = $(".nothingFoundMobile");
        var filtersBlock = $("#rec343533444");
        var cardsContainer = $(".cardsMobile");
      }

      if ($(".hiddenCard").length === DATA.length) {
        $(emptyPageText).css("display", "block");
        $(filtersBlock).css("height", $(currentContainerHeight));
      } else {
        $(emptyPageText).css("display", "none");
        if (screen.width >= 960) {
          $(filtersBlock).css("height", $(cardsContainer).height() + 205);
        } else {
          $(filtersBlock).css("height", $(cardsContainer).height());
        }

      }
    };

    // вспомогательная функция фильтрации

    function filterCourses(newType, newCategory, newGroup) {
      DATA.forEach(function (item) {
        if (
          (newType === "all" || item.type === newType) &&
          (newCategory === "all" || item.category === newCategory) &&
          (newGroup === "all" || item.group.indexOf(newGroup) >= 0) &&
          (item.sale === "sale" ||
            !$checkboxSale
              .find(".sale-button")
              .hasClass("sale-button-active")) &&
          (item.start === "soon" ||
            !$checkboxStart
              .find(".start-button")
              .hasClass("start-button-active"))
        ) {
          $("#" + item.id)
            .removeClass("hiddenCard")
            .show();
        } else {
          $("#" + item.id)
            .addClass("hiddenCard")
            .hide();
        }

        // показать текст, если поиск по фильтрам не дал результат
        checkCardsContainer();

        setTimeout(function () {
          t_lazyload_update();
        }, 2000);
      });

      setUrlHash();
    }

    function setUrlHash() {
      var hash = "#!" + _type + "/" + _category + "/" + _group;
      history.replaceState(undefined, undefined, hash);
    }

    function updateStateByHash() {
      if (window.location.hash.includes("#!")) {
        var hashData = window.location.hash.slice(2).split("/");

        _type = hashData[0];
        _category = hashData[1];
        _group = hashData[2];
      }
    }

    var $radioCategory = $(".radio-category");
    var $radioType = $(".radio-type");
    var $checkboxSale = $(".sale-row");
    var $checkboxStart = $(".start-row");

    // Массив с группами курсов
    var groupButtons = [];

    updateStateByHash();

    // фильтрация по группе курсов
    if (screen.width >= 640) {
      // Добавляю в массив переменные
      groupButtons[0] = $('.tabOne a[href="#accordDesktop"]');
      groupButtons[1] = $('.tabTwo a[href="#accordDesktop"]');
      groupButtons[2] = $('.tabThree a[href="#accordDesktop"]');
      groupButtons[3] = $('.tabFour a[href="#accordDesktop"]');
      groupButtons[4] = $('.tabFive a[href="#accordDesktop"]');
      groupButtons[5] = $('.tabSix a[href="#accordDesktop"]');
      groupButtons[6] = $('.tabSeven a[href="#accordDesktop"]');
      groupButtons[7] = $('.tabEight a[href="#accordDesktop"]');
      // присваиваю кнопкам дата атрибуты
      for (let i = 0; i < groupNamesArray.length; i++) {
        $(groupButtons[i]).attr("data-group", groupNamesArray[i]);
      }

      $('a[href="#accordDesktop"]').find('[data-group="' + _group + '"]').addClass("group-item-active");
      filterCourses(_type, _category, _group);
      //  добавляю кнопкам обработчики событий
      $('a[href="#accordDesktop"]').on("click", function (evt) {
        var $itemGroup = $(evt.currentTarget);
        var activeClass = "group-item-active";

        if ($itemGroup.hasClass(activeClass)) {
          return;
        }

        // Делаем вкладку активной
        $('a[href="#accordDesktop"]').removeClass(activeClass);
        $itemGroup.addClass(activeClass);

        _group = $itemGroup.data("group");
        filterCourses(_type, _category, _group);
      });
    } else {
      // Добавляю в массив переменные
      groupButtons[0] = $('.tabOne a[href="#accord"]');
      groupButtons[1] = $('.tabTwo a[href="#accord"]');
      groupButtons[2] = $('.tabThree a[href="#accord"]');
      groupButtons[3] = $('.tabFour a[href="#accord"]');
      groupButtons[4] = $('.tabFive a[href="#accord"]');
      groupButtons[5] = $('.tabSix a[href="#accord"]');
      groupButtons[6] = $('.tabSeven a[href="#accord"]');
      groupButtons[7] = $('.tabEight a[href="#accord"]');

      // присваиваю кнопкам дата атрибуты
      for (let i = 0; i < groupNamesArray.length; i++) {
        $(groupButtons[i]).attr("data-group", groupNamesArray[i]);
      }

      $('a[href="#accord"]').find('[data-group="' + _group + '"]').addClass("group-item-active");
      filterCourses(_type, _category, _group);
      //  добавляю кнопкам обработчики событий
      $('a[href="#accord"]').on("click", function (evt) {
        var $itemGroup = $(evt.currentTarget);
        var activeClass = "group-item-active";

        if ($itemGroup.hasClass(activeClass)) {
          return;
        }

        // Делаем вкладку активной
        $('a[href="#accord"]').removeClass(activeClass);
        $itemGroup.addClass(activeClass);

        _group = $itemGroup.data("group");
        filterCourses(_type, _category, _group);
      });
    }

    $radioType.find('[data-type="' + _type + '"]').addClass("type-item-active");
    filterCourses(_type, _category, _group);
// обработчик для сортировки по категории для новичков или специалистов
    $radioType.on("click", "[data-type]", function (evt) {
      var $itemType = $(evt.currentTarget);
      var activeClass = "type-item-active";

      if ($itemType.hasClass(activeClass)) {
        return;
      }

      // Делаем вкладку активной
      $radioType.find("[data-type]").removeClass(activeClass);
      $itemType.addClass(activeClass);

      _type = $itemType.data("type");
      filterCourses(_type, _category, _group);
    });
// обработчик для сортировки по категории курс или программа
    $radioCategory.on("click", "[data-category]", function (evt) {
      var $itemCategory = $(evt.currentTarget);
      var activeClass = "category-item-active";

      if ($itemCategory.hasClass(activeClass)) {
        return;
      }

      // Делаем таб активным
      $radioCategory.find("[data-category]").removeClass(activeClass);
      $itemCategory.addClass(activeClass);

      _category = $itemCategory.data("category");
      filterCourses(_type, _category, _group);
    });
// обработчик для сортировки по скидке
    $checkboxSale.on("click", "[data-sale]", function (evt) {
      var $itemSale = $(evt.currentTarget);
      var activeClass = "sale-button-active";

      $itemSale.toggleClass(activeClass);
      filterCourses(_type, _category, _group);
    });
// обработчик для сортировки по времени старта
    $checkboxStart.on("click", "[data-start]", function (evt) {
      var $itemStart = $(evt.currentTarget);
      var activeClass = "start-button-active";

      $itemStart.toggleClass(activeClass);
      filterCourses(_type, _category, _group);
    });
  })();
});
