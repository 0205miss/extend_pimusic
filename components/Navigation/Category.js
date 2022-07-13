import React from 'react'
import { IoGrid } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";



export default function Category(props) {
    return (
        <>
            <div className="flex mt-10 mx-4  md:ml-[88px]">
                <div className=" h-[30px] w-[120px] md:w-[80px] md:h-[50px] bg-white flex shadow-lg justify-center items-center"
                style={{
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    
                 }}
                >
                    <IoGrid className="text-[#f98a8d] h-[1em] w-[1em]" />
                    <p className="text-xs ml-1">All</p>
                </div>
                {/* Category menu */}
                <div className="bg-[#f8f8f8] overflow-x-scroll md:overflow-auto ">
                    <ul className="flex ml-4 space-x-4 md:ml-6 md:space-x-10 ">
                        <li className="btn"
                            style={{
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px',
                                
                             }}
                        >
                            <img
                            src="/images/menucat/1.png" 
                             className="btnimg"
                             
                             />
                             <p className="text-xs">Shoes</p>
                        </li>
                        
                        <li className="btn"
                            style={{
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px',
                                
                             }}
                        >
                            <img
                            src="/images/menucat/6.png" 
                             className="btnimg"
                             
                             />
                             <p className="text-xs">Shirt</p>
                        </li>
                        <li className="btn"
                            style={{
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px',
                                
                             }}
                        >
                            <img
                            src="/images/menucat/4.png" 
                             className="btnimg"
                             
                             />
                             <p className="text-xs">Wears</p>
                        </li>
                        
                        <li className="btn"
                            style={{
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px',
                                
                             }}
                        >
                            <img
                            src="/images/menucat/7.png" 
                             className="btnimg"
                             
                             />
                             <p className="text-xs">other</p>
                        </li>
                        <li className="h-[50px] w-[600px] bg-white md:flex shadow-lg justify-center items-center md:h-[50px] md:w-[150px] hidden"
                            style={{
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px',
                                
                             }}
                        >
                            <img
                            src="/images/menucat/7.png" 
                             className="btnimg"
                             
                             />
                             <p className="text-xs">other</p>
                        </li>
                       
                    </ul>
                </div>


            </div>
        </>
    )
}
