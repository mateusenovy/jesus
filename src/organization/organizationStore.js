import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import firebase from '../app/firebase';
import C from '../constants';

class OrganizationStore extends EventEmitter {

    constructor() {
        super();

        this.organizations = [];
    }

    createOrg(name, description) {
        var newOrg = {
            'name': name,
            'description': description
        };

        return firebase.push(newOrg)
            .then(function(newOrgRes) {
                newOrg.id = newOrgRes.key;
                this.organizations.push(newOrg);
                this.emit(C.ORG_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateOrg() {
        console.log('update');
    }

    deleteOrg(id) {
        firebase.child(id).remove().then(function() {
            var newOrgs = this.organizations.filter(function(org) {
                return org.id !== id
            });
            this.organizations = newOrgs;
            this.emit(C.ORG_CHANGE_LIST);
        }.bind(this));
    }

    reloadOrg(organizations) {
        var keys = Object.keys(organizations),
            newOrgs = [];
        keys.forEach(function(value, index) {
            organizations[value].id = value;
            newOrgs.push(organizations[value]);
        });

        this.organizations = newOrgs;
        return this.organizations;
    }

    findOrg() {
        return this.organizations;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_ORG:
                this.createOrg(action.name, action.description);
            break;
            case C.ACTION_UPDATE_ORG:
                this.updateOrg(action.id, action.description);
            break;
            case C.ACTION_DELETE_ORG:
                this.deleteOrg(action.id);
            break;
            case C.ACTION_FIND_ORG:
                this.findOrg();
            break;
            case C.ACTION_RELOAD_ORG:
                this.reloadOrg(action.organizations);
                this.emit(C.ORG_CHANGE_LIST);
            break;
            default:
                // DO NOTHING
        }
    }
}

const organizationStore = new OrganizationStore();
organizationStore.dispatcherIndex = dispatcher.register(organizationStore.handleActions.bind(organizationStore));;

export default organizationStore;
