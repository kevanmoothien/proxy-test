const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const https = require('https');
const jks = require('jks-js');

var httpsAgent = require('https-agent');
 


const app = express();
const TARGET_SERVER = 'https://annuaire-uat.petitsfreresdespauvres.fr'; // Replace with your target server
const agent = httpsAgent({
    pfx: fs.readFileSync('2024-petitsfreresdespauvres.fr.pfx'),
    passphrase: 'PFP2024!'
  });
// const httpsAgent = new https.Agent({
//     cert: fs.readFileSync('cert.pem'),
//     key: fs.readFileSync('key.pem')
// });
// console.log('>>>', httpsAgent)

// const keystore = jks.toPem(
// 	fs.readFileSync('certificatePFP.jks'),
// 	'PFP2024!'
// );

// const { cert, key, ca } = keystore['pfpcert'];
// console.log('***', cert, '^^^', key, '####', ca)

// const httpsAgent = new https.Agent({
//     cert: cert,
//     key: key
// });
// console.log(httpsAgent)

// Proxy middleware to forward requests
app.use(
    '/',
    createProxyMiddleware({
        target: TARGET_SERVER,
        // target: 'https://kevan.in.ngrok.io',
        changeOrigin: true,
        agent: agent, // Use the custom agent with the certificate
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



// https://annuaire-uat.petitsfreresdespauvres.fr/services/api/authenticate

// Load SSL certificate, private key, and CA certificate


// // Proxy middleware with HTTPS certificate
// app.use(
//     '/',
//     createProxyMiddleware({
//         target: TARGET_SERVER,
//         changeOrigin: true,
//         agent: httpsAgent, // Use the custom agent with the certificate
//         onProxyReq: (proxyReq, req, res) => {
//             console.log(`Proxying request: ${req.method} ${req.url}`);
//         },
//         onProxyRes: (proxyRes, req, res) => {
//             console.log(`Received response from target server: ${proxyRes.statusCode}`);
//         }
//     })
// );
