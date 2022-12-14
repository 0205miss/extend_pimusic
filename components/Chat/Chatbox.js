import {MdPhotoSizeSelectActual} from "react-icons/md"
import React, { useEffect, useState } from "react";
import {SiAudioboom} from "react-icons/si"
import {FaRegUserCircle} from "react-icons/fa"
import ScrollToBottom from "react-scroll-to-bottom";
import { connect } from "react-redux";
import io from "socket.io-client";


function Chatbox(props) {
   const activeuser = props.isAuthenticated.id
   const Dmuser = props.userInfo.id
   const socket = io.connect("https://msc-a.co");
   const [currentMessage, setCurrentMessage] = useState("");
   const [messageList, setMessageList] = useState([]);


   const sendMessage = async () => {
     
    if (currentMessage !== "") {
      const messageData = {
        activeuser: activeuser,
        Dmuser: Dmuser,
        message: currentMessage,
        activeusername: props.isAuthenticated.username,
        room: props.isAuthenticated.username+'T'+ props.userInfo.username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

   useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  
  console.log("message->listing",messageList)
    
   
   



    return (
        <div>
            <div className="chat-window">
      
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={ props.isAuthenticated.username === messageContent.active ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.active}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="fixed bottom-0">
      <div className="chat-footer border-[2px]">
        <textarea
          type="text"
          value={currentMessage}
          className="w-[26em] border-[2px] "
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        >
          </textarea>
        <button onClick={sendMessage} className="chatbtn">&#9658;</button>
      </div>

      </div>
    </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});

export default connect(mapStateToProps)(Chatbox);