$(document).ready(function () {

  // (function loadLoginModal() {
  //     let modal = $("[data-modal=login]");

  // $('#login-btn').on('click', function () {

  //     modal.toggleClass('visible');


  // });

  // $(window).click(function (e) {



  //     if(modal.hasClass('visible')){
  //         modal.click(function (event) {
  //             event.stopPropagation();
  //         });
  //         modal.toggleClass('visible');;
  //     }

  // });

  // $('#login-btn').on({
  //     click: function () {
  //         modal.addClass('visible');
  //     },
  //     focusout: function (e) {
  //     //   $(this).data('submenuTimer', setTimeout(function () {
  //     //     $(this).removeClass('submenu--active');
  //     //   }.bind(this), 0));
  //     },
  //     // focusin: function (e) {
  //     //   clearTimeout($(this).data('submenuTimer'));
  //     // }
  //   });


  // $(function() {
  //         $('#login-btn').on("click", function(e) {
  //           modal.addClass("visible");
  //           e.stopPropagation();
  //         });
  //         $(document).on("click", function(e) {

  //           if ($(e.target).is(modal) === false) {
  //             alert('clicked outside');
  //             modal.removeClass("visible");
  //           }
  //         });
  //       });


  // })();



  // $(function () {

  //   $("#slider-range").slider({
  //     range: true,
  //     min: 130,
  //     max: 500,
  //     values: [130, 250],
  //     slide: function (event, ui) {
  //       $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
  //     }
  //   });
  //   $("#amount").val("$" + $("#slider-range").slider("values", 0) +
  //     " - $" + $("#slider-range").slider("values", 1));
  // });

  $(function () {
    if ($('.heart-link')) {
      $('.heart-link').on('click', function (e) {
        $(this).addClass('liked');
        e.preventDefault();
        
        $.get({
          url: $(this).attr('href'), 
          success: function (result) {
            $('.heart-quantity').text( Number($('.heart-quantity').text())+1);
          }
        });
      });

    }

    if ($('.add-to-bag')) {
      $('.add-to-bag').on('click', function (e) {
        $(this).find('a').addClass('active');
        e.preventDefault();
     
        $.get({
          url: $(this).find('a').attr('href'), 
          success: function (result) {
            $('.bag-quantity').text( Number($('.bag-quantity').text())+1);
          }
        });
      });

    }

    if ($('.add-to-bag span').length) {
      $('.add-to-bag span').on('click', function () {
        $(this).toggleClass('active');
      });
    }

    if ($('.menu-title')) {
      $('.menu-title').on('click', function (e) {

        console.log($(this));
        if ($(e.currentTarget).hasClass('active')) {

          $('.menu-title').removeClass('active');
          $(this).removeClass('active');
        } else {
          $('.menu-title').removeClass('active');
          $(this).addClass('active');
        }
      });
    }

    if ($('.hamb-container')) {
      $('.hamb-container').on('click', function () {
        $('.hamb-container').toggleClass('active');
        $('.menu').toggleClass('active');

      });
    }
  });


  $(function () {

    if ($('.image .img-tag')) {
      $('.change-main').on('click', function () {
        // alert($('.img-tag'));
        let element = $(this);
        $('.sml').animate({ 'opacity': 0 }, 200, function () {
          $('.sml').attr('src', element.attr('src'));
          $('.sml').animate({ 'opacity': 1 }, 100);
          $('.lge').css('background', 'url(\'' + element.attr('src') + '\')');
          $([document.documentElement, document.body]).animate({
            scrollTop: $(".sml").offset().top - 100
          }, 1000);
        });

      })

    }
  })();

});

  // })