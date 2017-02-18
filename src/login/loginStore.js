import { EventEmitter } from 'events';
import { auth } from 'firebase';
import dispatcher from '../app/dispatcher';
import C from '../constants';

class LoginStore extends EventEmitter {

    checkUserIsSigned() {
        auth().onAuthStateChanged(function(user) {
            let screen = !!user ? null : 'login';
            
            this.emit(C.CHANGE_SCREEN, screen);
            
        }.bind(this));
    }

    validateUserLogin(userName, password) {
        let email = userName + '@treis.com.br';

        auth().signInWithEmailAndPassword(email, password)
            .then(function() {
                this.emit(C.CHANGE_SCREEN);
            }.bind(this))
            .catch(function(error) {
                let message = null;
                if (error.code === 'auth/user-not-found') {
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
