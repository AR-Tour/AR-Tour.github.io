export function build(config, container, callback) {

    if (typeof config == "undefined") {
        config = {
            sourceType: "webcam",
            debugUIEnabled: false,
            detectionMode: "color_and_matrix",
            trackingMethod: "best",
            matrixCodeType: "3x3",
            sourceWidth: 1280,
            sourceHeight: 960,
            displayWidth: 1280,
            displayHeight: 960,
            patternRatio: 0.85,
            stats: " ",
            embedded: "embedded"
        }
    }

    container.innerHTML += `
        <a-scene 
            vr-mode-ui="false"
            arjs="
                sourceType: ${config.sourceType};
                debugUIEnabled: ${config.debugUIEnabled};
                detectionMode: ${config.detectionMode};
                trackingMethod: ${config.trackingMethod};
                matrixCodeType: ${config.matrixCodeType};
                sourceWidth: ${config.sourceWidth};
                sourceHeight: ${config.sourceHeight};
                displayWidth: ${config.displayWidth};
                displayHeight: ${config.displayHeight};
                patternRatio: ${config.patternRatio};
            "
            inspector="url: xxx"
            ${config.embedded}
            ${config.stats}
        >
        ${callback(this)}
        <a-entity camera></a-entity>
        </a-scene>
    `;
}

export function destroy() {
    document.querySelectorAll("a-scene").forEach(el => {el.remove();});
    document.querySelectorAll("#arjs-video").forEach(el => {el.remove();});
}