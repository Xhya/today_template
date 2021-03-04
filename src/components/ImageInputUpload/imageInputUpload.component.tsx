import React from 'react';
import { useStorageContext } from '../../contexts/Firebase/Storage.context';
import './imageInputUpload.style.css';

function ImageInputUpload({ collectionName, index }: { collectionName: string, index: number }) {
    const { storeImage } = useStorageContext();

    console.log('collectionName:', collectionName);

    const dropAreaId = `drop-area-${index}`
    const dropArea = document.getElementById(dropAreaId);

    const inputId = `input-file-ref-${index}`;
    const inputElement = document.getElementById(inputId);
    

    const onChangeUploadingImage = () => {
        console.log('\x1b[5m%s\x1b[0m', 'Passe par la');
        let reader = new FileReader();
        // @ts-ignore
        reader.readAsDataURL(inputElement.files[0]);

        reader.onload = async function () {
            console.log('collectionName:', collectionName);
            await storeImage({ data: String(reader.result), collectionName });
            // @ts-ignore
            inputElement.value = "";
            // @ts-ignore
            inputElement.files = null;
        };
    };

    if (dropArea) {
        dropArea.addEventListener('dragenter', (event) => {
            // @ts-ignore
            dropArea.style.opacity = "50%";
        }, false)

        dropArea.addEventListener('dragleave', (event) => {
            // @ts-ignore
            dropArea.style.removeProperty("opacity");
        }, false)

        dropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            event.stopPropagation();
        }, false)

        dropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            // @ts-ignore
            if (inputElement && inputElement.files) {
                // @ts-ignore
                inputElement.files = event.dataTransfer.files;
            }

            onChangeUploadingImage();
            // @ts-ignore
            dropArea.style.removeProperty("opacity");
        }, false)
    }
        

    return (
        <div className='component-image-input-upload' id={dropAreaId}>
            <input type='file' id={inputId} onChange={onChangeUploadingImage} />
        </div>
    );
}

export default ImageInputUpload;
