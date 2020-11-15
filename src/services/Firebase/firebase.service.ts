import firebaseApp from 'firebase/app';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};
 
const devConfig = {
  apiKey: "AIzaSyAi_Ra3jtu5IzcYgEEI-r5jTnY2Duqodmc",
  authDomain: "site-un-euro.firebaseapp.com",
  databaseURL: "https://site-un-euro.firebaseio.com",
  projectId: "site-un-euro",
  storageBucket: "site-un-euro.appspot.com",
  messagingSenderId: "628526146063",
  appId: "1:628526146063:web:1ae50e71fd7f6c4397f97a",
  measurementId: "G-10444EGZXC"
};
 
const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
 
const app = firebaseApp.initializeApp(config);
const database = firebaseApp.firestore()

class Firebase {
  public app: any;
  public database: any;
  public storage: any;
  protected config: any;

  constructor() {
    this.config = config;
    this.app = app;
    this.database = database;
  }

}
 
export default Firebase;