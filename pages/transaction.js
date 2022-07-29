
import { useState, useEffect } from 'react'

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

function transaction(props) {
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
        const res = await axios.get('/purchase');
        console.log("sooolooooooo", res)
        setFeed(res.data.data)
    }
    
    
   



   

    return (
        <>
            <div className="mt-20 mx-4">



                {/* user info */}

                {
                    feed.length > 0 ?

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
                                
                                    <div className="">
                                        <div className="">
                                            <p className="text-sm text-[#4a4a58]">
                                              Purchase Cost:  {feedData.price}𝝅
                                            </p>
                                        </div>

                                        <div className="">

                                            <video controls
                                                src={"https://nurbansports.com/pimus/public/timelinepix/" + feedData.restrictedfile} className="h-[200px] w-full" />



                                        </div>
                                    </div>
                                

                              
                                    <div className="flex  right-8 space-x-2 ml-[15em] mt-2">
    
                                        <button className=" rounded-md h-10 border-2 bg-[#f04c30] text-white"><span className="mx-2 my-2">Download</span></button>
                                    </div>
                                    
                                
                            </div>
                            <div className='h-6'></div>
                        </>
                    )

                    :
                    <>
                    <div className="">
                                <h3>
                                    You have not made any purchase
                        </h3>
                            </div>
                    </>

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

export default connect(mapStateToProps)(transaction);


