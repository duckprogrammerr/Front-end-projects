const burgerBtn = document.getElementById("burger-btn");
const otherLinks = document.getElementById("products-other-links");
const closeBtn = document.getElementById('close-btn');


burgerBtn.addEventListener("click",()=> otherLinks.classList.contains("active")?otherLinks.classList.remove("active"): otherLinks.classList.add("active"));
closeBtn.addEventListener("click",()=> otherLinks.classList.remove("active"));

