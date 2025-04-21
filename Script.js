emailjs.init("4kaQGx2Gv_ZjpHoiK"); // Your Public Key

const likeBox = document.getElementById('likeBox');
const popup = document.getElementById('popup');
const orderForm = document.getElementById('orderForm');
const packageName = document.getElementById('packageName');

for (let like = 100; like <= 2000; like += 100) {
  const price = (like / 100) * 20;
  likeBox.innerHTML += `
    <div class="box">
      <h2>${like} Likes</h2>
      <div class="price">${price} Taka</div>
      <button class="buy-btn" onclick="openPopup('${like} Likes - ${price} Taka')">Buy Now</button>
    </div>
  `;
}

function openPopup(packageInfo) {
  popup.style.display = 'flex';
  packageName.value = packageInfo;
}

function closePopup() {
  popup.style.display = 'none';
  orderForm.reset();
}

orderForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = orderForm.name.value;
  const uid = orderForm.uid.value;
  const bkash = orderForm.bkash.value;
  const trx = orderForm.trx.value;
  const packageInfo = packageName.value;

  const orderDetails = `Order Details:\nName: ${name}\nUID: ${uid}\nbKash: ${bkash}\nTRX ID: ${trx}\nPackage: ${packageInfo}`;
  
  // Send the order details to WhatsApp using the Click-to-Chat link
  const whatsappLink = `https://wa.me/+8801701260364?text=${encodeURIComponent(orderDetails)}`;
  window.open(whatsappLink, '_blank');

  // Optional: If you still want to keep the email functionality
  emailjs.sendForm("service_123abc", "template_ug6qenv", this) // Change service_123abc to your actual one
    .then(() => {
      alert("Order Sent Successfully! You will be contacted soon.");
      closePopup();
    }, (error) => {
      alert("Failed to send order. Please try again.");
      console.log(error);
    });
});
