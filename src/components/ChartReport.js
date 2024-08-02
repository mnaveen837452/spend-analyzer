import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './ReportStyles.css';

const ChartReport = ({ spendDetails }) => {
  // Prepare data for Bar Chart
  const barData = {
    labels: spendDetails.map(detail => detail.name),
    datasets: [
      {
        label: 'Amount',
        data: spendDetails.map(detail => detail.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Pie Chart
  const pieData = {
    labels: spendDetails.map(detail => detail.name),
    datasets: [
      {
        label: 'Amount',
        data: spendDetails.map(detail => detail.amount),
        backgroundColor: spendDetails.map(
          (_, index) => `hsl(${(index / spendDetails.length) * 360}, 70%, 50%)`
        ),
      },
    ],
  };

  // Prepare data for Line Chart
  const lineData = {
    labels: spendDetails.map(detail => detail.name),
    datasets: [
      {
        label: 'Amount Over Time',
        data: spendDetails.map(detail => detail.amount),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart-report">
      <h2>Chart Report</h2>
      <div className="chart-container">
        <h3>Bar Chart</h3>
        <Bar data={barData} />
      </div>
      <div className="chart-container">
        <h3>Pie Chart</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart-container">
        <h3>Line Chart</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default ChartReport;
