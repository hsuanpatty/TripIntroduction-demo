$(document).ready(function () {
  // 更新表格函數
  function updateTable(tripDate) {
    // 隱藏所有的旅遊表格
    $('.tourist-table table').hide();

    // 检查 tripDate 是否为空或未定义
    if (!tripDate || tripDate.length === 0) {
// 如果为空或未定义，创建一个表格显示“無行程”
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1;
var tripDate = currentYear + '-' + currentMonth;
var noTripTable = '<table trip-date="' + tripDate + '">' +
  '<thead class="travel-title">' +
  '<tr>' +
  '<th>出發日期</th>' +
  '<th>機位席次 ｜ 可售席次</th>' +
  '<th>出團狀況</th>' +
  '<th>售價</th>' +
  '</tr>' +
  '</thead>' +
  '<tbody>' +
  '<tr>' +
  '<th class="departure-date">無行程</th>' +
  '</tr>' +
  '</tbody>' +
  '</table>';
// 插入到 DOM 中
// 格式化为所需形式
var formattedDate = currentYear + " 年 " + currentMonth + " 月";
$('.month-header .dateContent').text(formattedDate);
$('.tourist-table').append(noTripTable);
return; // 直接返回，不执行后续操作
    }

    // 顯示與指定 tripDate 相對應的表格
    $('.tourist-table table[trip-date="' + tripDate + '"]').show();
    // 更新日期標題
    var formattedDate = tripDate.replace("-", " 年 ") + " 月";
    $('.month-header .dateContent').text(formattedDate);
  }

  // 初始設置
  updateTable($('.tourist-table table:first').attr('trip-date'));

  // 按下 "nextMonth" 按鈕
  $('#nextMonth').click(function () {
    var $currentTable = $('.tourist-table table:visible');
    var $nextTable = $currentTable.next('table');
    if ($nextTable.length === 0) {
$nextTable = $('.tourist-table table:first');
    }
    var nextTripDate = $nextTable.attr('trip-date');
    // 更新表格
    updateTable(nextTripDate);
  });

  // 按下 "prevMonth" 按鈕
  $('#prevMonth').click(function () {
    var $currentTable = $('.tourist-table table:visible');
    var $prevTable = $currentTable.prev('table');
    if ($prevTable.length === 0) {
$prevTable = $('.tourist-table table:last');
    }
    var prevTripDate = $prevTable.attr('trip-date');
    // 更新表格
    updateTable(prevTripDate);
  });
});

// 行程列表頁 抓取日期
document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 0. 防止瀏覽器捲動位置
  // ==========================================
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // ==========================================
  // 1. 日期格式
  // ==========================================
  function normalize(date) {
    if (!date) return "";

    return date
      .replace(/\([^)]+\)/g, "")           
      .replace(/[\(\)\uff08\uff09]/g, "")   
      .replace(/\s/g, "")                  
      .trim();                             
  }

  // ==========================================
  // 2. 取得目前顯示中的表格 rows
  // ==========================================
  function getActiveRows() {
    const activeTable =
      document.querySelector('.tourist-table table[style*="display: table"]') ||
      document.querySelector('.tourist-table table:not([style*="none"])');

    return activeTable
      ? activeTable.querySelectorAll(".datemain-container")
      : [];
  }

  let rows = getActiveRows();

  // ==========================================
  // 3. 預載入頁面 (包含提取團號邏輯)
  // ==========================================
  document.querySelectorAll(".datemain-container").forEach((row) => {

    const clickedElements = row.querySelectorAll(
      "[onclick*='window.location.href']"
    );

    clickedElements.forEach((el) => {

      const originalOnclick = el.getAttribute("onclick");

      if (originalOnclick && !row.hasAttribute("data-url-extracted")) {

        const match = originalOnclick.match(
          /window\.location\.href\s*=\s*['"]\.?([^'"]+)['"]/
        );

        if (match && match[1]) {
          const fullMatchUrl = match[1];
          let baseUrl = fullMatchUrl.split("?")[0];

          if (!baseUrl.startsWith(".")) {
            baseUrl = "." + baseUrl;
          }

          // 網址中提取現有的 tourNo 參數
          const urlParams = new URLSearchParams(fullMatchUrl.split("?")[1] || "");
          let tourNo = urlParams.get("tourNo") || urlParams.get("tour_no") || "";

          if (!tourNo) {
            tourNo = row.querySelector(".tour-number, .tour-no, .product-number")?.innerText.trim() || "";
          }

          row.setAttribute("data-target-url", baseUrl);
          row.setAttribute("data-tour-no", tourNo);
          row.setAttribute("data-url-extracted", "true");

          // 預先載入處理
          const rawDate = row.querySelector(".departure-date")?.innerText.trim() || "";
          const cleanDate = normalize(rawDate); // 格式如 2026/08/07

          // 
          let prefetchUrl = `${baseUrl}?date=${cleanDate}`;
          if (tourNo) {
            prefetchUrl += `&tourNo=${encodeURIComponent(tourNo)}`;
          }

          const link = document.createElement("link");
          link.rel = "prefetch";
          link.href = prefetchUrl;
          document.head.appendChild(link);
        }
      }

      el.removeAttribute("onclick");
      el.style.cursor = "pointer";
    });
  });

  // ==========================================
  // 4. 右側資訊
  // ==========================================
  function updateRow(row) {

    if (!row) return;

    rows.forEach((r) => {
      r.classList.remove("highlight-row");
    });

    row.classList.add("highlight-row");

    const date =
      row.querySelector(".departure-date")?.innerText.trim() || "";

    const seat =
      row.querySelector(".seats-flight")?.innerText.trim() || "";

    const statusEl = row.querySelector(".status");

    const status =
      statusEl?.innerText.trim() || "";

    const color =
      statusEl?.classList.contains("green")
        ? "green"
        : statusEl?.classList.contains("blue")
        ? "blue"
        : "red";

    const price =
      row.querySelector(".number")?.innerText.trim() || "";

    if (document.getElementById("display-date")) {
      document.getElementById("display-date").innerText = date;
    }

    if (document.getElementById("display-status")) {
      document.getElementById("display-status").innerHTML =
        `<span class="status ${color}">${status}</span>`;
    }

    if (document.getElementById("display-seat")) {
      document.getElementById("display-seat").innerHTML =
        `<span class="blue">${seat}</span>席`;
    }

    if (document.querySelector(".fee .number")) {
      document.querySelector(".fee .number").innerText = price;
    }
  }

  // ==========================================
  // 5. 點擊 row
  // ==========================================
  document.querySelectorAll(".datemain-container").forEach((row) => {

    row.addEventListener("click", function (e) {

      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      const rawDate = this.querySelector(".departure-date")?.innerText.trim() || "";
      const cleanDate = normalize(rawDate); // 格式如 2026/08/07

      let tourNo = this.getAttribute("data-tour-no") || "";
      if (!tourNo) {
        tourNo = this.querySelector(".tour-number, .tour-no, .product-number")?.innerText.trim() || "";
      }

      let baseUrl =
        this.getAttribute("data-target-url") || "./A.html";

      const currentParams = new URLSearchParams(window.location.search);
      const currentFilename = window.location.pathname.split("/").pop() || "";
      const targetFilename = baseUrl.split("/").pop();

      // ==========================================
      // 同頁內切換日期 → 不跳頁，直接平滑滑動
      // ==========================================
      if (currentFilename === targetFilename) {

        updateRow(this);

        this.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // 
        let newUrl = `${window.location.pathname}?date=${cleanDate}`;
        if (tourNo) {
          newUrl += `&tourNo=${encodeURIComponent(tourNo)}`;
        }
        history.replaceState(null, "", newUrl);

        return;
      }

      // ==========================================
      // 換頁前紀錄
      // ==========================================
      sessionStorage.setItem("userClickedDate", "true");

      updateRow(this);

      // 
      let nextUrl = `${baseUrl}?date=${cleanDate}`;
      if (tourNo) {
        nextUrl += `&tourNo=${encodeURIComponent(tourNo)}`;
      }
      window.location.href = nextUrl;
    });
  });

  // ==========================================
  // 6. 頁面載入後網址
  // ==========================================
  const params = new URLSearchParams(window.location.search);
  // 
  const rawTargetDate = params.get("date");
  const targetDate = rawTargetDate ? decodeURIComponent(rawTargetDate) : null; 

  const currentFilename = window.location.pathname.split("/").pop() || "";

  rows = getActiveRows();

  let targetRow = null;

  // ==========================================
  // 
  // ==========================================
  if (targetDate) {
    rows.forEach((row) => {
      const rowDate = row.querySelector(".departure-date")?.innerText.trim();

      // 
      if (rowDate && normalize(rowDate) === normalize(targetDate)) {
        targetRow = row;
      }
    });
  }

  // ==========================================
  //  預設 row
  // ==========================================
  if (!targetRow && rows.length > 0) {

    const fileRowMap = {
      "B.html": 1,
      "C.html": 2,
      "D.html": 3,
      "E.html": 4,
      "F.html": 5,
      "Product_List.html": 6,
      "Special-Event.html": 7,
    };

    const matchedKey = Object.keys(fileRowMap).find((key) =>
      currentFilename.includes(key)
    );

    const targetIndex =
      matchedKey ? fileRowMap[matchedKey] : 0;

    targetRow =
      rows[targetIndex] || rows[0];
  }

  // ==========================================
  // 7. 部局定位
  // ==========================================
  if (targetRow) {

    updateRow(targetRow);

    const hasDateParam = params.has("date");
    const isFromClick = sessionStorage.getItem("userClickedDate") === "true";

    const defaultRawDate = targetRow.querySelector(".departure-date")?.innerText.trim() || "";
    const defaultCleanDate = normalize(defaultRawDate); 
    
    let defaultTourNo = targetRow.getAttribute("data-tour-no") || 
                        targetRow.querySelector(".tour-number, .tour-no, .product-number")?.innerText.trim() || "";

    // ------------------------------------------
    //
    // ------------------------------------------
    if (!window.location.search) {
      // 
      let autoUrl = `${window.location.pathname}?date=${defaultCleanDate}`;
      if (defaultTourNo) {
        autoUrl += `&tourNo=${encodeURIComponent(defaultTourNo)}`;
      }
      history.replaceState(null, "", autoUrl);
    }

    // ------------------------------------------
    //
    // ------------------------------------------
    if (hasDateParam && !isFromClick) {
      setTimeout(() => {
        const scrollContainer = targetRow.closest(".tourist-table");
        if (scrollContainer) {
          const targetOffsetTop = targetRow.offsetTop;
          const containerHeight = scrollContainer.clientHeight;
          
          scrollContainer.scrollTop = targetOffsetTop - (containerHeight / 2) + (targetRow.clientHeight / 2);
        }

        if (defaultTourNo && !params.has("tourNo")) {
          //
          const newUrl = `${window.location.pathname}?date=${targetDate}&tourNo=${encodeURIComponent(defaultTourNo)}`;
          history.replaceState(null, "", newUrl);
        }
      }, 100);
    }

    // ------------------------------------------
    // 
    // ------------------------------------------
    if (isFromClick) {
      setTimeout(() => {
        targetRow.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        
        sessionStorage.removeItem("userClickedDate");
      }, 150);
    }
  }
});