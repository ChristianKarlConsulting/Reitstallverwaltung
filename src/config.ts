const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://api.your-domain.com'  // Your Elastic Beanstalk URL
    : 'http://localhost:3000',
  
  mollieConfig: {
    profileId: 'your-mollie-profile-id',
    testMode: process.env.NODE_ENV !== 'production',
  },
};

export default config;