// Ping/Pong controller
const ping = (req, res) => {
  res.json({
    success: true,
    message: 'pong',
    timestamp: new Date().toISOString(),
    server: 'Fullstack Template API'
  });
};

module.exports = {
  ping
};
