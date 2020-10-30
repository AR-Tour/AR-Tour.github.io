class Interface {

    // MAIN CONSTRUCTOR

    constructor(container = "") {

        // Containers:

        // Node list
        this.nodeList = {};
        // Exceptions
        this.exceptions = {};
        // Markers
        this.markers = [];
        
        // body tag init
        this.nodeList.container = container;
    }

    //Init interface with system functionality:
    init(container) {

        this.nodeList.body = document.getElementsByTagName("body")[0];

        this.nodeList.container = container;

        container.innerHTML += `
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
                <div class="element-item" f-interface="rotateLeft">
                    <i class="fa fa-undo" f-interface="rotateLeft"></i>
                </div>
                <div class="element-item" f-interface="rotateRight">
                    <i class="fa fa-redo-alt" f-interface="rotateRight"></i>
                </div>
            </div>
            <div class="menu-container__element_list" isopened="false" listid="2">
                <div class="element-item_root" f-interface="menulisttoggler">
                    <i class="fa fa-info-circle" f-interface="menulisttoggler"></i>
                </div>
                <div class="element-item" f-interface="showtitle">
                    <i class="fa fa-heading" f-interface="showtitle"></i>
                </div>
                <!-- <div class="element-item" f-interface="showdescription">
                    <i class="fa fa-align-center" f-interface="showdescription"></i>
                </div> -->
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
                <div class="element-item" f-interface="rotateLeft">
                    <i class="fa fa-undo" f-interface="rotateLeft"></i>
                </div>
                <div class="element-item" f-interface="rotateRight">
                    <i class="fa fa-redo-alt" f-interface="rotateRight"></i>
                </div>
            </div>
        </div>
        `;

        // Add to nodeList three containers:

        this.nodeList.menu_system = document.querySelector("div.ar-interface__menu-container[menutype=system]");
        this.nodeList.menu_marker = document.querySelector("div.ar-interface__menu-container[menutype=marker]");
        this.nodeList.menu_markers = document.querySelector("div.ar-interface__menu-container[menutype=markers]");

        // Hide menu and lists of menu:
        const prepared = ["div.menu-container__element_root[f-interface=menutoggler]", "div.element-item_root[f-interface=menulisttoggler]"];
        var type = "container";

        prepared.forEach(e => {
            const arr = document.querySelectorAll(e);
            arr.forEach(e => {
                this._menuToggler(type, e);
                this._menuToggler(type, e);
            });
            type = "list";
        });
    }

    // Marker menu (val : str ("system" || "marker" || "markers"):
    
    markerMenu(val) {
        console.log(val);
        switch (val) {
            case "system":
                this._systemMenu();
                break;

            case "marker":
                this._markerMenu();
                break;
        
            case "markers":
                this._markersMenu();
                break;

            default:
                return;
        }
    }

    // Current marker:
    // Flags:
    //
    // add (as default)    add marker into array
    // remove              remove marker from array

    currentMarker(marker, flag = "add") {
        flag == "add" ? this.markers.unshift(marker) : this.markers.splice(marker, 1);
        return;
    }

    // Vibration:

    vibrate(ms) {
        return;
        if("vibrate" in navigator)  return navigator.vibrate(ms);
        if("oVibrate" in navigator)  return navigator.oVibrate(ms);
        if("mozVibrate" in navigator)  return navigator.mozVibrate(ms);
        if("webkitVibrate" in navigator)  return navigator.webkitVibrate(ms);
        return;
    }

    // Show title function:

    showTitle(marker) {
        if (typeof marker.title == undefined) return 0;
        
        var token = this._generate_token(16);

        var textbox = document.createElement("div");
            textbox.classList.add("ar-title");
            textbox.setAttribute("token", token);

            textbox.innerHTML += `
                <div class="ar-title__box">
                    <h2 class="ar-title__title"><span class="badge">${marker.title}</span></h2>
                </div>
            `;
            
            this.nodeList.body.appendChild(textbox);

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

    // Show description function:

    showDescription(marker) {
        if (typeof marker == "undefined") return 0;

        let m_id = marker.getAttribute("m_id");

        if (typeof m_id == "undefined") return 0;

        var inf_container = document.querySelector(`div[m_id="${m_id}"]`);

        

        console.log(inf_container);
    }

    // Hide loader method:
    hideLoader() {
        document.querySelector(".ar-loader").style.display = "none";
        return 1;
    }
 
    // EVENTS:

        // Click:

        btnClickEvent(el) {
            if (el.hasAttribute("f-interface") == false) return;
            
            var func = el.getAttribute("f-interface");

            switch (func) {
                case "leave":
                    history.go(-1);
                break;
                case "showtitle":
                    this.markers.forEach(e => {
                        this.showTitle(e);
                    });
                break;
                case "showdescription":
                    this.markers.forEach(e => {
                        this.showDescription(e);
                    });
                break;
                case "fullscreentoggler":
                    this._fullScreenToggler();
                break;
                case "reloadpage":
                    window.location.href = window.location.pathname + window.location.search + window.location.hash;
                break;
                case "menutoggler":
                    this._menuToggler("container", el);
                break;
                case "menulisttoggler":
                    this._menuToggler("list", el);
                break;
                case "zoomin":
                    zoom(this.markers, 1);
                break;
                case "zoomout":
                    zoom(this.markers, 0);
                break;
                case "rotateLeft":
                    rotate(this.markers, 90);
                break;
                case "rotateRight":
                    rotate(this.markers, -90);
                break;
            }

            // Close functions to compare equal code:

                // Zoom (in & out)
                //
                // markers : array [obj]
                // m_type : bool      1 - in, 0 - out
                function zoom(markers, m_type = 0) {
                    markers.forEach(e => {
                        var markerObj = new MarkerObj(e, false);
                        markerObj.zoom({type: m_type});
                    });
                }

                // Rotate
                //
                // markers : array [obj]
                // m_angle : int (-360 to 360)
                function rotate(markers, m_angle = 0) {
                    markers.forEach(e => {
                        var markerObj = new MarkerObj(e, true);
                        markerObj.rotate({angle: m_angle});
                    });
                }
        }



    // Private zone - private functions:

    //Generating unique tokens:

    _generate_token(length) {
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-+=!.,$#^&*(){}[]|".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    // Some methods for markerMenu:

        //System menu:
        _systemMenu() {
            document.querySelector("div.ar-interface__menu-container[menutype=markers]").style.display = "none";
            document.querySelector("div.ar-interface__menu-container[menutype=marker]").style.display =  "none";
            document.querySelector("div.ar-interface__menu-container[menutype=system]").style.display =  "flex";
        }

        //Marker menu:
        _markerMenu() {
            document.querySelector("div.ar-interface__menu-container[menutype=markers]").style.display = "none";
            document.querySelector("div.ar-interface__menu-container[menutype=marker]").style.display =  "flex";
            document.querySelector("div.ar-interface__menu-container[menutype=system]").style.display =  "none";
        }

        //Markers menu:
        _markersMenu() {
            document.querySelector("div.ar-interface__menu-container[menutype=markers]").style.display = "flex";
            document.querySelector("div.ar-interface__menu-container[menutype=marker]").style.display =  "none";
            document.querySelector("div.ar-interface__menu-container[menutype=system]").style.display =  "none";
        }

    //Fullscreen toggler:
    _fullScreenToggler() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen(); 
          }
        }
      }

    // MenuToggler:
    //
    // Menu Toggler's method:
    // Attributes:
    // type : str ("container" || "list")
    // el : obj (DOM element)
    _menuToggler(type = "container", el = document.createElement()) {
        
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

        childs.forEach(el => {
            el.style.display = display;
        });

        parentNode.setAttribute("isopened", isOpenedCondition);
    }
}