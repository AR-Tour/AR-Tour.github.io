// Interface:
    var _interface = new Interface();

// Web Controller:
    var _webController = new WebController();

// Scene Controller:
    var _sceneController = new SceneController();
    

document.addEventListener("DOMContentLoaded", () => {

    // Init interface:
    _interface.init(document.querySelector(".ar-interface"));
    _interface.markerMenu("system");

    // Animations:
    ScrollReveal().reveal('.ar-interface', {
        delay: 50,
        distance: '70px',
        reset: false,
        duration: 500,
        interval: 150,
        scale: 0.8,
    });



    // Change scene container:
    _sceneController.data.body = document.querySelector("body");

    // Receive markers:
    _webController.downloadMarkers(() => {
        // Create scene with received markers:
        _sceneController.scene("create", _webController.markersdata.value);
    });

});

////////////
// EVENTS //
////////////

// AFRAME

AFRAME.registerComponent("eventsmarker", {
    init: function () {

        var marker = this.el;

        // Modules:

            // markerObj:

            var _markerObj = new MarkerObj(marker, false);

        marker.setAttribute('emitevents', 'true');

        // Events:

            marker.addEventListener('markerFound', e => {

                // Modules:

                    // Interface:
                    _interface.currentMarker(marker, "add");
                    _interface.showTitle(marker);
                    _interface.vibrate(45);
                    _interface.markers.length > 1 ? _interface.markerMenu("markers") : _interface.markerMenu("marker");
                    
            });

            marker.addEventListener('markerLost', e => {
                // Modules:

                    // Interface:
                    _interface.currentMarker(marker, "remove");
                    _interface.markers == 0 ? _interface.markerMenu("system") : _interface.markerMenu("marker");

            });
    }
});

// CLICK

document.addEventListener("click", e => {
    let el = e.target;

    // Interface functions:

    _interface.btnClickEvent(el);

});