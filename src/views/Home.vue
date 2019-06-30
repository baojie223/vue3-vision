<template>
  <div class="home">
    <!-- <HelloWorld/> -->
    <Chart/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Chart from '@/components/Chart.vue'

export default {
  name: "home",
  components: {
    HelloWorld,
    Chart
  }
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}
</style>

