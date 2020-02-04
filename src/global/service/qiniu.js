import axios from "@/global/request/axios.js";
import api from "@/global/request/api.js";

const qiniuService = {
  getToken: function() {
    return axios.get(api.qiniuToken);
  },
  setDate: function(file) {
    return new Promise(resolve => {
      this.getToken().then(qiniuGet => {
        const key = Date.now() + "_" + file.name;
        // 获取 TOKEN
        const token = qiniuGet.token;
        const domainName = qiniuGet.domain;
        const formData = new FormData();
        formData.append("file", file); // 文件
        formData.append("key", key); // 在七牛存储中的路径
        formData.append("token", token); // token
        axios
          .post(api.qiniu_api, formData, {
            headers: { "Content-Type": "multiple/form-data" }
          })
          .then(res => {
            const imageUrl = domainName + "/" + res.key;
            resolve(imageUrl);
          });
      });
    });
  }
};
export default qiniuService;
