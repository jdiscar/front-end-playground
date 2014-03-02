$(document).ready(function() {
	// Set up the search combobox
	searchBox = $('.combobox').combobox()
	searchBox.data('combobox').lunrindex = index
	searchBox.data('combobox').songs = songs

	// Initially sort songs by title
	changeSortType('title');
	
	// Override Ctrl+F
	window.addEventListener("keydown", function (e) {
		if ( e.ctrlKey && e.keyCode == 70 ) { 
				$('#searchBox').focus();
				e.preventDefault();
		}
	})
});