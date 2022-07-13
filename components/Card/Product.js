import React from 'react'
import { FcLike } from "react-icons/fc";
import { IoAddCircle } from "react-icons/io5"
import { IoStarSharp } from "react-icons/io5"
import Link from 'next/link'
import { useRouter } from 'next/router'

const Product = () => {


    return (

        <div classname=" w-[80px] h-[70px] shadow-lg bg-[#f7e3e3]"
            style={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                // border: "2px solid #f7e3e3",
                background: "#fff"
            }}>


            <Link as="/view-detail/fish" href="/[categories]/[productid]">
                <a>
                    <div className="mt-4 ml-4">
                        <p>New</p>
                    </div>
                    <div className="flex justify-end mr-4">
                        <FcLike className="w-[1em] h-[1em]" />
                    </div>
                    <div className="flex justify-center items-center">

                        <img src="/images/product/1.png" className="h-[100px] w-[100px]" />

                    </div>

                    <div className="ml-4">
                        <p className="text-xs">Man shoe</p>
                        <span>$250</span>
                        <IoStarSharp className="text-[#ffc107]" />
                    </div>
                    <span className="flex justify-end mr-4 mb-4 ">
                        <IoAddCircle className=" text-[#f98a8d] w-[2em] h-[2em]" />
                    </span>
                </a>
            </Link>

        </div>

    )
}

export default Product
