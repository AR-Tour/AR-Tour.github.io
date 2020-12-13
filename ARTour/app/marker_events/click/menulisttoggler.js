export function run(func, el) {
    import('../../modules/appinterface.js').then(appinterface => {
        appinterface.menuToggler("list", el);
    }).catch(err => { console.log(`APPINTERFACE -> EVENT -> CLICK -> ${func.toUpperCase()} ERROR |`, err); });
}