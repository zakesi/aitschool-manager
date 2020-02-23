<template>
  <div class="page-content">
    <el-form label-position="left" label-width="80px" :model="sectionData">
      <el-form-item
        label="名称"
        prop="name"
        style="max-width:240px;"
        :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
      >
        <el-input
          v-model="sectionData.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-upload
          action=""
          class="image-uploader"
          :show-file-list="false"
          :before-upload="getVideo"
          :http-request="setVideo"
        >
          <video
            v-if="sectionData.video_url"
            :src="sectionData.video_url"
            controls
            class="image"
          />
          <i v-else class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor
          :toolbars="markdownOption"
          v-model="sectionData.content"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editSection">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import serviceSections from "@/global/service/sections.js";
import qiniuAxios from "@/global/service/qiniu.js";
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        // imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true
      },
      sectionData: {
        content: "",
        name: "",
        video_url: ""
      }
    };
  },
  created() {
    serviceSections.show(this.$route.params.id).then(res => {
      this.sectionData = res.Sections;
    });
  },
  methods: {
    getVideo(file) {
      if (["video/mp4"].indexOf(file.type) == -1) {
        //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error("请上传正确的视频格式");
        return false;
      }
    },
    setVideo(file) {
      qiniuAxios.setDate(file.file).then(res => {
        this.sectionData.video_url = res;
      });
    },
    editSection() {
      let data = this.sectionData;
      serviceSections.update(this.$route.params.id, data).then(() => {
        // this.$router.push({ name: "Chapters", params: { id: res.course_id } });
      });
    }
  }
};
</script>

<style scoped lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
}
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
