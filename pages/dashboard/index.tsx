import Link from "next/link";
import { logout } from "./../../store/auth/authActions";
import { connect } from "react-redux";
import {useState, useEffect, ReactElement} from "react";
import {NextRouter, useRouter} from "next/router";
import  Home from "../..//components/Dashboard/Home";


function Dashboard(props: any): ReactElement {
    const router: NextRouter = useRouter();
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (!props.isAuthenticated) {
            router.push("/user/login");
        }
    }, [props.isAuthenticated]);

    // Return statement.
    return (
        <>
            <Home/>
        </>
    );
}
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(Dashboard);
