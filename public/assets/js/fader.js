;/*
* Fader Interaction
*/
(function(window, document) {

/* configuration */

    var RITHM = 1000 * 4; // 4s

    var FADE_TIMEOUT = 500 // 500ms;

/* scope */

/* fade element */

    var FadeElement = function($img) {
        this.src = $img.src;
        this.baseClassName = $img.className
        this.element = $img;
        return this;
    }

    FadeElement.prototype.fadeIn = function() {
        var $this = this;
        window.setTimeout(function() {
            if ($this.element) {
                $this.element.className = $this.baseClassName + ' fade-in';
            }
        }, FADE_TIMEOUT);
        return $this;
    };

    FadeElement.prototype.fadeOut = function() {
        var $this = this;
        window.setTimeout(function() {
            if ($this.element) {
                $this.element.className = $this.baseClassName + ' fade-out';
            }
        }, FADE_TIMEOUT);
        return $this;
    };

    FadeElement.prototype.reset = function() {
        var $this = this;
        if ($this.element) {
            $this.element.className = $this.baseClassName;
        }
        return $this;
    };

    FadeElement.prototype.prepare = function() {
        var $this = this;
        if ($this.element) {
            $this.element.className = $this.baseClassName + ' prepare';
        }
        return $this;
    };

/* Fade orchestrator */

    function Orchestrator(window, document) {

        // collection of Fade instances
        var orchestra = [];

        var $faders = document.querySelectorAll('.fader');
        // iterate faders
        for (var i = 0, $fader, len = $faders.length; i < len; i += 1) {
             $fader = $faders[i];
            // iterate images
            // assign behavior
            // console.log('fader', $fader);
            var $figure = $fader.querySelectorAll('figure');
            // console.log('figure', $figure);
            var $imgs = $fader.getElementsByTagName('img');
            // console.log('imgs', $imgs);
            // console.log('imgs.len', $imgs.length);
            for (var i = 0, len = $imgs.length; i < len; i += 1) {
                // console.log('img', $img, $img.src);
                orchestra[i] = new FadeElement($imgs[i]);
                // orchestra[$img.src].fadeIn();
            }
        }

        var iterator, iteration = 0, prev_iteration, next_iteration;
        var $element, $prev_element, $next_element, $last_element;

        function iterate() {

            // clean
            clearTimeout(iterator);

            // maybe is necessary to reste iteration
            if (iteration===orchestra.length) {
                // console.log('need to restart iteration')
                iteration = 0;
                return iterator = setTimeout(iterate, RITHM || 4000);
            }
            // iteration = (iteration===(orchestra.length-1))? 0: iteration;
            next_iteration = ((iteration+1)===orchestra.length)? 0: iteration+1;
            prev_iteration = (iteration===0)? (orchestra.length-1): iteration-1;
            last_iteration = (orchestra.length-2===0)? (orchestra.length-2): iteration-2;
            // console.log('orchestra.length', orchestra.length);
            // console.log('prev_iteration', prev_iteration);
            // console.log('iteration', iteration);
            // console.log('next_iteration', next_iteration);

            $element = orchestra[iteration];
            $prev_element = orchestra[prev_iteration];
            $next_element = orchestra[next_iteration];
            $last_element = orchestra[last_iteration];

            // console.log(iteration);
            // console.log($prev_element);
            // console.log($element);
            // console.log($next_element);

            if ($last_element) {
                $last_element.reset();
            }

            $prev_element.fadeOut();
            $element.fadeIn();
            $next_element.prepare();

            iteration += 1;
            // keep the rithm going
            iterator = setTimeout(function(){
                requestAnimationFrame(iterate);
            }, RITHM || 4000);
        }

        // start the rithm
        requestAnimationFrame(iterate);

    }

    // start
    Orchestrator(window, document);

}(window, document));