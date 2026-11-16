const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const nameInput = contactForm.elements.namedItem("name");
const emailInput = contactForm.elements.namedItem("email");
const messageInput = contactForm.elements.namedItem("message");
const fields = [nameInput, emailInput, messageInput];
const emailPattern =
  /^[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)+$/i;

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const errors = [];
  fields.forEach((field) => field.setAttribute("aria-invalid", "false"));

  if (!nameInput.value.trim()) {
    errors.push("이름을 입력해 주세요.");
    nameInput.setAttribute("aria-invalid", "true");
  }

  const email = emailInput.value.trim();
  if (!email) {
    errors.push("이메일 주소를 입력해 주세요.");
    emailInput.setAttribute("aria-invalid", "true");
  } else if (!emailPattern.test(email)) {
    errors.push("올바른 이메일 주소를 입력해 주세요.");
    emailInput.setAttribute("aria-invalid", "true");
  }

  if (!messageInput.value.trim()) {
    errors.push("메시지를 입력해 주세요.");
    messageInput.setAttribute("aria-invalid", "true");
  }

  if (errors.length) {
    formStatus.dataset.state = "error";
    formStatus.textContent = errors.join(" ");
    fields.find((field) => field.getAttribute("aria-invalid") === "true").focus();
    return;
  }

  formStatus.dataset.state = "success";
  formStatus.textContent =
    "입력 내용이 확인되었습니다. 데모 양식이므로 실제 이메일은 전송되지 않았습니다.";
});

fields.forEach((field) => {
  field.setAttribute("aria-describedby", "form-status");
  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", "false");
    formStatus.removeAttribute("data-state");
    formStatus.textContent = "";
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
