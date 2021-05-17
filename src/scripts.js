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