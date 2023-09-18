import {useEffect, useRef} from "react";
import {Chart} from "react-chartjs-2";

function withChart(WrappedComponent, type, data, options) {
    return function WithChart(props) {
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

        return <WrappedComponent {...props} chart={chartRef.current} canvasRef={canvasRef} />;
    };
}

function withChartUpdate(WrappedComponent) {
    return function WithChartUpdate(props) {
        const { chart } = props;

        function updateChart(newData, newOptions) {
            chart.data = newData;
            chart.options = newOptions;
            chart.update();
        }

        return <WrappedComponent {...props} updateChart={updateChart} />;
    };
}
function useChart(type, data, options) {
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

    return chartRef.current;
}
