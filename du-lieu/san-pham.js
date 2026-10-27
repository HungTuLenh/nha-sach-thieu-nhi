// Dữ liệu dùng chung cho tất cả trang. Giá là số nguyên, đơn vị đồng.
const DANH_MUC = [
  "Sách tô màu",
  "Truyện tranh | Cổ tích",
  "Thẻ học",
  "Sách tư duy",
  "Kỹ năng sống",
  "Văn phòng phẩm",
];
const SAN_PHAM = [
  {
    id: "co-tich",
    ten: "Tuyển tập truyện cổ tích",
    gia: 65000,
    cu: 85000,
    danhMuc: 1,
    tuoi: 4,
    mau: "vang",
    nhan: "Bán chạy",
  },
  {
    id: "the-dong-vat",
    ten: "Flashcard về động vật",
    gia: 82000,
    danhMuc: 2,
    tuoi: 0,
    mau: "xanh",
    nhan: "Mới",
  },
  {
    id: "to-mau",
    ten: "Sách tô màu động vật",
    gia: 75000,
    danhMuc: 0,
    tuoi: 4,
    mau: "hong",
    qua: true,
  },
  {
    id: "the-tu-vung",
    ten: "Bộ thẻ từ vựng cơ bản",
    gia: 120000,
    danhMuc: 2,
    tuoi: 4,
    mau: "la",
    nhan: "Bán chạy",
  },
  {
    id: "the-dem",
    ten: "Thẻ đếm & phân loại",
    gia: 180000,
    danhMuc: 2,
    tuoi: 0,
    mau: "xanh",
    nhan: "Mới",
  },
  {
    id: "ngu-am",
    ten: "Vở luyện ngữ âm mầm non",
    gia: 90000,
    cu: 109000,
    danhMuc: 5,
    tuoi: 4,
    mau: "hong",
    nhan: "Giới hạn",
  },
  {
    id: "bang-viet",
    ten: "Bộ bảng viết xóa học tập",
    gia: 240000,
    danhMuc: 5,
    tuoi: 4,
    mau: "vang",
    qua: true,
  },
  {
    id: "stem",
    ten: "Cuộc phiêu lưu của nhà xây dựng nhí: Dự án STEM cho trí tò mò",
    gia: 290000,
    cu: 350000,
    danhMuc: 3,
    tuoi: 7,
    mau: "la",
    nhan: "Phổ biến",
  },
  {
    id: "ghep-hinh",
    ten: "Bộ khối ghép hình",
    gia: 160000,
    danhMuc: 3,
    tuoi: 4,
    mau: "xanh",
  },
  {
    id: "luyen-doc",
    ten: "Sách luyện đọc cấp độ 2",
    gia: 140000,
    danhMuc: 1,
    tuoi: 7,
    mau: "hong",
    nhan: "Tiết kiệm",
  },
  {
    id: "nhan-dan",
    ten: "Bộ nhãn dán trục số",
    gia: 60000,
    danhMuc: 5,
    tuoi: 4,
    mau: "vang",
  },
  {
    id: "ky-nang",
    ten: "Bé học cách bảo vệ bản thân",
    gia: 95000,
    danhMuc: 4,
    tuoi: 7,
    mau: "la",
    nhan: "Mới",
  },
];
function timSach(id) {
  return SAN_PHAM.find((sach) => sach.id === id);
}
function nhomTuoi(sach) {
  return sach.tuoi === 0
    ? "0–3 tuổi"
    : sach.tuoi === 4
      ? "4–6 tuổi"
      : "7–12 tuổi";
}
function moTa(sach) {
  if (sach.id === "stem")
    return "Sách hoạt động STEM sinh động, giàu tính tương tác dành cho trẻ từ 6 đến 12 tuổi. Sách phát triển tư duy logic, khả năng sáng tạo và kỹ năng giải quyết vấn đề qua các thử thách lắp ráp thực tế, kiến thức kỹ thuật thú vị và mô hình tự làm được hướng dẫn từng bước.";
  return `${sach.ten} giúp bé khám phá thế giới theo cách gần gũi và thú vị. Nội dung được trình bày rõ ràng, phù hợp với ${nhomTuoi(sach).toLowerCase()}, giúp cha mẹ cùng con học hỏi, thực hành và phát triển mỗi ngày.`;
}
