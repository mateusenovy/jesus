import dispatcher from '../app/dispatcher';
import firebase from '../app/firebase';
import C from '../constants';

export function createOrg(nameText, descriptionText) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_ORG,
        name: nameText,
        description: descriptionText
    });
}

export function deleteOrg(id) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_ORG,
        id
    });
}

export function findOrg(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_ORG,
        filter
    });
}

export function findOrgOnce() {
    firebase.once('value', function(res) {
        var organizations = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_ORG,
            organizations
        });
    });
}
