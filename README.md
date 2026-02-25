
Live link : https://heartfelt-fox-2597a9.netlify.app

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
