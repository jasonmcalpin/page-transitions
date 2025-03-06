// JavaScript Document
/*
* page transition 0.5.5
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
(function () {
    'use strict';

    const transitionTarget = 'body';
    const transitionSpeed = 10;
    const transitionAmount = 0.05;
    
    let initDone = false;
    let hideBodyDone = false;
    let bodyElement;
    
    function hideBody() {
        if (hideBodyDone) return;
        hideBodyDone = true;
        console.log('Hiding body');

        bodyElement.style.opacity = 0;
        bodyElement.style.filter = 'alpha(opacity=0)'; // Legacy IE support
    }

    function testBody() {
        if (!document.body) {
            return setTimeout(testBody, 1);
        }

        console.log('Body found');
        bodyElement = document.querySelector(transitionTarget);
        hideBody();
    }

    function init() {
        if (initDone) {
            console.log('Already initialized');
            return;
        }
        
        initDone = true;
        transitionIn();
        detectLinks();
    }

    function transitionIn() {
        fadeEffect.init('body', 1);
        console.log('Fade in');
    }

    function transitionOut(url) {
        fadeEffect.init('body', 0);
        setTimeout(() => (window.location = url), transitionSpeed * 50); // Small delay for transition
    }

    function detectLinks() {
        console.log('Detecting links');
        document.addEventListener('click', (event) => {
            const target = event.target.closest('a');
            if (!target || !target.href || /#|javascript|^undefined?|^$|\0/i.test(target.href)) {
                console.log('Ignored link');
                return;
            }

            event.preventDefault();
            transitionOut(target.href);
        });
    }

    const fadeEffect = {
        init(name, flag) {
            console.log('Initializing fade effect');
            this.elem = document.querySelector(name);
            if (!this.elem) return;

            clearInterval(this.elem.si);
            this.target = flag ? 100 : 0;
            this.alpha = parseFloat(this.elem.style.opacity || 0) * 100;
            this.flag = flag || -1;

            this.elem.si = setInterval(() => this.tween(), transitionSpeed);
        },

        tween() {
            if (this.alpha === this.target) {
                clearInterval(this.elem.si);
                return;
            }

            this.alpha = Math.round(this.alpha + ((this.target - this.alpha) * transitionAmount));
            this.elem.style.opacity = this.alpha / 100;
            this.elem.style.filter = `alpha(opacity=${this.alpha})`;
        }
    };

    // Start script
    console.log('Looking for body');
    testBody();

    document.onreadystatechange = function () {
        if (document.readyState === 'interactive') {
            console.log('Document ready');
            hideBody();
            init();
        }
    };

    document.addEventListener('DOMContentLoaded', init);
})();
