import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({ msg: "Test server" });
    const userAgent = req.headers['user-agent'];
    const useragent = require('ua-parser-js');
    const parser = new useragent(userAgent);
    const result = parser.getResult();

    const browser_info = "<p>Browser Name: " + result.browser.name + "</p>" +
    "<p>Browser Version: " + result.browser.version + "</p>" +
    "<p>OS Name: " + result.os.name + "</p>" +
    "<p>OS Version: " + result.os.version + "</p>" +
    "<p>IP: " + req.headers['x-forwarded-for'] || req.connection.remoteAddress + "</p>";

    console.log(`Logged access for rid: ${browser_info}`);
    });

// graceful shutdown (SIGTERM from Docker/K8s)
const server = app.listen(PORT, () => {
  console.log(`listening on :${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("shutting down...");
  server.close(() => process.exit(0));
});