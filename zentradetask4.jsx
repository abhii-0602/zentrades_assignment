// Dashboard.jsx

import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Grid, Box } from "@material-ui/core";
import "./zentradetask4.css"; // Import the CSS file

const Dashboard = () => {
  // Hardcoded data (replace it with actual data)
  const companyMetrics = {
    totalRevenue: 1000000,
    totalJobs: 500,
    avgTicketsCreated: 200,
    ticketsScheduled: 180,
    outstandingAmount: 50000,
    membershipSold: 100,
    jobsCompleted: 300,
    totalCancelled: 50,
  };

  // Hardcoded data for bar charts (replace it with actual data)
  const revenueByJobLocationData = {
    labels: ["Location A", "Location B", "Location C","Location D", "Location E", "Location F","Location G", "Location H"],
    datasets: [
      {
        label: "Revenue by Job Location",
        backgroundColor: "rgba(12, 168, 38, 0.692)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [300000, 250000, 200000, 120000, 800000, 1100000, 1450000, 120000],
      },
    ],
  };

  const revenueByJobTypeData = {
    labels: ["Type A", "Type B", "Type C", "Type D", "Type E", "Type F", "Type G", "Type H"],
    datasets: [
      {
        label: "Revenue by Job Type",
        backgroundColor: "rgba(12, 168, 38, 0.692)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [400000, 300000, 150000, 120000, 800000, 1100000, 1450000, 10000],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    indexAxis: "y", // Specify the horizontal bar graph
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Company Metrics</h2>
      <div className="row">
        {Object.entries(companyMetrics).map(([metric, value], index) => (
          <div
            key={metric}
            className={`col-md-3 metric-box ${metric === 'outstandingAmount' ? 'red-text' : ''}`}
          >
            <div>
              <h3>{metric.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
              <p className={metric === 'outstandingAmount' ? 'red-text' : ''}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="chart">
          <h3>Revenue by Job Location</h3>
          <Bar data={revenueByJobLocationData} options={chartOptions} />
          <div>Chart 1</div>
        </div>
        <div className="chart">
          <h3>Revenue by Job Type</h3>
          <Bar data={revenueByJobTypeData} options={chartOptions} />
          <div>Chart 2</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
