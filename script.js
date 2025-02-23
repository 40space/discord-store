document.getElementById('connect-discord').addEventListener('click', () => {
    window.location.href = '/auth/discord';
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