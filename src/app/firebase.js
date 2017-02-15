import { initializeApp, database, auth } from 'firebase';
import firebaseConfig from '../constants/firebase';

initializeApp(firebaseConfig);

const organization = database().ref('organization');

export default organization;

export const getOrganizationDb = function(organizationDbName) {
    return database().ref(organizationDbName);
};
