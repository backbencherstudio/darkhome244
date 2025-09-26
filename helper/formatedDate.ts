export default function getFormattedDate(timestamp: string): string {
  const date = new Date(timestamp);

  // Options to display the date in a readable format: Day Month Year
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',    // Day without leading zero
    month: 'long',     // Full month name (e.g., July)
    year: 'numeric',   // Full year (e.g., 2019)
  };

  return date.toLocaleDateString('en-GB', options);  
}


