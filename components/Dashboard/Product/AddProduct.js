import { connect } from "react-redux"
import React, { useState } from "react"
import { AiFillDownCircle } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import PropTypes from 'prop-types'
import {addproduct} from "../../../store/Tanent/action"
import { AddProdImage as img } from '../../../NavigationMenu'

function AddProduct(props) {

    const [file, setFile] = useState([])
    const [qty, setQty] = useState("")
    const [itemName, setItemName] = useState("")
    const [salePrice, setSalePrice] = useState("")
    const [costPrice, setCostPrice] = useState("")
    const [catgory, setCategory] = useState("")
    
    console.log(props)
     const addprod = (e) => {

        e.preventDefault()
        const data = new FormData();
        data.append('itemName', itemName)
        data.append('qty', qty)
        data.append('salePrice', salePrice)
        data.append('costPrice', costPrice)
        data.append('catgories', catgory)
        data.append('file', file)
        
        props.addproduct(data)
    
         
     }
    
    const upLoadImg = (e) => {
        setFile([...file, URL.createObjectURL(e.target.files[0])])
        console.log("file", file)
    }
    const DeleteImg = (e) => {
        const del = file.filter((item, index) => index !== e)
        setFile(del)
        console.log(del)
    }

    let fileRef = React.createRef()

    const triggerClick = (e) => {
        e.preventDefault()
        fileRef.current.click()
    }


    return (
        <div className="mt-[90px] mb-20">


            <button className="ml-[210px] border-2 border-[#f98a8d] bg-[#f0666a] text-white" style={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                outline: 'none',
            }}> Add Product</button>
            <form encType="multipart/form-data">

                <div className="mt-10 space-y-6">
                    {/* image  preview */}


                    <div className="">
                        <input
                            type="file"
                            disabled={file.length === 5}
                            className=""
                            ref={fileRef}
                            style={{ display: 'none'}}
                            accept=".png,.jpg,.jpeg"
                            onChange={upLoadImg}
                        />
                        <button onClick={triggerClick}>Upload Image</button>
                        <div className="ml-[40px] space-y-8">
                            {file.length > 0 && file.map((item, index) => {
                                return (
                                    <div key={item} className="h-[250px] w-[250px]  border-4 border-[#f98a8d]" style={{
                                        borderTopRightRadius: '10px',
                                        borderBottomRightRadius: '10px',
                                        borderTopLeftRadius: '10px',
                                        borderBottomLeftRadius: '10px',
                                        outline: 'none',
                                    }}>


                                        <img
                                            src={item}
                                            className="h-[242px] w-[242px]"
                                        />
                                        <FiDelete onClick={() => DeleteImg(index)} className=" mt-[-32rem] ml-[13rem] absolute text-[red] bg-[white] w-[1.5em] h-[1.5em]" />


                                    </div>


                                )

                            })}
                        </div>

                    </div>

                    <div className="prodinput">
                        <label className="text-sm ">*Item Name</label>
                        <input className="h-10 w-[280px] pdinput" value={itemName} onChange={(e)=> setItemName(e.target.value)} type="text" placeholder="laptop" />
                    </div>
                    <div className="prodinput">
                        <label className="text-sm ">*Quantity</label>
                        <input className="h-10 w-[280px] pdinput" value={qty} onChange={(e)=>setQty(e.target.value)}  type="number" placeholder="20" />
                    </div>
                    <div className="prodinput">
                        <label className="text-sm ">*Cost Price</label>
                        <input className="h-10 w-[280px] pdinput" value={costPrice} onChange={(e)=>setCostPrice(e.target.value)} type="text" placeholder="Item name" />
                    </div>
                    <div className="prodinput">
                        <label className="text-sm ">*Sale Price</label>
                        <input className="h-10 w-[280px] pdinput" type="text" value={salePrice} onChange={(e)=>setSalePrice(e.target.value)} placeholder="Item name" />
                    </div>
                    <div className="prodinput">
                        <label className="text-sm ">*Product Category</label>
                        <select className="h-10 w-[280px] pdinput" value={catgory} onChange={(e)=>setCategory(e.target.value)}>
                            <option>Select category</option>
                            <option>Electronic</option>
                            <option>Beverage</option>
                            <option>Clothing</option>
                            <option>Automobile</option>
                            <option>Space</option>
                            <option>Edible</option>
                        </select>

                    </div>

                    <button className="text-[#fff] text-xl border-2 ml-[100px] bg-[#f0666a] w-[180px] h-[50px] justify-center" style={{
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        outline: 'none',
                    }} onClick={addprod}> Add To Product</button>

                </div>

            </form>
        </div>
    )
}
const mapStateToProps = (state) => ({
accepted: state.AddProduct.accepted,
 Addproduct: state.AddProduct.product,
})

AddProduct.propTypes = {
    props: PropTypes.object,
    register: PropTypes.func
}

export default connect(mapStateToProps,{addproduct})(AddProduct)
