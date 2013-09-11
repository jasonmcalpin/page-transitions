// JavaScript Document
/*
* page transition 0.1
* Jason McAlpin page transition script. This will run an animation on paeg load and exit. This version will fade in pages on standard compatible browsers
* copyright 2013, all rights reserved.
* 
* Init function is designed by Dean Edwards/Matthias Miller/John Resig
* http://dean.edwards.name/weblog/2006/06/again/
*/




function init() {
	'use strict'
	// quit if this function has already been called
	if (arguments.callee.done) return;

	// flag this function so we don't do the same thing twice
	arguments.callee.done = true;

	// kill the timer
	if (_timer) clearInterval(_timer);

	// make body hidden

	var bodyElement = document.getElementsByTagName("body");
	var elem = bodyElement[0];
	elem.style.opacity = .0;

	// add callback to click event of all links.
	if (document.addEventListener)
	    document.addEventListener('click', callback, false);
	else
	    document.attachEvent('onclick', callback);

	transitionIn('fade');
	detectButtons();
};

/* for Mozilla/Opera9 */
if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
  document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
  var script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      init(); // call the onload handler
    }
  };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      init(); // call the onload handler
    }
  }, 10);
}

/* for other browsers */
window.onload = init;





function callback(e) {
	'use strict'
    var e = window.e || e;

    if (e.target.tagName !== 'A')
        return;

    e.preventDefault();
	var linkLocation = this.href;
	transitionOut(linkLocation);
}






function transitionIn(){
	'use strict'
	var i=0;
	var _timer = setInterval( countUp, 1000);


}

function transitionOut(linkPassed){
	'use strict'
	var i=1;
	var _timer = setInterval( countDown, 1000);
	redirectPage(linkPassed);
}

function countUp(){
	if(i<1){
	i+=0.025;
	elem.style.opacity = i
	} else{
		clearInterval(_timer);
	}
};

function countDown(){
	if(i>0){
	i-=0.025;
	elem.style.opacity = i
	} else{
		clearInterval(_timer);
	}
};

function redirectPage(linkPassed) {
	'use strict'
	window.location = linkPassed;
}   

/* fade in page depreciated

jQuery( function() {
	
		// fade in page for browsers that don't support pageshow
		if (jQuery.browser.opera || jQuery.browser.msie){
				transitionIn();
		}
		// fade page out on click 
		jQuery("a").click(function(event){
						   event.preventDefault();
						   linkLocation = this.href;
						   transitionOut();
		});

}); //ready end
jQuery(window).bind('pageshow', function() {
		transitionIn();
});
     */