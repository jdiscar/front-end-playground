/* =============================================================
 * With code from Twitter Bootstrap and Bootstrap-Combobox (Daniel Farrell)
 * Updated by JDiscar to provide keyboard navigation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

 // Variables prepended by '$' are dom objects
 // options can override matcher, sorter, highlighter, menu, item, minLength, placeholder, source
 
 // data-placeholder will become the placeholder of the div
 // on select, both the typeahead select and select box change events will be triggered
 // You can access the combobox by accessing the data(Combobox) attribute
 
!function($) {

 "use strict"; // jshint ;_;

  var Combobox = function ( element, options ) {
		this.options = $.extend({}, $.fn.combobox.defaults, options)  // don't move!
		this.$container = $(element)  // don't move!
    this.$element = this.$container.find('input[type=text]')  // the visible input box
    this.matcher = this.options.matcher || this.matcher		
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter		
		this.updater = this.options.updater || this.updater	
    this.$menu = $(this.options.menu).appendTo('body')
    this.shown = false
    this.$button = this.$container.find('.dropdown-toggle')
    this.selected = false
		this.lunrindex = this.options.index
		this.songs = this.options.songs
		this.map = {}
		this.source = this.options.source || this.source
    this.listen()
  }

  Combobox.prototype = {

    constructor: Combobox
		
	// Go to the next item in the menu
  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

	// Go to the previous item in the menu
  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

		// Return true if the event is supported, otherwise false
  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

	// toggle between showing and hiding the menu
  , toggle: function () {
    if (this.$container.hasClass('combobox-selected')) {
      this.clearElement()
    } else {
      if (this.shown) {
        this.hide()
      } else {
        this.clearElement()
        this.lookup()
      }
    }
  }
	
  , clearElement: function () {
    this.$element.val('').focus()
  }

	// TODO		
  // Prepare the list of items to show
  , lookup: function (event) {
      this.query = this.$element.val()
			var items = []
			
			if(!this.query || this.query.length == 0 ) {
				for( var i = 0; i < songs.length; i++ ) {
					items.push( songs[i].title );
					this.map[songs[i].title] = "#song-"+i
				}
      } else if (this.query && this.query.length < this.options.minLength) {
				// Don't do a lookup if less than the minimum
        return this.shown ? this.hide() : this
      } else {
				var result = this.lunrindex.search(this.query);
				for( var i = 0; i < result.length; i++ ) {
					items.push( this.songs[result[i].ref].title );
					this.map[songs[result[i].ref].title] = "#song-"+result[i].ref
				}
			}

			return this.process(items)
    }

	// Process the items based off of the query
  , process: function (items) {
      var that = this

			// Only filter if the query has values
			//if (this.query) {
			//	items = $.grep(items, function (item) {
			//		return that.matcher(item)
			//	})
			//}
			//
      //items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }		
		
	// This function is used by Bootstrap to check if the search string typed by the user matches 
	// anything in the source list. Its purpose is to filter the auto-suggest list to only the 
	// relevant values. Return True to include the item, False to remove it
  , matcher: function (item) {
			// tilde is bitwise not, so -1 becomes zero (false) and every other number will be nonzero (true)
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }		
		
	// The Sorter function is responsible for sorting the list of suggestions filtered by the matcher
  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }
		
	// Render the items for display
  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
				i.find('a').attr('href', that.map[item])
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

	// Bootstrap uses highlighter to highlight user’s input within auto-suggested 
	// results. We can use a simple regex match to find and bold user’s input
  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }			
		
  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))

      this.$button
        .on('click', $.proxy(this.toggle, this))
    }

	/* 
	 * Event Handlers 
	 */
	
, show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }		
		
  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }		
		
	// javascript event where the browser is moved
  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }	
	
  // container and target handling
	// this is called when a menu item is selected
  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$container.addClass('combobox-selected')
      this.selected = true
			this.$element.val(val).trigger('blur')
			this.$element.val('')  // Why do I need to do an empty here?
			var result = this.hide()
			window.location.hash=this.map[val]
      return result
    }	
	
	, keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , focus: function (e) {
      this.focused = true
    }

	// When the menu is clicked on
  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }		
		
  , keyup: function (e) {
      switch(e.keyCode) {
				// Prevent lookups when moving around
        case 39: // right arrow
        case 38: // up arrow
        case 37: // left arrow
        case 36: // home
        case 35: // end
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break						

				// Select the current item
        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

				// Hide the menu
        case 27: // escape
          if (!this.shown) return
          this.hide()
          break
				
        case 40: // down arrow, don't move!
					if (this.shown) break									
				
				// Do a lookup
        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

	// triggered when input field loses focus	
  // force a match and add a delay on hide
  , blur: function (e) {
      var that = this
      this.focused = false
      var val = this.$element.val()
      if (!this.selected && val !== '' ) {
        this.$element.val('')
      }
      if (!this.mousedover && this.shown) setTimeout(function () { that.hide() }, 200)
    }
  }

  /* COMBOBOX PLUGIN DEFINITION
   * =========================== */

  $.fn.combobox = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('combobox')
        , options = typeof option == 'object' && option
      if(!data) $this.data('combobox', (data = new Combobox(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.combobox.defaults = {
		menu: '<ul class="typeahead typeahead-long dropdown-menu"></ul>'
		, item: '<li><a href="#"></a></li>'
		, minLength: 0
		, items: 18
		, placeholder: 'Search'
  }

  $.fn.combobox.Constructor = Combobox

}( window.jQuery );
