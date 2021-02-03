<script>
export default {
  setup() {
    return () => (
      <>
        <router-view></router-view>
        <span class="red">111</span>
      </>
    )
  },
}
</script>

<style scoped lang="less">
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.red {
  color: red;
}
</style>
