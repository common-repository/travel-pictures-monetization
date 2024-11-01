var imported = document.createElement('script');
imported.src = 'https://www.googletagmanager.com/gtag/js?id=UA-161866337-2';
document.head.appendChild(imported);
window.dataLayer = window.dataLayer || [];
function htag(){dataLayer.push(arguments);}
htag('js', new Date());
htag('config', 'UA-161866337-2');
htag('event', 'Hatlas Vision Image Wordpress Plugin Load - ' + window.location.hostname);


function hatlasClick(placename, imglink) {
htag('event', 'buttonClick - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'content_name': placename, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'buttonClick - ' + window.location.hostname, 'Cityzeum', 'click', {'content_name': placename, 'img_url' : imglink});
//htag2('event', 'buttonClick - ' + window.location.hostname, {'content_name': placename, 'img_url' : imglink, 'partner_id': 'Cityzeum'});

};


function hatlasLoad(placename, imglink) {
htag('event', 'buttonLoad - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'content_name': placename, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'buttonLoad - ' + window.location.hostname, 'Cityzeum', 'load', {'content_name': placename, 'img_url' : imglink});
//htag2('event', 'buttonLoad - ' + window.location.hostname, {'content_name': placename, 'img_url' : imglink, 'partner_id': 'Cityzeum'});

};


function hatlasHover(placename, imglink) {
htag('event', 'buttonHover - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'content_name': placename, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'buttonHover - ' + window.location.hostname, 'Cityzeum', 'hover', {'content_name': placename, 'img_url' : imglink});
//htag2('event', 'buttonHover - ' + window.location.hostname, {'content_name': placename, 'img_url' : imglink, 'partner_id': 'Cityzeum'});

};


function hatlasImageClick(imglink) {
htag('event', 'imageClick - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'imageClick - ' + window.location.hostname, 'Cityzeum', 'click', {'img_url' : imglink});
//htag2('event', 'imageClick - ' + window.location.hostname, {'img_url' : imglink, 'partner_id': 'Cityzeum'});

};

function hatlasImageLoad(imglink) {
htag('event', 'imageLoad - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'imageLoad - ' + window.location.hostname, 'Cityzeum', 'load', {'img_url' : imglink});
//htag2('event', 'imageLoad - ' + window.location.hostname, {'img_url' : imglink, 'partner_id': 'Cityzeum'});

};

function hatlasImageHover(imglink) {
htag('event', 'imageHover - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'imageHover - ' + window.location.hostname, 'Cityzeum', 'hover', {'img_url' : imglink});
//htag2('event', 'imageHover - ' + window.location.hostname, {'img_url' : imglink, 'partner_id': 'Cityzeum'});

};

function hatlasTravelImageHover(imglink) {
htag('event', 'TravelimageHover - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'imageHover - ' + window.location.hostname, 'Cityzeum', 'hover', {'img_url' : imglink});
//htag2('event', 'imageHover - ' + window.location.hostname, {'img_url' : imglink, 'partner_id': 'Cityzeum'});

};

function hatlasTravelImageClick(imglink) {
htag('event', 'TravelimageClick - ' + hatlasTravelData.affiliate_id, {'event_category' : hatlasTravelData.affiliate_id, 'event_label' : imglink, 'img_url' : imglink, 'partner_id': 'Wordpress'});
//htag('send', 'imageClick - ' + window.location.hostname, 'Cityzeum', 'click', {'img_url' : imglink});
//htag2('event', 'imageClick - ' + window.location.hostname, {'img_url' : imglink, 'partner_id': 'Cityzeum'});

};




function APIcall(link, $) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url:'https://hatlastravel.com/getpictures/synchronize',
			data: {
				'url': link,
				'partner_id': hatlasTravelData.affiliate_id,
				'ext': "wordpress",
				'source': window.location.href,
				'website': window.location.hostname
			},
			success: function(data) {
				resolve(data);
			},
			error: function(error) {
				reject(error);
			}
		});
	});
}



;(function($){
	$.prototype.isInViewport = function() {
	  var elementTop = $(this).offset().top;
	  var elementBottom = elementTop + $(this).outerHeight();

	  var viewportTop = $(window).scrollTop();
	  var viewportBottom = viewportTop + $(window).height();

	  return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	// Regular expression filter
	$.expr[':'].regex = function(elem, index, match) {
		let matchParams = match[3].split(','),
		validLabels = /^(data|css):/,
		attr = {
			method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
			property: matchParams.shift().replace(validLabels,'')
        },
		regexFlags = 'ig',
		regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
		return regex.test(jQuery(elem)[attr.method](attr.property));
	}

	let imgSelector = "img"; // Process all images matching this selector

	let processImageLink = function(_img) {
		// Image into jQuery's object
		let img = $(_img);

		// Get image src attribute
		let img_link = _img.dataset.src;
		if (_img.dataset.src === undefined) {
			img_link = _img.src;
		}
		
		if ( img_link.includes("data:image") ) {
		  img_link = _img.getAttribute("data-ezsrc");
		  
		  if ( img_link === undefined || img_link === null ) {
			img_link = _img.getAttribute("data-lazy-src");
		  }
		  
		  if ( img_link === undefined || img_link === null ) {
			img_link = _img.getAttribute("nitro-lazy-src");
		  }
		}
			
		if ( img_link === undefined || img_link === null ) {
		    img.addClass("no-hatlas");
			delete _img;
			delete img;
			return false;
		}
		
		if ( img_link.includes("tile.openstreetmap.org") || img_link.includes("staticmaplite") || img_link.includes("logo") || img_link.includes("Header")) {
			img.addClass("no-hatlas");
			delete _img;
			delete img;
			return false;
		}
		
		
		// Get Width
		let btnWidth = img.width();
		let btnWidth2 = img.width() - 15;
    
		// Check if image is too small
		if(btnWidth < 102) {
			delete _img;
			delete img;
			return false;
		}
		// Mark image as processed
		img.addClass("ht-processed");
		

		// Perform API request
		APIcall(img_link, $).then(data => {
			//console.log(data, img[0]);
			//console.log(data["name"]);
			hatlasImageLoad(img_link);
			
			if (data["name"] == "Travel" || data["name"] == "Mount Scenery") {
				_img.setAttribute('onclick','hatlasTravelImageClick("' + img_link + '")');
				img.hover(function() {hatlasTravelImageHover(img_link);})
				
				img.addClass("no-hatlas");
				delete _img;
				delete img;
				return false;
			}
			
			if (data["name"] == "None" || data["name"] == "Mount Scenery" || data["Results"] == "Error") {
				_img.setAttribute('onclick','hatlasImageClick("' + img_link + '")');
				img.hover(function() {hatlasImageHover(img_link);})
				
				img.addClass("no-hatlas");
				delete _img;
				delete img;
				return false;
			}
			
			// Get and process img's parent element
			let imgParent = img.parent();

			// Set image's parent position
			if(imgParent.css("position") == "static") {
				imgParent.css("position", "relative");
			}
			

			// Templating
			let placeName = data["name"];
			let hotel = data["hotel"];
			let flight = data["flight"];
			let cta = data["cta"];
			let imgLnk = data["url"];
			let DESC = data["DESC"];
			let description = data["description"];
			let wiki_url = data["wiki_url"];
			let REDIRECT = data["REDIRECT"];
			
			//Check for results
			if ( placeName === undefined) {
				img.addClass("no-hatlas");
				delete _img;
				delete img;
				return false;
			}
			
			hatlasLoad(placeName, imgLnk);
			
			// Get Lang
			let userLang = navigator.language || navigator.userLanguage; 
			
			if ( btnWidth < 120 ) {
				
					if ( REDIRECT ) {
						
						if ( DESC ) {
					
						var book_text = "Réservez votre voyage";
						var btnTemplate = '<div class="ht-link ht-link-loading" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<a class="ht-button" style="background-color: ' + hatlasTravelData.color_btn + '!important" href="https://www.hatlastravel.com/booking/2?link=' + imgLnk + '&partner=' + hatlasTravelData.affiliate_id + '" target="_blank">\
											<span class="ht-text-no-hover" after-hover="' + cta + '" before-hover="' + placeName + '">' + placeName + '</span>\
											<span class="ht-text-after-hover">' + cta + '</span>\
											<div class="ht-icon">\
												<em class="fas booknow fa-2x"> > </em>\
											</div>\
										</a>\
									</div>';
					  
					    }
						
						else {
							
						var book_text = "Réservez votre voyage";
						var btnTemplate = '<div class="ht-link ht-link-loading" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<a class="ht-button" style="background-color: ' + hatlasTravelData.color_btn + '!important" href="https://www.hatlastravel.com/booking/2?link=' + imgLnk + '&partner=' + hatlasTravelData.affiliate_id + '" target="_blank">\
											<span class="ht-text-no-hover" after-hover="' + cta + '" before-hover="' + placeName + '">' + placeName + '</span>\
											<span class="ht-text-after-hover">' + cta + '</span>\
											<div class="ht-icon">\
												<em class="fas booknow fa-2x"> > </em>\
											</div>\
										</a>\
									</div>';
							
							
							
						}
						
					}
					
					else {
						
						var btnTemplate = '<div class="ht-link ht-link-loading" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<p style="line-height: 1!important; margin-right: 10px!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black!important; opacity: 0.8; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: inline-block; "><img style="position: unset!important;display: inline-block; margin: 0!important; padding: 0!important; height: unset!important; width: unset!important;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVQ4jbXSPUpDURAF4C8/QkhjJ2QHQZtUElELwU0Ee3UJbsFNWLoAwc5KTCArUMRUQYiljXmVWjjiJcb7nogHBuacmTl3uAx/RC1T62Mr8hHGVQ1WcY4urkLbxy0O8Fy21SXO0Eq0VmgXZcN9TBaGU5MJNlOxvtC0HWsXwYe4ibyI2k7OYI7XhL9FpLyQwQamS4w/H5tiPWcA1xgs0QdRK8Uu7rGSaA3cYa+KAR+fdZzwI183UQk9PGEtYhbaN+RO+RSd6HnEyW82gDYeIto/NTUzBi84TPL/wTuqUieYvrEJ0gAAAABJRU5ErkJggg=="/>   ' + placeName + ' </p>\
										</div>';
						
						
					}
					 
					
			}
			else {
				
				if ( REDIRECT ) {
				
						if ( DESC ) {
					
						var book_text = "Réservez votre voyage";
						var btnTemplate = '<div class="ht-link ht-link-loading" style="text-align: left;!important" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<p style="line-height: 1!important; margin-right: 10px!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black!important; opacity: 0.8; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: inline-block; "><img style="position: unset!important;display: inline-block; margin: 0!important; padding: 0!important; height: unset!important; width: unset!important;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVQ4jbXSPUpDURAF4C8/QkhjJ2QHQZtUElELwU0Ee3UJbsFNWLoAwc5KTCArUMRUQYiljXmVWjjiJcb7nogHBuacmTl3uAx/RC1T62Mr8hHGVQ1WcY4urkLbxy0O8Fy21SXO0Eq0VmgXZcN9TBaGU5MJNlOxvtC0HWsXwYe4ibyI2k7OYI7XhL9FpLyQwQamS4w/H5tiPWcA1xgs0QdRK8Uu7rGSaA3cYa+KAR+fdZzwI183UQk9PGEtYhbaN+RO+RSd6HnEyW82gDYeIto/NTUzBi84TPL/wTuqUieYvrEJ0gAAAABJRU5ErkJggg=="/>   ' + placeName + ' </p>\
										<p style="line-height: 1!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black; opacity: 0.9!important; width: 40%!important; min-width: 16rem!important; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: block; ">' + description + ' <br><a style="font-size: 0.6rem!important" target="_blank" href="' + wiki_url + '">Source</a><a style="font-size: 0.6rem!important" href="https://hatlasvision.com" target="_blank"> | Powered by Hatlas Vision</a></p>\
										<a class="ht-button" style="background-color: ' + hatlasTravelData.color_btn + '!important" href="https://www.hatlastravel.com/booking/2?link=' + imgLnk + '&partner=' + hatlasTravelData.affiliate_id + '" target="_blank">\
											<span class="ht-text-no-hover" after-hover="' + cta + '" before-hover="' + cta + '">' + cta + '</span>\
											<span class="ht-text-after-hover">' + cta + '</span>\
											<div class="ht-icon">\
												<em class="fas booknow fa-2x"> > </em>\
											</div>\
										</a>\
										</div>';
					  
						}
						
						else {
							
						var book_text = "Réservez votre voyage";
						var btnTemplate = '<div class="ht-link ht-link-loading" style="text-align: left;!important" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<p style="line-height: 1!important; margin-right: 10px!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black!important; opacity: 0.8; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: inline-block; "><img style="position: unset!important;display: inline-block; margin: 0!important; padding: 0!important; height: unset!important; width: unset!important;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVQ4jbXSPUpDURAF4C8/QkhjJ2QHQZtUElELwU0Ee3UJbsFNWLoAwc5KTCArUMRUQYiljXmVWjjiJcb7nogHBuacmTl3uAx/RC1T62Mr8hHGVQ1WcY4urkLbxy0O8Fy21SXO0Eq0VmgXZcN9TBaGU5MJNlOxvtC0HWsXwYe4ibyI2k7OYI7XhL9FpLyQwQamS4w/H5tiPWcA1xgs0QdRK8Uu7rGSaA3cYa+KAR+fdZzwI183UQk9PGEtYhbaN+RO+RSd6HnEyW82gDYeIto/NTUzBi84TPL/wTuqUieYvrEJ0gAAAABJRU5ErkJggg=="/>   ' + placeName + ' </p>\
										<a class="ht-button" style="background-color: ' + hatlasTravelData.color_btn + '!important" href="https://www.hatlastravel.com/booking/2?link=' + imgLnk + '&partner=' + hatlasTravelData.affiliate_id + '" target="_blank">\
											<span class="ht-text-no-hover" after-hover="' + cta + '" before-hover="' + cta + '">' + cta + '</span>\
											<span class="ht-text-after-hover">' + cta + '</span>\
											<div class="ht-icon">\
												<em class="fas booknow fa-2x"> > </em>\
											</div>\
										</a>\
										</div>';
							
							
							
						}
						
				}
				
				else {
						
						
						if ( DESC ) {
					
						var book_text = "Réservez votre voyage";
						var btnTemplate = '<div class="ht-link ht-link-loading" style="text-align: left;!important" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<p style="line-height: 1!important; margin-right: 10px!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black!important; opacity: 0.8; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: inline-block; "><img style="position: unset!important;display: inline-block; margin: 0!important; padding: 0!important; height: unset!important; width: unset!important;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVQ4jbXSPUpDURAF4C8/QkhjJ2QHQZtUElELwU0Ee3UJbsFNWLoAwc5KTCArUMRUQYiljXmVWjjiJcb7nogHBuacmTl3uAx/RC1T62Mr8hHGVQ1WcY4urkLbxy0O8Fy21SXO0Eq0VmgXZcN9TBaGU5MJNlOxvtC0HWsXwYe4ibyI2k7OYI7XhL9FpLyQwQamS4w/H5tiPWcA1xgs0QdRK8Uu7rGSaA3cYa+KAR+fdZzwI183UQk9PGEtYhbaN+RO+RSd6HnEyW82gDYeIto/NTUzBi84TPL/wTuqUieYvrEJ0gAAAABJRU5ErkJggg=="/>   ' + placeName + ' </p>\
										<p style="line-height: 1!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black; opacity: 0.9!important; width: 40%!important; min-width: 16rem!important; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: block; ">' + description + ' <br><a style="font-size: 0.6rem!important" target="_blank" href="' + wiki_url + '">Source</a><a style="font-size: 0.6rem!important" href="https://hatlasvision.com" target="_blank"> | Powered by Hatlas Vision</a></p>\
										</div>';
					  
						}
						
						else {
							
						var book_text = "Réservez votre voyage";
						var btnTemplate = '<div class="ht-link ht-link-loading" style="text-align: left;!important" onClick="hatlasClick(' + "'" + placeName + "'" + ', ' + "'" + imgLnk + "'" + ')">\
										<p style="line-height: 1!important; margin-right: 10px!important; font-weight: 500!important; text-align: unset!important; font-size: 1rem!important; background-color: white!important; color: black!important; opacity: 0.8; margin: 0; padding: 5px; border-radius: 10px; margin-bottom: 10px; display: inline-block; "><img style="position: unset!important;display: inline-block; margin: 0!important; padding: 0!important; height: unset!important; width: unset!important;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA3ElEQVQ4jbXSPUpDURAF4C8/QkhjJ2QHQZtUElELwU0Ee3UJbsFNWLoAwc5KTCArUMRUQYiljXmVWjjiJcb7nogHBuacmTl3uAx/RC1T62Mr8hHGVQ1WcY4urkLbxy0O8Fy21SXO0Eq0VmgXZcN9TBaGU5MJNlOxvtC0HWsXwYe4ibyI2k7OYI7XhL9FpLyQwQamS4w/H5tiPWcA1xgs0QdRK8Uu7rGSaA3cYa+KAR+fdZzwI183UQk9PGEtYhbaN+RO+RSd6HnEyW82gDYeIto/NTUzBi84TPL/wTuqUieYvrEJ0gAAAABJRU5ErkJggg=="/>   ' + placeName + ' </p>\
										</div>';
							
							
							
						}
				}
						
						
					  					  											
			}
			
			// Create button
			let lnk = $(btnTemplate);
			imgParent.append(lnk);
			
			
			
			// Fading
			lnk.css({"opacity": "0", "transition": "0.4s"});
			 img.hover(
				  function() {
					lnk.css({"opacity": "1"});
				  }, function() {
					  lnk.css({"opacity": "0"});
					})
			  
			lnk.hover(
				  function() {
					lnk.css({"opacity": "1"});
				  }, function() {
					  lnk.css({"opacity": "0"});
					})
					
			img.on('touchstart', function() {
					lnk.css({"opacity": "1", "transition": "0.4s"});
				  });
				
			img.on('touchend', function() {
					lnk.css({"opacity": "0", "transition": "6s"});
				  });
				  
			if(hatlasTravelData.is_hover == 1) {
				
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				//btn on scroll
				
				$(window).on('resize scroll', function() {
				  lnk.each(function() {
					if ($(this).isInViewport()) {
					  lnk.css({"opacity": "1", "transition": "2s", "transition-delay": "2s"});
					} else {
					  lnk.css({"opacity": "0"});
					}
				  });
				});
				}	  
			}
			else {
			
			$(window).on('resize scroll', function() {
				  lnk.each(function() {
					if ($(this).isInViewport()) {
					  lnk.css({"opacity": "1", "transition": "2s"});
					} else {
					  lnk.css({"opacity": "0"});
					}
				  });
				});
				
			
			}
		
			
      
      let btn = imgParent.find(".ht-button");
      let text_left = btn.find(".ht-text-no-hover");
      
      // Calculate offsets
      var topOffset = img.position().top + img.outerHeight() + parseFloat(img.css("marginTop")) + parseFloat(img.css("paddingTop")) + parseFloat(img.css("borderTopWidth"));
      var leftOffset = img.position().left + parseFloat(img.css("marginLeft")) + parseFloat(img.css("paddingLeft")) + parseFloat(img.css("borderLeftWidth"));

      // Tweak and set button offsets
      topOffset -= lnk.outerHeight();
	  
	  if(topOffset > 1000)
		 {
		   topOffset = img.outerHeight() + parseFloat(img.css("marginTop")) + parseFloat(img.css("paddingTop")) + parseFloat(img.css("borderTopWidth"));
		 }
		 
		 
      lnk.css({"top": (topOffset - 5)+ "px", "left": (leftOffset + 5) + "px", "width": btnWidth + "px"}).removeClass("ht-link-loading");
		
	  if ( btnWidth > 300 ) {
	  img.hover(
            function() {
              btn.attr("style", "width: 40%!important; min-width: 256px!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }
          );
		
	  img.hover(function() {hatlasHover(placeName, imgLnk);});
		 
	  img.on('touchstart', function() {
              btn.attr("style", "width: 40%!important; min-width: 256px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  hatlasHover(placeName, imgLnk);
			  
       });
		  
	   btn.hover(
            function() {
              btn.attr("style", "width: 40%!important; min-width: 256px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("after-hover"));
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("before-hover"));
            }
          );
		  
	  }
	  
      if ( btnWidth < 300 ) {
	  text_left.attr("style", "font-size: 12px!important");
	  img.hover(
            function() {
              btn.attr("style", "width:" +  btnWidth2 + "px!important; min-width: 0!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }
          );
	  
	  img.hover(function() {hatlasHover(placeName, imgLnk);});
		  
	   img.on('touchstart', function() {
              btn.attr("style", "width:" +  btnWidth2 + "px!important; min-width: 0!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  hatlasHover(placeName, imgLnk);
			  
       });
		  
      btn.hover(
            function() {
              btn.attr("style", "width:" +  btnWidth2 + "px!important; min-width: 0!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("after-hover"));
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("before-hover"));
            }
          );
      }
	  
	  if ( btnWidth > 600 ) {
		
	  img.hover(
            function() {
				hatlasHover(placeName, imgLnk);
			}
          );
		  
	  text_left.attr("style", "font-size: 16px!important");
	  
	  lnk.css({"top": (topOffset - 25)+ "px", "left": (leftOffset + (btnWidth / 2)) + "px", "width": btnWidth + "px"}).removeClass("ht-link-loading");
	 
      }

      
		}).catch(error => {
			console.log(error);
		});

		// Prevent memory leak
		delete _img;
		delete img;
	}

	let fixImageOffset = function(_img) {
		// Image into jQuery's object
		let img = $(_img);
		//console.log("offset");
		// Image parent
		let imgParent = img.parent();

		// Button container
		let lnk = imgParent.find(".ht-link");
		let btn = imgParent.find(".ht-button");
		let text_left = btn.find(".ht-text-no-hover");
		// Image width is greater than 59 px, show the button
		lnk.removeClass("ht-link-loading");
		//console.log("Showing button...");
		
		// Get Width
		let btnWidth = img.width();
		let btnWidth2 = img.width() - 15;
		
		// Calculate offsets
		var topOffset = img.position().top + img.outerHeight() + parseFloat(img.css("marginTop")) + parseFloat(img.css("paddingTop")) + parseFloat(img.css("borderTopWidth"));
		var leftOffset = img.position().left + parseFloat(img.css("marginLeft")) + parseFloat(img.css("paddingLeft")) + parseFloat(img.css("borderLeftWidth"));

		// Tweak and set button offsets
		topOffset -= lnk.outerHeight();
		
		if(topOffset > 1000)
		 {
		   topOffset = img.outerHeight() + parseFloat(img.css("marginTop")) + parseFloat(img.css("paddingTop")) + parseFloat(img.css("borderTopWidth"));
		 }
		 
		lnk.css({"top": (topOffset - 5)+ "px", "left": (leftOffset + 5) + "px", "width": btnWidth + "px"}).removeClass("ht-link-loading");
		
		 if ( btnWidth > 300 ) {
	  img.hover(
            function() {
              btn.attr("style", "width: 40%!important; min-width: 256px!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }
          );
	  img.on('touchstart', function() {
             btn.attr("style", "width: 40%!important; min-width: 256px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  
       });
		  
	   btn.hover(
            function() {
              btn.attr("style", "width: 40%!important; min-width: 256px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("after-hover"));
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("before-hover"));
            }
          );
		  
	  }
	  
      if ( btnWidth < 300 ) {
	  text_left.attr("style", "font-size: 12px!important");
	  img.hover(
            function() {
              btn.attr("style", "width:" +  btnWidth2 + "px!important; min-width: 0!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }, function() {
               btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
            }
          );
		  
	  img.on('touchstart', function() {
               btn.attr("style", "width:" +  btnWidth2 + "px!important; min-width: 0!important; background-color: " + hatlasTravelData.color_btn + "!important");
			   
       });
		  
      btn.hover(
            function() {
              btn.attr("style", "width:" +  btnWidth2 + "px!important; min-width: 0!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("after-hover"));
            }, function() {
              btn.attr("style", "width: 20%!important; min-width: 128px!important; background-color: " + hatlasTravelData.color_btn + "!important");
			  text_left.text(text_left.attr("before-hover"));
            }
          );
      }
	  
	  if ( btnWidth > 600 ) {
	  text_left.attr("style", "font-size: 16px!important");
	  
	  lnk.css({"top": (topOffset - 25)+ "px", "left": (leftOffset + (btnWidth / 2)) + "px", "width": btnWidth + "px"}).removeClass("ht-link-loading");
	 
	 
      }

		// Prevent memory leak
		delete _img;
		delete img;
	}

	let processAllImagesLinks = function() {
		$(imgSelector).not(".ht-processed, .no-hatlas, .ht-excluded").each((index, img) => { processImageLink(img) });
	}

	let fixAllImagesOffsets = function() {
		$(imgSelector).filter(".ht-processed").each((index, img) => { fixImageOffset(img) });
	}

	$(document).ready(() => {
		// Mark excluded images
		if(hatlasTravelData.cssClasses.length > 0) {
			for(let i = 0; i < hatlasTravelData.cssClasses.length; i++) {
				let className = hatlasTravelData.cssClasses[i].trim();
				if(className == "") continue;
				console.log(className);
				$("img:regex(class, " + className + ")").addClass("ht-excluded");
			}
		}
		if(hatlasTravelData.parentCssClasses.length > 0) {
			for(let i = 0; i < hatlasTravelData.parentCssClasses.length; i++) {
				let className = hatlasTravelData.parentCssClasses[i].trim();
				if(className == "") continue;
				$(":regex(class, " + className + ")").find("img").addClass("ht-excluded");
			}
		}

		// This will handle ONLY images' links, but not their offset
		processAllImagesLinks();
		setInterval(processAllImagesLinks, 3000); // 10 seconds? I recommend to use a short time interval. Yes, it will be a higher load, but remember that this routine, after the first run, will only processs non-processed images, not the whole document set of images.
		
		//test_cache
		// This will handle images' offset (this will be executed every 0.5 seconds to fix buttons' offset)
      fixAllImagesOffsets();
	 setInterval(fixAllImagesOffsets, 2000);
	
		
	});
})(jQuery);