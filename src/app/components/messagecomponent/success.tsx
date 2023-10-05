"use client";
import React from "react";
interface userInfoMessage {
  message: string;
  messagetype: string;
}

interface UseInfoTypeInfo {
  userInfoMessage: userInfoMessage;
}

const SuccessMessageContainer = ({ userInfoMessage }: UseInfoTypeInfo) => {
  // const {message,messagetype}=InfoMessage
  return <div>{userInfoMessage?.message}</div>;
};

export default SuccessMessageContainer;
