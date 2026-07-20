function createAccountData(label) {
  const safeLabel = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const uniqueId = `${safeLabel}-${Date.now()}`;

  return {
    name: `${label} Selenium`,
    email: `exploringworld678+${uniqueId}@gmail.com`,
    password: 'Test@12345',
    firstName: 'Exploring',
    lastName: 'World',
    company: 'Test Automation',
    address: '123 Test Street',
    address2: 'Suite 456',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890'
  };
}

module.exports = {
  createAccountData
};
