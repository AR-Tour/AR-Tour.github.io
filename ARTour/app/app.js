'use strict';

document.addEventListener("DOMContentLoaded", () => {
    async function run() {

        const config = {
            path: "./modules",
            // url: "https://localhost/ExCursy/api/api.php",
            url: "https://snagix.ru/api/ARTour/api.php",
            scene: {
                sourceType: "webcam",
                debugUIEnabled: false,
                detectionMode: "color_and_matrix",
                trackingMethod: "best",
                matrixCodeType: "4x4",
                sourceWidth: 1280,
                sourceHeight: 960,
                displayWidth: 1280,
                displayHeight: 960,
                patternRatio: 0.85,
                stats: " ",
                embedded: "embedded"
            }
        };
    
        const events = await import(config.path + "/events.js");
        const geolocation = await import(config.path + "/geolocation.js");
        const requests = await import(config.path + "/requests.js");
        const scene = await import(config.path + "/scene.js");
        const markers = await import(config.path + "/markers.js");
        const appinterface = await import(config.path + "/appinterface.js");

        var data = await import(config.path + "/data.js");

        events.init();
        appinterface.init();
        // geolocation.watch();
        
        requests.first(config.url, res => {
            scene.build(config.scene, document.querySelector("body"), () => {
                return markers.build(res);
            }, () => {
                return markers.buildAssets(res);
            });
        });
    }
    
    run();
})

