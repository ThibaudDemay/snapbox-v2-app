import { createStore } from "vuex";
import snapbox from "@/store/modules/snapbox";
import camera from "@/store/modules/camera";
import socket from "@/store/modules/socket";

export interface RootState {
  websocket: WebSocket | null;
}

export default createStore<RootState>({
  state: {
    websocket: null,
  },
  mutations: {},
  actions: {},
  modules: {
    socket,
    snapbox,
    camera,
  },
});
