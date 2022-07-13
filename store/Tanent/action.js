import axios from 'axios'
import { request } from 'http'
import * as type  from  '../actionTypes'


export const addproduct = (Items) =>{
    return async (dispatch) => {
        try{
            dispatch({
                type: type.ADD_PRODUCT
            })
            // Api call

             await axios.get("/sanctum/csrf-cookie")
            const res = await axios.post('/addproduct',{Items})
        } catch(error){
            if(error){
                console.log(error)
            }

        }

    }   
    
}