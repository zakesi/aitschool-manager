import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const carouselService = {
  all: function() {
    return axios.get(api.carousel);
  },
  add: function(params) {
    return axios.post(api.carousel, params);
  },
  enit: function(id, params) {
    return axios.put(api.carouselId(id), params);
  },
  del: function(id) {
    return axios.delete(api.carouselId(id));
  }
};
export default carouselService;
