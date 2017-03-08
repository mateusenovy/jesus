import { initializeApp, database } from 'firebase';
import firebaseConfig from '../constants/firebase';
import loginStore from '../login/loginStore';

initializeApp(firebaseConfig);

const organization = database().ref('organization');

export default organization;

export const getOrganizationDb = function(organizationDbName) {
    return database().ref(organizationDbName);
};

export const getOrganizationDbByUser = function() {
	if (!!loginStore.getCurrentUser()) {
		let dbName =  loginStore.getCurrentUser().providerData[0].organizationName || 'default';
    	return database().ref(dbName);
	}
	return database().ref('default');
};
