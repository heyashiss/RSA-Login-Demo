// server.js
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Generate RSA key pair on startup (for demo only)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

console.log('\n--- RSA keys generated (in memory) ---\n');

// Serve static demo files from `public` folder
app.use(express.static('public'));

// Endpoint to return the public key (PEM)
app.get('/publicKey', (req, res) => {
  res.type('text/plain').send(publicKey);
});

// Plain login endpoint (receives cleartext, for packet capture demo)
app.post('/login-plain', (req, res) => {
  console.log('Plain login received:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// RSA login endpoint (receives base64 encrypted password)
app.post('/login-rsa', (req, res) => {
  try {
    const { username, password: encryptedB64 } = req.body;
    const encrypted = Buffer.from(encryptedB64, 'base64');

    // Decrypt with private key using RSA-OAEP
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      encrypted
    );
    

    const password = decrypted.toString('utf8');
    console.log('RSA login received: username=', username, 'password=', password);
    res.json({ status: 'ok', username, password_recovered: password });
  } catch (err) {
    console.error('Decryption error:', err);
    res.status(400).json({ error: 'decryption_failed' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log('Open index_plain.html and index_rsa.html from the server root (public folder).');
});