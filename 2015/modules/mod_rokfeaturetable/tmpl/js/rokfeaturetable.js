window.addEvent("domready",function(){var b=$$(".featuretable, .rokfeaturetable"),d={},a;var c=b.getElements(".featuretable-col");b.each(function(g,e){var f=c[e];
f.each(function(h,j){if(h.hasClass("highlight")){d[e]=j;a="highlight";}else{if(h.hasClass("ft-highlight")){d[e]=j;a="ft-highlight";}}h.addEvents({mouseenter:function(){f.removeClass(a);
this.addClass(a);},mouseleave:function(){this.removeClass(a);}});});if((d[e]!=null)){g.addEvent("mouseleave",function(){g.getElements(".featuretable-col").removeClass(a);
g.getElements(".featuretable-col")[d[e]].addClass(a);});}});});