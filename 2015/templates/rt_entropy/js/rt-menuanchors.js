/**
 * @package		Gantry Template Framework - RocketTheme
 * @version		1.9 April 14, 2014
 * @author		RocketTheme http://www.rockettheme.com
 * @copyright 	Copyright (C) 2007 - 2014 RocketTheme, LLC
 * @license		http://www.rockettheme.com/legal/license.php RocketTheme Proprietary Use License
 */


(function(){
	Fx.Scroll.implement({
		start: function(x, y){
			if (!this.check(x, y)) return this;
			var $chk = function(obj){
			    return !!(obj || obj === 0);
			};
			
			var scrollSize = this.element.getScrollSize(),
				scroll = this.element.getScroll(), 
				values = {x: x, y: y};
				
				scroll['y'] -= this.options.offset['y'];
			for (var z in values){
				var max = scrollSize[z];
				if ($chk(values[z])) values[z] = (typeOf(values[z]) == 'number') ? values[z] : max;
				else values[z] = scroll[z];
				values[z] += this.options.offset[z];
			}
			return this.parent([scroll.x, scroll.y], [values.x, values.y]);
		}
	});
	
	var MenuAnchors = {
		top: 'rt-top',
		divider: 'rt-header-panel-divider',
		options: {
			link: 'cancel',
			transition: Fx.Transitions.Expo.easeInOut,
			onComplete: function(){
				if (window.fusionmenu){
					if (!Browser.Engine.gecko) window.fusionmenu.disableScroll = false;
					else (function(){ window.fusionmenu.disableScroll = false; }).delay(500);
				}
			}
		},
		
		init: function(){
			MenuAnchors.menuItems = $$('.menutop a').filter(function(item){
				return item.href.contains('#') || item.className.contains('active-to-top');
			});
			MenuAnchors.items = $$('.menutop > li');
			
			if (!MenuAnchors.items.length) return;
			
			if (MenuAnchors.menuItems.length){
				MenuAnchors.scroller = new Fx.Scroll(window, MenuAnchors.options);
				MenuAnchors.menuItems.each(MenuAnchors.grabAnchor);
			}
		},
		
		grabAnchor: function(item){
			var id = item.get('href');
			id = id.split('#')[1];
			
			var el = document.id(id),
				top = document.id(MenuAnchors.top),
				divider = document.id(MenuAnchors.divider);
				
			var height = top.getSize().y;
			
			item.addEvent('click', function(e){
				var itemHref = item.href.split('#'),
					locaHref = window.location.href.split('#');
				
				if (item.aSubMenu){
					if (item.aSubMenu.parentLinks && item.aSubMenu.parentLinks.length){
						item.aSubMenu.parentLinks[0].aSubMenu.hideOtherSubMenus();
						item.aSubMenu.parentLinks[0].aSubMenu.hideSubMenu();
					} else {
						if (window.fusionmenu){
							window.fusionmenu.disableScroll = true;
						}
						item.aSubMenu.childMenu.fireEvent('hide');
						item.aSubMenu.btn.getParent().fireEvent('mouseleave');
						item.aSubMenu.hideOtherSubMenus();
						item.aSubMenu.hideSubMenu();
					}
				}
					
				if (itemHref[0] == locaHref[0] || itemHref[0] == locaHref[0]+'site' || itemHref[0]+'site' == locaHref[0]) e.stop();
				else return;
				
				if (el) MenuAnchors.scroller.start(0, el.getPosition().y - height);
				else MenuAnchors.scroller.start(0, 0);
				
				MenuAnchors.items.removeClass('active');
				item.getParent().addClass('active');
			});
			
			if (id == window.location.hash.replace('#', '')){
				if (id.length){
					MenuAnchors.items.removeClass('active');
					item.getParent().addClass('active');
				}
				if (el) MenuAnchors.scroller.start(0, el.getPosition().y - height);
			}
		}
		
	};

	window.addEvent('load', MenuAnchors.init);

})();
