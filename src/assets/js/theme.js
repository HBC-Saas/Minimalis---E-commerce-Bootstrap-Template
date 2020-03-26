$(document).ready(function(){
    $(".megamenu").on("click", function(e) {
        e.stopPropagation();
    });

    //incrise decrease input qty
    $('.qty').on('click', function() {
        var $this = $(this),
            $input = $('input[name="'+$this.data('field')+'"]'),
            value = parseInt($input.val()),
            valMax = 100,
            valMin = 1;

        // Check if a number is in the field first
        if(isNaN(value) || value < valMin) {
            // If field value is NOT a number, or
            // if field value is less than minimum,
            // ...set value to 0 and exit function
            $input.value(valMin);
            return false;
        } else if (value > valMax) {
            // If field value exceeds maximum,
            // ...set value to max
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

    // actions active class
    $('.card-action').on('click', function () {
        $(this).toggleClass('active');
    });

    // button add to card
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
});

// init Cocoen
new Cocoen(document.querySelector('.cocoen'));