import { useState, useEffect } from 'react'
import React from 'react'
import { useKeenSlider } from "keen-slider/react"
// import Renderinfo from './Renderinfo'
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Router, useRouter } from 'next/router'

import axios from 'axios'
import { AiOutlineMessage } from 'react-icons/ai'
import { MdFavoriteBorder } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";
import { SiSamsungpay } from "react-icons/si";

import Link from "next/link";

import Like from '@/components/Like2'

import { formattedDate, commentPost, likePost, bookaPost } from '@/components/FrontPages/Imageupload/Util'
import Cookies from 'js-cookie';
import { Descriptions } from 'antd'
// import { appendFile } from 'fs/promises'
import { connect } from "react-redux";
import closestIndexTo from 'date-fns/fp/closestIndexTo/index'




function bookmark(props) {
    const router = useRouter()
    const [feed, setFeed] = useState([]);
    const [comment, setComment] = useState(false);
    const [postId, setPostId] = useState('');
    const [textComment, settextComment] = useState('');
    const [textmsg, setTextmsg] = useState('');
    const userID = props.isAuthenticated.id


    useEffect(() => {
        fetchMyFeed()
    }, [])

    const fetchMyFeed = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/bookmark-list');
        setFeed(res.data.data.data)
    }
    const StartComment = (e) => {
        const { id } = e.target
        if (comment === true) {
            setComment(false)
        } else {
            setComment(true)
        }

    }
    const likeComment = (Para) => {
        likePost(Para, 'post')
    }

    const bookPost = (paraval) => {
        bookaPost(paraval, 'favourite')
    }

    const submitComment = async (param) => {
        const post_id = param
        const comment = textComment
        const user_id = userID

        const data = { post_id, comment, user_id }

        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.post('/comment', data);
        if (res.status === 201) {
            setTextmsg("Replied successfully")

        } else {
            setTextmsg("Failed tp reply")
        }
    }


    const handleComment = (e) => {
        settextComment(e.currentTarget.value)
    }

    return (
        <>
            <div className="mt-20 mx-4">



                {/* user info */}

                {
                    feed.length > 0 &&
                    feed.map((feedData, index) =>

                        <>

                            <div className=" shadow-lg border-[1px] md:w-[48%] md:ml-[22%] "
                                style={{
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                    outline: 'none',
                                }}
                            >
                                <div className="flex space-y-6">
                                    {
                                        feedData.propix == null ?
                                            <>
                                                <Link href={'/' + feedData.userid}>
                                                    <div className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] userimg bg-yellow-600">
                                                        <div className=" flex text-center mt-2 ml-2" >
                                                            <p>{feedData.username.substring(0, 3)}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                            :
                                            <>
                                                <Link href={'/' + feedData.userid}>
                                                    <img src={`https://nurbansports.com/pimus/public/profilepix/${feedData.propix}`}
                                                        width={10}
                                                        height={10}
                                                        className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] userimg" />

                                                </Link>
                                            </>
                                    }

                                    <div className="mt-6 flex">
                                        <Link href={'/' + feedData.userid}>
                                            <div className="">
                                                <h2 className="text-#4a4a58">{feedData.fname}</h2>
                                                <p className="text-sm text-[#f04c30]">@{feedData.username}</p>
                                            </div>
                                        </Link>
                                        <div className="flex space-x-2 right-4 absolute"> <p className="text-sm"> {formattedDate(feedData.created_at)}</p>  <span>...</span></div>

                                    </div>
                                </div>

                                {/* content  */}
                                <Link href={'/' + feedData.id}>
                                    <div className="">
                                        <div className="">
                                            <p className="text-sm text-[#4a4a58]">
                                                {feedData.description}
                                            </p>
                                            <span className="text-[#f04c30]">More..</span>
                                        </div>

                                        <div className="">

                                            <video controls
                                                src={"https://nurbansports.com/pimus/public/timelinepix/" + feedData.img} className="h-[200px] w-full" />



                                        </div>
                                    </div>
                                </Link>

                                <div className="flex space-x-4 mb-4 ml-2 mt-2">
                                    <AiOutlineMessage
                                        id={index}
                                        className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]" onClick={StartComment} />
                                    <Like
                                        type="post"
                                        modelId={feedData.id}
                                    />
                                    <BsBookmarkCheck className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]"
                                        id={index}
                                        onClick={
                                            () => bookPost(feedData.id)
                                        }
                                    />
                                    <div className="flex absolute right-8 space-x-2">
                                        <span>{feedData.price}</span>
                                        <button className=" rounded-lg border-2 bg-[#f04c30] text-white"><span className="mx-2 my-2">Pay with Pi</span></button>
                                    </div>
                                </div>

                                {
                                    comment ?
                                        <div className="mt-4 w-full mb-8" key={index}>

                                            <textarea
                                                value={textComment}
                                                onChange={(e) => handleComment(e)}
                                                placeholder="Comment Here" className="w-full placeholder-gray4 p-2 " >

                                            </textarea>

                                            <div className="flex absolute right-8 space-x-2 mb-10 mt-1">
                                                {
                                                    textmsg ?
                                                        <>
                                                            <p className="text-green-700"> {textmsg} </p>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }
                                                <button className=" rounded-lg border-2 bg-[#f04c30] text-white"><span className="mx-2 my-2" onClick={
                                                    () => submitComment(feedData.id)

                                                }>Reply</span></button>

                                            </div>
                                        </div>
                                        :
                                        <></>
                                }

                            </div>
                        </>
                    )

                }

                <div className="h-20   "> </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});

export default connect(mapStateToProps)(bookmark);

