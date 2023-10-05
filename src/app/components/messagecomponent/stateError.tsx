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

const StateErrorMessageContainer = ({ userInfoMessage }: UseInfoTypeInfo) => {
  // const {message,messagetype}=InfoMessage
  return <div className={`messageContainer ${userInfoMessage.messagetype}`}>
  <p className="messageContainer_error">{userInfoMessage?.message}</p>
</div>;
};

export default StateErrorMessageContainer;
