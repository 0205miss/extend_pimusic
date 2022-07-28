import "../styles/globals.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { AuthGuard } from "@/services/Auth/AuthGuard";
import { useEffect, useState } from "react";
import * as types from "@/store/actionTypes";
import TagManager from "react-gtm-module";
import { Navbar } from "@/components/Navigation/Navbar";
import Nav from "@/components/Navigation/Nav";
import AdminNav from "@/components/Navigation/AdminNav";
import BottomMenu from "@/components/Navigation/BottomMenu";
import { AdvancedFooter } from "@/components/Navigation/Footer";
import { useRouter } from "next/router";
import { protectedRoutes } from "./../config/config";
require("./../config/config.tsx");
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import SideDrawer from '../components/Navigation/SiderDrawer'
import AdminSideDrawer from '../components/Navigation/AdminSideDrawer'
import BackDrop from "../components/Navigation/BackDrop"
import SiderDrawer from "@/components/Navigation/SiderDrawer";
import { toggleSidebar } from "@/components/Layout/Sidebar";
import Dropdown from "../components/Navigation/Dropdown"
import Minnav from "@/components/Navigation/Minnav"
import MinFooter from "@/components/Navigation/MinFooter"
import Altnav from "@/components/Navigation/Altnav";
import Lsidebar from "@/components/Navigation/Lsidebar";
import Rsidebar from "@/components/Navigation/Rsidebar";
import { Chart } from "react-chartjs-2";
import ControlUserAction from "@/components/Layout/Controluser";




function MyApp(props: any) {

    // Initialize Google Tag Manager via react-gtm-module.
    if (process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) {
        const tagManagerArgs = {
            gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
        };
        if (process.browser) {
            TagManager.initialize(tagManagerArgs);
        }
    }

    const url = useRouter()

    const queryClient = new QueryClient()

    const router = useRouter();
    const isNoProtectedRoute = protectedRoutes.every((route) => {
        // Check if we're on a protected route.
        return !router.pathname.startsWith(route);
    });

    // Handle current user in redux.
    // useEffect(() =>{


    // })
    useEffect(() => {



        // Store current user if we have one.
        if (props.user) {
            store.dispatch({
                type: types.USER_LOADED,
                payload: props.user,
            });

        }

        // Dispatch user loading error if no user is present.
        store.dispatch({
            type: types.USER_LOADED_ERROR,
        });




    }, []);


    const [DrawIsOpen, setDrawIsOpen] = useState(false)
    const [isHovering, setisHovering] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    // const [controls, setControls] = useState(false)

    const [click, setClick] = useState(false)


    const handleClick = () => {
        setClick(!click);

    }

  
      const controls = false

    // handling the toggle 

    const toggle = () => {
        setIsOpen(!isOpen)
    }



    const siderDrawerToggle = () => {

        setDrawIsOpen(!DrawIsOpen)
    }

    const backdropDrawer = () => {

        setDrawIsOpen(false)
    }

    const onMouseout = () => {
        setisHovering(false)
    }

    const onHover = () => {
        setisHovering(true)

    }

    let hovering;
    let backDrop;
    let controluser =<ControlUserAction /> ;



    if (DrawIsOpen) {
        backDrop = <BackDrop clickBack={backdropDrawer} />
    }
    if (isHovering) {
        hovering = <Dropdown />
    }

     


    if (url.pathname === "/auth" || url.pathname === "/auths" || url.pathname === "/user/login") {
        return (


            <Provider store={store}>

                {/* <Minnav isOpen={click} toggle={handleClick} /> */}

                <props.Component {...props.pageProps} />
                {/* {isNoProtectedRoute && <AdvancedFooter />} */}

                {isNoProtectedRoute}
            </Provider>


        )
    }

    if (url.asPath == "dashboard/home") {


        return (

            <div style={{ height: '100%' }}>
                <Provider store={store}>
                    <AdminNav drawerClicked={siderDrawerToggle} hover={onHover} hoverout={onMouseout} />
                    <AdminSideDrawer show={siderDrawerToggle} />
                    {hovering}
                    {backDrop}


                    <props.Component {...props.pageProps} />
                    {isNoProtectedRoute && <AdvancedFooter />}

                    {isNoProtectedRoute}

                </Provider>
            </div>

        )

    }


    if (url.pathname === "/profile" || url.pathname == "/bookmark" || url.pathname == "/preference" || url.pathname == "/wallet" || url.pathname == "/help" || url.pathname == "/postfeeds") {

        return (

            <div style={{ height: '100%' }}>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>

                        <Altnav pagename={props.router.route} />
                        <Rsidebar show={DrawIsOpen} />
                        <SiderDrawer show={DrawIsOpen} drawback={backdropDrawer} />
                        {hovering}
                        {backDrop}

                        <props.Component {...props.pageProps} />
                        <Lsidebar />
                        {/* {isNoProtectedRoute && <AdvancedFooter />} */}
                        <MinFooter show={siderDrawerToggle} />
                        {isNoProtectedRoute}
                    </QueryClientProvider>
                </Provider>
            </div>

        )
    }


    return (

        <div style={{ height: '100%' }}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    
                    <Minnav isOpen={click} toggle={handleClick} />
                    <Nav toggle={handleClick} clicks={click} />
                    <Rsidebar show={DrawIsOpen} />
                    <SiderDrawer show={DrawIsOpen} drawback={backdropDrawer} />
                    
                    {hovering}
                    {backDrop}
                     {/* {controluser} */}
                    <props.Component {...props.pageProps} />
                    {/* {isNoProtectedRoute && <AdvancedFooter />} */}
                    <MinFooter show={siderDrawerToggle} />
                    <Lsidebar show={siderDrawerToggle} />

                    {isNoProtectedRoute}
                </QueryClientProvider>
            </Provider>
        </div>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
    // usercontrol : PropTypes.controls,
};

/**
 * Fetch some data server side before rendering the page client side.
 *
 * @param {object} context
 *   The context object.
 */


MyApp.getInitialProps = async ({ ctx }) => {
    const req = ctx.req;
    const pathname = ctx.pathname;
    const res = ctx.res;

    /**
     * Abort if one var is not present.
     * For example, the req obj will be undefined if we don't
     * have a page reload but a page switch via the Next Router.
     */
    if (!req || !pathname || !res) {
        return {};
    }

    const authenticator = new AuthGuard();
    return await authenticator.authenticateUser(req, res, pathname);
};

export default MyApp;
