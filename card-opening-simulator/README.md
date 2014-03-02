Card Opening Simulator
===
This is a client side webapp that acts as a card pack opening simulator. It can easily be adapted to work with generic sets of cards. It was made for fun and for experimentation with bootstrap/CSS3. Code Practices are not what I'd do in production. My main focus for this project was practicing modern CSS3 and not on making reusable javascript. The javascript organization is actually pretty bad, but I think it's okay for a one-off proof of concept.

[Click here to see a live demo.](http://kumodori.com/card-opening-simulator/)

This app features:
- Completely client side. Uses Local Storage for keeping track of state.
- Card information comes from JSON objects defined in sample-data.js
- Uses the Vose Alias method for simulating card packs where some cards are less likely to be seen than other cards.
- Dynamically change the background, card sorting, and which elements are displayed
- Different views for cards you've collected versus all available cards
- Custom infinite scroll for displaying more cards (only going down, not working on mobile).
- Templates via Handlebars 1.3.0.
- Font-Awesome for icons.
- UI framework via Bootstrap 2.3. Responsive design elements.
- JQuery 2.1.0 for selection.