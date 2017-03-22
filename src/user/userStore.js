import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
import { users as db, fbAuth } from '../app/firebase';
//var db = require('../app/firebase').getOrganizationDb('users');

class UserStore extends EventEmitter {

    constructor() {
        super();

        this.users = [];
        this.currentUser = {};
    }

    addKeyObjectIntoArray(objects) {
        let keys = Object.keys(objects),
            newArray = [];
        keys.forEach(function(value, index) {
            objects[value].id = value;
            newArray.push(objects[value]);
        });
        return newArray;
    }

    createUserLogin(userName, password) {
        let email = userName + '@treis.com.br';
        return fbAuth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                console.error(error.message);
            }
        );
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

        this.createUserLogin(name, password).then(function(user) {
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
        let newUsers = this.addKeyObjectIntoArray(users);

        this.users = newUsers;
        return this.users;
    }

    findUser() {
        return this.users;
    }

    setCurrentUserByUserId(uid) {
        db.orderByChild('uid').equalTo(uid).once('value', function(resp) {
            let user = resp.val(),
                currentUser = this.addKeyObjectIntoArray(user);
            this.setCurrentUser(currentUser[0]);
        }.bind(this));
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    getCurrentUser(user) {
        return this.currentUser;
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
