chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "AUTOFILL_FORM") {
    chrome.storage.sync.get(["userData"], (result) => {
      if (!result.userData) {
        alert("Please save your details first.");
        return;
      }
      autofillForm(result.userData);
    });
  }
});

function autofillForm(userData) {
  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    const placeholder = (input.placeholder || "").toLowerCase();
    const nameAttr = (input.name || "").toLowerCase();
    const type = (input.type || "").toLowerCase();

    if (placeholder.includes("name") || nameAttr.includes("name")) {
      input.value = userData.name;
    }
    if (type === "email" || placeholder.includes("email") || nameAttr.includes("email")) {
      input.value = userData.email;
    }
    if (type === "tel" || placeholder.includes("phone") || nameAttr.includes("phone") || nameAttr.includes("mobile")) {
      input.value = userData.phone;
    }
    if (placeholder.includes("skill") || placeholder.includes("experience") || nameAttr.includes("skill") || nameAttr.includes("experience")) {
      input.value = userData.skills;
    }
  });

  alert("Form autofilled successfully!");
}