import SnapboxService from "@/services/snapbox.service";
import { ActionTree, MutationTree } from "vuex";
import { RootState } from "@/store";

export interface SnapboxConfigPathState {
  sto_path: string;
  pics_path: string;
  thumb_path: string;
  ext_path: string;
}

export interface SnapboxConfigStoUsageState {
  total: number;
  used: number;
  free: number;
}

export interface SnapboxConfigState {
  path: SnapboxConfigPathState;
  sto_usage: SnapboxConfigStoUsageState;
  pics_count: number;
  exts_count: number;
  camera_state: boolean;
  camera_model: string;
  countdown: number;
  preview: boolean;
}

export interface SnapboxPictureState {
  name: string;
  id: number;
  date: string;
  path: string;
  thumbnail_path: string;
}

export interface SnapboxState {
  config: SnapboxConfigState;
  pictures: Array<SnapboxPictureState>;
}

const state = {
  config: {},
  pictures: Array<SnapboxPictureState>(),
};

const getters = {};

const actions: ActionTree<SnapboxState, RootState> = {
  getAllConfig(store): void {
    SnapboxService.getConfig()
      .then((result) => {
        store.commit("setConfig", result.data);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
  getAllPictures(store): void {
    SnapboxService.getPictures()
      .then((result) => {
        store.commit("setPictures", result.data);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
};

const mutations: MutationTree<SnapboxState> = {
  setConfig(state, config: SnapboxConfigState): void {
    state.config = config;
  },
  setPictures(state, pictures: []): void {
    state.pictures = pictures;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
