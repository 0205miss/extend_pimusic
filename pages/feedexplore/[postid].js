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

import { AiFillCar } from 'react-icons/ai'
import { AiOutlineSafety } from 'react-icons/ai'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FaLocationArrow } from 'react-icons/fa'
import { RiUserLocationFill } from 'react-icons/ri'

import { useRouter } from 'next/router';

import { IPost } from '../../setups';




const PostDetail = (props) => {
     

    const [postData, setPostData] = useState('');
    const [commentData, setcommentData] = useState('');
    const [likes, setLikes] = useState("");
    const [isLiked, setIsLiked] = useState(false);
   

    useEffect(() => {
        getPostDetails(props.postid);
    }, []);

    const getPostDetails = async (id) => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/video/' + id)
        setPostData(res.data)
        setLikes(res.data.like_count)
        setcommentData(res.data.comments)
    }

  

    
    const handleLikeClick = (action) => {
        const newLike = action === 'liked' ? likes + 1 : likes - 1;
        setIsLiked(action === 'liked');
        setLikes(newLike);
      };
    
     

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
                        <img src='/images/user.png'
                            width={10}
                            height={10}
                            className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] userimg" />
                        <div className="mt-6 flex">
                            <div className="">
                                <h2 className="text-#4a4a58">
                                    
                                    {/* name */}
                                    .
                                    
                                    </h2>
                                <p className="text-sm text-[#f04c30]">...</p>
                            </div>
                            <div className="flex space-x-2 right-4 absolute"> <p className="text-sm">...</p> </div>

                        </div>
                    </div>
                    <p className="text-sm text-[#4a4a58]">
                        {postData.description}
                    </p>


                    <div className="">
                    <video controls
                                                    src={"https://nurbansports.com/pimus/public/timelinepix/" + postData.img} className="h-[200px] w-full" />
                    </div>


                    <div className="flex space-x-4 mb-4 ml-2 mt-2">
                        <AiOutlineMessage

                            className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]"

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

                    commentData.length > 0 ?

                    commentData.map((items, index) =>
                    <div className=" shadow-lg rounded mt-4 ">
                        
                        <div className="">
                            <div className="flex space-x-4">
                                <img src='/images/user.png'
                                    width={10}
                                    height={10}
                                    className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] userimg" />
                                <div className="mt-6 flex">
                                    <div className="">
                                        <h2 className="text-#4a4a58">
                                            {items.user.name}
                                            
                                            </h2>
                                        <p className="text-sm text-[#f04c30]">@
                                        
                                        {items.user.username}
                                        
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 right-4 absolute"> <p className="text-sm">2 hours</p>  <span>...</span></div>

                                </div>
                            </div>
                            <div className="flex text-justify ml-20  ">
                                <p className="text-sm text-[#4a4a58]">
                                    {items.comment}
                                </p>
                            </div>
                        </div>

                    </div>
                    )
                        :
                        <>
                            <div className=" shadow-lg rounded mt-4 ">
                                <h3 className="text-sm text-[#4a4a58]"> No Comment yet</h3>
                            </div>
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






export default PostDetail


export async function getServerSideProps({ params, req, res }) {
    const { postid } = params;
    return {
        props: { postid },
    };
}