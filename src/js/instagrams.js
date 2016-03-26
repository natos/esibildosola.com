/**
* Instagrams.js
*
* Renders a few instagrams
* @require jquery
*/

(function (window, document) {

    'use strict';

    var gallery = document.querySelectorAll('.instagrams .gallery')[0];

/**
* @class Instagram
* @param #data
* @return Instagram
*/

    var Instagram = function($data) {

        if (!$data) {
            return this;
        }

        var $this = this;
            $this.data = $data;

            $this.render();

        console.log('new Instagram', $this)
        return $this;
    };

    Instagram.prototype.render = function() {

        var $this = this,

            figure = document.createElement('figure');
            figure.className = $this.data.type;

        var a = document.createElement('a');
            a.target = '_blank';
            a.className = 'instagram';
            a.href = $this.data.link;
            figure.appendChild(a);

        var img = document.createElement('img');
            img.alt = $this.data.caption.text;
            img.src = $this.data.images.low_resolution.url;
            a.appendChild(img);

        // collect tags
        var tags = '', i, t = $this.data.tags.length;
        for (i = 0; i < 3; i += 1) {
            if (!$this.data.tags[i]) continue;
            tags += '<span class="instagram-tag">' + $this.data.tags[i] + '</span>';
        }

        var figcaption = document.createElement('figcaption');
            figcaption.className = 'instagram-tags';
            figcaption.innerHTML = tags;
            a.appendChild(figcaption);

        gallery.appendChild(figure);

        return this;
    };

    function createInstagrams(response) {

        var i, images = response.data;

        for (i = 0; i < images.length; i += 1) {
            new Instagram(images[i]);
        }
    }

    function getInstagrams(source) {
        $.ajax({
            "url": instagrams_source,
            "method": 'get',
            "dataType": 'jsonp',
            "success": createInstagrams,
            "error": function(error) {
                throw(error);
            }
        });
    }

/**
* Finds images and creates a new Instagrams linked to it.
* @class orchestrator
*/
    function Orchestrator(window, document) {

        if (!instagrams_source) {
            return;
        }

        getInstagrams(instagrams_source);
    }

    // run orchestrator
    Orchestrator(window, document);

}(window, document));