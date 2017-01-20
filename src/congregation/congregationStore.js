import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

class CongregationStore extends EventEmitter {

    constructor() {
        super();

        this.congregations = [];
    }

    createCongregation(name, description) {
        let newCongr = {
            'name': name,
            'description': description
        };

        return db.push(newCongr)
            .then(function(newCongrRes) {
                newCongr.id = newCongrRes.key;
                this.congregations.push(newCongr);
                this.emit(C.CONGR_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateCongregation(id, name, description) {
        let newCongr = {
            'name': name,
            'description': description
        };

        db.child(id).update(newCongr).then(function(newCongrRes) {
            var oldCongr = this.congregations.find(function(congr, index) {
                return congr.id === id
            });
            Object.assign(oldCongr, newCongr);
            this.emit(C.CONGR_CHANGE_LIST);
        }.bind(this));
    }

    deleteCongregation(id) {
        db.child(id).remove().then(function() {
            var newCongrs = this.congregations.filter(function(congr) {
                return congr.id !== id
            });
            this.congregations = newCongrs;
            this.emit(C.CONGR_CHANGE_LIST);
        }.bind(this));
    }

    reloadCongregations(congregations) {
        var keys = Object.keys(congregations),
            newCongrs = [];
        keys.forEach(function(value, index) {
            congregations[value].id = value;
            newCongrs.push(congregations[value]);
        });

        this.congregations = newCongrs;
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
                this.deleteCongregation(action.id);
            break;
            case C.ACTION_FIND_CONGR:
                this.findCongregations();
            break;
            case C.ACTION_RELOAD_CONGR:
                this.reloadCongregations(action.congregations);
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
