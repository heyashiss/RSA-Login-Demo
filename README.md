# RSA Login Demo with Wireshark Packet Capture

This project demonstrates a secure login system using **RSA encryption** in the browser and **Node.js** on the server, along with instructions for capturing network traffic using **Wireshark**.  
It includes:
- A **plain login** page (credentials sent in cleartext)
- An **RSA-encrypted login** page (credentials encrypted client-side)
- Example of viewing the difference in captured packets with Wireshark

---

## Features
- **Plaintext Login Page** (`index_plain.html`) – shows how credentials appear in packets without encryption.
- **RSA-Encrypted Login Page** (`index_rsa.html`) – encrypts the password in the browser before sending to the server.
- **Node.js Server** (`server.js`) – generates RSA key pair, serves HTML pages, and decrypts incoming encrypted data.
- **Wireshark Capture** – compare packet contents for plaintext vs encrypted login.

---

## Requirements
- Node.js (v16+ recommended)
- npm
- Wireshark (or tcpdump) installed on your machine
- Npcap (Windows only, for loopback capture)

---

## Installation
```bash
git clone https://github.com/your-username/rsa-login-demo.git
cd rsa-login-demo
npm install
npm start
