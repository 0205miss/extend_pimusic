import React from 'react'
import Product, {  } from "../Card/Product";

function AllProduct() {
  return (
    <div>

      <div className="md:mx-10 mx-4">
        <h1>Popular</h1>

        <div className="grid grid-cols-2 space-x-4 space-y-2 md:grid-cols-4  ">
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>

        </div>
      </div>
      
    </div>
  )
}

export default AllProduct
