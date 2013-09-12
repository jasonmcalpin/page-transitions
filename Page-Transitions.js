// JavaScript Document
/*
* page transition 0.5.0
* Jason McAlpin page transition script. This will run an animation on paeg load and exit. This version will fade in pages on standard compatible browsers
* copyright 2013, all rights reserved.
* 
* Init function is designed by Dean Edwards/Matthias Miller/John Resig
* http://dean.edwards.name/weblog/2006/06/again/
*/



(function(){
	'use strict';
	// init the variables
	if(window.console){
		var	goose = console;
	} else {
		var	goose ={'log':''};
	}
	var transitionTargetDefault = 'body',
		transitionTargetOpacity = 0,
		initDone = false,
		bodyElement, elem;

	(function(){
		//lets hide the body quick
		testBody();
		goose.log('looking for body');
		function testBody(){
			if ( !document.body ) {
				return setTimeout( testBody, 1 );
			} else {
				//setup transition target
				bodyElement = document.getElementsByTagName(transitionTargetDefault);
				elem = bodyElement[0];
				hideBody();
			}
		}

	})();
	

	
	

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

		

		// make body hidden
		
		transitionIn();
		detectButtons();
	}

	// works in Firefox perfectly
	document.onreadystatechange = function () {
	  if (document.readyState == "interactive"){
		goose.log('readystate change');
		init();
	  }
	}

	/* for Mozilla/Opera9 */
	if (document.addEventListener) {
		goose.log('DOMContentLoaded');
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
		var e = window.e || e;
		if (e.target.tagName !== 'A'){
			return;
		}
		e.returnValue=false;
		transitionOut(e.target.href);
	}


	function hideBody(){
		elem.style.opacity = 0.0;
		//ie 8
		// elem.style.-ms-filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
		//ie 6-7
		elem.style.filter = 'alpha(opacity=0)';
		goose.log('hide body');
	}

	function detectButtons(){
		goose.log('hunt buttons');
		// add callback to click event of all links.
		if (document.addEventListener){
			document.addEventListener('click', callback, false);}
		else
			{document.attachEvent('onclick', callback);}
	}


	function transitionIn(){
		fadeEffect.init('body',1)
		// var _fadeInTimer = setInterval( countUp, 100);
		goose.log('fade in');

		/*function countUp(){
			if(transitionTargetOpacity<1){
				transitionTargetOpacity+=0.10;
				elem.style.opacity = transitionTargetOpacity;
			} else{
				clearInterval(_fadeInTimer);
			}
		}
		*/
	}

	function transitionOut(linkPassed){

		fadeEffect.init('body',0)
		// var _fadeOutTimer = setInterval( countDown, 50);

		redirectPage(linkPassed);
		goose.log('fade out');

		/*function countDown(){
			goose.log('counting down');
			if(transitionTargetOpacity>0){
				transitionTargetOpacity-=0.10;
				elem.style.opacity = transitionTargetOpacity;
			} else{
				clearInterval(_fadeOutTimer);
			}
		}
		*/
	}

	function redirectPage(linkPassed) {
		window.location = linkPassed;
	}   



	var fadeEffect=function(){
	return{
		init:function(name, flag, target){
			this.targetElem = document.getElementsByTagName(name);
			this.elem = this.targetElem[0];
			clearInterval(this.elem.si);
			this.target = target ? target : flag ? 100 : 0;
			this.flag = flag || -1;
			this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
			this.elem.si = setInterval(function(){fadeEffect.tween()}, 20);
		},
		tween:function(){
			if(this.alpha == this.target){
				clearInterval(this.elem.si);
			}else{
				var value = Math.round(this.alpha + ((this.target - this.alpha) * .05)) + (1 * this.flag);
				this.elem.style.opacity = value / 100;
				// this.elem.style.-ms-filter ='progid:DXImageTransform.Microsoft.Alpha(Opacity=' + value + ')';
				this.elem.style.filter = 'alpha(opacity=' + value + ')';
				this.alpha = value;
			}
		}
	}
}();
})();