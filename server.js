const http = require('http');

const PORT = process.env.PORT || 8080;

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bangalore Time</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; }
  .card { text-align: center; padding: 2rem; }
  .label { font-size: 1rem; letter-spacing: 0.15em; text-transform: uppercase; color: #94a3b8; }
  #time { font-size: clamp(3rem, 12vw, 7rem); font-weight: 700; font-variant-numeric: tabular-nums; margin: 0.5rem 0; }
  #date { font-size: 1.25rem; color: #cbd5e1; }
</style>
</head>
<body>
<div class="card">
  <div class="label">Bangalore, India (IST)</div>
  <div id="time">--:--:--</div>
  <div id="date"></div>
</div>
<script>
  const tz = 'Asia/Kolkata';
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  function tick() {
    const now = new Date();
    timeEl.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now);
    dateEl.textContent = new Intl.DateTimeFormat('en-IN', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  }
  tick();
  setInterval(tick, 1000);
</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(PAGE);
});

server.listen(PORT, () => {
  console.log(`Bangalore Time listening on port ${PORT}`);
});
