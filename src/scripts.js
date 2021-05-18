/* eslint-disable */
import $ from 'jquery';
import 'jquery-mask-plugin';
import Swiper from 'swiper';
import StickySidebar from 'sticky-sidebar';

window.$ = $;
window.jQuery = $;

// $(() => {
//     new StickySidebar('.block-category .col-lg-3', {
//         containerSelector: '.block-category .container .row',
//         innerWrapperSelector: '.block-category__sidebar_inner',
//         bottomSpacing: 20,
//         topSpacing: 20
//     });
// });

$(() => {
    $(window).scroll(function () {  
        if ($(this).scrollTop() > 1) {
            $('.header').addClass('sticky');
        }
        else {
            $('.header').removeClass('sticky');
        };  
    });  
});

$(() => {
    $('[data-modal]').click(function() {
        const modalID = $(this).data('modal');
        $(modalID).modal({
            fadeDuration: 300
        });

        return false;
    });

    $('.modal').on($.modal.BLOCK, function(event, modal) {
        $('body').css({ overflow: 'visible' });
    });
});

$(() => {
    $('.popup-hotel-options__categories_item, .block-hotel-options__categories__item').on('click', function() {
        const type = $(this).data('type');
        $('.popup-hotel-options__categories_item').removeClass('active');
        $(`.popup-hotel-options__categories_item[data-type=${type}]`).addClass('active');
        $('.popup-hotel-options_content ul').removeClass('active');
        $(`#${type}`).addClass('active');
    });
});