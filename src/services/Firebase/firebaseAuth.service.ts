import 'firebase/auth';
import firebase from 'firebase';
import Firebase from './firebase.service';

interface UserI {
    email: string | null,
    emailVerified: boolean,
    uid: string | null,
    phoneNumber: string | null,
}

class FirebaseAuth extends Firebase {
    private auth: any;

    constructor() {
        super();
        this.auth = this.app.auth();
    }

    public initOnAuthStateChanged(callback: (user: any) => void) {
        this.auth.onAuthStateChanged(callback);
    }

    public doCreateUserWithEmailAndPassword = (email: string, password: string): any => {
        return new Promise((resolve, reject) => { 
            this.auth.createUserWithEmailAndPassword(email, password)
                .then((response: any) => resolve(response))
                .catch((error: any) => reject(error));
         });
    };

    public doSignInWithEmailAndPassword = (email: string, password: string): any => {
        return new Promise((resolve, reject) => {
            this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                this.auth.signInWithEmailAndPassword(email, password)
                .then((response: any) => resolve(response))
                .catch((error: any) => reject(error));
            })
        });
    }

    public doSignOut = () => this.auth.signOut();

    public doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

    public doPasswordUpdate = (password: string) => this.auth.currentUser.updatePassword(password);
}

export default FirebaseAuth;
