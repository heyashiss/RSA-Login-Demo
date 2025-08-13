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
git clone https://github.com/heyashiss/RSA-Login-Demo.git
cd rsa-login-demo
npm install
npm start
```
## Pages
- Plain Login:
```bash
http://localhost:3000/index_plain.html
```
  - Sends username/password in plain HTTP.

- RSA Login:
```bash
http://localhost:3000/index_rsa.html
```
  - Encrypts password using RSA-OAEP (SHA-256) in the browser before sending.
## Capturing Packets in Wireshark
-Start the server and open Wireshark.

-Select the Loopback interface (lo on Linux/Mac or Npcap Loopback Adapter on Windows).


- Using Filters to Zero in on Login Traffic:
  
  - Capture filter:
    ```bash
    tcp.port==3000
    ```
    
 - HTTP Login Traffic:
   
    - Most websites send login information using HTTP POST requests (usually for submitting form data). To filter for those, use:
      ```bash
      http.request.method == "POST"
      ```
- UML Diagrams:
  - Class Diagram/Domain Model:
![Class Diagram/Domain Model](/01.PNG)

  - Use Case Diagram:
![Use Case Diagram](/02.PNG)
 
  - Activity Diagram:
![Activity Diagram 1](/03.PNG)
![Activity Diagram 2](/04.PNG)
 
  - Sequence Diagram:
![Sequence Diagram](/05.PNG)
  

