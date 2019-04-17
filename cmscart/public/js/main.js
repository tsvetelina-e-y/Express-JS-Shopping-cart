$(function () {
    if ($('textarea#ta').length) {
        CKEDITOR.replace('#ta');
    }

    $('.confirmDeletion').on('click', function () {
        if (!confirm('Confirm deletion')) {
            return false;
        }
    })

    if($("[data-fancybox]").length) {
        $("[data-fancybox]").fancybox();
    }

    if($('.custom-notification').length) {
        $('.custom-notification').fadeOut(4000);
    }

    if($('.fade-out').length) {
        $('.fade-out').fadeOut(4000);
    }
});

