// JavaScript Document
/*
* page transition 0.5.4
* Jason McAlpin page transition script. This will run an animation on paeg load and exit. This version will fade in pages on standard compatible browsers
* copyright 2013, all rights reserved.
* 
* Init function is designed by Dean Edwards/Matthias Miller/John Resig
* http://dean.edwards.name/weblog/2006/06/again/
*
* New filter from microsoft filters.
* obj.filters property http://msdn.microsoft.com/en-us/library/ms537452(VS.85).aspx
* filter.Alpha http://msdn.microsoft.com/en-us/library/ms532967(VS.85).aspx
*/

(function(){
	'use strict';

	var transitionTargetDefault = 'body',
		transitionTargetOpacity = 0,
		transitionSpeed         = 10,
		transitionAmmount       = 0.05,
		initDone                = false,
		hideBodyDone            = false,
		bodyElement, elem;


	function hideBody(){
		if(hideBodyDone){
			return;
		}

		hideBodyDone = true;

		goose.log('hiding body');
		elem.style.opacity = transitionTargetOpacity;
		//ie 6-7
		elem.style.filter = 'alpha(opacity='+transitionTargetOpacity+')';
	}


	/* 
	* init the console log on browsers that don't have it. Placeholder for more advanced debugger to come
	*/

	if(window.console){
		var	goose = console;
	} else {
		var	goose ={'log':''};
	}
	/*
	* Lets hide the body quick. First see if it is loaded if so hide it in every browser
	*/
	goose.log('looking for body');
	
	(function(){
		//lets hide the body quick
		goose.log('looking for body');
		testBody();
		

		function testBody(){
			if ( !document.body ) {
				return setTimeout( testBody, 1 );
			} else {
				goose.log('theres the body');
				//setup transition target
				bodyElement = document.getElementsByTagName(transitionTargetDefault);
				elem = bodyElement[0];
				hideBody();
			}
		}

	})();
	
	/*
	* Detect if DOM is interactive and if so begin initialization
	*/
	document.onreadystatechange = function () {
		if (document.readyState === "interactive"){
			goose.log('readystate change');
			hideBody();
			init();
		}
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

		

		// reveal page and begin detecting for mouse clicks
		transitionIn();
		detectButtons();
	}

	/* for other browsers - then don't run. no way to hide body before page is visible. onload is to late. lets just die gracefully.shhhh...
	//window.onload = init;
	*/

	function callback(e) {
		if (!e) {
			var e = window.event;
		}
		// test for links that don't leave the page and ignore them.
		goose.log(e.target.href);
		var localLink = /#|javascript|^undefined?|^$|\0/i;
		if (e.target.tagName !== 'A'||localLink.test(e.target.href) ) {
			goose.log('link ignored'); 
			return;
		}
		e.returnValue=false;
		transitionOut(e.target.href);
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
		fadeEffect.init('body',1);
		goose.log('fade in');
	}

	function transitionOut(linkPassed){
		fadeEffect.init('body',0);
		redirectPage(linkPassed);
	}

	function redirectPage(linkPassed) {
		window.location = linkPassed;
	}

	var fadeEffect=function(){
		goose.log('fadeEffect ran as it init');
		return{
			init:function(name, flag, target){
				goose.log('fade effect init');
				this.targetElem = document.getElementsByTagName(name);
				this.elem = this.targetElem[0];
				clearInterval(this.elem.si);
				this.target = target ? target : flag ? 100 : 0;
				this.flag = flag || -1;
				this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
				this.elem.si = setInterval(function(){fadeEffect.tween();}, transitionSpeed);
			},
			tween:function(){
				if(this.alpha === this.target){
					clearInterval(this.elem.si);
				}else{
					var value = Math.round(this.alpha + ((this.target - this.alpha) * transitionAmmount)) + (1 * this.flag);
					this.elem.style.opacity = value / 100;
					this.elem.style.filter = 'alpha(opacity=' + value + ')';
					this.alpha = value;
				}
			}
		};
	}();
})();