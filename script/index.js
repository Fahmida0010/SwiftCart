let currentProducts = [];
let cart = [];

/** 1️⃣ Initialize App */
const init = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    currentProducts = await res.json();
    loadTrendingProducts(currentProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

/** 2️⃣ SPA Navigation */
const navigateTo = (page) => {
  document.getElementById("home-page").classList.toggle("hidden", page !== "home");
  document.getElementById("all-products-page").classList.toggle("hidden", page !== "products");

  if (page === "products") {
    loadCategories();
    loadAllProducts(currentProducts);
  }
};

/** 3️⃣ Trending Products */
const loadTrendingProducts = (products) => {
  const container = document.getElementById("trending-container");
  container.innerHTML = "";

  const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);

  topRated.forEach(product => container.appendChild(createProductCard(product)));
};

/** 4️⃣ All Products */
const loadAllProducts = (products) => {
  const container = document.getElementById("all-products-container");
  container.innerHTML = "";
  products.forEach(product => container.appendChild(createProductCard(product)));
};

/** 5️⃣ Categories */
const loadCategories = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    displayCategories(categories);
  } catch (err) {
    console.error(err);
  }
};

const displayCategories = (categories) => {
  const container = document.getElementById("category-container");
  container.innerHTML = "";

  const allBtn = createCategoryButton("all");
  container.appendChild(allBtn);

  categories.forEach(cat => container.appendChild(createCategoryButton(cat)));
};

const createCategoryButton = (category) => {
  const btn = document.createElement("button");
  btn.innerText = category.toUpperCase();
  btn.className = "category-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-purple-500 hover:text-white transition";

  btn.onclick = () => {
    setActiveCategory(btn);
    if (category === "all") loadAllProducts(currentProducts);
    else fetchProductsByCategory(category);
  };

  return btn;
};

const setActiveCategory = (activeBtn) => {
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.remove("bg-purple-600", "text-white");
    btn.classList.add("bg-gray-200");
  });
  activeBtn.classList.remove("bg-gray-200");
  activeBtn.classList.add("bg-purple-600", "text-white");
};

const fetchProductsByCategory = async (category) => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("hidden");
  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    loadAllProducts(data);
  } catch (err) {
    console.error(err);
  }
  spinner.classList.add("hidden");
};

/** 6️⃣ Product Card */
const createProductCard = (product) => {
  const card = document.createElement("div");
  card.className = "bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative";

  card.innerHTML = `
    <img src="${product.image}" class="h-40 w-full object-contain mb-4">
    <span class="absolute top-3 left-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full uppercase">${product.category}</span>
    <h3 class="font-semibold text-lg mb-2 line-clamp-2">${product.title}</h3>
    <p class="text-purple-600 font-bold text-xl mb-2">$${product.price}</p>
    <p class="text-yellow-500 font-semibold mb-4">⭐ ${product.rating.rate}</p>
    <div class="flex gap-2">
      <button class="details-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex-1" data-id="${product.id}">Details</button>
      <button class="add-to-cart-btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex-1" data-id="${product.id}">Add to Cart</button>
    </div>
  `;
  return card;
};

/** 7️⃣ Global Click Listener for Add/Remove */
document.addEventListener("click", function(e){
  // Add to Cart
  if(e.target.classList.contains("add-to-cart-btn")){
    const id = parseInt(e.target.getAttribute("data-id"));
    const product = currentProducts.find(p => p.id === id);
    if(product) addToCart(product);
  }

  // Remove from Cart
  if(e.target.classList.contains("remove-cart-btn")){
    const id = parseInt(e.target.getAttribute("data-id"));
    removeFromCart(id);
  }

  // Open Modal
  if(e.target.classList.contains("details-btn")){
    const id = parseInt(e.target.getAttribute("data-id"));
    openModal(id);
  }
});

/** 8️⃣ Cart Functions */
function addToCart(product){
  const existing = cart.find(item => item.id === product.id);
  if(existing) existing.quantity += 1;
  else cart.push({...product, quantity:1});

  alert("✅ Product Added to Cart");
  updateCartUI();
}

function removeFromCart(id){
  const item = cart.find(p => p.id === id);
  if(!item) return;

  if(item.quantity > 1) item.quantity -=1;
  else cart = cart.filter(p => p.id !== id);

  alert("❌ Product Removed");
  updateCartUI();
}

function calculateTotal(){
  return cart.reduce((sum, item)=> sum + Number(item.price)*item.quantity, 0).toFixed(2);
}

function updateCartUI(){
  const cartContainer = document.getElementById("cart-container");
  const totalPrice = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  cart.forEach(item=>{
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b py-2";
    div.innerHTML = `
      <span>${item.title} (x${item.quantity})</span>
      <button class="remove-cart-btn text-red-500" data-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalPrice.innerText = `$${calculateTotal()}`;
}

/** 9️⃣ Modal */
const openModal = (id)=>{
  const modal = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  const product = currentProducts.find(p => p.id === id);
  if(!product) return;

  content.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="w-full flex justify-center bg-gray-50 rounded-xl p-4">
        <img src="${product.image}" class="h-48 md:h-64 object-contain">
      </div>
      <div>
        <span class="inline-block bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase">${product.category}</span>
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">${product.title}</h2>
        <p class="text-gray-600 text-sm md:text-base leading-relaxed mb-4">${product.description}</p>
        <div class="flex items-center justify-between mb-6">
          <p class="text-2xl font-black text-purple-600">$${product.price}</p>
          <p class="text-yellow-500 font-bold">⭐ ${product.rating.rate}</p>
        </div>
        <button class="add-to-cart-btn bg-purple-600 text-white px-4 py-2 rounded" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = ()=>{
  document.getElementById("modal-overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
};

// Start App
init();