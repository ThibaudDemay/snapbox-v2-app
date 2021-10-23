import { MutationTree } from "vuex";
import { useCameraStore } from "./camera";
import { SnapboxPictureState, useSnapboxStore } from "./snapbox";

export interface SocketState {
  isConnected: boolean;
  message: MessageEvent | string;
  reconnectError: boolean;
  heartBeatInterval: number;
  heartBeatTimer: number | NodeJS.Timer | ReturnType<typeof setInterval>;
}

const state: SocketState = {
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
};

const getters = {};
const actions = {};
const mutations: MutationTree<SocketState> | any = {
  // any type use to remove error TS2339 on this.state not exist
  // Connection open
  SOCKET_ONOPEN(state: SocketState, event: Event) {
    console.debug("socket_onopen", event, this);
    this.state.websocket = event.currentTarget;
    state.isConnected = true;
    // When the connection is successful
    // start sending heartbeat messages regularly to avoid being disconnected by the server
    state.heartBeatTimer = window.setInterval(() => {
      const message = "Heartbeat message";
      state.isConnected &&
        this.state.websocket &&
        this.state.websocket.send({
          code: 200,
          msg: message,
        });
    }, state.heartBeatInterval);
  },
  // Connection closed
  SOCKET_ONCLOSE(state: SocketState, event: Event) {
    console.debug("socket_onopen");
    state.isConnected = false;
    // Stop the heartbeat message when the connection is closed
    clearInterval(state.heartBeatTimer as number);
    state.heartBeatTimer = 0;
    console.debug("The line is disconnected: " + new Date());
    console.debug(event);
  },
  // An error occurred
  SOCKET_ONERROR(state: SocketState, event: Event) {
    console.error(state, event);
  },
  // Receive the message sent by the server
  SOCKET_ONMESSAGE(state: SocketState, message: MessageEvent) {
    const cameraStore = useCameraStore();
    const snapboxStore = useSnapboxStore();
    state.message = message;
    const data = JSON.parse(message.data);
    if (data["event"] === "update" && data["type"] == "state") {
      if (data["mutation"] == "camera/setIsConnected") {
        cameraStore.is_connected = data["value"];
      } else if (data["mutation"] == "pictures/newPictures") {
        snapboxStore.addPicture(data["value"] as SnapboxPictureState);
      }
    }
  },
  // Auto reconnect
  SOCKET_RECONNECT(state: SocketState, count: number) {
    console.debug("reconnect...", state, count);
  },
  // Reconnect error
  SOCKET_RECONNECT_ERROR(state: SocketState) {
    state.reconnectError = true;
  },
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
