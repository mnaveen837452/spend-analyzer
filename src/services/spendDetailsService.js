// spendDetailsService.js

const API_URL = 'http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer'; // Replace with your API URL

export const fetchSpendDetails = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch spend details');
  }
  return response.json();
};

const CATEGORY_API_URL = 'http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer/summarybycategory'; // Replace with your API URL

export const fetchSpendDetailsByCategory = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch spend details');
  }
  return response.json();
};

export const fetchSpendDetailsByDates = async (startDate, endDate = {}) => {
try {
    // Convert dates to YYYY-MM-DD format if needed
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    console.log("form-->"+formattedStartDate)
    console.log("formattedEndDate-->"+formattedEndDate)
    
    // Construct the query string
    const queryParams = new URLSearchParams({
    startDate: formattedStartDate,
    endDate: formattedEndDate
    }).toString();

    const response = await fetch(`${CATEGORY_API_URL}?${queryParams}`);
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

