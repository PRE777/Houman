import echarts from 'echarts'

var colors = ['rgb(0, 162, 221)', 'rgb(0, 200, 236)', 'rgb(38, 230, 230)', 'rgb(135, 238, 185)', 'rgb(255, 222, 78)', 'rgb(255, 150, 119)', 'rgb(255, 86, 141)', 'rgb(142, 102, 237)', 'rgb(146, 187, 255)', 'rgb(195, 145, 190)', 'rgb(70, 138, 231)', 'rgb(58, 162, 196)', 'rgb(58, 196, 175)', 'rgb(231, 222, 70)', 'rgb(231, 180, 70)', 'rgb(231, 119, 70)'];

var myChart;
export function configureHumanResourcesQualityStatistics() {
    // 堆叠条状图可视化行政干部任职情况
    var barsLengends = ['现任职不满1年的', '现任职满1年不满2年的', '现任职满2年不满3年的', '现任职满3年不满4年的', '现任职满4年不满5年的', '现任职5年以上的'];
    var yData = ['副排职', '正排职', '副连职', '正连职', '副营职', '正营职', '副团职', '正团职', '副师职', '正师职', '副军职', '正军职', '副战区职'];
    var xData = [
        [135, 123, 105, 102, 89, 79, 73, 65, 57, 45, 37, 23, 15],
        [519, 433, 349, 297, 234, 191, 163, 147, 135, 87, 68, 59, 35],
        [730, 680, 630, 360, 298, 276, 223, 189, 167, 92, 79, 63, 49],
        [530, 441, 357, 265, 240, 198, 182, 167, 133, 89, 72, 61, 37],
        [545, 437, 343, 272, 247, 203, 187, 169, 135, 87, 69, 57, 36],
        [547, 439, 345, 274, 249, 205, 189, 171, 137, 89, 71, 59, 38],
    ];
    configureStackBarInfo(barsLengends, yData, xData, 'bars');

    // 表格样式可视化行政干部任职情况
    var tableData = [
        ['', '现任职不满1年的', '现任职满1年不满2年的', '现任职满2年不满3年的', '现任职满3年不满4年的', '现任职满4年不满5年的', '现任职5年以上的'],
        ['副战区职', 15, 35, 49, 37, 36, 38],
        ['正军职', 23, 59, 63, 61, 57, 59],
        ['副军职', 37, 68, 79, 72, 69, 71],
        ['正师职', 45, 87, 92, 89, 87, 89],
        ['副师职', 57, 135, 167, 133, 135, 137],
        ['正团职', 65, 147, 189, 167, 169, 171],
        ['副团职', 73, 163, 223, 182, 187, 189],
        ['正营职', 79, 191, 276, 198, 203, 205],
        ['副营职', 89, 234, 298, 240, 247, 249],
        ['正连职', 102, 297, 360, 265, 272, 274],
        ['副连职', 105, 349, 630, 357, 343, 345],
        ['正排职', 123, 433, 680, 441, 437, 439],
        ['副排职', 135, 519, 730, 530, 545, 547]
    ];
    configureTableInfo(tableData, 'tables');
}

// 堆叠条状图
function configureStackBarInfo(lengends, yData, xData, elementID) {
    var ele = document.getElementById(elementID);
    myChart = echarts.init(ele);

    var option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            x: 'center',
            bottom: 0,
            data: lengends
        },
        grid: {
            top: '0',
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: yData
        },
        series: [
            {
                name: lengends[0],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: xData[0]
            },
            {
                name: lengends[1],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: xData[1]
            },
            {
                name: lengends[2],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: xData[2]
            },
            {
                name: lengends[3],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: xData[3]
            },
            {
                name: lengends[4],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: xData[4]
            },
            {
                name: lengends[5],
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: xData[5]
            }
        ]
    };

    myChart.setOption(option);
}

// 表格
function configureTableInfo(tableData, elementID) {
    var container = document.getElementById(elementID);
    var table = document.createElement('table');

    for (var m = 0; m < tableData.length; m++) {
        var row = table.insertRow();
        for (var n = 0; n < tableData[m].length; n++) {
            row.insertCell().innerHTML = tableData[m][n];
        }
    }
    container.appendChild(table);
}

window.addEventListener("resize", () => {
    if (typeof myChart !== "undefined") {
        myChart.resize();
    }
});