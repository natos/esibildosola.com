;/*
* Fader Interaction
*/
(function(window, document) {

/* configuration */

var nav, toggler;

/* scope */

function toggle(event) {

    var anchor = event.target;

    // Keep bubbling up through DOM until you find an anchor,
    // you might have clicked the icon or the label element,
    // and not the proper <a> tag
    while (!anchor.className) {
        // break if the #main is reachead
        if (anchor === this) { break; }
        // step up in the DOM to the next parent
        anchor = anchor.parentNode;
    }

    if (/open/.test(anchor.className)) {
        nav.className = "global";
        anchor.className = "toggler";
    } else {
        nav.className = "global open";
        anchor.className = "toggler open";
    }
}

/* Menu orchestrator */

    function Orchestrator(window, document) {

        nav = document.getElementById('top');

        toggler = document.querySelector('.toggler');

        toggler.addEventListener('click', toggle);

    }

    // start
    Orchestrator(window, document);

}(window, document));