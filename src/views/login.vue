<template>
  <div class="page-container">
    <div class="page-section">
      <div class="page-content">
        <img class="page-logo" src="~@/assets/logo.png" />
        <div class="page-form_container">
          <el-form
            status-icon
            :rules="passwordRules"
            ref="passwordFrom"
            :model="passwordFrom"
            style="width:340px;"
          >
            <span>账号密码登陆</span>
            <el-form-item prop="phone">
              <el-input
                type="number"
                class="phone-input"
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输手机号"
                autocomplete="off"
                v-model="passwordFrom.phone"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                autocomplete="off"
                show-password
                v-model="passwordFrom.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%;" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import serviceManager from "@/global/service/manager.js";
import storage from "@/global/storage/index.js";

export default {
  data() {
    return {
      passwordFrom: {
        phone: "",
        password: ""
      },
      passwordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    let token = storage.getToken();
    let id = storage.getManagerId();
    let name = storage.getManagerRoles_id();
    let roles_id = storage.getManagerName();
    if (token && id && name && roles_id)
      this.$router.push({ path: "/dashboard" });
  },
  methods: {
    login() {
      let data = this.passwordFrom;
      this.$refs["passwordFrom"].validate(valid => {
        if (valid) {
          serviceManager.login(data).then(res => {
            storage.setToken(res.token);
            storage.setManagerId(res.id);
            storage.setManagerRoles_id(res.roles_id);
            storage.setManagerName(res.name);
            this.$router.push({ path: "/dashboard" });
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.page-container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .page-section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .page-content {
      transform: translateY(-50%);
      text-align: center;
      span {
        display: block;
        font-size: 12px;
        margin-bottom: 6px;
        text-align: left;
        font-weight: 600;
      }
      .page-logo {
        height: 32px;
        margin-bottom: 36px;
      }
      .page-form_container {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
