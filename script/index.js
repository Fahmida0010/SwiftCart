// let currentProducts = [];
// let cartCount = 0;

// /**
//  * 1. Fetch products from API
//  */
// const init = async () => {
//   try {
//     const res = await fetch("https://fakestoreapi.com/products");
//     const data = await res.json();
//     currentProducts = data;
//     loadTrendingProducts(data);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//   }
// };

// /**
//  * 2. Display products in the container
//  */
// const loadTrendingProducts = (products) => {
//   const container = document.getElementById("trending-container");
//   if (!container) return;
//   container.innerHTML = "";

//   // Sort and pick top 3
//   const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);

//   topRated.forEach(product => {
//     const card = document.createElement("div");
//     card.className = "bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative";

//     card.innerHTML = `
//       <img src="${product.image}" class="h-40 w-full object-contain mb-4">
//       <span class="absolute top-3 left-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full uppercase">${product.category}</span>
//       <h3 class="font-semibold text-lg mb-2 line-clamp-2">${product.title}</h3>
//       <p class="text-purple-600 font-bold text-xl mb-2">$${product.price}</p>
//       <p class="text-yellow-500 font-semibold mb-4">⭐ ${product.rating.rate}</p>
//       <div class="flex gap-2">
//         <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex-1" onclick="openModal(${product.id})">Details</button>
//         <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex-1" onclick="updateCartUI()">Add to Cart</button>
//       </div>
//     `;
//     container.appendChild(card);
//   });
// };

// /**
//  * 3. Cart Logic
//  */
// const updateCartUI = () => {
//   const cartBadge = document.getElementById("cart-count-badge");
  
//   cartCount++;
  
//   if (cartBadge) {
//     cartBadge.innerText = cartCount;
//   }
  
//   // Custom Alert
//   alert("🔥 Success! It's added to your cart.");
// };

// /**
//  * 4. Responsive Modal Logic
//  */
// const openModal = (id) => {
//   const modal = document.getElementById("modal-overlay");
//   const content = document.getElementById("modal-content");
//   const product = currentProducts.find(p => p.id === id);

//   if (!product) return;

//   content.innerHTML = `
//     <div class="flex flex-col gap-6">
//       <div class="w-full flex justify-center bg-gray-50 rounded-xl p-4">
//         <img src="${product.image}" class="h-48 md:h-64 object-contain">
//       </div>
      
//       <div>
//         <span class="inline-block bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase">
//           ${product.category}
//         </span>
//         <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">${product.title}</h2>
//         <p class="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-4 md:line-clamp-none">
//           ${product.description}
//         </p>
        
//         <div class="flex items-center justify-between mb-6">
//           <p class="text-2xl font-black text-purple-600">$${product.price}</p>
//           <p class="text-yellow-500 font-bold flex items-center gap-1">⭐ ${product.rating.rate}</p>
//         </div>

//         <div class="flex flex-col sm:flex-row gap-3">
//           <button onclick="updateCartUI()" class="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex-1 shadow-md active:scale-95">
//             Add to Cart
//           </button>
//           <button class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex-1 active:scale-95">
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   `;

//   modal.classList.remove("hidden");
//   document.body.style.overflow = "hidden"; // Stop scrolling
// };

// const closeModal = () => {
//   document.getElementById("modal-overlay").classList.add("hidden");
//   document.body.style.overflow = "auto"; // Start scrolling
// };

// // Start the app
// init();


let currentProducts = [];
let cartCount = 0;

/**
 * 1. Initialize App
 */
const init = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    currentProducts = data;

    // Load trending in home page
    loadTrendingProducts(data);

  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

/**
 * 2. SPA Navigation
 */
const navigateTo = (page) => {
  const homePage = document.getElementById("home-page");
  const allProductsPage = document.getElementById("all-products-page");

  if (page === "home") {
    homePage.classList.remove("hidden");
    allProductsPage.classList.add("hidden");
  }

  if (page === "products") {
    homePage.classList.add("hidden");
    allProductsPage.classList.remove("hidden");

     loadCategories();     
    loadAllProducts(currentProducts);
  }
};

/**
 * 3. Load Trending Products (Top 3)
 */
const loadTrendingProducts = (products) => {
  const container = document.getElementById("trending-container");
  if (!container) return;

  container.innerHTML = "";

  const topRated = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3);

  topRated.forEach(product => {
    container.appendChild(createProductCard(product));
  });
};

/**
 * 4. Load All Products
 */
const loadAllProducts = (products) => {
  const container = document.getElementById("all-products-container");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    container.appendChild(createProductCard(product));
  });
};

const loadCategories = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();

    displayCategories(categories);

  } catch (err) {
    console.error("Category load error:", err);
  }
};

//button
const displayCategories = (categories) => {
  const container = document.getElementById("category-container");
  container.innerHTML = "";

  // All button
  const allBtn = createCategoryButton("all");
  container.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = createCategoryButton(cat);
    container.appendChild(btn);
  });
};

//create
const createCategoryButton = (category) => {
  const btn = document.createElement("button");

  btn.innerText = category.toUpperCase();
  btn.className =
    "category-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-purple-500 hover:text-white transition";

  btn.onclick = () => {
    setActiveCategory(btn);

    if (category === "all") {
      loadAllProducts(currentProducts);
    } else {
      fetchProductsByCategory(category);
    }
  };

  return btn;
};
//active
const setActiveCategory = (activeBtn) => {
  const buttons = document.querySelectorAll(".category-btn");

  buttons.forEach(btn => {
    btn.classList.remove("bg-purple-600", "text-white");
    btn.classList.add("bg-gray-200");
  });

  activeBtn.classList.remove("bg-gray-200");
  activeBtn.classList.add("bg-purple-600", "text-white");
};

// fetch pro catg
const fetchProductsByCategory = async (category) => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("hidden");

  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();

    loadAllProducts(data);

  } catch (err) {
    console.error("Category product load error:", err);
  }

  spinner.classList.add("hidden");
};



/**
 * 5. Reusable Product Card
 */
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
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex-1" onclick="openModal(${product.id})">Details</button>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex-1" onclick="updateCartUI()">Add to Cart</button>
    </div>
  `;

  return card;
};

/**
 * 6. Cart Logic
 */
const updateCartUI = () => {
  const cartBadge = document.getElementById("cart-count-badge");

  cartCount++;

  if (cartBadge) {
    cartBadge.innerText = cartCount;
  }

  alert("🔥 Success! It's added to your cart.");
};

/**
 * 7. Modal Logic
 */
const openModal = (id) => {
  const modal = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  const product = currentProducts.find(p => p.id === id);

  if (!product) return;

  content.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="w-full flex justify-center bg-gray-50 rounded-xl p-4">
        <img src="${product.image}" class="h-48 md:h-64 object-contain">
      </div>
      <div>
        <span class="inline-block bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase">
          ${product.category}
        </span>
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">${product.title}</h2>
        <p class="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
          ${product.description}
        </p>
        <div class="flex items-center justify-between mb-6">
          <p class="text-2xl font-black text-purple-600">$${product.price}</p>
          <p class="text-yellow-500 font-bold">⭐ ${product.rating.rate}</p>
        </div>
        <button onclick="updateCartUI()" class="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition w-full">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
};




// Start app
init();