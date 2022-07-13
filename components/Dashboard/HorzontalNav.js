import React from 'react'

const HorzontalNav = () => {
    return (
        <div className="shadow-lg space-x-2 h-[140px]  mt-6 border-2" style={{
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            outline: 'none',
        }}>
            <h1 className="ml-4">Transaction Summmary</h1>
            <div className="shadow-lg flex space-x-2 mt-4">
                
                <div className=" horzontalnav text-[#ffff] bg-[#e46198] h-[68px] ">
                    <h1 className="text-sm">New Order</h1>
                    <div className="flex items-center justify-center">
                        <p className="">120</p>
                    </div>
                </div>
                <div className=" horzontalnav text-[#ffff] flex-grow bg-[#e46198]">
                <h1 className="text-sm">Processed</h1>
                <div className="flex items-center justify-center">
                        <p className="">120</p>
                    </div>
                </div>
                <div className=" text-[#ffff] horzontalnav bg-[#e46198] ">
                    
                     <h1 className="text-sm"> complain / Return</h1>
                     <div className="flex items-center justify-center">
                        <p className="">120</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}


export default HorzontalNav