/**
* Instagrams.js
*
* Renders a few instagramas
* @require jquery
*/

(function (window, document) {

    'use strict';

    var instagramas = document.querySelectorAll('.instagramas')[0];
    if (instagramas === undefined || instagramas === null) {
        return;
    }
    var render = instagramas.getAttribute('data-render') || "thumbnail";
    var source = instagramas.getAttribute('data-source');
    if (source === undefined || source === null) {
        throw("Instagramas missing source: Instagramas element needs to have a data-source attribute defined to run.");
        return;
    }

    var shelf = [];

/**
* @class Instagram
* @param #data
* @return Instagram
*/

    var Instagrama = function($data) {

        if (!$data) {
            return this;
        }

        var $this = this;
            $this.data = $data;
            $this.tag = {
                template: '<span class="instagrama-tag">{{tag}}</span>'
            };
            $this.render();

        return $this;
    };

    Instagrama.prototype.render = function() {

        var $this = this,
            figure,
            tagscaption,
            likescaption,
            a,
            i,
            t,
            img,
            tags = '',
            likes = 0;

        figure = document.createElement('figure');
        figure.className = $this.data.type;

        a = document.createElement('a');
        a.target = '_blank';
        a.className = 'instagrama';
        a.href = $this.data.link;
        figure.appendChild(a);

        img = document.createElement('img');
        img.alt = $this.data.caption.text;
        img.src = $this.data.images[render].url;
        // img.src = $this.data.images.low_resolution.url;
        a.appendChild(img);

        // likes
        likescaption = document.createElement('figcaption');
        likescaption.className = 'instagrama-likes';
        likescaption.innerHTML = $this.data.likes.count;
        a.appendChild(likescaption);

        // collect tags
        t = $this.data.tags.length;
        for (i = 0; i < 1; i += 1) {
            if (!$this.data.tags[i]) {
                continue;
            }
            // tags += '<span class="instagram-tag">' + $this.data.tags[i] + '</span>';
            tags += $this.tag.template.replace('{{tag}}', $this.data.tags[i]);
        }

        tagscaption = document.createElement('figcaption');
        tagscaption.className = 'instagrama-tags';
        tagscaption.innerHTML = tags;
        a.appendChild(tagscaption);

        instagramas.appendChild(figure);

        return this;
    };

    function createInstagramas(response) {
        var i, images = response.data;
        for (i = 0; i < images.length; i += 1) {
            shelf.push(new Instagrama(images[i]));
        }
        images.length = 0;
    }

    function getInstagramas() {
        $.ajax({
            url: source,
            method: 'get',
            dataType: 'jsonp',
            success: createInstagramas,
            error: function(error) {
                throw(error);
            }
        });
    }

    if (source) {
        getInstagramas();
    }

}(window, document));