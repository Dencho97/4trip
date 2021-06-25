/* eslint-disable */
import $ from 'jquery';
import 'jquery-mask-plugin';
import Swiper from 'swiper';
import StickySidebar from 'sticky-sidebar';
import customSelect from 'custom-select';
import ymaps from 'ymaps';

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
    customSelect('.custom-select');
});

$(() => {
    if(!window.matchMedia('(max-width: 991px)').matches) {
        const headerHeight = $('#header').height();
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('body').css({ paddingTop: headerHeight });
                $('#header').addClass('sticky');
            }
            else {
                $('body').css({ paddingTop: 0 });
                $('#header').removeClass('sticky');
            };  
        }); 
    }
});

$(() => {
    $('[data-modal]').click(function(e) {
        e.preventDefault();

        const modalID = $(this).data('modal');
        $(modalID).modal({
            fadeDuration: 300
        });

        // $('body, html').css({ overflow: 'hidden' });

        return false;
    });

    $('.modal').on($.modal.BLOCK, function(event, modal) {
        $('body, html').css({ overflow: 'hidden' });
    });
    $('.modal').on($.modal.CLOSE, function(event, modal) {
        $('body, html').css({ overflow: 'auto' });
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

$(() => {
    new Swiper(".block-ways .swiper-container", {
        spaceBetween: 30,
        navigation: {
            nextEl: ".block-ways .swiper-button-next",
            prevEl: ".block-ways .swiper-button-prev",
        },
        breakpoints: {
            991: {
                slidesPerView: 4,
                slidesPerColumn: 2,
                allowTouchMove: false
            },
            320: {
                allowTouchMove: true,
                autoplay: {
                    delay: 3500
                }
            }
        }
    });
});

$(() => {
    $('.header_burger').on('click', function() {
        const menu = $('.header__mobile');

        if (menu.hasClass('fadeOut')) {
            menu.removeClass('fadeOut').addClass('fadeIn');
            $('body, html').css({ overflow: 'hidden' });
        } else {
            menu.removeClass('fadeIn').addClass('fadeOut');
            $('body, html').css({ overflow: 'auto' });
        }
    });
});

$(() => {
    $('.block-category__sidebar_btn').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.block-category__sidebar__filter,.block-category__sidebar_subcategories').hide();
        } else {
            $(this).addClass('active');
            $('.block-category__sidebar__filter').show();
            $('.block-category__sidebar_subcategories').css({ display: 'grid' });
        }
    });
});

$(() => {
    $('.header__left__select-city_select').on('change', function() {
        window.location.href = $(this).val();
    });
});

$(() => {
    let city = $('.block-how-to-get__head_select').val();
    let type = $('.block-how-to-get__items__item').first().data('type');

    console.log(city)

    $('.block-how-to-get__head_select').on('change', function() {
        city = $(this).val();

        $(`.block-how-to-get_text`).hide();
        $(`.block-how-to-get_text.${city}.${type}`).show();
    });

    $('.block-how-to-get_text').hide();
    $('.block-how-to-get__items__item').first().addClass('active');


    $(`.block-how-to-get_text.${city}.${type}`).show();

    $('.block-how-to-get__items__item').on('click', function() {
        $('.block-how-to-get__items__item').removeClass('active');
        $(this).addClass('active');
        type = $(this).data('type');

        $(`.block-how-to-get_text`).hide();
        $(`.block-how-to-get_text.${city}.${type}`).show();
    });
});

// map
$(() => {
    const map = $('#map-object');
    if (map.length) {
        const coords = map.data('coords').split(',');

        ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then((maps) => {
            const myMap = new maps.Map('map-object', {
                center: coords,
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search',
            });

            const myPlacemark = new maps.Placemark(coords, {}, {});
  
            myMap.geoObjects.add(myPlacemark);

            myMap.behaviors.disable('scrollZoom');
            map.addClass('noZoom');
            myMap.events.add('click', () => {
                if (map.hasClass('noZoom')) {
                    map.removeClass('noZoom').addClass('yesZoom');
                    myMap.behaviors.enable('scrollZoom');
                } else {
                    map.removeClass('yesZoom').addClass('noZoom');
                    myMap.behaviors.disable('scrollZoom');
                }
            });
  
            const isMobile = {
                Android: () => (navigator.userAgent.match(/Android/i)),
                BlackBerry: () => (navigator.userAgent.match(/BlackBerry/i)),
                iOS: () => (navigator.userAgent.match(/iPhone|iPad|iPod/i)),
                Opera: () => (navigator.userAgent.match(/Opera Mini/i)),
                Windows: () => (navigator.userAgent.match(/IEMobile/i)),
                any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
            };
  
            if (isMobile.any()) {
                myMap.behaviors.disable('drag');
            }
        }).catch(error => console.log('Failed to load Yandex Maps', error));
    }
  });

  // catalog
  $(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let initialParams = [];

    for (let p of urlParams) {
        initialParams = [...initialParams, {
            key: p[0],
            value: p[1]
        }];
    }

    initialParams.forEach((item) => {
        const $elem = $(`.block-category__sidebar__filter_item input[type=checkbox][name=${item.key}]`);
        if($elem.length && $elem.val() === item.value) {
            $elem.prop('checked', true);
        }
        const $elemDate = $(`.block-category__sidebar__filter_item input[type=date][name=${item.key}]`);
        if($elemDate.length) {
            $elemDate.val(item.value);
        }
    });

    $('.block-category__sidebar__filter_item input').on('change', function() {
        $('.block-category__sidebar__filter').trigger('submit');
    });

    $('.block-category__sidebar__filter_item.date').on('click', function() {
        $(this).find('input').show().focus();
        $(this).find('span').hide();
    });

    function updateURL(params) {
        if (history.pushState) {
            const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            const newUrl = baseUrl + `${params !== '' ? `?${params}` : ''}`;
            $('.block-category__sidebar_subcategories li').each(function() {
                const linkHref = $(this).find('a').attr('href');
                $(this).find('a').attr('href', `${params !== '' ? `${linkHref}?${params}` : linkHref}`);
            });
            history.pushState(null, null, newUrl);
        }
        else {
            alert('History API не поддерживается');
        }
    }

    $('.block-category__sidebar__filter').on('submit', function(e) {
        e.preventDefault();
        const params = $(this)
                    .serializeArray()
                    .filter(item => item.value !== '')
                    .map(item => `${item.name}=${item.value}`)
                    .join('&');

        updateURL(params);


        $.get(window.location.href, (data, status) => {
            if (status === 'success') {
                const $data = $(data);

                const $catalog = $data.find('#catalog-wrapper');

                $('#catalog-wrapper').replaceWith($catalog[0]);
            }
        });

        return false;
    });
  });

  $(() => {
    $('.interactive-map .circle').on('click', function() {
        const city = $(this).attr('class').split(' ')[1].split('--')[1];
        location.href = `${location.protocol}//${city}.${location.host}/`; 
    });

    $('.interactive-map .circle').hover(function() {
        const city = $(this).attr('class').split(' ')[1].split('--')[1];
        $(`.pin--${city}, .text--${city}`).fadeIn();
    }, function() {
        const city = $(this).attr('class').split(' ')[1].split('--')[1];
        
        setTimeout(() => {
            $(`.pin--${city}, .text--${city}`).fadeOut();
        }, 300)
    })
  });

  $(() => {
    $('.block-top_select-way').on('change', function() {
        location.href = $(this).val();
    });
  });

  $(() => {
    $('.block-top__categories__item').on('click', function() {
        $('#popup-to-category_category').val($(this).data('category'))
    });

    $('.popup-to-category_select').on('change', function() {
        const city = $(this).val();
        const category = $('#popup-to-category_category').val();

        $.get(`${location.href}?city=${city}&category=${category}`, (data, status) => {
            if (status === 'success') {
                const $data = $(data);

                const urlCategory = $data.find('#popup-to-category_url').val();

                if(urlCategory && urlCategory !== '') {
                    location.href = `${location.protocol}//${city}.${location.host}/${urlCategory}`;s
                }
                
            }
        });
    });
  });