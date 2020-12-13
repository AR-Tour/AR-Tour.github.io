import {showTitle} from "../../modules/appinterface.js";
import {data} from "../../modules/data.js"

export function run(func, el) {
    data.markers.forEach(marker => {
        showTitle(marker); 
    });
}