// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

// Helper for showing status messages
function showStatus(msg, ok = true) {
  statusEl.textContent = msg;
  statusEl.classList.add("show");
  statusEl.style.border = ok ? "1px solid #16a34a55" : "1px solid #ef444455";
  statusEl.hidden = false;
}
function hideStatus() {
  statusEl.textContent = "";
  statusEl.classList.remove("show");
  statusEl.hidden = true;
}

// Validation functions
function validateName() {
  const el = document.getElementById("name");
  const err = document.getElementById("name-error");
  if (!el.value.trim()) {
    err.textContent = "Please enter your name.";
    el.classList.add("error");
    return false;
  }
  err.textContent = "";
  el.classList.remove("error");
  return true;
}
function validateEmail() {
  const el = document.getElementById("email");
  const err = document.getElementById("email-error");
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!el.value.trim()) {
    err.textContent = "Email is required.";
    el.classList.add("error");
    return false;
  }
  if (!re.test(el.value.trim())) {
    err.textContent = "Please enter a valid email.";
    el.classList.add("error");
    return false;
  }
  err.textContent = "";
  el.classList.remove("error");
  return true;
}
function validateMessage() {
  const el = document.getElementById("message");
  const err = document.getElementById("message-error");
  if (el.value.trim().length < 10) {
    err.textContent = "Message must be at least 10 characters.";
    el.classList.add("error");
    return false;
  }
  err.textContent = "";
  el.classList.remove("error");
  return true;
}

// Attach listeners
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("message").addEventListener("input", validateMessage);

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideStatus();

  if (!validateName() | !validateEmail() | !validateMessage()) {
    showStatus("Please fix the highlighted fields and resubmit.", false);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed");
    showStatus("Thanks! Your message was sent successfully.", true);
    form.reset();
  } catch (err) {
    showStatus("There was an error sending your message.", false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  form.reset();
  hideStatus();
  form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));
  form.querySelectorAll(".error-text").forEach((e) => (e.textContent = ""));
});
