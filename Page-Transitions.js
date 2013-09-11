// JavaScript Document
/*
* page transition 0.1
* Jason McAlpin page transition script. This will run an animation on paeg load and exit. This version will fade in pages on standard compatible browsers
* copyright 2013, all rights reserved.
* 
* Init function is designed by Dean Edwards/Matthias Miller/John Resig
* http://dean.edwards.name/weblog/2006/06/again/
*/



(function(){
	'use strict';
	if(window.console){
		var	goose = console;
	} else {
		var	goose ={'log':''};
	}
	var transitionTargetDefault = 'body',
		transitionTargetOpacity = 0,
		initDone = false,
		bodyElement, elem;


	function init() {

		// quit if this function has already been called
		if (initDone === true) {
			goose.log('already run');
			return;
		}

		// flag this function so we don't do the same thing twice
		initDone = true;

		// kill the timer
		if (_timer) {clearInterval(_timer);}

		
		//setup transition target
		bodyElement = document.getElementsByTagName(transitionTargetDefault);
		elem = bodyElement[0];

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
	
			if (/loaded|complete/.test(document.readyState)) {
				init(); // call the onload handler
			}
		}, 10);
	}

	/* for other browsers */
	window.onload = init;

	function callback(e) {

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

		elem.style.opacity = 0.0;
		goose.log('hide body');
	}

	function detectButtons(){

		// add callback to click event of all links.
		if (document.addEventListener){
			document.addEventListener('click', callback, false);}
		else
			{document.attachEvent('onclick', callback);}
	}


	function transitionIn(){

		var _timer = setInterval( countUp, 1);
		goose.log('fade in');
	}

	function transitionOut(linkPassed){

		var _timer = setInterval( countDown, 1);
		redirectPage(linkPassed);
		goose.log('fade out');
	}

	function countUp(){


		if(transitionTargetOpacity<1){
			transitionTargetOpacity+=0.025;
			elem.style.opacity = transitionTargetOpacity;
		} else{
			clearInterval(_timer);
		}
	}

	function countDown(){

		goose.log('counting down');
		if(transitionTargetOpacity>0){
			transitionTargetOpacity-=0.025;
			elem.style.opacity = transitionTargetOpacity;
		} else{
			clearInterval(_timer);
		}
	}

	function redirectPage(linkPassed) {

		window.location = linkPassed;
	}   

})();
