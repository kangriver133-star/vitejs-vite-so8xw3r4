// ===============================
// 투자 도우미 - 전체 로직
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const stocks = [];

  // ===== HTML 요소 =====
  const monthlyMoneyInput = document.getElementById("monthlyMoney");
  const stockNameInput = document.getElementById("stockName");
  const stockRatioInput = document.getElementById("stockRatio");

  const addStockBtn = document.getElementById("addStockBtn");
  const calculateBtn = document.getElementById("calculateBtn");
  const backBtn = document.getElementById("backBtn");

  const stockList = document.getElementById("stockList");
  const resultList = document.getElementById("resultList");

  const home = document.getElementById("home");
  const resultPage = document.getElementById("resultPage");

  // ===============================
  // 종목 추가
  // ===============================
  addStockBtn.addEventListener("click", () => {
    const name = stockNameInput.value.trim();
    const ratio = Number(stockRatioInput.value);

    if (!name || ratio <= 0) {
      alert("종목명과 비율을 올바르게 입력하세요");
      
  
      return;
    }

    // 종목명 중복 체크
    const isDuplicate = stocks.some(
    (stock) => stock.name === name);

    if (isDuplicate) {
      alert("이미 추가된 종목입니다");
      return;
    }

    const currentTotalRatio = stocks.reduce((sum, s) => sum + s.ratio, 0);
    if (currentTotalRatio + ratio > 100) {
      alert(`비율 합이 100%를 초과합니다 (현재: ${currentTotalRatio}%)`);
      return;
    }
    if (currentTotalRatio === 100) {
      alert("이미 비율이 100%입니다");
      return;
    }

    stocks.push({ name, ratio });
    stockNameInput.value = "";
    stockRatioInput.value = "";

    renderStockList();
  });

  // ===============================
  // 종목 리스트 렌더링
  // ===============================
  function renderStockList() {
    stockList.innerHTML = "";

    stocks.forEach((stock, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${stock.name} (${stock.ratio}%)
        <button data-index="${index}">삭제</button>
      `;

      stockList.appendChild(li);
    });

    stockList.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        stocks.splice(index, 1);
        renderStockList();
      });
    });
  }

  // ===============================
  // 계산 & 결과 보기
  // ===============================
  calculateBtn.addEventListener("click", () => {
    const monthlyMoney = Number(monthlyMoneyInput.value);

    if (monthlyMoney <= 0) {
      alert("월 투자 금액을 입력하세요");
      return;
    }

    if (stocks.length === 0) {
      alert("종목을 하나 이상 추가하세요");
      return;
    }

    const totalRatio = stocks.reduce((sum, s) => sum + s.ratio, 0);

    if (totalRatio !== 100) {
      alert(`비율 합이 100%가 아닙니다 (현재: ${totalRatio}%)`);
      return;
    }

    // 결과 출력
   // 결과 출력 (표)
    const resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = "";

    stocks.forEach((stock) => {
      const money = Math.round(
        (monthlyMoney * stock.ratio) / 100
      );

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${stock.name}</td>
        <td>${stock.ratio}%</td>
        <td>${money.toLocaleString()} 원</td>
      `;

      resultBody.appendChild(tr);
    });


    // 화면 전환
    home.style.display = "none";
    resultPage.style.display = "block";
  });

  // ===============================
  // 홈으로 돌아가기
  // ===============================
  backBtn.addEventListener("click", () => {
    resultPage.style.display = "none";
    home.style.display = "block";
  });
});
