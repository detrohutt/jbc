/*
*	Main JS Loop
*/

/*
*   $('.navbar .nav.navbar-nav li.dropdown a') Tells jQuery to select all a tags inside an li.dropdown(that are inside a .nav.navbar-nav)
*   .on('EVENT', FUNCTION(){ THE FUNCTION WE RUN WHEN EVENT IS FIRED });
*/
$('.navbar .nav.navbar-nav li.dropdown a').on('click', function(e) {
    $(e.target).parent().children('ul.dropdown-menu').slideToggle(300, function() {
        $(e.target).parent().toggleClass("open");
    }); 
});
 
