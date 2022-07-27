
import { useState, useEffect } from 'react'
import React from 'react'
import { useKeenSlider } from "keen-slider/react"
import Renderinfo from './Renderinfo'
import { Router, useRouter } from 'next/router'
import Media from './Imageupload/Media'
import Media2 from './Imageupload/Media2'
import axios from 'axios'
import AddPost from './AddPost'
import { AiOutlineMessage } from 'react-icons/ai'
import { MdFavoriteBorder } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";
import { SiSamsungpay } from "react-icons/si";
import PostForm from './Imageupload/PostForm'
import Link from "next/link";
import Like from "@/components/Like2"
import dynamic from "next/dynamic";

import { formattedDate, commentPost, likePost, bookaPost } from '@/components/FrontPages/Imageupload/Util'
import Cookies from 'js-cookie';
import { Descriptions } from 'antd'
// import { appendFile } from 'fs/promises'
import { connect } from "react-redux";
import closestIndexTo from 'date-fns/fp/closestIndexTo/index'
import { WindowsFilled } from '@ant-design/icons'


function RenderSearch(props) {
    const router = useRouter()
    const [feed, setFeed] = useState([]);
    const [comment, setComment] = useState(false);
    const [postId, setPostId] = useState('');
    const [textComment, settextComment] = useState('');
    const [textmsg, setTextmsg] = useState('');


    const [like, setLike] = useState("");
    const [isLike, setIsLike] = useState(false);
    const userID = props.isAuthenticated.id
    


    useEffect(() => {
        const Pi = window.Pi;
        Pi.init({ version: '2.0', sandbox: true})

    //     const scopes = ['username', 'payment']
    // function onIncompletePaymentFound(payment) {

    // }
    //     if (typeof window !== 'undefined') {

    //         Pi.authenticate(scopes, onIncompletePaymentFound).then
    
    //         Pi.authenticate(scopes, onIncompletePaymentFound)
    //     }
        auth()
        fetchMyFeed()
    }, [])


    const auth = async () => {

        const scopes = ['username', 'payments']
        console.log(scopes)

        function onIncompletePaymentFound(payment) {
            console.log("onincomplete")
            var data = {
                'action': 'incomplete',
                'paymentId': payment,
                'txId': '',
                'app_client': 'auth_app1'
            }
            return axios.post('https://nurbansports.com/pimus/public/pinetworkpay', data)
        }
         console.log("auth user !")
        Pi.authenticate(scopes, onIncompletePaymentFound).then(function (auth) {
            console.log(`Hi there! You're ready to make payments!`);
        }).catch(function (error) {
            console.log(error, "Authentication error msg")
        })


    }

    console.log("feeds:",feed)

    const Transfer = async (valP, identity, career, userID) => {
        console.log(valP, identity, career, userID)

        // var data = {
        //     'action': 'approve',
        //     'paymentId': '0x3093484jex049939',
        //     "txid": 'kieyyr',
        //     'itemid': identity,
        //     'amount': valP,
        //     'career': career,
        //     'app_client': 'auth_app1',
            
        // }

        // return axios.post('https://nurbansports.com/pimus/public/pinetworkpay', data)


        try {
            const Pi = window.Pi;
            const paymentData = { amount: valP, memo: 'Pimusicworld app', metadata: { itemId: identity } };


            // Read more about this callback in the SDK reference:
                console.log("solomone")
            const callBack = {
                onIncompletePaymentFound: (PaymentDTO) => {
                    console.log("your payment", PaymentDTO);

                },
                onReadyForServerApproval: (paymentId) => {
                    console.log("entering here !")

                    var data = {
                        'action': 'approve',
                        'paymentId': paymentId,
                        "txid": '',
                        'amount': valP,
                        'itemid': identity,
                        'userid' : userID,
                        'app_client': 'auth_app1'
                    }
                    return axios.post('https://nurbansports.com/pimus/public/pinetworkpay', data)

                },
                onReadyForServerCompletion: (paymentId, txid) => {
                    var data = {
                        'action': 'complete',
                        'paymentId': paymentId,
                        "txid": txid,
                        "amount": paymentData['amount'],
                        "itemId": paymentData['metadata'],
                        'app_client': 'auth_app1'
                    }
                    return axios.post('https://nurbansports.com/pimus/public/pinetworkpay', data)

                },


                onCancel: (paymentid) => {
                    console.log("cancelling payment!")

                },
                onError: (payment) => {
                    console.log("error in payment!")
                }
            }

            const payment = await Pi.createPayment(paymentData, callBack)

        }
        catch (err) {
            console.log(" full of buggs!")
            console.log(err)
        }
    }


    const fetchMyFeed = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/videos-post');

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
        console.log(Para)
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

            <div className="mt-[-40px] ">

                {/* <Media2 /> */}


                {/* user info */}
                

                {

                    feed.length > 0 &&
                    feed.map((feedData, index) =>

                        <>


                            <div className=" shadow-lg border-[1px] mt-4 md:w-[60%]"
                                style={{
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                    outline: 'none',
                                }}
                            >
                                <div className="flex space-x-4">
                                    {
                                        feedData.propix == null ?
                                            <>
                                                <Link href={'/' + feedData.userid}>
                                                    <div className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] userimg bg-yellow-600">
                                                        <div className=" flex text-center mt-2 ml-2" >

                                                            <p className="capitalize">{feedData.username.substring(0, 3)}</p>
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
                                                <h2 className="text-#4a4a58">{feedData.f_name}({feedData.career})</h2>
                                                <p className="text-sm text-[#f04c30]">@{feedData.username}</p>
                                            </div>
                                        </Link>
                                        <div className="flex space-x-2 right-4 absolute md:relative"> <p className="text-sm"> {formattedDate(feedData.created_at)}</p>  <span>...</span></div>

                                    </div>
                                </div>

                                {/* content  */}
                                <Link href={'feedexplore/' + feedData.id}>
                                    <div className="">
                                        <div className="">
                                            <p className="text-sm text-[#4a4a58]">
                                                {

                                                 feedData.description.length >  100 ? `${feedData.description.substring(0, 90)}...` : feedData.description  
                                               }
                                            </p>
                                            {
                                                feedData.description.length >  10 ?
                                                <>
                                                 <Link href={'/' + feedData.userid}>
                                                <span className="text-[#f04c30]">More..</span>
                                                </Link>
                                               </>
                                                :
                                                <>
                                                </>
                                           }
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

                                    <div className=" hidden w-[45%] md:flex">

                                    </div>
                                    <div className="flex absolute md:static  right-8 space-x-2">
                                        <span>{feedData.price}𝝅</span>
                                        
                                        <button className=" btnactive rounded-lg border-2 bg-[#f04c30] text-white" onClick={() => Transfer(feedData.price, feedData.id, feedData.Pfrom, feedData.user_id)} type="button" data-modal-toggle="popup-modal"><span className="mx-2 my-2 ">Pay with Pi</span></button>

                                       

                                        
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

export default connect(mapStateToProps)(RenderSearch);

