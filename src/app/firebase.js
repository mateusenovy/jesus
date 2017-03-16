import { initializeApp, database, auth } from 'firebase';
import firebaseConfig from '../constants/firebase';
import loginStore from '../login/loginStore';

initializeApp(firebaseConfig);

const organization = database().ref('organization');

export const users = database().ref('users');

export const getOrganizationDb = function(organizationDbName) {
    return database().ref(organizationDbName);
};

export const getOrganizationDbByUser = function() {
    if (!!loginStore.getCurrentUser()) {
        let dbName =  loginStore.getUsersOrganization() || 'default';
        return database().ref(dbName);
    }
    return database().ref('default');
};

export const fbAuth = auth;

export default organization;