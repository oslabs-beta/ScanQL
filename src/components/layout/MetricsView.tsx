import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Query Response Rates",
            color: "#ffffffc8",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() =>
                faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(104, 99, 255)",
            scaleFontColor: "#FFFFFF",
            backgroundColor: "rgba(107, 99, 255, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() =>
                faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(53, 162, 235)",
            color: "#ffffffc8",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
            color: "#ffffffc8",
        },
    },
};

const labels2 = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
];

export const data2 = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() =>
                faker.datatype.number({ min: 0, max: 1000 })
            ),
            backgroundColor: "rgba(107, 99, 255, 0.5)",
            scaleFontColor: "#FFFFFF",
        },
        {
            label: "Dataset 2",
            data: labels.map(() =>
                faker.datatype.number({ min: 0, max: 1000 })
            ),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            scaleFontColor: "#FFFFFF",
        },
    ],
};

const MetricsView: React.FC = () => {
    return (
            <div className="dashboard-container">
                <div className="dashboard-card">
                    <Line options={options} data={data} />
                </div>
                <div className="dashboard-card">
                    <Bar options={options2} data={data2} />
                </div>
                <div className="dashboard-card">
                    <Line options={options} data={data} />
                </div>
                <div className="dashboard-card">
                    <Line options={options} data={data} />
                </div>
                <div className="dashboard-card">
                    <Bar options={options2} data={data2} />
                </div>
                <div className="dashboard-card">
                    <Line options={options} data={data} />
                </div>
                <div className="dashboard-card">
                    <Line options={options} data={data} />
                </div>
                <div className="dashboard-card">
                    <Bar options={options2} data={data2} />
                </div>
                <div className="dashboard-card">
                    <Line options={options} data={data} />
                </div>
            </div>
    );
};

export default MetricsView;
