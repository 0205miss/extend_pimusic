

import Contentflow from "../FrontPages/Contentflow"
import Link from "next/link";
import { logout } from "./../../store/auth/authActions";
import { connect } from "react-redux";
import { useEffect, ReactElement } from "react";
import { NextRouter, useRouter } from "next/router";
import Auths from "pages/auths";


function FrontPage(props: any) {

  const router: NextRouter = useRouter();

  useEffect(() => {
    // if (!props.isAuthenticated) {
    //   router.push("/auth");
    // }
  }, [props.isAuthenticated]);

  return (
    <div>
      <div className="">

        {/* slider div */}
        <div className="mt-[60px] mx-4 md:ml-[22%] ">


          <Contentflow />
          


        </div>

      </div>
    </div>
  )
}



const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(FrontPage);

