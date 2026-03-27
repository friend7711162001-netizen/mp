// 定義 DOM 元素
const birthInput = document.getElementById("birthDate");
const resultDiv = document.getElementById("result");
const calcBtn = document.getElementById("calcBtn");

// 1. 當頁面載入時，檢查是否有舊資料
window.onload = function() {
  const savedDate = localStorage.getItem("dogBirthDate");
  if (savedDate) {
    birthInput.value = savedDate; // 把舊日期填入輸入框
    calculateAge(); // 自動計算一次
  }
};

// 2. 計算邏輯
function calculateAge() {
  const birthDate = birthInput.value;

  if (!birthDate) {
    resultDiv.innerHTML = "請先選擇出生日期！";
    return;
  }

  // 儲存日期到 localStorage
  localStorage.setItem("dogBirthDate", birthDate);

  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 0) {
    resultDiv.innerHTML = "日期錯誤！";
    return;
  }

  let humanAge = 0;
  if (age <= 2) {
    humanAge = age * 10.5;
  } else {
    humanAge = 2 * 10.5 + (age - 2) * 4;
  }

  resultDiv.innerHTML = `
    🐶 狗狗實歲：${age} 歲 <br>
    👨 換算人類：約 ${humanAge.toFixed(1)} 歲
  `;
}

// 監聽按鈕點擊
calcBtn.addEventListener("click", calculateAge);