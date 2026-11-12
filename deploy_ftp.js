/**
 * Pure Node.js FTP Deployer for TAMSTAR Storefront
 * Usage: node deploy_ftp.js <username> <password> [host] [remoteDir]
 */

const net = require('net');
const fs = require('fs');
const path = require('path');

const user = process.argv[2];
const pass = process.argv[3];
const host = process.argv[4] || 'ecom.zamzy.in';
const remoteDir = process.argv[5] || 'public_html';

if (!user || !pass) {
  console.log('Usage: node deploy_ftp.js <username> <password> [host] [remoteDir]');
  console.log('Example: node deploy_ftp.js myftpuser mysecretpass ecom.zamzy.in public_html');
  process.exit(1);
}

class SimpleFtp {
  constructor(host, user, pass) {
    this.host = host;
    this.user = user;
    this.pass = pass;
    this.control = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.control = net.createConnection({ host: this.host, port: 21 }, () => {});
      this.control.once('error', reject);
      this.waitForCode(220)
        .then(() => this.command(`USER ${this.user}`))
        .then(() => this.command(`PASS ${this.pass}`))
        .then(() => this.command('TYPE I'))
        .then(() => resolve())
        .catch(reject);
    });
  }

  waitForCode(expectedCode) {
    return new Promise((resolve, reject) => {
      const onData = (chunk) => {
        const text = chunk.toString();
        const lines = text.split('\r\n').filter(Boolean);
        for (const line of lines) {
          const code = parseInt(line.slice(0, 3), 10);
          if (line[3] === ' ') {
            this.control.removeListener('data', onData);
            if (code === expectedCode || (expectedCode === 230 && (code === 230 || code === 200))) {
              resolve(line);
            } else if (code >= 400) {
              reject(new Error(`FTP Error ${code}: ${line}`));
            } else {
              resolve(line);
            }
            return;
          }
        }
      };
      this.control.on('data', onData);
    });
  }

  command(cmd, expectedPrefix = 2) {
    return new Promise((resolve, reject) => {
      this.control.write(cmd + '\r\n');
      const onData = (chunk) => {
        const text = chunk.toString();
        const lines = text.split('\r\n').filter(Boolean);
        for (const line of lines) {
          if (line.length >= 3 && line[3] === ' ') {
            const code = parseInt(line.slice(0, 3), 10);
            this.control.removeListener('data', onData);
            if (Math.floor(code / 100) === expectedPrefix || code === 331 || code === 230) {
              resolve(line);
            } else {
              reject(new Error(`FTP response error (${line}) for command: ${cmd}`));
            }
            return;
          }
        }
      };
      this.control.on('data', onData);
    });
  }

  async getPasvSocket() {
    const res = await this.command('PASV');
    const match = res.match(/\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
    if (!match) throw new Error('Could not parse PASV response: ' + res);
    const ip = `${match[1]}.${match[2]}.${match[3]}.${match[4]}`;
    const port = (parseInt(match[5], 10) << 8) + parseInt(match[6], 10);
    return new Promise((resolve, reject) => {
      const dataSocket = net.createConnection({ host: ip, port: port }, () => {
        resolve(dataSocket);
      });
      dataSocket.once('error', reject);
    });
  }

  async mkdir(dirPath) {
    const parts = dirPath.split('/').filter(Boolean);
    let cur = '';
    for (const part of parts) {
      cur += '/' + part;
      try {
        await this.command(`MKD ${cur}`);
      } catch (e) {
        // directory may already exist (550), continue
      }
    }
  }

  async uploadFile(localPath, remotePath) {
    const dataSocket = await this.getPasvSocket();
    const storPromise = this.command(`STOR ${remotePath}`, 1);
    await storPromise;

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(localPath);
      readStream.pipe(dataSocket);
      dataSocket.on('close', async () => {
        try {
          await this.waitForCode(226);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      dataSocket.on('error', reject);
    });
  }

  close() {
    if (this.control) {
      this.control.write('QUIT\r\n');
      this.control.end();
    }
  }
}

async function run() {
  const ftp = new SimpleFtp(host, user, pass);
  console.log(`Connecting to FTP ${host}...`);
  await ftp.connect();
  console.log('Connected and logged in successfully!');

  const localRoot = path.join(__dirname, 'tamstar');
  function getAllFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    });
    return fileList;
  }

  const files = getAllFiles(localRoot);
  console.log(`Found ${files.length} files in tamstar/ to deploy to /${remoteDir}`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const rel = path.relative(localRoot, file).replace(/\\/g, '/');
    const remoteFilePath = `${remoteDir}/${rel}`.replace(/\/+/g, '/');
    const remoteFileDir = path.dirname(remoteFilePath).replace(/\\/g, '/');

    if (remoteFileDir && remoteFileDir !== '.') {
      await ftp.mkdir(remoteFileDir);
    }

    process.stdout.write(`[${i + 1}/${files.length}] Uploading ${rel}... `);
    await ftp.uploadFile(file, remoteFilePath);
    console.log('OK');
  }

  ftp.close();
  console.log('\nDeployment Complete! Only the TAMSTAR code was pushed to the site root.');
  console.log('Please visit https://ecom.zamzy.in/ to test.');
}

run().catch(err => {
  console.error('\nDeployment Error:', err.message);
  process.exit(1);
});
