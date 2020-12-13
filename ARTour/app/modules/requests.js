export function first(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open("GET", url+"?type=user&user=ARTour");
    xhr.onload = function() {
        console.log(xhr.response);
        
        callback(this);
        return this;
    };
    xhr.send(null);
}

export function second(marker, callback) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open("GET", marker.getAttribute("module"));
    xhr.onload = function () {
        const data = xhr.response;
        callback(this);
    }
    xhr.send(null);
    marker.setAttribute("loaded", "1");
}