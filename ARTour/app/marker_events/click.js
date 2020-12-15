export function run(func, el) {
    import(`./click/${func}.js`).then(event => {
        event.run(func, el);
    }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
}