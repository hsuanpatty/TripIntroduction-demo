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
  // 0. 防止瀏覽器捲動
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
  // 2. 
  // ==========================================
  function getActiveRows() {
    const activeTable =
      document.querySelector('.tourist-table table[style*="display: table"]') ||
      document.querySelector('.tourist-table table:not([style*="none"])');

    return activeTable
      ? activeTable.querySelectorAll(".datemain-container")
      : [];
  }

  // ==========================================
  // 3. 
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

          // 
          const urlParams = new URLSearchParams(fullMatchUrl.split("?")[1] || "");
          let tourNo = urlParams.get("tourNo") || urlParams.get("tour_no") || "";

          // 如
          if (!tourNo) {
            tourNo = row.querySelector(".tour-number, .tour-no, .product-number")?.innerText.trim() || "";
          }

          // 
          row.setAttribute("data-target-url", baseUrl);
          row.setAttribute("data-tour-no", tourNo);
          row.setAttribute("data-url-extracted", "true");

          // 
          const rawDate = row.querySelector(".departure-date")?.innerText.trim() || "";
          const cleanDate = normalize(rawDate); 

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

      //
      el.removeAttribute("onclick");
      el.style.cursor = "pointer";
    });
  });

  // ==========================================
  // 4. 同步更新右側
  // ==========================================
  function updateRow(row) {
    if (!row) return;

    // 清除畫面上所有 rows 的高亮外框
    document.querySelectorAll(".datemain-container").forEach((r) => {
      r.classList.remove("highlight-row");
    });

    // 點選或目標 row 加上高亮
    row.classList.add("highlight-row");

    // 抓取該列的各項欄位資料
    const date = row.querySelector(".departure-date")?.innerText.trim() || "";
    const seat = row.querySelector(".seats-flight")?.innerText.trim() || "";
    const statusEl = row.querySelector(".status");
    const status = statusEl?.innerText.trim() || "";

    //  class 顏色代碼
    const color =
      statusEl?.classList.contains("green")
        ? "green"
        : statusEl?.classList.contains("blue")
        ? "blue"
        : "red";

    const price = row.querySelector(".number")?.innerText.trim() || "";

    // 將資料同步渲染到右側對應的 ID 畫面上
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
  // 5. Row 的點擊跳轉
  // ==========================================
  document.querySelectorAll(".datemain-container").forEach((row) => {
    row.style.cursor = "pointer"; // 讓整行滑鼠移上去都變手指

    row.addEventListener("click", function (e) {
      // 
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      const rawDate = this.querySelector(".departure-date")?.innerText.trim() || "";
      const cleanDate = normalize(rawDate); 

      let tourNo = this.getAttribute("data-tour-no") || "";
      if (!tourNo) {
        tourNo = this.querySelector(".tour-number, .tour-no, .product-number")?.innerText.trim() || "";
      }

      let baseUrl = this.getAttribute("data-target-url") || "./A.html";

      const currentFilename = window.location.pathname.split("/").pop() || "";
      const targetFilename = baseUrl.split("/").pop();

      // ------------------------------------------
      // 
      // ------------------------------------------
      if (currentFilename === targetFilename) {
        updateRow(this);

        this.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        let newUrl = `${window.location.pathname}?date=${cleanDate}`;
        if (tourNo) {
          newUrl += `&tourNo=${encodeURIComponent(tourNo)}`;
        }
        history.replaceState(null, "", newUrl);
        return;
      }

      // ------------------------------------------
      // 
      // ------------------------------------------
      sessionStorage.setItem("userClickedDate", "true");
      updateRow(this);

      let nextUrl = `${baseUrl}?date=${cleanDate}`;
      if (tourNo) {
        nextUrl += `&tourNo=${encodeURIComponent(tourNo)}`;
      }
      window.location.href = nextUrl;
    });
  });

  // ==========================================
  // 6. 頁面載入後，「網址參數解析與自動月份表格及標題切換」
  // ==========================================
  const params = new URLSearchParams(window.location.search);
  const rawTargetDate = params.get("date");
  const targetDate = rawTargetDate ? decodeURIComponent(rawTargetDate) : null; 
  const currentFilename = window.location.pathname.split("/").pop() || "";

  // 核心修復：如果網址有帶日期參數，在計算 rows 前先「自動切換顯示的 Table 及月份標題」
  if (targetDate) {
    // 從網址日期（例如 2026/06/03）中拆解出年與月
    const dateMatch = targetDate.match(/(\d{4})\/(\d{1,2})/);
    if (dateMatch) {
      const year = dateMatch[1];
      const month = parseInt(dateMatch[2], 10); 
      const targetTripDate = `${year}-${month}`; 

      // 1. 尋找畫面上所有的 table[trip-date] 
      const tables = document.querySelectorAll('.tourist-table table[trip-date]');
      tables.forEach(table => {
        if (table.getAttribute('trip-date') === targetTripDate) {
          table.style.display = 'table'; // 顯示符合網址月份的表格
        } else {
          table.style.display = 'none';  // 隱藏其他月份的表格
        }
      });

      // 2. 同步更新畫面 <h3 class="dateContent"> 的文字內容
      const dateContentHeader = document.querySelector('.month-header .dateContent');
      if (dateContentHeader) {
        dateContentHeader.innerText = `${year} 年 ${month} 月`;
      }
    }
  }

  // 月份表格切換完畢後，重新獲取當前「真正顯示中表格」的 rows 
  let rows = getActiveRows();
  let targetRow = null;

  // 
  if (targetDate) {
    rows.forEach((row) => {
      const rowDate = row.querySelector(".departure-date")?.innerText.trim();
      if (rowDate && normalize(rowDate) === normalize(targetDate)) {
        targetRow = row; // 找到了！
      }
    });
  }

  // 
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

    const targetIndex = matchedKey ? fileRowMap[matchedKey] : 0;
    targetRow = rows[targetIndex] || rows[0];
  }

  // ==========================================
  // 7. 畫面定位與右側資訊同步
  // ==========================================
  if (targetRow) {
    // 執行右側同步
    updateRow(targetRow);

    const hasDateParam = params.has("date");
    const isFromClick = sessionStorage.getItem("userClickedDate") === "true";

    const defaultRawDate = targetRow.querySelector(".departure-date")?.innerText.trim() || "";
    const defaultCleanDate = normalize(defaultRawDate); 
    
    let defaultTourNo = targetRow.getAttribute("data-tour-no") || 
                        targetRow.querySelector(".tour-number, .tour-no, .product-number")?.innerText.trim() || "";

    // 
    if (!window.location.search) {
      let autoUrl = `${window.location.pathname}?date=${defaultCleanDate}`;
      if (defaultTourNo) {
        autoUrl += `&tourNo=${encodeURIComponent(defaultTourNo)}`;
      }
      history.replaceState(null, "", autoUrl);
    }

    // 
    if (hasDateParam && !isFromClick) {
      setTimeout(() => {
        const scrollContainer = targetRow.closest(".tourist-table");
        if (scrollContainer) {
          const targetOffsetTop = targetRow.offsetTop;
          const containerHeight = scrollContainer.clientHeight;
          
          scrollContainer.scrollTop = targetOffsetTop - (containerHeight / 2) + (targetRow.clientHeight / 2);
        }

        if (defaultTourNo && !params.has("tourNo")) {
          const newUrl = `${window.location.pathname}?date=${targetDate}&tourNo=${encodeURIComponent(defaultTourNo)}`;
          history.replaceState(null, "", newUrl);
        }
      }, 100);
    }

    // 在本頁點擊日期觸發的定位 → 瀏覽器視窗平滑滾動置中
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
