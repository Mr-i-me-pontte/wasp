import Chart from "chart.js/auto";


class ChartBuilder {
    constructor(canvas, type = 'bar', { labels = [], data = [], options = {} } = {}) {
        this.canvas = canvas;
        this.type = type;
        this.data = { labels, datasets: [{ label: 'Data', data }] };
        this.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    stacked: true,
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [4, 4],
                    },
                    ticks: {
                        beginAtZero: true,
                        padding: 10,
                        font: {
                            size: 12,
                            family: 'Noto Sans',
                            style: 'normal',
                            lineHeight: 2,
                        },
                        color: '#64748B',
                    },
                },
                x: {
                    stacked: true,
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Noto Sans',
                            style: 'normal',
                            lineHeight: 2,
                        },
                        color: '#64748B',
                    },
                },
            },
            ...options,
        };
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setData({ labels = this.data.labels, data = this.data.datasets[0].data } = {}) {
        this.data = { labels, datasets: [{ label: 'Data', data }] };
        return this;
    }

    setOptions(options) {
        this.options = { ...this.options, ...options };
        return this;
    }

    build() {
        const ctx = this.canvas.getContext('2d');

        return new Chart(ctx, {
            type: this.type,
            data: this.data,
            options: this.options,
        });
    }
}

export default ChartBuilder;
