import { userInfo } from 'os'
import React from 'react'
import Chatbox from '../Chat/Chatbox'

function ChatBox(props) {

    let chatboxClasses = 'chatbox'
    if (props.showchat) {
        chatboxClasses = 'chatbox open'
    }
    console.log(props.showchat)

    return (
        <div>
            <div onClick={props.clickBack}  className={chatboxClasses}>

                <div className='shadow-lg flex justify-center'>
                     <h2 className='text-sm p-2 font-semibold'>Connected with {props.userInfo.username}</h2>
                     <button className='ml-2 border-[1px] text-[#f04c30] hover:text-white hover:bg-[#f04c30]' onClick={props.toggleEnd}  style={{
                                    borderTopRightRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                    outline: 'none',
                                }} >
                                    <span className='p-2'>End chat</span>
                                    </button>
                </div>


                <Chatbox  userInfo={props.userInfo} />


                </div>
        </div>
    )
}

export default ChatBox
