$(document).ready(function() {
	createChart();
	setInterval(function() {
		createChart();
	}, 600000);
});
function createChart() {
	var whiteData = [];
	var hepperData = [];
	var imData = [];
	var chartArray;
	var chartData;
	var url = 'https://fitnessdb.tk/query?db=fitness&u=webapi&p=fuckoffm8&q=select+*+from+attendance+group+by+location+order+by+desc+limit+72&epoch=ms';

	$.getJSON(url, function(data) {
		chartData = data;
		chartArray = chartData.results[0].series;
		console.log(chartArray);
		for (var i = 0; i < chartArray.length; i++) {
			for (var j = 0; j < chartArray[i].values.length; j++) {
				if (i == 0) {
					whiteData[j] = { x: chartArray[i].values[j][0], y: ((chartArray[i].values[j][1]/210)*100).toFixed(0) };
				} else if (i == 1){
					imData[j] = { x: chartArray[i].values[j][0], y: ((chartArray[i].values[j][1]/250)*100).toFixed(0) };
				} else if (i == 2) {
					hepperData[j] = { x: chartArray[i].values[j][0], y: ((chartArray[i].values[j][1]/240)*100).toFixed(0) }; 
				}
			}
		}
		var ctx = $("#chart");
		var scatterChart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [{
					label: 'White Attendance',
					data: whiteData,
					fill: false,
					borderColor: "rgba(75,192,192, 1)",
					borderWidth: 5,
					pointRadius: 1,
				}, {
					label: 'IM Attendance',
					data: imData,
					fill: false,
					borderColor: "rgba(191,75,75, 1)",
					borderWidth: 5,
					pointRadius: 1,
				}, {
					label: 'Hepper Attendance',
					data: hepperData,
					fill: false,
					borderColor: "rgba(133,191,75, 1)",
					borderWidth: 5,
					pointRadius: 1,
				}]
			},
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						position: 'bottom',
						time: {
							unit: 'hour',
							unitStepSize: 1,
							displayFormats: {
								hour: 'h:mm A'
							}
						}
					}],
					yAxes: [{
						ticks: {
							beginAtZero: true,
							callback: function(label, index, labels) {
								return label + '%';
							}
						}
					}]
				},
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					enabled: true,
					bodyFontSize: 16,
					callbacks: {
						label: function(tooltipItems, data) {
							if (tooltipItems.datasetIndex == 0) {
								return tooltipItems.yLabel + '%';
							} else if (tooltipItems.datasetIndex == 1) {
								return tooltipItems.yLabel + '%';
							} else if (tooltipItems.datasetIndex == 2) {
								return tooltipItems.yLabel + '%';
							}
						},
						title: function(tooltipItems, data) {
							return '';
						}
					}
				}

			}
		});
	});	
}