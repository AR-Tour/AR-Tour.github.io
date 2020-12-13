import * as data from "./data.js";

// CONFIG

var config = {
    watch: {
        getCurrentPosition: {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    }
};

// WATCH POSITION

export function watch() {
    setInterval(e => {
        navigator.geolocation.getCurrentPosition(pos => {
            data.data.user.location = pos;
            console.log(data.data.user.location);
        }, err => {
            
            // if (err.code == 1) {
            //     import("./appinterface.js").then(appinterface => {
            //         appinterface. *SHOW ICON "NO GEOLOCATION"*
            //     });
            // }

        }, config.watch.getCurrentPosition);
    }, config.watch.getCurrentPosition.timeout);
}