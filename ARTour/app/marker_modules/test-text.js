var config = {
    font_directory: "https://ar-tour.github.io/ARTour/assets/Fonts/"
};

export function render(data) {

    var res = `
    <a-light
        position="0 0.1 0",
        type="ambient"
        color="white"
        insensity="1"
    ></a-light>
    <a-entity
        geometry="
            primitive: plane; 
            width: ${(0.27 / 2) * data.text.length};
            height: 0.4;
            castShadow:true;
        " 
        animation__position="
            property: position; 
            to: 0 0.4 0;
            dur: 400; 
            easing: easeInOutQuart;
            loop: false;
        "
        rotation="-90 0 0"
        scale="1 1 1"
        position="0 0 0"
        material="
            color: white;
        "
        m_class="container"
    ></a-entity>
    <a-text
        animation__position="
            property: position; 
            to: 0 0.43 0;
            dur: 400; 
            easing: easeInOutQuart;
            loop: false;
        "

        align="center"
        color="#000000"
        side="double"
        value="${data.text}"
        width="5"
        font="${config.font_directory}${data.config.font}/${data.config.font}_Medium.fnt"
        position="0 0 0"
        rotation="-90 0 0"
        m_class="test-text__text"
    >
    </a-text>`;

    return res;
}