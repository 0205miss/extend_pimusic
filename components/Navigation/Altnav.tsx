import React from 'react'
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'

function Altnav(props: any) {
    let name = props.pagename

    return (
        <div className="ml-2 h-[3.5em] fixed top-0 altnav">
            <div className="flex space-x-4 mt-4 absolute">
                <Link href="/home">
                    <BiLeftArrowAlt className="text-black text-2xl" />
                </Link>
                <h3 className="text-xl capitalize ">{name.substring(1)}</h3>
            </div>
        </div>
    )
}

export default Altnav
