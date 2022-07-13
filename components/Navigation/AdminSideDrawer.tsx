import Link from "next/link";
import { PrimaryButton } from "../Button/Button";
import { logout } from "../../store/auth/authActions";
import { connect } from "react-redux";
import { useState, useEffect, ReactElement } from "react";
import { NextRouter, useRouter } from "next/router";
import { AdminRoute as menu } from '../../NavigationMenu'

function AdminSideDrawer(props: any): ReactElement {
    const router: NextRouter = useRouter();
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (!props.isAuthenticated) {
            router.push("/user/login");
        }
    }, [props.isAuthenticated]);

    let sideDrawClasses = 'sidedrawer'
    if (props.show) {
        sideDrawClasses = 'sidedrawer open'
    }


    // Return statement.


    return (
        <>

            <div className={sideDrawClasses}>

                <div className="h-[50px] w-full " style={{ borderBottom: '2px solid ' }}>
                </div>
                <div className="">
                    <ul className="space-y-2 ml-10  items-center mt-4 overflow-y-scroll">
                        {menu.map((nav) => {

                            return (
                                <>
                                    {/* <h3 className="text-base font-thin">{nav.title}</h3> */}
                                    <Link as={`/dashboard/${nav.link}`} href='/dashboard/[pages]'>

                                        <li className="ml-4 text-xs h-[20px] sidenavlink ">
                                            <a>
                                                {nav.cat}
                                            </a>
                                        </li>
                                    </Link>
                                </>
                            )

                        })}
                        <li onClick={() => {
                            props.logout();
                        }}>Logout</li>


                    </ul>
                </div>

            </div>

        </>
    );
}
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(AdminSideDrawer);
