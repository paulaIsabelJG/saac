
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3001,
  DB_HOST: 'cluster0.nmdnx.mongodb.net',
  DB_NAME: 'saac',
  DB_USER: 'pijuanesgi_inf', 
  DB_PASSWORD: '1234'
};

module.exports = { config };
