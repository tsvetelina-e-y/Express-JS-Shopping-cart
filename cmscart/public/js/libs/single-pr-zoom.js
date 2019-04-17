(function () {
    var dv, img;

    dv = $('.lge');

    img = $('.img-tag');

    // $('.image-zoom').eq(0).prepend(dv);
    // $('div').eq(0).append('<div>', img);
    $('.image-zoom').eq(0).attr('class', 'zoom');

    // $('body div.zoom div').attr('class', 'lge');

    $(img).eq(0).attr({
        'src': img.attr('src'),
        'class': 'sml'
    });


    $('.image-zoom').css({
        // 'width': '400px',
        // 'margin': '0 auto',
        // 'top': '30px',
        'position': 'relative'
    });

    $('.lge').css({
        'width': '300px',
        'height': '300px',
        'background': '#fff',
        'position': 'absolute',
        'border-radius': '100%',
        'cursor': 'none',
        'box-shadow': '0 0 0 7px rgba(255,255,255,0.85), 0 0 7px 7px rgba(0,0,0,0.25), inset 0 0 40px 2px rgba(0,0,0,0.25)',
        'background': 'url(\'' + img.attr('src') + '\')',
        'background-repeat': 'no-repeat',
        'z-index' : '800'
    });

    $(document).ready(function () {

        var native_height, native_width;
        native_height = 0;
        native_width = 0;

        $('.zoom').mousemove(function (e) {
            var bgp, image_object, magnify_offset, mx, my, px, py, rx, ry;
            if (!native_width && !native_height) {
                image_object = new Image();
                image_object.src =  img.attr('src');
                native_width = image_object.width;
                native_height = image_object.height;
            } else {
                magnify_offset = $(this).offset();
                mx = e.pageX - magnify_offset.left;
                my = e.pageY - magnify_offset.top;
                if (mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
                    $('.lge').fadeIn(500);
                } else {
                    $('.lge').fadeOut(500);
                }
                if ($('.lge').is(':visible')) {
                    rx = Math.round(mx / $('.sml').width() * native_width - $('.lge').width() / 3) * -1;
                    ry = Math.round(my / $('.sml').height() * native_height - $('.lge').height() / 3) * -1;
                    bgp = rx + 'px ' + ry + 'px';
                    px = mx - $('.lge').width() / 2;
                    py = my - $('.lge').height() / 2;
                    $('.lge').css({
                        left: px,
                        top: py,
                        backgroundPosition: bgp
                    });

                }
            }
        });

    });

}).call(this);
