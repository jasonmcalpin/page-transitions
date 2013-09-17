// JavaScript Document
/*
<<<<<<< HEAD
* page transition 0.5.1
=======
* page transition 0.5
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab
* Jason McAlpin page transition script. This will run an animation on paeg load and exit. This version will fade in pages on standard compatible browsers
* copyright 2013, all rights reserved.
* 
* Init function is designed by Dean Edwards/Matthias Miller/John Resig
* http://dean.edwards.name/weblog/2006/06/again/
*
* new filter from microsoft filters.
* obj.filters property http://msdn.microsoft.com/en-us/library/ms537452(VS.85).aspx
* filter.Alpha http://msdn.microsoft.com/en-us/library/ms532967(VS.85).aspx
*/



(function(){
	'use strict';

	var transitionTargetDefault = 'body',
		transitionTargetOpacity = 0,
		initDone                = false,
		bodyElement, elem;
<<<<<<< HEAD

	function hideBody(){
		goose.log('hiding body');
		elem.style.opacity = transitionTargetOpacity;
		//ie 6-7
		elem.style.filter = 'alpha(opacity='+transitionTargetOpacity+')';
	}


	/* 
	* init the console log on browsers that don't have it. placeholder for more advanced debugger to come
	*/

	if(window.console){
		var	goose = console;
	} else {
		var	goose ={'log':''};
	}
	/*
	* lets hide the body quick. first see if it is loaded if so hide it in every browser
	*/
	goose.log('looking for body');
	


	(function(){
		//lets hide the body quick
		testBody();
		goose.log('looking for body closure');

		function testBody(){
			if ( !document.body ) {
				goose.log('still no body');
				return setTimeout( testBody, 1 );
			} else {
				goose.log('theres the body');
				//setup transition target
				bodyElement = document.getElementsByTagName(transitionTargetDefault);
				elem = bodyElement[0];
				hideBody();
			}
=======

	/*
	* lets hide the body quick. first see if it is loaded if so hide it in every browser
	*/
	goose.log('looking for body');
	
	var testBody = function(){
		if ( !document.body ) {
			return setTimeout( testBody, 1 );
		} else {
			//setup transition target
			bodyElement = document.getElementsByTagName(transitionTargetDefault);
			elem = bodyElement[0];
			hideBody();
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab
		}
	}
	/* 
	* init the console log on browsers that don't have it. placeholder for more advanced debugger to come
	*/
	if(window.console){
		var	goose = console;
	} else {
		var	goose ={'log':''};
	}

<<<<<<< HEAD
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
=======

	/*
	* Detect if DOM is interactive and if so begin initialization
	*/
	document.onreadystatechange = function () {
		if (document.readyState === "interactive"){
			goose.log('readystate change');
			init();
		}
	};

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

	
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab

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

<<<<<<< HEAD

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

=======
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab
	/* for other browsers - then don't run. no way to hide body before page is visible. onload is to late. lets just die gracefully.shhhh...
	//window.onload = init;
	*/

	function callback(e) {
		if (!e) {
			var e = window.event;
		}
<<<<<<< HEAD
		if (e.target.tagName !== 'A'|| e.target.href ===''|| e.target.href ==='#'|| e.target.href == undefined|| e.target.href==='javascript:;'){
=======
		if (e.target.tagName !== 'A'){
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab
			return;
		}
		e.returnValue=false;
		transitionOut(e.target.href);
	}


<<<<<<< HEAD
	
=======
	function hideBody(){
		elem.style.opacity = transitionTargetOpacity;
		//ie 8
		if(document.body.filters) {
			goose.log('ie8 alpha filter is go');
			filter(elem,"Alpha",{Opacity:transitionTargetOpacity});
		}
		//ie 6-7
		elem.style.filter = 'alpha(opacity='+transitionTargetOpacity+')';
		goose.log('hide body');
	}
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab

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
<<<<<<< HEAD

	var fadeEffect=function(){
		return{
			init:function(name, flag, target){
				goose.log('fade effect init');
				this.targetElem = document.getElementsByTagName(name);
				this.elem = this.targetElem[0];
				clearInterval(this.elem.si);
				this.target = target ? target : flag ? 100 : 0;
				this.flag = flag || -1;
				this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
				this.elem.si = setInterval(function(){fadeEffect.tween();}, 20);
			},
			tween:function(){
				if(this.alpha === this.target){
					clearInterval(this.elem.si);
				}else{
					var value = Math.round(this.alpha + ((this.target - this.alpha) * 0.05)) + (1 * this.flag);
					this.elem.style.opacity = value / 100;
					if(document.body.filters) {
						filter(this.elem,"Alpha",{Opacity:value});
					}
					//this.filters.items('progid:DXImageTransform.Microsoft.Alpha').opacity = value ;
					this.elem.style.filter = 'alpha(opacity=' + value + ')';
					this.alpha = value;
				}
			}
		};
	}();
=======

	var filter = function(obj,f,params) {
		var found, 
			nf, 
			dx = "DXImageTransform.Microsoft.";

		// check if DXImageTransform.Microsoft.[Filter] or [Filter] filter is set
		try { nf = obj.filters.item(dx+f); found = true; } catch(e) {}
		if(!found) {
			try { nf = obj.filters.item(f); found = true; } catch(e) {}
		}

		// filter is set - change existing one
		if(found) {
			nf.Enabled = true; // if exists, it might be disabled
			if(params) {
				for(var i in params){
					nf[i] = params[i];
				}
			}
		}

		// filter is not set - apply new one
		else {
			nf = "";
			if(params){ 
				for(var i in params){ 
					nf+= i.toLowerCase()+"="+params[i]+",";
				}
			}
			if(params){ 
				nf = "("+nf.substr(0,nf.length-1)+")";
			}
			obj.style.filter+= "progid:"+dx+f+nf+" ";
		}

		// hasLayout property hack
		if(!obj.style.zoom) {
			obj.style.zoom = 1;
		}
	};

	var fadeEffect=function(){
	return{
		init:function(name, flag, target){
			this.targetElem = document.getElementsByTagName(name);
			this.elem = this.targetElem[0];
			clearInterval(this.elem.si);
			this.target = target ? target : flag ? 100 : 0;
			this.flag = flag || -1;
			this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
			this.elem.si = setInterval(function(){fadeEffect.tween();}, 20);
		},
		tween:function(){
			if(this.alpha === this.target){
				clearInterval(this.elem.si);
			}else{
				var value = Math.round(this.alpha + ((this.target - this.alpha) * 0.05)) + (1 * this.flag);
				this.elem.style.opacity = value / 100;
				if(document.body.filters) {
					filter(this.elem,"Alpha",{Opacity:value});
				}
				//this.filters.items('progid:DXImageTransform.Microsoft.Alpha').opacity = value ;
				this.elem.style.filter = 'alpha(opacity=' + value + ')';
				this.alpha = value;
			}
		}
	};
}();
>>>>>>> 49f55ba7428cbcd5cea05c6d38e117a7a3322fab
})();
