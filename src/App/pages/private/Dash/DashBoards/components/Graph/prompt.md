```javascript
// constants.js
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
    responsive: true, maintainAspectRatio: false, scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        },],
    },
};

```
```javascript
import { useState, useEffect, useRef } from 'react';
import { Card, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { chartData, chartOptions } from './constants';

const withChart = (WrappedComponent) => {
    const WithChart = (props) => {
        const chartRef = useRef(null);
        const [radioValue, setRadioValue] = useState('12m');

        const handleChange = (value) => {
            setRadioValue(value);
        };

        useEffect(() => {
            if (!chartRef.current) return;

            const ctx = chartRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData[radioValue].labels,
                    datasets: [
                        {
                            label: 'Balance',
                            data: chartData[radioValue].data,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: chartOptions,
            });

            return () => {
                chart.destroy();
            };
        }, [radioValue]);

        return <WrappedComponent radioValue={radioValue} handleChange={handleChange} chartRef={chartRef} />;
    };

    return WithChart;
};

const BalanceOverTime = ({ radioValue, handleChange, chartRef }) => {
    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData[radioValue].labels,
                datasets: [
                    {
                        label: 'Balance',
                        data: chartData[radioValue].data,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: chartOptions,
        });

        return () => {
            chart.destroy();
        };
    }, [radioValue]);

    return (
        <Card className="shadow-xs border h-100">
            <Card.Header className="pb-0">
                <h6 className="font-weight-semibold text-lg mb-0">Balances over time</h6>
                <p className="text-sm">Here you have details about the balance.</p>
                <ToggleButtonGroup
                    type="radio"
                    name="btnradio"
                    value={radioValue}
                    onChange={handleChange}
                    aria-label="Basic radio toggle button group"
                >
                    <ToggleButton value="12m" variant="white" className="px-3 mb-0">
                        12 months
                    </ToggleButton>
                    <ToggleButton value="30d" variant="white" className="px-3 mb-0">
                        30 days
                    </ToggleButton>
                    <ToggleButton value="7d" variant="white" className="px-3 mb-0">
                        7 days
                    </ToggleButton>
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

const BalanceOverTimeWithChart = withChart(BalanceOverTime);

export default BalanceOverTimeWithChart;

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            name="viewport"
    />
    <link
            href="../assets/img/apple-icon.png"
            rel="apple-touch-icon"
            sizes="76x76"
    />
    <link href="../assets/img/favicon.png" rel="icon" type="image/png" />
    <title>Corporate UI by Creative Tim</title>
    <!--     Fonts and icons     -->
    <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Noto+Sans:300,400,500,600,700,800|PT+Mono:300,400,500,600,700"
            rel="stylesheet"
    />
    <!-- Nucleo Icons -->
    <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
    <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script
            crossorigin="anonymous"
            src="https://kit.fontawesome.com/349ee9c857.js"
    ></script>
    <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- CSS Files -->
    <link
            href="../assets/css/corporate-ui-dashboard.css?v=1.0.0"
            id="pagestyle"
            rel="stylesheet"
    />
</head>

<body class="g-sidenav-show bg-gray-100">
<main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <div class="container-fluid py-4 px-5">
        <div class="row my-4">
            <div class="col-lg-4 col-md-6 mb-md-0 mb-4">
                <div class="card shadow-xs border h-100">
                    <div class="card-header pb-0">
                        <h6 class="font-weight-semibold text-lg mb-0">
                            Balances over time
                        </h6>
                        <p class="text-sm">Here you have details about the balance.</p>
                        <div
                                aria-label="Basic radio toggle button group"
                                class="btn-group"
                                role="group"
                        >
                            <input
                                    autocomplete="off"
                                    checked
                                    class="btn-check"
                                    id="btnradio1"
                                    name="btnradio"
                                    type="radio"
                            />
                            <label class="btn btn-white px-3 mb-0" for="btnradio1"
                            >12 months</label
                            >
                            <input
                                    autocomplete="off"
                                    class="btn-check"
                                    id="btnradio2"
                                    name="btnradio"
                                    type="radio"
                            />
                            <label class="btn btn-white px-3 mb-0" for="btnradio2"
                            >30 days</label
                            >
                            <input
                                    autocomplete="off"
                                    class="btn-check"
                                    id="btnradio3"
                                    name="btnradio"
                                    type="radio"
                            />
                            <label class="btn btn-white px-3 mb-0" for="btnradio3"
                            >7 days</label
                            >
                        </div>
                    </div>
                    <div class="card-body py-3">
                        <div class="chart mb-2">
                            <canvas
                                    class="chart-canvas"
                                    height="240"
                                    id="chart-bars"
                            ></canvas>
                        </div>
                        <button class="btn btn-white mb-0 ms-auto">View report</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-6">
                <div class="card shadow-xs border">
                    <div class="card-header border-bottom pb-0">
                        <div class="d-sm-flex align-items-center mb-3">
                            <div>
                                <h6 class="font-weight-semibold text-lg mb-0">
                                    Recent transactions
                                </h6>
                                <p class="text-sm mb-sm-0 mb-2">
                                    These are details about the last transactions
                                </p>
                            </div>
                            <div class="ms-auto d-flex">
                                <button
                                        class="btn btn-sm btn-white mb-0 me-2"
                                        type="button"
                                >
                                    View report
                                </button>
                                <button
                                        class="btn btn-sm btn-dark btn-icon d-flex align-items-center mb-0"
                                        type="button"
                                >
                      <span class="btn-inner--icon">
                        <svg
                                class="d-block me-2"
                                fill="none"
                                height="16"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                        </svg>
                      </span>
                                    <span class="btn-inner--text">Download</span>
                                </button>
                            </div>
                        </div>
                        <div class="pb-3 d-sm-flex align-items-center">
                            <div
                                    aria-label="Basic radio toggle button group"
                                    class="btn-group"
                                    role="group"
                            >
                                <input
                                        autocomplete="off"
                                        checked
                                        class="btn-check"
                                        id="btnradiotable1"
                                        name="btnradiotable"
                                        type="radio"
                                />
                                <label class="btn btn-white px-3 mb-0" for="btnradiotable1"
                                >All</label
                                >
                                <input
                                        autocomplete="off"
                                        class="btn-check"
                                        id="btnradiotable2"
                                        name="btnradiotable"
                                        type="radio"
                                />
                                <label class="btn btn-white px-3 mb-0" for="btnradiotable2"
                                >Monitored</label
                                >
                                <input
                                        autocomplete="off"
                                        class="btn-check"
                                        id="btnradiotable3"
                                        name="btnradiotable"
                                        type="radio"
                                />
                                <label class="btn btn-white px-3 mb-0" for="btnradiotable3"
                                >Unmonitored</label
                                >
                            </div>
                            <div class="input-group w-sm-25 ms-auto">
                    <span class="input-group-text text-body">
                      <svg
                              fill="none"
                              height="16px"
                              stroke="currentColor"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                              width="16px"
                              xmlns="http://www.w3.org/2000/svg"
                      >
                      </svg>
                    </span>
                                <input
                                        class="form-control"
                                        placeholder="Search"
                                        type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 py-0">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead class="bg-gray-100">
                                <tr>
                                    <th
                                            class="text-secondary text-xs font-weight-semibold opacity-7"
                                    >
                                        Transaction
                                    </th>
                                    <th
                                            class="text-secondary text-xs font-weight-semibold opacity-7 ps-2"
                                    >
                                        Amount
                                    </th>
                                    <th
                                            class="text-secondary text-xs font-weight-semibold opacity-7 ps-2"
                                    >
                                        Date
                                    </th>
                                    <th
                                            class="text-secondary text-xs font-weight-semibold opacity-7 ps-2"
                                    >
                                        Account
                                    </th>
                                    <th
                                            class="text-center text-secondary text-xs font-weight-semibold opacity-7"
                                    ></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex px-2">
                                            <div
                                                    class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2"
                                            >
                                                <img
                                                        alt="spotify"
                                                        class="w-80"
                                                        src="../assets/img/small-logos/logo-spotify.svg"
                                                />
                                            </div>
                                            <div class="my-auto">
                                                <h6 class="mb-0 text-sm">Spotify</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-sm font-weight-normal mb-0">$2,500</p>
                                    </td>
                                    <td>
                          <span class="text-sm font-weight-normal"
                          >Wed 3:00pm</span
                          >
                                    </td>
                                    <td class="align-middle">
                                        <div class="d-flex">
                                            <div
                                                    class="border px-1 py-1 text-center d-flex align-items-center border-radius-sm my-auto"
                                            >
                                                <img
                                                        alt="visa"
                                                        class="w-90 mx-auto"
                                                        src="../assets/img/logos/visa.png"
                                                />
                                            </div>
                                            <div class="ms-2">
                                                <p class="text-dark text-sm mb-0">Visa 1234</p>
                                                <p class="text-secondary text-sm mb-0">
                                                    Expiry 06/2026
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <a
                                                class="text-secondary font-weight-bold text-xs"
                                                data-bs-title="Edit user"
                                                data-bs-toggle="tooltip"
                                                href="javascript:"
                                        >
                                            <svg
                                                    fill="none"
                                                    height="14"
                                                    viewBox="0 0 15 16"
                                                    width="14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                            >
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex px-2">
                                            <div
                                                    class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2"
                                            >
                                                <img
                                                        alt="invision"
                                                        class="w-80"
                                                        src="../assets/img/small-logos/logo-invision.svg"
                                                />
                                            </div>
                                            <div class="my-auto">
                                                <h6 class="mb-0 text-sm">Invision</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-sm font-weight-normal mb-0">$5,000</p>
                                    </td>
                                    <td>
                          <span class="text-sm font-weight-normal"
                          >Wed 1:00pm</span
                          >
                                    </td>
                                    <td class="align-middle">
                                        <div class="d-flex">
                                            <div
                                                    class="border px-1 py-1 text-center d-flex align-items-center border-radius-sm my-auto"
                                            >
                                                <img
                                                        alt="mastercard"
                                                        class="w-90 mx-auto"
                                                        src="../assets/img/logos/mastercard.png"
                                                />
                                            </div>
                                            <div class="ms-2">
                                                <p class="text-dark text-sm mb-0">
                                                    Mastercard 1234
                                                </p>
                                                <p class="text-secondary text-sm mb-0">
                                                    Expiry 06/2026
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <a
                                                class="text-secondary font-weight-bold text-xs"
                                                data-bs-title="Edit user"
                                                data-bs-toggle="tooltip"
                                                href="javascript:"
                                        >
                                            <svg
                                                    fill="none"
                                                    height="14"
                                                    viewBox="0 0 15 16"
                                                    width="14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                            >
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex px-2">
                                            <div
                                                    class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2"
                                            >
                                                <img
                                                        alt="jira"
                                                        class="w-80"
                                                        src="../assets/img/small-logos/logo-jira.svg"
                                                />
                                            </div>
                                            <div class="my-auto">
                                                <h6 class="mb-0 text-sm">Jira</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-sm font-weight-normal mb-0">$3,400</p>
                                    </td>
                                    <td>
                          <span class="text-sm font-weight-normal"
                          >Mon 7:40pm</span
                          >
                                    </td>
                                    <td class="align-middle">
                                        <div class="d-flex">
                                            <div
                                                    class="border px-1 py-1 text-center d-flex align-items-center border-radius-sm my-auto"
                                            >
                                                <img
                                                        alt="mastercard"
                                                        class="w-90 mx-auto"
                                                        src="../assets/img/logos/mastercard.png"
                                                />
                                            </div>
                                            <div class="ms-2">
                                                <p class="text-dark text-sm mb-0">
                                                    Mastercard 1234
                                                </p>
                                                <p class="text-secondary text-sm mb-0">
                                                    Expiry 06/2026
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <a
                                                class="text-secondary font-weight-bold text-xs"
                                                data-bs-title="Edit user"
                                                data-bs-toggle="tooltip"
                                                href="javascript:"
                                        >
                                            <svg
                                                    fill="none"
                                                    height="14"
                                                    viewBox="0 0 15 16"
                                                    width="14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                            >
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex px-2">
                                            <div
                                                    class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2"
                                            >
                                                <img
                                                        alt="slack"
                                                        class="w-80"
                                                        src="../assets/img/small-logos/logo-slack.svg"
                                                />
                                            </div>
                                            <div class="my-auto">
                                                <h6 class="mb-0 text-sm">Slack</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-sm font-weight-normal mb-0">$1,000</p>
                                    </td>
                                    <td>
                          <span class="text-sm font-weight-normal"
                          >Wed 5:00pm</span
                          >
                                    </td>
                                    <td class="align-middle">
                                        <div class="d-flex">
                                            <div
                                                    class="border px-1 py-1 text-center d-flex align-items-center border-radius-sm my-auto"
                                            >
                                                <img
                                                        alt="visa"
                                                        class="w-90 mx-auto"
                                                        src="../assets/img/logos/visa.png"
                                                />
                                            </div>
                                            <div class="ms-2">
                                                <p class="text-dark text-sm mb-0">Visa 1234</p>
                                                <p class="text-secondary text-sm mb-0">
                                                    Expiry 06/2026
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <a
                                                class="text-secondary font-weight-bold text-xs"
                                                data-bs-title="Edit user"
                                                data-bs-toggle="tooltip"
                                                href="javascript:"
                                        >
                                            <svg
                                                    fill="none"
                                                    height="14"
                                                    viewBox="0 0 15 16"
                                                    width="14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                            >
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<!--   Core JS Files   -->
<script src="../assets/js/core/bootstrap.min.js"></script>
<script src="../assets/js/plugins/chartjs.min.js"></script>
<script>
    var ctx = document.getElementById("chart-bars").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
                {
                    label: "Sales",
                    tension: 0.4,
                    borderWidth: 0,
                    borderSkipped: false,
                    backgroundColor: "#2ca8ff",
                    data: [450, 200, 100, 220, 500, 100, 400, 230, 500, 200],
                    maxBarThickness: 6,
                },
                {
                    label: "Sales",
                    tension: 0.4,
                    borderWidth: 0,
                    borderSkipped: false,
                    backgroundColor: "#7c3aed",
                    data: [200, 300, 200, 420, 400, 200, 300, 430, 400, 300],
                    maxBarThickness: 6,
                },
            ],
        },
        options: {
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
                            family: "Noto Sans",
                            style: "normal",
                            lineHeight: 2,
                        },
                        color: "#64748B",
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
                            family: "Noto Sans",
                            style: "normal",
                            lineHeight: 2,
                        },
                        color: "#64748B",
                    },
                },
            },
        },
    });

    var ctx2 = document.getElementById("chart-line").getContext("2d");

    var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(45,168,255,0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(45,168,255,0.0)");
    gradientStroke1.addColorStop(0, "rgba(45,168,255,0)"); //blue colors

    var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, "rgba(119,77,211,0.4)");
    gradientStroke2.addColorStop(0.7, "rgba(119,77,211,0.1)");
    gradientStroke2.addColorStop(0, "rgba(119,77,211,0)"); //purple colors

    new Chart(ctx2, {
        plugins: [
            {
                beforeInit(chart) {
                    const originalFit = chart.legend.fit;
                    chart.legend.fit = function fit() {
                        originalFit.bind(chart.legend)();
                        this.height += 40;
                    };
                },
            },
        ],
        type: "line",
        data: {
            labels: [
                "Aug 18",
                "Aug 19",
                "Aug 20",
                "Aug 21",
                "Aug 22",
                "Aug 23",
                "Aug 24",
                "Aug 25",
                "Aug 26",
                "Aug 27",
                "Aug 28",
                "Aug 29",
                "Aug 30",
                "Aug 31",
                "Sept 01",
                "Sept 02",
                "Sept 03",
                "Aug 22",
                "Sept 04",
                "Sept 05",
                "Sept 06",
                "Sept 07",
                "Sept 08",
                "Sept 09",
            ],
            datasets: [
                {
                    label: "Volume",
                    tension: 0,
                    borderWidth: 2,
                    pointRadius: 3,
                    borderColor: "#2ca8ff",
                    pointBorderColor: "#2ca8ff",
                    pointBackgroundColor: "#2ca8ff",
                    backgroundColor: gradientStroke1,
                    fill: true,
                    data: [
                        2828, 1291, 3360, 3223, 1630, 980, 2059, 3092, 1831, 1842, 1902,
                        1478, 1123, 2444, 2636, 2593, 2885, 1764, 898, 1356, 2573, 3382,
                        2858, 4228,
                    ],
                    maxBarThickness: 6,
                },
                {
                    label: "Trade",
                    tension: 0,
                    borderWidth: 2,
                    pointRadius: 3,
                    borderColor: "#832bf9",
                    pointBorderColor: "#832bf9",
                    pointBackgroundColor: "#832bf9",
                    backgroundColor: gradientStroke2,
                    fill: true,
                    data: [
                        2797, 2182, 1069, 2098, 3309, 3881, 2059, 3239, 6215, 2185,
                        2115, 5430, 4648, 2444, 2161, 3018, 1153, 1068, 2192, 1152,
                        2129, 1396, 2067, 1215, 712, 2462, 1669, 2360, 2787, 861,
                    ],
                    maxBarThickness: 6,
                },
            ],
        },
        options: {
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
                        callback: function (value, index, ticks) {
                            return parseInt(value).toLocaleString() + " EUR";
                        },
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
                    },
                },
            },
        },
    });
</script>
<script>
    var win = navigator.platform.indexOf("Win") > -1;
    if (win && document.querySelector("#sidenav-scrollbar")) {
        var options = {
            damping: "0.5",
        };
        Scrollbar.init(document.querySelector("#sidenav-scrollbar"), options);
    }
</script>
<!-- Control Center for Corporate UI Dashboard: parallax effects, scripts for the example pages etc -->
<script src="../assets/js/corporate-ui-dashboard.min.js?v=1.0.0"></script>
</body>
</html>

```


