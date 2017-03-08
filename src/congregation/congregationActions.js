import dispatcher from '../app/dispatcher';
import C from '../constants';
import { getOrganizationDbByUser as db } from '../app/firebase';

export function createCongregation(name, cnpj, address, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_CONGR,
        'name':         name,
        'cnpj':         cnpj,
        'address':      address,
        'responsible':  responsible
    });
}

export function editCongregation(id, name, cnpj, address, responsible) {
    dispatcher.dispatch({
        type: C.ACTION_UPDATE_CONGR,
        'id':           id,
        'name':         name,
        'cnpj':         cnpj,
        'address':      address,
        'responsible':  responsible
    });
}

export function deleteCongregation(id) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_CONGR,
        id
    });
}

export function findCongregation(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_CONGR,
        filter
    });
}

export function findCongregationOnce() {
    db().once('value', function(res) {
        var congregations = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_CONGR,
            congregations
        });
    });
}
