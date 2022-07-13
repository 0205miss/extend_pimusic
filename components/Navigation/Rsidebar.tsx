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
function Rsidebar(props: any) {


    const router: NextRouter = useRouter();
    const [userdata, setUserdata] = useState<{ name: string, propix: string }>({ name: "", propix: "" });

    useEffect(() => {
        userData()

        // if (!props.isAuthenticated) {
        //     router.push("/user/login");
        // }
    }, [props.isAuthenticated]);


    let sideDrawClasses = 'sidebar'
    // if (props.show) {
    //     sideDrawClasses = 'sidebar open'
    // }

    const userData = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/userdata');
        setUserdata(res.data.data[0])

    }


    console.log("userdtat", userdata)


    return (

        <div className='Rsidebar hidden md:flex'>
            <div className=" w-full mb-6 border-b-2 mt-4 ml-2">
                <div className="">

                    <img src={`https://nurbansports.com/pimus/public/profilepix/${userdata.propix}`}
                        width={20}
                        height={20}
                        className="rounded-full md:w-[5.2rem] md:h-[5.2rem]  userimg" />
                    <div className="ml-2 -mt-1 mb-2">
                        <div className="flex">
                            <h2 className="text-lg all-text"> {userdata.name} </h2>

                        </div>

                        <div className="flex">
                            <p className="text-sm all-text ">@{userdata.name}</p>

                        </div>
                    </div>

                </div>

                <div className="mt-2">
                    <ul className=" ml-10  items-center mt-4 overflow-y-scroll space-y-6">
                        <h3 className="text-xl">Most Trendy</h3>


                    </ul>
                </div>



            </div>

        </div>

    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(Rsidebar);
