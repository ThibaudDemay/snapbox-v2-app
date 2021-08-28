import {
  SnapboxConfigState,
  SnapboxPictureState,
} from "@/store/modules/snapbox";
import axios, { AxiosInstance, AxiosPromise } from "axios";

class SnapboxService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "http://127.0.0.1:12700",
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  takeSnap(): AxiosPromise<SnapboxPictureState> {
    return this.axios.get("/snap");
  }

  getConfig(): AxiosPromise<SnapboxConfigState> {
    return this.axios.get("/config");
  }

  getPictures(): AxiosPromise<Array<SnapboxPictureState>> {
    return this.axios.get("/pictures");
  }

  getPicture(id: string | string[]): AxiosPromise<SnapboxPictureState> {
    return this.axios.get(`/pictures/${id}`);
  }
}

export default new SnapboxService();
