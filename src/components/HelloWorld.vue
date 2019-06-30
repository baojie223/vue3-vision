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
          ["2019-06-27", "2019-06-28", "201809180003", "25.00%"],
          ["2019-06-28", "2019-06-29", "201810170001", "0.00%"],
          ["2019-06-29", "2019-06-30", "201810180001", "0.00%"],
          ["2019-06-30", "2019-07-01", "201811270001", "6.67%"],
          ["2019-07-01", "2019-07-03", "201811270002", "6.00%"]
        ],
        startTime: "2019-06-24",
        endTime: "2019-07-01"
      }
    };
  },
  mounted() {
    // var data = [
    //   { name: '"2018-07-05 18:00:29"', value: ["2018-07-05 18:00:29", 37] },
    //   { name: "2018-07-04 18:00:29", value: ["2018-07-04 18:00:29", 36] },
    //   { name: "2018-07-03 18:00:29", value: ["2018-07-03 18:00:29", 36.5] },
    //   { name: "2018-07-03 12:00:29", value: ["2018-07-03 12:00:29", 36] },
    //   { name: "2018-07-02 18:00:29", value: ["2018-07-02 18:00:29", 37.5] },
    //   { name: "2018-07-01 18:00:29", value: ["2018-07-01 18:00:29", 38] }
    // ];
    // const start = this.mock.data.map(item => {
    //   return {
    //     name: item[0],
    //     value: [item[0], item[2]]
    //   };
    // });
    // const end = this.mock.data.map(item => {
    //   return {
    //     name: item[1],
    //     value: [item[1], item[2]]
    //   };
    // });
    // //时间显示范围
    // const anchor = [
    //   { name: this.mock.startTime, value: [this.mock.startTime, 0] },
    //   { name: this.mock.endTime, value: [this.mock.endTime, 0] }
    // ];
    // // 指定图表的配置项和数据
    // const option = {
    //   backgroundColor: "#fff", //背景色
    //   grid: {
    //     left: 35,
    //     right: 20,
    //     top: 10,
    //     bottom: 40,
    //     show: false
    //   },
    //   tooltip: {
    //     // trigger: 'axis',
    //     formatter: function(param) {
    //       return param.value[0] + "<br>" + param.value[1] + "°C";
    //     }
    //   },
    //   xAxis: {
    //     type: "time",
    //     splitNumber: 10,
    //     axisLabel: {
    //       rotate: 30,
    //       textStyle: {
    //         fontSize: 16
    //       }
    //     }
    //   },
    //   yAxis: {
    //     type: "category"
    //   },
    //   visualMap: {
    //     top: 10,
    //     right: 10,
    //     pieces: [
    //       {
    //         gte: 0,
    //         lte: 37,
    //         color: "#4D74FA"
    //       },
    //       {
    //         gt: 37,
    //         lte: 40,
    //         color: "#FA578B"
    //       }
    //     ],
    //     outOfRange: {
    //       color: "#FA578B"
    //     }
    //     // show : false
    //   },
    //   series: [
    //     // {
    //     //   data: data,
    //     //   type: "bar"
    //     // },
    //     {
    //       name: "辅助",
    //       type: "bar",
    //       stack: "总量",
    //       itemStyle: {
    //         normal: {
    //           barBorderColor: "rgba(0,0,0,0)",
    //           color: "rgba(0,0,0,0)"
    //         },
    //         emphasis: {
    //           barBorderColor: "rgba(0,0,0,0)",
    //           color: "rgba(0,0,0,0)"
    //         }
    //       },
    //       data: start
    //     },
    //     {
    //       name: "生活费",
    //       type: "bar",
    //       stack: "总量",
    //       label: {
    //         normal: {
    //           show: true,
    //           position: "inside"
    //         }
    //       },
    //       data: end
    //     }
    //   ]
    // };
    // var data = [];
    // var dataCount = 10;
    // var categories = this.mock.legend;
    // var types = [
    //   { name: "JS Heap", color: "#7b9ce1" },
    //   { name: "Documents", color: "#bd6d6c" },
    //   { name: "Nodes", color: "#75d874" },
    //   { name: "Listeners", color: "#e0bc78" },
    //   { name: "GPU Memory", color: "#dc77dc" },
    //   { name: "GPU", color: "#72b362" }
    // ];

    // Generate mock data
    // echarts.util.each(categories, function(category, index) {
    //   var baseTime = startTime;
    //   for (var i = 0; i < dataCount; i++) {
    //     var typeItem = types[Math.round(Math.random() * (types.length - 1))];
    //     var duration = Math.round(Math.random() * 10000);
    //     data.push({
    //       name: typeItem.name,
    //       value: [index, baseTime, (baseTime += duration), duration],
    //       itemStyle: {
    //         normal: {
    //           color: typeItem.color
    //         }
    //       }
    //     });
    //     baseTime += Math.round(Math.random() * 2000);
    //   }
    // });

    // this.mock.data.forEach(item => {
    //   data.push({
    //     name: item[2],
    //     value: [item[2], item[0], item[1]],
    //     itemStyle: {
    //       normal: {
    //         color: '#eee'
    //       }
    //     }
    //   })
    // })

    // function renderItem(params, api) {
    //   console.log(params, api)
    //   var categoryIndex = api.value(0);
    //   var start = api.coord([api.value(1), categoryIndex]);
    //   var end = api.coord([api.value(2), categoryIndex]);
    //   var height = api.size([0, 1])[1] * 0.6;

    //   var rectShape = echarts.graphic.clipRectByRect(
    //     {
    //       x: start[0],
    //       y: start[1] - height / 2,
    //       width: end[0] - start[0],
    //       height: height
    //     },
    //     {
    //       x: params.coordSys.x,
    //       y: params.coordSys.y,
    //       width: params.coordSys.width,
    //       height: params.coordSys.height
    //     }
    //   );

    //   return (
    //     rectShape && {
    //       type: "rect",
    //       shape: rectShape,
    //       style: api.style()
    //     }
    //   );
    // }

    // const option = {
    //   tooltip: {
    //     formatter: function(params) {
    //       return params.marker + params.name + ": " + params.value[3] + " ms";
    //     }
    //   },
    //   // dataZoom: [
    //   //   {
    //   //     type: "slider",
    //   //     filterMode: "weakFilter",
    //   //     showDataShadow: false,
    //   //     top: 400,
    //   //     height: 10,
    //   //     borderColor: "transparent",
    //   //     backgroundColor: "#e2e2e2",
    //   //     handleIcon:
    //   //       "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
    //   //     handleSize: 20,
    //   //     handleStyle: {
    //   //       shadowBlur: 6,
    //   //       shadowOffsetX: 1,
    //   //       shadowOffsetY: 2,
    //   //       shadowColor: "#aaa"
    //   //     },
    //   //     labelFormatter: ""
    //   //   },
    //   //   {
    //   //     type: "inside",
    //   //     filterMode: "weakFilter"
    //   //   }
    //   // ],
    //   grid: {
    //     height: 300
    //   },
    //   xAxis: {
    //     min: this.mock.startTime,
    //     max: this.mock.endTime,
    //     // scale: true,
    //     // axisLabel: {
    //     //   formatter: function(val) {
    //     //     return Math.max(0, val - startTime) + " ms";
    //     //   }
    //     // }
    //   },
    //   yAxis: {
    //     data: categories
    //   },
    //   series: [
    //     {
    //       type: "custom",
    //       renderItem: renderItem,
    //       itemStyle: {
    //         normal: {
    //           opacity: 0.8
    //         }
    //       },
    //       encode: {
    //         x: [1, 2],
    //         y: 0
    //       },
    //       data: data
    //     }
    //   ]
    // };
    const option = {
      title: {
        text: "深圳月最低生活费组成（单位:元）",
        subtext: "From ExcelHome",
        sublink: "http://e.weibo.com/1341556070/AjQH99che"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(params) {
          var tar = params[0];
          return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        splitLine: { show: false },
        data: this.mock.legend
      },
      series: [
        {
          name: "辅助",
          type: "bar",
          stack: "总量",
          itemStyle: {
            normal: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(122,122,122,122)"
            },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            }
          },
          data: [100, 300]
        },
        {
          name: "生活费",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "inside"
            }
          },
          data: [300, 700]
        }
      ]
    };
    console.log(document.getElementById("chart"));
    let myChart = echarts.init(document.getElementById("chart"));
    myChart.setOption(option);
  }
};
</script>

<style scoped lang="scss">
</style>
