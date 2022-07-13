
import { useEffect, useState } from 'react'
import { HiPlusSm } from "react-icons/hi"
import { HiDotsHorizontal } from 'react-icons/hi'
import { Upload, Modal, Button, Descriptions } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import { NextRouter, useRouter } from "next/router";


function uploader(props) {

    const [selectedFile, setSelectedFiles] = useState([])
    const [fileList, setFileList] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [msg, setMsg] = useState('')
    const [showPrice, setShowprice] = useState(false)
    const [types, setTypes] = useState(false)
    const router = useRouter();

    const togglePrice = () => {

        if (showPrice == true) {

            setShowprice(false)
        } else {
            setShowprice(true)
        }


    }



    const handleSubmit = async (event) => {

        event.preventDefault();
        let formData = new FormData();
        // add one or more of your files in FormData
        // again, the original file is located at the `originFileObj` key

        //Files Storage Looping
        for (var a = 0; a < fileList.length; a++) {

            formData.append("file", fileList[a]);

        }


        formData.append('description', description)
        formData.append('price', price)
        formData.append('types', types)


        const TOKEN_STORAGE_KEY = 'token';

        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

        const result = await axios.post('/video', formData);

        if (result.status === 201) {
            setMsg('Post uploaded Successfully');
            router.push("/home");
            location.reload()
        }
        else {
            setMsg('fail to upload');
        }
    }



    const handleImageChange = (e) => {


        setFileList(e.target.files)
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );



            setSelectedFiles((prevImages) => prevImages.concat(filesArray));

            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const renderFiles = (source) => {

        return source.map((photo) => {
            return <video
                className="h-[130px] w-[130px] mb-4"
                controls
                src={photo}
            />
                ;
        });
    }




    return (


        <>

            <div className="w-full md:ml-[22%] md:w-[45%] mb-10 mt-20 border-2">
                <div className="w-full mb-2 mt-2 mx-1 flex  justify-center">
                    <textarea
                        className="w-full placeholder-gray4  p-2 ml-0"
                        placeholder="Your's on your mind"
                        onChange={(e) => setDescription(e.target.value)
                        }
                        value={description}
                    ></textarea>

                </div>
                <hr className="my-2" />
                <div className="flex md:relative justify-between ">
                    <div className="flex items-center space-x-6 ml-4">
                        <div >
                            <label htmlFor="file">
                                <div className="border-dotted h-20 w-20  justify-center border-2">
                                    <h2 className="ml-2 mt-4">Add File</h2>
                                    <HiPlusSm className="text-2xl ml-6 " />
                                </div>
                                <input type="file" className="hidden" multiple id="file" onChange={handleImageChange} />
                            </label>
                            <div className="mt-4">
                                <div className="border-t-2 border-b-2 space-x-2 ml-[-12px] border-[#aca7a7] w-[310px] grid grid-cols-3">

                                    {renderFiles(selectedFile)}

                                </div>


                                {/* feed action */}

                                <div className="text-primary inline-flex items-center mt-4 ">
                                    <HiDotsHorizontal className="mr-1 text-xl" onClick={togglePrice} />


                                    {
                                        // showPrice
                                        //     ?

                                        <>
                                            {
                                                props.userdata.career === "Producer" ?
                                                    <>
                                                        <select className="h-10 w-[5em]" onChange={(e) => setTypes(e.target.value)
                                                        }>
                                                            <option value="Select ">select type</option>
                                                            <option value="Instrumental">Instrumental</option>
                                                            <option value="Record">Record</option>
                                                        </select>

                                                    </>
                                                    :

                                                    <>
                                                        <select className="h-10 w-[5em]" onChange={(e) => setTypes(e.target.value)
                                                        }>
                                                            <option value="Select ">select type</option>
                                                            <option value="Track">Track</option>
                                                            <option value="Album">Album</option>
                                                        </select>
                                                    </>
                                            }


                                            <input type="text" className="pricing-input w-40 h-10 ml-10 text-center text-lg text-bold " onChange={(e) => setPrice(e.target.value)
                                            } placeholder="fix your price" />
                                        </>
                                        // :
                                        // <>
                                        //     <span> Price : {price} </span>
                                        // </>
                                    }

                                    {
                                        msg ?
                                            <>
                                                <div className="text-green-700 ml-4"> {msg}</div>
                                            </>
                                            :
                                            <>

                                            </>
                                    }



                                    <Button className="bg-[#f04c30] text-white rounded-lg right-7 absolute mt-40" onClick={handleSubmit} // this button click will trigger the manual upload
                                    >
                                        Add to Feed
</Button>
                                </div>







                                {/* feed action  */}
                            </div>


                        </div>



                    </div>
                </div>

                <hr className="my-2" />

            </div>

        </>
    )
}

export default uploader
