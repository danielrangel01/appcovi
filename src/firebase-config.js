
import { getFirestore } from '@firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore'


const firebaseConfig = {
        apiKey: "AIzaSyD7wzuZ_pqpAAw4leNz-EnO_OLosoIkH_E",
        authDomain: "appcovi-fcc86.firebaseapp.com",
        projectId: "appcovi-fcc86",
        storageBucket: "appcovi-fcc86.appspot.com",
        messagingSenderId: "581397602166",
        appId: "1:581397602166:web:4f2e11b20a4ca545c06457",
        measurementId: "G-SK3BH373SW"
      };

      //inizializar firebase

      const fire = firebase.initializeApp(firebaseConfig)
      const auth = fire.auth()
      
    
      const db = getFirestore()

  export {auth,db};
  