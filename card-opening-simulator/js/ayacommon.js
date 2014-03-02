// The 'cards' array comes from data.js

// State Variables
// TODO: Should probably wrap all the state logic into its own class
var views, currentWallpaper, currentSort;
var packsOpened = {"normal":0,"rare":0,"legendary":0};
var myCardProps = {};
var current = 0;
// TODO: Should probably precompile and reuse handlebars templates

/**
 * Get Request Parameter
 * @name - Name of the request parameter to fetch
 * @defaultResult - What to return if the request parameter is undefined.
 */
function getRequestParameterByName(name,defaultResult) {
	var regex, results;
	if( typeof defaultResult === 'undefined' ) defaultResult = "";
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	results = regex.exec(location.search);
	return results == null ? defaultResult : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/** 
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 * @min - Minimum value, inclusive
 * @max - Maximum value, inclusive
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};


/**** State Persistence ****/

/**
 * Loads the state from local storage.
 */
var loadState = function() {
	var myviews, mywallpaper, mysort;
	// Need to convert from JSON
	if(typeof(Storage) !== "undefined") {
		// Need to convert from JSON
		myviews = JSON.parse(localStorage.getItem("views"));
		mymycardprops = JSON.parse(localStorage.getItem("myCardProps"));
		mywallpaper = localStorage.getItem("currentWallpaper");
		mysort = localStorage.getItem("currentSort");
		mypacksopened = JSON.parse(localStorage.getItem("packsOpened"));
	}
	views = myviews ? myviews : views;
	myCardProps = mymycardprops ? mymycardprops : myCardProps;
	currentWallpaper = mywallpaper ? mywallpaper : currentWallpaper;
	currentSort = mysort ? mysort : currentSort;
	packsOpened = mypacksopened ? mypacksopened : packsOpened;
	views['wallpaper only'] = false;
};

/**
 * Saves the state to local storage.
 * @name - if defined, only saves that item
 */
var saveState = function(property) {
	if(typeof(property) !== "undefined") property = "all";
	if( property === "all" || property === "views" ) localStorage.setItem("views", JSON.stringify(views));
	if( property === "all" || property === "myCardProps" ) localStorage.setItem("myCardProps", JSON.stringify(myCardProps));
	if( property === "all" || property === "packsOpened" ) localStorage.setItem("packsOpened", JSON.stringify(packsOpened));
	if( property === "all" || property === "currentWallpaper" ) localStorage.setItem("currentWallpaper", currentWallpaper);
	if( property === "all" || property === "currentSort" ) localStorage.setItem("currentSort", currentSort);
};

/**
 * Reset State.
 */
var resetState = function(property) {
	// Need to convert from JSON
	localStorage.removeItem("myCardProps", JSON.stringify(myCardProps));
	localStorage.removeItem("packsOpened", JSON.stringify(packsOpened));
	location.reload();
};


/**** Card Manipulation ****/

/**
 * Add likes to a card. Changes the 'cards' state as well as the 'UI'
 * @index cards[index] that will be updated
 * @amount Amount to increase the likes by.  Can be negative.
 */
var likeCard = function(index,amount) {
	var likes, name;
	name = cards[index].name;
	likes = parseInt($("#like-"+index).text())+amount;
	$("#like-"+index).text(likes);
	if( typeof myCardProps[name] === 'undefined' || typeof myCardProps[name]['likes'] === 'undefined' ) {
		myCardProps[name] = {'likes':likes,'dateOwned':0};
	} else {	
		myCardProps[name]['likes'] = likes;
	}
	saveState("myCardProps");
};

/**
 * Gets the likes of a card. Creates likes (of 0) is undefined.
 * @name - Name of the card to get likes of
 */
var getLikes = function(name) {
	if( typeof myCardProps[name] === 'undefined' || typeof myCardProps[name]['likes'] === 'undefined' ) {
		myCardProps[name] = {'likes':0,'dateOwned':0};
		saveState("myCardProps");
		return 0;
	} else {
		return myCardProps[name]['likes'];
	}
};

/**
 * Gets the dateOwned of a card. Creates 0 entry is undefined.
 * @name - Name of the card to get likes of
 */
var getDateOwned = function(name) {
	if( typeof myCardProps[name] === 'undefined' || typeof myCardProps[name]['dateOwned'] === 'undefined' ) {
		myCardProps[name] = {'likes':0,'dateOwned':0};
		saveState("myCardProps");
		return 0;
	} else {
		return myCardProps[name]['dateOwned'];
	}
};

/**
 * Sets the dateOwned of a card to the current epoch time in seconds.
 * @name - Name of the card to get likes of
 */
var setDateOwned = function(name) {
	if( typeof myCardProps[name] === 'undefined' || typeof myCardProps[name]['dateOwned'] === 'undefined' ) {
		myCardProps[name] = {'likes':0,'dateOwned':Math.floor((new Date).getTime()/1000)};
	} else {
		myCardProps[name]['dateOwned'] = Math.floor((new Date).getTime()/1000);
	}
	saveState("myCardProps");
};


/**** Adding Cards ****/

/**
 * Get enough data to display a card.
 * @i - The cards index
 */
var getCardTemplateData = function(i) {
	var t = cards[i];
	t['i'] = i;
	t['previ'] = i-1;
	t['nexti'] = i+1;
	t['views'] = views;
	t['likes'] = getLikes(cards[i]['name']);
	
	// Cut off lore for display purposes. Should be optimized
	// to a one time operation in the data.js file
	offset = 240-cards[i]['caption'].length
	t['tlore'] = cards[i]['lore'].substring(0,offset);
	if( t['tlore'].length >= offset ) t['tlore'] += "...";
	
	return t;
}

/**
 * Add cards to the grid
 * @start - The cards index to start adding from
 */
var addCards = function(start) {
	var source, end, template, t, offset, html;
	end = start + 30;  // 30 Cards probably shouldn't be hardcoded
	if( end > cards.length ) end = cards.length;
	for( i = start; i < end; i++ ) {
		if( getDateOwned(cards[i]['name']) > 0 || views["unowned"] ) {
			// Display the actual card
			source   = $("#card-template").html();
			template = Handlebars.compile(source);
			t = getCardTemplateData(i);
			html = template(t);
			$(".cards").append(html);
		} else {
			// Display the placeholder card
			source   = $("#placeholder-template").html();
			template = Handlebars.compile(source);
			t = getCardTemplateData(i);
			html = template(t);
			$(".cards").append(html);
		}
	}
	return end;
};


/**** Card Detail Modal ****/

/**
 * Show the card detail modal.
 * @i - The cards[index] to display
 */
function showDialog (i) {
	var source, template, t, html;
	source   = $("#card-detail-template").html();
	template = Handlebars.compile(source);
	t = getCardTemplateData(i);
	html = template(t);
	
	// TODO: This is probably why the modal isn't working
	if( views["detail-infobox"] ) {
		$("#cardDetailsModal").css("width","900px");
		$("#cardDetailsModal").css("margin-left","-"+(parseInt($("#cardDetailsModal").css("width"))/2)+"px");
	} else {
		$("#cardDetailsModal").css("width","600px");
		$("#cardDetailsModal").css("margin-left","-"+(parseInt($("#cardDetailsModal").css("width"))/2)+"px");
	}
	
	$('.modal-title').html(cards[i].name);
	$('.modal-body').html('');
	$('.modal-body').append(html);
	$('#cardDetailsModal').modal('show'); 
};

/**
 * Close the card detail modal.
 */
function closeDialog () {
	$('#cardDetailsModal').modal('hide'); 
};


/**** Wallpaper Logic ****/

currentWallpaper = "Amaterasu";

/**
 * Sets the wallpaper to obj.name.  Primarily serves as 
 * a callback from the navbar dropdown checklist.
 * @isChecked - Whether or not the current obj is checked
 * @wasChanged - Whether or not the checkbox changed state. State 
 *       may not change if multiple check marks were not allowed.
 * @obj - The object. Guaranteed to have id, name, and isChecked.
 **/
var setWallpaper = function(isChecked,wasChanged,obj) {
	if(isChecked && wasChanged) {
		$('.custombg-stretch').css('background-image','url(img/wallpapers/'+obj.name+'_Wallpaper.jpg)'); 
		$('.custombg-fit').css('background-image','url(img/wallpapers/'+obj.name+'_Wallpaper.jpg)'); 
		currentWallpaper = obj.name;
		saveState("currentWallpaper");
	}
};

/**
 * Sets up the wallpapers and populates the appropriate navbar dropdown.
 */
var addWallpapers = function() {
	var wallpaperNames, data, isChecked, i;
	wallpaperNames = ["Amaterasu_Hiding","Amaterasu","Ameno_Uzume_Top","Behemoth","Behemoth_Xmas","Bisque_Doll_Tanabata","Chiyome_Mochizuki","Dojigiri","Dora_Annv","Emperor_Sutoku","Emperor_Wulie_Summer","Galaxy_Wars_Purity","Hansel_and_Gretel","HikoOri","Il_Milione","Kaguya_Hime","Kakinomoto_no_Hitomaro","Kenshin_Uesugi_Summer","Kesaran","Kotetsu_Top","Kotetsu","Lunar_Hare","Lunar_Lucilda","March_Hare","Mars","Mira_Annv","Mochizuki","Orihime","Osafune","Otsuya_No_Kata","Pipe_Fox_All","Pipe_Fox_Focused2","Pipe_Fox_Focused","Pipe_Fox","Princess_Konohanasakuya_Top","Princess_Konohanasakuya","Satellite_Cannon","Satori","Shutendoji_Calm","Shutendoji","Sigmund","The_Princess","Titania_NY","Titania","Udaijin_NYE","Vaisravana","Valkyrie","Vanilla","Walpurgis_Night","White_King"];
	data = [];
	for( i = 0; i < wallpaperNames.length; i++ ) {
		wallpaperNames[i] === currentWallpaper ? isChecked = true : isChecked = false;
		data.push({ id: i, label: wallpaperNames[i].replace(/\_/g," "), name: wallpaperNames[i], onToggle: setWallpaper, isChecked: isChecked});
	}
	$('.wallpaperlist').dropdownCheckbox({
		data: data,
		multipleChecks: false,
		templateButton: '<a href="#" class="dropdown-checkbox-toggle" data-toggle="dropdown">Wallpapers<b class="caret white-caret"></b></a>'
	});
	setWallpaper(true,true,{name:currentWallpaper});
};


/**** Card Manipulation ****/

// Default Property Map of valid views
views = {"wallpaper only":false,"wallpaper stretched":true,"name":true,"defense":false,"attack":false,"caption":true,"lore":true,"placeholders":true,"list-likebox":true,"list-infobox":true,"list-statusbox":true,"detail-infobox":true,"unowned cards":false};

/**
 * Refresh the UI based on the views settings.
 */
var refreshViews = function() {
	var setDisplay = function(viewProperty,selector,displayOnCheck) {
		if(typeof displayOnCheck === 'undefined') displayOnCheck = true;
		if(views[viewProperty] === displayOnCheck) {
			$(selector).toggleClass("hide",false);
		} else {
			$(selector).toggleClass("hide",true);
		}
	};
	
	setDisplay("wallpaper only",".content",false);
	setDisplay("wallpaper stretched",".wallpaperPreview.custombg-fit",false);
	setDisplay("name",".name");
	setDisplay("caption",".caption");
	setDisplay("lore",".lore");
	setDisplay("list-likebox",".likeBox");
	setDisplay("defense",".defense");
	setDisplay("attack",".attack");
	setDisplay("detail-infobox",".detail-infobox");
	setDisplay("placeholders",".placeholder");
	
	// Special Cases
	if(!views["name"] && !views["caption"] && !views["lore"]) {
		$(".list-infoBox").css("display","none");
		views["list-infobox"] = false;
	} else {
		$(".list-infoBox").css("display","block");
		views["list-infobox"] = true;
	}
	
	if(!views["attack"] && !views["defense"]) {
		$(".statusBox").css("display","none");
		views["list-statusbox"] = false;
	} else {
		$(".statusBox").css("display","block");
		views["list-statusbox"] = true;
	}
};

/**
 * Sets the wallpaper to obj.name.  Primarily serves as 
 * a callback from the navbar dropdown checklist.
 * @isChecked - Whether or not the current obj is checked
 * @wasChanged - Whether or not the checkbox changed state. State 
 *       may not change if multiple check marks were not allowed.
 * @obj - The object. Guaranteed to have id, name, and isChecked.
 */
var toggleView = function(isChecked,wasChanged,obj) {
	views[obj.name] = isChecked;
	refreshViews();
	saveState("views");
};

/**
 * Sets up the views and populates the appropriate navbar dropdown.
 */
var addViewList = function() {
	var viewNames, data, name;
	viewNames = ["Wallpaper Only","Wallpaper Stretched","Name","Caption","Lore","Attack","Defense","Like Box","Card Info"];
	data = [];
	for( var i = 0; i < viewNames.length; i++ ) {
		name = viewNames[i].toLowerCase();
		viewNames[i] === "Card Info" ? name = "detail-infobox" : name;	
		viewNames[i] === "Like Box" ? name = "list-likebox" : name;
		viewNames[i] === "Card Placeholders" ? name = "placeholders" : name;
		viewNames[i] === "Unowned Cards" ? name = "unowned" : name;
		data.push({ id: i, label: viewNames[i], name: name, onToggle: toggleView, isChecked: views[name]});
	}
	$('.viewlist').dropdownCheckbox({
		data: data,
		multipleChecks: true,
		templateButton: '<a href="#" class="dropdown-checkbox-toggle" data-toggle="dropdown">View<b class="caret white-caret"></b></a>'
	});	
	refreshViews();
};


/**** Sorting ****/

var currentSort = "name";

/**
 * Sort the cards
 * @property - The property to sort by
 * @isDefaultOrder - true if using default ordering, false if using opposite ordering
 */
var sortCards = function(property, isDefaultOrder) {
	var isDescending = false;
	if(typeof isDefaultOrder !== 'undefined') isDescending = isDefaultOrder;
	// Reverse default order for certain attributes
	if( $.inArray(property ,['likes','rarity','attack','defense','opened']) > -1 ) {
		isDescending = !isDescending; 
	}
	return function (a,b) {
		if( property === 'likes') {
			a = getLikes(a['name']);
			b = getLikes(b['name']);
		} else if( property === 'opened') {
			a = myCardProps[a['name']]['dateOwned'];
			b = myCardProps[b['name']]['dateOwned'];
		} else {
			a = a[property];
			b = b[property];
		}
		if( isDescending ) {
			return (a > b) ? -1 : (a < b) ? 1 : 0;
		} else {
			return (a > b) ? 1 : (a < b) ? -1 : 0;
		}
	}
}

/**
 * Changed the sorting of cards.  Primarily serves as 
 * a callback from the navbar dropdown checklist.
 * @isChecked - Whether or not the current obj is checked
 * @wasChanged - Whether or not the checkbox changed state. State 
 *       may not change if multiple check marks were not allowed.
 * @obj - The object. Guaranteed to have id, name, and isChecked.
 */
var sortChecked = function(isChecked,wasChanged,obj) { 
	var isDescending = !wasChanged;
	current = 0;
	if(isChecked) {
		currentSort = obj.name;
		cards.sort(sortCards(obj.name,isDescending)); 
		$(".cards").html("");
		current = addCards(current);
		saveState("currentSort");
	}
};

/**
 * Sets up the sorting and populates the appropriate navbar dropdown.
 */
var addSort = function() {
	var sortNames, data, i;
	sortNames = ["Name","Rarity","Attack","Defense","Type","Likes","Opened"];
	data = [];
	for( i = 0; i < sortNames.length; i++ ) {
		sortNames[i].toLowerCase() === currentSort ? isChecked = true : isChecked = false;
		data.push({ id: i, label: sortNames[i], name: sortNames[i].toLowerCase(), onToggle: sortChecked, isChecked: isChecked });
	}
	$('.sortlist').dropdownCheckbox({
		data: data,
		multipleChecks: false,
		templateButton: '<a href="#" class="dropdown-checkbox-toggle" data-toggle="dropdown">Sort<b class="caret white-caret"></b></a>'
	});
	cards.sort(sortCards(currentSort)); 
	current = addCards(current);
}