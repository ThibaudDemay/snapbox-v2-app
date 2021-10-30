import { defineStore } from "pinia";

export interface UserState {
  isAuthenticated: boolean;
  token: string;
}

export interface TokenState {
  token: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isAuthenticated: false,
    token: "",
  }),
  actions: {
    logout() {
      this.isAuthenticated = false;
      this.token = "";
    },
  },
});
