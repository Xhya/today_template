import React, { useEffect, useState } from 'react';
import FirebaseStorage from '../../services/Firebase/firebaseStorage.service';

const storage = new FirebaseStorage();

export const StorageContext = React.createContext({
    initWebsocket: (callback: any) => {},
    storeImage: (body: any) => {},
    getCollections: () => {},
});

function StorageProvider(props: any) {

    function initWebsocket(callback: () => any) {
        return storage.initWebsocket(callback);
    }

    async function getCollections() {
        return storage.getCollections();
    }

    async function storeImage(
        { data, collectionName, name, description, price }
        : { data: string, collectionName: string, name?: string, description?: string, price: number }
    ) {
        return storage.storeImage({ data, collectionName, name, description, price });
    }

    const contextValue = { storeImage, getCollections, initWebsocket };

    return <StorageContext.Provider value={contextValue} {...props} />;
}

function useStorageContext() {
    return React.useContext(StorageContext);
}

export { StorageProvider, useStorageContext };
