<template>
  <div class="page-content">
    <el-form
      label-position="left"
      label-width="80px"
      :model="planData"
      ref="planData"
      :rules="planRef"
    >
      <el-form-item label="名称：" prop="name">
        <el-input v-model="planData.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          type="textarea"
          resize="none"
          rows="3"
          v-model="planData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number
          v-model="planData.sort"
          type="number"
          :min="1"
          :max="10"
          label="排序"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="图片：" prop="image_url">
        <el-upload
          action=""
          class="image-uploader"
          :show-file-list="false"
          :before-upload="getImage"
          :http-request="setImage"
        >
          <el-image
            v-if="planData.image_url"
            :src="planData.image_url"
            class="image"
            fit="cover"
          />
          <i v-else class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addPlan">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qiniuAxios from "@/global/service/qiniu.js";
import servicePlan from "@/global/service/plan.js";

export default {
  data() {
    return {
      planData: {
        name: "",
        description: "",
        sort: 1,
        image_url: ""
      },
      planRef: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        image_url: [{ required: true, message: "请输入描述", trigger: "blur" }],
        sort: [
          { required: true, message: "排序不能为空" },
          { type: "number", message: "排序必须为数字值" }
        ]
      }
    };
  },
  methods: {
    getImage(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    setImage(file) {
      qiniuAxios.setDate(file.file).then(res => {
        this.planData.image_url = res;
      });
    },
    addPlan() {
      this.$refs["planData"].validate(valid => {
        let data = this.planData;
        if (valid) {
          servicePlan.store(data).then(() => {
            this.$router.push({ path: "/plan" });
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: block;
}
.image {
  width: 178px;
  height: 178px;
  display: block;
}
.ql-container {
  height: 280px;
}
.el-icon-plus:before {
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.el-icon-plus {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}
</style>
