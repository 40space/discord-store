const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let discordUserId = null;

app.get('/auth/discord', (req, res) => {
    res.redirect('https://discord.com/oauth2/authorize?client_id=1343301532996862087&response_type=code&redirect_uri=https%3A%2F%2F4bspace.github.io%2Fdiscord-store%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds.join');
});

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: '1343301532996862087',
        client_secret: 'sctUoQ6Wy6pMBm4f6Vc_exCnolKavMa5', // استبدل بـ Client Secret الخاص بك
        grant_type: 'client_credentials',
        code: code,
        redirect_uri: 'https://4bspace.github.io/discord-store/auth/discord/callback',
        scope: 'identify guilds.join'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const accessToken = response.data.access_token;
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    discordUserId = userResponse.data.id;
    res.redirect('/');
});

app.post('/buy', (req, res) => {
    if (!discordUserId) {
        return res.json({ error: 'يجب ربط الديسكورد مسبقا' });
    }

    const productId = req.body.productId;
    // إرسال رسالة إلى Discord
    // هنا يمكنك إرسال رسالة إلى قناة معينة في Discord
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
