export function run(func, el) {
    import('../../modules/appinterface.js').then(appinterface => {
        appinterface.menuToggler("container", el);
    }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
}