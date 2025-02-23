document.getElementById('connect-discord').addEventListener('click', () => {
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=1343301532996862087&response_type=code&redirect_uri=https%3A%2F%2F4bspace.github.io%2Fdiscord-store%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds.join';
});

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.getAttribute('data-product');
        const response = await fetch('/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            alert('تم شراء المنتج بنجاح!');
        }
    });
});
