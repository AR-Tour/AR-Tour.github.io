export function run(func, el) {
    import('../../modules/data.js').then(data => {
        import('../../modules/markers.js').then(markers => {
            markers.rotate(data.data.markers, 90);
        }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
    }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
}