import React from 'react'
import { useState, useEffect, ReactElement } from "react";
import { BiHome } from "react-icons/bi"
import { BsBookmarkCheck } from 'react-icons/bs'
import { MdLibraryAdd } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsViewList } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { BiWallet } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import Link from "next/link";





function Lsidebar(props: any) {
    return (
        <div className="fixed hidden md:flex  bottom-0 top-0 bg-current minsidebar">

            <div className=" ml-20 space-y-10  mr-3 mt-10">
                <Link href="/home">
                    <div className="flex space-x-4">
                        <BiHome className="text-[2.0rem]  mobileview" />
                        <a className="link-hove mt-2">Home</a>
                    </div>
                </Link>
                <Link href="/postfeeds">
                    <div className="flex space-x-4">
                        <MdLibraryAdd className="text-[2.0rem]  mobileview" />
                        <a className="link-hove mt-2">Post Feed</a>
                    </div>
                </Link>

                <Link href="/bookmark">
                    <div className="flex space-x-4">
                        <BsBookmarkCheck className="text-[2.0rem]  mobileview" />
                        <a className="link-hove mt-2">Bookmark</a>
                    </div>
                </Link>

                <Link href="/feeds">
                    <div className="flex space-x-4">
                        <BiMessageSquareDots className="text-[2.0rem] mobileview " />
                        <a className="link-hove mt-2">Your Feed</a>
                    </div>
                </Link>


                <Link href="/profile">
                    <div className="flex space-x-4">
                        <CgProfile className="text-[2.0rem]" />
                        <a className="link-hove mt-2" >Profile</a>
                    </div>
                </Link>

                <Link href="/wallet">
                    <div className="flex space-x-4">
                        <BiWallet className="text-[2.0rem]" />
                        <a className="link-hove mt-2">Tranactions</a>
                    </div>
                </Link>
                <Link href="/preference">
                    <div className="flex space-x-4">
                        <AiOutlineSetting className="text-[2.0rem]" />
                        <a className="link-hove mt-2">Preference</a>
                    </div>
                </Link>


                <Link href="/post_content">
                    <div className="flex space-x-4">
                        <IoIosHelpCircleOutline className="text-[2.0rem]" />
                        <a className="link-hove mt-2" >Help</a>
                    </div>
                </Link>

                <div className="flex space-x-4"
                    onClick={() => {
                        props.logout();
                    }}
                >
                    <BiLogOutCircle className="text-[2.0rem]" />
                    <a className="link-hove mt-2">Logout</a>
                </div>






            </div>
        </div>
    )
}

export default Lsidebar
