const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {

    const hari = new Date().toLocaleDateString("id-ID", { weekday: "long" });

    const jadwal = {
        "Senin": [
            { jam: "07:00", mapel: "Matematika" },
            { jam: "09:00", mapel: "Bahasa Indonesia" }
        ],
        "Selasa": [
            { jam: "07:00", mapel: "IPA" },
            { jam: "09:00", mapel: "IPS" }
        ]
    };

    let responseText = `Jadwal hari ${hari}:\n`;

    if (jadwal[hari]) {
        jadwal[hari].forEach(item => {
            responseText += `${item.jam} - ${item.mapel}\n`;
        });
    } else {
        responseText += "Tidak ada jadwal.";
    }

    res.json({
        fulfillmentText: responseText
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server berjalan...");
});
