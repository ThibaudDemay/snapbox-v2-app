import axios, { AxiosInstance } from "axios";

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

  takeSnap() {
    return this.axios.get("/snap");
  }

  getConfig() {
    return this.axios.get("/config");
  }

  getPictures() {
    return this.axios.get("/pictures");
  }

  getPicture(id: string | string[]) {
    return this.axios.get(`/pictures/${id}`);
  }
}

export default new SnapboxService();
