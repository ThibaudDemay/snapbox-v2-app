import { defineStore } from "pinia";

export interface CameraState {
  isConnected: boolean;
}

export const useCameraStore = defineStore("camera", {
  state: (): CameraState => ({
    isConnected: false,
  }),
});
