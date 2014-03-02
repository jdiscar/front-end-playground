// State Variables
var sortType = "title"; //valid types: title, source
var layoutType = "top"; // valid types: top, left, right, lyricsonly
var chordPosition = "above"; // valid types: above, in
var searchBox = undefined;
var index = lunr(function () {
	this.field('title', {boost: 10});
	this.field('body');
	this.ref('id');
});

// Templates
var songTemplate = $("#songTemplate").html();
var songListTemplate = $("#songListTemplate").html();
var audioTemplate = $("#audioTemplate").html();
var linkTemplate = $("#linkTemplate").html();

// Allow for using text/template
String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)-[^}]*}/g, function(match, number) { 
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
};

// Redefine the lunr.pipeline run for better indexing
lunr.Pipeline.prototype.run = function (tokens) {
	var out = [], tokenLength = tokens.length, stackLength = this._stack.length;
	
	// Single Tokens
	for (var i = 0; i < tokenLength; i++) {
		var token = tokens[i];

		for (var j = 0; j < stackLength; j++) {
			token = this._stack[j](token, i, tokens);
			if (token === void 0) break;
		};

		if (token !== void 0 && token.length > 2) out.push(token);
	}

	// Add 2, 3, 4 grams
	for (var i = 0; i < tokenLength; i++) {    
		if(i+1 < tokenLength) {out.push(tokens[i]+" "+tokens[i+1]);}
		if(i+2 < tokenLength) {out.push(tokens[i]+" "+tokens[i+1]+" "+tokens[i+2]);}     
		//if(i+3 < tokenLength) {out.push(tokens[i]+" "+tokens[i+1]+" "+tokens[i+2]+" "+tokens[i+3]);}     		
	}
	
	return out;
}

// Sort array function by object property
function dynamicSort(property) {
	return function (a,b) {
		return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	}
}

// Creates the layout for the song with the given id via the template
function formatSong(id, transposeSteps) {
	var song = songs[id];
	var prevId = Math.max(id-1,0);
	var nextId = Math.min(id+1,songs.length-1);
	var lyrics = convertLyrics(transposeChord(song.lyrichords.join("\n"),transposeSteps),layoutType,chordPosition);
	var source = song.source;
	var audio = "";
	for( var i = 0; i < song.audio.length; i++ ) {
		audio += audioTemplate.format(song.audio[i].title, song.audio[i].url);
	}
	var links = "";
	for( var i = 0; i < song.links.length; i++ ) {
		links += linkTemplate.format(song.links[i].title, song.links[i].url);
	}
	return songTemplate.format(id,prevId,nextId,transposeSteps,song.title,lyrics,audio,source,links);    
}

function changeSortType(newSortType) {
	sortType = newSortType;
	reloadPage();
	
	/* Recreate the search index because ids have changed */
	index = lunr(function () {
		this.field('title', {boost: 10});
		this.field('body');
		this.ref('id');
	});

	for( var i = 0; i < songs.length; i++ ) {
		var song = {};
		song.title = songs[i].title;
		song.body = stripChords(songs[i].lyrichords.join(" "));
		song.id = i;
		index.add(song);
	}
	
	searchBox.data('combobox').lunrindex = index;
}

function changeLayoutType(newLayoutType) {
	layoutType = newLayoutType;
	reloadPage();
}

function changeChordPosition(newChordPosition) {
	chordPosition = newChordPosition;
	reloadPage();
}    

// Recreates the page
function reloadPage() {
	songs.sort(dynamicSort(sortType));
	$("#content").html("");
	$("#songlist").html("");
	for( var i = 0; i < songs.length; i++ ) {
		$("#content").append(formatSong(i, 0));
		$("#songlist").append(songListTemplate.format(i,songs[i].title));
	}
	searchBox.data('combobox').songs = songs;
}

// Reload and recreate html for the song with the specified id
function reloadSong(songId, transposeSteps) {
	$("#dsong-"+songId).html("");
	var template = formatSong(songId, transposeSteps);
	$("#dsong-"+songId).replaceWith(template);
}

// Print song
function reloadSingleSong(songId, transposeSteps) {
	var template = formatSong(songId, transposeSteps);
	$(".content").html("");
	$(".content").html(template);
}

// Get Request Parameter
function getRequestParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}