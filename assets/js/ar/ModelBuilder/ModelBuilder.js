class ModelBuilder {

    build(json) {

        // Init prepared markers:
        var res = "";

        json.markers.forEach(el => {

            switch (el.config.type) {
                case "model":
                    res += this.__model(el);
                    break;

                case "employees":
                    res += this.__employees(el);
                    break;
            
                default:
                    res += `<a-marker title="Marker Undefined (${el.id})"></a-marker>`
            }

        });

        return res;
    }


    //
    // PRIVATE FUNCTIONS
    //


    ////////////////////////////
    // ==== BUILD MODELS ==== //
    ////////////////////////////

    __model(element) {

        console.log(element);

        // var light = this.__childnodes(element.variables.childnodes);

        // var res = `
        // <a-entity gltf-model="${element.config.model_link}">
        //     ${light}
        // </a-entity>`;

        var res = "";

        element.models.forEach(el => {

            let light = this.__childnodes(el.config.childnodes);

            res += `
            <a-entity 
                gltf-model="${el.link}"
                position="${el.config.position.x} ${el.config.position.y} ${el.config.position.z}"
                rotation="${el.config.rotation.x} ${el.config.rotation.x} ${el.config.rotation.x}"
                scale="${el.config.scale.x} ${el.config.scale.y} ${el.config.scale.z}"
            >
                
            </a-entity>
            `
        });

        // ==== //
        return this.__rootFrame(element, res);
    }

    __employees(element) {

        var res = '';

        var data = {
            font: element.variables.config.font
        };

        var test = -(element.variables.data.length - (element.variables.data.length/2));

        var start_position = {
            x: 0,
            y: 0,
            z: test,
        };

        element.variables.data.forEach(el => {

            var model_link = "../assets/models/modules/employees/";

            console.log("object", el);

            if (el.sex == "male") {
                model_link += "man.gltf";
            } else model_link += "woman.gltf";

            res += `
                <a-entity 
                geometry="
                    primitive: plane; 
                    width: 1.3;
                    height: 0.7;
                " 
                rotation="-90 0 0"
                position="${start_position.x} ${start_position.y} ${start_position.z}"
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
                        font="../assets/fonts/ar/${data.font}/${data.font}_Black.fnt"
                        position="-0.57 0.25 0.03"
                        m_class="title"
                    ></a-text>
                    <a-text
                        align="left"
                        color="#000000"
                        side="double"
                        value="${el.role}"
                        width="1.2"
                        font="../assets/fonts/ar/${data.font}/${data.font}.fnt"
                        position="-0.57 0.18 0.03"
                        m_class="role"
                    ></a-text>
                    <a-text
                        align="left"
                        color="#000000"
                        side="double"
                        value="${el.total_exp_age}"
                        width="2.7"
                        font="../assets/fonts/ar/${data.font}/${data.font}_Medium.fnt"
                        position="-0.57 0.08 0.03"
                        m_class="exp_num"
                    ></a-text>
                    <a-text
                        align="left"
                        color="#000000"
                        side="double"
                        value="Всего стаж работы"
                        width="1.2"
                        font="../assets/fonts/ar/${data.font}/${data.font}_Medium.fnt"
                        position="-0.57 0 0.03"
                        m_class="exp_title"
                    ></a-text>
                    <a-text
                        align="left"
                        color="#000000"
                        side="double"
                        value="${el.current_exp_age}"
                        width="2.7"
                        font="../assets/fonts/ar/${data.font}/${data.font}_Medium.fnt"
                        position="-0.57 -0.1 0.03"
                        m_class="exp_num_2"
                    ></a-text>
                    <a-text
                        align="left"
                        color="#000000"
                        side="double"
                        value="Стаж работы здесь"
                        width="1.2"
                        font="../assets/fonts/ar/${data.font}/${data.font}_Medium.fnt"
                        position="-0.57 -0.2 0.03"
                        m_class="exp_title_2"
                    ></a-text>
                    <a-entity 
                        gltf-model="../assets/models/modules/employees/man.gltf"
                        rotation="90 0 0"
                        scale="0.4 0.4 0.4"
                        position="0.4 0 0"
                        animation__scale="
                            property: scale; 
                            from: 0 0 0; 
                            to: 0.4 0.4 0.4; 
                            dur: 2000; 
                            easing: easeInQuad;
                            loop: false
                        "
                    ></a-entity>
                    
                </a-entity>
            `

            start_position.z += 1;
        });

        // ==== //
        return this.__rootFrame(element, res);
    }
    
    /////////////////////////////////
    // ==== GENERAL FUNCTIONS ==== //
    /////////////////////////////////

    __rootFrame(el, custom_value) {
        return `
        <a-marker title="${el.info.title}" m_id="${el.id}" m_type="${el.config.type}" type='pattern' url="${el.config.pattern}" eventsmarker>

            <div class="ar-info-container" m_id="${el.id}">

            </div>

            <!-- Layers of ar object: -->
            <!-- FRIST: editing (scale, position, rotation, etc.) (ID : 0) -->
            <a-entity class="ar-obj_edit"
                scale="${el.config.scale_x} ${el.config.scale_y} ${el.config.scale_z}"
                rotation="${el.config.rotation_x} ${el.config.rotation_y} ${el.config.rotation_z}"
                position="${el.config.position_x} ${el.config.position_y} ${el.config.position_z}"
            >
                <!-- SECOND: goes animation layer (scaleUp & Down, rotation, etc.) (ID : 1) -->
                <a-entity class="ar-obj_animation"
                
                >
                    <!-- THIRD: goes container of models (but now in databses only one model keeps) (ID : 2) -->
                    <a-entity class="ar-obj_container"
                    
                    >

                        <!-- Finally goes model or sth else (ID : 3) -->
                        ${custom_value}

                    </a-entity>

                </a-entity>
            </a-entity>
        </a-marker>
        `;
    }

    __childnodes(container) {
        var prepared = "";

        container.forEach(el => {

            switch (el.tag) {
                case "a-light":

                    prepared += `
                    <${el.tag}

                    position="${el.position.x} ${el.position.y} ${el.position.z}",
                    type="${el.type}"
                    insensity="${el.insensity}"

                    ></${el.tag}>
                    `;
                    
                break;


                
                default:
                    return 0;
            }
        });

        return prepared;
    }
}