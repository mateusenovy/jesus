import { initializeApp, auth, database } from 'firebase';
import firebaseConfig from '../constants/firebase';

initializeApp(firebaseConfig);

const organization = database().ref('organization');

export organization;
