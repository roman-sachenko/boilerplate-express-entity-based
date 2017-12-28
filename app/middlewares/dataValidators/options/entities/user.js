module.exports = {
  email: { min: 3, max: 100 },
  phone: {
    value: { min: 12, max: 12 },
  },
  first_name: { min: 1, max: 50 },
  last_name: { min: 1, max: 50 },
  password: { min: 6, max: 100 },
  confirm_password: { max: 100 },
};
