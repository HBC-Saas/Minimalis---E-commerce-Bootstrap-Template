$(document).ready(function(){
    /*===================================================
    *     navbar container
    * ===================================================*/
    var navbarHeight = $('.navbar.fixed-top').innerHeight();
    $('.header-container').css('margin-bottom', navbarHeight);

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
    *     button add to card
    * ===================================================*/
    $('.btn-add-to-card:not(.loading):not(.success)').hover(function(){
        var textWidth = $(this).find(".add-to-card-text").innerWidth();
        $(this).find('.add-to-card-hover').width(textWidth);
    }, function() {
        $('.add-to-card-hover').width(0);
    });

    $('.btn-add-to-card:not(.loading):not(.success)').on('click', function(){
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


// init Cocoen
new Cocoen(document.querySelector('.cocoen'));