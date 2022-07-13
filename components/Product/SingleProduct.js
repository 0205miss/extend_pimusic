import React from 'react'
import { IoMdStarOutline } from 'react-icons/io'
import SimilarProduct from './SimilarProduct'
import MostnewProduct from './MostnewProduct'
import Link from 'next/link'
function SingleProduct() {
    return (
        <div>
            <div className="">
                <Link as="" href="/">
                    <a className="ml-4 text-yellow-700 cursor-pointer">back to Store</a>
                </Link>



                <div className="details md:flex space-x-8 mt-4 mx-10">
                    <div className=" space-x-4">
                        <div className="border-2 border-[#e7e7e7] cursor-pointer">
                            <img src="/images/product/1.png" className="md:w-[19em] md:h-[19em]" />
                        </div>
                        <div className=" mt-4 space-x-2 flex cursor-pointer">
                            <div className="border-2 border-[#e7e7e7]" style={{
                                borderTopRightRadius: '5%',
                                borderBottomRightRadius: '5%',
                                borderTopLeftRadius: '5%',
                                borderBottomLeftRadius: '5%',

                            }} >
                                <img src="/images/product/1.png" className="w-[70px] h-[70px]" />

                            </div>

                            <div className="border-2 border-[#e7e7e7]" style={{
                                borderTopRightRadius: '5%',
                                borderBottomRightRadius: '5%',
                                borderTopLeftRadius: '5%',
                                borderBottomLeftRadius: '5%',

                            }} >
                                <img src="/images/product/1.png" className="w-[70px] h-[70px]" />

                            </div>

                            <div className="border-2 border-[#e7e7e7]" style={{
                                borderTopRightRadius: '5%',
                                borderBottomRightRadius: '5%',
                                borderTopLeftRadius: '5%',
                                borderBottomLeftRadius: '5%',

                            }} >
                                <img src="/images/product/1.png" className="w-[70px] h-[70px]" />

                            </div>

                            <div className="border-2 border-[#e7e7e7]" style={{
                                borderTopRightRadius: '5%',
                                borderBottomRightRadius: '5%',
                                borderTopLeftRadius: '5%',
                                borderBottomLeftRadius: '5%',

                            }} >
                                <img src="/images/product/1.png" className="w-[70px] h-[70px]" />

                            </div>

                            <div className="border-2 border-[#e7e7e7]" style={{
                                borderTopRightRadius: '5%',
                                borderBottomRightRadius: '5%',
                                borderTopLeftRadius: '5%',
                                borderBottomLeftRadius: '5%',

                            }} >
                                <img src="/images/product/1.png" className="w-[70px] h-[70px]" />

                            </div>
                        </div>
                    </div>
                    <div className="border-b-2 border-[#e7e7e7] mb-20">
                        <h2 className="font-bold ">Hd 3000 camera for indoor and outdoor audio and video device</h2>
                        <div className="border-b-2 border-[#e7e7e7]">
                            <a className="text-sm text-yellow-700">electronic/visual</a>
                            <div className="flex cursor-pointer mb-2">
                                <IoMdStarOutline className="text-[#ffa53b]" />
                                <IoMdStarOutline className="text-[#ffa53b]" />
                                <IoMdStarOutline className="text-[#ffa53b]" />
                                <IoMdStarOutline className="text-[#ffa53b]" />
                                <IoMdStarOutline className="text-[#ffa53b]" />
                            </div>
                            <div className="mb-2 ml-[20em]">
                                {/* <a className="">Add to Cart</a> */}
                            </div>

                        </div>
                        {/* pricing */}
                        <div className="border-b-2 border-[#e7e7e7]">
                            <div className=" mx-4 md:flex  mb-2">
                                <span className="text-xs">Price: </span><h1 className="ml-6 text-[#b22a25]"> $59.62</h1>
                                <div className="ml-20">
                                    <div className=" flex">
                                        <span className="text-xs -mt[30px]">
                                            discount:</span>
                                        <span className="text-lg ml-4 text-[#b22a25]">5%</span>
                                        <span className="ml-2">of</span>
                                        <del className="text-[#b22a25] ml-2">$76.98</del>
                                    </div>

                                    <p className="ml-[-10em] md:w-[28em] italic text-sm mt-4">
                                        a nice standing camera basical use in conference call and video  share online. it also in other visual activities, AS well as  cctv security installation.
                                    </p>


                                </div>
                            </div>


                        </div>

                        <div className="mb-2">
                            <h1 className=" font-bold font-mono ">Item details</h1>
                            <ul className=" list-disc mb-2 ml-6 ">
                                <li>it all good for useage</li>
                                <li>it all good for useage</li>
                                <li>it all good for useage</li>
                                <li>it all good for useage</li>
                                <li>it all good for useage</li>
                            </ul>
                            <div className="bg-[#ffa53b] border-2 w-[110px] flex justify-center cursor-pointer h-[40px] md:ml-[20em]">
                                <a className="text-white mt-[5px]">Add to Cart</a>
                            </div>
                        </div>

                    </div>

                    <div className=" border-2 border-[#e7e7e7] flex justify-center w-[15.9em] h-[19.6em]">
                        <div className="mx-4 my-4 font-serif justify-center ">
                            <h3>product cost:  <span className="text-[#b22a25]">$59.62</span></h3>
                            <p className="text-sm">%5 discount  on the orginal price </p>
                            <p className="text-sm"> 50 pieces in stock </p>

                            <p> This item is delivery at any location, </p>
                            <select className="w-20 bg-white border-2"
                                style={{
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',

                                }}
                            >
                                <option> Qty: 1</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <div className="flex justify-center ">
                                <div>
                                    <div className="bg-[#ffa53b] border-2 w-[110px] flex justify-center cursor-pointer h-[40px]">
                                        <a className="text-white mt-[5px]">Add to Cart</a>
                                    </div>
                                    <div className="bg-[#f98a8d] border-2 w-[110px] flex justify-center cursor-pointer h-[40px]">
                                        <a className="text-white mt-[5px]">Add to Cart</a>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <p>
                                    product will serve you very well as you excepted
                            </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* related selected product  */}

            <div className=" border-t-2 border-[#e7e7e7]  mx-6 mb-10">
                <h1 className="font-bold ">similar product</h1>
                <SimilarProduct />

            </div>

            <div className="border-t-2 border-[#e7e7e7]  mb-10 mx-6">
                <h1 className="font-bold">Most Recent product</h1>
                <MostnewProduct />
            </div>
        </div>
    )
}

export default SingleProduct
