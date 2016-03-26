/**
* Images.js
*
* Cycle all images with data-highres attribute
* and when element is visible in the viewport
* will load high resolution source provided
*
* @require viewport
*/

;(function(window, document) {

/**
* @class ImageElement
* @param HTMLImageElement
* @return ImageElement
*/

    var ImageElement = function($img) {
        var $this = this;
        $this.src = $img.src;
        $this.element = $img;
        // $this.lowResSrc = $img.getAttribute('data-lowres');
        $this.highResSrc = $img.getAttribute('data-highres');
        $this.baseClassName = $img.className

        if (viewport) {
            viewport.on('scroll', function() {
                $this.resolve.call($this, this);
            });
            viewport.on('resize', function() {
                $this.resolve.call($this, this);
            });
        }

        return $this;
    }

/**
* Determines if element should load high resolution image
* @method resolve
* @param viewport
* @return ImageElement
*/
    ImageElement.prototype.resolve = function(viewport) {
        var $this = this;
        if (viewport.isVisible($this.element)) {
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
            $this.element.src = $this.src;

        return $this;
    };

/**
* @!out-of-service
* Load low resolution source
* @method useLoweRes
* @return ImageElement
    ImageElement.prototype.useLoweRes = function() {
        var $this = this;
        if ($this.loweResSrc && $this.loweResSrc !== $this.src) {
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
        if ($this.highResSrc && $this.highResSrc !== $this.src) {
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

        var $imgs = document.getElementsByTagName('img');

        for (var i = 0, $img, len = $imgs.length; i < len; i += 1) {
            $img = $imgs[i];
            if (!$img.getAttribute('data-highres')) {
               continue;
            }
            new ImageElement($img);
        }
    }

    // run orchestrator
    Orchestrator(window, document);





    console.log('Instagram');

    var client_id = '289a1114d8b943838f8e0912c678ab53';
    var access_token = '13931722.289a111.05768ab4be234246bcdf0c7f08693b05';

    $.ajax({
      dataType: "jsonp",
      url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token + "&client_id=" + client_id,
      success: function(response) {
        console.log(response)
      }
    });

}(window, document));