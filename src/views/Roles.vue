<template>
  <div class="page-content">
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加<i class="el-icon-upload el-icon--right"></i
    ></el-button>
    <el-table :data="roleArr" style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <router-link :to="'/roles/index/' + scope.row.id">
            <el-button type="text">编辑</el-button>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            style="color:#f56c6c;"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="创建角色"
      :visible.sync="dialogFormVisible"
      :before-close="delData"
    >
      <el-form :model="rolesData" ref="rolesRef">
        <el-form-item
          label="角色名称"
          label-width="120px"
          prop="name"
          :rules="[
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]"
        >
          <el-input v-model="rolesData.name"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          label-width="120px"
          prop="description"
          :rules="[
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]"
        >
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入角色描述"
            resize="none"
            v-model="rolesData.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delData">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import serviceRole from "@/global/service/role.js";

export default {
  data() {
    return {
      dialogFormVisible: false,
      roleArr: [],
      rolesData: {
        name: "",
        description: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      serviceRole.index().then(res => {
        this.roleArr = res.roles;
      });
    },
    delData() {
      this.rolesData = {
        name: "",
        description: ""
      };
      this.dialogFormVisible = false;
    },
    addRoles() {
      this.$refs["rolesRef"].validate(valid => {
        if (valid) {
          let data = this.rolesData;
          serviceRole.store(data).then(() => {
            this.getData();
            this.delData();
          });
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除吗？")
        .then(() => {
          serviceRole.destroy(row.id).then(() => {
            this.getData();
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped></style>
