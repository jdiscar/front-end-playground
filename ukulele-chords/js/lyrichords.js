var knownChords = {"A#+":"", "A#.1":"", "A#.2":"", "A#":"", "A#5":"", "A#6-9":"", "A#6":"", "A#7+5":"", "A#7-5":"", "A#7.1":"", "A#7":"", "A#7SUS2":"", "A#7SUS4":"", "A#9":"", "A#ADD9":"", "A#DIM.1":"", "A#DIM":"", "A#DIM7":"", "A#M+7":"", "A#M":"", "A#M6":"", "A#M7-5":"", "A#M7":"", "A#M9":"", "A#MAJ7":"", "A#SUS2":"", "A#SUS4":"", "A+":"", "A+7SUS4":"", "A-AB":"", "A-C#":"", "A-G":"", "A.1":"", "A.2":"", "A":"", "A11":"", "A13":"", "A5":"", "A6-9":"", "A6.1":"", "A6":"", "A7+5":"", "A7-5":"", "A7-C#":"", "A7.1":"", "A7.2":"", "A7":"", "A7SUS2.1":"", "A7SUS2":"", "A7SUS4":"", "A9":"", "AADD4":"", "AADD9":"", "AB+":"", "AB":"", "AB5":"", "AB6-9":"", "AB6":"", "AB7+5":"", "AB7-5":"", "AB7.1":"", "AB7":"", "AB7SUS2":"", "AB7SUS4":"", "AB9":"", "ABADD4":"", "ABDIM":"", "ABM+7":"", "ABM":"", "ABM6":"", "ABM7-5":"", "ABM7":"", "ABM9":"", "ABMAJ7":"", "ABSUS2":"", "ABSUS4":"", "ADIM":"", "ADIM7":"", "AM+7-C":"", "AM+7":"", "AM-C":"", "AM.1":"", "AM.2":"", "AM":"", "AM6":"", "AM7-5":"", "AM7.1":"", "AM7.2":"", "AM7.3":"", "AM7":"", "AM9":"", "AMAJ7":"", "ASUS2":"", "ASUS4":"", "B+":"", "B.1":"", "B":"", "B5":"", "B6-9":"", "B6.1":"", "B6":"", "B7+5":"", "B7-5":"", "B7.1":"", "B7":"", "B7SUS2":"", "B7SUS4":"", "B9":"", "BADD9":"", "BB+":"", "BB.1":"", "BB":"", "BB5":"", "BB6-9":"", "BB6":"", "BB7+5":"", "BB7-5":"", "BB7.1":"", "BB7":"", "BB7SUS2":"", "BB7SUS4":"", "BB9":"", "BBADD9":"", "BBDIM.1":"", "BBDIM":"", "BBDIM7":"", "BBM+7":"", "BBM":"", "BBM6":"", "BBM7-5":"", "BBM7":"", "BBM9":"", "BBMAJ7":"", "BBSUS2":"", "BBSUS4":"", "BDIM":"", "BDIM7":"", "BM+7":"", "BM":"", "BM6":"", "BM7-5.1":"", "BM7-5":"", "BM7":"", "BM9.1":"", "BM9":"", "BMAJ7":"", "BSUS2":"", "BSUS4":"", "C#+":"", "C#.1":"", "C#.2":"", "C#":"", "C#13":"", "C#5":"", "C#6-9":"", "C#6":"", "C#7+5":"", "C#7-5":"", "C#7.1":"", "C#7":"", "C#7SUS2":"", "C#7SUS4":"", "C#9":"", "C#ADD9":"", "C#DIM":"", "C#DIM7":"", "C#M+7":"", "C#M.1":"", "C#M":"", "C#M6.1":"", "C#M6":"", "C#M7-5":"", "C#M7.1":"", "C#M7":"", "C#M9":"", "C#MAJ7":"", "C#SUS2":"", "C#SUS4":"", "C+":"", "C.1":"", "C.2":"", "C":"", "C11":"", "C13":"", "C5":"", "C6-9":"", "C6.1":"", "C6.2":"", "C6.3":"", "C6":"", "C7+5":"", "C7-5":"", "C7-G":"", "C7.1":"", "C7":"", "C7B9B5":"", "C7SUS2":"", "C7SUS4":"", "C9.1":"", "C9.2":"", "C9":"", "CADD9.1":"", "CADD9":"", "CDIM":"", "CDIM7":"", "CM+7":"", "CM.1":"", "CM":"", "CM6.1":"", "CM6":"", "CM7-5":"", "CM7":"", "CM9.1":"", "CM9":"", "CMAJ7.1":"", "CMAJ7":"", "CSUS2":"", "CSUS4":"", "D#+":"", "D#.1":"", "D#":"", "D#5":"", "D#6-9.1":"", "D#6-9":"", "D#6":"", "D#7+5":"", "D#7-5":"", "D#7.1":"", "D#7":"", "D#7SUS2":"", "D#7SUS4":"", "D#9":"", "D#ADD9":"", "D#DIM":"", "D#DIM7":"", "D#M+7":"", "D#M":"", "D#M6":"", "D#M7-5":"", "D#M7.1":"", "D#M7":"", "D#M9":"", "D#MAJ7":"", "D#SUS2":"", "D#SUS4.1":"", "D#SUS4":"", "D+.1":"", "D+":"", "D.1":"", "D.2":"", "D":"", "D13":"", "D5":"", "D6-9":"", "D6":"", "D7+5":"", "D7-5":"", "D7.1":"", "D7":"", "D7B9B5":"", "D7SUS2":"", "D7SUS4":"", "D9.1":"", "D9":"", "DADD9.1":"", "DADD9":"", "DB#ADD9":"", "DB+":"", "DB.1":"", "DB.2":"", "DB":"", "DB13":"", "DB5":"", "DB6-9":"", "DB6":"", "DB7+5":"", "DB7-5":"", "DB7.1":"", "DB7":"", "DB7SUS2":"", "DB7SUS4":"", "DB9":"", "DBADD9":"", "DBDIM":"", "DBM+7":"", "DBM.1":"", "DBM":"", "DBM6.1":"", "DBM6":"", "DBM7-5":"", "DBM7.1":"", "DBM7":"", "DBM9":"", "DBMAJ7":"", "DBSUS2":"", "DBSUS4":"", "DDDIM7":"", "DDIM":"", "DDIM7":"", "DM+7":"", "DM":"", "DM6.1":"", "DM6":"", "DM7-5":"", "DM7.1":"", "DM7":"", "DM9":"", "DMAJ7.1":"", "DMAJ7":"", "DSUS2":"", "DSUS4.1":"", "DSUS4":"", "E+":"", "E.1":"", "E.2":"", "E":"", "E13":"", "E5":"", "E6-9":"", "E6.1":"", "E6":"", "E7+5":"", "E7-5":"", "E7.1":"", "E7":"", "E7SUS2":"", "E7SUS4":"", "E9":"", "EB+":"", "EB.1":"", "EB":"", "EB5":"", "EB6-9.1":"", "EB6-9":"", "EB6":"", "EB7+5":"", "EB7-5":"", "EB7.1":"", "EB7":"", "EB7SUS2":"", "EB7SUS4":"", "EB9":"", "EBADD9":"", "EBDIM":"", "EBDIM7":"", "EBM+7":"", "EBM":"", "EBM6":"", "EBM7-5":"", "EBM7.1":"", "EBM7":"", "EBM9":"", "EBMAJ7":"", "EBSUS2":"", "EBSUS4.1":"", "EBSUS4":"", "EDIM":"", "EDIM7":"", "EM+7":"", "EM-EB":"", "EM-F":"", "EM.1":"", "EM":"", "EM6":"", "EM7-5":"", "EM7":"", "EM9":"", "EMAJ7":"", "ESUS2":"", "ESUS4.1":"", "ESUS4":"", "F#+":"", "F#-G":"", "F#":"", "F#5":"", "F#6-9":"", "F#6":"", "F#7+5":"", "F#7-5":"", "F#7":"", "F#7SUS2":"", "F#7SUS4":"", "F#9.1":"", "F#9":"", "F#ADD4":"", "F#ADD9":"", "F#DIM":"", "F#DIM7":"", "F#M+7":"", "F#M":"", "F#M6":"", "F#M7-5":"", "F#M7":"", "F#M9":"", "F#MAJ7":"", "F#SUS2":"", "F#SUS4":"", "F+":"", "F-C":"", "F.2":"", "F.3":"", "F":"", "F5":"", "F6-9":"", "F6.1":"", "F6":"", "F7+5":"", "F7-5":"", "F7-A":"", "F7":"", "F7SUS2":"", "F7SUS4":"", "F9":"", "FADD4.1":"", "FADD4":"", "FADD9":"", "FDIM":"", "FDIM7":"", "FM+7":"", "FM":"", "FM6":"", "FM7-5":"", "FM7":"", "FM9":"", "FMAJ7.1":"", "FMAJ7.2":"", "FMAJ7":"", "FSUS2":"", "FSUS4.1":"", "FSUS4":"", "G#+":"", "G#":"", "G#5":"", "G#6-9":"", "G#6":"", "G#7+5":"", "G#7-5":"", "G#7.1":"", "G#7":"", "G#7SUS2":"", "G#7SUS4":"", "G#9":"", "G#ADD4":"", "G#ADD9":"", "G#DIM":"", "G#DIM7":"", "G#M+7":"", "G#M":"", "G#M6":"", "G#M7-5":"", "G#M7":"", "G#M9":"", "G#MAJ7":"", "G#SUS2":"", "G#SUS4":"", "G+":"", "G.1":"", "G":"", "G13":"", "G5":"", "G6-9":"", "G6":"", "G6SUS2":"", "G7+5":"", "G7-5":"", "G7":"", "G7SUS2":"", "G7SUS4":"", "G9.1":"", "G9.2":"", "G9":"", "GADD4":"", "GADD9":"", "GB+":"", "GB-G":"", "GB":"", "GB5":"", "GB6-9":"", "GB6":"", "GB7+5":"", "GB7-5":"", "GB7":"", "GB7SUS2":"", "GB7SUS4":"", "GB9":"", "GBADD4":"", "GBADD9":"", "GBDIM":"", "GBDIM7":"", "GBM+7":"", "GBM":"", "GBM6":"", "GBM7-5":"", "GBM7":"", "GBM9":"", "GBMAJ7":"", "GBSUS2":"", "GBSUS4":"", "GDIM.1":"", "GDIM":"", "GDIM7":"", "GM+7":"", "GM.1":"", "GM":"", "GM6":"", "GM7-5":"", "GM7":"", "GM9":"", "GMAJ7":"", "GSUS2+5":"", "GSUS2":"", "GSUS4":""};

function stripChords(originalLyrics) {
	return originalLyrics.replace(new RegExp("{[^}]+}","g"),"");
}

/*
 * This functions converts original lyrics to final formatted lyrics.
 * Valid Types: top, left, right, off
 * Chord Position: above, in
 */
function convertLyrics(originalLyrics, type, chordPosition)
{
	type = type.toLowerCase();

	if( type == "off" ) return "<div><pre>"+stripChords(originalLyrics)+"</pre></div>";

	var seenChords = {};
	var convertedLyrics = "";        
	
	// Options
	var strictSpacing = false;
	var autoNewline = true;
	var startChord = "{";
	var endChord = "}";

	/* 
	   Convert the original text into (chord\nlyric\n)+ converted text
	   if in the special format.
	*/
	var currentChord = "";
	var chordLine = "";
	var lyricLine = "";
	var inChord = false;
	var chordSpacingOverflow = 0;
	for (var i = 0; i < originalLyrics.length; i++) {
		var c = originalLyrics.charAt(i);
		
		if( c == startChord ) {
			// This marks the start of a chord
			inChord = true;
			currentChord = "";
		} else if( c == endChord ) {
			// This is the end of the chord
			// Update the seen chords.
			inChord = false;
			if( currentChord.toUpperCase() in knownChords ) {
				if( seenChords[currentChord] != undefined ) {
					seenChords[currentChord]++;
				} else {
					seenChords[currentChord] = 1;
				}
			}
			currentChord = "";
		} else if( c == "\n" ) {
			// Moving to the next line
			// Finish this line and reset all trackers
			if( chordLine.trim() != "") chordLine += c; else chordLine = "";
			if( lyricLine.trim() != "") lyricLine += c; else lyricLine = "";
			convertedLyrics += chordLine + lyricLine;
			if( autoNewline ) {
				convertedLyrics += '\n';
			}
			chordLine = "";
			lyricLine = "";                
			chordSpacingOverflow = 0;
		} else if( inChord ) {
			chordLine += c;
			currentChord += c;
			chordSpacingOverflow++;
			if( strictSpacing ) {
				lyricLine += ' ';
			}
		} else if( !inChord) {
			lyricLine += c;
			if( strictSpacing ) {
				chordLine += ' ';
			} else {
				if( chordSpacingOverflow <= 0 ) {
					chordLine += ' ';
				}
			}
			if( chordSpacingOverflow > 0 ) {
				chordSpacingOverflow--;
			}                
		}
	}
	// Take care of the last line in case the lyrics didn't end with a newline
	if( chordLine.trim() != "") chordLine += '\n'; else chordLine = "";
	convertedLyrics += chordLine + lyricLine;
	
	if( chordPosition == "in" ) convertedLyrics = originalLyrics;

	// Create a table that shows all the chords used in this song
	if( type == "top" ) {
		var chordCount = 0;
		var chordTable = "";
		for(var key in seenChords)
		{
			chordTable += "<td><img width='96' height='128' src='./img/uke-chords/"+escape(key)+".png' /></td>";
			chordCount++;
			if( chordCount%10 == 0 ) 
				chordTable += "</tr><tr>";
		}
		chordTable = "<table><tr>"+chordTable+"</tr></table>";
		convertedLyrics = "<table width='100%'><tr><td valign='top' align='left'>"+chordTable+"</td></tr><tr><td width='100%' valign='top'><pre>"+convertedLyrics+"</pre></td></tr></table>";
	} else if( type == "left" ) {
		var chordCount = 0;
		var chordTable = "";
		for(var key in seenChords)
		{
			chordTable += "<td><img width='96' height='128' src='./img/uke-chords/"+escape(key)+".png' /></td>";
			chordCount++;
			if( chordCount%2 == 0 ) 
				chordTable += "</tr><tr>";
		}
		chordTable = "<table><tr>"+chordTable+"</tr></table>";
		convertedLyrics = "<table width='100%'><tr><td valign='top' align='right' width=200>"+chordTable+"</td><td valign='top'><pre>"+convertedLyrics+"</pre></td></tr></table>";
	} else if( type == "right" ) {
		var chordCount = 0;
		var chordTable = "";
		for(var key in seenChords)
		{
			chordTable += "<td><img width='96' height='128' src='./img/uke-chords/"+escape(key)+".png' /></td>";
			chordCount++;
			if( chordCount%2 == 0 ) 
				chordTable += "</tr><tr>";
		}
		chordTable = "<table><tr>"+chordTable+"</tr></table>";
		convertedLyrics = "<table width='100%'><tr><td valign='top'><pre>"+convertedLyrics+"</pre></td><td valign='top' width=200>"+chordTable+"</td></tr></table>";
	}
	
	return convertedLyrics;
}

function transposeChord(chord, amount) {
	var scale = ["{C", "{C#", "{D", "{D#", "{E", "{F", "{F#", "{G", "{G#", "{A", "{A#", "{B"];
	return chord.replace(/{[CDEFGAB]#?/g,
		function(match) {
			var i = (scale.indexOf(match) + amount) % scale.length;
			return scale[ i < 0 ? i + scale.length : i ];
		});
}