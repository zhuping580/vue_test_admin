<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="详情" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    console.log(this.$route.query)
  }
}
</script>