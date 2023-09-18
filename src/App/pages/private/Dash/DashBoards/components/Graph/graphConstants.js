// Shared constants
const blueColor = "#2ca8ff";
const purpleColor = "#832bf9";

// Shared functions
const generateGradient = (startColor, endColor) => {
    return `linear-gradient(180deg, ${startColor} 100%, ${endColor} 0%)`;
};

const generateChartOptions = (xTicks = [], yTicksCallback) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                align: "end",
                labels: {
                    boxWidth: 6,
                    boxHeight: 6,
                    padding: 20,
                    pointStyle: "circle",
                    borderRadius: 50,
                    usePointStyle: true,
                    font: {
                        weight: 400,
                    },
                },
            },
            tooltip: {
                backgroundColor: "#fff",
                titleColor: "#1e293b",
                bodyColor: "#1e293b",
                borderColor: "#e9ecef",
                borderWidth: 1,
                pointRadius: 2,
                usePointStyle: true,
                boxWidth: 8,
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
        scales: {
            y: {
                grid: {
                    drawBorder: false,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [4, 4],
                },
                ticks: {
                    callback: yTicksCallback,
                    display: true,
                    padding: 10,
                    color: "#b2b9bf",
                    font: {
                        size: 12,
                        family: "Noto Sans",
                        style: "normal",
                        lineHeight: 2,
                    },
                    color: "#64748B",
                },
            },
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                    borderDash: [4, 4],
                },
                ticks: {
                    display: true,
                    color: "#b2b9bf",
                    padding: 20,
                    font: {
                        size: 12,
                        family: "Noto Sans",
                        style: "normal",
                        lineHeight: 2,
                    },
                    color: "#64748B",
                    maxRotation: 0,
                    autoSkip: false,
                    maxTicksLimit: 8,
                    callback: (value, index) => {
                        const tickInterval = Math.floor(xTicks.length / 8);
                        if (index % tickInterval === 0 || index === xTicks.length - 1) {
                            return value;
                        }
                        return "";
                    },
                },
            },
        },
    };
};

// Chart bars data
// Shared constants

// Chart bars data
const chartBarsData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
        {
            label: "Sales",
            tension: 0.4,
            borderWidth: 0,
            borderSkipped: false,
            backgroundColor: blueColor,
            data: [
                450, 200, 100, 220, 500, 100, 400, 230, 500, 200
            ],
            maxBarThickness: 6,
        },
        {
            label: "Sales",
            tension: 0.4,
            borderWidth: 0,
            borderSkipped: false,
            backgroundColor: "#7c3aed",
            data: [
                200, 300, 200, 420, 400, 200, 300, 430, 400, 300
            ],
            maxBarThickness: 6,
        },
    ],
};

// Chart bars options
const chartBarsOptions = generateChartOptions(
    chartBarsData.labels,
    (value) => parseInt(value).toLocaleString() + " sales"
);

export { chartBarsData, chartBarsOptions };



const gradientStroke1 = {
    gradient: {
        stops: [0, 20, 100],
    },
    from: { color: '#2ca8ff' },
    to: { color: 'rgba(45,168,255,0)' },
};

const gradientStroke2 = {
    gradient: {
        stops: [0, 70, 100],
    },
    from: { color: '#832bf9' },
    to: { color: 'rgba(119,77,211,0)' },
};

const createDatasets = (data) => {
    return [
        {
            label: 'Volume',
            tension: 0,
            borderWidth: 2,
            pointRadius: 3,
            borderColor: '#2ca8ff',
            pointBorderColor: '#2ca8ff',
            pointBackgroundColor: '#2ca8ff',
            backgroundColor: gradientStroke1,
            fill: true,
            data: data.volume,
            maxBarThickness: 6,
        },
        {
            label: 'Trade',
            tension: 0,
            borderWidth: 2,
            pointRadius: 3,
            borderColor: '#832bf9',
            pointBorderColor: '#832bf9',
            pointBackgroundColor: '#832bf9',
            backgroundColor: gradientStroke2,
            fill: true,
            data: data.trade,
            maxBarThickness: 6,
        },
    ];
};

const createPlugins = () => {
    return [
        {
            beforeInit(chart) {
                const originalFit = chart.legend.fit;
                chart.legend.fit = function fit() {
                    originalFit.bind(chart.legend)();
                    this.height += 40;
                };
            },
        },
    ];
};

const createTooltip = () => {
    return {
        backgroundColor: '#fff',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e9ecef',
        borderWidth: 1,
        pointRadius: 2,
        usePointStyle: true,
        boxWidth: 8,
    };
};



const createGradient = (ctx, gradientColors) => {
    const { from, to, stops } = gradientColors;

    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(stops[0], from.color);
    gradient.addColorStop(stops[1], from.color);
    gradient.addColorStop(stops[2], to.color);

    return gradient;
};

export { createDatasets, createPlugins, createTooltip, createGradient };
