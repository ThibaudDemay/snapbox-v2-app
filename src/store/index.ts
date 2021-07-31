import { createStore } from "vuex";
import snapbox from "@/store/modules/snapbox";

export interface SocketState {
  isConnected: boolean;
  message: string;
  reconnectError: boolean;
  heartBeatInterval: number;
  heartBeatTimer: number | NodeJS.Timer | ReturnType<typeof setInterval>;
}

export interface RootState {
  socket: SocketState;
  websocket: any;
}

export default createStore<RootState>({
  state: {
    socket: {
      // Connection Status
      isConnected: false,
      // Message content
      message: "",
      // Reconnect error
      reconnectError: false,
      // Heartbeat message sending time
      heartBeatInterval: 50000,
      // Heartbeat timer
      heartBeatTimer: 0,
    },
    websocket: null,
  },
  mutations: {
    // Connection open
    SOCKET_ONOPEN(state, event) {
      console.log("socket_onopen");
      state.websocket = event.currentTarget;
      state.socket.isConnected = true;
      // When the connection is successful, start sending heartbeat messages regularly to avoid being disconnected by the server
      state.socket.heartBeatTimer = window.setInterval(() => {
        const message = "Heartbeat message";
        state.socket.isConnected &&
          state.websocket &&
          state.websocket.sendObj({
            code: 200,
            msg: message,
          });
      }, state.socket.heartBeatInterval);
    },
    // Connection closed
    SOCKET_ONCLOSE(state, event) {
      console.log("socket_onopen");
      state.socket.isConnected = false;
      // Stop the heartbeat message when the connection is closed
      clearInterval(state.socket.heartBeatTimer as number);
      state.socket.heartBeatTimer = 0;
      console.log("The line is disconnected: " + new Date());
      console.log(event);
    },
    // An error occurred
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // Receive the message sent by the server
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // Auto reconnect
    SOCKET_RECONNECT(state, count) {
      console.info("reconnect...", state, count);
    },
    // Reconnect error
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {},
  modules: {
    snapbox,
  },
});
