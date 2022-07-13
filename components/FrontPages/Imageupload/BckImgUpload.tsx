import { useState, useEffect } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import ProfilepixUpload from "./ProfilepixUpload"
import axios from 'axios'

function BckImageUpload(props: any) {
    console.log("this kind", props.userdata)
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


                        <label htmlFor="file">
                            {
                                props.userdata.bgpix ?
                                    <img src={`https://nurbansports.com/pimus/public/profilepix/${props.userdata.bgpix}`} className="bg-red-900 h-[180px] mt-[55px] z-20 w-full" />
                                    :
                                    <>
                                        <img src={imgData} className="bg-red-900 h-[180px] mt-[55px] z-20 w-full" />
                                        <AiOutlineCamera className="text-2xl top-40 absolute left-40 text-white" />
                                        <input type="file" className="hidden" onChange={placePic} id="file" />
                                    </>
                            }

                        </label>
                        <button className="border-2 text-[#f04c30] h-8 top-[180px] rounded-lg absolute right-8 hover:bg-red-700 " onClick={saveBg}>Set As Backgound</button>
                        <ProfilepixUpload userpix={props.userdata.propix} userinfo={props.userdata} />


                    </>

                    :
                    <>
                        {
                            props.userdata.bgpix ?
                                <>
                                    <label htmlFor="file">
                                        <img src={`https://nurbansports.com/pimus/public/bgpix/${props.userdata.bgpix}`} className="bg-red-900 h-[180px] mt-[55px] z-20 w-full" />
                                        <input type="file" className="hidden" onChange={placePic} id="file" />

                                    </label>
                                    <button className="border-2 text-[#f04c30] h-8 top-[180px] rounded-lg absolute right-8 hover:bg-red-700 " onClick={saveBg}>Set As Backgound</button>
                                    <ProfilepixUpload userpix={props.userdata.propix} userinfo={props.userdata} />

                                </>
                                :
                                <div className="bg-red-900 h-[180px] mt-[55px] z-20" style={styling}>
                                    <label htmlFor="file">
                                        <AiOutlineCamera className="text-2xl top-40 absolute left-40 text-white" />
                                        <input type="file" className="hidden" onChange={placePic} id="file" />
                                    </label>

                                    <ProfilepixUpload userpix={props.userdata.propix} userinfo={props.userdata} />
                                </div>
                        }

                    </>
            }
        </div>
    )
}

export default BckImageUpload