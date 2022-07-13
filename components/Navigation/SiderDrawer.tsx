import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import { logout } from "../../store/auth/authActions"
import { connect } from "react-redux";
import { Categories as menu } from '../../NavigationMenu'
import Product from '../Card/Product'
import { CgProfile } from "react-icons/cg";
import { BsViewList } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { BiWallet } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import axios from 'axios'
import Cookies from 'js-cookie';


interface Iname {
    name: string,
    propix: string
}
function SiderDrawer(props: any) {


    const router: NextRouter = useRouter();
    const [userdata, setUserdata] = useState<{ name: string, propix: string }>({ name: "", propix: "" });

    useEffect(() => {
        userData()

        // if (!props.isAuthenticated) {
        //     router.push("/user/login");
        // }
    }, [props.isAuthenticated]);


    let sideDrawClasses = 'sidebar'
    if (props.show) {
        sideDrawClasses = 'sidebar open'
    }

    const userData = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/userdata');
        setUserdata(res.data.data[0])

    }


    console.log("userdtat", userdata)


    return (

        <div className={sideDrawClasses}>
            <div className=" w-full mb-6 border-b-2">
                <div className="">

                    <img src={`https://nurbansports.com/pimus/public/profilepix/${userdata.propix}`}
                        width={10}
                        height={10}
                        className="rounded-full md:w-[3.2rem] md:h-[3.2rem] h-[3.2rem] w-[3.2rem] userimg" />
                    <div className="ml-2 -mt-1 mb-2">
                        <div className="flex">
                            <h2 className="text-sm all-text"> {userdata.name} </h2>
                            <MdKeyboardArrowDown className="text-1xl absolute right-8" />
                        </div>

                        <div className="flex">
                            <p className="text-xs all-text ">@{userdata.name}</p>
                            <span className="text-sm text-[#f04c30] absolute right-8">3 Coupon</span>
                        </div>
                    </div>

                </div>

            </div>
            <div className="mt-2">
                <ul className=" ml-10  items-center mt-4 overflow-y-scroll space-y-6">
                    <Link href="/profile">
                        <div className="flex space-x-2" onClick={props.drawback}>
                            <CgProfile className="text-2xl" />
                            <a>Profile</a>
                        </div>
                    </Link>

                    <Link href="/wallet">
                        <li className="flex space-x-2" onClick={props.drawback}>
                            <BiWallet className="text-2xl" />
                            <a>Wallet</a>
                        </li>
                    </Link>
                    <Link href="/preference">
                        <li className="flex space-x-2" onClick={props.drawback}>
                            <AiOutlineSetting className="text-2xl" />
                            <a>Preference</a>
                        </li>
                    </Link>

                    <Link href="/bookmark">
                        <li className="flex space-x-2" onClick={props.drawback}>
                            <BsBookmarkCheck className="text-2xl" />
                            <a>Bookmark</a>
                        </li>
                    </Link>

                    <Link href="/post_content">
                        <li className="flex space-x-2 " onClick={props.drawback}>
                            <IoIosHelpCircleOutline className="text-2xl" />
                            <a>Help</a>
                        </li>
                    </Link>

                    <li className="flex space-x-2"
                        onClick={() => {
                            props.logout();
                        }}
                    >
                        <BiLogOutCircle className="text-2xl" />
                        <a>Logout</a>
                    </li>




                </ul>
            </div>
        </div>

    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(SiderDrawer);
