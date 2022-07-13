import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import Cookies, { get } from 'js-cookie';
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import BckImageP from "@/components/FrontPages/Imageupload/BckImageP"
import ChatBox from "@/components/Layout/Chatbox"
import { ConsoleSqlOutlined } from '@ant-design/icons';

function Index(props) {
    

    const [userinfo, setUseinfo] = useState('');
    const [videoinfo, setVideoinfo] = useState('');
    const [startchat, setStartChat] = useState(false)
    const [ click, setClick ]  = useState(false)

     
        const handleClicking = () => {
            setStartChat(!startchat)
    
        }

    

    

    useEffect(() => {
        getProfileDetails(props.profileid);
    }, []);


    const getProfileDetails = async (id) => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/userpro/' + id)
        const vid = await axios.get('/videopostinfo/' + id)
        setUseinfo(res.data.data[0])
        setVideoinfo(vid.data.data)
    }

    console.log("userinfo ", userinfo)
    console.log("videoinfo ", videoinfo)

    return (
        <div>
            <ChatBox showchat={startchat}  />
            <div className="ml-2 h-[3.5em]  top-0 altnav border-b-2 ">
                <div className="flex space-x-4 mt-4 absolute">
                    <Link href="/home">
                        <BiLeftArrowAlt className="text-black text-2xl" />
                    </Link>
                    <h3 className="text-xl capitalize ">Home</h3>
                </div>
            </div>

            {
                userinfo ?
                    <>

                        <div className="mt-[-110px]">

                            <BckImageP  togglechat={handleClicking} userdata={userinfo} videofeeds={videoinfo} />
                        </div>



                        <div className="">



                        </div>



                        <div className="h-20">

                        </div>
                    </>
                    :
                    <>

                    </>
                    
            }

     
        </div>

    )
}

export default Index

export async function getServerSideProps({ params, req, res }) {
    const { profileid } = params;
    console.log(profileid)
    return {
        props: { profileid },
    };
}