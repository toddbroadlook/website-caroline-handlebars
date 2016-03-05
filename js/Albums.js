// this file contains the data we need for the gallery
// The main object, "gallery" contains an array of album
// each album contains an array of photos 
// (plus a name and a thumbnail image)
// The photos contain an image src and some metadata

var portfolio = {
	categories : [
		{
			name : "Murals", 
			thumbnail : "images/img_1.jpg",
			cover : "img/stlukesmural.jpg",
			photos : [
				{	
					src : "img/cabin.png",
					title : "grafitti", 
					description : "some derelict appartments with grafitti"
				}, 
				{	
					src : "img/circus.png",
					title : "fountain", 
					description : "a huge dragon fountain"
				}, 
				{	
					src : "img/game.png",
					title : "tower", 
					description : "a colourful tower block"
				}, 
				{	
					src : "img/cake.png",
					title : "walkways", 
					description : "an interesting interior"
				} 
			]
		},
		{
			name : "Portraits", 
			thumbnail : "images/img_4.jpg",
			cover: "img/abbieportrait.jpg",
			photos : [
				{	
					src : "images/img_4.jpg",
					title : "syths", 
					description : "all workshops should aspire to being this tidy"
				}, 
				{	
					src : "images/img_9.jpg",
					title : "helmet", 
					description : "a sci-fi helmet"
				}, 
				{	
					src : "images/img_12.jpg",
					title : "drums", 
					description : "a rather nice drum kit"
				}  
			]
		},
		{
			name : "Landscapes", 
			cover : "img/hoppercopy.jpg",
			thumbnail : "images/img_17.jpg",
			photos : [
				{	
					src : "images/img_16.jpg",
					title : "dog in the snow", 
					description : "looks like he needs that jacket"
				}, 
				{	
					src : "images/img_17.jpg",
					title : "winter", 
					description : "a snowy scene in a park"
				}, 
				{	
					src : "images/img_18.jpg",
					title : "frosty pond", 
					description : "some ducks feeling cold"
				} 
			]
		}

	]
};