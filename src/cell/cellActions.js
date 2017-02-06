import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

export function createCell(congregationId, gridId, name, address, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_CELL,
        'congregationId': congregationId,
        'gridId':         gridId,
        'name':           name,
        'address':        address,
        'responsible':    responsible
    });
}

export function editCell(congregationId, gridId, cellId, name, address, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_UPDATE_CELL,
        'congregationId': congregationId,
        'gridId':         gridId,
        'cellId':         cellId,
        'name':           name,
        'address':        address,
        'responsible':    responsible
    });
}

export function deleteCell(congregationId, gridId, cellId) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_CELL,
        congregationId, gridId, cellId
    });
}

export function findCell(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_CELL,
        filter
    });
}

export function findCellOnce(congregationId, gridId) {
    db.once('value', function(res) {
        var congregations = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_CELL,
            congregationId, gridId,
            congregations
        });
    });
}
