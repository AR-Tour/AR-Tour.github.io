
class SceneController {

    constructor(
        config = {
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
        }
    ) {
        this.data = {
            body: document.querySelector("body"),
            config: config
        }

    }

    scene(act, content) {

        switch (act) {
            case "create":
                this._create(content);
            break;
            default:
            return 0;
        }

        return 1;
    }

    _create(content) {

        const scenes = document.getElementsByTagName("a-scene");
        if (scenes.length != 0) this._delete(scenes);
        const a_videos = document.getElementsByTagName("video");
        if (a_videos.length > 1) this._delete(a_videos);

        const objects = this._buildArObjects(content);

        var scene = `
        <a-scene 
        
        vr-mode-ui="false"
        arjs='
            sourceType: ${this.data.config.sourceType}; 
            debugUIEnabled: ${this.data.config.debugUIEnabled}; 
            detectionMode: ${this.data.config.detectionMode}; 
            trackingMethod: ${this.data.config.trackingMethod}; 
            matrixCodeType: ${this.data.config.matrixCodeType}; 
            sourceWidth: ${this.data.config.sourceWidth}; 
            sourceHeight: ${this.data.config.sourceHeight}; 
            displayWidth: ${this.data.config.displayWidth}; 
            displayHeight: ${this.data.config.displayHeight};
            patternRatio: ${this.data.config.patternRatio};
        '
        inspector="url: xxx" 
        embedded
        >
        <a-entity camera></a-entity>
            
            <!-- 
                A-marker - Attributes: 
                    1. m_type (custom || videoplayer)   custom - custom markers without any categories
                                                        videoplayer - set marker as a video player
                    2. m_id : int                       Unique id of marker
                    3. type : title                     title of marker
            -->
            ${objects}
        </a-scene>
        `;

        this.data.body.innerHTML += scene;
        
    }

    _delete(scenes_array) {
        for (const i in scenes_array) {
            if (typeof scenes_array[i] == "number") break;
            scenes_array[i].remove();
        }
    }
    
    _buildArObjects(container) {

        // Init prepared markers:
        var res = "";

        container.markers.forEach(el => {

            switch (el.config.type) {
                case "model":
                    res += this._buildArObjects_model(el);
                    break;
            
                default:
                    res += `<a-marker title="Marker Undefined (${el.id})"></a-marker>`
            }


            console.log(el.childnodes);

            let light_res = "";

        });

        return res;
    }

    // Build root frame:

        _buildRootFrame(el, custom_value) {
            return `
            <a-marker title="${el.info.title}" m_id="${el.id}" m_type="${el.config.type}" type='pattern' url="${el.config.pattern_link}" eventsmarker>

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
                            <a-entity gltf-model="${el.config.model_link}">

                                <!-- Light could be here, I don't sure of using it -->
                                ${extended_from_model}
                                
                            </a-entity>

                        </a-entity>

                    </a-entity>
                </a-entity>
            </a-marker>
            `;
        }

    // Build models, graphics, something else with functions:

        _buildArObjects_model(el) {
            
            let extended_from_model = this._buildArElementFromTag(el.childnodes);

            if (extended_from_model == 0) console.error("Marker build Error!", el);



        }
    
    // Build extended elements from tags:

    _buildArElementFromTag(container) {
        var prepared = "";

        container.forEach(el => {

            switch (el.tag) {
                case "a-light":

                    prepared += `
                    <${el.tag}
                    
                    u_id="${el.u_id}",
                    m_id="${el.id}",
                    position="${el.position_x} ${el.position_y} ${el.position_z}",
                    type="${el.type}",
                    insensity="${el.insensity}"

                    ></${el.tag}>
                    `;
                    
                break;


                
                default:
                    return 0;
            }
        });
    }
}