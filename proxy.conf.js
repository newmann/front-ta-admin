'use strict';

const proxyConfig = [
  {
    context: '/api',
    // pathRewrite: { '^/api': '' },
    // target: 'http://localhost:8110',
    target:"http://127.0.0.1:8110",
    changeOrigin: true,
    secure: false,
    logLevel: "debug"
  }
];

module.exports = proxyConfig;
