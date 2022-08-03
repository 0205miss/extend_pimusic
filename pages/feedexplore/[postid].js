import React from 'react'
import { RiArrowLeftCircleLine } from 'react-icons/ri'
import { RiArrowRightCircleLine } from 'react-icons/ri'
import { GiSelfLove } from "react-icons/gi"
import { useEffect, useState } from "react";
import axios from 'axios'
import Cookies from 'js-cookie';
import { formattedDate, dynamicPage } from '../../components/FrontPages/Imageupload/Util'

import Like  from '@/components/Like'

import { AiOutlineMessage } from 'react-icons/ai'
import { MdFavoriteBorder } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";
import { connect } from "react-redux";



import { AiFillCar } from 'react-icons/ai'
import { AiOutlineSafety } from 'react-icons/ai'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FaLocationArrow } from 'react-icons/fa'
import { RiUserLocationFill } from 'react-icons/ri'

import { useRouter } from 'next/router';

import { IPost } from '../../setups';
import io from "socket.io-client";




const PostDetail = (props) => {
     

    const [postData, setPostData] = useState('');
    const [commentData, setcommentData] = useState('');
    const [likes, setLikes] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [textComment, settextComment] = useState('');
    const [textmsg, setTextmsg] = useState('');
    const [comment, setComment] = useState(true);

    const socket = io.connect("http://localhost:5000");
    

    const StartComment = (e) => {
        const { id } = e.target
        if (comment === false) {
            setComment(true)
        } else {
            setComment(false)
        }

    }
    

   

    useEffect(() => {
        getPostDetails(props.postid);
    }, []);

    const getPostDetails = async (id) => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/video/' + id)
        setPostData(res.data.data[0])
        console.log(res.data.data[0])
        setLikes(res.data.data[0].like_count)
        setcommentData(res.data)
    }

     console.log(" url param",props.isAuthenticated.id)

     const submitComment = () => {
          
    
            const commentText  = textComment
             const userid  = props.isAuthenticated.id
             const postid = props.postid
    
         
        socket.emit("feedcomment", { commentText, userid, postid}, (error) => {
            if (error) alert(error);
          });
     }

    
    const handleLikeClick = (action) => {
        const newLike = action === 'liked' ? likes + 1 : likes - 1;
        setIsLiked(action === 'liked');
        setLikes(newLike);
      };

      const handleComment = (e) => {
        settextComment(e.currentTarget.value)
    }
     

    return (

        <div className="bg-white">


            <div className="mx-4 mt-4">
                <div className="shadow-md rounded-lg " style={{
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    outline: 'none',
                }}>
                    <div className="flex space-x-4">
                        <img src={`https://nurbansports.com/pimus/public/profilepix/${postData.propix}`}
                            width={10}
                            height={10}
                            className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] userimg" />
                        <div className="mt-6 flex">
                            <div className="">
                                <h2 className="text-#4a4a58">
                                    
                                   {postData.f_name}
                                    
                                    </h2>
                                <p className="text-sm text-[#f04c30]"> {postData.username}</p>
                            </div>
                            <div className="flex space-x-2 right-4 absolute"> <p className="text-sm">...</p> </div>

                        </div>
                    </div>
                    <p className="text-sm text-[#4a4a58]">
                                                {

                                                 postData.description  
                                               }
                                            </p>
                                           


                    <div className="">
                    <video controls
                                                    src={"https://nurbansports.com/pimus/public/timelinepix/" + postData.img} className="h-[200px] w-full" />
                    </div>


                    <div className="flex space-x-4 mb-4 ml-2 mt-2">
                        <AiOutlineMessage

                            className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]" onClick={StartComment}

                        />
                       
                        <Like
                        type="post"
                        modelId={postData.id}
                        count={likes}
                        isLiked={isLiked}
                        handleSuccess={handleLikeClick }
                            
                        />
                        <BsBookmarkCheck className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]"

                        />
                        <div className="flex absolute right-8 space-x-2">
                            <span> {postData.price}</span>
                            <button className=" rounded-lg border-2 bg-[#f04c30] text-white"><span className="mx-2 my-2">Pay with Pi</span></button>
                        </div>
                    </div>



                

            
                </div>
                <hr className=" mt-4 w-full border-2" />
               
                {/* comment area */}

                {
                    comment ? 
                    <>
                    <div className="mt-4 w-full mb-8" >

<textarea
    value={textComment}
    onChange={(e) => handleComment(e)}
    placeholder="Comment Here" className="w-full placeholder-gray4 p-2 border-[1px]  border-yellow-500 rounded-md " >

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
    <button className=" rounded-lg border-2 bg-[#f04c30] text-white"><span className="mx-2 my-2" onClick={submitComment}>Reply</span></button>

</div>
</div>

                    </>
                    :
                    <>
                    </>
                }
            </div>


            

            <div className="h-10 mt-10">
                    <h3>
                       
                    </h3>
            </div>


        </div>
    )

}







const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});
export default connect(mapStateToProps)(PostDetail);


export async function getServerSideProps({ params, req, res }) {
    const { postid } = params;
    return {
        props: { postid },
    };
}