$(document).ready(function() {
	songs.sort(dynamicSort(sortType));
	$("#songlist").html("");
	for( var i = 0; i < songs.length; i++ ) {
		$("#songlist").append(songListTemplate.format(i,songs[i].title));
	}
	
	var songId = Number(getRequestParameterByName("songId"));
	var transpose = Number(getRequestParameterByName("transpose"));
	if( isNaN(songId) ) songId = 0;
	if( isNaN(transpose) ) transpose = 0;
	reloadSingleSong(songId,transpose);
});