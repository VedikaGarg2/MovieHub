import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "ad9e340e2821e5681dab1c671d47a76b",
  },
});

export default apiClient;