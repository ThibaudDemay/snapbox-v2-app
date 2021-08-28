import { MutationTree } from "vuex";

export interface CameraState {
  is_connected: boolean;
}

const state: CameraState = {
  is_connected: false,
};

const getters = {};
const actions = {};

const mutations: MutationTree<CameraState> = {
  setIsConnected(state: CameraState, is_connected: boolean): void {
    state.is_connected = is_connected;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
