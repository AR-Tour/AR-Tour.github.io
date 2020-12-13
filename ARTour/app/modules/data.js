export var data = {
    markers: [],
    dom: {
        body: document.querySelector("body")
    },
    user: {
        location: {}
    }
}

// ARRAY OPERATIONS

export async function DOMArray(array, DOMElement, flag = "add") {
    flag == "add" ? array.unshift(DOMElement) : array.splice(DOMElement, 1);
    return this;
}