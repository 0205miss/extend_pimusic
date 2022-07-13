import React from 'react'
import Chatbox from '../Chat/Chatbox'

function ChatBox(props) {

    let chatboxClasses = 'chatbox'
    if (props.showchat) {
        chatboxClasses = 'chatbox open'
    }

    return (
        <div>
            <div onClick={props.clickBack}  className={chatboxClasses}>

                <div className='shadow-lg'>
                     <h2 className='text-2xl p-2'>with the user chatting with</h2>
                </div>


                <Chatbox />


                </div>
        </div>
    )
}

export default ChatBox
