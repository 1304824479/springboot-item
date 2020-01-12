var iroadEcharts={
    color: [
        "#4d7efa",
        "#fb7d7e",
        "#2fc79c",
        "#fdcd56",
        "#e8eaf2",
        "#e1e7fe",
        "#dadeec",
        "#cdd6fc"
    ],
    color2: [
        "#e8eaf2",
        "#e1e7fe",
        "#dadeec",
        "#cdd6fc",
        "#4d7efa",
        "#fb7d7e",
        "#2fc79c",
        "#fdcd56"
    ],
    color3: [
        "#4d7efa",
        "#2fc79c",
        "#fdcd56",
        "#5f6379",
        "#8baffb",
        "#fb7d7e",
        "#2fc79c",
        "#fdcd56"
    ],
      getOptions:function (title) {
          var option = {
              color:iroadEcharts.color,
              title: {
                  text: title,
                  left:20,
                  top:20,
                  textStyle:{
                      color:'#000'
                  }
              },
              grid:{
                  bottom:100,
                  top:100,
                  left:100,
                  right:100
              },
              tooltip: {
                  trigger: 'item',
                  position:'top'
              },
              legend: {
                  bottom:30,
                  left:80,
                  textStyle:{
                      fontSize:16,
                      color:'#000',
                      fontFamily:'微软雅黑'
                  },
                  orient:'horizontal',
                  icon: 'circle',
                  itemGap:30
              },
              toolbox: {
                  show: true,
                  feature: {
                      saveAsImage: {show: true}
                  },
                  right:30,
                  bottom:25
              },
              xAxis: {
                  type: 'category',
                  boundaryGap:  ['20%', '20%'],
                  data: [],
                  axisLine:{
                      show:false
                  },
                  axisTick:{
                      show:false
                  }
              },
              yAxis: {
                  type: 'value',
                  axisLine:{
                      show:false
                  },
                  axisTick:{
                      show:false
                  }
              },
              series: [
               ]
          };
          return option;
      },
    getOptions2:function (title) {
        var option = {
            color: iroadEcharts.color2,
            title: {
                text: title,
                left:20,
                top:20,
                textStyle:{
                    color:'#000'
                }
            },
            tooltip: {
                trigger: 'item',
                position:'top'

            },
            grid: {
                bottom:100,
                top:100,
                left:100,
                right:100
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {show: true}
                },
                right:30,
                bottom:25
            },
            legend: [
                {
                    data:[],
                    bottom:40,
                    left:80,
                    icon: 'circle',
                    orient:'horizontal',
                    itemGap:70
                },
                {
                    data:[],
                    bottom:5,
                    left:80,
                    orient:'horizontal',
                    itemGap:50
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: [],
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    position: 'left',
                    axisLine: {
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel: {
                        formatter: '{value} 万'
                    }
                },
                {
                    type: 'value',
                    position: 'right',
                    axisLine: {
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
            ]
        };
        return option;
    },
    getOptions3:function (title) {
        var option  = {
            color: iroadEcharts.color3,
            title: {
                text: title,
                left:20,
                top:20,
                textStyle:{
                    color:'#000'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom:30,
                left:80,
                icon: 'circle',
                itemGap:30
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: [120, 150],
                    center: [200, 250],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                    ]
                },
                {
                    name:'',
                    type:'pie',
                    radius: [90, 110],
                    center: [680, 250],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                    ]
                }
            ]
        };
        return option;
    }
};