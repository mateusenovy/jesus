import { EventEmitter } from 'events';
import { auth } from 'firebase';
import dispatcher from '../app/dispatcher';
import C from '../constants';
import UserStore from '../user/userStore';

class LoginStore extends EventEmitter {

    getCurrentUser() {
        return auth().currentUser;
    }

    getUserOrganizationName() {
        let currentUser = UserStore.getCurrentUser();
        return currentUser.organizationName;
    }

    checkUserIsSigned() {
        let user = this.getCurrentUser();
        let screen = !!user ? null : 'login';

        this.emit(C.CHANGE_SCREEN, screen);
    }

    validateUserLogin(userName, password) {
        let email = userName + '@treis.com.br';

        auth().signInWithEmailAndPassword(email, password)
            .then(function(user) {
                UserStore.setCurrentUserByUserId(user.uid);
                this.emit(C.CHANGE_SCREEN);
            }.bind(this))
            .catch(function(error) {
                let message = null;
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    message = 'Usuário ou senha inválidos.';
                }
                this.emit(C.SHOW_MESSAGE_LOGIN, message);
            }.bind(this));
    }

    handleActions(action) {
        switch (action.type) {
            case C.VALIDATE_USER_LOGIN:
                this.validateUserLogin(action.userName, action.password);
            break;
            default:
                // DO NOTHING
        }
    }
}

const loginStore = new LoginStore();
loginStore.dispatcherIndex = dispatcher.register(loginStore.handleActions.bind(loginStore));;

export default loginStore;
