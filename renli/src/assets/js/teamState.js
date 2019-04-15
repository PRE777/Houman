import echarts from 'echarts'

var colors = ['rgb(0, 162, 221)', 'rgb(0, 200, 236)', 'rgb(38, 230, 230)', 'rgb(135, 238, 185)', 'rgb(255, 222, 78)', 'rgb(255, 150, 119)', 'rgb(255, 86, 141)', 'rgb(142, 102, 237)', 'rgb(146, 187, 255)', 'rgb(195, 145, 190)', 'rgb(70, 138, 231)', 'rgb(58, 162, 196)', 'rgb(58, 196, 175)', 'rgb(231, 222, 70)', 'rgb(231, 180, 70)', 'rgb(231, 119, 70)'];

export function configureChartsInfo() {
  // 学历构成 （饼状图 + 柱状图）
  var educationTitle = "学历构成";
  var educationCategoryData = ['博士后', '博士', '硕士', '本科', '大专', '高中', '中专'];
  var educationData = [{
    value: 800,
    name: '博士后'
  },
  {
    value: 1200,
    name: '博士'
  },
  {
    value: 2000,
    name: '硕士'
  },
  {
    value: 5000,
    name: '本科'
  },
  {
    value: 3500,
    name: '大专'
  },
  {
    value: 2000,
    name: '高中'
  },
  {
    value: 4000,
    name: '中专'
  }];
  var educationValues = [800, 1200, 2000, 5000, 3500, 2000, 4000];
  configurePieInfo(educationTitle, ' - 饼状图', educationCategoryData, educationData, 'education-compose1');
  configureBarInfo(educationTitle, '- 柱状图', educationCategoryData, educationValues, 'education-compose2');

  // 年龄构成 （玫瑰图 + 柱状图）
  var agesTitle = "年龄构成";
  var agesLegend = ["20-30岁", "30-40岁", "40-50岁", "50-60岁", "60-70岁"];
  var agesData = [
    {
      value: 4500,
      name: '20-30岁'
    },
    {
      value: 3200,
      name: '30-40岁'
    },
    {
      value: 3100,
      name: '40-50岁'
    },
    {
      value: 2800,
      name: '50-60岁'
    },
    {
      value: 2200,
      name: '60-70岁'
    }];
  var agesValue = [4500, 3200, 3100, 2800, 2200];
  configureRoseInfo(agesTitle, ' - 玫瑰图', agesLegend, agesData, 'ages-compose1');
  configureBarInfo(agesTitle, ' - 柱状图', agesLegend, agesValue, 'ages-compose2')

  // 职级构成 （玫瑰图 + 金字塔）
  var professionTitle = "职级构成";
  var professionLengends = ['军委领导', '战区职', '军职', '师职', '团职', '营职', '连职', '排职', '部职', '局职', '处职', '科职', '一级科员', '二级科员', '办事员'].reverse();
  var professionData = [{
    value: 120,
    name: '军委领导'
  },
  {
    value: 170,
    name: '战区职'
  },
  {
    value: 210,
    name: '军职'
  },
  {
    value: 250,
    name: '师职'
  },
  {
    value: 300,
    name: '团职'
  },
  {
    value: 350,
    name: '营职'
  },
  {
    value: 410,
    name: '连职'
  },
  {
    value: 560,
    name: '排职'
  },
  {
    value: 720,
    name: '部职'
  },
  {
    value: 830,
    name: '局职'
  },
  {
    value: 2300,
    name: '处职'
  },
  {
    value: 4600,
    name: '科职'
  },
  {
    value: 7900,
    name: '一级科员'
  },
  {
    value: 9300,
    name: '二级科员'
  },
  {
    value: 11100,
    name: '办事员'
  }].reverse();
  configureRoseInfo(professionTitle, ' - 玫瑰图', professionLengends, professionData, 'profession-compose1');
  configureStackBarInfo(professionTitle, ' - 堆叠条形图', professionLengends, professionData, 'profession-compose2')

  // 专业技术干部职级构成 (玫瑰图 + 金字塔）
  var professionLeaderTitle = "专业技术干部职级构成";
  var professionLeaderLengends = ['文职特级', '文职一级', '文职二级', '文职三级', '文职四级', '文职五级', '文职六级', '文职七级', '文职八级', '文职九级', '无军衔文职级'].reverse();
  var professionLeaderData = [
    {
      value: 183,
      name: '文职特级'
    },
    {
      value: 225,
      name: '文职一级'
    },
    {
      value: 276,
      name: '文职二级'
    },
    {
      value: 329,
      name: '文职三级'
    },
    {
      value: 372,
      name: '文职四级'
    },
    {
      value: 427,
      name: '文职五级'
    },
    {
      value: 589,
      name: '文职六级'
    },
    {
      value: 798,
      name: '文职七级'
    },
    {
      value: 927,
      name: '文职八级'
    },
    {
      value: 2728,
      name: '文职九级'
    },
    {
      value: 2434,
      name: '无军衔文职级'
    },
  ].reverse();
  configureRoseInfo(professionLeaderTitle, ' - 玫瑰图', professionLeaderLengends, professionLeaderData, 'profession-leader-compose1');
  configureStackBarInfo(professionLeaderTitle, ' - 堆叠条形图', professionLeaderLengends, professionLeaderData, 'profession-leader-compose2')
  
  // 技术职务情况 （玫瑰图 + 堆叠条形图）
  var skillTitle = "技术职务情况";
  var skillLengends = ['高等教育', '中专、初等教育', '科学研究', '实验', '工程技术', '卫生技术', '艺术', '新闻', '出版', '翻译', '体育教练', '会（审、统）计', '农林牧', '图文档案', '经济', '播音', '电影', '司法', '海关', '船舶技术', '民航技术', '其他技术'];
  var skillData = [
    {
      value: 117,
      name: '高等教育'
    },
    {
      value: 225,
      name: '中专、初等教育'
    },
    {
      value: 276,
      name: '科学研究'
    },
    {
      value: 329,
      name: '实验'
    },
    {
      value: 372,
      name: '工程技术'
    },
    {
      value: 427,
      name: '卫生技术'
    },
    {
      value: 589,
      name: '艺术'
    },
    {
      value: 798,
      name: '新闻'
    },
    {
      value: 927,
      name: '出版'
    },
    {
      value: 728,
      name: '翻译'
    },
    {
      value: 434,
      name: '体育教练'
    },
    {
      value: 527,
      name: '会（审、统）计'
    },
    {
      value: 628,
      name: '农林牧'
    },
    {
      value: 234,
      name: '图文档案'
    },
    {
      value: 441,
      name: '经济'
    },
    {
      value: 290,
      name: '播音'
    },
    {
      value: 124,
      name: '电影'
    },
    {
      value: 510,
      name: '司法'
    },
    {
      value: 120,
      name: '海关'
    },
    {
      value: 670,
      name: '船舶技术'
    },
    {
      value: 820,
      name: '民航技术'
    },
    {
      value: 1130,
      name: '其他技术'
    }
  ];
  configureRoseInfo(skillTitle, ' - 玫瑰图', skillLengends, skillData, 'skill-profession-info1');
  configureStackBarInfo(skillTitle, ' - 堆叠条形图', skillLengends, skillData.reverse(), 'skill-profession-info2')
}

// 饼状图
function configurePieInfo(title, subTitle, lengends, data, elementID) {
  var ele = document.getElementById(elementID);
  var myChart = echarts.init(ele);

  var option = {
    color: colors,
    title: {
      top: '20px',
      left: '10px',
      text: title,
      subtext: subTitle
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c}人 ({d}%)"
    },
    legend: {
      x: 'center',
      bottom: '10%',
      data: lengends
    },
    series: [{
      name: title,
      type: 'pie',
      radius: ['15%', '35%'],
      center: ['50%', '45%'],
      left: '3%',
      right: '3%',
      top: '10%',
      bottom: '10%',
      label: {
        normal: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c} 人  {per|{d}%}  ',
          backgroundColor: '#fff',
          borderColor: '#dfdfdf',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: colors[0],
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: colors[0],
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      data: data
    }]
  };
  myChart.setOption(option);
}

// 柱状图
function configureBarInfo(title, subTitle, lengends, data, elementID) {
  var ele = document.getElementById(elementID);
  var myChart = echarts.init(ele);

  var option = {
    color: colors,
    title: {
      top: '20px',
      left: '10px',
      text: title,
      subtext: subTitle
    },
    legend: {
      x: 'center',
      top: '70px',
      data: lengends
    },
    xAxis: {
      type: 'category',
      data: lengends
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data,
      type: 'bar'
    }],
    grid: [{
      left: '10%',
      right: '3%',
      top: '20%',
      bottom: '10%',
    }]
  };

  myChart.setOption(option);

}

// 玫瑰图
function configureRoseInfo(title, subTitle, lengends, roseData, elementID) {
  var ele = document.getElementById(elementID);
  var myChart = echarts.init(ele);
  var option = {
    color: colors,
    title: {
      top: '20px',
      x: '10px',
      text: title,
      subtext: subTitle
    },
    color: colors,
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} 人 ({d}%)"
    },
    legend: {
      x: 'center',
      bottom: '10%',
      data: lengends
    },
    calculable: true,
    series: [{
      name: title,
      type: 'pie',
      radius: [0, '50%'],
      center: ['50%', '45%'],
      roseType: 'area',
      data: roseData
    }]
  };

  myChart.setOption(option);
}

// 堆叠条状图
function configureStackBarInfo(title, subTitle, yData, xData, elementID) {
  var ele = document.getElementById(elementID);
  var myChart = echarts.init(ele);

  var option = {
    color: colors,
    title: {
      top: '20px',
      left: '10px',
      text: title,
      subtext: subTitle
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
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
        name: title,
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false,
            position: 'insideRight'
          }
        },
        data: xData
      }
    ]
  };

  myChart.setOption(option);
}

