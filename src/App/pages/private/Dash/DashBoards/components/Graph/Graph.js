import { useState, useEffect, useRef } from 'react';
import { Card, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { chartOptions, getChartData, ranges } from './constants';

const BalanceOverTime = () => {
    const chartRef = useRef();
    const [selectedRange, setSelectedRange] = useState(ranges[0].key);

    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        const data = getChartData(selectedRange);

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Balance',
                        data: data.data,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: chartOptions,
        });

        return () => chart.destroy();
    }, [selectedRange]);

    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };

    const renderRangeButton = ({ key, label }) => (
        <ToggleButton key={key} value={key} variant="white" className="px-3 mb-0">
            {label}
        </ToggleButton>
    );

    return (
        <Card className="shadow-xs border h-100">
            <Card.Header className="pb-0">
                <h6 className="font-weight-semibold text-lg mb-0">Balances over time</h6>
                <p className="text-sm">Here you have details about the balance.</p>
                <ToggleButtonGroup
                    type="radio"
                    name="btnradio"
                    value={selectedRange}
                    onChange={handleRangeChange}
                    aria-label="Basic radio toggle button group"
                >
                    {ranges.map(renderRangeButton)}
                </ToggleButtonGroup>
            </Card.Header>
            <Card.Body className="py-3">
                <div className="chart mb-2">
                    <canvas className="chart-canvas" height="240" ref={chartRef}></canvas>
                </div>
                <Button variant="white" className="mb-0 ms-auto">
                    View report
                </Button>
            </Card.Body>
        </Card>
    );
};

export default BalanceOverTime;
