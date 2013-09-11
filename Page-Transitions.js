// JavaScript Document
/*
* page transition 0.1
* Jason McAlpin page transition script. This will run an animation on paeg load and exit. This version will fade in pages on standard compatible browsers
* copyright 2013, all rights reserved.
* 
* Init function is designed by Dean Edwards/Matthias Miller/John Resig
* http://dean.edwards.name/weblog/2006/06/again/
*/


//config

var transitionTargetDefault = 'body';
var transitionTargetOpacity = 0;
var bodyElement = document.getElementsByTagName(transitionTargetDefault);
var elem = bodyElement[0];

function init() {
	'use strict';
	// quit if this function has already been called
	if (initDone) {return;}

	// flag this function so we don't do the same thing twice
	var initDone = true;

	// kill the timer
	if (_timer) {clearInterval(_timer);}

	// make body hidden


	hideBody();
	transitionIn();
	detectButtons();
}

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
		'use strict';
		if (/loaded|complete/.test(document.readyState)) {
			init(); // call the onload handler
		}
	}, 10);
}

/* for other browsers */
window.onload = init;

function callback(e) {
	'use strict';
	var button, linkLocation;
	// deal with events called events or e
	if (!e) {var e = window.event;}

	// dealing with target and srcElement
	if (e.target) {button = e.target;}
	else if (e.srcElement) {button = e.srcElement;}
	
	// check if a button, if not toss it out
	if (button.tagName !== 'A'){
		return;
	}

	button.preventDefault();
	linkLocation = button.href;
	transitionOut(linkLocation);
}


function hideBody(){
	'use strict';
	elem.style.opacity = 0.0;
}

function detectButtons(){
	'use strict';
	// add callback to click event of all links.
	if (document.addEventListener){
		document.addEventListener('click', callback, false);}
	else
		{document.attachEvent('onclick', callback);}
}


function transitionIn(){
	'use strict';
	var _timer = setInterval( countUp(), 1000);
}

function transitionOut(linkPassed){
	'use strict';
	var _timer = setInterval( countDown(), 500);
	redirectPage(linkPassed);
}

function countUp(){
	'use strict';

	if(transitionTargetOpacity<1){
		transitionTargetOpacity+=0.025;
		elem.style.opacity = transitionTargetOpacity;
	} else{
		clearInterval(_timer);
	}
}

function countDown(){
	'use strict';
	if(transitionTargetOpacity>0){
		transitionTargetOpacity-=0.025;
		elem.style.opacity = transitionTargetOpacity;
	} else{
		clearInterval(_timer);
	}
}

function redirectPage(linkPassed) {
	'use strict';
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