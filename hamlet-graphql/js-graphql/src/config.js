const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'colinmac.me' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
};

export default configurations;
