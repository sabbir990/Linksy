"use client"

import React, { useEffect } from 'react'
import { socket } from "../socket/socket";

export default function TestSocket() {

    useEffect(() => {

        let cancelled = false;

        const connectSocket = async () => {
            try {
                const tokenRequest = await fetch('/api/socket-token', { method: "POST" });
                const tokenResponse = await tokenRequest.json();

                // console.log(tokenResponse)

                if(!tokenRequest.ok){
                    throw new Error(tokenResponse.message);
                }

                if(cancelled) return;

                socket.auth = {
                    token: tokenResponse.token
                }

                socket.connect();
            } catch (error) {
                console.error("Socket connection setup failed: ", error);
            }
        }

        const handleConnect = () => {
            console.log("Connected to Socket server. ", socket.id);
        }

        const handleConnectError = (error: Error) => {
            console.log("Something went wrong while connecting to socket. ", error)
        }

        const handleDisconnection = (reason: string) => {
            console.log("Connection ruined. ", reason);
        }

        socket.on("connect", handleConnect);
        socket.on("connect_error", handleConnectError);
        socket.on("disconnect", handleDisconnection);

        connectSocket();

        return () => {

            cancelled = true;

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
