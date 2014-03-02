// ugh... this code is especially unorganized...
$(document).ready(function() {
	var i, name, rarity, packType;
	var rarityGroups, rarityOwned, cardsOwned;
	var common, normal, rare, legendary, packProbabilities;
	
	// Kinda hacky semaphore to limit the number of times a button can be pushed.
	var cardsShown = 5;
	
	// Set the various probabilities
	common = new VoseAliasMethod([.75,.25,0,0,0]);
	normal = new VoseAliasMethod([.15,.25,.45,.1,.05]);
	rare = new VoseAliasMethod([0,0,.5,.3,.2]);
	legendary = new VoseAliasMethod([0,0,0,.7,.3]);
	packProbabilities = {"normal":[common,common,normal,normal,normal],"rare":[normal,normal,normal,rare,rare],"legendary":[common,normal,rare,rare,legendary]};
	
	function openPack(packType) {
		var rarityGroup, chosenCardIndex;
		var delay = 0;
		var nextIndex;
		
		// Kinda Hacky Semaphore to prevent calls to this function while it's still running
		if( cardsShown < 5 ) return;
		cardsShown = 0;
		
		packsOpened[packType] = packsOpened[packType] + 1;
		
		// For Each Card In The Pack:
		//   - Figure out Rarity Chosen, based off rarity probability
		//   - Randomly choose a card in that rarity, push to packArray
		//   - Uses the Vose Alias algorithm for "rolling a biased die."  See 
		//     http://www.keithschwarz.com/darts-dice-coins/ for more details.
		myCards = [];
		for( i = 0; i < packProbabilities[packType].length; i++ ) {
			nextIndex = packProbabilities[packType][i].next();
			// No Rarity of 0, so increment by 1
			rarityGroup = rarityGroups[nextIndex+1];
			chosenCardIndex = getRandomInt(0,rarityGroup.length-1);
			myCards.push(rarityGroup[chosenCardIndex]);
		}

		// Display the Cards and update the appropriate stats
		$(".cards").html("<div class='card-0 slot' /><div class='card-1 slot' /><div class='card-2 slot' /><div class='card-3 slot' /><div class='card-4 slot' />");
		for( i = 0; i < myCards.length; i++ ) {
			t = getCardTemplateData(myCards[i]);
			if( getDateOwned(t['name']) <= 0 ) {
				// The card is new, update stats and save
				rarityOwned[t['rarity']]++;
				setDateOwned(t['name']);
				cardsOwned++;
				t['new'] = true;
				saveState("myCardProps");
			}
			source   = $("#card-template").html();
			template = Handlebars.compile(source);
			html = template(t);
			
			setTimeout(function(html, i){$(".card-"+i).append(html);cardsShown++;}, delay, html, i);
			delay = delay + 400;
		}
		
		// Update the stats in the stats
		$('.stats').html('');
		$('.stats').append("<tr><td><b>Cards Owned:</b></td><td>" + cardsOwned + " / " + cards.length + "</td></tr>");
		$('.stats').append("<tr><td><b>Rarity 1 Cards:</b></td><td>" + rarityOwned['1'] + " / " + rarityGroups[1].length + "</td></tr>");
		$('.stats').append("<tr><td><b>Rarity 2 Cards:</b></td><td>"  + rarityOwned['2'] + " / " + rarityGroups[2].length + "</td></tr>");
		$('.stats').append("<tr><td><b>Rarity 3 Cards:</b></td><td>"  + rarityOwned['3'] + " / " + rarityGroups[3].length + "</td></tr>");
		$('.stats').append("<tr><td><b>Rarity 4 Cards:</b></td><td>"  + rarityOwned['4'] + " / " + rarityGroups[4].length + "</td></tr>");
		$('.stats').append("<tr><td><b>Rarity 5 Cards:</b></td><td>"  + rarityOwned['5'] + " / " + rarityGroups[5].length + "</td></tr>");
		$('.stats').append("<tr><td></td><td></td></tr>");
		$('.stats').append("<tr><td><b>Normal Packs Opened:</b><td>" + packsOpened['normal'] + "</td></tr>");
		$('.stats').append("<tr><td><b>Rare Packs Opened:</b><td>" + packsOpened['rare'] + "</td></tr>");
		$('.stats').append("<tr><td><b>Legendary Packs Opened:</b><td>" + packsOpened['legendary'] + "</td></tr>");
		
		saveState("packsOpened");
	}
	
	// INITIALIZE THE PAGE
	loadState();
	
	// TODO: Should probably set the height dynamically...
	$(".cards").css("min-height","310px");
	
	// Determine the pack type via the request parameter
	packType = getRequestParameterByName("type") !== "" ? getRequestParameterByName("type") : "normal";
	if( typeof packsOpened[packType] === 'undefined' ) packType = "normal"; 
	
	// For Each Card: Break the cards up into groups, based on their rarity.
	rarityGroups = {};
	rarityOwned = {};
	cardsOwned = 0;
	for( i = 0; i < cards.length; i++ ) {
		name = cards[i]['name'];
		rarity = cards[i]['rarity'];
		if( typeof rarityGroups[rarity] === 'undefined' ) rarityGroups[rarity] = [];
		if( typeof rarityOwned[rarity] === 'undefined' ) rarityOwned[rarity] = 0;
		if( getDateOwned(name) > 0 ) {
			cardsOwned = cardsOwned + 1;
			rarityOwned[rarity] = rarityOwned[rarity] + 1;
		}
		rarityGroups[rarity].push(i);
	}
	
	// Open a normal pack and then attach the callbacks to the pack open buttons
	openPack("normal");
	$("#openNormalPack").click(function() {openPack("normal");});
	$("#openRarePack").click(function() {openPack("rare");});
	$("#openLegendaryPack").click(function() {openPack("legendary");});
	
	// Make sure the stat span is equal to the probability span
	$('.statsspan').css('height',$('.probabilitiesspan').css('height'));
	
	addWallpapers();
	refreshViews();
});