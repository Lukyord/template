jQuery(document).ready(function($){

    //WP PLUGIN:WPCF7
    $('.wpcf7-checkbox .wpcf7-list-item, .wpcf7-radio .wpcf7-list-item, .wpcf7-acceptance .wpcf7-list-item').find('> label').addClass('choice');

    //WP PAGINATION
    $('.wp-pagenavi').each(function(){
        if($(this).find('.previouspostslink').length){
            $(this).addClass('has-prev');
        } else {
            $(this).removeClass('has-prev');
        }
    });
});