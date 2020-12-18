import * as crypto from "./crypto.js";
import * as data from "./data.js";

// CONFIG

var config = {

};

// INIT APPINTERFACE

export function init() {
    data.data.dom.body.innerHTML += drawInterface();
    menuHideAll();
}

// CREATE INTERFACE

export function drawInterface() {
    return `
    <div class="ar-interface">
        <div class="ar-interface__menu-container menu-container_left" isopened="false">
            <div class="menu-container__element_root css-interface-leave" f-interface="leave">
                <i class="fa fa-chevron-circle-left" f-interface="leave"></i>
            </div>
        </div>

        <div class="ar-interface__menu-container menu-container_right" menutype="system" isopened="false" style="display: flex">
            <div class="menu-container__element_root" f-interface="menutoggler">
                <i ar-button__menu_main class="fa fa-bars" f-interface="menutoggler"></i>
            </div>
            <div class="menu-container__element" f-interface="fullscreentoggler">
                <i ar-button__menu_main class="fa fa-expand" f-interface="fullscreentoggler"></i>
            </div>
            <div class="menu-container__element" f-interface="reloadpage">
                <i ar-button__menu_main class="fa fa-sync-alt" f-interface="reloadpage"></i>
            </div>
        </div>

        <div class="ar-interface__menu-container menu-container_right" menutype="marker" isopened="false" style="display: none">
            <div class="menu-container__element_root" f-interface="menutoggler">
                <i ar-button__menu_main class="fa fa-cube" f-interface="menutoggler"></i>
            </div>
            <div class="menu-container__element_list" isopened="false" listid="1">
                <div class="element-item_root" f-interface="menulisttoggler">
                    <i class="fa fa-cog" f-interface="menulisttoggler"></i>
                </div> 
                <div class="element-item" f-interface="zoomin">
                    <i class="fa fa-search-plus" f-interface="zoomin"></i>
                </div>
                <div class="element-item" f-interface="zoomout">
                    <i class="fa fa-search-minus" f-interface="zoomout"></i>
                </div>
                <div class="element-item" f-interface="rotateleft">
                    <i class="fa fa-undo" f-interface="rotateleft"></i>
                </div>
                <div class="element-item" f-interface="rotateright">
                    <i class="fa fa-redo-alt" f-interface="rotateright"></i>
                </div>
            </div>
            <div class="menu-container__element_list" isopened="false" listid="2">
                <div class="element-item_root" f-interface="menulisttoggler">
                    <i class="fa fa-play-circle" f-interface="menulisttoggler"></i>
                </div>
                <div class="element-item" f-interface="showtitle">
                    <i class="fa fa-heading" f-interface="showtitle"></i>
                </div>
            </div>
        </div>

        <div class="ar-interface__menu-container menu-container_right" menutype="markers" isopened="false" style="display: none">
            <div class="menu-container__element_root" f-interface="menutoggler">
                <i ar-button__menu_main class="fa fa-cubes" f-interface="menutoggler"></i>
            </div>
            <div class="menu-container__element_list" isopened="false" listid="1">
                <div class="element-item_root" f-interface="menulisttoggler">
                    <i class="fa fa-cog" f-interface="menulisttoggler"></i>
                </div>
                <div class="element-item" f-interface="zoomin">
                    <i class="fa fa-search-plus" f-interface="zoomin"></i>
                </div>
                <div class="element-item" f-interface="zoomout">
                    <i class="fa fa-search-minus" f-interface="zoomout"></i>
                </div>
                <div class="element-item" f-interface="rotateleft">
                    <i class="fa fa-undo" f-interface="rotateLeft"></i>
                </div>
                <div class="element-item" f-interface="rotateright">
                    <i class="fa fa-redo-alt" f-interface="rotateRight"></i>
                </div>
            </div>
        </div>
    </div>
    `;
}

// MENU OPERATIONS

export function menuHideAll() {
    var type = "container";
    const prepared = ["div.menu-container__element_root[f-interface=menutoggler]", "div.element-item_root[f-interface=menulisttoggler]"];

    prepared.forEach(e => {
        const arr = document.querySelectorAll(e);
        arr.forEach(e => {
            menuToggler(type, e);
            menuToggler(type, e);
        });
        type = "list";
    });
}

export function menuToggler(type = "container", el) {

    // Get parent node from button (or icon):
    var parentNode = el.parentNode;
    if (parentNode.hasAttribute("isopened") == false) parentNode = parentNode.parentNode;
    
    // What class we need to select:
    const prepared = type == "list" ? "div.element-item" : "div.menu-container__element, div.menu-container__element_list";

    // Get all childs:
    var childs = parentNode.querySelectorAll(prepared);

    const condition = parentNode.getAttribute("isopened");
    const isOpenedCondition = condition == "true" ? "false" : "true";

    var display = "flex";
    if (condition == "true") display = "none";

    childs.forEach(el => { el.style.display = display; });

    parentNode.setAttribute("isopened", isOpenedCondition);
}

// SHOW TITLE

export async function showTitle(marker) {
    if (typeof marker.title == undefined) return;

    var textbox = document.createElement("div");
        textbox.classList.add("ar-title");
        textbox.setAttribute("token", crypto.token(16));
        textbox.innerHTML += `
            <div class="ar-title__box">
                <h2 class="ar-title__title"><span class="badge">${marker.title}</span></h2>
            </div>
        `;
        
        data.data.dom.body.appendChild(textbox);

    // ANIMATION

    textbox.animate([{opacity: 0}, {opacity: 1}], 350);
    textbox.style.opacity = 1;
    setTimeout(() => {
        textbox.animate([
            {opacity: 1},
            {opacity: 0}
        ], 350);
        setTimeout(() => {
            textbox.remove();
        }, 350);
    }, 1500);
}

// CHANGE MENU

export async function setMenu(type) {
    var containers = document.querySelectorAll(`div.ar-interface > div.menu-container_right`);

    containers.forEach(el => {
        if (el.getAttribute("menutype") == type) {
            el.style.display = "flex";
        } else {
            el.style.display = "none";
        }
    });
    return this;
}

// EVENTS

export function event(type, el) {
    if (el.hasAttribute("f-interface") == false) return;
    
    var func = el.getAttribute("f-interface");

    import(`../marker_events/${type}.js`).then(event => {
        event.run(func, el);
    }).catch(err => { console.log(`APPINTERFACE -> EVENT -> ${type.toUpperCase()} ERROR |`, err); });
}