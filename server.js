const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

// 🔐 PUT YOUR DETAILS HERE (ONLY HERE, NOT IN HTML)
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/send-location", async (req, res) => {
    const { lat, lon } = req.body;

    try {
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `📍 Location:\nLat: ${lat}\nLon: ${lon}`
            })
        });

        res.send("Sent to Telegram ✅");
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(3000, () => console.log("Server running"));
