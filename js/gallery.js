
/*
 *		This file contains the javascript code for our gallery
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var albums_template, photos_template, photo_template, slideshow_template;

// variables to store the current displayed album and photo
var current_category = portfolio.categories[0];
var current_photo = current_category.photos[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
	$('.category-backbutton').html(current_category.name)
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

	//
	// compile all of our templates ready for use
	//
	var source   = $("#portfolio-mainview-template").html();
	albums_template = Handlebars.compile(source);
	
	source   = $("#portfolio-pieceview-template").html();
	photos_template = Handlebars.compile(source);
	
	source   = $("#portfolio-piecedetailview-template").html();
	photo_template = Handlebars.compile(source);
	
	Handlebars.registerHelper('grouped_each', function(every, context, options) {
	    var out = "", subcontext = [], i;
	    if (context && context.length > 0) {
	        for (i = 0; i < context.length; i++) {
	            if (i > 0 && i % every === 0) {
	                out += options.fn(subcontext);
	                subcontext = [];
	            }
	            subcontext.push(context[i]);
	        }
	        out += options.fn(subcontext);
	    }
	    return out;
	});

	// 
	//  clicking on the albums tab shows the 
	//  thumbnails of all the albums
	//
	$("#portfolio-tab").click(function () {
		if(location.hash != "portfolio")
			location.hash = "portfolio";
		// displays the albums template
		showTemplate(albums_template, portfolio);

		// make the albums tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$("#portfolio-tab").addClass("active");


		$(".category-thumbnail").click(function (){
			if(location.hash != "category")
				location.hash = "category";
			// get the index (position in the array)
			// of the album we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			// set the current album to this album
			current_category = portfolio.categories[index];

			// displays the photos template
			showTemplate(photos_template, current_category);

            $(".portfolio-backbutton").click( function(){ $("#portfolio-tab").click();});
            
			// add an on click al all the photo thumbnails
			// which displays the photo in a modal popup
			$(".piece-thumbnail").click(function (){
				if(location.hash != "piece")
					location.hash = "piece";
				// get the index (position in the array)
				// of the photo we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current photo to this photo
				current_photo = current_category.photos[index];

				// displays the single photo template
				showTemplate(photo_template, current_photo);
                
                $(".portfolio-backbutton").click(function(){ $("#portfolio-tab").click();});
                $(".category-backbutton").click(function(){ $("#category-tab").click();});
			});
		});
	});

	$("#category-tab").click(function (){
		if(location.hash != "category")
			location.hash = "category";
		// displays the photos template
		showTemplate(photos_template, current_category);

        $(".portfolio-backbutton").click( function(){ $("#portfolio-tab").click();});
        
		// add an on click al all the photo thumbnails
		// which displays the photo in a modal popup
		$(".piece-thumbnail").click(function (){
			// get the index (position in the array)
			// of the photo we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the photo in
			// the array - @index)
			if(location.hash != "piece")
				location.hash = "piece";

			var index = $(this).data("id");

			// set the current photo to this photo
			current_photo = current_category.photos[index];

			// displays the single photo template
			showTemplate(photo_template, current_photo);
            
            $(".portfolio-backbutton").click(function(){ $("#portfolio-tab").click();});
            $(".category-backbutton").click(function(){ $("#category-tab").click();});
		});
	});

	$(window).on('hashchange', function() {
    	if (location.hash === "#category")
    		$("#category-tab").click();
    	if (location.hash === "#portfolio")
    		$("#portfolio-tab").click();
    	if (location.hash === "#piece") {
    		showTemplate(photo_template, current_photo);
            
            $(".portfolio-backbutton").click(function(){ $("#portfolio-tab").click();});
            $(".category-backbutton").click(function(){ $("#category-tab").click();});
    	}
    		
	});
	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$("#portfolio-tab").click();



});