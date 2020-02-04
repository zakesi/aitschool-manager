import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const carouselService = {
  index: function() {
    return axios.get(api.carousel);
  },
  store: function(params) {
    return axios.post(api.carousel, params);
  },
  update: function(id, params) {
    return axios.put(api.carouselId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.carouselId(id));
  }
};
export default carouselService;
