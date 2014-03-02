$(document).ready(function() {
	var reloading;
	
	// INITIALIZE THE PAGE
	loadState();
	
	if( getRequestParameterByName("collection") !== "" ) {
		views['placeholders'] = true;
		views['unowned'] = false;
		$("#collectionLink").css({"font-weight":"bold","color":"#C0C0C0"});
	} else {
		views['placeholders'] = false;
		views['unowned'] = true;	
		$("#cardsLink").css({"font-weight":"bold","color":"#C0C0C0"});
	}
	
	addViewList();
	addSort();
	addWallpapers();
	
	// SET EVENTS
	
	// Set the infinite Scroll
	reloading = false;
	$(window).scroll(function () { 
		if (!reloading && $(window).scrollTop() >= $(document).height() - $(window).height()) {
			reloading = true;
			setTimeout(function(html, i){current = addCards(current);}, 200, current);
			reloading = false;
		}
	});
});