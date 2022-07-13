import React from 'react'
import { BsCaretUp } from "react-icons/bs";

function Dropdown() {
    return (
        <div className="flex ml-[15.5rem] md:ml-[70em] mr-4 dropdown mt-[-20px] z-40 fixed w-[10em] h-[10em]">
            <BsCaretUp className="ml-[7.2rem] mt-[-10.0px] text-yellow-50 absolute" />
           <div className="">
               <ul className="justfy-center items-center ml-10 mt-4 space-y-4">
                   <li>Flavourte
                   <span className="text-white flex justify-center text-center text-xs absolute rounded-full w-[12px] h-[12px] mt-[-25px] ml-[65px] md:w-[13px] md:h-[13px] md:top-17px md:mt-[-30px] md:ml-[40px] bg-[#ed1a52]">3</span>
                   </li>
                   <li>Settings</li>
                   <li>Sign Out</li>
               </ul>
           </div>
        </div>
    )
}

export default Dropdown
