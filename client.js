const net = require('net');
const os = require('os');


// Client Side
const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to server');
  });
  

  const osInfo = {
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    architecture: os.arch(),
    cpuCore: os.cpus(),
    freeMemory: os.freemem(),
    allMemory: os.totalmem(),
    timeToUp: os.uptime(),
    dirName: __dirname,
    fileName: __filename
  };
  client.write(JSON.stringify(osInfo));

  // Handle server response
  client.on('data', (data) => {
    console.log(data);
  });
  
  // Handle server disconnection
  client.on('end', () => {
    console.log('Disconnected from server');
  });