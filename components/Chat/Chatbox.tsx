import React from 'react'
import {MdPhotoSizeSelectActual} from "react-icons/md"
import {SiAudioboom} from "react-icons/si"
import {FaRegUserCircle} from "react-icons/fa"
function Chatbox() {

    return (
        <div>
            <div className='h-[100%] w-[100%]'>
                    <div className='mt-6'>
                    <div className='absolute left-4 h-20 flex'>

                        <img src='/images/user.png'
                                                        width={10}
                                                        height={10}
                                                        className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] border" />
                        <div className='rounded-full w-[15em] border-gray-500 border flex justify-center '>
                        <p className='p-4 '>how are you doing dear  how are you doing dear 
                        how are you doing dear </p>
                    
                            </div>
                    </div>

                    <div className='absolute right-4 h-20 flex mt-[10em]'>

                        <img src='/images/user.png'
                                                        width={10}
                                                        height={10}
                                                        className="rounded-full md:w-[3.0rem] md:h-[3.0rem] h-[3.0rem] w-[3.0rem] border" />
                        <div className='rounded-full w-[15em] border-gray-500 border flex justify-center '>
                        <p className='p-4 '>how are you doing dear  how are you doing dear 
                        how are you doing dear </p>
                    
                            </div>
                    </div>

                    
                
                    </div>

                    <div className='absolute bottom-0 border-[1px] w-full flex space-x-4 '>
                    <MdPhotoSizeSelectActual  className='text-[2.5em]  ml-2' />
                    <textarea placeholder='text here' className=' w-[20em] h-[4em] border-0 active:border-0 focus:border-0 text-[16px]'>

                    </textarea>

                    <SiAudioboom  className='text-[2.5em]  '/>

                    </div>

            </div>

        </div>
    )
}

export default Chatbox
