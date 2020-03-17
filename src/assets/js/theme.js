//Plus & Minus for Quantity product
$(document).ready(function(){
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
});

// init Cocoen
new Cocoen(document.querySelector('.cocoen'));