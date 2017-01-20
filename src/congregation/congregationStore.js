import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import firebase from '../app/firebase';
import C from '../constants';

class CongregationStore extends EventEmitter {

    constructor() {
        super();

        this.congregations = [];
    }

    createCongregation(name, description) {
        let newOrg = {
            'name': name,
            'description': description
        };

        return firebase.push(newOrg)
            .then(function(newOrgRes) {
                newOrg.id = newOrgRes.key;
                this.congregations.push(newOrg);
                this.emit(C.CONGR_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateCongregation(id, name, description) {
        let newOrg = {
            'name': name,
            'description': description
        };

        firebase.child(id).update(newOrg).then(function(newOrgRes) {
            var oldOrg = this.congregations.find(function(org, index) {
                return org.id === id
            });
            Object.assign(oldOrg, newOrg);
            this.emit(C.CONGR_CHANGE_LIST);
        }.bind(this));
    }

    deleteCongregations(id) {
        firebase.child(id).remove().then(function() {
            var newOrgs = this.congregations.filter(function(org) {
                return org.id !== id
            });
            this.congregations = newOrgs;
            this.emit(C.CONGR_CHANGE_LIST);
        }.bind(this));
    }

    reloadCongregations(congregations) {
        var keys = Object.keys(congregations),
            newOrgs = [];
        keys.forEach(function(value, index) {
            congregations[value].id = value;
            newOrgs.push(congregations[value]);
        });

        this.congregations = newOrgs;
        return this.congregations;
    }

    findCongregations() {
        return this.congregations;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_CONGR:
                this.createCongregation();
            break;
            case C.ACTION_UPDATE_CONGR:
                this.updateCongregation();
            break;
            case C.ACTION_DELETE_CONGR:
                this.deleteCongregations();
            break;
            case C.ACTION_FIND_CONGR:
                this.findCongregations();
            break;
            case C.ACTION_RELOAD_CONGR:
                this.reloadCongregations();
                this.emit(C.CONGR_CHANGE_LIST);
            break;
            default:
                // DO NOTHING
        }
    }
}

const congregationStore = new CongregationStore();
congregationStore.dispatcherIndex = dispatcher.register(congregationStore.handleActions.bind(congregationStore));;

export default congregationStore;
