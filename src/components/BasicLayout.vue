<template>
  <div class="page-wrapper">
    <Sider class="page-sider" />
    <div class="page-mainer">
      <Header class="page-header" />
      <div class="page-body">
        <router-view></router-view>
      </div>
      <Footer class="page-footer" />
    </div>
  </div>
</template>

<script>
import Header from "./BasicLayoutHeader.vue";
import Footer from "./BasicLayoutFooter.vue";
import Sider from "./BasicLayoutSider.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    Sider
  }
};
</script>

<style type="text/css" lang="less">
.page-wrapper {
  height: 100vh;
  background-color: #fff;
  display: flex;
}

.page-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  .page-header {
    flex: none;
  }
  .page-body {
    flex: 1;
    padding: 20px;
    display: flex;
    .page-content {
      flex: 1;
      padding: 10px;
      background-color: #fff;
    }
  }
}
</style>
