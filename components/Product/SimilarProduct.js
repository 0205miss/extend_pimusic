import React from 'react'
import Link from 'next/link'

function SimilarProduct() {
    return (
        <div className="md:flex space-x-4 ">


            <div className="border-2 border-[#e7e7e7] shadow-lg h-50 md:w-60 w-[18em] mt-4  md:ml-0">
                <img src="/images/product/1.png" className="w-40 h-40" />
                <Link as="/view-detail/fish" href="/[categories]/[productid]">
                    <a>
                        <h3 className="font-bold ml-4 text-yellow-700">Thicking device</h3>
                        <div className="flex justify-center">
                            <p className="mx-4 my-4">
                                This is an amazing stuff for your home use, at save time at so many places as this device is concised, it can take as much input as required.
                </p>
                        </div>
                    </a>
                </Link>
            </div>


            <div className="border-2 border-[#e7e7e7] shadow-lg h-50 md:w-60 w-[18em] mt-4  md:ml-0">
                <img src="/images/product/2.png" className="w-40 h-40" />
                <Link as="/view-detail/fish" href="/[categories]/[productid]">
                    <a>
                        <h3 className="font-bold ml-4 text-yellow-700">Thicking device</h3>
                        <div className="flex justify-center">
                            <p className="mx-4 my-4">
                                This is an amazing stuff for your home use, at save time at so many places as this device is concised, it can take as much input as required.
                </p>
                        </div>
                    </a>
                </Link>
            </div>

            <div className="border-2 border-[#e7e7e7] shadow-lg h-50 md:w-60 w-[18em] mt-4  md:ml-0">
                <img src="/images/product/4.png" className="w-40 h-40" />
                <Link as="/view-detail/fish" href="/[categories]/[productid]">
                    <a>
                        <h3 className="font-bold ml-4 text-yellow-700">Thicking device</h3>
                        <div className="flex justify-center">
                            <p className="mx-4 my-4">
                                This is an amazing stuff for your home use, at save time at so many places as this device is concised, it can take as much input as required.
                </p>
                        </div>
                    </a>
                </Link>
            </div>

            <div className="border-2 border-[#e7e7e7] shadow-lg h-50 md:w-60 w-[18em] mt-4  md:ml-0">
                <img src="/images/product/5.png" className="w-40 h-40" />
                <Link as="/view-detail/fish" href="/[categories]/[productid]">
                    <a>
                        <h3 className="font-bold ml-4 text-yellow-700">Thicking device</h3>
                        <div className="flex justify-center">
                            <p className="mx-4 my-4">
                                This is an amazing stuff for your home use, at save time at so many places as this device is concised, it can take as much input as required.
                </p>
                        </div>
                    </a>
                </Link>
            </div>

            <div className="border-2 border-[#e7e7e7] shadow-lg h-50 md:w-60 w-[18em] mt-4  md:ml-0">
                <img src="/images/product/6.png" className="w-40 h-40" />
                <Link as="/view-detail/fish" href="/[categories]/[productid]">
                    <a>
                        <h3 className="font-bold ml-4 text-yellow-700">Thicking device</h3>
                        <div className="flex justify-center">
                            <p className="mx-4 my-4">
                                This is an amazing stuff for your home use, at save time at so many places as this device is concised, it can take as much input as required.
                </p>
                        </div>
                    </a>
                </Link>
            </div>



        </div>
    )
}

export default SimilarProduct
