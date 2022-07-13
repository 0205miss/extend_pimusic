import 'cropperjs/dist/cropper.css'
import { CSSProperties, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { MdCancel, MdCloudUpload, MdEdit } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { finished } from 'stream'
import { useUploadFile } from './UseUploadMedia'
import {
    uploadMediaFinishedState,
    uploadMediaProgressState,
    uploadMediaState,
    uploadMediaUrlState,
} from './MediaState'
import Button from './Button'
import UploadMediaButton from './UploadMediaButton'
import UploadMediaProgress from './UploadMediaProgress'

const imageStyle: CSSProperties = {
    maxHeight: '180px',
    width: '40%',
    objectFit: 'cover',
}

const UploadMedia = () => {
    // Global State
    const [uploadMediaFile, setUploadMediaFile] = useRecoilState(uploadMediaState)
    const setUploadMediaProgress = useSetRecoilState(uploadMediaProgressState)
    const setUploadMediaURL = useSetRecoilState(uploadMediaUrlState)
    const [uploadFinished, setUploadFinished] = useRecoilState(
        uploadMediaFinishedState
    )

    const [src, setSrc] = useState('')
    const [show, setShow] = useState(false)
    const [cropper, setCropper] = useState<any>()
    const [cropData, setCropData] = useState('')



    const { uploadFile, data, uploading, errors, source } = useUploadFile({
        folder: 'tweeter/medias',
        onUploadProgress: (e, f) => {
            // 95 instead of 100 because there is a slight delay
            // to go to onUploadProgress to onUploadFinished
            // It's more a UX thing...
            setUploadMediaProgress(Math.floor((e.loaded / e.total) * 95))
        },
        onUploadFinished: (e, f) => {
            setUploadMediaProgress(100)
            setUploadFinished(true)
        },
    })

    // Extract the url to have a base64 image to preview
    const extractUrl = (file: any) =>
        new Promise((resolve) => {
            let src
            const reader = new FileReader()
            reader.onload = (e: any) => {
                src = e.target.result
                resolve(src)
            }
            reader.readAsDataURL(file)
        })

    // get the result from the crop
    const getCropData = () => {
        if (typeof cropper !== 'undefined') {
            setCropData(cropper.getCroppedCanvas().toDataURL())
        }
    }



    // I extract the preview image when a file is selected
    // The uploadeMediaFile is triggered by the the TweetForm input file component
    useEffect(() => {
        const extractPreview = async () => {
            const src: any = await extractUrl(uploadMediaFile)
            setSrc(src)
        }
        if (uploadMediaFile) {
            extractPreview()
        } else {
            setSrc('')
            setCropData('')
            setShow(false)
        }
    }, [uploadMediaFile])

    const cancel = () => {
        setCropData('')
        setSrc('')
        setUploadMediaFile(null)
        setUploadMediaProgress(0)
        setUploadFinished(false)
        if (!finished) {
            source?.cancel('Upload canceled')
        }
    }

    console.log("src file", src)


    return (


        <div className="my-2">
            {src.length ? (

                <div>
                    {!show ? (
                        <div className="flex">
                            <div className="relative w-full h-auto mx-2">

                                <audio className="g-hidden" id="audio-kxhzxrev"
                                    style={imageStyle}
                                >
                                    <source type="audio/mpeg" src={src} />

                                </audio>
                                <img
                                    style={imageStyle}
                                    className="rounded-lg"
                                    src={src}
                                    onClick={() => setShow(true)}
                                />
                                <UploadMediaProgress />
                                {/* Cancel Button */}

                                {/* Edit and Upload Button */}
                                {!uploadFinished && !uploading && (

                                    <div>
                                        <MdCancel className="text-red-500 text-2xl absolute top-[0.2rem] right-[11rem] flex flex-col " />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}
                    {show && (
                        <div className="flex items-center">
                            <Button
                                variant="primary"
                                className="mt-2 mr-2"
                                text="Apply"
                                onClick={() => {
                                    getCropData()
                                    setShow(false)
                                }}
                            />
                            <Button
                                variant="default"
                                className="mt-2"
                                text="Cancel"
                                onClick={() => {
                                    setShow(false)
                                    setCropData('')
                                }}
                            />
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default UploadMedia
