const passwordLengthEl = document.querySelector("#password-length");
const passInput = document.getElementById("password-input");
const copyPassButton = document.querySelector("#copy-button");

let rangeValue = 16;

function generatePass() {
  const chars =
    "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ123456789?!@&*()[]#";

  let password = "";

  for (let i = 0; i < rangeValue; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  passInput.value = password;
}

const copyPass = () => {
  navigator.clipboard.writeText(passInput.value);
};

copyPassButton.addEventListener("click", copyPass);

passwordLengthEl.addEventListener("input", () => {
  rangeValue = passwordLengthEl.value;
  generatePass();
});

generatePass();
