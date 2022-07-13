


import React from 'react'
import { useState, useEffect } from 'react'
import { FiEdit } from "react-icons/fi"
import axios from 'axios'
import { connect } from "react-redux";
import { userInfo } from 'os';
import { AiFillInstagram } from 'react-icons/ai';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoTiktok } from 'react-icons/io5';
import { BiRepost } from 'react-icons/bi';
import { MdAudiotrack } from 'react-icons/md';
import { RiPlayListFill } from 'react-icons/ri';
import { RiAlbumFill } from 'react-icons/ri'

function ProfilepixUpload(props: any) {


    console.log("nicely-", props)
    const [img, setImg] = useState(null);
    const [pic, setPic] = useState(null);

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


    return (
        <div className="flex mb-20">
            <div className="absolute top-[195px] left-[8px] ">

                <label htmlFor="jerk"   >
                    {
                        props.userpix ?
                            <>
                                {
                                    pic ?
                                        <img src={img}
                                            width={10}
                                            height={10}
                                            className=" rounded-full md:w-[3.2rem] md:h-[3.2rem] h-[4.5rem] w-[4.5rem] userimg " />
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
                                <img src={img}
                                    width={10}
                                    height={10}
                                    className=" rounded-full md:w-[3.2rem] md:h-[3.2rem] h-[4.5rem] w-[4.5rem] userimg " />
                            </>
                    }

                    <div className="mt-[-30px] ml-10">

                        <FiEdit className="text-2xl text-[#f04c30] " />
                        <input type="file" id="jerk" className="hidden" onChange={changePic} />

                    </div>
                </label>
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

                        props.userinfo.career === "Producer" ?
                            <>

                            </>

                            :
                            <>
                                <div className="text-sm flex space-x-4 ml-10">
                                    <p>3 Tracks publish</p>
                                    <p> 1 Particpition</p>
                                </div>
                                <div className="text-sm flex space-x-4 ml-6 mt-2 ">
                                    <AiFillInstagram className="text-xl" />
                                    <IoLogoTwitter className="text-xl" />
                                    <IoLogoTiktok className="text-xl" />
                                </div>


                                <div className="ml-4 mt-2 ">
                                    <p className="">
                                        {props.userinfo.name} is from {props.userinfo.country}
                                    </p>
                                </div>

                            </>
                    }
                </div>

                <div className="flex space-x-2 mt-4">
                    {
                        props.userinfo.career === "Producer" ?
                            <>
                                <div className="border-[1px] shadow-lg flex space-x-2 w-40">
                                    <BiRepost className="text-xl" />
                                    <p>Instrumental</p>
                                </div>
                                <div className="profile-link ml-10">
                                    <MdAudiotrack className="text-xl" />
                                    <p>Record</p>
                                </div>
                                <div className="profile-link ml-20">
                                    <RiPlayListFill className="text-xl" />
                                    <p>Sounds</p>
                                </div>
                            </>
                            :
                            <>
                                <div className="profile-link">
                                    <BiRepost className="text-xl" />
                                    <p>Repost</p>
                                </div>
                                <div className="profile-link">
                                    <MdAudiotrack className="text-xl" />
                                    <p>Tracks</p>
                                </div>
                                <div className="profile-link">
                                    <RiPlayListFill className="text-xl" />
                                    <p>Playlist</p>
                                </div>
                                <div className="profile-link">
                                    <RiAlbumFill className="text-xl" />
                                    <p>Albums</p>
                                </div>

                            </>
                    }


                </div>
            </div>
            {
                pic && pic.length ?
                    <>
                        <button className=" text-[#f04c30] h-8 border-2 top-[250px] rounded-lg absolute right-8 hover:bg-red-700 " onClick={saveprofileImage}>Save as profile</button>
                    </>
                    :

                    <>
                    </>
            }


        </div>
    )
}


const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps)(ProfilepixUpload);



