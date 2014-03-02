Ukulele Adventure Time
===
This is a client side webapp that acts as a songbook for the cartoon Adventure Time. It can easily be adapted to display lyrics and chords for other songs by simply changing the data.js file. It was purely made for fun. The Code Practices here aren't very good: the markup has many unnecessary attributes and the javascript objects are all in the global space. But this is acceptable for a throwaway weekend project.

[Click here to see the thing live](http://ukulele.kumodori.com/adventuretime/)

This app features:
- Completely client side. This app has no state, but can be run off a local file system.
- Searching music for a particular song.  This is all done client-side via lunr.js.  The song titles are weighted more heavily, but searches can be done on the lyrics as well.  1, 2, and 3-gram words are indexed.
- All songs are JSON objects in data.js.
- Convert condensed lyrics and chords to a table display. Freely transpose the chords.
- Dynamically resort the song list based on sort criteria. Also, dynamically reposition the chord diagrams.
- Custom modified bootstrap dropdown input box. This lets you navigate the search results with the keyboard.
- Templates are done natively via string regexes on script objects.
- UI framework via Bootstrap 2.3
- JQuery 1.7.2 for selection.