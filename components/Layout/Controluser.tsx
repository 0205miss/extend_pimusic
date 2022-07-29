import { useState } from "react"
import { SmallSpinnerV } from "../Spinner/Spinnerupload"
import Cookies from 'js-cookie';
import axios from 'axios'
import { NextRouter, useRouter } from "next/router";

 


    function ControlUserAction(props: any){
      const [passcode, setPassCode] = useState('')
      const [msg, setMsg] = useState('')
      const [err, setErr] = useState('')
      const [pinetwork, setPiNetwork] = useState(false)
      const [currrency, setcurrrency] = useState(false)
      const [divclass, setdivclass] = useState("")
      const [payType, setpayType] = useState('')
      const [settingbtn, setSettingbtn] = useState(false)
      const [setbtn, setsetbtn] = useState(false)
      const [successMsg, setsuccessMsg] = useState('')
      const [loadingVal, setloadingVal] = useState(true)

      const router = useRouter();


        console.log(props)
         console.log("here ")
        const completePayment = () => {
            console.log(payType)
            if(payType === ""){ 
             setErr("choose method Payment")
            }else{
             setErr('')
             if(payType === "Pi Network"){
                setPiNetwork(!pinetwork)
                setMsg("insert your passcode on the box below")
                setSettingbtn(!settingbtn)
                console.log(msg)
             }else{
                setcurrrency(!currrency)
                setMsg("insert your passcode on the box below")
                setSettingbtn(!settingbtn)
                setsetbtn(!setbtn)
      
                     setSettingbtn(!settingbtn)

             }
           

        }

        }


         const paywithcu = async() => {

            if(passcode === '') {
              
                setdivclass("insert your passcode on the box below")
  
              }else{
                setdivclass('')
                let data = props.contentInfo
                setsuccessMsg('Processing Payment ....');
                const TOKEN_STORAGE_KEY = 'token';
                const token = Cookies.get(TOKEN_STORAGE_KEY);
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
                const res = await axios.post('/pinetcurrency', data);
                let result =  res.data.data
                console.log("nicceeeee", result)
                 if(res.status === 200){
                    if(result === 1)
                    setsuccessMsg("You can pay for a content you own !");
                    router.push("/transaction")
                    
                 }else if(result === 2){
                   console.log('kkkkkkkklkkkkk')
                    setsuccessMsg("Payment completed successfully");
                    router.push("/transaction")
                 }
              }


         }
       

        const onChangeValue = (e) => {
            setpayType(e.target.value)
        }

       

        let continueBtn ;
        let currrencyBtn ;
           if(settingbtn === false){
               continueBtn = <button onClick={completePayment} className=" btnactive  border-2  border-[#f04c30] h-10 rounded-md text-black font-semibold text-sm"  type="button" data-modal-toggle="popup-modal"><span className="mx-2 my-2 ">Continue</span></button>
           }
           if(setbtn){
               currrencyBtn =<button onClick={paywithcu} className=" btnactive  border-2  border-[#f04c30] h-10 rounded-md text-black font-semibold text-sm"  type="button" data-modal-toggle="popup-modal"><span className="mx-2 my-2 ">Pay Now</span></button>
           }
        return (
            <div className='w-full h-[100%] backdrop fixed top-0 bottom-0 left-0'>
                    <div className=' rounded-md bg-white h-[15em] w-[22em] mt-40 ml-6'>
                        <div className="bg-[#f04c30] flex justify-center complete-popup">
                        <h2 className="text-white  text-lg font-semibold">Complete your payment</h2> 
                        </div>
                        <div className="flex justify-center">
                        <h2 className="text-sm text-red-600">{err}</h2>
                        <h2 className="text-sm text-red-600">{divclass}</h2>
                        </div>

                        

                        {
                            successMsg ?
                            <>
                            <div className="mt-10">
                             <div className="flex justify-center">
                            <SmallSpinnerV   show={loadingVal} /> 
                            <h2>{successMsg}</h2>
                            </div> 

                            <div className="flex justify-center pb-2 space-x-4 mt-10">
                           
                         <button onClick={props.backnorm} className=" btnactive  border-2  border-[#f04c30] h-10 rounded-md text-black font-semibold text-sm"  type="button" data-modal-toggle="popup-modal"><span className="mx-2 my-2 ">Decline</span></button>

                         </div>
                         </div>

                            </>
                            :
                            <>
                            <div className="">
                           { 
                            msg !== "" ? 
                            <>
                            {/* <div className="flex">
                            <SmallSpinnerV/> 
                            <h2>Processing Payment...</h2>
                            </div> */}
                            </>
                            :
                            <>
                            <div className='flex justify-center p-4 '>
                              <div onChange={onChangeValue}>
                              <div className="flex" >
                              <input type="radio" className="h-4 w-4 " checked={payType === "Pi Network"}  name="payType" value="Pi Network" />
                                   {/* <input type="radio" className="h-4 w-4 " name="payType" value="Pi Network" checked={payType === "Pi Network"} /> */}
                                   <h2 className="text-sm p-[1px] ml-2 font-semibold">PI Network</h2>
                               </div>
                               <div className="flex mt-2">
                                   <input type="radio" className="h-4 w-4 " checked={payType === "Currrency"}  name="payType" value="Currrency" />
                                   <h2 className="text-sm ml-2 p-[1px] font-semibold ">Currrency</h2>
                               </div>
                              </div>
                         </div>
                            
                            </>  
                           }

                           {
                             pinetwork ?
                             <>
                             <div className="h-10"></div>
                             <div className="p-2">
                                 <p>
                                  Coutinue payment with Pi by logging into your Pi network click <a href="https://minepi.com/"> <span className="text-[#f04c30] font-semibold">Here</span></a> to login?
                                 </p>
                             </div>
                             </>
                             : 
                             <>

                             </>
                           }

                           {
                             currrency ? 
                             <>
                             <div className="h-10"></div>
                             <div className="flex justify-center">
                           <input type="number" placeholder="enter passcode" className="w-[10em] h-8 border-2 border-yellow-500 text-center" onChange={(e) => setPassCode(e.target.value)} />
                           </div>
                           </>
                             :
                             <>
                             </>
                           }
                        <div className="flex justify-center pb-2 space-x-4 mt-2">
                           
                         <button onClick={props.backnorm} className=" btnactive  border-2  border-[#f04c30] h-10 rounded-md text-black font-semibold text-sm"  type="button" data-modal-toggle="popup-modal"><span className="mx-2 my-2 ">Decline</span></button>
                         {continueBtn}
                         { currrencyBtn}

                         </div>

                         </div>
                            </>

                        }



                      
                    </div>
            </div>
        )
    }

            export default ControlUserAction