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
import ReportService from '../services/ReportService';
import './CategoryReportStyles.css';

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
const ReportGeneratorForCategory = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [spendDetails, setSpendDetails] = useState([]);
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState('Bar');
    const [reportData, setReportData] = useState({});
  
    

    const handleFetchReport = async () => {
      try {
        const data = await ReportService.getReport(startDate, endDate);
        setSpendDetails(data)
       
        setReportData(data);
        setError('');
      } catch (error) {
        setError('Failed to fetch report');
        setReportData({});
      }
    };
  
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    // Prepare data for Bar Chart
  const barData = {
    labels: spendDetails.map(detail => detail.categoryName),
    datasets: [
      {
        label: 'Amount',
        data: spendDetails.map(detail => detail.totalAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Pie Chart
  const pieData = {
    labels: spendDetails.map(detail => detail.categoryName),
    datasets: [
      {
        label: 'Amount',
        data: spendDetails.map(detail => detail.totalAmount),
        backgroundColor: spendDetails.map(
          (_, index) => `hsl(${(index / spendDetails.length) * 360}, 70%, 50%)`
        ),
      },
    ],
  };

  // Prepare data for Line Chart
  const lineData = {
    labels: spendDetails.map(detail => detail.categoryName),
    datasets: [
      {
        label: 'Amount Over Time',
        data: spendDetails.map(detail => detail.totalAmount),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={lineData} />;
      case 'bar':
        return <Bar data={barData} />;
      case 'pie':
        return <Pie data={pieData} />;
      default:
        return <Bar data={barData} />;
    }
  };

    return (
      <div className="report-container">
      <h2>Generate Report</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="chartType">Chart Type:</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button onClick={handleFetchReport}>Fetch Report</button>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
        
    );
  };

export default ReportGeneratorForCategory;
