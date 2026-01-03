const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const skillsInput = document.getElementById("skills");

chrome.storage.sync.get(["userData"], (result) => {
  if (result.userData) {
    nameInput.value = result.userData.name || "";
    emailInput.value = result.userData.email || "";
    phoneInput.value = result.userData.phone || "";
    skillsInput.value = result.userData.skills || "";
  }
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    skills: skillsInput.value
  };

  chrome.storage.sync.set({ userData }, () => {
    alert("Details saved successfully");
  });
});

document.getElementById("fillBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "AUTOFILL_FORM" });
  });
});