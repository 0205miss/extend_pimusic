
import { useEffect, useState } from 'react'
import { HiPlusSm } from "react-icons/hi"
import { HiDotsHorizontal } from 'react-icons/hi'
import { Upload, Modal, Button, Descriptions } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import { NextRouter, useRouter } from "next/router";
import { type } from 'os';
import { SmallSpinnerV } from '@/components/Spinner/Spinnerupload';
import { Link } from 'react-router-dom';


function uploader(props) {

    const [selectedFile, setSelectedFiles] = useState([])
    const [selectedFile2, setSelectedFiles2] = useState([])
    const [fieldValue,setFieldValue]    = useState([])
    const [uploadError, setUplaodError] = useState('')
    const [fileList, setFileList] = useState([])
    const [filePreview, setFilePreview] = useState('')
    const [videoPreview, setVideoPreview] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [msg, setMsg] = useState('')
    const [loadingVal, setloadingVal] = useState(true)
    const [uploadmsg, setUploadMsg] = useState('')
    const [successmsg, setsuccessMsg] = useState('')
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

    const CloseErrormsg = () => {
        setUplaodError('')
    }

   const ClearErrormsg = () => {
            setMsg('')
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

        for (var a = 0; a < fieldValue.length; a++) {

            formData.append("main", fieldValue[a]);
        }
           

        formData.append('description', description)
        formData.append('price', price)
        formData.append('types', types)
       

      if(description === "" || price === "" || types === "Select" || fieldValue.length === 0 || fileList.length === 0 ) {
        setMsg('Fileds are empty, please get all fields filled ');
      }else{
        const TOKEN_STORAGE_KEY = 'token';

        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        setUploadMsg('Uploading ..')
        
        const result = await axios.post('/video', formData);
        

        if (result.status === 201) {
            setsuccessMsg('Files uploaded Successfully');
            router.push("/home");
            // location.reload()
        }
        else {
            setMsg('fail to upload, server down');
        }
      }
        
    }



    const handleImageChange = (e) => {
        const files = e.target.files;
        
         
        // if(files[0].size >875000){
        //     console.log("sjjsjsjjse here is")
        //    setUplaodError('Upload file cannot be more than 875mb in size')

        // }else{

            let myFiles = Array.from(files);

            const fileReader = new FileReader();
            
    
            fileReader.onload = () => {
              if (fileReader.readyState === 2) {
                setFieldValue(myFiles);
              }
            };
            fileReader.onloadstart = () => {
              setVideoPreview(null);
            };
            fileReader.onloadend = () => {

              setVideoPreview(fileReader.result);
            };
            if (e.target.files[0]) {
              fileReader.readAsDataURL(e.target.files[0]);
            }
    
    

        //}        
      }


      const closeFilepreview = () => {
          setFilePreview('')

      }
      const closeVideoPreview = () => {
        setVideoPreview('');
      }


      const handleImageChange2 = (e) => {
        const files = e.target.files;

        let myFiles = Array.from(files);

        const fileReader = new FileReader();

        fileReader.onload = () => {
          if (fileReader.readyState === 2) {
            setFileList(myFiles);
          }
        };
        fileReader.onloadstart = () => {
            setFilePreview(null);
        };
        fileReader.onloadend = () => {
            
            setFilePreview(fileReader.result);
        };
        if (e.target.files[0]) {
          fileReader.readAsDataURL(e.target.files[0]);
        }

        
      }
  console.log("errorrururu",uploadError)


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
                           <div className='border-t-2  space-x-2 ml-[-12px] border-[#aca7a7] w-[310px] grid grid-cols-2'>
                            {
                              videoPreview ? 
                              <>
                              <div>
                                  <div className='upload-cover-btn bg-[hsl(0,86%,49%)] w-[1.5em] h-[1.5em]   mt-8 ml-[9.5em] rounded-full  border-[1px] hover:border-red-600 hover:text-red-700 hover:bg-white absolute flex justify-center ' onClick={closeVideoPreview}>
                                     <p className=' text-white text-sm hover:text-red-700'>x</p>                                   </div>
                              <video
                className="h-[150px] w-[400px] mb-4"
                controls
                    loop
                src={videoPreview}
            />
            </div>
                              
                              </>

                              :
                              <>
                              <label htmlFor="videos">
                                <div className="border-dotted h-20 w-20  justify-center border-2">
                                    
                                     <h2 className="ml-2 mt-4">Add File Preview</h2>
                            
                                    <HiPlusSm className="text-2xl ml-6 " />
                                </div>
                                <input type="file" className="hidden"  id="videos" onChange={handleImageChange} />
                            </label>
                              </>
                            }
                            {
                                filePreview ?
                                <>
                                <div>
                                <div className='upload-cover-btn bg-[hsl(0,86%,49%)] w-[1.5em] h-[1.5em]   mt-8 ml-[9em] rounded-full  border-[1px] hover:border-red-600 hover:text-red-700 hover:bg-white absolute flex justify-center ' onClick={closeFilepreview}>
                                     <p className=' text-white text-sm hover:text-red-700'>x</p>                                   </div>
                                <video
                className="h-[150px] w-[400px] mb-4"
                controls
                    loop
                src={filePreview}
            />
            </div>
                                </>
                                :
                                <>
                                <label htmlFor="file">
                                <div className="border-dotted h-20 w-20  justify-center border-2">
                                    <h2 className="ml-2 mt-4">Add Main File </h2>
                                    <HiPlusSm className="text-2xl ml-6 " />
                                    
                                </div>
                                <input type="file" className="hidden"  id="file" onChange={handleImageChange2} />
                            </label>
                                </>
                                
                            }
                            
                           </div>
                           <p className='w-80 text-xs mt-4'><span className=' font-semibold'>Note:</span> The File preview display on timeline as a preview of the Main file content, <span className='text-[#f04c30]'>learn more</span>  </p>
                            <div className="mt-4">
                                


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
                                                            <option value="Select">select type</option>
                                                            <option value="Instrumental">Instrumental</option>
                                                            <option value="Record">Record</option>
                                                        </select>

                                                    </>
                                                    :

                                                    <>
                                                        <select className="h-10 w-[5em]" onChange={(e) => setTypes(e.target.value)
                                                        }>
                                                            <option value="Select">select type</option>
                                                            <option value="Track">Track</option>
                                                            <option value="Album">Album</option>
                                                        </select>
                                                    </>
                                            }


                                            <input type="number" className="pricing-input w-40 h-10 ml-10 text-center text-lg text-bold " onChange={(e) => setPrice(e.target.value)
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

{
 uploadError ? 
 <>

<div className='w-full h-full backdrop absolute'>
                    <div className=' rounded-md bg-white h-[10em] w-[20em] mt-20 ml-10'>
                         <div className='flex justify-center p-6 '>
                             <h2>{ uploadError }</h2>
                         </div>

                         <button onClick={CloseErrormsg} className='bg-[#f04c30] w-[5em] h-10 rounded-md ml-[12em] text-white'>
                             <span className='p-2'> Close</span>
                         </button>
                    </div>
            </div>
 </>
 :
 <>
 </>
}
{
    msg ? 
    <>
    <div className='w-full h-full backdrop absolute'>
                    <div className=' rounded-md bg-white h-[10em] w-[20em] mt-20 ml-10'>
                         <div className='flex justify-center p-6 '>
                             <h2>{ msg }</h2>
                         </div>

                         <button onClick={ClearErrormsg} className='bg-[#f04c30] w-[5em] h-10 rounded-md ml-[12em] text-white'>
                             <span className='p-2'> Close</span>
                         </button>
                    </div>
            </div>

    </>
    :
    <>
    

    </>
}


{
   uploadmsg ? 
   <>
    <div className='w-full h-full backdrop absolute'>
                    <div className=' rounded-md bg-white h-[10em] w-[20em] mt-20 ml-10'>
                         <div className='flex justify-center p-6 '>
                         <SmallSpinnerV show={loadingVal}/>
                             <h2>{ uploadmsg }</h2>
                         </div>
                        {/* <Link  href="/home" >
                         <button onClick={ClearErrormsg} className='bg-[#f04c30] w-[5em] h-10 rounded-md ml-[12em] text-white'>
                             <span className='p-2'> Continue</span>
                         </button>
                         </Link> */}
                    </div>
            </div>
   </>

   :
   <>
   </>
}

{
   successmsg ? 
   <>
    <div className='w-full h-full backdrop absolute'>
                    <div className=' rounded-md bg-white h-[10em] w-[20em] mt-20 ml-10'>
                         <div className='flex justify-center p-6 '>
                         <SmallSpinnerV show={loadingVal}/>
                             <h2>{ successmsg }</h2>
                         </div>
                      
                    </div>
            </div>
   </>

   :
   <>
   </>
}

        </>
    )
}

export default uploader
