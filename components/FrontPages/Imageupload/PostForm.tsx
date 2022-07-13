import { ApolloError, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { MdImage, MdPublic } from 'react-icons/md'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ValidationError } from 'yup'
import { BiPhotoAlbum } from 'react-icons/bi'
import axios from "axios";
import { request } from "http";
import Cookies from 'js-cookie';

import { ADD_TWEET } from './muta'
import {
    uploadMediaFinishedState,
    uploadMediaProgressState,
    uploadMediaState,
    uploadMediaUrlState,
} from './MediaState'
import { tweetsState } from './TweetState'
import { userState } from './UserState'
import {
    extractMetadata,
    shortenURLS,
    validateFiles,
} from './Util'
import { addTweetSchema } from './Schema'
import Alert from './Alert'
import Avatar from './Avatar'
import Button from './Button'
import Errors from './Error'
import UploadMedia from './uploadMedia'
import { HiDotsHorizontal } from 'react-icons/hi'

type TweetFormProps = {
    tweet_id?: number
    type?: TweetTypeEnum
    onSuccess?: Function
}



export enum TweetTypeEnum {
    TWEET = 'tweet',
    COMMENT = 'comment',
}






const PostForm = ({ tweet_id, type, onSuccess }: TweetFormProps) => {
    // Global state
    const user = useRecoilValue(userState)
    const setTweets = useSetRecoilState(tweetsState)
    const [uploadMedia, setUploadMedia] = useRecoilState(uploadMediaState)
    const [uploadMediaUrl, setUploadMediaURL] = useRecoilState(
        uploadMediaUrlState
    )
    const [uploadMediaFinished, setUploadMediaFinished] = useRecoilState(
        uploadMediaFinishedState
    )
    const setUploadMediaProgress = useSetRecoilState(uploadMediaProgressState)

    // Local state
    // const location = useLocation()
    const { id: tweetParamsId }: any = useParams()
    const [body, setBody] = useState('')
    // const [addTweetMutation, { data }] = useMutation(ADD_TWEET)
    // I create a local state for loading instead of using the apollo loading
    // It's because of the urlShortener function.
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<ValidationError | null>(null)
    const [serverErrors, setServerErrors] = useState<any[]>([])
    const [mediaError, setMediaError] = useState<string | null>(null)
    const [selectedFiles, setSelectdFile] = useState([])






    // imported from dropzone  




    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: 'auto'
    };


    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({

        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });


    const addToFeed = (files) => {

        const formData = new FormData()
        formData.append('image', files)
        const TOKEN_STORAGE_KEY = 'token';
        axios.get("/sanctum/csrf-cookie");
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        console.log(token)
        const res = axios.post("/addpost");
        console.log(res)


    }


    const thumbs = files.map(file => (
        <div className="thumb w-[9rem] h-[6rem]" key={file.name}>
            { console.log(file)}
            <div className='thumbInner'>
                {

                    file.type === 'audio/mpeg' || file.type === 'audio/mp4'
                        ?
                        <audio controls >
                            <source src={file.preview} type="audio/mpeg" />
                            <source src={file.preview} type="audio/ogg" />
                        </audio>

                        :

                        (

                            file.type === 'video/mp4' || file.type === 'video/mp4'
                                ?
                                <video controls >
                                    <source src={file.preview} type="video/mp4" />
                                    <source src={file.preview} type="video/ogg" />
                                </video>

                                :
                                <img
                                    src={file.preview}
                                    style={img}
                                />
                        )
                }

            </div>
        </div>
    ));


    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    ///end dropzone

    const onMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setMediaError(null)
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            try {
                console.log('file', file)
                validateFiles(file, 5)
                setUploadMedia(file)
            } catch (e) {
                setMediaError(e.message)
                console.log('error with media file', e.message)
            }
        }
    }



    const commentHeader = () => {
        return (
            <>
                <span>In response to </span>
                <Link to="/" className="text-primary hover:text-primary_hover">
                    @{user!.username}
                </Link>
            </>
        )
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`mb-4 p-4 w-full rounded-lg shadow bg-white ${type === TweetTypeEnum.COMMENT ? 'border border-primary' : ''
                }`}
        >
            {/* Errors from the server */}
            <Errors errors={serverErrors} />

            <h3 className={type === TweetTypeEnum.COMMENT ? 'text-sm' : ''}>
                {type === TweetTypeEnum.COMMENT ? commentHeader() : 'Post your content'}
            </h3>
            <hr className="my-2" />
            <div className="flex w-full">

                <div className="w-full">
                    <div className="w-full mb-2">
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full placeholder-gray4 p-2 "
                            placeholder="Your's on your mind"
                        ></textarea>
                        {errors && errors.path === 'body' && (
                            <span className="text-red-500 text-sm break-all">
                                {errors.message}
                            </span>
                        )}
                    </div>

                    <div>

                        <div className='thumbsContainer grid grid-rows-3 grid-flow-row gap-2'>
                            {thumbs}
                        </div>

                    </div>

                    {/* <UploadMedia />
                    {mediaError?.length && (
                        <span className="text-red-500 text-sm break-all">{mediaError}</span>
                    )} */}

                    {/* Actions */}
                    <hr className="my-2" />
                    <div className="flex justify-between ">
                        <div className="flex items-center space-x-6 ml-4">
                            <label className="" htmlFor="file">
                                <BiPhotoAlbum
                                    className={`text-2xl text-primary mr-1 ${uploadMedia
                                        ? 'cursor-default text-gray5'
                                        : 'cursor-pointer hover:text-primary_hover'
                                        }`}
                                />


                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} id='file' />

                                </div>

                            </label>
                            <div className="text-primary inline-flex items-center">
                                <HiDotsHorizontal className="mr-1 text-xl" />
                            </div>
                            <button className="bg-[#f04c30] text-white  h-6 w-16 mb-2 rounded-lg absolute right-8" onClick={addToFeed}>Post</button>

                        </div>
                        <Button
                            text={type === TweetTypeEnum.COMMENT ? 'Comment' : 'Tweet'}
                            variant="primary"
                            // className="disabled:opacity-30"
                            onClick={(e) => {
                                e.stopPropagation()

                            }}
                            disabled={
                                loading || (uploadMedia !== null && !uploadMediaFinished)
                            }
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PostForm
