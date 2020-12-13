class WebController {
    // https://localhost/ExCursy/api/api.php
    // https://snagix.ru/api/ExCursy/api.php
    constructor(init_now = true, api_url = "https://localhost/ExCursy/api/api.php") {
        if (init_now) this.init(api_url);
    }
    
    init(api_url) {

        this.api_url = api_url;

        this.markersdata = {};

    }

    downloadMarkers(callback) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", this.api_url+"?type=all_markers");

        xhr.responseType = 'json';
        
        xhr.send();

        xhr.onload = () => {

            console.log(xhr.response);

            this.markersdata.value = xhr.response;

            callback();

            return xhr.response;
        };

    }

}