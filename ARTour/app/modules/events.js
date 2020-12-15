import * as requests from "./requests.js";
import * as markers from "./markers.js";
import * as appinterface from "./appinterface.js";
import * as data from './data.js';

export function init() {

    // AFRAME
    AFRAME.registerComponent("eventsmarker", {
        init: function () {

            var marker = this.el;
            marker.setAttribute('emitevents', 'true');

            marker.addEventListener('markerFound', e => {

                if (marker.getAttribute("loaded") != "1") {
                    var container = document.querySelector(`a-marker[m_id=\"${marker.getAttribute("m_id")}\"] > a-entity`);
                    container.innerHTML += markers.systemModel("loading");

                    requests.second(marker, res => {
                        markers.buildMarker(res);
                    });
                }
                data.DOMArray(data.data.markers, marker, "add");

                // SET MENU TYPE

                data.data.markers.length > 1 ? appinterface.setMenu("markers") : appinterface.setMenu("marker");
            });

            marker.addEventListener('markerLost', e => {
                data.DOMArray(data.data.markers, marker, "remove");

                // SET MENU TYPE

                data.data.markers.length == 0 ? appinterface.setMenu("system") : appinterface.setMenu("marker");
            });
        }
    });

    // CLICK

    document.addEventListener("click", e => {
       
        // APPINTERFACE

        appinterface.event(e.type, e.target);
    });
}