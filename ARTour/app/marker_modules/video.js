import * as crypto from "../modules/crypto.js";
import * as $data from "../modules/data.js";

export function render(data) {

    var video = data.response.links[0];
    console.log(data);
    var token = crypto.token(8);

    $data.data.dom.assets.querySelector(`a-entity[m_id="${data.details.marker_id}"]`).innerHTML 
        += `<video id="video__video_${token}" src="${video.link}" autoplay="true" loop="true" crossorigin="anonymous" />`;

    var res = `
        <a-video
            src="#video__video_${token}"
            scale="${video.info.resolution.x / 1000} ${video.info.resolution.y / 1000}"
            loop="false"
            rotation="-90 0 0"
        >
        </a-video>
    `;

    initEvents(`#video__video_${token}`, data);
    return res;
}

function initEvents(video, data) {

    var marker = document.querySelector(`a-marker[m_id="${data.details.marker_id}"]`);

    marker.addEventListener("markerLost", e => {
        document.querySelector(video).pause();
    });
    marker.addEventListener("markerFound", e => {
        document.querySelector(video).play();
    });
}