import { CSSProperties } from 'react';

interface StyleCollection {
  [key: string]: CSSProperties;
}

export const styles: StyleCollection = {
  app: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif", // More modern font stack
    textAlign: 'center',
    backgroundColor: '#f0f0f0', // Light gray background - more common than green
    minHeight: '100vh', // Use minHeight for better responsiveness
    display: 'flex',        // Use flexbox for easy centering
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',      // Add some padding
    boxSizing: 'border-box', // Include padding in element's total width/height
  },
  container: {  // Added a container style
    maxWidth: '800px', // Limit content width on larger screens
    width: '100%',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
  },
  heading: { // Example heading style
    color: '#333',
    fontSize: '2.5rem', // Use rem for scalable font sizes
    marginBottom: '1rem',
  },
  paragraph: { // Example paragraph style
    color: '#666',
    fontSize: '1rem',
    lineHeight: '1.5', // Improve readability
    marginBottom: '0.5rem',
  },
  button: { // Example button style
    backgroundColor: '#007bff', // Bootstrap primary color
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease-in-out', // Smooth transition
    ':hover': { // Pseudo-selector for hover state
      backgroundColor: '#0056b3', // Darker blue on hover
    },
    ':disabled': { // Style for disabled state
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    }
  },
    input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    width: '100%', // Make input full-width within its container
    boxSizing: 'border-box', // Include padding and border in element's total width
    fontSize: '1rem',
  },
  srOnly: { // Style for screen-reader only elements (accessibility)
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: 0,
  },
  flexRow: { // Utility class for flex rows
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px', // Consistent spacing between items
  },
  flexColumn: { // Utility class for flex columns
      display: 'flex',
      flexDirection: 'column',
       gap: '10px',
  },
  link: {
      color: '#007bff',
      textDecoration: 'none', //remove underline as default
      ':hover':{
          textDecoration: 'underline', //add it on hover
      }

  }
};

//Example of how to extend styles:
export const getDynamicStyles = (isDarkMode: boolean): StyleCollection => ({
    app: {
        ...styles.app,  // Start with existing styles
        backgroundColor: isDarkMode ? '#282c34' : styles.app.backgroundColor,
        color: isDarkMode ? 'white' : '#333', // Text color based on dark mode
    },
   //you can do this for all other styles.
});
