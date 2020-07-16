{
  const navLinks = document.querySelector(".nav-links");
  const BurgerBtn = document.querySelector(".burgerIcons");
  const links = document.querySelectorAll(".single-links");

  BurgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    BurgerBtn.classList.toggle("hide");
  });
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      BurgerBtn.classList.remove("hide");
    });
  });
}

window.addEventListener("scroll", function () {
  const top = document.querySelector(".back-to-top");
  if (scrollY > 200) {
    top.style.display = "block";
  } else {
    top.style.display = "none";
  }
});

window.addEventListener("load", () => {
  setTimeout(function () {
    document.querySelector(".preloader").classList.add("hide-preloader");
  }, 3000);
});

const quote = [
  "Celebrate Your Small Wins",
  "Surround Yourself With Motivated People",
  "Create a Positive Environment",
  "“Do one thing every day that scares you.”― Eleanor Roosevelt",
  "“Your passion is waiting for your courage to catch up.” – Isabelle Lafleche",
  "“Keep your eyes on the stars, and your feet on the ground.” – Theodore Roosevelt",
];

setInterval(() => {
  const rand = Math.floor(Math.random() * quote.length);
  document.querySelector(".random-qoute h1").innerHTML = quote[rand];
}, 4500);
