import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import { IoMdSearch } from "react-icons/io";
import { SiToyota } from "react-icons/si";
import { SiMercedes } from "react-icons/si";



function Renderinfo() {

    const [resultQuery, setresultQuery] = useState([]);
    const [searchTerm, setrsearchTerm] = useState(null);

    const [dataItem, setdataItem] = useState([]);


    const searchHandler = (evt) => {
        let searchValue = evt.target.value.toLowerCase()
        setrsearchTerm(searchValue)

        let result = []
        result = dataItem.filter((data) => {
            return data.name.search(searchValue) != -1
        })
        setresultQuery(result)

    }



    useEffect(() => {
        fetch('https://moxieus.co/api/public/allproduct')
            .then(res => res.json())
            .then(data => {
                setdataItem(data);
            }).catch((e) => { console.log(e) });
    }, []);



    return (
        <div className="mt-[50px] md:mt-2">

            <div className="flex justify-center ">
                <div className="text-5xl text-white font-serif"> <span className="text-[#ea455d]">Your best cars,</span><br />stress free</div>
            </div>
            <div className="flex justify-center mt-[30px] md:w-[50em] md:ml-[15em] ">
                {/* <IoMdSearch className="text-2xl text-white" />
                <button className="text-white">ESC</button> */}
                <input
                    type="input"

                    className=" h-[45px] font-serif md:w-[40em] ml-10 w-[18em] shadow-lg border-2" placeholder="Search for a Car"
                    onChange={(evt) => searchHandler(evt)}
                    style={{
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        outline: 'none',
                    }}
                />

            </div>
            {/* search part */}
            {
                (searchTerm == null || searchTerm === "")
                    ?
                    <div></div>
                    :

                    <div className=" searz  md:ml-[20em] h-[19.9em]   overflow-y-scroll md:w-[40em] ml-[3em] w-[20em]" style={{
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        outline: 'none',
                    }}>

                        {
                            (resultQuery === null)
                                ?

                                <div className="border-[1px] mx-4 my-4 mt-10 flex h-[100px] shadow-lg" style={{
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                    outline: 'none',
                                }}>

                                    <h2 className="text-white">No Result found</h2>
                                </div>



                                :

                                resultQuery.map((item, index) => (
                                    <div key={item.id} className="border-[1px] mx-4 my-4 mt-[46px] flex h-[100px] shadow-lg" style={{
                                        borderTopRightRadius: '10px',
                                        borderBottomRightRadius: '10px',
                                        borderTopLeftRadius: '10px',
                                        borderBottomLeftRadius: '10px',
                                        outline: 'none',
                                    }}>

                                        <SiMercedes className="text-2xl ml-10 mt-4 text-yellow-500" />
                                        <p className="mt-[40px] ml-[-33px] relative ">{item.name}</p>
                                        <p className=" mt-8 ml-20">{item.yrs_production}</p>
                                        <span className=" text-white md:ml-[6em] md:mt-[50px]  h-[25px] bg-yellow-500"
                                            style={{
                                                borderTopRightRadius: '10px',
                                                borderBottomRightRadius: '10px',
                                                borderTopLeftRadius: '10px',
                                                borderBottomLeftRadius: '10px',
                                                outline: 'none',
                                            }}
                                        >₦{item.amount}</span>
                                        <img src={'https://moxieus.co/api/storage/app/public/' + item.pic} alt="img" className="w-40 h-20 ml-[10m] mt-[-2.5em]  " />



                                    </div>
                                ))

                        }


                    </div>




            }

            {/* end */}

        </div >
    )
}

export default Renderinfo
