import Image from 'next/image'
import { IoGrid } from "react-icons/io5";
import { RiShoppingBasketFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { CgOptions } from "react-icons/cg";
import { RiMenu4Line } from "react-icons/ri"
import { useEffect, useState } from "react";
import { HiMenuAlt4 } from 'react-icons/hi'
import { connect } from "react-redux";
import { CgSearch } from 'react-icons/cg'
import { NextRouter, useRouter } from "next/router";

import Link from 'next/link'
import { navbarLinks as link } from '../../NavigationMenu'
import { userState } from '../FrontPages/Imageupload/UserState';



const Nav = (props: any) => {
    // console.log("nice", props.user.email_verified_at)
    const [searchdv, setsearchdv] = useState(false)
    const router: NextRouter = useRouter();


    const searchtoggle = () => {
        if (searchdv === true) {
            setsearchdv(false)
        } else {
            setsearchdv(true)
        }

    }

    useEffect(() => {
        // if (!props.isAuthenticated) {
        //     router.push("/user/login");
        // }
    }, [props.isAuthenticated]);



    return (
        <div>

            <nav className="flex md:relative  md:ml-[20%] justify-between items-center w-full md:w-[50%] h-[4.5em] text-block relative  font-mono navbar border-b-2"

            >

                <div className="text-black md:ml-10 ml-6">
                    <h2 className="text-2xl">Home</h2>
                </div>


                {
                    searchdv ?
                        <div className="mt-[8px]    ">


                            <input
                                type="input"

                                className=" h-[38px] font-serif md:w-[40em] ml-4 w-[16em] shadow-lg border-2" placeholder="Search for a Car"

                                style={{
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                    outline: 'none',
                                }}
                            />


                        </div>
                        :
                        <></>

                }

                <div className="md:mr-20 mr-[40px]">
                    <div className="" >

                        <CgSearch className="text-black text-2xl md:hidden" onClick={searchtoggle} />

                    </div>


                </div>

            </nav>
            {
                (props.user.email_verified_at === 'null') ?
                    <div>
                        <h2>Verify your email address</h2>
                    </div>
                    :
                    <div>
                    </div>
            }

        </div>
    )
}


const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps)(Nav);
