"use client";
import React from "react";
import "./styles.scss"

interface userInfoMessage {
  message: string;
  messagetype: string;
}

interface UseInfoTypeInfo {
  userInfoMessage: userInfoMessage;
}

const SuccessMessageContainer = ({ userInfoMessage }: UseInfoTypeInfo) => {
  // const {message,messagetype}=InfoMessage
  return <div className={`messageContainer `}>
  <p className="messageContainer_success">{userInfoMessage?.message}</p>
</div>
};

export default SuccessMessageContainer;
