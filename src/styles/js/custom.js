//Custom JS
import $ from 'jquery'

export const maintainCardHeight = () => {
    $('.row_H_D').each(function () {

        // Cache the highest
        var highestBox = 0;

        // Select and loop the elements you want to equalise
        $('.heightDiv', this).each(function () {

            // If this box is higher than the cached highest then store it
            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
            }

        });

        // Set the height of all those children to whichever was highest
        $('.heightDiv', this).height(highestBox);

    });
}