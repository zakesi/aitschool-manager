<template>
  <div class="page-content">
    <el-form
      label-position="left"
      label-width="50px"
      :model="pathData"
      ref="pathData"
      :rules="pathRef"
      style="width:300px;"
    >
      <el-form-item label="名称">
        <el-input v-model="pathData.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          resize="none"
          rows="3"
          v-model="pathData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number
          v-model="pathData.sort"
          :min="1"
          :max="10"
          label="排序"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="addPath">
          创建
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import servicePath from "@/global/service/path.js";

export default {
  data() {
    return {
      pathData: {
        name: "",
        description: "",
        sort: ""
      },
      pathRef: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ]
      }
    };
  },
  methods: {
    addPath() {
      this.$refs["pathData"].validate(valid => {
        if (valid) {
          let id = this.$route.params.id;
          let data = this.pathData;
          data.plan_id = Number(id);
          servicePath.store(data).then(() => {
            this.$router.push({ path: `/plan/${id}/details` });
          });
        }
      });
    }
  }
};
</script>
