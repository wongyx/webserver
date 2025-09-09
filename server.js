import express from "express";
import {UAParser} from "ua-parser-js"

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({ msg: "Test server" });
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser();
    parser.setUA(userAgent)
    const result = parser.getResult();

    const browser_info = "Browser Name: " + result.browser.name +
    "Browser Version: " + result.browser.version +
    "OS Name: " + result.os.name +
    "OS Version: " + result.os.version +
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