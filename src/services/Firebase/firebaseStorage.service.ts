import 'firebase/auth';
import { generateRandomUUID } from '../../helpers/uuid';
import Firebase from './firebase.service';

class FirebaseStorage extends Firebase {
    public storage: any;
    public storageRef: any;
    public collectionsRef: any;
    private imagesPath = "images"

    constructor() {
        super();
        this.storage = this.app.storage();
        this.storageRef = this.storage.ref();
        this.collectionsRef = this.database.collection("collections");
    }

    public initWebsocket = (callback: any) => {
        this.collectionsRef.onSnapshot((collection: any) => {
            callback(collection);
        });

        this.collectionsRef.get().then((response: any) => {
            response.forEach((doc: any) => {
                this.collectionsRef.doc(doc.id).collection("images").onSnapshot((collection: any) => {
                    callback(collection);
                });                    
            });
        });
    }

    public storeImage = async (
        { data, collectionName, name, description, price }
        : { data: string, collectionName: string, name?: string, description?: string, price?: number }
    ): Promise<any> => {
        if (data === null || data === undefined) {
            throw new Error("Missing parameter [ data ]")
        }
        if (collectionName === null || collectionName === undefined) {
            throw new Error("Missing parameter [ collectionName ]")
        }

        const ref = await this.storeImageFromBase64DataImage(data);
        const url = await this.getImageUrlFromReference(ref.ref);

        return this.storeImageDataInFirestore({ collectionName, data, name, description, price, url });
    };

    public getCollections = async (): Promise<any> => {
        return new Promise((resolve, reject) => { 
            const collections: any = {}; 

            this.collectionsRef.get().then((response: any) => {
                response.forEach((doc: any) => {
                    const collectionName = doc.data().name;
                    collections[collectionName] = [];

                    this.collectionsRef.doc(doc.id).collection("images").get().then((r: any) => {
                        r.forEach((doc: any) => {
                            collections[collectionName].push(doc.data());
                        });
                        resolve(collections);
                    });
                });
            });
         });
    };

    private getImageUrlsOfcollection = (collectionName: string): Promise<string[]> => {
        return new Promise((resolve, reject) => { 
            this.storageRef.child(this.imagesPath).listAll().then(async (response: any) => {
                const urls: string[] = [];
                for (const reference of response.items) {
                    const url = await this.getImageUrlFromReference(reference);
                    urls.push(url);
                }
                resolve(urls);
            })
         });
    };

    private getImageUrlFromReference = (reference: any): Promise<any> => {
        return new Promise((resolve, reject) => { 
            reference.getDownloadURL().then((url: any) => {
                resolve(url);
            });
         });
    };

    private getImageFromUrl = (url: string): Promise<any> => {
        return new Promise((resolve, reject) => { 
        //     const imagesRef = this.storageRef.child(`${this.imagesPath}/${uuid}`);
        //     imagesRef.child("0.jpeg").getDownloadURL().then((url: any) => {
        //         console.log('rul:', url);
        //     })
         });
    };

    private storeImageDataInFirestore = async (
        { collectionName, data, name, description, price, url }
        : { collectionName: string, data: string, name?: string, description?: string, price?: number, url: string }
    ) => {

        const collectionRef = await this.getCollectionRefFromName(collectionName);

        if (collectionRef === null) {
            const collectionRef = await this.createNewCollectionDocument(collectionName);
            return await this.createNewImageDocument({ collectionRef, data, name, description, price, url })
        } else {
            return await this.createNewImageDocument({ collectionRef, data, name, description, price, url })
        }
    }

    private createNewCollectionDocument = (collectionName: string) => {
        return new Promise((resolve, reject) => { 
            const collectionId = generateRandomUUID();
            const collectionRef = this.collectionsRef.doc(collectionId);
            collectionRef.set({ name: collectionName }); 
            resolve(collectionRef);
        });
    }

    private createNewImageDocument = (
        { collectionRef, data, name, description, price, url }:
        { collectionRef: any, data: string, name?: string, description?: string, price?: number, url: string }
    ) => {

        const dataToStore = {
            name: name ? name : "",
            description: description ? description : "",
            price: price ? price : 0,
            order: 1,
            url: url
        }

        return new Promise((resolve, reject) => { 
            const documentId = generateRandomUUID();
            resolve(collectionRef.collection("images").doc(documentId).set(dataToStore)); 
        });
    }

    private getCollectionRefFromName = (collectionName: string) : Promise<string | null> => {
        return new Promise((resolve, reject) => { 
            this.collectionsRef.where("name", "==", collectionName).get().then((response: any) => {
                response.forEach((doc: any) => {
                    resolve(this.collectionsRef.doc(doc.id))
                });

                resolve(null);
            });
        });
    }

    private storeImageFromBase64DataImage = (data: string): Promise<any> => {
        return new Promise((resolve, reject) => { 
            const uuid = generateRandomUUID()
            const imagesRef = this.storageRef.child(`${this.imagesPath}/${uuid}`);
            imagesRef.putString(data, 'data_url').then((url: any) => {
                resolve(url);
            })
         });
    };
}

export default FirebaseStorage;
