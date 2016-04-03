/**
 * Images.js
 *
 * Cycle all images with data-highres attribute
 * When any image with data-highres becomes
 * visible in the viewport it will load the
 * high resolution source provided in the attribute
 * will also asume that original src attribute
 * is the low resolution source provided
 *
 * @require viewport
 */

(function(window, document) {

    'use strict';

    var viewport = window.viewport;
    /**
     * @class ImageElement
     * @param HTMLImageElement
     * @return ImageElement
     */

    var ImageElement = function($img) {
        var $this = this;
        $this.src = $img.src;
        $this.element = $img;
        $this.element.setAttribute('data-state', 'created');
        $this.meta = {
            isVisible: false,
            isMobile: true,
            isVertical: true,
            verticalPosFix: '_v',
            verticalEdge: 414
        };
        $this.baseClassName = $img.className;
        $this.highResSrc = $img.getAttribute('data-highres');
        if (!$this.highResSrc) {
            // there's no highres source
            // avoid calling resolve triggers
            return $this;
        }

        /* resolve triggers */

        $this.resolve();

        if (viewport !== 'undefined') {
            viewport.on('scroll', function() {
                $this.resolve.call($this, this);
            });
            viewport.on('resize', function() {
                $this.resolve.call($this, this);
            });
        }

        return $this;
    };

    ImageElement.prototype.isVisible = function() {
        var $this = this;
        $this.meta.isVisible = typeof viewport.isVisible === 'function' && viewport.isVisible($this.element);
        return $this.meta.isVisible;
    };
    ImageElement.prototype.isMobile = function() {
        var $this = this;
        $this.meta.isMobile = /Mobi/.test(navigator.userAgent);
        return $this.meta.isMobile;
    };

    ImageElement.prototype.isVertical = function() {
        var $this = this;
        $this.meta.isVertical = false;
        if (typeof viewport !== 'undefined') {
            viewport.calculateDeviceDimensions();
            $this.meta.isVertical = viewport.height > viewport.width;
        }
        return $this.meta.isVertical;
    };

    /**
     * Determines if element should load high resolution image
     * @method resolve
     * @param viewport
     * @return ImageElement
     */
    ImageElement.prototype.resolve = function() {
        var $this = this;
        if (typeof viewport !== 'undefined' && viewport.isVisible($this.element)) {
            $this.useHighRes();
        }
        return $this;
    };

    /**
     * Updates src attribute of dom link, triggers a request and re-paint.
     * @method updateSrc
     * @return ImageElement
     */
    ImageElement.prototype.updateSrc = function() {
        var $this = this;
        // if (!$this.isMobile() && !$this.isVertical()) {
        //     $this.src = $this.src.replace($this.meta.verticalPosFix + '.', '.');
        // }
        // $this.element.className = $this.element.className + ' loading';
        $this.element.setAttribute('data-state', 'loading');

        if ($this.isMobile() || $this.isVertical()) {
            $this.src = $this.src.replace('.', $this.meta.verticalPosFix + '.');
        }

        var preload = new Image();
        preload.src = $this.src;
        preload.onload = function() {
            preload = null;
            $this.element.src = $this.src;
            $this.element.setAttribute('data-state', 'ready');
        }

        return $this;
    };

    /**
* @!out-of-service
* Load low resolution source
* @method useLoweRes
* @return ImageElement
    ImageElement.prototype.useLoweRes = function() {
        var $this = this;
        if ($this.loweResSrc) {
            $this.src = $this.loweResSrc;
            $this.updateSrc();
        }
        return $this;
    };
*/

    /**
     * Load high resolution source
     * @method useHighRes
     * @return ImageElement
     */
    ImageElement.prototype.useHighRes = function() {
        var $this = this;
        if ($this.highResSrc) {
            $this.src = $this.highResSrc;
            $this.updateSrc();
        }
        return $this;
    };


    /**
     * Finds images and creates a new ImageElement linked to it.
     * @class orchestrator
     */
    function Orchestrator(window, document) {

        var i, $img, $imgs = document.getElementsByTagName('img');

        for (i = 0; i < $imgs.length; i += 1) {
            $img = $imgs[i];
            if (!$img.getAttribute('data-highres')) {
                continue;
            }
            new ImageElement($img);
        }
    }

    // run orchestrator
    Orchestrator(window, document);

}(window, document));