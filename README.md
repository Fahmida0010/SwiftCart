# SwiftCart – Shopping Platform

SwiftCart is a modern shopping web application where users can browse clothing products, filter them by category, view detailed product information, and manage items in their shopping cart.

The platform provides a smooth and responsive shopping experience with features like product filtering, cart management, and real-time total price calculation.

---

# Project Overview

SwiftCart is designed as a simple and user-friendly e-commerce platform. Users can explore different clothing products, filter items based on categories, and check product details before adding them to their shopping cart.

The application also allows users to manage their cart by adding or removing items and viewing the total cost of all selected products. The project focuses on building a responsive UI, product filtering, and dynamic cart functionality.

---

# Live Links

**Live Website**
https://heartfelt-fox-2597a9.netlify.app/

**GitHub Repository**
https://github.com/Fahmida0010/SwiftCart.git

---

# Key Features

### Product Browsing

* View clothing products on the shop page
* Clean and responsive product card layout

### Category Filtering

* Filter products category-wise
* Quickly find desired clothing items

### Product Details

* View detailed product information
* Includes product image, description, and price

### Cart System

* Add products to cart
* View all added cart items

### Cart Management

* Remove products from cart
* Automatically updates cart list

### Total Price Calculation

* Displays total price of all added products in the cart

### Responsive Design

* Fully responsive design for desktop, tablet, and mobile devices

---

# Main Technologies Used

* React
* React Router
* Tailwind CSS
* JavaScript
* Vite

---

# Dependencies Used

* react
* react-dom
* react-router-dom
* tailwindcss
* vite

---

# How to Run the Project Locally

### Step 1: Clone the repository

```bash id="3d9m3d"
git clone https://github.com/Fahmida0010/SwiftCart.git
```

### Step 2: Navigate to the project folder

```bash id="7ayfci"
cd SwiftCart
```

### Step 3: Install dependencies

```bash id="1ml9fo"
npm install
```

### Step 4: Run the development server

```bash id="ub2j1s"
npm run dev
```

Then open:

```id="6rr8us"
http://localhost:5173
```

---
  

1) What is the difference between null and undefined?
Answer : null মানে ইচ্ছাকৃতভাবে কোনো value নেই। যেমন: 
 let x = null; <!-- এখানে x-র কোনো value নেই -->
undefined মানে variable declare করা হয়েছে কিন্তু কোন value দেওয়া হয়নি। যেমন:
let y; 
console.log(y); <!-- output: undefined -->

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
Answer : map(): array এর প্রতিটা element কে modify করে নতুন array return করে।
যেমন :
let nums = [1,2,3];
let doubled = nums.map(n => n*2); 
console.log(doubled); <!-- // [2,4,6] -->
forEach(): array এর প্রতিটা element এ operation করে কিন্তু নতুন array return করে না।
যেমন :
nums.forEach(n => console.log(n*2)); 
<!-- // 2,4,6 print হবে -->
map()  নতুন array দেয়, forEach()  শুধু কাজ করে কোনো return দেয় না।

3) What is the difference between == and ===?
Answer : == (loose equality): value চেক করে, type ignore করে।
5 == "5"
 <!-- // true -->
=== (strict equality): value আর type দুটোই চেক করে।
5 === "5" 
<!-- // false -->

4) What is the significance of async/await in fetching API data?
Answer : async/await ব্যবহার করলে আমরা asynchronous কাজকে synchronous style এ লিখতে পারি। মানে, API call বা database call করার সময় wait করতে পারি, কিন্তু code clean ও readable থাকে।
যেমন : 
async function fetchData() {
  let res = await fetch("https://api.example.com/data");
  let data = await res.json();
  console.log(data);
}
async/await  কোড সহজ, readable এবং data handle করার সময় smooth।

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
Answer : Global scope: Variable globally declare হলে যেকোন জায়গা থেকে access করা যায়।
যেমন :let a = 10; // global
function test(){ console.log(a); } 
<!-- // a accessable -->
Function scope: Variable function এর ভিতরে declare হলে শুধু সেই function এর ভিতর থেকে access করা যায়।
যেমন :function test() {
  let b = 20;
  console.log(b);
}
console.log(b); 
<!-- // error -->
Block scope: let বা const block এর ভিতরে declare হলে শুধু সেই block এর ভিতর থেকে accessable।
যেমন :if(true){
  let c = 30;
}
console.log(c);
 <!-- // error -->
 সহজভাবে বললে scope মানে কোথায় variable access করা যাবে সেটাকে বুঝায়।
