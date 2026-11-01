// Dữ liệu sản phẩm và ảnh dùng chung cho mọi trang.
const DANH_MUC = [
  "Flashcard",
  "Sách tô màu",
  "Truyện cổ tích",
  "Sách tập viết",
  "Sách toán tư duy",
  "Sách tập vẽ"
];
const SAN_PHAM = [
  {
    "id": "100-loai-dong-vat-dau-tien-cua-be",
    "ten": "100 Loài Động Vật Đầu Tiên Của Bé",
    "gia": 82000,
    "danhMuc": 0,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/100-loai-dong-vat-dau-tien-cua-be/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/100-loai-dong-vat-dau-tien-cua-be/anh-1.webp",
      "hinh-anh/san-pham/100-loai-dong-vat-dau-tien-cua-be/anh-2.webp",
      "hinh-anh/san-pham/100-loai-dong-vat-dau-tien-cua-be/anh-3.webp",
      "hinh-anh/san-pham/100-loai-dong-vat-dau-tien-cua-be/anh-4.webp",
      "hinh-anh/san-pham/100-loai-dong-vat-dau-tien-cua-be/anh-5.webp"
    ],
    "nhan": "Mới"
  },
  {
    "id": "bo-the-flashcard-nhieu-chu-de",
    "ten": "Bộ Thẻ Flashcard Nhiều Chủ Đề",
    "gia": 92000,
    "danhMuc": 0,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-1.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-2.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-3.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-4.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-5.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-6.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-7.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-8.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-9.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-10.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-11.webp",
      "hinh-anh/san-pham/bo-the-flashcard-nhieu-chu-de/anh-12.webp"
    ],
    "nhan": "Bán chạy"
  },
  {
    "id": "mtt-bon-mua",
    "ten": "Mtt - Bốn Mùa",
    "gia": 69000,
    "danhMuc": 1,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/mtt-bon-mua/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/mtt-bon-mua/anh-1.webp"
    ],
    "nhan": "Mới"
  },
  {
    "id": "mtt-hoa",
    "ten": "Mtt - Hoa",
    "gia": 79000,
    "danhMuc": 1,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/mtt-hoa/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/mtt-hoa/anh-1.webp"
    ],
    "nhan": "Bán chạy"
  },
  {
    "id": "su-tich-cay-khe",
    "ten": "Sự Tích Cây Khế",
    "gia": 65000,
    "danhMuc": 2,
    "mau": "la",
    "anh": "hinh-anh/san-pham/su-tich-cay-khe/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/su-tich-cay-khe/anh-1.webp",
      "hinh-anh/san-pham/su-tich-cay-khe/anh-2.webp",
      "hinh-anh/san-pham/su-tich-cay-khe/anh-3.webp",
      "hinh-anh/san-pham/su-tich-cay-khe/anh-4.webp",
      "hinh-anh/san-pham/su-tich-cay-khe/anh-5.webp"
    ],
    "nhan": "Mới"
  },
  {
    "id": "su-tich-dua-hau",
    "ten": "Sự Tích Dưa Hấu",
    "gia": 75000,
    "danhMuc": 2,
    "mau": "hong",
    "anh": "hinh-anh/san-pham/su-tich-dua-hau/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/su-tich-dua-hau/anh-1.webp",
      "hinh-anh/san-pham/su-tich-dua-hau/anh-2.webp",
      "hinh-anh/san-pham/su-tich-dua-hau/anh-3.webp",
      "hinh-anh/san-pham/su-tich-dua-hau/anh-4.webp",
      "hinh-anh/san-pham/su-tich-dua-hau/anh-5.webp"
    ],
    "nhan": "Bán chạy"
  },
  {
    "id": "sach-toan-tu-duy",
    "ten": "Sách Toán Tư Duy",
    "gia": 125000,
    "danhMuc": 4,
    "mau": "hong",
    "anh": "hinh-anh/san-pham/sach-toan-tu-duy/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/sach-toan-tu-duy/anh-1.webp",
      "hinh-anh/san-pham/sach-toan-tu-duy/anh-2.webp",
      "hinh-anh/san-pham/sach-toan-tu-duy/anh-3.webp"
    ],
    "nhan": "Mới"
  },
  {
    "id": "bo-dung-cu-ve-doms",
    "ten": "Bộ Dụng Cụ Vẽ Doms",
    "gia": 99000,
    "danhMuc": 5,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-1.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-2.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-3.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-4.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-5.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-6.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-7.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-8.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-9.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-10.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-11.webp",
      "hinh-anh/san-pham/bo-dung-cu-ve-doms/anh-12.webp"
    ],
    "nhan": "Mới"
  },
  {
    "id": "bo-my-thuat-cao-cap-kuromi",
    "ten": "Bộ Mỹ Thuật Cao Cấp Kuromi",
    "gia": 109000,
    "danhMuc": 5,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/bo-my-thuat-cao-cap-kuromi/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-kuromi/anh-1.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-kuromi/anh-2.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-kuromi/anh-3.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-kuromi/anh-4.webp"
    ],
    "nhan": "Bán chạy"
  },
  {
    "id": "bo-the-trai-cay-song-ngu",
    "ten": "Bộ Thẻ Trái Cây Song Ngữ",
    "gia": 102000,
    "danhMuc": 0,
    "mau": "la",
    "anh": "hinh-anh/san-pham/bo-the-trai-cay-song-ngu/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-the-trai-cay-song-ngu/anh-1.webp",
      "hinh-anh/san-pham/bo-the-trai-cay-song-ngu/anh-2.webp",
      "hinh-anh/san-pham/bo-the-trai-cay-song-ngu/anh-3.webp",
      "hinh-anh/san-pham/bo-the-trai-cay-song-ngu/anh-4.webp"
    ],
    "nhan": ""
  },
  {
    "id": "bo-the-vat-nuoi-song-ngu",
    "ten": "Bộ Thẻ Vật Nuôi Song Ngữ",
    "gia": 112000,
    "danhMuc": 0,
    "mau": "hong",
    "anh": "hinh-anh/san-pham/bo-the-vat-nuoi-song-ngu/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-the-vat-nuoi-song-ngu/anh-1.webp",
      "hinh-anh/san-pham/bo-the-vat-nuoi-song-ngu/anh-2.webp",
      "hinh-anh/san-pham/bo-the-vat-nuoi-song-ngu/anh-3.webp",
      "hinh-anh/san-pham/bo-the-vat-nuoi-song-ngu/anh-4.webp"
    ],
    "nhan": ""
  },
  {
    "id": "mtt-rau-cu",
    "ten": "Mtt - Rau Củ",
    "gia": 89000,
    "danhMuc": 1,
    "mau": "la",
    "anh": "hinh-anh/san-pham/mtt-rau-cu/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/mtt-rau-cu/anh-1.webp"
    ],
    "nhan": ""
  },
  {
    "id": "mtt-trai-cay",
    "ten": "Mtt - Trái Cây",
    "gia": 99000,
    "danhMuc": 1,
    "mau": "hong",
    "anh": "hinh-anh/san-pham/mtt-trai-cay/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/mtt-trai-cay/anh-1.webp"
    ],
    "nhan": ""
  },
  {
    "id": "mtt-ong-vat",
    "ten": "Mtt - Động Vật",
    "gia": 109000,
    "danhMuc": 1,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/mtt-ong-vat/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/mtt-ong-vat/anh-1.webp"
    ],
    "nhan": ""
  },
  {
    "id": "to-tuoi-tho-ve-nu-cuoi",
    "ten": "Tô Tuổi Thơ Vẽ Nụ Cười",
    "gia": 119000,
    "danhMuc": 1,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/to-tuoi-tho-ve-nu-cuoi/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/to-tuoi-tho-ve-nu-cuoi/anh-1.webp"
    ],
    "nhan": ""
  },
  {
    "id": "su-tich-ho-guom",
    "ten": "Sự Tích Hồ Gươm",
    "gia": 85000,
    "danhMuc": 2,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/su-tich-ho-guom/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/su-tich-ho-guom/anh-1.webp",
      "hinh-anh/san-pham/su-tich-ho-guom/anh-2.webp",
      "hinh-anh/san-pham/su-tich-ho-guom/anh-3.webp",
      "hinh-anh/san-pham/su-tich-ho-guom/anh-4.webp",
      "hinh-anh/san-pham/su-tich-ho-guom/anh-5.webp"
    ],
    "nhan": ""
  },
  {
    "id": "su-tich-trau-cau",
    "ten": "Sự Tích Trầu Cau",
    "gia": 95000,
    "danhMuc": 2,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/su-tich-trau-cau/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/su-tich-trau-cau/anh-1.webp",
      "hinh-anh/san-pham/su-tich-trau-cau/anh-2.webp",
      "hinh-anh/san-pham/su-tich-trau-cau/anh-3.webp",
      "hinh-anh/san-pham/su-tich-trau-cau/anh-4.webp",
      "hinh-anh/san-pham/su-tich-trau-cau/anh-5.webp"
    ],
    "nhan": ""
  },
  {
    "id": "thanh-giong",
    "ten": "Thánh Gióng",
    "gia": 105000,
    "danhMuc": 2,
    "mau": "la",
    "anh": "hinh-anh/san-pham/thanh-giong/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/thanh-giong/anh-1.webp",
      "hinh-anh/san-pham/thanh-giong/anh-2.webp",
      "hinh-anh/san-pham/thanh-giong/anh-3.webp",
      "hinh-anh/san-pham/thanh-giong/anh-4.webp",
      "hinh-anh/san-pham/thanh-giong/anh-5.webp"
    ],
    "nhan": ""
  },
  {
    "id": "thach-sanh",
    "ten": "Thạch Sanh",
    "gia": 115000,
    "danhMuc": 2,
    "mau": "hong",
    "anh": "hinh-anh/san-pham/thach-sanh/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/thach-sanh/anh-1.webp",
      "hinh-anh/san-pham/thach-sanh/anh-2.webp",
      "hinh-anh/san-pham/thach-sanh/anh-3.webp",
      "hinh-anh/san-pham/thach-sanh/anh-4.webp",
      "hinh-anh/san-pham/thach-sanh/anh-5.webp"
    ],
    "nhan": ""
  },
  {
    "id": "tam-cam",
    "ten": "Tấm Cám",
    "gia": 125000,
    "danhMuc": 2,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/tam-cam/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/tam-cam/anh-1.webp",
      "hinh-anh/san-pham/tam-cam/anh-2.webp",
      "hinh-anh/san-pham/tam-cam/anh-3.webp",
      "hinh-anh/san-pham/tam-cam/anh-4.webp",
      "hinh-anh/san-pham/tam-cam/anh-5.webp"
    ],
    "nhan": ""
  },
  {
    "id": "be-tap-doc-va-tap-viet",
    "ten": "Bé Tập Đọc Và Tập Viết",
    "gia": 79000,
    "danhMuc": 3,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-1.webp",
      "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-2.webp",
      "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-3.webp",
      "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-4.webp",
      "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-5.webp",
      "hinh-anh/san-pham/be-tap-doc-va-tap-viet/anh-6.webp"
    ],
    "nhan": ""
  },
  {
    "id": "tap-to-chu-hoa",
    "ten": "Tập Tô Chữ Hoa",
    "gia": 89000,
    "danhMuc": 3,
    "mau": "la",
    "anh": "hinh-anh/san-pham/tap-to-chu-hoa/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-1.webp",
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-2.webp",
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-3.webp",
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-4.webp",
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-5.webp",
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-6.webp",
      "hinh-anh/san-pham/tap-to-chu-hoa/anh-7.webp"
    ],
    "nhan": ""
  },
  {
    "id": "bo-my-thuat-cao-cap-my-little-pony",
    "ten": "Bộ Mỹ Thuật Cao Cấp My Little Pony",
    "gia": 119000,
    "danhMuc": 5,
    "mau": "la",
    "anh": "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-1.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-2.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-3.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-4.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-5.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-6.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-7.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-8.webp",
      "hinh-anh/san-pham/bo-my-thuat-cao-cap-my-little-pony/anh-9.webp"
    ],
    "nhan": ""
  },
  {
    "id": "bo-sach-tap-to-sang-tao-cung-wolfoo",
    "ten": "Bộ Sách Tập Tô Sáng Tạo Cùng Wolfoo",
    "gia": 129000,
    "danhMuc": 5,
    "mau": "hong",
    "anh": "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-1.webp",
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-2.webp",
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-3.webp",
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-4.webp",
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-5.webp",
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-6.webp",
      "hinh-anh/san-pham/bo-sach-tap-to-sang-tao-cung-wolfoo/anh-7.webp"
    ],
    "nhan": ""
  },
  {
    "id": "bo-tap-to-mau-colokit-disney-princess",
    "ten": "Bộ Tập Tô Màu Colokit Disney Princess",
    "gia": 139000,
    "danhMuc": 5,
    "mau": "xanh",
    "anh": "hinh-anh/san-pham/bo-tap-to-mau-colokit-disney-princess/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-disney-princess/anh-1.webp",
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-disney-princess/anh-2.webp",
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-disney-princess/anh-3.webp",
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-disney-princess/anh-4.webp"
    ],
    "nhan": ""
  },
  {
    "id": "bo-tap-to-mau-colokit-o-to",
    "ten": "Bộ Tập Tô Màu Colokit Ô Tô",
    "gia": 149000,
    "danhMuc": 5,
    "mau": "vang",
    "anh": "hinh-anh/san-pham/bo-tap-to-mau-colokit-o-to/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-o-to/anh-1.webp",
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-o-to/anh-2.webp",
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-o-to/anh-3.webp",
      "hinh-anh/san-pham/bo-tap-to-mau-colokit-o-to/anh-4.webp"
    ],
    "nhan": ""
  },
  {
    "id": "tap-ve-hinh-khoi-on-gian",
    "ten": "Tập Vẽ Hình Khối Đơn Giản",
    "gia": 159000,
    "danhMuc": 5,
    "mau": "la",
    "anh": "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-1.webp",
    "anhChiTiet": [
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-1.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-2.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-3.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-4.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-5.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-6.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-7.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-8.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-9.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-10.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-11.webp",
      "hinh-anh/san-pham/tap-ve-hinh-khoi-on-gian/anh-12.webp"
    ],
    "nhan": ""
  }
];
function timSach(id) { return SAN_PHAM.find((sach) => sach.id === id); }
function moTa(sach) {
  if (sach.danhMuc === 2) return `${sach.ten} giúp bé làm quen với câu chuyện gần gũi, hình ảnh dễ nhớ và các bài học nhẹ nhàng về gia đình, lòng dũng cảm và cách cư xử.`;
  if (sach.danhMuc === 0) return `${sach.ten} gồm nhiều thẻ hình rõ ràng, màu sắc vui mắt, giúp bé học từ mới và nhận biết sự vật trong đời sống.`;
  return `${sach.ten} giúp bé khám phá thế giới theo cách gần gũi và thú vị. Nội dung được trình bày rõ ràng để cha mẹ cùng con học hỏi và thực hành mỗi ngày.`;
}


