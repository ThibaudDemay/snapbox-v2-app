import { createStore } from "vuex";

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
  },
});
