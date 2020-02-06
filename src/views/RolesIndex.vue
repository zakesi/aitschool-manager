<template>
  <div class="page-content" style="padding: 30px;">
    <el-form
      label-position="left"
      style="max-width:500px;"
      label-width="140px"
      ref="rolesData"
      :model="rolesData"
    >
      <el-form-item
        label="名称"
        prop="name"
        :rules="[
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]"
      >
        <el-input v-show="editShow" v-model="rolesData.name"></el-input>
        <span v-show="!editShow">{{ rolesData.name }}</span>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
        :rules="[
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]"
      >
        <el-input
          v-show="editShow"
          type="textarea"
          rows="3"
          resize="none"
          placeholder="请输入描述"
          v-model="rolesData.description"
        ></el-input>
        <span v-show="!editShow">{{
          rolesData.description ? rolesData.description : "暂无描述"
        }}</span>
      </el-form-item>
      <el-form-item
        v-for="item in permissionsArr"
        :key="item.id"
        :label="item.name"
      >
        <el-checkbox-group v-model="chooseList">
          <el-checkbox
            v-for="items in item.children"
            :key="items.id"
            :label="items.id"
            :disabled="!editShow"
            >{{ items.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-show="!editShow" label="编辑">
        <el-switch v-model="editShow"> </el-switch>
      </el-form-item>
      <el-form-item v-show="editShow">
        <el-button type="primary" @click="editData">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import servicePermissions from "@/global/service/permissions.js";
import serviceRole from "@/global/service/role.js";

export default {
  data() {
    return {
      editShow: false,
      rolesData: {},
      permissionsArr: [],
      chooseList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      servicePermissions.index().then(res => {
        this.permissionsArr = res.permissions;
      });
      servicePermissions.getPermissions(id).then(res => {
        this.rolesData = res.roles;
        this.chooseList = res.permissions;
      });
    },
    editData() {
      this.$refs["rolesData"].validate(valid => {
        if (valid) {
          this.editRoles();
        }
      });
    },
    editRoles() {
      let id = this.$route.params.id;
      let rolesData = this.rolesData;
      serviceRole.update(id, rolesData).then(() => {
        this.editPermissions();
      });
    },
    editPermissions() {
      let id = this.$route.params.id;
      let permissions = this.chooseList;
      servicePermissions.updatePermissions(id, { permissions }).then(() => {
        this.editShow = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page-content {
  padding: 30px;
}
.permissions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .permissions-header-title {
    font-weight: 600;
  }
}
</style>
