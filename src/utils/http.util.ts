import axios, { AxiosRequestConfig } from "axios";

const http = (config: AxiosRequestConfig) => axios.create(config);

export default http;
