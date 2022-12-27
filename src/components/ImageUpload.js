import React, { useState} from "react";

const ImageUpload = ( props ) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const onSave = ( event ) => {
        event.preventDefault();
        props.onUpload( selectedImage );
    };

    const onFileSelected = ( event ) => {
        setSelectedImage( event.target.files[0] );
    };

    return(
        <section className="container bg-light rounded d-flex">
            <div className="col text-center">
                <h5>Current Image</h5>
                <img className="rounded mx-auto img-fluid mb-5" src={ `data:image/jpeg;base64,${ props.currentImage }` } width='250'    alt="profile picture"/>
            </div>
            <div className="col text-center ">
                <h5>New Image</h5>
                {selectedImage && (
                    <div>
                        <img className="rounded mx-auto" alt="image not found" width="250px" src={ URL.createObjectURL(selectedImage) } />
                    </div>
                )}
                <div>
                    <input className="form-control m-2" type="file" name="profileImage" maxLength="1024" onChange={ onFileSelected }/>
                    <hr/>
                    <button className="btn btn-warning" onClick={ onSave }>Save</button>
                </div>
            </div>
        </section>
    );
};

ImageUpload.defaultProps = {
    currentImage: {},
    onUpload: () => {},
}

export default ImageUpload;