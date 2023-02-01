import React, { useState, useContext } from 'react'
import "./upload.scss"
import FormContext from '../../../../context/formContext'

const Upload = () => {

    const {
        selectedImagesForm, setSelectedImagesForm
    } = useContext(FormContext);

    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFiles = (event) => {
        const selectedFiles = event.target.files
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
        setSelectedImagesForm((previousImagesForm) => previousImagesForm.concat(selectedFilesArray));
    };

    return (
        <div className='upload-container'>
            <label className='upload-label'>
                + Agregar Imagenes
                <br />
                <span className='upload-label-span'>
                    hasta 10 imagenes.
                </span>
                <input type='file' className='upload-input' id='images' name='images' onChange={onSelectFiles}
                    multiple accept='image/png , image/jpeg, image/webp' />
            </label>
            <hr />
            {selectedImages.length > 0 &&
                (selectedImages.length > 10 ? (
                    <p className='upload-error'>No se permiten más de 10 imagenes.
                        <br />
                        <span> Por favor elimina
                            <b> {selectedImages.length - 10}</b> de ellas.
                        </span>
                    </p>
                ) : null)}
            <div className='upload-images'>
                {selectedImages && selectedImages.map((image, index) => {
                    return (
                        <div className='upload-image' key={image}>
                            <img className='image' src={image} alt='house-img' />
                            <button className='image-btn'
                                onClick={() =>
                                    setSelectedImages(selectedImages.filter((e) => e !== image))
                                }>
                                Borrar</button>
                            <p className='image-index'>{index + 1}</p>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Upload