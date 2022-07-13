import { useState, useEffect } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import Profilepix from "./Profilepix"
import axios from 'axios'

function BckImageP(props: any) {
    
    const [imgData, setImgData] = useState(null);
    const [pictures, setPictures] = useState(null);

    const placePic = (e) => {
        if (e.target.files[0]) {
            setPictures(e.target.files)
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])

        }

    }

    const saveBg = async () => {
        let formData = new FormData()
        const PFile = pictures[0]
        const entity = "bgpix"
        formData.append('image', PFile)
        formData.append('entity', entity)
        const res = await axios.post('/propix', formData);

    }
    const styling = {
        backgroundImage: "url('')",
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }

    return (
        <div>
            <div className="border-2 career text-[#4a4a58] h-8 top-[82px] w-20  text-2lg  bg-white absolute right-8  " >{props.userdata.career}</div>
            {
                pictures && pictures.length ?
                    <>



                        {
                            props.userdata.bgpix ?
                                <img src={`https://nurbansports.com/pimus/public/profilepix/${props.userdata.bgpix}`} className="bg-red-900 h-[180px] mt-[55px] z-20 w-full" />
                                :
                                <>
                                    <img src={imgData} className="bg-red-900 h-[180px] mt-[55px] z-20 w-full" />

                                </>
                        }


                        {/* <button className="border-2 text-[#f04c30] h-8 top-[180px] rounded-lg absolute right-8 hover:bg-red-700 " onClick={saveBg}>Set As Backgound</button> */}
                        <Profilepix  chat={props.togglechat} userpix={props.userdata.propix} userinfo={props.userdata} feedsV={props.videofeeds} />


                    </>

                    :
                    <>
                        {
                            props.userdata.bgpix ?
                                <>

                                    <img src={`https://nurbansports.com/pimus/public/bgpix/${props.userdata.bgpix}`} className="bg-red-900 h-[180px] mt-[55px] z-20 w-full" />


                                    <Profilepix chat={props.togglechat} userpix={props.userdata.propix} userinfo={props.userdata} feedsV={props.videofeeds} />

                                </>
                                :
                                <div className="bg-red-900 h-[180px] mt-[55px] z-20" style={styling}>


                                    <Profilepix chat={props.togglechat} userpix={props.userdata.propix} userinfo={props.userdata} feedsV={props.videofeeds} />
                                </div>
                        }

                    </>
            }
        </div>
    )
}

export default BckImageP