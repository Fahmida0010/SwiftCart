const BASE_URL = "https://fakestoreapi.com/products";

let allProducts = [];
let cart = [];

/* ================= INITIAL LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  loadAllProducts();
  loadCategories();
});

/* ================= LOAD ALL PRODUCTS ================= */
const loadAllProducts = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  allProducts = data;

  displayProducts(data);
  displayTrending(data.slice(0, 3));
};

/* ================= LOAD CATEGORIES ================= */
const loadCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  const categories = await res.json();

  const container = document.getElementById("category-container");

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.className = "btn btn-outline btn-sm";

    btn.onclick = () => loadProductsByCategory(cat);

    container.appendChild(btn);
  });
};

/* ================= PRODUCTS BY CATEGORY ================= */
const loadProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  const data = await res.json();
  displayProducts(data);
};

/* ================= DISPLAY PRODUCTS ================= */
const displayProducts = (products) => {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="card bg-base-100 shadow">
        <figure class="h-48 p-4">
          <img src="${product.image}" class="h-full object-contain" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-sm">${product.title.slice(0,40)}...</h2>
          <p class="badge badge-secondary">${product.category}</p>
          <p class="font-bold">$${product.price}</p>
          <p>⭐ ${product.rating.rate}</p>
          <div class="card-actions justify-between">
            <button onclick="showDetails(${product.id})" class="btn btn-info btn-sm">Details</button>
            <button onclick="addToCart(${product.id})" class="btn btn-primary btn-sm">Add</button>
          </div>
        </div>
      </div>
    `;
  });
};

/* ================= TRENDING ================= */
const displayTrending = (products) => {
  const container = document.getElementById("trending-container");

  products.forEach(product => {
    container.innerHTML += `
      <div class="card bg-base-100 shadow">
        <figure class="h-48 p-4">
          <img src="${product.image}" class="h-full object-contain"/>
        </figure>
        <div class="card-body">
          <h2 class="text-sm font-bold">${product.title.slice(0,30)}...</h2>
          <p>$${product.price}</p>
        </div>
      </div>
    `;
  });
};

/* ================= MODAL ================= */
const showDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const product = await res.json();

  const modal = document.getElementById("product-modal");

  modal.innerHTML = `
  <div class="modal-box">
    <h3 class="font-bold text-lg">${product.title}</h3>
    <img src="${product.image}" class="h-40 mx-auto my-4 object-contain"/>
    <p>${product.description}</p>
    <p class="font-bold mt-2">$${product.price}</p>
    <p>⭐ ${product.rating.rate}</p>
    <div class="modal-action">
      <button onclick="addToCart(${product.id})" class="btn btn-primary">Buy Now</button>
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  `;

  modal.showModal();
};

/* ================= CART ================= */
const addToCart = (id) => {
  const product = allProducts.find(p => p.id === id);
  cart.push(product);
  document.getElementById("cart-count").innerText = cart.length;
};