import Link from "next/link";
import { logout } from "../store/auth/authActions";
import { connect } from "react-redux";
import { useState, useEffect } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { NextRouter, useRouter } from "next/router";
import BckImageUpload from "@/components/FrontPages/Imageupload/BckImgUpload"
import axios from 'axios'
import Cookies from 'js-cookie';


function preference(props) {
    console.log("props", props)

    const [user, setUser] = useState();

    useEffect(() => {
        fetchuserData()
    }, []);

    const fetchuserData = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/userdata');
        setUser(res.data.data[0])
    }


    return (
        <div>


            {
                user ?
                    <>
                        <div>
                            <button className="bg-[#f04c30] text-white h-8 w-16 top-4 rounded-lg fixed right-8 hover:bg-red-700 ">Save</button>


                            <BckImageUpload userdata={user} />
                        </div>



                        <div className="">


                            <div className="max-h-screen bg-gray-50 flex-col justify-center mt-40 ">


                                <div className="max-w-md w-full mx-auto mt-14 bg-white p-8 ">
                                    <form action="" className="space-y-6">


                                        <div>
                                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Username</label>
                                            <input type="text" name="amount" className="w-full p-2 border border-gray-300 rounded mt-1" value={user.username} />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Full Name</label>
                                            <input type="text" name="amount"
                                                value={user.name}
                                                className="w-full p-2 border border-gray-300 rounded mt-1" />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Stage Name</label>
                                            <input type="text" name="amount" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">About yourself</label>
                                            <input type="text" name="amount" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="text-sm font-bold text-gray-600 block">current Album</label>
                                            <input type="text" name="amount" className="w-full p-2 border border-gray-300 rounded mt-1" />
                                        </div>



                                    </form>
                                </div>

                            </div>

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





export default preference;


