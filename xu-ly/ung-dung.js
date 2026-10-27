/* HTML/CSS/JS thuần. Các hàm dựng từng trang ở bên dưới dùng cùng dữ liệu. */
const trang = document.body.dataset.trang;
const noiDung = document.querySelector("#noi-dung");
const thamSo = new URLSearchParams(location.search);
const duongDan = {
  "trang-chu": "index.html",
  "san-pham": "san-pham.html",
  "chi-tiet": "chi-tiet-san-pham.html",
  "khuyen-mai": "khuyen-mai.html",
  "dang-nhap": "dang-nhap.html",
  "tai-khoan": "tai-khoan.html",
  "gio-hang": "gio-hang.html",
  "dat-hang": "dat-hang.html",
};
function thoat(s = "") {
  return String(s).replace(
    /[&<>"']/g,
    (k) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        k
      ],
  );
}
function tien(n) {
  return new Intl.NumberFormat("vi-VN").format(n) + " đ";
}
function khongDau(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}
function bieuTuong(ten) {
  const net = {
    gio: '<path d="M3 3h2l2 12h11l3-9H6M9 20h.01M18 20h.01"/>',
    tim: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    nguoi:
      '<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
    sao: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
    timyeu:
      '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    set: '<path d="m13 2-9 12h7l-1 8 10-13h-8z"/>',
  };
  return `<svg class="bieu-tuong" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${net[ten] || net.sao}</svg>`;
}
let henThongBao;
function thongBao(chuoi) {
  const o = document.querySelector("#thong-bao");
  o.textContent = chuoi;
  o.classList.add("hien");
  clearTimeout(henThongBao);
  henThongBao = setTimeout(() => o.classList.remove("hien"), 3800);
}
function hienLoi(form, e) {
  const o = form.querySelector(".loi");
  if (o) {
    o.textContent = e.message || e;
    o.classList.remove("thanh-cong");
  } else thongBao(e.message || e);
}
function ganForm(id, xuLy) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nut = e.submitter || form.querySelector("[type=submit]");
    if (nut?.disabled) return;
    if (nut) nut.disabled = true;
    const loi = form.querySelector(".loi");
    if (loi) loi.textContent = "";
    try {
      await xuLy(new FormData(form), form);
    } catch (err) {
      hienLoi(form, err);
    } finally {
      if (nut?.isConnected) nut.disabled = false;
    }
  });
}
function moHop(tieuDe, html, sauMo) {
  const hop = document.querySelector("#hop-thoai");
  hop.innerHTML = `<button class="dong-hop" aria-label="Đóng">×</button><h2>${thoat(tieuDe)}</h2>${html}`;
  hop.querySelector(".dong-hop").onclick = () => hop.close();
  if (!hop.open) hop.showModal();
  sauMo?.(hop);
}
function truong(nhan, ten, kieu = "text", giaTri = "", them = "") {
  return `<label>${nhan}<input name="${ten}" type="${kieu}" value="${thoat(giaTri)}" ${them}></label>`;
}
function bia(sach, lop = "", mau = sach.mau) {
  return `<div class="bia-sach mau-${mau} ${lop}" role="img" aria-label="Ảnh minh họa ${thoat(sach.ten)}">${lop.includes("duong-cheo") ? "<span>Ảnh sản<br>phẩm</span>" : ""}</div>`;
}
function trong(tieuDe, moTa, link = "san-pham.html", nut = "Khám phá sách") {
  return `<div class="trong"><h2>${tieuDe}</h2><p>${moTa}</p><a class="nut nut-chinh" href="${link}">${nut}</a></div>`;
}
function capNhatDau() {
  const tk = nguoiDung();
  const so = docGio().reduce((t, d) => t + d.soLuong, 0);
  document.querySelector("#dau-trang").innerHTML =
    `<div class="khung thanh-dau"><nav class="lien-ket-dau" aria-label="Điều hướng chính"><a href="san-pham.html" ${trang === "san-pham" ? 'aria-current="page"' : ""}>Sản phẩm</a><a href="khuyen-mai.html" ${trang === "khuyen-mai" ? 'aria-current="page"' : ""}>Khuyến mãi</a></nav><form class="tim-dau" action="san-pham.html" role="search"><a href="index.html" aria-label="Trang chủ Kiddobooks">${bieuTuong("menu")}</a><input type="search" name="q" placeholder="Tìm kiếm" aria-label="Tìm kiếm sách" value="${thoat(thamSo.get("q") || "")}"><button aria-label="Tìm kiếm">${bieuTuong("tim")}</button></form><nav class="tai-khoan-dau" aria-label="Tài khoản và giỏ hàng">${tk ? `<a class="vien-tron dang-nhap" href="tai-khoan.html">${bieuTuong("nguoi")}<span>${thoat(tk.ten.split(" ").slice(-2).join(" "))}</span></a>` : `<a class="vien-tron dang-nhap" href="dang-nhap.html">${bieuTuong("sao")}<span>Đăng<br>nhập</span></a><a class="vien-tron dang-ky" href="dang-nhap.html#dang-ky">${bieuTuong("sao")}<span>Đăng<br>ký</span></a>`}<a class="gio-dau" href="gio-hang.html" aria-label="Giỏ hàng, ${so} sản phẩm">${bieuTuong("gio")}<span class="huy-hieu">${so}</span></a></nav></div>`;
}
function thongTinLienHe() {
  return '<p>Hotline: <a href="tel:19002345">1900 2345</a></p><p>Thư điện tử: <a href="mailto:kiddobooks@gmail.com">kiddobooks@gmail.com</a></p>';
}
function thongTinDiaChi() {
  return "<p>Giờ làm việc: 8h00 - 20h00</p><p>Chi nhánh 1: 897 Giải Phóng - P. Hai Bà Trưng - Hà Nội</p><p>Chi nhánh 2: 72 Lê Thánh Tôn - Sài Gòn - TP.HCM</p>";
}
function chanTrang() {
  document.querySelector("#chan-trang").innerHTML =
    `<div class="khung"><div class="chan-trong"><div><h2>Thông tin liên hệ & cửa hàng</h2>${thongTinLienHe()}</div><div class="chan-dia-chi">${thongTinDiaChi()}</div></div><div class="chan-ban-quyen"><a href="index.html">© 2026 Kiddobooks & more</a><span>Mỗi cuốn sách, một thế giới nhỏ.</span></div></div>`;
}
function nutSach(sach) {
  return `<button class="nut nut-nho" data-them="${sach.id}">${bieuTuong("gio")}Thêm vào giỏ</button><button class="nut nut-nho nut-chinh" data-mua="${sach.id}">${bieuTuong("set")}Mua ngay</button>`;
}
function theSach(sach) {
  return `<article class="the-san-pham">${sach.nhan ? `<span class="nhan-sach">${sach.nhan}</span>` : ""}<a href="chi-tiet-san-pham.html?id=${sach.id}" aria-label="Xem ${thoat(sach.ten)}">${bia(sach)}<h3>${sach.ten}</h3></a><div class="chan-the"><p class="gia">${tien(sach.gia)}</p><button class="them-nhanh" data-them="${sach.id}" aria-label="Thêm ${thoat(sach.ten)} vào giỏ">+</button></div></article>`;
}
function trangChu() {
  noiDung.innerHTML = `<div class="khung noi-trang"><section class="gioi-thieu"><a href="index.html" aria-label="Kiddobooks, trang chủ"><img class="logo-lon" src="hinh-anh/bieu-trung/kiddobooks.png" alt="Kiddobooks & more"></a><div class="quang-cao"><h1>MÙA ĐỌC SÁCH - GIẢM 67%</h1><a class="nut" href="khuyen-mai.html">✓ &nbsp; Khám phá ngay</a></div></section><section class="muc-trang-chu"><h2>Danh mục sản phẩm</h2><div class="luoi-danh-muc">${DANH_MUC.slice(
    0,
    5,
  )
    .map(
      (ten, i) =>
        `<a class="o-danh-muc mau-${["xanh", "vang", "la", "xanh", "hong"][i]}" href="san-pham.html?danh-muc=${i}"><span class="tron-danh-muc"></span>${ten}</a>`,
    )
    .join(
      "",
    )}</div></section><section class="muc-trang-chu"><h2>Sản phẩm mới & bán chạy</h2><div class="luoi-noi-bat">${SAN_PHAM.slice(
    0,
    3,
  )
    .map(
      (s) =>
        `<article class="sach-noi-bat"><a href="chi-tiet-san-pham.html?id=${s.id}" aria-label="${s.ten}">${bia(s)}</a><div><a href="chi-tiet-san-pham.html?id=${s.id}"><h3>${s.ten}</h3></a><p>${tien(s.gia)}</p><div class="hang thao-tac-sach">${nutSach(s)}</div></div></article>`,
    )
    .join("")}</div></section></div>`;
}
function trangSanPham() {
  noiDung.innerHTML = `<div class="khung noi-trang"><div class="duong-dan"><a href="index.html">Trang chủ</a> / Sản phẩm</div><div class="danh-muc-trang"><aside class="ben-loc" id="bo-loc"><form id="form-loc"><fieldset><legend>Danh mục</legend>${DANH_MUC.map((t, i) => `<label><input type="checkbox" name="danhMuc" value="${i}">${t}</label>`).join("")}</fieldset><fieldset><legend>Độ tuổi</legend>${[
    [0, "0–3 tuổi"],
    [4, "4–6 tuổi"],
    [7, "7–12 tuổi"],
  ]
    .map(
      ([v, t]) =>
        `<label><input type="checkbox" name="tuoi" value="${v}">${t}</label>`,
    )
    .join(
      "",
    )}</fieldset><fieldset><legend>Khoảng giá</legend>${truong("Từ (đ)", "giaTu", "number", "", 'min="0" step="1000"')}${truong("Đến (đ)", "giaDen", "number", "", 'min="0" step="1000"')}</fieldset><button class="nut nut-chinh rong" type="submit">Áp dụng</button><button class="nut-chu rong" type="reset">Xóa / Đặt lại</button><p class="loi" role="alert"></p></form></aside><section><h1>Danh mục sản phẩm</h1><p>Khám phá sách và học cụ cho những ngày lớn khôn.</p><form class="tim-san-pham" id="tim-trong-trang"><input name="q" type="search" placeholder="Tìm sách & học cụ…" aria-label="Từ khóa sản phẩm" value="${thoat(thamSo.get("q") || "")}"><button class="nut nut-chinh">Tìm kiếm</button><button class="nut" type="button" id="mo-bo-loc" aria-controls="bo-loc" aria-expanded="false">Nâng cao</button></form><h2>Tất cả sản phẩm</h2><div class="dau-ket-qua"><span id="so-ket-qua"></span><label>Sắp xếp theo <select id="sap-xep" aria-label="Sắp xếp sản phẩm"><option value="lien-quan">Độ liên quan</option><option value="gia-tang">Giá thấp đến cao</option><option value="gia-giam">Giá cao đến thấp</option><option value="moi">Mới nhất</option></select></label></div><div class="luoi-san-pham" id="ket-qua"></div><nav class="phan-trang" id="phan-trang" aria-label="Phân trang sản phẩm"></nav><p class="ghi-chu-loc">Chọn tên sách để xem chi tiết, hoặc nhấn + để thêm nhanh vào giỏ.</p></section></div></div>`;
  const form = document.querySelector("#form-loc");
  let tuKhoa = thamSo.get("q") || "";
  let trangSo = 1;
  let loc = { danhMuc: [], tuoi: [], giaTu: 0, giaDen: Infinity };
  if (thamSo.has("danh-muc")) {
    const i = Number(thamSo.get("danh-muc"));
    if (DANH_MUC[i]) {
      form.querySelector(`[name=danhMuc][value="${i}"]`).checked = true;
      loc.danhMuc = [i];
    }
  }
  function ve() {
    let ketQua = SAN_PHAM.filter(
      (s) =>
        (!tuKhoa || khongDau(s.ten).includes(khongDau(tuKhoa))) &&
        (!loc.danhMuc.length || loc.danhMuc.includes(s.danhMuc)) &&
        (!loc.tuoi.length || loc.tuoi.includes(s.tuoi)) &&
        s.gia >= loc.giaTu &&
        s.gia <= loc.giaDen,
    );
    const sapXep = document.querySelector("#sap-xep").value;
    if (sapXep === "gia-tang") ketQua.sort((a, b) => a.gia - b.gia);
    if (sapXep === "gia-giam") ketQua.sort((a, b) => b.gia - a.gia);
    if (sapXep === "moi") ketQua.reverse();
    const tongTrang = Math.max(1, Math.ceil(ketQua.length / 8));
    trangSo = Math.min(trangSo, tongTrang);
    const phan = ketQua.slice((trangSo - 1) * 8, trangSo * 8);
    document.querySelector("#so-ket-qua").textContent =
      `Hiển thị ${phan.length} / ${ketQua.length} sản phẩm${tuKhoa ? " · “" + tuKhoa + "”" : ""}`;
    document.querySelector("#ket-qua").innerHTML = phan.length
      ? phan.map(theSach).join("")
      : '<p class="trong" style="grid-column:1/-1">Không tìm thấy sách phù hợp. Hãy thử từ khóa khác hoặc đặt lại bộ lọc.</p>';
    document.querySelector("#phan-trang").innerHTML =
      `<button class="nut nut-nho" data-trang-so="${trangSo - 1}" ${trangSo === 1 ? "disabled" : ""}>Trước</button>${Array.from({ length: tongTrang }, (_, i) => `<button class="nut nut-nho ${trangSo === i + 1 ? "hien-tai" : ""}" data-trang-so="${i + 1}" ${trangSo === i + 1 ? 'aria-current="page"' : ""}>${i + 1}</button>`).join("")}<button class="nut nut-nho" data-trang-so="${trangSo + 1}" ${trangSo === tongTrang ? "disabled" : ""}>Tiếp</button>`;
    document.querySelectorAll("[data-trang-so]").forEach(
      (b) =>
        (b.onclick = () => {
          trangSo = Number(b.dataset.trangSo);
          ve();
        }),
    );
  }
  ganForm("form-loc", (d) => {
    const tu = Number(d.get("giaTu") || 0),
      den = d.get("giaDen") ? Number(d.get("giaDen")) : Infinity;
    if (tu > den) throw Error("Giá từ phải nhỏ hơn hoặc bằng giá đến.");
    loc = {
      danhMuc: d.getAll("danhMuc").map(Number),
      tuoi: d.getAll("tuoi").map(Number),
      giaTu: tu,
      giaDen: den,
    };
    trangSo = 1;
    ve();
  });
  form.addEventListener("reset", () => {
    loc = { danhMuc: [], tuoi: [], giaTu: 0, giaDen: Infinity };
    tuKhoa = "";
    document.querySelector("#tim-trong-trang input").value = "";
    trangSo = 1;
    ve();
  });
  ganForm("tim-trong-trang", (d) => {
    tuKhoa = d.get("q").trim();
    trangSo = 1;
    ve();
  });
  document.querySelector("#sap-xep").onchange = () => {
    trangSo = 1;
    ve();
  };
  document.querySelector("#mo-bo-loc").onclick = (e) => {
    const co = document.querySelector("#bo-loc").classList.toggle("hien");
    e.currentTarget.setAttribute("aria-expanded", co);
    if (co && innerWidth <= 560)
      document.querySelector("#bo-loc").scrollIntoView({ behavior: "smooth" });
  };
  ve();
}
function trangChiTiet() {
  const s = timSach(thamSo.get("id") || "stem");
  if (!s) {
    noiDung.innerHTML = `<div class="khung noi-trang">${trong("Không tìm thấy sản phẩm", "Cuốn sách này không có trong danh mục hiện tại.")}</div>`;
    return;
  }
  const daThich = (kho.yeuThich[chuGio()] || []).includes(s.id);
  noiDung.innerHTML = `<div class="khung noi-trang"><nav class="duong-dan"><a href="san-pham.html">‹ Về danh mục</a> <span style="float:right"><a href="index.html">Trang chủ</a> &nbsp; / &nbsp; <a href="gio-hang.html">Giỏ hàng</a></span></nav><article class="chi-tiet"><div><div id="anh-chinh">${bia(s, "lon duong-cheo")}</div><div class="anh-nho" aria-label="Ảnh sản phẩm">${[s.mau, "hong", "vang"].map((m, i) => `<button aria-label="Xem ảnh ${i + 1}" aria-pressed="${i === 0}" data-mau-anh="${m}">${bia(s, "duong-cheo", m)}</button>`).join("")}</div></div><div><span class="do-tuoi">${bieuTuong("nguoi")} Độ tuổi: ${nhomTuoi(s)}</span><h1>${s.ten}</h1><div class="gia-chi-tiet"><span>${tien(s.gia)}</span>${s.cu ? `<del class="huy">${tien(s.cu)}</del>` : ""}<span class="ton-kho">● Còn hàng</span></div><section class="mo-ta"><h3>MÔ TẢ SẢN PHẨM</h3><p>${moTa(s)}</p><h3>THÔNG TIN CHI TIẾT</h3><ul><li>Hình thức: Bìa mềm, mực đậu nành không độc hại</li><li>Kích thước: 20 × 25 cm</li><li>Số trang: 120 trang</li><li>Kỹ năng: Tư duy logic, sáng tạo, kiên nhẫn và giải quyết vấn đề</li></ul></section><div class="hang khoang"><span>Số lượng:</span><div class="chon-so-luong"><button id="giam-chi-tiet" aria-label="Giảm số lượng">−</button><output id="so-chi-tiet">1</output><button id="tang-chi-tiet" aria-label="Tăng số lượng">+</button></div></div><div class="mua-chi-tiet">${nutSach(s)}</div><button class="yeu-thich" id="nut-yeu-thich" aria-pressed="${daThich}">${bieuTuong("timyeu")} ${daThich ? "Đã lưu yêu thích" : "Thêm vào yêu thích"}</button></div></article></div>`;
  let so = 1;
  document.querySelector("#giam-chi-tiet").onclick = () => {
    so = Math.max(1, so - 1);
    document.querySelector("#so-chi-tiet").value = so;
  };
  document.querySelector("#tang-chi-tiet").onclick = () => {
    so = Math.min(99, so + 1);
    document.querySelector("#so-chi-tiet").value = so;
  };
  document.querySelectorAll("[data-mau-anh]").forEach(
    (b) =>
      (b.onclick = () => {
        document.querySelector("#anh-chinh").innerHTML = bia(
          s,
          "lon duong-cheo",
          b.dataset.mauAnh,
        );
        document
          .querySelectorAll("[data-mau-anh]")
          .forEach((n) => n.setAttribute("aria-pressed", n === b));
      }),
  );
  document.querySelector("#nut-yeu-thich").onclick = () => {
    try {
      if (!nguoiDung()) {
        location.href =
          "dang-nhap.html?quay-lai=" +
          encodeURIComponent("chi-tiet-san-pham.html?id=" + s.id);
        return;
      }
      const chu = chuGio();
      const cu = kho.yeuThich[chu] || [];
      kho.yeuThich[chu] = cu.includes(s.id)
        ? cu.filter((id) => id !== s.id)
        : [...cu, s.id];
      luuDuLieu();
      const co = kho.yeuThich[chu].includes(s.id);
      document.querySelector("#nut-yeu-thich").innerHTML =
        bieuTuong("timyeu") +
        (co ? " Đã lưu yêu thích" : " Thêm vào yêu thích");
      document.querySelector("#nut-yeu-thich").setAttribute("aria-pressed", co);
    } catch (e) {
      thongBao(e.message);
    }
  };
}
function trangKhuyenMai() {
  noiDung.innerHTML = `<div class="khung noi-trang"><h1>Ưu đãi & khuyến mãi</h1><div class="khuyen-mai-bo-cuc khoang"><div><section class="uu-dai"><h2>Bộ sách tập viết & vẽ</h2><p>Giảm 20% so với mua lẻ sản phẩm</p><div class="hang"><span class="ma-uu-dai mau-hong">Mã: ABCXYZ</span><button class="nut nut-xanh" id="luu-ma">LƯU MÃ ƯU ĐÃI</button></div></section><section class="uu-dai"><h2>Bộ sách tư duy tiếng Anh & thẻ học</h2><p>Tặng kèm bộ màu acrylic trị giá 50.000 đ</p><div class="hang"><span class="ma-uu-dai mau-vang">Quà tặng khi mua bộ học tập</span><a class="nut nut-xanh" href="chi-tiet-san-pham.html?id=bang-viet">KHÁM PHÁ BỘ SÁCH</a></div><p class="nho khoang">Áp dụng cho Bộ bảng viết xóa học tập và Sách tô màu động vật.</p></section><section class="lien-he-nho"><h2>Thông tin liên hệ & cửa hàng</h2>${thongTinLienHe()}${thongTinDiaChi()}</section></div><form id="tu-van" class="form-tu-van"><h2>Gửi yêu cầu tư vấn nhanh</h2>${truong("Họ & tên", "ten", "text", "", 'required autocomplete="name" placeholder="Họ & tên"')}${truong("Số điện thoại", "sdt", "tel", "", 'required pattern="0[0-9]{9}" autocomplete="tel" placeholder="Số điện thoại"')}${truong("Thư điện tử", "email", "email", "", 'required autocomplete="email" placeholder="Thư điện tử"')}<label>Nội dung cần tư vấn<textarea name="noiDung" required minlength="10" placeholder="Nội dung cần tư vấn"></textarea></label><p class="loi" role="alert"></p><button class="nut nut-xanh rong" type="submit">Gửi tin nhắn cho chúng tôi</button><p class="nho khoang">Yêu cầu được lưu trên trình duyệt để minh họa chức năng của bài tập.</p></form></div></div>`;
  document.querySelector("#luu-ma").onclick = () => {
    try {
      kho.ma[chuGio()] = "ABCXYZ";
      luuDuLieu();
      thongBao("Đã lưu mã ABCXYZ. Giỏ hàng sẽ áp dụng giảm 20%.");
    } catch (e) {
      thongBao(e.message);
    }
  };
  ganForm("tu-van", (d, f) => {
    if (!soDienThoaiHopLe(d.get("sdt")))
      throw Error("Số điện thoại gồm 10 chữ số và bắt đầu bằng 0.");
    if (d.get("ten").trim().length < 2 || d.get("noiDung").trim().length < 10)
      throw Error("Vui lòng nhập họ tên và nội dung tư vấn ít nhất 10 ký tự.");
    kho.tuVan.push({
      id: maNgauNhien(),
      ten: d.get("ten").trim(),
      sdt: d.get("sdt"),
      email: d.get("email"),
      noiDung: d.get("noiDung").trim(),
      ngay: new Date().toISOString(),
    });
    luuDuLieu();
    f.reset();
    const o = f.querySelector(".loi");
    o.classList.add("thanh-cong");
    o.textContent = "Đã lưu yêu cầu tư vấn demo thành công.";
  });
}
function trangDangNhap() {
  noiDung.innerHTML = `<div class="khung noi-trang"><h1>Đăng nhập / Đăng ký</h1><p class="dang-nhap-gioi-thieu">Một trang, hai thẻ: đăng nhập bên trái, đăng ký bên phải. Đăng nhập xong quay lại bước đặt hàng.</p><div class="hai-form"><section class="the-form" id="dang-nhap"><div class="thanh-the"><a href="#dang-nhap" class="dang-chon">Đăng nhập</a><a href="#dang-ky">Đăng ký</a></div><form class="noi-form" id="form-dang-nhap">${truong("Số điện thoại", "sdt", "tel", "", 'required pattern="0[0-9]{9}" autocomplete="username" placeholder="Số điện thoại"')}${truong("Mật khẩu", "matKhau", "password", "", 'required autocomplete="current-password" placeholder="Mật khẩu"')}<p class="quen-mat-khau"><button class="nut-chu nho" id="quen-mat-khau" type="button">Quên mật khẩu?</button></p><p class="loi" role="alert"></p><button class="nut nut-chinh rong" type="submit">Đăng nhập</button><p class="cuoi-form">Chưa có tài khoản? &nbsp; <a href="#dang-ky">Đăng ký ngay</a></p></form></section><section class="the-form" id="dang-ky"><div class="thanh-the"><a class="mau-la" href="#dang-nhap">Đăng nhập</a><a class="dang-chon" href="#dang-ky">Đăng ký</a></div><form class="noi-form" id="form-dang-ky">${truong("Họ và tên", "ten", "text", "", 'required minlength="2" autocomplete="name" placeholder="Họ và tên"')}${truong("Số điện thoại", "sdt", "tel", "", 'required pattern="0[0-9]{9}" autocomplete="tel" placeholder="Số điện thoại"')}${truong("Mật khẩu", "matKhau", "password", "", 'required minlength="6" autocomplete="new-password" placeholder="Tối thiểu 6 ký tự"')}${truong("Xác nhận mật khẩu", "xacNhan", "password", "", 'required minlength="6" autocomplete="new-password" placeholder="Xác nhận mật khẩu"')}<label class="dong-y"><input type="checkbox" name="dongY" required>Đồng ý với <button class="nut-chu" type="button" id="chinh-sach">chính sách sử dụng</button></label><p class="loi" role="alert"></p><button class="nut nut-chinh rong" type="submit">Đăng ký</button><p class="cuoi-form">Đã có tài khoản? &nbsp; <a href="#dang-nhap">Đăng nhập</a></p></form></section></div><p class="nhac-demo">Tài khoản dùng cho bài tập, được lưu trên trình duyệt này. Chỉ sử dụng thông tin và mật khẩu thử nghiệm.</p></div>`;
  function quayLai() {
    const q = thamSo.get("quay-lai");
    const choPhep =
      /^(dat-hang|tai-khoan|chi-tiet-san-pham)\.html(?:\?id=[a-z0-9-]+)?$/;
    location.href = q && choPhep.test(q) ? q : "tai-khoan.html";
  }
  ganForm("form-dang-nhap", async (d) => {
    const tk = kho.taiKhoan.find((t) => t.sdt === d.get("sdt"));
    if (!tk || (await bamMatKhau(d.get("matKhau"), tk.muoi)) !== tk.bam)
      throw Error("Số điện thoại hoặc mật khẩu chưa đúng.");
    await dangNhapTaiKhoan(tk);
    quayLai();
  });
  ganForm("form-dang-ky", async (d) => {
    const ten = d.get("ten").trim(),
      sdt = d.get("sdt"),
      mk = d.get("matKhau");
    if (ten.length < 2) throw Error("Họ tên cần ít nhất 2 ký tự.");
    if (!soDienThoaiHopLe(sdt)) throw Error("Số điện thoại không hợp lệ.");
    if (mk.length < 6) throw Error("Mật khẩu cần ít nhất 6 ký tự.");
    if (mk !== d.get("xacNhan")) throw Error("Xác nhận mật khẩu chưa khớp.");
    if (kho.taiKhoan.some((t) => t.sdt === sdt))
      throw Error("Số điện thoại này đã được đăng ký.");
    const muoi = maNgauNhien();
    const bam = await bamMatKhau(mk, muoi);
    if (kho.taiKhoan.some((t) => t.sdt === sdt))
      throw Error("Số điện thoại này đã được đăng ký.");
    const tk = { id: maNgauNhien(), ten, sdt, muoi, bam, diaChi: [] };
    kho.taiKhoan.push(tk);
    luuDuLieu();
    await dangNhapTaiKhoan(tk);
    quayLai();
  });
  document.querySelector("#chinh-sach").onclick = () =>
    moHop(
      "Chính sách sử dụng",
      "<p>Website phục vụ học tập. Dữ liệu chỉ được lưu trên trình duyệt hiện tại. Các thao tác mua hàng và tư vấn là mô phỏng, không gửi đến cửa hàng. Không nhập thông tin nhạy cảm hay mật khẩu đang dùng ở nơi khác.</p>",
    );
  document.querySelector("#quen-mat-khau").onclick = () =>
    moHop(
      "Đặt lại mật khẩu demo",
      `<p class="nho">Chức năng minh họa trên máy này, không gửi hoặc xác minh OTP.</p><form id="dat-lai-mat-khau">${truong("Số điện thoại đã đăng ký", "sdt", "tel", "", 'required pattern="0[0-9]{9}"')}${truong("Mật khẩu mới", "matKhau", "password", "", 'required minlength="6"')}${truong("Nhập lại mật khẩu mới", "xacNhan", "password", "", 'required minlength="6"')}<p class="loi" role="alert"></p><button class="nut nut-chinh rong">Đặt lại mật khẩu demo</button></form>`,
      () =>
        ganForm("dat-lai-mat-khau", async (d) => {
          const tk = kho.taiKhoan.find((t) => t.sdt === d.get("sdt"));
          if (!tk)
            throw Error(
              "Chưa có tài khoản với số điện thoại này trên trình duyệt.",
            );
          if (d.get("matKhau") !== d.get("xacNhan"))
            throw Error("Xác nhận mật khẩu chưa khớp.");
          const muoi = maNgauNhien();
          const bam = await bamMatKhau(d.get("matKhau"), muoi);
          tk.muoi = muoi;
          tk.bam = bam;
          luuDuLieu();
          document.querySelector("#hop-thoai").close();
          thongBao("Đã đặt lại mật khẩu demo. Anh/chị có thể đăng nhập.");
        }),
    );
}
function tongTienHTML(t) {
  return `<div class="dong-tien"><span>Tạm tính</span><span>${tien(t.tam)}</span></div>${t.giam ? `<div class="dong-tien"><span>Giảm giá (20%)</span><span>−${tien(t.giam)}</span></div>` : ""}<div class="dong-tien"><span>Phí vận chuyển</span><span>${t.phi ? tien(t.phi) : "Miễn phí"}</span></div><div class="dong-tien tong-tien"><span>Tổng cộng</span><span>${tien(t.tong)}</span></div>`;
}
function trangGioHang() {
  const gio = docGio().filter((d) => timSach(d.id));
  if (!gio.length) {
    noiDung.innerHTML = `<div class="khung noi-trang"><h1>Giỏ hàng của bạn</h1>${trong("Giỏ hàng đang trống", "Một cuốn sách nhỏ có thể mở ra cả thế giới. Cùng tìm sách cho bé nhé!")}</div>`;
    return;
  }
  noiDung.innerHTML = `<div class="khung noi-trang"><h1>Giỏ hàng của bạn</h1><div class="mua-hang-bo-cuc khoang"><section><div class="bang-gio-tieu-de"><span>Sản phẩm</span><span>Đơn giá</span><span>Số lượng</span><span>Thành tiền</span><span></span></div>${gio
    .map((d) => {
      const s = timSach(d.id);
      return `<article class="dong-gio"><div class="sach-trong-gio"><a href="chi-tiet-san-pham.html?id=${s.id}" aria-label="${s.ten}">${bia(s)}</a><div><a href="chi-tiet-san-pham.html?id=${s.id}"><h3>${s.ten}</h3></a><p>Độ tuổi: ${nhomTuoi(s)}</p></div></div><div class="don-gia"><span class="nhan-mobile">Đơn giá</span>${tien(s.gia)}</div><div class="so-luong-gio"><span class="nhan-mobile">Số lượng</span><div class="chon-so-luong"><button data-doi-so="${s.id}" data-buoc="-1" aria-label="Giảm số lượng ${s.ten}" ${d.soLuong === 1 ? "disabled" : ""}>−</button><output>${d.soLuong}</output><button data-doi-so="${s.id}" data-buoc="1" aria-label="Tăng số lượng ${s.ten}" ${d.soLuong === 99 ? "disabled" : ""}>+</button></div></div><div class="thanh-tien-gio"><span class="nhan-mobile">Thành tiền</span>${tien(s.gia * d.soLuong)}</div><button class="xoa-gio" data-xoa-gio="${s.id}" aria-label="Xóa ${s.ten}">Xóa</button></article>`;
    })
    .join(
      "",
    )}<a href="san-pham.html" class="tiep-tuc">‹ Tiếp tục mua sắm</a></section><aside class="tom-tat"><h2>Tóm tắt đơn hàng</h2>${tongTienHTML(tinhTien())}<form class="form-ma" id="ap-ma"><input name="ma" aria-label="Mã giảm giá" placeholder="Mã giảm giá" value="${thoat(kho.ma[chuGio()] || "")}"><button class="nut">Áp dụng</button></form><p class="loi" id="loi-ma" role="alert"></p>${kho.ma[chuGio()] ? '<button class="nut-chu nho" id="bo-ma">Bỏ mã giảm giá</button>' : ""}<a href="${nguoiDung() ? "dat-hang.html" : "dang-nhap.html?quay-lai=dat-hang.html"}" class="nut nut-chinh rong">Đặt hàng</a><p class="nhac-nho">Chưa đăng nhập: đăng nhập rồi quay lại bước đặt hàng. Phí giao hàng dự kiến 30.000 đ; lấy tại cửa hàng miễn phí.</p></aside></div></div>`;
  document.querySelectorAll("[data-doi-so]").forEach(
    (b) =>
      (b.onclick = () => {
        try {
          const g = docGio().map((d) => ({ ...d }));
          const d = g.find((d) => d.id === b.dataset.doiSo);
          d.soLuong = Math.max(
            1,
            Math.min(99, d.soLuong + Number(b.dataset.buoc)),
          );
          datGio(g);
          trangGioHang();
          capNhatDau();
        } catch (e) {
          thongBao(e.message);
        }
      }),
  );
  document.querySelectorAll("[data-xoa-gio]").forEach(
    (b) =>
      (b.onclick = () => {
        try {
          datGio(docGio().filter((d) => d.id !== b.dataset.xoaGio));
          trangGioHang();
          capNhatDau();
          thongBao("Đã xóa sản phẩm khỏi giỏ.");
        } catch (e) {
          thongBao(e.message);
        }
      }),
  );
  ganForm("ap-ma", (d) => {
    const ma = d.get("ma").trim().toUpperCase();
    if (ma !== "ABCXYZ") {
      document.querySelector("#loi-ma").textContent =
        "Mã chưa đúng. Mã ưu đãi hiện tại: ABCXYZ.";
      return;
    }
    kho.ma[chuGio()] = ma;
    luuDuLieu();
    trangGioHang();
    thongBao("Đã áp dụng mã giảm 20%.");
  });
  const bo = document.querySelector("#bo-ma");
  if (bo)
    bo.onclick = () => {
      try {
        delete kho.ma[chuGio()];
        luuDuLieu();
        trangGioHang();
      } catch (e) {
        thongBao(e.message);
      }
    };
}
function cacSachTrongDon(gio) {
  return gio
    .map((d) => {
      const s = timSach(d.id);
      return `<div class="gio-trong-don">${bia(s)}<div><p>${s.ten}</p><span>× ${d.soLuong}</span>${s.qua ? '<p class="nho">+ Quà tặng bộ màu acrylic</p>' : ""}</div><span>${tien(s.gia * d.soLuong)}</span></div>`;
    })
    .join("");
}
function trangDatHang() {
  const tk = nguoiDung();
  if (!tk) {
    location.replace("dang-nhap.html?quay-lai=dat-hang.html");
    return;
  }
  if (!docGio().length) {
    noiDung.innerHTML = `<div class="khung noi-trang">${trong("Chưa có sản phẩm để đặt", "Hãy thêm sách vào giỏ trước khi đặt hàng.")}</div>`;
    return;
  }
  const dc = tk.diaChi.find((d) => d.macDinh) || tk.diaChi[0];
  noiDung.innerHTML = `<div class="khung noi-trang"><h1>Đặt hàng</h1><form id="form-dat-hang" class="mua-hang-bo-cuc khoang"><div class="form-dat-hang"><h2>1. Phương thức nhận hàng</h2><div class="chon-nhan"><label class="lua-chon"><input type="radio" name="nhan" value="cua-hang" checked>Đến lấy tại cửa hàng</label><label class="lua-chon"><input type="radio" name="nhan" value="giao-hang">Giao hàng tận nơi</label></div><p class="nho" id="noi-lay">Nhận tại 897 Giải Phóng - Hà Nội · 8h00–20h00.</p><h2>2. Thông tin người nhận</h2><div class="cot-doi">${truong("Họ và tên", "ten", "text", dc?.ten || tk.ten, 'required minlength="2" autocomplete="name"')}${truong("Số điện thoại", "sdt", "tel", dc?.sdt || tk.sdt, 'required pattern="0[0-9]{9}" autocomplete="tel"')}</div><div id="o-dia-chi" class="an">${truong("Địa chỉ chi tiết (số nhà, đường, quận/huyện, tỉnh/thành)", "diaChi", "text", dc?.noi || "", 'autocomplete="street-address"')}</div><h2>3. Thời gian nhận hàng</h2><div class="chon-nhan chon-gio"><label class="lua-chon"><input type="radio" name="thoiGian" value="ngay" checked>Giao ngay</label><label class="lua-chon"><input type="radio" name="thoiGian" value="hen">Hẹn giờ</label></div><div id="o-hen-gio" class="an">${truong("Chọn ngày & giờ", "henGio", "datetime-local")}</div><label>Ghi chú cho đơn hàng (không bắt buộc)<textarea name="ghiChu" placeholder="Ghi chú cho đơn hàng"></textarea></label><p class="nhac-demo">Đây là đơn hàng mô phỏng, không thu tiền và không gửi đến cửa hàng.</p></div><aside class="tom-tat"><h2>Đơn hàng của bạn</h2>${cacSachTrongDon(docGio())}<div id="tien-dat-hang">${tongTienHTML(tinhTien(0))}</div><p class="loi" role="alert"></p><button class="nut nut-chinh rong" type="submit">Đặt hàng</button></aside></form></div>`;
  const form = document.querySelector("#form-dat-hang");
  form.querySelectorAll("[name=nhan]").forEach(
    (r) =>
      (r.onchange = () => {
        const giao = form.nhan.value === "giao-hang";
        document.querySelector("#o-dia-chi").classList.toggle("an", !giao);
        form.diaChi.required = giao;
        document.querySelector("#noi-lay").classList.toggle("an", giao);
        document.querySelector("#tien-dat-hang").innerHTML = tongTienHTML(
          tinhTien(giao ? 30000 : 0),
        );
      }),
  );
  form.querySelectorAll("[name=thoiGian]").forEach(
    (r) =>
      (r.onchange = () => {
        const hen = form.thoiGian.value === "hen";
        document.querySelector("#o-hen-gio").classList.toggle("an", !hen);
        form.henGio.required = hen;
      }),
  );
  ganForm("form-dat-hang", (d) => {
    const hienTai = nguoiDung();
    if (!hienTai || hienTai.id !== tk.id)
      throw Error("Phiên đăng nhập đã thay đổi. Vui lòng tải lại trang.");
    if (!docGio().length) throw Error("Giỏ hàng đang trống.");
    if (d.get("ten").trim().length < 2 || !soDienThoaiHopLe(d.get("sdt")))
      throw Error("Hãy kiểm tra họ tên và số điện thoại.");
    const giao = d.get("nhan") === "giao-hang";
    if (giao && d.get("diaChi").trim().length < 10)
      throw Error("Hãy nhập địa chỉ đầy đủ, ít nhất 10 ký tự.");
    const hen = d.get("thoiGian") === "hen";
    const gioHen = new Date(d.get("henGio"));
    if (hen && (!Number.isFinite(gioHen.getTime()) || gioHen <= new Date()))
      throw Error("Thời gian hẹn nhận phải ở trong tương lai.");
    const don = {
      id:
        "KD" +
        Date.now().toString(36).toUpperCase() +
        crypto
          .getRandomValues(new Uint16Array(1))[0]
          .toString(36)
          .toUpperCase(),
      chu: tk.id,
      ngay: new Date().toISOString(),
      trangThai: "Chờ xác nhận",
      ten: d.get("ten").trim(),
      sdt: d.get("sdt"),
      nhan: d.get("nhan"),
      diaChi: giao ? d.get("diaChi").trim() : "897 Giải Phóng - Hà Nội",
      thoiGian: hen ? gioHen.toISOString() : "ngay",
      ghiChu: d.get("ghiChu").trim(),
      sach: docGio().map((dong) => {
        const s = timSach(dong.id);
        return {
          id: s.id,
          ten: s.ten,
          gia: s.gia,
          soLuong: dong.soLuong,
          qua: !!s.qua,
        };
      }),
      ...tinhTien(giao ? 30000 : 0),
    };
    kho.don.push(don);
    kho.gio[tk.id] = [];
    delete kho.ma[tk.id];
    luuDuLieu();
    capNhatDau();
    noiDung.innerHTML = `<div class="khung noi-trang"><section class="xac-nhan"><h1>Đặt hàng thành công!</h1><p>Mã đơn: <strong>${don.id}</strong></p><p>Đơn hàng demo đã được lưu. Cảm ơn bạn đã chọn sách cùng Kiddobooks.</p><p>Tổng cộng: <strong>${tien(don.tong)}</strong> · Trạng thái: Chờ xác nhận</p><div class="hang"><a href="tai-khoan.html#lich-su" class="nut nut-chinh">Xem đơn hàng</a><a href="san-pham.html" class="nut">Tiếp tục mua sắm</a></div></section></div>`;
    window.scrollTo(0, 0);
  });
}
function trangTaiKhoan() {
  const tk = nguoiDung();
  if (!tk) {
    location.replace("dang-nhap.html?quay-lai=tai-khoan.html");
    return;
  }
  const don = kho.don
    .filter((d) => d.chu === tk.id)
    .slice()
    .reverse();
  const thich = (kho.yeuThich[tk.id] || []).map(timSach).filter(Boolean);
  noiDung.innerHTML = `<div class="khung noi-trang"><h1>Tài khoản của tôi</h1><div class="tai-khoan-bo-cuc khoang"><nav class="menu-tai-khoan" aria-label="Mục tài khoản"><a href="#ca-nhan">Thông tin cá nhân</a><a href="#dia-chi">Địa chỉ nhận hàng</a><a href="#lich-su">Lịch sử đơn hàng</a><a href="#yeu-thich">Sách yêu thích</a><button id="dang-xuat">Đăng xuất</button></nav><div><section class="muc-tai-khoan" id="ca-nhan"><h2>Thông tin cá nhân</h2><form class="hop-ca-nhan" id="thong-tin-ca-nhan"><div class="cot-doi">${truong("Họ và tên", "ten", "text", tk.ten, 'required minlength="2"')}${truong("Số điện thoại", "sdt", "tel", tk.sdt, 'required pattern="0[0-9]{9}"')}</div><div class="hang"><button class="nut" id="doi-mat-khau" type="button">Đổi mật khẩu</button><button class="nut nut-chinh" type="submit">Lưu thay đổi</button></div><p class="loi" role="alert"></p></form></section><section class="muc-tai-khoan" id="dia-chi"><h2>Địa chỉ nhận hàng</h2><div class="luoi-dia-chi">${tk.diaChi.length ? tk.diaChi.map((dc) => `<article class="dia-chi">${dc.macDinh ? '<span class="mac-dinh">Mặc định</span>' : ""}<h3>${thoat(dc.ten)}</h3><p>${thoat(dc.sdt)}</p><p>${thoat(dc.noi)}</p><div class="hang"><button class="nut" data-sua-dia-chi="${dc.id}">Sửa</button><button class="nut" data-xoa-dia-chi="${dc.id}">Xóa</button>${!dc.macDinh ? `<button class="nut" data-mac-dinh="${dc.id}">Đặt mặc định</button>` : ""}</div></article>`).join("") : '<p class="nho">Bạn chưa lưu địa chỉ nhận hàng.</p>'}</div><button class="nut" id="them-dia-chi">+ Thêm địa chỉ mới</button></section><section class="muc-tai-khoan" id="lich-su"><h2>Lịch sử đơn hàng</h2>${don.length ? `<table class="bang-don"><thead><tr><th>Mã đơn</th><th>Ngày đặt</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>${don.map((d) => `<tr><td data-nhan="Mã đơn">${thoat(d.id)}</td><td data-nhan="Ngày đặt">${new Date(d.ngay).toLocaleDateString("vi-VN")}</td><td data-nhan="Tổng tiền">${tien(d.tong)}</td><td data-nhan="Trạng thái">${d.trangThai}</td><td><button class="nut" data-xem-don="${d.id}">Xem lại</button> <button class="nut nut-chinh" data-mua-lai="${d.id}">Mua lại</button></td></tr>`).join("")}</tbody></table>` : '<p class="trong">Bạn chưa có đơn hàng. Đơn đã đặt sẽ xuất hiện ở đây.</p>'}</section><section class="muc-tai-khoan" id="yeu-thich"><h2>Sách yêu thích</h2>${thich.length ? `<div class="luoi-yeu-thich">${thich.map((s) => `<div>${theSach(s)}<button class="nut-chu nho" data-bo-thich="${s.id}">Bỏ yêu thích</button></div>`).join("")}</div>` : '<p class="nho">Nhấn trái tim ở trang chi tiết để lưu những cuốn sách bạn thích.</p>'}</section></div></div></div>`;
  ganForm("thong-tin-ca-nhan", (d) => {
    const sdt = d.get("sdt"),
      ten = d.get("ten").trim();
    if (ten.length < 2 || !soDienThoaiHopLe(sdt))
      throw Error("Họ tên hoặc số điện thoại không hợp lệ.");
    if (kho.taiKhoan.some((t) => t.id !== tk.id && t.sdt === sdt))
      throw Error("Số điện thoại này đã thuộc tài khoản khác.");
    tk.ten = ten;
    tk.sdt = sdt;
    luuDuLieu();
    capNhatDau();
    thongBao("Đã lưu thông tin cá nhân.");
  });
  document.querySelector("#dang-xuat").onclick = () => {
    sessionStorage.removeItem("kiddobooks-phien");
    location.href = "index.html";
  };
  document.querySelector("#doi-mat-khau").onclick = () =>
    moHop(
      "Đổi mật khẩu",
      `<form id="form-doi-mat-khau">${truong("Mật khẩu hiện tại", "cu", "password", "", 'required autocomplete="current-password"')}${truong("Mật khẩu mới", "moi", "password", "", 'required minlength="6" autocomplete="new-password"')}${truong("Xác nhận mật khẩu mới", "xacNhan", "password", "", 'required minlength="6"')}<p class="loi" role="alert"></p><button class="nut nut-chinh rong">Lưu mật khẩu mới</button></form>`,
      () =>
        ganForm("form-doi-mat-khau", async (d) => {
          if ((await bamMatKhau(d.get("cu"), tk.muoi)) !== tk.bam)
            throw Error("Mật khẩu hiện tại chưa đúng.");
          if (d.get("moi") !== d.get("xacNhan"))
            throw Error("Xác nhận mật khẩu chưa khớp.");
          const muoi = maNgauNhien(),
            bam = await bamMatKhau(d.get("moi"), muoi);
          tk.muoi = muoi;
          tk.bam = bam;
          luuDuLieu();
          document.querySelector("#hop-thoai").close();
          thongBao("Đã đổi mật khẩu.");
        }),
    );
  function suaDiaChi(id) {
    const dc = tk.diaChi.find((d) => d.id === id);
    moHop(
      dc ? "Sửa địa chỉ" : "Thêm địa chỉ mới",
      `<form id="form-dia-chi">${truong("Họ tên người nhận", "ten", "text", dc?.ten || tk.ten, 'required minlength="2"')}${truong("Số điện thoại", "sdt", "tel", dc?.sdt || tk.sdt, 'required pattern="0[0-9]{9}"')}${truong("Địa chỉ đầy đủ", "noi", "text", dc?.noi || "", 'required minlength="10"')}<label><input type="checkbox" name="macDinh" ${dc?.macDinh ? "checked" : ""}>Đặt làm địa chỉ mặc định</label><p class="loi" role="alert"></p><button class="nut nut-chinh rong">Lưu địa chỉ</button></form>`,
      () =>
        ganForm("form-dia-chi", (d) => {
          if (
            !soDienThoaiHopLe(d.get("sdt")) ||
            d.get("ten").trim().length < 2 ||
            d.get("noi").trim().length < 10
          )
            throw Error("Vui lòng kiểm tra lại thông tin địa chỉ.");
          const moi = {
            id: dc?.id || maNgauNhien(),
            ten: d.get("ten").trim(),
            sdt: d.get("sdt"),
            noi: d.get("noi").trim(),
            macDinh: d.has("macDinh") || !tk.diaChi.length,
          };
          if (moi.macDinh) tk.diaChi.forEach((d) => (d.macDinh = false));
          if (dc) tk.diaChi = tk.diaChi.map((d) => (d.id === dc.id ? moi : d));
          else tk.diaChi.push(moi);
          if (!tk.diaChi.some((d) => d.macDinh)) tk.diaChi[0].macDinh = true;
          luuDuLieu();
          document.querySelector("#hop-thoai").close();
          trangTaiKhoan();
          thongBao("Đã lưu địa chỉ.");
        }),
    );
  }
  document.querySelector("#them-dia-chi").onclick = () => suaDiaChi();
  document
    .querySelectorAll("[data-sua-dia-chi]")
    .forEach((b) => (b.onclick = () => suaDiaChi(b.dataset.suaDiaChi)));
  document.querySelectorAll("[data-xoa-dia-chi]").forEach(
    (b) =>
      (b.onclick = () => {
        try {
          tk.diaChi = tk.diaChi.filter((d) => d.id !== b.dataset.xoaDiaChi);
          if (tk.diaChi.length && !tk.diaChi.some((d) => d.macDinh))
            tk.diaChi[0].macDinh = true;
          luuDuLieu();
          trangTaiKhoan();
          thongBao("Đã xóa địa chỉ.");
        } catch (e) {
          thongBao(e.message);
        }
      }),
  );
  document.querySelectorAll("[data-mac-dinh]").forEach(
    (b) =>
      (b.onclick = () => {
        try {
          tk.diaChi.forEach((d) => (d.macDinh = d.id === b.dataset.macDinh));
          luuDuLieu();
          trangTaiKhoan();
        } catch (e) {
          thongBao(e.message);
        }
      }),
  );
  document.querySelectorAll("[data-bo-thich]").forEach(
    (b) =>
      (b.onclick = () => {
        try {
          kho.yeuThich[tk.id] = kho.yeuThich[tk.id].filter(
            (id) => id !== b.dataset.boThich,
          );
          luuDuLieu();
          trangTaiKhoan();
        } catch (e) {
          thongBao(e.message);
        }
      }),
  );
  document.querySelectorAll("[data-xem-don]").forEach(
    (b) =>
      (b.onclick = () => {
        const d = don.find((d) => d.id === b.dataset.xemDon);
        moHop(
          "Đơn hàng " + d.id,
          `<p>${thoat(d.trangThai)} · ${new Date(d.ngay).toLocaleString("vi-VN")}</p><p>${thoat(d.ten)} · ${thoat(d.sdt)}<br>${thoat(d.diaChi)}</p><p>Nhận hàng: ${d.thoiGian === "ngay" ? "Sớm nhất có thể" : new Date(d.thoiGian).toLocaleString("vi-VN")}</p>${d.sach.map((s) => `<p class="dong-tien"><span>${thoat(s.ten)} × ${s.soLuong}${s.qua ? "<br><small>+ Quà tặng bộ màu acrylic</small>" : ""}</span><span>${tien(s.gia * s.soLuong)}</span></p>`).join("")}${tongTienHTML(d)}${d.ghiChu ? `<p>Ghi chú: ${thoat(d.ghiChu)}</p>` : ""}<p class="nho">Đơn hàng mô phỏng được lưu trên trình duyệt.</p>`,
        );
      }),
  );
  document.querySelectorAll("[data-mua-lai]").forEach(
    (b) =>
      (b.onclick = () => {
        try {
          const d = don.find((d) => d.id === b.dataset.muaLai);
          const gio = docGio().map((d) => ({ ...d }));
          for (const s of d.sach) {
            if (!timSach(s.id)) continue;
            const co = gio.find((d) => d.id === s.id);
            if (co) co.soLuong = Math.min(99, co.soLuong + s.soLuong);
            else gio.push({ id: s.id, soLuong: s.soLuong });
          }
          datGio(gio);
          location.href = "gio-hang.html";
        } catch (e) {
          thongBao(e.message);
        }
      }),
  );
}
// Bắt sự kiện cho các nút thêm giỏ ở mọi trang, kể cả kết quả vừa được lọc.
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-them],[data-mua]");
  if (!b) return;
  try {
    const id = b.dataset.them || b.dataset.mua;
    const so =
      trang === "chi-tiet"
        ? Number(document.querySelector("#so-chi-tiet").value)
        : 1;
    themGio(id, so);
    capNhatDau();
    if (b.dataset.mua)
      location.href = nguoiDung()
        ? "dat-hang.html"
        : "dang-nhap.html?quay-lai=dat-hang.html";
    else thongBao("Đã thêm sách vào giỏ hàng.");
  } catch (err) {
    thongBao(err.message);
  }
});
const veTrang = {
  "trang-chu": trangChu,
  "san-pham": trangSanPham,
  "chi-tiet": trangChiTiet,
  "khuyen-mai": trangKhuyenMai,
  "dang-nhap": trangDangNhap,
  "gio-hang": trangGioHang,
  "dat-hang": trangDatHang,
  "tai-khoan": trangTaiKhoan,
};
try {
  capNhatDau();
  chanTrang();
  veTrang[trang]();
  if (loiKho) {
    const o = document.createElement("div");
    o.className = "khung loi-toan-trang";
    o.setAttribute("role", "alert");
    o.textContent = loiKho;
    noiDung.prepend(o);
  }
} catch (e) {
  noiDung.innerHTML = `<div class="khung noi-trang">${trong("Không thể mở trang", thoat(e.message), "index.html", "Về trang chủ")}</div>`;
  console.error(e);
}
// Đồng bộ dữ liệu nếu người dùng chỉnh giỏ ở một tab khác.
window.addEventListener("storage", (e) => {
  if (e.key !== KHOA_DU_LIEU) return;
  kho = docDuLieu();
  capNhatDau();
  if (["gio-hang", "tai-khoan"].includes(trang)) veTrang[trang]();
  if (trang === "dat-hang") {
    noiDung.innerHTML = `<div class="khung noi-trang">${trong("Giỏ hàng vừa thay đổi ở tab khác", "Hãy mở lại bước đặt hàng để kiểm tra thông tin mới nhất.", "dat-hang.html", "Kiểm tra lại đơn hàng")}</div>`;
  }
});
