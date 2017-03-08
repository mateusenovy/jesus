import dispatcher from '../app/dispatcher';
import C from '../constants';
import { getOrganizationDbByUser as db } from '../app/firebase';

export function createGrid(congregationId, name, color, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_GRID,
        'name':           name,
        'color':          color,
        'congregationId': congregationId,
        'responsible':    responsible
    });
}

export function editGrid(id, congregationId, name, color, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_UPDATE_GRID,
        'id':             id,
        'name':           name,
        'color':          color,
        'congregationId': congregationId,
        'responsible':    responsible
    });
}

export function deleteGrid(congregationId, id) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_GRID,
        congregationId,
        id
    });
}

export function findGrid(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_GRID,
        filter
    });
}

export function findGridOnce(congregationId) {
    db().once('value', function(res) {
        var congregations = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_GRID,
            congregationId,
            congregations
        });
    });
}
