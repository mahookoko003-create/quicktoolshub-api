const express = require("express");
const cors = require("cors");
const ytdlp = require("yt-dlp-exec");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("QuickToolsHub API Running");
});

app.get("/download", async (req, res) => {

    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({
            error: "Video URL gerekli"
        });
    }

    try {

        const info = await ytdlp(videoUrl, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true
        });

        res.json({
            title: info.title,
            thumbnail: info.thumbnail,
            video: info.webpage_url
        });

    } catch (err) {

        res.status(500).json({
            error: "Video alınamadı"
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server çalışıyor");
});
