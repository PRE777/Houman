import echarts from 'echarts'

var colors = ['rgb(0, 162, 221)', 'rgb(0, 200, 236)', 'rgb(38, 230, 230)', 'rgb(135, 238, 185)', 'rgb(255, 222, 78)', 'rgb(255, 150, 119)', 'rgb(255, 86, 141)', 'rgb(142, 102, 237)', 'rgb(146, 187, 255)', 'rgb(195, 145, 190)', 'rgb(70, 138, 231)', 'rgb(58, 162, 196)', 'rgb(58, 196, 175)', 'rgb(231, 222, 70)', 'rgb(231, 180, 70)', 'rgb(231, 119, 70)'];

export function configureLeaderSurpass(category1, data1, category2, data2, category3, data3) {
    configureHorizontalBar(colors[0], '1类干部岗位超编情况统计', category1, data1, 'leader1');
    configureHorizontalBar(colors[1], '2类干部岗位超编情况统计', category2, data2, 'leader2');
    configureHorizontalBar(colors[2], '3类干部岗位超编情况统计', category3, data3, 'leader3');
}

// - 领导岗位超配 （横向柱状图 - 带总量统计）
function configureHorizontalBar(color, title, category, data, elementID) {
    var ele = document.getElementById(elementID);
    var myChart = echarts.init(ele);

    var option = {
        color: color,
        title: {
            top: '15px',
            left: '10px',
            text: title,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '10%',
            bottom: '10%',
            left: '3%',
            right: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: category
        },
        series: [
            {
                name: '超编人数',
                type: 'bar',
                data: data
            }
        ]
    };

    myChart.setOption(option);
}

// - 超缺失衡表格 (带警示)
export function configureTableInfo(tableData) {
    var table = document.getElementById('surpass-lack-table');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    for (var m = 0; m < tableData.length; m++) {
        var row = table.insertRow();
        for (var n = 0; n < tableData[m].length; n++) {
            var td = row.insertCell();
            td.innerHTML = tableData[m][n];
            var count = tableData[m].length;
            if ((n == count - 2 || n == count - 1) && tableData[m][n] != 0 && m != 0) {
                // td.innerHTML = tableData[m][n] + '⚠️';
                td.style.color = 'red';
                td.style.fontSize = '20px';
                td.style.fontWeight = 700;
                row.style.border = '2px dashed red';
            }
        }
    }
}