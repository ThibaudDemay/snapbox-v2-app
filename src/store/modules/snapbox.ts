import SnapboxService from "@/services/snapbox.service";

const state = {
  config: {},
  pictures: [],
};

const getters = {};

const actions = {
  getAllConfig({ commit }: any): void {
    SnapboxService.getConfig()
      .then((result) => {
        commit("setConfig", result.data);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
  getAllPictures({ commit }: any): void {
    SnapboxService.getPictures()
      .then((result) => {
        commit("setPictures", result.data);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
};

const mutations = {
  setConfig(state: any, config: any): void {
    state.config = config;
  },
  setPictures(state: any, pictures: any): void {
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
