// constants.js

export const ranges = [
    {key: '12m', label: '12 months'},
    {key: '30d', label: '30 days'},
    {key: '7d', label: '7 days'},
];

export const getChartData = (type) => {
    const data = {
        '12m': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600],
        },
        '30d': {
            labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
            data: Array.from({length: 30}, (_, i) => 1800 + 50 * i),
        },
        '7d': {
            labels: Array.from({length: 7}, (_, i) => `Day ${i + 1}`),
            data: Array.from({length: 7}, (_, i) => 2200 + 50 * i),
        },
    };
    return data[type];
};

export const chartData = {
    '12m': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600],
    }, '30d': {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20', 'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30'],
        data: [1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000, 3050, 3100, 3150, 3200, 3250],
    }, '7d': {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        data: [2200, 2250, 2300, 2350, 2400, 2450, 2500],
    },
};
export const chartOptions = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value, index, values) {
                    return '$' + value;
                },
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
};
