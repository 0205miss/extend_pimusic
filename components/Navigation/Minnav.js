import React from 'react'
import Link from 'next/link'
import { navbarLinks as link } from '../../NavigationMenu'
import { FiAirplay } from 'react-icons/fi'
import { FiAlignRight } from 'react-icons/fi'
import { Router, useRouter } from 'next/router'



function Minnav({ isOpen, toggle }) {
    const router = useRouter()

    return (

        <div className={isOpen ? " text-center items-center minnav" : "hidden"} >
            <div className="h-40 text-white ">
                <div className="h-10 md:hidden">

                </div>

                <h2 className="mb-8 text-xl" onClick={toggle}> Start searching for car</h2>

                <div className="flex justify-center md:hidden">
                    <div className=" h-[0.5px] bg-[#a3a3a8] w-80 "></div>
                </div>

                <div className="mt-[5em] space-y-8 navB">
                    {link.map((nav) => {
                        const { id, text, path } = nav;
                        return (
                            <div onClick={toggle}>
                                <h3 onClick={() => {
                                    router.push(path);
                                }}>

                                    <a className="text-2xl">{text}</a>
                                </h3>
                            </div>

                        )
                    })}

                </div>

            </div>



            <div className="h-6 bg-black md:hidden  min-div" style={{
                borderTopRightRadius: '30px',
                borderTopLeftRadius: '30px',
            }}
            >

            </div>
        </div>



    )
}

export default Minnav
