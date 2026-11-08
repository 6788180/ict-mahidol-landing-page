const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobileLayout = window.matchMedia("(max-width: 860px)");

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
}

function syncMenu() {
  menuToggle.hidden = !mobileLayout.matches;
  navigation.classList.toggle("is-collapsible", mobileLayout.matches);
  setMenu(false);
}

syncMenu();
mobileLayout.addEventListener("change", syncMenu);

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") === "false");
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !mobileLayout.matches) return;
  setMenu(false);

  // Keep keyboard focus in the page when the activated link is hidden.
  if (link.hash && link.getAttribute("href").startsWith("#")) {
    const section = document.getElementById(link.hash.slice(1));
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Animate once as each card enters view. Content stays visible if scripts are disabled.
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("has-entered");
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.16 });

  document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));
}
