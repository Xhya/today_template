import React from 'react';
import ImageInputUpload from '../ImageInputUpload/imageInputUpload.component';
import './collectionBlock.style.css';

function CollectionBlock({ imageData, index }: { imageData: any, index: number }) {

    const images = imageData[1].map((i: any) => (
        <div key={i.url} className='item-container'>
            <img src={i.url} />
        </div>
    ));

    return (
        <div className='component-collection-block'>
            <div className='name-container'>
                <input disabled type='text' accept='image/png, image/jpeg' value={imageData[0]} />
            </div>

            <div className="items-container">
                {images}
                <ImageInputUpload index={index} collectionName={imageData[0]}></ImageInputUpload>
            </div>


        </div>
    );
}

export default CollectionBlock;
