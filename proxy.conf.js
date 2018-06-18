'use strict';

const proxyConfig = [
  {
    context: '/api',
    // pathRewrite: { '^/api': '' },
    // target: 'http://localhost:8110',
    target:"http://localhost:8020",
    changeOrigin: true,
    secure: false,
    logLevel: "debug"
  }
];

module.exports = proxyConfig;
