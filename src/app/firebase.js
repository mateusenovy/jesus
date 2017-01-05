import { initializeApp, database } from 'firebase';
import firebaseConfig from '../constants/firebase';

initializeApp(firebaseConfig);

const organization = database().ref('organization');

export default organization;
