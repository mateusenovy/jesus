import { EventEmitter } from 'events';
import { auth } from 'firebase';
import dispatcher from '../app/dispatcher';
import C from '../constants';

class LoginStore extends EventEmitter {

    getCurrentUser() {
        return auth().currentUser;
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
    
    createUserLogin(userName, password) {
        let email = userName + '@treis.com.br';
        return auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                console.error(error.message);
            }
        );
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
