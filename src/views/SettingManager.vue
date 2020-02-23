<template>
  <div class="page-content">
    <router-link :to="{ name: 'SettingManagerCreate' }">
      <el-button
        size="medium"
        type="primary"
        plain
        @click="dialogFormVisible = true"
        >添加管理员</el-button
      >
    </router-link>
    <el-table class="mt-20" :data="managerArr">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="roles_name" label="角色"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" align="right">
          <router-link :to="`/setting/manager/${scope.row.id}/edit`">
            <el-button type="text" size="small">
              编辑
            </el-button>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click.native.prevent="delManager(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import serviceManager from "@/global/service/manager.js";

export default {
  data() {
    return {
      managerArr: []
    };
  },
  created() {
    serviceManager.index().then(res => {
      this.managerArr = res.ManagerArr;
    });
  },
  methods: {
    delManager(index, row) {
      this.$confirm("确认删除吗？")
        .then(() => {
          serviceManager.destroy(row.id).then(() => {
            this.managerArr.splice(index, 1);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped></style>
