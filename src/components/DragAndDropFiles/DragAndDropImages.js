import React, { useCallback } from 'react';
import { resetMultipleOrientation, toastMsg } from '../../utility/utility';
import imageCompression from 'browser-image-compression';
import { useDropzone } from 'react-dropzone';

const MyDropzone = (props) => {
    console.log(props.noOfRequiredImages, "dragDropImgReq")
    const onDrop = useCallback(acceptedFiles => {
        if (props.isDetails || props.isOffers) {
            props.setIsImageUploading(true)
        }
        let files = acceptedFiles;
        let imageName = [], fileType = [], AllFileTypes = [], base64 = [];
        if ((props.isDetails || props.isOffers) && props.noOfRequiredImages <= 0) {
            toastMsg(`You have already uploaded 4 images`, true);
        } else if ((props.isDetails || props.isOffers) && files.length > props.noOfRequiredImages) {
            toastMsg(`You can only upload upto ${props.noOfRequiredImages} images`, true);
            props.setIsImageUploading(false)
        }
        else {
            async function readFile(index) {
                if (index < files.length) {
                    let reader = new FileReader();
                    let file = files[index];
                    imageName.push(file.name)
                    fileType.push(file.type)
                    AllFileTypes.push(file.type)
                    if (["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {

                        const orientation = await imageCompression.getExifOrientation(file);
                        reader.onload = (e) => {
                            var image = new Image();
                            image.src = reader.result;
                            image.onload = function () {
                                resetMultipleOrientation(e.target.result, orientation, props.updateBase64, base64, index, files.length, props);
                                if (index === files.length - 1) {
                                    props.updateImageState(imageName, fileType, AllFileTypes)
                                }
                                readFile(index + 1);
                            };
                        }
                        reader.readAsDataURL(file)
                    }
                    else {
                        toastMsg("Please upload a valid image files only!", true);
                    }
                }
            }
            readFile(0);
            // Do something with the files
        }
    }, [props.noOfRequiredImages])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} id="upload_banner_img_input" />
            {
                // isDragActive ?
                //     <p>Drop the files here ...</p> :
                props.UIComponent
            }
        </div>
    )
}

export default MyDropzone;