<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.mb-20 {
  margin-bottom: 20px;
}
.mt-20 {
  margin-top: 20px;
}
</style>
