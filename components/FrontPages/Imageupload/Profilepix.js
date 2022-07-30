


import React from 'react'
import { useState, useEffect } from 'react'
import { FiEdit } from "react-icons/fi"
import axios from 'axios'
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import { userInfo } from 'os';
import { AiFillInstagram } from 'react-icons/ai';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoTiktok } from 'react-icons/io5';
import { BiRepost } from 'react-icons/bi';
import { MdAudiotrack } from 'react-icons/md';
import { RiPlayListFill } from 'react-icons/ri';
import { RiAlbumFill } from 'react-icons/ri'
import { AiOutlineMessage } from 'react-icons/ai'
import { MdFavoriteBorder } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";
import {BsChatSquare } from "react-icons/bs"
import Link from "next/link";
import io from "socket.io-client";

import { formattedDate, commentPost, likePost, bookaPost } from '@/components/FrontPages/Imageupload/Util'
import Like from "@/components/Like2"

function Profilepix(props) {
    console.log("ol--lo",props)
    const socket = io.connect("http://localhost:5000/");
    const [img, setImg] = useState(null);
    const [pic, setPic] = useState(null);
    const [videofeeds, setVideoFeeds] = useState(false);
    const [playlist, setPlaylist] = useState(false);
    const [Albam, setAlbam] = useState(false);
    const [audio, setdAudio] = useState(false);
    const [track, setTrack] = useState([])
   
    var room = props.isAuthenticated.username + '/' + props.userinfo.username;
     var Authuser = props.isAuthenticated.username;
     var dimuser = props.userinfo.username;
    const joinRoom = () => {
        if (room !== "") {
            console.log(room)
          socket.emit("join", {room, Authuser,dimuser});
        }
      };


    useEffect(() => {
        fetchTrack()
    }, [])

    const fetchTrack = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/track-count');

        setTrack(res.data.data.data)

    }


    console.log('eeee', track)



    const toggledivContainer = (activediv) => {

        if (activediv === 'videofeed') {
            setVideoFeeds(true)
            setPlaylist(false)
            setAlbam(false)
            setdAudio(false)
        }
        if (activediv === 'playlistfeed') {
            setPlaylist(true)
            setVideoFeeds(false)
            setAlbam(false)
            setdAudio(false)
        }
        if (activediv === 'Albamfeed') {
            setAlbam(true)
            setVideoFeeds(false)
            setPlaylist(false)
            setdAudio(false)
        }
        if (activediv === 'audiofeed') {
            setdAudio(true)
            setAlbam(false)
            setVideoFeeds(false)
            setPlaylist(false)
        }

    }



    const changePic = (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files)
            setPic(e.target.files)
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setImg(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])

        }

    }
    const saveprofileImage = async () => {
        let formData = new FormData()
        const imageFile = pic[0]
        console.log(imageFile)
        formData.append('image', imageFile)
        const res = await axios.post('/propix', formData);
        console.log(res)

    }
    const  chatbox = () => {
        console.log("welcome to chat");
    }


    return (

        <>
            <div className="flex mb-10 h-[355px] md:w-[48%] md:ml-[22%] ">
                <div className="absolute top-[195px] left-[8px] ">


                    {
                        props.userpix ?
                            <>
                                {
                                    pic ?
                                        <div
                                            // width={10}
                                            // height={10}
                                            className=" rounded-full md:w-[3.2rem] md:h-[3.2rem] h-[4.5rem] w-[4.5rem] userimg " >

                                            {
                                                props.userinfo ?
                                                    <>

                                                        <p className=" capitalize" >{props.userinfo.username.substring(0, 3)}</p>
                                                    </>
                                                    :
                                                    <>
                                                    </>

                                            }
                                        </div>
                                        :
                                        <>
                                            <img src={`https://nurbansports.com/pimus/public/profilepix/${props.userpix}`}
                                                width={10}
                                                height={10}
                                                className=" rounded-full md:w-[3.2rem] md:h-[3.2rem] h-[4.5rem] w-[4.5rem] userimg " />
                                        </>

                                }

                            </>
                            :
                            <>
                                <div
                                    // width={10}
                                    // height={10}
                                    className=" rounded-full md:w-[3.2rem] md:h-[3.2rem] h-[4.5rem] w-[4.5rem] userimg  bg-yellow-600 " >
                                    <div className=" flex text-center mt-6 ml-6" >
                                        {
                                            props.userinfo ?
                                                <>

                                                    <p className=" capitalize" >{props.userinfo.username.substring(0, 3)}</p>
                                                </>
                                                :
                                                <>
                                                </>

                                        }
                                    </div>
                                </div>
                            </>
                    }

                    <div className="ml-10">


                    </div>

                    <div className="text-[#4a4a58]">
                        <div>
                            {
                                props.userinfo ?
                                    <>
                                        <p className="text-xl" >{props.userinfo.name}</p>
                                        <p className="text-sm mt-[-5px]" >@{props.userinfo.username}</p>
                                    </>
                                    :
                                    <>

                                    </>

                            }
                        </div>

                        {
                            props.userinfo.career == "Producer" ?
                                <>

                                </>
                                :
                                <div className="text-sm flex space-x-4 ml-10">
                                    <p>3 Tracks publish</p>
                                    <p> 1 Particpition</p>
                                </div>

                        }
                        <div className="text-sm flex space-x-4 ml-6 mt-2 ">
                            <AiFillInstagram className="text-xl" />
                            <IoLogoTwitter className="text-xl" />
                            <IoLogoTiktok className="text-xl" />
                            <div className='flex space-x-2 hoverbtn'onClick={() => {
                                props.chat(),
                                joinRoom()
                                }}>
                            <BsChatSquare className="text-xl hoverbtn" />
                            <h2 className='hoverbtn' >let's chat</h2>
                            </div>
                        </div>

                        <div className="ml-4 mt-2 ">
                            <p className="">
                                {props.userinfo.name} is from {props.userinfo.country}
                            </p>
                        </div>


                    </div>

                    {
                        props.userinfo.career == "Producer" ?
                            <>
                                <div className="flex space-x-4 mt-4 ml-10" >
                                    <div className="w-[120px] border-[1px] shadow-lg flex space-x-4" onClick={() => toggledivContainer('videofeed')} >
                                        <BiRepost className="text-xl" />
                                        <p>Instrumental</p>
                                    </div>
                                    <div className="w-[120px] border-[1px] shadow-lg flex space-x-4" onClick={() => toggledivContainer('audiofeed')} >
                                        <MdAudiotrack className="text-xl" />
                                        <p>Videos</p>
                                    </div>
                                    <div className="w-[120px] border-[1px] shadow-lg flex space-x-4" onClick={() => toggledivContainer('audiofeed')} >
                                        <MdAudiotrack className="text-xl" />
                                        <p>Audio</p>
                                    </div>


                                </div>
                            </>
                            :
                            <>
                                <div className="flex space-x-2 mt-4" >
                                    <div className="profile-links" onClick={() => toggledivContainer('videofeed')} >
                                        <BiRepost className="text-xl" />
                                        <p>Post</p>
                                    </div>
                                    <div className="profile-links" onClick={() => toggledivContainer('audiofeed')} >
                                        <MdAudiotrack className="text-xl" />
                                        <p>Tracks</p>
                                    </div>
                                    <div className="profile-links" onClick={() => toggledivContainer('Albamfeed')} >
                                        <RiAlbumFill className="text-xl" />
                                        <p>Albums</p>
                                    </div>

                                </div>

                            </>
                    }
                </div>

            </div>
            {/* navigation  */}
            <div className="mx-4 my-4 mt-[3px]">
                <div className="">

                    {/* video feeds */}

                    {
                        videofeeds ?
                            <>

                                {

                                    props.feedsV.length > 0 &&
                                    props.feedsV.map((feedData, index) =>

                                        <>

                                            <div className=" shadow-lg border-[1px] mt-4 "
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
                                                        <div className="">
                                                            <h2 className="text-#4a4a58">{feedData.f_name}</h2>
                                                            <p className="text-sm text-[#f04c30]">@{feedData.username}</p>
                                                        </div>
                                                        <div className="flex space-x-2 right-4 absolute"> <p className="text-sm"> {formattedDate(feedData.created_at)}</p>  <span>...</span></div>

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
                                                        className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]"

                                                    />


                                                    <Like
                                                        type="post"
                                                        modelId={feedData.id}
                                                    />

                                                    <BsBookmarkCheck className="text-xl hover:text-[#f04c30] focus:text-[#f04c30]"
                                                        id={index}
                                                    // onClick={
                                                    //     () => bookPost(feedData.id)
                                                    // }
                                                    />
                                                    <div className="flex absolute right-8 space-x-2">
                                                        <span>{feedData.price}</span>
                                                        <button className=" rounded-lg border-2 bg-[#f04c30] text-white"><span className="mx-2 my-2">Pay with Pi</span></button>
                                                    </div>
                                                </div>


                                            </div>

                                        </>
                                    )

                                }
                            </>

                            :
                            <>

                            </>

                    }





                    {/* end videos feeds */}





                </div>

                {
                    audio ?
                        <div className="">
                            <h3>Audio </h3>
                        </div>
                        :
                        <>

                        </>
                }


                {
                    playlist ?
                        <div className="">
                            <h3>Playlist </h3>
                        </div>
                        :
                        <>

                        </>
                }

                {
                    Albam ?
                        <div className="">
                            <h3>Albam</h3>
                        </div>
                        :
                        <>

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

export default connect(mapStateToProps)(Profilepix);



