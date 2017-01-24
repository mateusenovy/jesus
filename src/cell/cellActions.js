import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

export function createCell(name, address, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_CELL,
        'name':         name,
        'address':      address,
        'responsible':  responsible
    });
}

export function editCell(id, name, address, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_UPDATE_CELL,
        'id':           id,
        'name':         name,
        'address':      address,
        'responsible':  responsible
    });
}

export function deleteCell(id) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_CELL,
        id
    });
}

export function findCell(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_CELL,
        filter
    });
}

export function findCellOnce() {
    db.once('value', function(res) {
        var cells = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_CELL,
            cells
        });
    });
}
