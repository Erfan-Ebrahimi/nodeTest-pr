console.log("hello - world");

const statusEl = document.getElementById("status");
const btnElem = document.getElementById("btnn");
const tableBody = document.querySelector("#userTable tbody");

const apiBase = "https://node-test-pr.vercel.app/api/users";

// نمایش پیام وضعیت
function setStatus(message, color = "#333") {
  statusEl.textContent = message;
  statusEl.style.color = color;
}

// نمایش کاربران در جدول
function renderTable(users) {
  tableBody.innerHTML = ""; // پاک‌سازی قبلی
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td><td>${user.name}</td>`;
    tableBody.appendChild(row);
  });
}

// گرفتن کاربران از API
function loadUsers() {
  setStatus("در حال بارگذاری کاربران...");
  fetch(apiBase)
    .then(res => {
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
      return res.json();
    })
    .then(data => {
      renderTable(data);
      setStatus("✅ کاربران با موفقیت بارگذاری شدند", "green");
    })
    .catch(err => {
      console.error(err);
      setStatus("❌ خطا در ارتباط با سرور", "red");
    });
}

// اجرای اولیه
loadUsers();

btnElem.addEventListener("click", async () => {
  const NameUser = prompt("Enter name");

  // کاربر Cancel کرده یا چیزی وارد نکرده
  if (!NameUser || NameUser.trim() === "") {
    setStatus("⛔ نام وارد نشده یا لغو شده است", "orange");
    return;
  }

  setStatus("⏳ در حال ارسال اطلاعات...");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: NameUser.trim() }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("ارسال با شکست مواجه شد");

    const data = await res.json();
    console.log(data);
    setStatus(`✅ کاربر "${NameUser.trim()}" اضافه شد`, "green");

    // بارگذاری مجدد جدول
    loadUsers();
  } catch (err) {
    console.error(err);
    if (err.name === "AbortError") {
      setStatus("⏱ درخواست زمان‌بر بود. دوباره امتحان کنید.", "orange");
    } else {
      setStatus("❌ خطا در ارسال اطلاعات به سرور", "red");
    }
  }
});
