
/*
 *		This file contains the javascript code for our gallery
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var portfolio_template, category_template, detail_view_template;

//var main_piece_image_stash;
// variables to store the current displayed album and photo
var current_category = portfolio.categories[0];
var current_piece = current_category.pieces[0];

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
	portfolio_template = Handlebars.compile(source);
	
	source   = $("#portfolio-pieceview-template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#portfolio-piecedetailview-template").html();
	detail_view_template = Handlebars.compile(source);
	
	Handlebars.registerHelper('grouped_each', function(every, context, options) {
	    var out        = '',
	        subcontext = {}, // Declare an object, instead of an array
	        i;
	    if (context && context.length > 0) {
	        for (i = 0; i < context.length; i++) {
	            if (i > 0 && i % every === 0) {
	                out += options.fn(subcontext);
	                subcontext = {};
	            }
	          
	            // Declare keys on your object,
	            // instead of blindly pushing into an empty array
	            subcontext[i] = context[i];
	        }
	        out += options.fn(subcontext);
	    }
	    return out;
	});

	// 
	//  clicking on the portfolio tab shows the 
	//  cover picture of all the categories
	//
	$("#portfolio-tab").click(function () {
		if(location.hash != "portfolio")
			location.hash = "portfolio";

		showTemplate(portfolio_template, portfolio);

		$(".category-thumbnail").click(function (){
			if(location.hash != "#category")
				location.hash = "category";
			// get the index (position in the array)
			// of the category we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			current_category = portfolio.categories[index];

			showTemplate(category_template, current_category);

            $(".portfolio-backbutton").click( function(){ $("#portfolio-tab").click();});
            
			// add an on click al all the piece thumbnails
			$(".piece-thumbnail").click(function (){
				if(location.hash != "#piece")
					location.hash = "piece";

				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the piece in
				// the array - @index)
				var index = $(this).data("id");

				// set the current piece to this piece
				current_piece = current_category.pieces[index];

				// displays the single photo template
				showTemplate(detail_view_template, current_piece);
                
                $(".portfolio-backbutton").click(function(){ $("#portfolio-tab").click();});
                $(".category-backbutton").click(function(){ $("#category-tab").click();});
			});
		});
	});

	$("#category-tab").click(function (){
		if(location.hash != "#category")
			location.hash = "category";

		showTemplate(category_template, current_category);

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
			current_piece = current_category.pieces[index];

			// displays the single photo template
			showTemplate(detail_view_template, current_piece);
            
            $(".portfolio-backbutton").click(function(){ $("#portfolio-tab").click();});
            $(".category-backbutton").click(function(){ $("#category-tab").click();});
            $(".closeup-piece-image").mouseover(function(){ 
                var main_image = document.getElementById("main-piece-image");
            	document.getElementById("main-piece-image").src=this.src;
            });
		});
	});

	$(window).on('hashchange', function() {
    	if (location.hash === "#category")
    		$("#category-tab").click();
    	if (location.hash === "#portfolio")
    		$("#portfolio-tab").click();
    	if (location.hash === "#piece") {
    		showTemplate(detail_view_template, current_piece);
            
            $(".portfolio-backbutton").click(function(){ $("#portfolio-tab").click();});
            $(".category-backbutton").click(function(){ $("#category-tab").click();});

            $(".closeup-piece-image").mouseover(function(){ 
            	var main_image = document.getElementById("main-piece-image");
            	document.getElementById("main-piece-image").src=this.src;
				
            });
    	}
    	if (location.hash != "#portfolio") {
			var divPosition = $('#content').offset();
	    	$('html, body').animate({scrollTop: divPosition.top}, 0);
    	}
    		
	});
	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$("#portfolio-tab").click();

	window.scrollTo(0, 0).delay(200); //Even though we start our in portfolio view we want to show the top of the page 

});