import React, { ChangeEvent, useEffect, useState } from 'react';
import { useStorageContext } from '../../contexts/Firebase/Storage.context';
import CollectionBlock from '../CollectionBlock/collectionBlock.component';
import ImageInputUpload from '../ImageInputUpload/imageInputUpload.component';
import './homepage.style.css';

function Homepage() {
    const { getCollections, initWebsocket } = useStorageContext();

    const [collections, setCollections] = useState([]);
    const [currentCollectionName, setCurrentCollectionName] = useState('');

    useEffect(() => {
        initWebsocket(() => {
            updateCollections();
        })
        updateCollections();
    }, []);

    // let listImages = imageUrls.map((url) => <img src={url} />);
    const collectionBlocks = Object.entries(collections).map((imageData, i) => {
        if (imageData) {
            return <CollectionBlock key={imageData[0]} index={i} imageData={imageData}></CollectionBlock>;
        }
    });


    const updateCollections = async () => {
        const collections = await getCollections();
        // @ts-ignore
        setCollections(collections);
    };

    const onChangeCollectionName = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentCollectionName(event.target.value);
    };

    return (
        <div className='component-homepage'>
            {collectionBlocks}

            <div className='new-collection-container'>
                <div className='name-container'>
                    <span>+</span>
                    <input
                        type='text'
                        onChange={onChangeCollectionName}
                        placeholder='Ajouter une collection'
                        accept='image/png, image/jpeg'
                    />
                </div>

                {currentCollectionName && <ImageInputUpload index={-1} collectionName={currentCollectionName}></ImageInputUpload>}
                
            </div>
        </div>
    );
}

export default Homepage;
