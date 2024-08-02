// Base URL for the API
const BASE_URL = 'http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer/summarybycategory';

// Function to fetch report data without using axios
const fetchReportData = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching report data:', error);
    throw error;
  }
};

// New method to fetch report data with start date, end date, and other parameters
const getReport = async (startDate, endDate, params = {}) => {
  try {
    // Convert dates to YYYY-MM-DD format if needed
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
    
    // Construct the query string
    const queryParams = new URLSearchParams({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      ...params
    }).toString();

    const response = await fetch(`${BASE_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};

export default {
  fetchReportData,
  getReport
};
