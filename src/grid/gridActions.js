import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

export function createGrid(congregation, name, color, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_GRID,
        'name':         name,
        'color':        color,
        'congregation': congregation,
        'responsible':  responsible
    });
}

export function editGrid(id, congregation, name, color, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_UPDATE_GRID,
        'id':           id,
        'name':         name,
        'color':        color,
        'congregation': congregation,
        'responsible':  responsible
    });
}

export function deleteGrid(id) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_GRID,
        id
    });
}

export function findGrid(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_GRID,
        filter
    });
}

export function findGridOnce() {
    db.once('value', function(res) {
        var grids = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_GRID,
            grids
        });
    });
}
