import React, { HtmlHTMLAttributes } from 'react'
import { CSSProperties, useEffect, useState } from 'react'
import { finished } from 'stream'
import { Cropper } from 'react-cropper'
import { BiPhotoAlbum } from 'react-icons/bi'

function AddPost() {




    return (

        <div>
            <div className="mb-8">
                <textarea className="w-full h-20" placeholder="Start marking a post">

                </textarea>
                <div className="flex space-x-4 border-b-2 mt-4">
                    <label htmlFor="files" >
                        <BiPhotoAlbum className="text-2xl mb-2" />
                        <input type="file"
                            className="hidden"
                            id="files"
                        />
                    </label>

                    <div className="">...</div>
                    <button className="bg-[#f04c30] text-white  h-6 w-16 mb-2 rounded-lg absolute right-8">Post</button>




                </div>

            </div>

        </div>
    )
}

export default AddPost
