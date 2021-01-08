<config>
{
  "style": {
    "w": 600,
    "h": 300,
    "x": 100,
    "y": 100,
  },
}
</config>

<script>
import { init } from 'echarts'
import { computed, onMounted, reactive, ref, toRefs } from 'vue'

export default {
  name: 'Pie',
  setup() {
    const chart = reactive({
      instance: null,
      ref: ref(),
      option: computed(() => {
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' },
              ],
            },
          ],
        }

        return option
      }),
    })

    onMounted(() => {
      chart.instance = init(chart.ref, 'dark', {
        width: 600,
        height: 400,
      })
      chart.instance.setOption(chart.option)
    })

    return {
      ...toRefs(chart),
    }
  },
}
</script>

<template>
  <div ref="ref"></div>
</template>
