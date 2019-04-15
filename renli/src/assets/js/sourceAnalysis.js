import echarts from 'echarts'

var colors = ['rgb(0, 162, 221)', 'rgb(0, 200, 236)', 'rgb(38, 230, 230)', 'rgb(135, 238, 185)', 'rgb(255, 222, 78)', 'rgb(255, 150, 119)', 'rgb(255, 86, 141)', 'rgb(142, 102, 237)', 'rgb(146, 187, 255)', 'rgb(195, 145, 190)', 'rgb(70, 138, 231)', 'rgb(58, 162, 196)', 'rgb(58, 196, 175)', 'rgb(231, 222, 70)', 'rgb(231, 180, 70)', 'rgb(231, 119, 70)'];

var myChart;
export function configureSourceAnalysisStatistics() {
    var data = [];
    var lengends = ['高配','其他'];
    var data = [5, 32];
    configurePiesInfo('当前单位及下级单位高配情况统计', lengends, data, 'pies');
}

// - 饼状图 - 高配情况
function configurePiesInfo(title, lengends, data, elementID) {
    var ele = document.getElementById(elementID);
    myChart = echarts.init(ele);

    var option = {
        color: colors,
        title: {
            top: '15px',
            left: '10px',
            text: title,
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            x: 'center',
            bottom: '20px',
            data: lengends
        },
        series: [
            {
                name:'高配统计',
                type:'pie',
                radius: ['0%', '40%'],
                label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}人 {per|{d}%}  ',
                        backgroundColor: '#fff',
                        borderColor: colors[2],
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: colors[0],
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: colors[2],
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 14,
                                lineHeight: 33
                            },
                            per: {
                                color: '#fff',
                                backgroundColor: 'red',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:[
                    {value:data[0], name: lengends[0], selected: true},
                    {value:data[1], name: lengends[1]},
                ]
            }
        ]
    };

    myChart.setOption(option);
}

window.addEventListener("resize", () => {
    if (typeof myChart !== "undefined") {
        myChart.resize();
    }
});
