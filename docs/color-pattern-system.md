# Hệ Thống Màu Sắc Chủ Đề Đất/Thổ (Earth/Soil Color System) 🌍

## Giới thiệu

Chúng tôi đã thiết lập một hệ thống biến màu (CSS variables) tập trung với chủ đề **đất/thổ** - mang ý nghĩa về sự ổn định, bền vững, gần gũi với thiên nhiên và nuôi dưỡng sự phát triển. Hệ thống này giúp:

- Dễ dàng thay đổi màu sắc toàn ứng dụng chỉ với vài dòng mã
- Đảm bảo tính nhất quán về màu sắc với chủ đề đất/thổ
- Phản ánh giá trị cốt lõi của ứng dụng: bền vững, đáng tin cậy và kết nối

## Ý Nghĩa Chủ Đề "Đất/Thổ"

- **Ổn định**: Màu đất truyền tải cảm giác vững chắc, đáng tin cậy
- **Phát triển**: Gợi lên hình ảnh đất nuôi dưỡng sự tăng trưởng
- **Tự nhiên**: Gần gũi với thiên nhiên và môi trường
- **Kết nối**: Tượng trưng cho nền tảng và sự liên kết

## Cấu Trúc Biến Màu

### Màu Chính (Primary Earth Colors)
- `--primary-100`: #f5f1e8 (Nâu nhạt)
- `--primary-200`: #eadccc
- `--primary-300`: #d3c2a8
- `--primary-400`: #bbaf88
- `--primary-500`: #a5966d (Nâu trung bình từ đất)
- `--primary-600`: #8d7b54
- `--primary-700`: #75613b
- `--primary-800`: #5d4722
- `--primary-900`: #452d09 (Nâu đậm)

### Màu Phụ (Secondary Earth Colors - Terracotta & Stone)
- `--secondary-100`: #fcf2ef
- `--secondary-200`: #f7e0d9
- `--secondary-300`: #f0c2b8
- `--secondary-400`: #eaa497
- `--secondary-500`: #d87a68 (Màu terracotta đặc trưng)
- `--secondary-600`: #c05e48
- `--secondary-700`: #a8422a
- `--secondary-800`: #90260c
- `--secondary-900`: #780a00

### Màu Bổ Sung (Complementary Earth Colors - Forest & Clay)
- `--complement-100`: #e9f4ea
- `--complement-200`: #d0e8d3
- `--complement-300`: #a8d4ad
- `--complement-400`: #80c087
- `--complement-500`: #59ab62 (Xanh lá đất)
- `--complement-600`: #438a4a
- `--complement-700`: #2d6a32
- `--complement-800`: #174a1a
- `--complement-900`: #012a02

### Màu Nền (Background Colors)
- `--bg-primary`: #fcfaf7 (Nền đất nhẹ)
- `--bg-secondary`: #f5f1e8 (Nền đất nhẹ hơn)
- `--bg-card`: #ffffff (Nền card trắng sạch)
- `--bg-modal`: rgba(85, 68, 51, 0.6) (Nền mờ đất cho modal)

### Màu Văn bản (Text Colors)
- `--text-primary`: #4d3d2e (Nâu đậm gần giống đen)
- `--text-secondary`: #7a6651 (Nâu trung bình)
- `--text-light`: #a79582 (Nâu nhạt)
- `--text-white`: #ffffff (Văn bản trắng)
- `--text-dark`: #332a1f (Đen đất)

### Màu Viền (Border Colors)
- `--border-light`: #d9d0c3 (Viền đất sáng)
- `--border-medium`: #bfb4a7 (Viền đất trung bình)
- `--border-dark`: #9e8e7a (Viền đất tối)

### Màu Trạng Thái (Status Colors)
- `--success`: #59ab62 (Xanh đất - thành công)
- `--warning`: #d8a100 (Vàng đất - cảnh báo)
- `--error`: #c05e48 (Đỏ đất - lỗi)
- `--info`: #5e8eb7 (Xanh dương đất - thông tin)

### Màu Bóng (Shadow Colors)
- `--shadow-light`: rgba(77, 61, 46, 0.1)
- `--shadow-medium`: rgba(77, 61, 46, 0.2)
- `--shadow-heavy`: rgba(77, 61, 46, 0.3)

### Gradient
- `--gradient-primary`: linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)
- `--gradient-secondary`: linear-gradient(135deg, var(--secondary-500) 0%, var(--primary-500) 100%)
- `--gradient-tertiary`: linear-gradient(135deg, var(--primary-400) 0%, var(--complement-400) 100%)

## Cách Sử Dụng

Để sử dụng các biến màu trong CSS, chỉ cần áp dụng cú pháp `var(--tên-biến)`:

```css
.my-element {
  background-color: var(--primary-500);
  color: var(--text-white);
  border: 1px solid var(--border-light);
}
```

## Vị Trí Định Nghĩa

Tất cả các biến màu được định nghĩa trong file:
`/frontend/src/App.css` (trong phần `:root {}`)

## Cập Nhật Màu Sắc

Để thay đổi màu sắc toàn bộ ứng dụng theo chủ đề đất/thổ, chỉ cần cập nhật giá trị của các biến màu trong phần `:root` của file `App.css`.