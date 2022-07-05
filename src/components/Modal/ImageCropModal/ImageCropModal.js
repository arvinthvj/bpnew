import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import './ImageCropModal.css'
import { decode } from 'base64-arraybuffer';
import $ from 'jquery'

const ImageCropModal = (props) => {
    const [file, setFile] = useState("");

    const [image, setImage] = useState("");
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const margin = {marginBottom:"auto"};

    useEffect(() => {
        if (props.imageCropParams && props.imageCropParams.imageToCrop) {
            setFile(URL.createObjectURL(props.imageCropParams.imageToCrop))
            window.$('#cropImage').modal()
        }
        return () => {
            setFile('')
            setCrop({ aspect: 1 / 1 })
            setImage('')
        }
    }, [props.imageCropParams])

    const getCroppedImg = (image, crop) => {
        if(!image) {
            return null
         }
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        const base64Image = canvas.toDataURL("image/jpeg");
        $('#preview1').attr('src', base64Image);
        let originalImage = base64Image.split(',');
        if (props.imageCropParams.isWordpress) {
            fetch(base64Image)
                .then(res => res.blob())
                .then(blob => {
                    const timeStamp = new Date().getTime()
                    const newFile = new File([blob], props.imageCropParams && props.imageCropParams.imageToCrop ? props.imageCropParams.imageToCrop.name : `localhost_${timeStamp}`, { type: props.imageCropParams && props.imageCropParams.imageToCrop ? props.imageCropParams.imageToCrop.type : "image/png" })
                    props.uploadImageOnWordpress(newFile)
                })
        } else {
            props.profilePhotoUpload(props.imageCropParams.extension, decode(originalImage[1]))
        }
        props.showImageCropModal(null)
    };
    return (
        <div class="modal fade p-0 ph_custom_modal" style={{ zIndex: '9999', overflowX: 'auto' }} id="cropImage" tabindex="-1" role="dialog" aria-labelledby="cropImage" data-backdrop="static" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-auto" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="modal_close">
                            <a href="javascript:void(0);" class="custom-modal-close" data-dismiss="modal">
                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '16px', width: '16px', display: 'block', fill: 'rgb(118, 118, 118)' }}><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg>
                            </a>
                        </div>
                        <div class="heading_block text-center">
                            <h1 className="text-primary">Crop Image</h1>
                            <p className="text-black" style={margin}>Select the portion of the image that you need to set as your profile picture.</p>
                            <p className="text-black">Click and drag to crop the image</p>
                        </div>
                        <figure class="ph_fig mb-4 text-center">
                            {file && (
                                <>
                                    <ReactCrop
                                        src={file}
                                        onImageLoaded={setImage}
                                        crop={crop}
                                        circularCrop={true}
                                        className="img-fluid"
                                        onChange={setCrop}
                                    />
                                </>
                            )}
                            {/* {base64 && <img class="img-fluid" src={base64} alt="" />} */}
                        </figure>
                        <div class="text-center">
                            <button type="button" data-dismiss="modal" onClick={() => getCroppedImg(image, crop)} class="theme_btn theme_primary m-1">Crop</button>
                            {/* <a href="#" class="theme_btn theme_primary m-1">Crop &amp; Save</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCropModal;
