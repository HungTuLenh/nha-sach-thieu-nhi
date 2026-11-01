// Lưu toàn bộ dữ liệu demo vào một khóa để mỗi lần lưu là một thao tác.
const KHOA_DU_LIEU = "kiddobooks-du-lieu-1";
function duLieuMoi() {
  return {
    taiKhoan: [],
    gio: { khach: [] },
    ma: {},
    yeuThich: {},
    don: [],
    tuVan: [],
  };
}
let loiKho = "";
function docDuLieu() {
  try {
    const chuoi = localStorage.getItem(KHOA_DU_LIEU);
    if (!chuoi) return duLieuMoi();
    const d = JSON.parse(chuoi);
    if (
      !Array.isArray(d.taiKhoan) ||
      !d.gio ||
      !Array.isArray(d.don) ||
      !d.ma ||
      !d.yeuThich ||
      !Array.isArray(d.tuVan)
    )
      throw Error();
    return d;
  } catch (_) {
    loiKho =
      "Dữ liệu lưu trữ không đọc được. Hãy dùng trình duyệt cho phép lưu dữ liệu hoặc khôi phục bản sao trước đó.";
    return duLieuMoi();
  }
}
let kho = docDuLieu();
function luuDuLieu() {
  if (loiKho) throw Error(loiKho);
  try {
    localStorage.setItem(KHOA_DU_LIEU, JSON.stringify(kho));
  } catch (_) {
    kho = docDuLieu();
    loiKho =
      "Không lưu được dữ liệu. Có thể bộ nhớ đã đầy hoặc trình duyệt đang chặn lưu trữ. Hãy kiểm tra rồi tải lại trang.";
    throw Error(loiKho);
  }
}
function nguoiDung() {
  try {
    return kho.taiKhoan.find(
      (t) => t.id === sessionStorage.getItem("kiddobooks-phien"),
    );
  } catch (_) {
    return undefined;
  }
}
function chuGio() {
  return nguoiDung()?.id || "khach";
}
function docGio() {
  return kho.gio[chuGio()] || [];
}
function datGio(gio) {
  kho.gio[chuGio()] = gio;
  luuDuLieu();
}
function themGio(id, soLuong = 1) {
  if (!timSach(id)) throw Error("Sản phẩm không còn tồn tại.");
  const gio = docGio().map((d) => ({ ...d }));
  const dong = gio.find((d) => d.id === id);
  if (dong) dong.soLuong = Math.min(99, dong.soLuong + soLuong);
  else gio.push({ id, soLuong: Math.max(1, Math.min(99, soLuong)) });
  datGio(gio);
}
function tinhTien(phi = 30000) {
  const tam = docGio().reduce(
    (tong, d) => tong + (timSach(d.id)?.gia || 0) * d.soLuong,
    0,
  );
  const giam = kho.ma[chuGio()] === "ABCXYZ" ? Math.round(tam * 0.2) : 0;
  return { tam, giam, phi: tam ? phi : 0, tong: tam - giam + (tam ? phi : 0) };
}
function maNgauNhien() {
  return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
function soDienThoaiHopLe(s) {
  return /^0\d{9}$/.test(s);
}
function dangNhapTaiKhoan(tk) {
  const truoc = sessionStorage.getItem("kiddobooks-phien");
  sessionStorage.setItem("kiddobooks-phien", tk.id);
  try {
    const gio = (kho.gio[tk.id] || []).map((d) => ({ ...d }));
    for (const dong of kho.gio.khach || []) {
      const co = gio.find((d) => d.id === dong.id);
      if (co) co.soLuong = Math.min(99, co.soLuong + dong.soLuong);
      else gio.push({ ...dong });
    }
    kho.gio[tk.id] = gio;
    kho.gio.khach = [];
    if (kho.ma.khach) {
      kho.ma[tk.id] = kho.ma.khach;
      delete kho.ma.khach;
    }
    luuDuLieu();
  } catch (e) {
    if (truoc) sessionStorage.setItem("kiddobooks-phien", truoc);
    else sessionStorage.removeItem("kiddobooks-phien");
    throw e;
  }
}
