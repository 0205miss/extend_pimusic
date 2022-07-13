import React from 'react'

function wallet() {
    return (
        <div>
            <div className=" mx-2  mt-[55px] ">
                <div className=" h-40 border-2 flex space-x-20" style={{
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    outline: 'none',
                }}>
                    <div className=" ml-2 bg-[#34235f] h-[89px] mt-4 w-[89px]" style={{
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        outline: 'none',
                    }}>
                        <div
                            className=" pilog absolute top-[89px] left-[33px]  md:w-[3.2rem] md:h-[3.2rem] h-[3.5rem] w-[3.5rem] ">

                        </div>
                    </div>
                    <span className="flex space-x-2 mt-20 absolute right-8">
                        <b>0.33993 </b>
                        <b>𝝅</b>
                    </span>

                </div>

                <button className="bg-[#f04c30] text-white h-8 w-[8rem] top-20 rounded-lg absolute right-8 hover:bg-red-700 ">Connect to Pi</button>
            </div>

            <div className="mt-6 mx-2s flex justify-center text-center">
                <p className="text-[#4a4a58] w-60 ml-4">
                    Your PI-network is prefectly secure when connect to your Pi-network, alway disconnect when not in used. our developer team is working very hard tp secure connect on this platform. your are securely saved.
                </p>
            </div>
        </div >
    )
}

export default wallet
