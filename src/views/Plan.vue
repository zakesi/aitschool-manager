<template>
  <div class="page-content">
    <router-link to="/plan/create">
      <el-button type="primary" size="mini">
        创建
      </el-button>
    </router-link>
    <el-table :data="planData" style="width: 100%">
      <el-table-column label="id" prop="id" width="80px;"></el-table-column>
      <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`/plan/edit/${scope.row.id}`">
            <el-button type="text">编辑</el-button>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link :to="`/plan/${scope.row.id}/details`">
            <el-button type="text">详情</el-button>
          </router-link>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            style="color:#f56c6c;"
            @click="delPlan(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import servicePlan from "@/global/service/plan.js";

export default {
  data() {
    return {
      planData: []
    };
  },
  created() {
    servicePlan.index().then(res => {
      this.planData = res.plans;
    });
  },
  methods: {
    delPlan(index, row) {
      this.$confirm("确认删除?")
        .then(() => {
          servicePlan.destroy(row.id).then(() => {
            this.planData.splice(index, 1);
          });
        })
        .catch(() => {});
    }
  }
};
</script>
