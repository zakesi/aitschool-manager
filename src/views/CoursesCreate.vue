<template>
  <div class="page-content">
    <el-form
      label-position="left"
      label-width="60px"
      :model="coursesData"
      ref="coursesData"
      :rules="coursesRef"
      style="width:400px;"
    >
      <el-form-item label="标题" style="max-width:280px;">
        <el-input v-model="coursesData.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题" style="max-width:280px;">
        <el-input v-model="coursesData.short_name"></el-input>
      </el-form-item>
      <el-form-item label="提示">
        <el-input
          type="textarea"
          resize="none"
          rows="3"
          v-model="coursesData.tips"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          resize="none"
          rows="3"
          v-model="coursesData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action=""
          class="image-uploader"
          :show-file-list="false"
          :before-upload="getImage"
          :http-request="setImage"
        >
          <img
            v-if="coursesData.image_url"
            :src="coursesData.image_url"
            class="image"
          />
          <i v-else class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="addCourses">
          创建
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qiniuAxios from "@/global/service/qiniu.js";
import serviceCourses from "@/global/service/courses.js";

export default {
  data() {
    return {
      coursesData: {
        name: "",
        short_name: "",
        tips: "",
        description: "",
        image_url: ""
      },
      coursesRef: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        tips: [{ required: true, message: "请输入描述", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        image_url: [{ required: true, message: "请输入描述", trigger: "blur" }]
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
        this.coursesData.image_url = res;
      });
    },
    addCourses() {
      let data = this.coursesData;
      this.$refs["coursesData"].validate(valid => {
        if (valid) {
          console.log(data);
          serviceCourses.store(data).then(() => {
            this.$router.push({ path: "/courses" });
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
