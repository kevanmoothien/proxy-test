const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const TARGET_SERVER = 'https://kevan.in.ngrok.io'; // Replace with your target server

// Proxy middleware to forward requests
app.use(
    '/', // Forward all requests
    createProxyMiddleware({
        target: TARGET_SERVER,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            console.log(`Proxying request: ${req.method} ${req.url}`);
        },
        onProxyRes: (proxyRes, req, res) => {
            console.log(`Received response from target server: ${proxyRes.statusCode}`);
        }
    })
);

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
