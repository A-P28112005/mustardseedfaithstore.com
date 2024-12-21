function addToCart(productName, productPrice) {
    alert(`${productName} has been added to your cart at $${productPrice}.`);
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert(`Thank you, ${name}! Your message has been received. We will contact you at ${email} soon.`);
    // You can add further logic to send the form data to your backend server here.
}