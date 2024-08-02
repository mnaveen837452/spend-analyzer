import React, { useEffect, useState } from 'react';
import ChartReport from './ChartReport';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { fetchSpendDetailsByCategory } from '../services/spendDetailsService';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
  } from 'chart.js';

  // Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
  );
const ReportGenerator = () => {
    const [spendDetails, setSpendDetails] = useState([]);
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState('Bar');
  
    useEffect(() => {
      const getSpendDetails = async () => {
        try {
          const data = await fetchSpendDetailsByCategory();
          setSpendDetails(data);
        } catch (error) {
          setError(error.message);
        }
      };
      getSpendDetails();
    }, []);
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }

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

  const renderChart = () => {
    switch (chartType) {
      case 'Bar':
        return <Bar data={barData} />;
      case 'Pie':
        return <Pie data={pieData} />;
      case 'Line':
        return <Line data={lineData} />;
      default:
        return <Bar data={barData} />;
    }
  };

    return (
        <div className="report-container">
            <div className="chart-report">
            <h2>Spend Report</h2>
            <div className="chart-controls">
            <label htmlFor="chartType">Select Chart Type: </label>
            <select
                id="chartType"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
            >
                <option value="Bar">Bar</option>
                <option value="Pie">Pie</option>
                <option value="Line">Line</option>
            </select>
            </div>
            <div className="chart-container">
            <h3>{chartType} Chart</h3>
            {renderChart()}
            </div>
        </div>
        </div>
        
    );
  };

export default ReportGenerator;
