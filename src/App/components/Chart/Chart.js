import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

function Chart({ type, data, options }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const chart = new Chart(canvas, {
            type: type,
            data: data,
            options: options,
        });
        chartRef.current = chart;

        return () => {
            chart.destroy();
        };
    }, [type, data, options]);

    return <canvas ref={canvasRef} />;
}
