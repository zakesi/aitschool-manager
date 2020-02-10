import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const planService = {
  index: function() {
    return axios.get(api.plan);
  },
  show: function(id) {
    return axios.get(api.planId(id));
  },
  store: function(params) {
    return axios.post(api.plan, params);
  },
  update: function(id, params) {
    return axios.put(api.planId(id), params);
  },
  destroy: function(id) {
    return axios.delete(api.planId(id));
  }
};
export default planService;
