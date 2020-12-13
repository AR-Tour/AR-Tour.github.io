import * as appinterface from "./appinterface.js";

// CONFIG

var config = {
    zoom: {
        inProcess: false,
        animation: {
            duration: 250
        }
    },
    zoomin: {
        max_scale: new THREE.Vector3(1.5, 1.5, 1.5),
        animation: {
            duration: 250
        }
    },
    zoomout: {
        min_scale: new THREE.Vector3(0.1, 0.1, 0.1),
        animation: {
            duration: 250
        }
    },
    rotate: {
        inProcess: false,
        animation: {
            duration: 250
        }
    }
};

// INIT + FIRST LAYER

export function build(xhr) {
    const response = xhr.response.response;
    var res = "";

    response.forEach(el => { res += buildFrame(el); });
    return res;
}

function buildFrame(data) {
    return `
        <a-marker 
            title="${data.info.title}"
            description="${data.info.description}"
            m_id="${data.id}" 
            m_type="${data.config.type}"
            type="pattern"
            loaded="0"
            url="${data.pattern}"
            module="${data.module}"
            eventsmarker
        > ${firstEntity(data.config)} </a-marker>
    `;
}

function firstEntity(data) {
    return `
        <!-- FIRST LAYER - POSITION / ROTATION / SCALE -->
        <a-entity
            shell_id="1"
            position="${data.position[0]} ${data.position[1]} ${data.position[2]}"
            rotation="${data.rotation[0]} ${data.rotation[1]} ${data.rotation[2]}"
            scale="${data.scale[0]} ${data.scale[1]} ${data.scale[2]}"

        ></a-entity>
    `;
}

// SECOND LAYER

export function buildMarker(xhr, container) {
    console.log(xhr);
    var insert = document.querySelector(`a-marker[m_id=\"${xhr.response.details.marker_id}\"] > a-entity`);
    import(`../marker_modules/${xhr.response.details.module_name}.js`).then(module => {
        const render = module.render(xhr.response.response);

        // FADE OUT SYSTEM MODEL
        fadeOutSystemModels("loading", 400).then(e => {
            setTimeout(() => {
                appinterface.showTitle(document.querySelector(`a-marker[m_id="${xhr.response.details.marker_id}"]`));
                insert.innerHTML = render;
            }, 400);
        });
        return render;
    }).catch(err => {
        console.log("ERROR | "+ err);
        insert.innerHTML = systemModel("error");
    });
}

// LOAD SYSTEM MODELS

export function systemModel(type) {
    return `
        <a-entity 
            m_class="systemModel_${type}"
            gltf-model="./assets/models/${type}.gltf"
            scale="0 0 0"
            animation__scale_in="
                property: scale; 
                to: 0.5 0.5 0.5;
                dur: 100;
                easing: easeInQuad;
                loop: false;
            "
        >
            <a-light
                position="0 0.3 0"
                type="ambient"
                color="white"
                insensity="10"
            ></a-light>
            <a-light
                position="0 0.7 0"
                type="ambient"
                color="white"
                insensity="10"
            ></a-light>
        </a-entity>
    `;
}

// FADE OUT SYSTEM MODELS

export async function fadeOutSystemModels(type, duration) {
    let models = document.querySelectorAll(`a-entity[m_class="systemModel_${type}"]`);
    models.forEach(el => {
        el.setAttribute("animation__scale", `
            property: scale; 
            to: 0 0 0;
            dur: ${duration};
            easing: easeInQuad;
            loop: false;
        `);
    });
    return this;
}

// CHANGE MARKER'S ROTATION AND SCALE

export async function zoom(markers, type = 1, num = [0.2, 0.2, 0.2]) {
    if (config.rotate.inProcess == true) return;
    config.rotate.inProcess = true;

    markers.forEach(el => {
        let entities = document.querySelectorAll(`a-marker[m_id="${el.getAttribute("m_id")}"] > a-entity[shell_id="1"]`);
        entities.forEach(entity => {
            const animationDOM = type == 1 ? zoomin(entity, num) : zoomout(entity, num);
            entity.setAttribute("animation__scale", animationDOM);
            setTimeout(() => {
                config.rotate.inProcess = false;
            }, config.zoom.animation.duration);
        });
    });
}

function zoomin(entity, num) {
    const lastScale = entity.getAttribute("scale");
    const max_scale = config.zoomin.max_scale;
    if (max_scale.x<=lastScale.x || max_scale.y<=lastScale.y || max_scale.z<=lastScale.z) return;
    console.log(lastScale, max_scale);
    return `
        property: scale;
        to: ${(lastScale.x + num[0]).toFixed(3)} ${(lastScale.y + num[1]).toFixed(3)} ${(lastScale.z + num[2]).toFixed(3)};
        dur: ${config.zoomin.animation.duration};
        easing: easeInQuad;
        loop: false;
    `;
}

function zoomout(entity, num) {
    const lastScale = entity.getAttribute("scale");
    const min_scale = config.zoomout.min_scale;
    if (min_scale.x >= lastScale.x || min_scale.y >= lastScale.y || min_scale.z >= lastScale.z) return;
    console.log(lastScale, min_scale);
    return `
        property: scale;
        to: ${(lastScale.x - num[0]).toFixed(6)} ${(lastScale.y - num[1]).toFixed(6)} ${(lastScale.z - num[2]).toFixed(6)};
        dur: ${config.zoomout.animation.duration};
        easing: easeInOutQuad;
        loop: false;
    `;
}

export function rotate(markers, deg) {
    if (config.rotate.inProcess == true) return;
    config.rotate.inProcess = true;

    markers.forEach(el => {
        let entities = document.querySelectorAll(`a-marker[m_id="${el.getAttribute("m_id")}"] > a-entity[shell_id="1"]`);
        entities.forEach(entity => {
            const lastRotation = entity.getAttribute("rotation");
            entity.setAttribute("animation__rotation", `
                property: rotation;
                to: 0 ${deg + lastRotation.y} 0;
                dur: ${config.rotate.animation.duration};
                easing: easeInOutQuad;
                loop: false;
            `);
            setTimeout(() => {
                config.rotate.inProcess = false;
            }, config.rotate.animation.duration);
        });
    });
}