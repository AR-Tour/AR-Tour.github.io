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
    `;


    var mid = -(data.data.length - (data.data.length/2));

    var settings = {
        x: 0,
        y: 0,
        z: mid,
        delay: 0
    };
    data.data.forEach(el => {
        res += `
            <a-entity 
            geometry="
                primitive: plane; 
                width: 1.3;
                height: 0.7;
                castShadow:true;
            " 
            animation__scale="
                property: scale; 
                from: 0 0 0; 
                to: 1 1 1;
                dur: 400; 
                delay: ${settings.delay};
                easing: easeInQuad;
                loop: false
            "
            rotation="-90 0 0"
            scale="0 0 0"
            position="${settings.x} ${settings.y} ${settings.z}"
            material="
                color: white;
            "
            m_class="container"
            >
                <a-text
                    align="left"
                    color="#000000"
                    side="double"
                    value="${el.name}"
                    width="1.5"
                    font="${config.font_directory}${data.config.font}/${data.config.font}_Black.fnt"
                    position="-0.57 0.25 0.03"
                    m_class="title"
                ></a-text>
                <a-text
                    align="left"
                    color="#000000"
                    side="double"
                    value="${el.role}"
                    width="1.2"
                    font="${config.font_directory}${data.config.font}/${data.config.font}_Medium.fnt"
                    position="-0.57 0.18 0.03"
                    m_class="role"
                ></a-text>
                <a-text
                    align="left"
                    color="#000000"
                    side="double"
                    value="${el.total_exp_age}"
                    width="2.7"
                    font="${config.font_directory}${data.config.font}/${data.config.font}_Medium.fnt"
                    position="-0.57 0.08 0.03"
                    m_class="exp_num"
                ></a-text>
                <a-text
                    align="left"
                    color="#000000"
                    side="double"
                    value="Всего стаж работы"
                    width="1.2"
                    font="${config.font_directory}${data.config.font}/${data.config.font}_Medium.fnt"
                    position="-0.57 0 0.03"
                    m_class="exp_title"
                ></a-text>
                <a-text
                    align="left"
                    color="#000000"
                    side="double"
                    value="${el.current_exp_age}"
                    width="2.7"
                    font="${config.font_directory}${data.config.font}/${data.config.font}_Medium.fnt"
                    position="-0.57 -0.1 0.03"
                    m_class="exp_num_2"
                ></a-text>
                <a-text
                    align="left"
                    color="#000000"
                    side="double"
                    value="Стаж работы здесь"
                    width="1.2"
                    font="${config.font_directory}${data.config.font}/${data.config.font}_Medium.fnt"
                    position="-0.57 -0.2 0.03"
                    m_class="exp_title_2"
                ></a-text>
                <a-image
                    src="${el.photo}"
                    m_class="avatar"
                    width="0.4"
                    height="0.4"
                    position="0.37 -0.07 0.05"
                ></a-image>
            </a-entity>`;
            settings.z += 1;
            settings.delay += 100;
    });
    return res;
}