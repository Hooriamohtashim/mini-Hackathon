

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

const cart = [];
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCart = document.getElementById("close-cart");
const viewCartButton = document.getElementById("view-cart");

document.querySelectorAll(".shop-now").forEach((button) =>{
    button.addEventListener("click" , (e) => {
        const product = e.target.closest(".product");
        const productId = product.dataset.id;
        const productName = product.databset.name;
        const productPrice = parseFloat(product.database.price);

        cart.push({id:productId, name:productName, price:productPrice});
    CartUpdate();
    })
})

function CartUpdate() {
    cartItems.innerHTML="";
    let total = 0 ;


cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent= `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
});

cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function showCart (){
    cartModal.style.display = "none";

}

closeCart.addEventListener("click" , showCart);

let currentIndex = 0 ;
const SliderItems = document.querySelectorAll(".slider-item");
const totalItems = SliderItems.length;

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    SliderItems.forEach((item,index) => {
        item.style.transform = `translateX(-${currentIndex * 100}%)`;

    });
} ,3000 )