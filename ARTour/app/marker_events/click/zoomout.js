export function run(func, el) {
    import('../../modules/data.js').then(data => {
        import('../../modules/markers.js').then(markers => {
            markers.zoom(data.data.markers, 0, [0.2, 0.2, 0.2]);
        }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
    }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
}