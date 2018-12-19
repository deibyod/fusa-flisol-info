/**
 * @package		Gantry Template Framework - RocketTheme
 * @version		1.9 April 14, 2014
 * @author		RocketTheme http://www.rockettheme.com
 * @copyright 	Copyright (C) 2007 - 2014 RocketTheme, LLC
 * @license		http://www.rockettheme.com/legal/license.php RocketTheme Proprietary Use License
 */


(function(){
	
	// change to different ids references if needed
	var id = 'rt-top',
		separator = 'rt-header-panel-divider';
	
	
	// change only if needed
	var mootools112 = (MooTools.version == '1.12' || MooTools.version == '1.11');
	var FixedBar = {
		init: function(){
			
			FixedBar.bar = (mootools112) ? $(id) : document.id(id);
			FixedBar.ie6 = (mootools112) ? window.ie6 : Browser.Engine.trident4;
			FixedBar.ie7 = (mootools112) ? window.ie7 : Browser.Engine.trident5;
			
			if (FixedBar.bar && !FixedBar.ie6){
				var height = (mootools112) ? FixedBar.bar.getSize().size.y : FixedBar.bar.getSize().y;
				if (FixedBar.ie7) height -= FixedBar.bar.getFirst().getStyle('padding-bottom').toInt();
				
				var lastDiv = new Element('div', {'styles': {'height': height}});
				
				if (mootools112) lastDiv.setHTML('&nbsp;');
				else lastDiv.set('html', '&nbsp;');
			
				lastDiv.inject(FixedBar.bar, 'before');
				
				FixedBar.getSizes();
				FixedBar.scrollEvent();
				window.addEvent('scroll', FixedBar.scrollEvent);
			}
			
		},
		
		getSizes: function(){
			var separatorElement = (mootools112) ? $(separator) : document.id(separator), next;
			if (!separatorElement) return;
			
			if (mootools112) next = (window.gecko) ? FixedBar.bar.getNext() : null;
			else next = (Browser.Engine.gecko) ? FixedBar.bar.getNext() : null;
			
			//var nextPadding = (next) ? next.getStyle('padding-bottom').toInt() : 0;
			var nextPadding = 0;
			FixedBar.separator = {
				'element': separatorElement,
				'position': separatorElement.getPosition().y - nextPadding,
				'sepSize': (mootools112) ? separatorElement.getSize().size.y : separatorElement.getSize().y,
				'barSize': (mootools112) ? FixedBar.bar.getSize().size.y : FixedBar.bar.getSize().y
			};
			
			if (FixedBar.ie7) FixedBar.separator['barSize'] -= 1;
		},
		
		scrollEvent: function(){
			var bar = FixedBar.separator,
				topPosition = ((mootools112) ? window.getSize().scroll.y : window.getScroll().y) + bar.barSize;
			
			if (topPosition >= bar.position) bar.element.setStyles({'top': bar.barSize, 'position': 'fixed'});
			else bar.element.setStyles({'top': '', 'position': 'absolute'});
		}
	};
	
	window.addEvent('load', FixedBar.init);

})();
