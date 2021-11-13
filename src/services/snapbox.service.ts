import {
  SnapboxConfigPutState,
  SnapboxConfigState,
  SnapboxPictureState,
} from "@/store/modules/snapbox";
import { TokenState } from "@/store/modules/user";
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

  putConfig(data: SnapboxConfigPutState, token: string): AxiosPromise<SnapboxConfigState> {
    const options = { headers: { "Authorization": `Bearer ${token}` } };
    return this.axios.put("/config", data, options);
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

  loginUser(username: string, password: string): AxiosPromise<TokenState> {
    const data = { "username": username, "password": password };
    return this.axios.post('/auth/login', data);
  }
}

export default new SnapboxService();
