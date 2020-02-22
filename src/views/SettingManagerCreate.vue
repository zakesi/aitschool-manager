<template>
  <div class="page-content">
    <el-form
      label-position="left"
      label-width="80px"
      :model="managerData"
      ref="managerData"
    >
      <el-form-item
        label="姓名"
        prop="name"
        :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
      >
        <el-input v-model="managerData.name"></el-input>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
        :rules="[
          { required: true, message: '请输入手机号码', trigger: 'change' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ]"
      >
        <el-input v-model.number="managerData.phone"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="{ required: true, message: '请输入密码', trigger: 'blur' }"
      >
        <el-input
          type="password"
          autocomplete
          v-model="managerData.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="角色"
        prop="roles_id"
        :rules="{ required: true, message: '请选择角色', trigger: 'change' }"
      >
        <el-select v-model="managerData.roles_id" placeholder="请选择">
          <el-option
            v-for="item in roleArr"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addManager()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import serviceManager from "@/global/service/manager.js";
import serviceRole from "@/global/service/role.js";

export default {
  data() {
    return {
      roleArr: [],
      managerData: {
        name: "",
        phone: "",
        password: "",
        roles_id: ""
      }
    };
  },
  created() {
    serviceRole.index().then(res => {
      this.roleArr = res.roles;
    });
  },
  methods: {
    addManager() {
      let data = this.managerData;
      this.$refs["managerData"].validate(valid => {
        if (valid) {
          serviceManager.store(data).then(() => {
            this.$router.push({ name: "SettingManager" });
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
