import { useState, useEffect, ReactElement } from "react";
import { BiHome } from "react-icons/bi"
import { BsBookmarkCheck } from 'react-icons/bs'
import { MdLibraryAdd } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import Link from "next/link";


function MinFooter(props: any) {

    return (
        <div className="fixed bottom-0 bg-current minfooter w-full md:hidden">
            <div className=" ml-6 flex space-x-12  mr-3 mt-3">
                <Link href="/home">
                    <BiHome className="text-[3.5rem]  mobileview" />

                </Link>
                <Link href="/postfeeds">
                    <MdLibraryAdd className="text-[3.5rem]  mobileview" />
                </Link>

                <Link href="/bookmark">
                    <BsBookmarkCheck className="text-[3.5rem]  mobileview" />
                </Link>

                <Link href="/feeds">
                    <BiMessageSquareDots className="text-[3.5rem] mobileview " />
                </Link>

                <GiConfirmed className="text-[3.5rem]  mobileview" onClick={props.show} />


            </div>
        </div>
    )
}

export default MinFooter




