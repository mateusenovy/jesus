import dispatcher from '../app/dispatcher';
import C from '../constants';

export function validateUserLogin(userName, password) {
    dispatcher.dispatch({
        type: C.VALIDATE_USER_LOGIN,
        'userName': userName,
        'password': password
    });
}