import { defineStore } from "pinia";

export interface CameraState {
  is_connected: boolean;
}

export const useCameraStore = defineStore("camera", {
  state: (): CameraState => ({
    is_connected: false,
  }),
});
