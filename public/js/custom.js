$(document).ready(function() {
    function setHeight() {
        windowHeight = $(window).innerHeight();
        $('.video-marque').css('min-height', windowHeight);
    };

});
/*$(window).scroll(function() {
    if ($(this).scrollTop() > 1){
        $('header.main_header').addClass("sticky");
    }
    else {
        $('header.main_header').removeClass("sticky");
    }
});*/
jQuery(function($) {
    var wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        }
    )
    wow.init();
});

$(document).ready(function() {
    $('#gallary_photos').owlCarousel({
        margin: 15,
        nav: true,
        navText: [
            '<img src="images/icons/icn_gray_caret_left.svg">',
            '<img src="images/icons/icn_gray_caret_right.svg">'
        ],
        loop: true,
        dots: false,
        animateOut: 'fadeOut',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1366: {
                items: 4
            }
        }
    });
    $('#gallary_photos2').owlCarousel({
        margin: 15,
        nav: true,
        navText: [
            '<img src="images/icons/icn_gray_caret_left.svg">',
            '<img src="images/icons/icn_gray_caret_right.svg">'
        ],
        loop: false,
        dots: false,
        animateOut: 'fadeOut',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1366: {
                items: 4
            }
        }
    });
    // equal height js here
    // Select and loop the container element of the elements you want to equalise
    $('.row_H_D').each(function(){

        // Cache the highest
        var highestBox = 0;

        // Select and loop the elements you want to equalise
        $('.heightDiv', this).each(function(){

            // If this box is higher than the cached highest then store it
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }

        });

        // Set the height of all those children to whichever was highest
        $('.heightDiv',this).height(highestBox);

    });
    // equal height js here
    // Acitive class js here
    /* $(".ph_filter_link").click( function(){
            if (!$(this).hasClass('active')) {
                //$('.ph_filter_link ').removeClass('active');
                $(this).addClass('active');
            }
        });*/


    // Acitive class js here
    // Acitive class js here
    $("#create_new_offer").click(function(){
        $("#add_new_service").toggle();
    });
    $("#edit_service_target").click(function(){
        $("#edit_service").toggle();
    });
    $("#add_experience").click(function(){
        $("#add_experience_cont").toggle();
    });
    $("#create_new_offer_xs").click(function(){
        $("#add_new_service_xs").toggle();
    });
    $("#edit_service_target_xs").click(function(){
        $("#edit_service_xs").toggle();
    });


    $("#add_experience").click(function(){
        $("#add_experience_cont").toggle();
    });
    $("#edit_experience").click(function(){
        $("#edit_experience_cont").toggle();
    });
    // Acitive class js here
    // Toggles paragraphs with different speeds
    $("#toggle_btn_chat").click(function(){
        $(".inbox_chat_xs").toggle("slow");
    });
    // $("#toggle_btn_filter").click(function(){
    //     $("#filter_list").toggle("slow");
    // });
    // Toggles paragraphs with different speeds
    // Toggles Offers service
    $(".offers_select_tar").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".offers_tabs_box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".offers_tabs_box").hide();
            }
        });
    }).change();
    // Toggles Offers service
});


jQuery(function ($) {
    // Upload js
    // jQuery('#OpenImgUpload').click(function() {
    //     $('#imgupload').trigger('click');
    // });
    jQuery("input[type=file]").on("change", function() {
        jQuery("[for=file]").html(this.files[0].name);
        jQuery("#preview").attr("src", URL.createObjectURL(this.files[0]));
    });
    // Upload js
    // jQuery('#OpenImgUpload1').click(function() {
    //     $('#imgupload1').trigger('click');
    // });
    jQuery("input[type=file]").on("change", function() {
        jQuery("[for=file]").html(this.files[0].name);
        jQuery("#preview1").attr("src", URL.createObjectURL(this.files[0]));
    });
});