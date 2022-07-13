import React from 'react'
import { GiMoneyStack } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import {
    AiTwotoneHome, 
    AiFillTrademarkCircle,
    AiFillSound,
    AiFillExperiment,
    AiTwotoneEnvironment,
    AiTwotoneDashboard
   } 
   from "react-icons/ai"
   import Link from "next/link";

function BottomMenu() {
    return (
        <div className="fixed border-t-4  h-[62px] bg-[#ffff] bot bottom-0">
            <div className="flex  space-x-8 ml-4 mr-3 mt-3">
            <Link  href='/dashboard'>
            <AiTwotoneHome className="mobilemenu" />
            </Link>
            <AiFillTrademarkCircle className="mobilemenu" />
            <AiFillSound className="mobilemenu" />
            <AiFillExperiment className="mobilemenu" />
            <AiTwotoneDashboard className="mobilemenu"  />
            </div>
            
        </div>
    )
}

export default BottomMenu
