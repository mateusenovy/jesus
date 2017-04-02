import dispatcher from '../app/dispatcher';
import C from '../constants';
import { users as db } from '../app/firebase';
import UserStore from './userStore';

export function createUser(name, password, birth, rg, address, situation, cell, disciplinarian) {
    dispatcher.dispatch({
        type: C.ACTION_CREATE_USER,
        name, password, birth, rg, address, situation, cell, disciplinarian
    });
}

export function editUser(idText, name, birth, rg, address, situation, cell, disciplinarian) {
    dispatcher.dispatch({
        type: C.ACTION_UPDATE_USER,
        id: idText,
        name, birth, rg, address, situation, cell, disciplinarian
    });
}

export function deleteUser(id) {
    dispatcher.dispatch({
        type: C.ACTION_DELETE_USER,
        id
    });
}

export function findUser(filter) {
    dispatcher.dispatch({
        type: C.ACTION_FIND_USER,
        filter
    });
}

export function findUsersOnce(onlyCurrentOrganization = false) {
    const resFindUsers = function(res) {
        var users = res.val() || {};
        dispatcher.dispatch({
            type: C.ACTION_RELOAD_USER,
            users
        });
    };
    
    onlyCurrentOrganization
        ? db.orderByChild('organizationName').equalTo(UserStore.getCurrentUser().organizationName).once('value', resFindUsers)
        : db.once('value', resFindUsers);
}
