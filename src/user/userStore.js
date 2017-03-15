import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
import LoginStore from '../login/loginStore';
var db = require('../app/firebase').getOrganizationDb('users');

class UserStore extends EventEmitter {

    constructor() {
        super();

        this.users = [];
        this.currentUser = {};
    }

    createUser(name, password, birth, rg, address, situation, cell, disciplinarian, organization) {
        
        organization = !organization ? this.currentUser.organizationName : organization;
        debugger;
        let newUser = {
            'name': name,
            'birth': birth,
            'rg': rg,
            'address': address,
            'situation': situation,
            'cell': cell,
            'disciplinarian': disciplinarian,
            'organizationName': organization || 'default'
        };

        LoginStore.createUserLogin(name, password).then(function(user) {
            newUser.uid = user.uid;

            db.push(newUser)
                .then(function(newUserRes) {
                    newUser.id = newUserRes.key;
                    this.users.push(newUser);
                    this.emit(C.USER_CHANGE_LIST);
                }.bind(this)
            );
        }.bind(this));
    }

    updateUser(id, name, birth, rg, address, situation, cell, disciplinarian) {
        let newUser = {
            'name': name,
            'birth': birth,
            'rg': rg,
            'address': address,
            'situation': situation,
            'cell': cell,
            'disciplinarian': disciplinarian
        };

        db.child(id).update(newUser).then(function(newUserRes) {
            let oldUser = this.users.find(function(user, index) {
                return user.id === id
            });
            Object.assign(oldUser, newUser);
            this.emit(C.USER_CHANGE_LIST);
        }.bind(this));
    }

    deleteUser(id) {
        db.child(id).remove().then(function() {
            let newUsers = this.users.filter(function(user) {
                return user.id !== id
            });
            this.users = newUsers;
            this.emit(C.USER_CHANGE_LIST);
        }.bind(this));
    }

    reloadUser(users) {
        debugger;
        let keys = Object.keys(users),
            newUsers = [];
        keys.forEach(function(value, index) {
            users[value].id = value;
            newUsers.push(users[value]);
        });

        this.users = newUsers;
        return this.users;
    }

    findUser() {
        this.findUserByUserId();
        return this.users;
    }

    findUserByUserId(uid) {
        uid = uid || 'c0WYupwhprUMNg6CB2NFEvedNR22';
        //'c0WYupwhprUMNg6CB2NFEvedNR22'
        db.orderByChild('uid').equalTo(uid).once('value', function(t) {
            console.log(t.val());
        });
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_USER:
                this.createUser(action.name, action.password, action.birth,
                    action.rg, action.address, action.situation, action.cell, action.disciplinarian
                );
            break;
            case C.ACTION_UPDATE_USER:
                this.updateUser(action.id, action.name, action.birth, action.rg, action.address,
                    action.situation, action.cell, action.disciplinarian
                );
            break;
            case C.ACTION_DELETE_USER:
                this.deleteUser(action.id);
            break;
            case C.ACTION_FIND_USER:
                this.findUser();
            break;
            case C.ACTION_RELOAD_USER:
                this.reloadUser(action.users);
                this.emit(C.USER_CHANGE_LIST);
            break;
            default:
                // DO NOTHING
        }
    }
}

const userStore = new UserStore();
userStore.dispatcherIndex = dispatcher.register(userStore.handleActions.bind(userStore));;

export default userStore;
