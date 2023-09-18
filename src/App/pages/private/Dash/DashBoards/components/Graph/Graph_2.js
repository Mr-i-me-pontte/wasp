import React, { useEffect, useRef } from "react";
import ChartBuilder from "./ChartBuilder";
import { CHART_COLORS, CHART_LABELS, CHART_DATA } from "../../constants";

const GraphCard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = new ChartBuilder(chartRef.current, 'bar', {
            labels: CHART_LABELS,
            data: CHART_DATA,
        })
            .setOptions({
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: "#fff",
                        titleColor: "#1e293b",
                        bodyColor: "#1e293b",
                        borderColor: "#e9ecef",
                        borderWidth: 1,
                        usePointStyle: true,
                    },
                },
                interaction: {
                    intersect: false,
                    mode: "index",
                },
                scales: {
                    y: {
                        ticks: {
                            padding: 10,
                            font: {
                                size: 12,
                                family: "Noto Sans",
                                style: "normal",
                                lineHeight: 2,
                                color: "#64748B",
                            },
                        },
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12,
                                family: "Noto Sans",
                                style: "normal",
                                lineHeight: 2,
                                color: "#64748B",
                            },
                        },
                    },
                },
            })
            .build();

        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div className="card card-full-height">
            <div className="card-header">
                <h4 className="card-title">Sales Chart</h4>
            </div>
            <div className="card-body">
                <canvas id="chart-bars" ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default GraphCard;
