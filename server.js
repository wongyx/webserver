const express = require("express")

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({ msg: "Test server" });

    let browser_info = "<p>Browser CodeName: " + navigator.appCodeName + "</p>" +
    "<p>Browser Name: " + navigator.appName + "</p>" +
    "<p>Browser Version: " + navigator.appVersion + "</p>" +
    "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>" +
    "<p>Browser Language: " + navigator.language + "</p>" +
    "<p>Browser Online: " + navigator.onLine + "</p>" +
    "<p>Platform: " + navigator.platform + "</p>" +
    "<p>User-agent header: " + navigator.userAgent + "</p>" +
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