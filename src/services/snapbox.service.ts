import {
  SnapboxConfigState,
  SnapboxPictureState,
} from "@/store/modules/snapbox";
import axios, { AxiosInstance, AxiosPromise } from "axios";

class SnapboxService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "/api",
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

  uploadPicture(
    filename: string | string[],
    data: Blob,
    type: string
  ): AxiosPromise<SnapboxPictureState> {
    const options = { headers: { "Content-Type": type } };
    return this.axios.post(`/upload/${filename}`, data, options);
  }
}

export default new SnapboxService();
