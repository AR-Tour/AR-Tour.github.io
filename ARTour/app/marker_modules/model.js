export function render(data) {
    var res = "";

    data.forEach(el => {
        res += `
        <a-entity 
            gltf-model="${el.link}"
            position="${el.config.position.x} ${el.config.position.y} ${el.config.position.z}"
            rotation="${el.config.rotation.x} ${el.config.rotation.x} ${el.config.rotation.x}"
            scale="${el.config.scale.x} ${el.config.scale.y} ${el.config.scale.z}"
        > ${childnode(el.config.childnodes)} </a-entity>
        `;
    });

    return res;
}

function childnode(array) {
    var res = "";
    array.forEach(el => {
        res += `
            <${el.tag}
                position="${el.position.x} ${el.position.y} ${el.position.z}",
                type="${el.type}"
                insensity="${el.insensity}"
            ></${el.tag}>
        `;
    });
    return res;
}