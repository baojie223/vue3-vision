<template>
  <div>
    <div id="chart" ref="chart" style="width: 1000px; height:400px; padding: 40px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      mock: {
        target: [
          "201809170001",
          "201809180002",
          "201809180003",
          "201810170001",
          "201810180001",
          "201811270001",
          "201811270002"
        ],
        legend: [
          "201809170001",
          "201809180002",
          "201809180003",
          "201810170001",
          "201810180001",
          "201811270001",
          "201811270002"
        ],
        itemType: "object",
        targetType: "all",
        fixedSeries: true,
        series: [],
        data: [
          ["2019-06-24", "2019-06-25", "201809170001", "5.00%"],
          ["2019-06-25", "2019-06-26", "201809180002", "0.00%"],
          ["2019-06-24", "2019-06-28", "201809180003", "25.00%"],
          ["2019-06-28", "2019-06-29", "201810170001", "0.00%"],
          ["2019-06-29", "2019-06-30", "201810180001", "0.00%"],
          ["2019-06-30", "2019-07-01", "201811270001", "6.67%"],
          ["2019-07-01", "2019-07-03", "201811270002", "6.00%"]
        ],
        startTime: "2019-06-24",
        endTime: "2019-07-01"
      },
      colorPane: [
        '#ff4d4f',
        '#ffc53d',
        '#73d13d',
        '#597ef7',
        '#ff7a45',
        '#ffec3d',
        '#36cfc9',
        '#9254de',
        '#ffa940',
        '#bae637',
        '#40a9ff',
        '#f759ab'
      ],
      deepColorPane: [
        '#f5222d',
        '#faad14',
        '#52c41a',
        '#2f54eb',
        '#fa541c',
        '#fadb14',
        '#13c2c2',
        '#722ed1',
        '#fa8c16',
        '#a0d911',
        '#1890ff',
        '#eb2f96'
      ],
      pointer1: -1,
      pointer2: -1
    };
  },
  mounted() {
    const start = this.mock.data.map((item, i) => {
      return {
        name: item[2],
        value:
          (Date.parse(item[0]) - Date.parse(this.mock.startTime)) / 86400000,
        per: item[3],
        days: (Date.parse(item[1]) - Date.parse(item[0])) / 86400000,
        color: this.colorPane[i]
      };
    });
    const end = this.mock.data.map((item, i) => {
      return {
        name: item[2],
        value: (Date.parse(item[1]) - Date.parse(item[0])) / 86400000,
        per: item[3],
        days: (Date.parse(item[1]) - Date.parse(item[0])) / 86400000,
        color: this.colorPane[i]
      };
    });
    const that = this;
    const option = {
      backgroundColor: "#fff",
      grid: {
        left: 100,
        right: 1,
        top: 40,
        bottom: 60,
        show: false
      },
      tooltip: {
        formatter: function(param) {
          return (
            param.data.name +
            "<br>" +
            "完成度" +
            param.data.per +
            "<br>" +
            "时间" +
            param.data.days
          );
        }
      },
      xAxis: {
        type: "value",
        interval: 1,
        max: 7,
        axisLabel: {
          formatter(value, index) {
            const date = new Date(
              Date.parse(that.mock.startTime) + 86400000 * index
            )
            return that.dateFormat(date, 'yyyy-MM-dd')
          },
          rotate: 30,
          textStyle: {
            fontSize: 10
          }
        }
      },
      yAxis: {
        type: "category",
        data: this.mock.legend
      },
      series: [
        {
          name: "one",
          type: "bar",
          stack: "range",
          itemStyle: {
            normal: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            }
          },
          data: start
        },
        {
          name: "two",
          type: "bar",
          stack: "range",
          label: {
            normal: {
              show: true,
              position: "inside",
              formatter(params) {
                that.pointer += 1
                return params.data.per;
              },
              color: '#595959'
            }
          },
          itemStyle: {
            normal: {
              // barBorderColor: "#40a9ff",
              // color: "#69c0ff",
              // color() {
              //   return that.color[Math.floor(Math.random(0, 1) * 12)]
              // },
              color() {
                that.pointer1 += 1
                return that.colorPane[that.pointer1]
              },
              barBorderRadius: 4
            },
            emphasis: {
              // barBorderColor: "#40a9ff",
              // color: "#40a9ff"
              // color() {
              //   that.pointer2 += 1
              //   console.log(that.pointer2)
              //   return that.deepColorPane[that.pointer2]
              // },
            }
          },
          data: end
        }
      ]
    };
    let myChart = echarts.init(document.getElementById("chart"));
    myChart.setOption(option);
  },
  methods: {
    dateFormat(date, fmt) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
