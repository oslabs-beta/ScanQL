

// table name

// in each table, total number of row

// in each table, total number of column

c
    // table name
    RowsVotesent, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(190, 99, 255, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(235, 86, 255, 0.2)",
                "rgba(16, 39, 215, 0.2)",
                "rgba(129, 75, 236, 0.2)",
                "rgba(64, 118, 255, 0.2)",
            ],
            borderColor: [
                "#dbdbdbdf",
            //     "rgba(54, 162, 235, 1)",
            //     "rgba(255, 206, 86, 1)",
            //     "rgba(75, 192, 192, 1)",
            //     "rgba(153, 102, 255, 1)",
            //     "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

export function PieChart( { tableInfo }) {
    return (
        <div className="dashboard-card">
            <Pie data={tableInfo} />
        </div>
    );
}
