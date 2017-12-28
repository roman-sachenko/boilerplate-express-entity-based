module.exports = {
  adminData: {
    mail: process.env.ADMIN_EMAIL || 'admin@domain.com',
    password: process.env.ADMIN_PASSWORD || 'test123',
    first_name: process.env.ADMIN_FIRST_NAME || 'Admin',
    last_name: process.env.ADMIN_LAST_NAME || 'Admin',
    role: 'admin',
  },
};
