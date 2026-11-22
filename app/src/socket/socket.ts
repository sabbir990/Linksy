"use client"

import {io} from "socket.io-client"

export const socket = io(
    process.env.NEXT_PUBLIC_LINKSY_SOCKET_CONNECTION_BASE_URL!,
    {
        autoConnect: false
    }
)
