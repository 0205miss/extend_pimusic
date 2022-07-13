import React from 'react'
import { GiMoneyStack } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
GiReceiveMoney

function RecentTransaction() {
    return (
        <div>
            <div className="bg-[#f8f8f8] space-y-1">
                <h1>Recent Transaction</h1>


                     {/* space 1 */}
                <div className="border-2 h-[70px] bg-[#fae8e8] border-[#f8f8f8]" style={{
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            outline: 'none',
                        }}>
                    <div className="flex">
                        <div className=" h-[2em] w-[2em] justify-center items-center flex rounded-full bg-white mt-[8px]"  >
                            <GiMoneyStack className="h-[2em] w-[2em] text-[#e46198] " />

                        </div>
                        <div className="mt-3 ml-2 text-[#2e2e2e]">
                            <p>Dell inspiron 15 7generation </p>
                        </div>

                    </div>
                    <p className="ml-[15.5em] mt-[-0.6em] text-sm">$450,000</p>

                    <p className=" text-xs mt-[-1.5em] ml-10">22 july 2021 2:6am</p>
                </div>


                {/* space 2 */}

                <div className="border-2 h-[70px] bg-[#fae8e8] border-[#f8f8f8]" style={{
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            outline: 'none',
                        }}>
                    <div className="flex">
                        <div className=" h-[2em] w-[2em] justify-center items-center flex rounded-full bg-white mt-[8px]"  >
                            <GiMoneyStack className="h-[2em] w-[2em] text-[#e46198] " />

                        </div>
                        <div className="mt-3 ml-2 text-[#2e2e2e]">
                            <p>Dell inspiron 15 7generation </p>
                        </div>

                    </div>
                    <p className="ml-[15.5em] mt-[-0.6em] text-sm">$450,000</p>

                    <p className=" text-xs mt-[-1.5em] ml-10">22 july 2021 2:6am</p>
                </div>
            
              {/* space 3 */}

              <div className="border-2 h-[70px] bg-[#fae8e8] border-[#f8f8f8]" style={{
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            outline: 'none',
                        }}>
                    <div className="flex">
                        <div className=" h-[2em] w-[2em] justify-center items-center flex rounded-full bg-white mt-[8px]"  >
                            <GiMoneyStack className="h-[2em] w-[2em] text-[#e46198] " />

                        </div>
                        <div className="mt-3 ml-2 text-[#2e2e2e]">
                            <p>Dell inspiron 15 7generation </p>
                        </div>

                    </div>
                    <p className="ml-[15.5em] mt-[-0.6em] text-sm">$450,000</p>

                    <p className=" text-xs mt-[-1.5em] ml-10">22 july 2021 2:6am</p>
                </div>
            
            
            
                


            </div>
        </div>
    )
}

export default RecentTransaction
