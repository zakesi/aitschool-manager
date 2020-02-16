import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const chaptersService = {
  index: function(id) {
    return axios.get(api.chaptersId(id));
  },
  store: function(params) {
    return axios.post(api.chapters, params);
  },
  update: function(id, params) {
    return axios.put(api.chaptersId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.chaptersId(id));
  }
};
export default chaptersService;
