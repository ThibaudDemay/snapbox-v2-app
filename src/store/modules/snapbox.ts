import { useUserStore } from './user';
import SnapboxService from "@/services/snapbox.service";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

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
  countdown_min: number;
  countdown_max: number;
  preview: boolean;
}

export interface SnapboxConfigPutState {
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
  picture: SnapboxPictureState | null;
  pictures: Array<SnapboxPictureState>;
}

export const useSnapboxStore = defineStore("snapbox", {
  state: (): SnapboxState => ({
    config: {} as SnapboxConfigState,
    picture: null,
    pictures: [] as Array<SnapboxPictureState>,
  }),
  actions: {
    getAllConfig(): void {
      SnapboxService.getConfig()
        .then((result) => {
          this.config = result.data as SnapboxConfigState;
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    saveConfig(): void {
      const userStore = useUserStore();
      const data = {
        countdown: this.config.countdown,
        preview: this.config.preview,
      } as SnapboxConfigPutState
      SnapboxService.putConfig(data, userStore.token)
        .then((result) => {
          this.config = result.data as SnapboxConfigState;
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    getAllPictures(): void {
      SnapboxService.getPictures()
        .then((result) => {
          this.pictures = result.data as Array<SnapboxPictureState>;
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    getPicture(id: string | string[]): void {
      const router = useRouter();
      SnapboxService.getPicture(id)
        .then((response) => {
          this.picture = response.data as SnapboxPictureState;
        })
        .catch((error) => {
          console.log(error);
          router.push({ name: "HomeAppView" });
        });
    },
    cleanPicture(): void {
      this.picture = null;
    },
    addPicture(picture: SnapboxPictureState): void {
      this.pictures.unshift(picture);
    },
    takeSnap(): void {
      const router = useRouter();
      SnapboxService.takeSnap()
        .then((response) => {
          router.push({
            name: "PictureView",
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          console.log(error);
          router.push({
            name: "HomeAppView",
          });
        });
    },
  },
});
