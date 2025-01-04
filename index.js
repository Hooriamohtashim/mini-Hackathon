

const firebaseConfig = {
    apiKey: "AIzaSyDMknwi8Iu74kb7QyecG1jGSCbmRaW-beY",
    authDomain: "hackathon-60882.firebaseapp.com",
    databaseURL: "https://hackathon-60882-default-rtdb.firebaseio.com",
    projectId: "hackathon-60882",
    storageBucket: "hackathon-60882.firebasestorage.app",
    messagingSenderId: "1017409968758",
    appId: "1:1017409968758:web:aa078718f6aafb93051d57"
};


firebase.initializeApp(firebaseConfig);
var Hackathon = firebase.database().ref("contactForm");


document.getElementById("contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");

    if (name && email && message) {
        console.log(name.value, email.value, message.value);
        saveMessages(name.value, email.value, message.value);
    } else {
        console.error('Form elements not found');
    }
}


const saveMessages = (name, email, message) => {
    var newContactForm = Hackathon.push();
    newContactForm.set({
        name: name,
        email: email,
        message: message,
    }).then(() => {
        console.log("Data saved successfully");
    }).catch((error) => {
        console.error("Error saving data: ", error);
    });
};



let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartModal = document.getElementById("cart-modal");
function toggleCart() {
    cartModal.classList.toggle("visible");
}
document.querySelectorAll(".shop-now").forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        CartUpdate();
    });
});


function CartUpdate() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <span>
                    <button onclick="decrease('${item.name}')">-</button>
                    ${item.quantity}
                    <button onclick="increase('${item.name}')">+</button>
                </span>
            `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}


function decrease(productName) {
    productName.quauntity--;
    CartUpdate();
}

function increase(productName) {
    productName.quauntity++;
    CartUpdate();
}


function clearCart() {
    cart = [];
    CartUpdate();
}

function closeCart() {
    var modal = document.querySelector("#cart-modal");
    modal.classList.remove("visible");
}