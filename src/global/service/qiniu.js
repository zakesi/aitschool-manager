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
        let token = qiniuGet.token;
        let domainName = qiniuGet.domain;
        let formData = new FormData();
        formData.append("file", file); // 文件
        formData.append("key", key); // 在七牛存储中的路径
        formData.append("token", token); // token
        axios
          .post(api.QINIU_API, formData, {
            headers: { "Content-Type": "multiple/form-data" }
          })
          .then(res => {
            let imageUrl = domainName + "/" + res.key;
            resolve(imageUrl);
          });
      });
    });
  }
};
export default qiniuService;
