"use client"

import React, { useEffect } from 'react'
import {socket} from "../socket/socket";

export default function TestSocket() {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("User connected: ", socket.id)
        })

        socket.on("welcome", (data) => {
            console.log(data.message)
        })

        socket.on("connect_error", (error) => {
            console.error(error.message)
        })

        socket.connect();

        return () => {
            socket.off("connect");
            socket.off("welcome");
            socket.off("connect_error");
            socket.disconnect();
        }
    }, [])
    
  return (
    <div>Testing the socket connection</div>
  )
}
