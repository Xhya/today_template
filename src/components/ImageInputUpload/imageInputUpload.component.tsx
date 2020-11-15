import React, { useState } from 'react';
import { useStorageContext } from '../../contexts/Firebase/Storage.context';
import './imageInputUpload.style.css';

function ImageInputUpload({ collectionName }: { collectionName: string }) {
    const { storeImage } = useStorageContext();

    const fileInput = React.createRef<HTMLInputElement>();

    const onChangeUploadingImage = () => {
        var reader = new FileReader();
        
        if (fileInput.current?.files) {
            reader.readAsDataURL(fileInput.current?.files[0]);
        }

        reader.onload = async function () {
            // @ts-ignore
            fileInput.current.src = reader.result;

            storeImage({ data: String(reader.result), collectionName });
        };
    };

    return (
        <div className='component-image-input-upload'>
            <input type='file' ref={fileInput} onChange={onChangeUploadingImage} />
        </div>
    );
}

export default ImageInputUpload;
