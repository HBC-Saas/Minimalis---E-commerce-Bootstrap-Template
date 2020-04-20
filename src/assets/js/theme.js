$(document).ready(function(){
    /*===================================================
    *     sticky zebra_pin
    * ===================================================*/
    var navbarHeight = $('.navbar.sticky-navbar').outerHeight();

    new $.Zebra_Pin($('.sticky-navbar'), {
        z_index: 1002,
    });

    new $.Zebra_Pin($('.sticky-filter'), {
        top_spacing: navbarHeight,
        z_index: 1001
    });

    new $.Zebra_Pin($('.sticky-sidebar'), {
        top_spacing: navbarHeight,
        z_index: 1000
    });

    new $.Zebra_Pin($('.sticky-product-sidebar'), {
        top_spacing: navbarHeight,
        z_index: 1000,
        contain: true
    });

    // after scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if ($(".navbar").hasClass("bg-transparent")) {
            if (scroll >= 20) {
                $(".navbar").addClass("bg-white");
            } else {
                $(".navbar").removeClass("bg-white");
            }
        }
    });

    /*===================================================
    *     dropdown submenu
    * ===================================================*/
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subLink = $(this).parent('.dropdown-submenu');
        var $subMenu = $(this).next(".dropdown-menu");
        $subLink.toggleClass('show');
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });

    // dropdown stop propagation
    $('.navbar .mega-dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });

    // navbar filter close dropdown
    $('.navbar-filter .close-dropdown').on('click', function (e) {
        $(this).parents('.dropdown').removeClass("show");
        $(this).parents('.dropdown-menu').removeClass("show");
    });

    /*===================================================
    *     Navbar Search
    * ===================================================*/
    $('.nav-search-form .search-icon').on('click', function () {
        $(this).addClass('d-none');
        $('.nav-search-form .close-icon').removeClass('d-none');
        $('.nav-search-form').css('width', '180px');
        $('.nav-search-form .form-control').removeClass('d-none');
    });

    $('.nav-search-form .close-icon').on('click', function () {
        $(this).addClass('d-none');
        $('.nav-search-form .search-icon').removeClass('d-none');
        $('.nav-search-form').css('width', 'auto');
        $('.nav-search-form .form-control').addClass('d-none');
    });

    /*===================================================
    *     incrise decrease input qty
    * ===================================================*/
    $('.qty').on('click', function() {
        var $this = $(this),
            $input = $('input[name="'+$this.data('field')+'"]'),
            value = parseInt($input.val()),
            valMax = 100,
            valMin = 1;

        // Check if a number is in the field first
        if(isNaN(value) || value < valMin) {
            $input.value(valMin);
            return false;
        } else if (value > valMax) {
            $input.value(valMax);
            return false;
        }

        // Perform increment or decrement logic
        if($this.data('func') == 'plus') {
            if(value < valMax) $input.val(value + 1);
        } else {
            if(value > valMin) $input.val(value - 1);
        }
    });

    /*===================================================
    *     actions active class
    * ===================================================*/
    $('.card-action').on('click', function () {
        $(this).toggleClass('active');
    });

    /*===================================================
    *     button add to cart
    * ===================================================*/
    $('.add-to-cart:not(.loading):not(.success)').hover(function(){
        var textWidth = $(this).find(".add-to-cart-text").innerWidth();
        $(this).find('.add-to-cart-hover').width(textWidth);
    }, function() {
        $('.add-to-cart-hover').width(0);
    });

    $('.add-to-cart:not(.loading):not(.success)').on('click', function(){
        if (!$(this).data('isClicked')) {
            var _this = $(this);

            $(this).addClass('loading');
            _this.data('isClicked', true);

            setTimeout(function () {
                _this.addClass('success');
                _this.removeClass('loading');
            }, 2000);

            setTimeout(function () {
                _this.removeClass('success');
                _this.removeData('isClicked')
            }, 4500);
        }
    });

    /*===================================================
    *     Subscribe modal timeout
    * ===================================================*/

    setTimeout(function () {
        $('#subscribeModal').modal('show');
    }, 5000);

    /*===================================================
    *     tooltips
    * ===================================================*/

    $('[data-toggle="tooltip"]').tooltip();

    /*===================================================
    *     navbar filter
    * ===================================================*/
    // Categories
    $('[name="productCategory"]').on('click', function () {
        var items = document.getElementsByName('productCategory');
        var hasChecket = false;

        for(var i = 0; i < items.length; i++){
            if(items[i].type == 'checkbox') {
                if(items[i].checked == true) {
                    hasChecket = true;
                    $('.reset-category').removeClass('d-none');
                }
            }
        }

        if(!hasChecket) {
            $('.reset-category').addClass('d-none');
        }
    });

    // Materials
    $('[name="productMaterial"]').on('click', function () {
        var items = document.getElementsByName('productMaterial');
        var hasChecket = false;

        for(var i = 0; i < items.length; i++){
            if(items[i].type == 'checkbox') {
                if(items[i].checked == true) {
                    hasChecket = true;
                    $('.reset-material').removeClass('d-none');
                }
            }
        }

        if(!hasChecket) {
            $('.reset-material').addClass('d-none');
        }
    });

    // Colors
    $('[name="productColor"]').on('click', function () {
        var items = document.getElementsByName('productColor');
        var hasChecket = false;

        for(var i = 0; i < items.length; i++){
            if(items[i].type == 'checkbox') {
                if(items[i].checked == true) {
                    hasChecket = true;
                    $('.reset-color').removeClass('d-none');
                }
            }
        }

        if(!hasChecket) {
            $('.reset-color').addClass('d-none');
        }
    });

    /*===================================================
    *     make cart and wishlist happy
    * ===================================================*/
    $('.start-shopping').hover(
        function(){
            $('.sad-line').addClass('happy-line');
        },
        function(){
            $('.sad-line').removeClass('happy-line');
        }
    );

    // =====================================================
    //      Init swipers
    // =====================================================
    $('.swiper-init').each(function () {
        var slider = $(this);

        new Swiper(slider);
    });

    // Hero slider (homepage slider)
    var heroSliderSwiper = new Swiper('.swiper-container.home-slider', {
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination.pagination-dots, .swiper-pagination.pagination-numbers',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },

        on: {
            slideChangeTransitionStart: function () {
                $('[data-aos]').css('visibility', 'hidden');
                $('[data-aos]').removeClass('aos-init').removeClass('aos-animate');
            },
            slideChangeTransitionEnd: function () {
                $('[data-aos]').css('visibility', 'visible');
                AOS.init();
            },
        }
    });

    // luxury swiper
    var luxurySwiper = new Swiper('.swiper-container.luxury-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 0,
    });

    // service swiper
    var serviceSwiper = new Swiper('.swiper-container.service-swiper', {
        loop: false,
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: false,

        breakpoints: {
            575: {
                initialSlide: 1,
                centeredSlides: true,
            },
            992: {
                centeredSlides: false,
            },
        }
    });

    // progress and fraction swiper
    var progressSwiper = new Swiper('.progress-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            init: function() {
                var fraction = document.querySelector('.custom-fraction');
                fraction.innerHTML = (this.activeIndex +  this.params.slidesPerView) + '/' + this.slides.length;
            },

            slideChangeTransitionStart: function() {
                var fraction = document.querySelector('.custom-fraction');
                fraction.innerHTML = (this.activeIndex +  this.params.slidesPerView) + '/' + this.slides.length;
            },
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    // progress and fraction swiper for related products
    var progressRelatedSwiper = new Swiper('.progress-swiper-related-products', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            init: function() {
                var fraction = document.querySelector('.custom-fraction');
                fraction.innerHTML = (this.activeIndex +  this.params.slidesPerView) + '/' + this.slides.length;
            },

            slideChangeTransitionStart: function() {
                var fraction = document.querySelector('.custom-fraction');
                fraction.innerHTML = (this.activeIndex +  this.params.slidesPerView) + '/' + this.slides.length;
            },
        },

        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });


    // =====================================================
    //      Custom class for Modal
    // =====================================================
    $('.below-header').on('show.bs.modal', function (e) {
        $('body').toggleClass("modal-opacity-0");
    }).on('hidden.bs.modal', function (e) {
        $('body').toggleClass("modal-opacity-0");
    });

    // =====================================================
    //      Custom class for Modal
    // =====================================================

    // Initialize popup as usual
    $('.popup-link').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',

        zoom: {
            enabled: true,

            duration: 300,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    $('.gallery-popup').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled:true
            }
        });
    });

});

// unSelect categories checkbox function
function UnSelectAllCategories(){
    var items = document.getElementsByName('productCategory');
    for(var i = 0; i < items.length; i++){
        if(items[i].type == 'checkbox') {
            items[i].checked = false;
            $('.reset-category').addClass('d-none');
        }
    }
}

// unSelect materials checkbox function
function UnSelectAllMaterials(){
    var items = document.getElementsByName('productMaterial');
    for(var i = 0; i < items.length; i++){
        if(items[i].type == 'checkbox') {
            items[i].checked = false;
            $('.reset-material').addClass('d-none');
        }
    }
}

// unSelect colors checkbox function
function UnSelectAllColors(){
    var items = document.getElementsByName('productColor');
    for(var i = 0; i < items.length; i++){
        if(items[i].type == 'checkbox') {
            items[i].checked = false;
            $('.reset-color').addClass('d-none');
        }
    }
}

//AOS animation init
AOS.init();