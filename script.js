
// 1. barChart !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const barChart_ctx = document.getElementById("myChart1");
new Chart(barChart_ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});


// 2. delayChart @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
let delayChart_delayed; // 애니메이션 딜레이 변수
const delayChart_DATA_COUNT = 7;
const NUMBER_CFG = { count: delayChart_DATA_COUNT, min: -100, max: 100 };
const delayChart_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; // 월 단위 예시
const delayChart_data = {
  labels: delayChart_labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, -10, 30, -20, 40, -30], // 임의의 데이터 값
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [-30, 40, -20, 50, -10, 60, -5],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'Dataset 3',
      data: [5, -15, 25, -35, 45, -55, 65],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};
// 애니메이션 설정 포함한 차트 구성
const delayChart_config = {
  type: 'bar',
  data: delayChart_data,
  options: {
    animation: {
      onComplete: () => {
        delayChart_delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayChart_delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
};
// 캔버스 요소 가져와서 차트 생성
const delayChart_ctx = document.getElementById("myChart2").getContext("2d");
new Chart(delayChart_ctx, delayChart_config);

// 3. progressiveLineChart ###############################
const progressiveLineChart_totalDuration = 5000;
const progressiveLineChart_delayBetweenPoints = progressiveLineChart_totalDuration / 1000; // data 길이에 맞춘 딜레이 계산

const progressiveLineChart_previousY = (ctx) => 
  ctx.index === 0 
    ? ctx.chart.scales.y.getPixelForValue(100) 
    : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

const progressiveLineChart_animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: progressiveLineChart_delayBetweenPoints,
    from: NaN, // 처음에는 건너뜀
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * progressiveLineChart_delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: progressiveLineChart_delayBetweenPoints,
    from: progressiveLineChart_previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * progressiveLineChart_delayBetweenPoints;
    }
  }
};

// 데이터 초기화
const progressiveLineChart_data = [];
const progressiveLineChart_data2 = [];
let progressiveLineChart_prev = 100;
let progressiveLineChart_prev2 = 80;
for (let i = 0; i < 1000; i++) {
  progressiveLineChart_prev += 5 - Math.random() * 10;
  progressiveLineChart_data.push({ x: i, y: progressiveLineChart_prev });

  progressiveLineChart_prev2 += 5 - Math.random() * 10;
  progressiveLineChart_data2.push({ x: i, y: progressiveLineChart_prev2 });
}

// 차트 설정
const progressiveLineChart_config = {
  type: 'line',
  data: {
    datasets: [
      {
        borderColor: 'rgba(255, 99, 132, 1)', // 빨간색 라인
        borderWidth: 1,
        radius: 0,
        data: progressiveLineChart_data,
      },
      {
        borderColor: 'rgba(54, 162, 235, 1)', // 파란색 라인
        borderWidth: 1,
        radius: 0,
        data: progressiveLineChart_data2,
      }
    ]
  },
  options: {
    animation: progressiveLineChart_animation,
    interaction: {
      intersect: false
    },
    plugins: {
      legend: false
    },
    scales: {
      x: {
        type: 'linear'
      }
    }
  }
};

// 캔버스 요소 가져와서 차트 생성
const progressiveLineChart_ctx = document.getElementById("myChart3").getContext("2d");
new Chart(progressiveLineChart_ctx, progressiveLineChart_config);

// 4. multiAxisLineChart $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const multiAxisLineChart_DATA_COUNT = 7;
const multiAxisLineChart_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; // 월 단위 예시 데이터

// 임의의 랜덤 숫자를 생성하는 함수
const multiAxisLineChart_randomNumbers = (count, min, max) => 
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// 데이터셋 생성
const multiAxisLineChart_data = {
  labels: multiAxisLineChart_labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: multiAxisLineChart_randomNumbers(multiAxisLineChart_DATA_COUNT, -100, 100),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: multiAxisLineChart_randomNumbers(multiAxisLineChart_DATA_COUNT, -100, 100),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      yAxisID: 'y1',
    }
  ]
};

// 차트 설정
const multiAxisLineChart_config = {
  type: 'line',
  data: multiAxisLineChart_data,
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Line Chart - Multi Axis'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // 오른쪽 축의 그리드 라인 숨김
        },
      },
    }
  },
};

// 캔버스 요소 가져와서 차트 생성
const multiAxisLineChart_ctx = document.getElementById("myChart4").getContext("2d");
new Chart(multiAxisLineChart_ctx, multiAxisLineChart_config);

// 5. timeScaleComboChart %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// 데이터 개수 및 범위 설정
const timeScaleComboChart_DATA_COUNT = 7;
const timeScaleComboChart_labels = [];

for (let i = 0; i < timeScaleComboChart_DATA_COUNT; ++i) {
  const date = new Date();
  date.setDate(date.getDate() + i); // 현재 날짜를 기준으로 증가
  timeScaleComboChart_labels.push(date);
}

// 랜덤 숫자를 생성하는 함수
const timeScaleComboChart_randomNumbers = (count, min, max) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// 차트 데이터 설정
const timeScaleComboChart_data = {
  labels: timeScaleComboChart_labels,
  datasets: [
    {
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      data: timeScaleComboChart_randomNumbers(timeScaleComboChart_DATA_COUNT, 0, 100),
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      data: timeScaleComboChart_randomNumbers(timeScaleComboChart_DATA_COUNT, 0, 100),
    },
    {
      type: 'line',
      label: 'Dataset 3',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      data: timeScaleComboChart_randomNumbers(timeScaleComboChart_DATA_COUNT, 0, 100),
    }
  ]
};

// 차트 설정
const timeScaleComboChart_config = {
  type: 'line',
  data: timeScaleComboChart_data,
  options: {
    plugins: {
      title: {
        text: 'Combo Time Scale',
        display: true
      }
    },
    scales: {
      x: {
        type: 'time', // 시간 축 적용
        display: true,
        offset: true,
        ticks: {
          source: 'data'
        },
        time: {
          unit: 'day'
        },
      },
    },
  },
};

// 캔버스 요소 가져와서 차트 생성
const timeScaleComboChart_ctx = document.getElementById("myChart5").getContext("2d");
new Chart(timeScaleComboChart_ctx, timeScaleComboChart_config);

// 6. radarChart ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 랜덤 색상을 반환하는 함수
function radarChart_getLineColor(ctx) {
  const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'];
  return colors[ctx.datasetIndex % colors.length]; // 데이터셋 인덱스에 따라 색상 선택
}

// 데이터 포인트 스타일을 번갈아 변경하는 함수
function radarChart_alternatePointStyles(ctx) {
  const index = ctx.dataIndex;
  return index % 2 === 0 ? 'circle' : 'rect';
}

// 반투명 효과를 적용하는 함수
function radarChart_makeHalfAsOpaque(ctx) {
  return radarChart_getLineColor(ctx).replace('1)', '0.5)'); // 투명도 50% 적용
}

function radarChart_make20PercentOpaque(ctx) {
  return radarChart_getLineColor(ctx).replace('1)', '0.2)'); // 투명도 20% 적용
}

// 데이터 값에 따라 반지름 크기를 조정하는 함수
function radarChart_adjustRadiusBasedOnData(ctx) {
  const v = ctx.parsed.y;
  return v < 10 ? 5
    : v < 25 ? 7
    : v < 50 ? 9
    : v < 75 ? 11
    : 15;
}

// 랜덤 데이터 생성 함수
function radarChart_generateData() {
  return Array.from({ length: radarChart_DATA_COUNT }, () => Math.floor(Math.random() * 101));
}

// 데이터 개수
const radarChart_DATA_COUNT = 7;

// 차트 데이터 설정
const radarChart_data = {
  labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
  datasets: [{
    data: radarChart_generateData(),
    backgroundColor: radarChart_make20PercentOpaque,
    borderColor: radarChart_getLineColor,
  }]
};

// 차트 설정
const radarChart_config = {
  type: 'radar',
  data: radarChart_data,
  options: {
    plugins: {
      legend: false,
      tooltip: false,
    },
    elements: {
      line: {
        backgroundColor: radarChart_make20PercentOpaque,
        borderColor: radarChart_getLineColor,
      },
      point: {
        backgroundColor: radarChart_getLineColor,
        hoverBackgroundColor: radarChart_makeHalfAsOpaque,
        radius: radarChart_adjustRadiusBasedOnData,
        pointStyle: radarChart_alternatePointStyles,
        hoverRadius: 15,
      }
    }
  }
};

// 캔버스 요소 가져와서 차트 생성
const radarChart_ctx = document.getElementById("myChart6").getContext("2d");
new Chart(radarChart_ctx, radarChart_config);

// 7. doughnutChart &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// 랜덤 숫자 생성 함수
const doughnutChart_randomNumbers = (count, min, max) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// 색상 배열
const doughnutChart_COLORS = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'];

// 차트 데이터 설정
const doughnutChart_DATA_COUNT = 5;
const doughnutChart_data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data:doughnutChart_randomNumbers(doughnutChart_DATA_COUNT, 0, 100),
      backgroundColor: doughnutChart_COLORS,
    }
  ]
};

// 차트 설정
const doughnutChart_config = {
  type: 'doughnut',
  data: doughnutChart_data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Doughnut Chart'
      // }
    }
  },
};

// 캔버스 요소 가져와서 차트 생성
const doughnutChart_ctx = document.getElementById("myChart7").getContext("2d");
const doughnutChart_myChart = new Chart(doughnutChart_ctx, doughnutChart_config);

// 🔹 차트 조작 기능
const doughnutChart_actions = {
  randomize: function() {
    doughnutChart_myChart.data.datasets.forEach(dataset => {
      dataset.data = doughnutChart_randomNumbers(doughnutChart_DATA_COUNT, 0, 100);
    });
    doughnutChart_myChart.update();
  },
  addDataset: function() {
    const data = doughnutChart_myChart.data;
    const newDataset = {
      label: 'Dataset ' + (data.datasets.length + 1),
      backgroundColor: doughnutChart_COLORS,
      data: doughnutChart_randomNumbers(doughnutChart_DATA_COUNT, 0, 100),
    };

    doughnutChart_myChart.data.datasets.push(newDataset);
    doughnutChart_myChart.update();
  },
  addData: function() {
    const data = doughnutChart_myChart.data;
    data.labels.push('Data #' + (data.labels.length + 1));

    for (let i = 0; i < data.datasets.length; i++) {
      data.datasets[i].data.push(Math.floor(Math.random() * 100));
    }

    doughnutChart_myChart.update();
  },
  removeDataset: function() {
    doughnutChart_myChart.data.datasets.pop();
    doughnutChart_myChart.update();
  },
  removeData: function() {
    doughnutChart_myChart.data.labels.pop();

    doughnutChart_myChart.data.datasets.forEach(dataset => {
      dataset.data.pop();
    });

    doughnutChart_myChart.update();
  },
  hideDataset: function(index) {
    doughnutChart_myChart.hide(index);
  },
  showDataset: function(index) {
    doughnutChart_myChart.show(index);
  }
};

// 🔹 버튼을 만들고 <canvas id="myChart7"></canvas> 아래에 배치
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myChart7"); // 캔버스 요소 가져오기
  const buttonContainer = document.createElement("div");
  // buttonContainer.style.marginTop = "20px";

  // 캔버스 바로 아래에 버튼 추가
  canvas.parentNode.insertBefore(buttonContainer, canvas.nextSibling);

  const doughnutChart_buttons = [
    { name: "Randomize", action: doughnutChart_actions.randomize },
    { name: "Add Dataset", action: doughnutChart_actions.addDataset },
    { name: "Add Data", action: doughnutChart_actions.addData },
    { name: "Remove Dataset", action: doughnutChart_actions.removeDataset },
    { name: "Remove Data", action: doughnutChart_actions.removeData }
  ];

  doughnutChart_buttons.forEach(btn => {
    const button = document.createElement("button");
    button.textContent = btn.name;
    button.style.marginRight = "10px";
    button.onclick = btn.action;
    buttonContainer.appendChild(button);
  });
});

// 8. HorizontalBarChart ****************************************************
// 데이터 개수 및 범위 설정

const HorizontalBarChart_DATA_COUNT = 7;
const HorizontalBarChart_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; // 월 데이터

// 랜덤 숫자 생성 함수
const HorizontalBarChart_randomNumbers = (count, min, max) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// 색상 배열
const HorizontalBarChart_COLORS = ['#FF6384', '#36A2EB', '#FFCD56', '#4BC0C0', '#9966FF', '#C9CBCF', '#FF9F40'];

// 차트 데이터 설정
const HorizontalBarChart_data = {
  labels: HorizontalBarChart_labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: HorizontalBarChart_randomNumbers(HorizontalBarChart_DATA_COUNT, 0, 100),
      borderColor: HorizontalBarChart_COLORS[0],
      backgroundColor: HorizontalBarChart_COLORS[0] + '80', // 반투명 효과
    },
    {
      label: 'Dataset 2',
      data: HorizontalBarChart_randomNumbers(HorizontalBarChart_DATA_COUNT, 0, 100),
      borderColor: HorizontalBarChart_COLORS[1],
      backgroundColor: HorizontalBarChart_COLORS[1] + '80',
    }
  ]
};

// 차트 설정
const HorizontalBarChart_config = {
  type: 'bar',
  data: HorizontalBarChart_data,
  options: {
    indexAxis: 'y', // ✅ 수평 막대 차트로 설정
    elements: {
      bar: {
        borderWidth: 2, // 각 막대의 테두리 너비 설정
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      // title: {
      //   display: true,
      //   text: 'Horizontal Bar Chart'
      // }
    }
  },
};

// 캔버스 요소 가져와서 차트 생성
const HorizontalBarChart_ctx = document.getElementById("myChart8").getContext("2d");
const HorizontalBarChart_myChart = new Chart(HorizontalBarChart_ctx, HorizontalBarChart_config);

// 🔹 차트 조작 기능
const HorizontalBarChart_actions = {
  randomize: function() {
    HorizontalBarChart_myChart.data.datasets.forEach(dataset => {
      dataset.data = HorizontalBarChart_randomNumbers(HorizontalBarChart_DATA_COUNT, -100, 100);
    });
    HorizontalBarChart_myChart.update();
  },
  addDataset: function() {
    const newDataset = {
      label: 'Dataset ' + (HorizontalBarChart_myChart.data.datasets.length + 1),
      backgroundColor: HorizontalBarChart_COLORS[HorizontalBarChart_myChart.data.datasets.length % HorizontalBarChart_COLORS.length] + '80',
      borderColor: HorizontalBarChart_COLORS[HorizontalBarChart_myChart.data.datasets.length % HorizontalBarChart_COLORS.length],
      borderWidth: 1,
      data: HorizontalBarChart_randomNumbers(HorizontalBarChart_DATA_COUNT, -100, 100),
    };

    HorizontalBarChart_myChart.data.datasets.push(newDataset);
    HorizontalBarChart_myChart.update();
  },
  addData: function() {
    HorizontalBarChart_myChart.data.labels.push('Month ' + (HorizontalBarChart_myChart.data.labels.length + 1));

    HorizontalBarChart_myChart.data.datasets.forEach(dataset => {
      dataset.data.push(Math.floor(Math.random() * 200) - 100);
    });

    HorizontalBarChart_myChart.update();
  },
  removeDataset: function() {
    HorizontalBarChart_myChart.data.datasets.pop();
    HorizontalBarChart_myChart.update();
  },
  removeData: function() {
    HorizontalBarChart_myChart.data.labels.pop();

    HorizontalBarChart_myChart.data.datasets.forEach(dataset => {
      dataset.data.pop();
    });

    HorizontalBarChart_myChart.update();
  }
};

// 🔹 버튼을 <canvas id="myChart8"></canvas> 아래에 배치
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myChart8"); // 캔버스 요소 가져오기
  const buttonContainer = document.createElement("div");
  buttonContainer.style.marginTop = "20px";

  // 캔버스 바로 아래에 버튼 추가
  canvas.parentNode.insertBefore(buttonContainer, canvas.nextSibling);

  const buttons = [
    { name: "Randomize", action: HorizontalBarChart_actions.randomize },
    { name: "Add Dataset", action: HorizontalBarChart_actions.addDataset },
    { name: "Add Data", action: HorizontalBarChart_actions.addData },
    { name: "Remove Dataset", action: HorizontalBarChart_actions.removeDataset },
    { name: "Remove Data", action: HorizontalBarChart_actions.removeData }
  ];

  buttons.forEach(btn => {
    const button = document.createElement("button");
    button.textContent = btn.name;
    button.style.marginRight = "10px";
    button.onclick = btn.action;
    buttonContainer.appendChild(button);
  });
});

//  여기 까지가 차트 1~8번

// 필터 기능
document.addEventListener("DOMContentLoaded", function () {
  setupFilterButtons();
  setupLogoClick();
});

// 🔹 필터 버튼 설정 함수
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const chartContainers = document.querySelectorAll(".chart-container");
  const mainContent = document.querySelector(".mainContent");

  const chartMapping = {
    bar: ["myChart1", "myChart2", "myChart8"],
    line: ["myChart3", "myChart4", "myChart5"],
    doughnut: ["myChart7"],
    radar: ["myChart6"]
  };

  function updateGridLayout() {
    const visibleCharts = document.querySelectorAll(".chart-container:not(.hidden)");
    const visibleCount = visibleCharts.length;

    if (visibleCount === 0) {
      mainContent.style.gridTemplateColumns = "repeat(4, 1fr)";
    } else if (visibleCount <= 2) {
      mainContent.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else if (visibleCount <= 4) {
      mainContent.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else {
      mainContent.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.dataset.type;
      
      // 현재 버튼이 활성화 상태인지 확인
      const isActive = this.classList.contains("active");

      // 모든 버튼 비활성화
      filterButtons.forEach((b) => b.classList.remove("active"));

      if (isActive) {
        // 현재 버튼이 활성화 상태였으면 필터 해제 (모든 차트 표시)
        chartContainers.forEach((chart) => chart.classList.remove("hidden"));
      } else {
        // 버튼 활성화
        this.classList.add("active");

        // 차트 필터링 적용
        chartContainers.forEach((chart) => {
          const canvas = chart.querySelector("canvas");
          if (canvas && chartMapping[type].includes(canvas.id)) {
            chart.classList.remove("hidden");
          } else {
            chart.classList.add("hidden");
          }
        });
      }

      updateGridLayout();
    });
  });

  // 초기 상태: 모든 차트 표시
  updateGridLayout();
}

// 🔹 로고 클릭 시 페이지 새로고침
function setupLogoClick() {
  const logo = document.querySelector(".logo img");

  if (logo) {
    logo.addEventListener("click", function () {
      location.reload(); // 페이지 새로고침
    });
  }
}
