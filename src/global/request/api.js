const PREFIX = "/admin";
const API = {
  carousel: `${PREFIX}/carousel`,
  carouselId: id => `${PREFIX}/carousel/${id}`,
  qiniuToken: `${PREFIX}/qiniu/token`,
  QINIU_API: "https://upload-z2.qiniup.com"
};
export default API;
