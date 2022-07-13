import * as type from '../actionTypes'


const initialState = {
    product: [],
    accepted: false,
}

 const AddProduct = (state = initialState, action) => {
    switch(action.type){
        case type.ADD_PRODUCT:
            return {
                ...state,
                accepted: true,
                product: action.payload,
            }
        default: 
         return state

    }
}



export default AddProduct