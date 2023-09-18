import axios from "axios";

class ApiConfig {
  static _URL =
    process.env.REACT_APP_URL_API_PORTAL ||
    "https://6x67a0vgsh.execute-api.us-east-1.amazonaws.com/Stage/v1";

  static request = axios.create({
    baseURL: this._URL
  });

  static getService() {
    return this.request;
  }

  static setAuthorization(token) {
    this.request.defaults.headers.common["Authorization"] = token;
  }
}

export default ApiConfig;
