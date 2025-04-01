#show: rest => context {
    if target() == "paged" {
        set page(paper: "a4", flipped: true)
        rest
    } else if target() == "html" {
        rest
    } else {
        rest
    }
}

#let inputData = json(bytes(sys.inputs.at("input", default: "{}")))

#let input(label) = context {
    if target() == "paged" {
        inputData.at(label, default: line(length: 100%, stroke: (dash: "dotted")))
    } else if target() == "html" {
        html.elem("input", attrs: (name: label))
    } else {
        [...]
    }
}

#align(
    center,
    [
        #text(14pt, weight: "bold", "Phụ lục II")

        #text(
            style: "italic",
            "(Kèm theo Thông tư số 11/2025/TT-BTC ngày 19 tháng 3 năm 2025 của Bộ trưởng Bộ Tài chính)",
        )
    ],
)

\

#box(
    width: 1fr,
    baseline: 100%,
    align(
        left,
        [
            #text(weight: "bold", "Bộ, tỉnh: ")
            #box(width: 1fr, input("input1")) \
            #text(weight: "bold", "Cơ quan quản lý cấp trên:")
            #box(width: 1fr, input("input2")) \
            #text(weight: "bold", "Cơ quan, tổ chức, đơn vị sử dụng tài sản:")
            #box(width: 1fr, input("input3")) \
            #text(weight: "bold", "Mã đơn vị:")
            #box(width: 1fr, input("input4")) \
            #text(weight: "bold", "Loại hình đơn vị:")
            #box(width: 1fr, input("input5")) \
        ],
    ),
)
#box(
    width: 1fr,
    baseline: 100%,
    align(
        right,
        [
            Mẫu số 09d-CK/TSC
        ],
    ),
)

\

#align(center, text(13pt, weight: "bold", "CÔNG KHAI TÌNH HÌNH XỬ LÝ TÀI SẢN CÔNG NĂM ..."))

#v(8mm)

#show table.cell: it => {
    if (it.y in range(4)) {
        text(weight: "bold", it)
    } else {
        it
    }
}

#table(
    columns: 18,
    align: horizon,
    table.header(
        repeat: false,
        table.cell(rowspan: 3)[STT],
        table.cell(rowspan: 3)[Danh mục tài sản trong kỳ báo cáo được xử lý],
        table.cell(colspan: 3)[Giá trị theo sổ sách kế toán (Nghìn đồng)],
        table.cell(colspan: 7)[Hình thức xử lý theo Quyết định của cấp có thẩm quyền],
        table.cell()[Kết quả xử lý đến thời điểm báo cáo],
        table.cell(colspan: 3)[Số tiền thu được từ xử lý tài sản (Nghìn đồng)],
        table.cell()[Chi phí xử lý tài sản (Nghìn đồng)],
        table.cell()[Ghi chú],
        table.cell(colspan: 2)[Nguyên giá],
        table.cell(rowspan: 2)[Giá trị còn lại],
        table.cell(rowspan: 2)[Thu hồi],
        table.cell(rowspan: 2)[Điều chuyển],
        table.cell(rowspan: 2)[Bán],
        table.cell(rowspan: 2)[Thanh lý],
        table.cell(rowspan: 2)[Tiêu hủy],
        table.cell(rowspan: 2)[Xử lý trong trường hợp bị mất, bị hủy hoại],
        table.cell(rowspan: 2)[Xử lý khác],
        table.cell(rowspan: 2)[],
        table.cell(rowspan: 2)[Tổng cộng],
        table.cell(rowspan: 2)[Đã nộp tài khoản tạm giữ],
        table.cell(rowspan: 2)[Chưa nộp tài khoản tạm giữ],
        table.cell(rowspan: 2)[],
        table.cell(rowspan: 2)[],
        table.cell()[Nguồn ngân sách],
        table.cell()[Nguồn khác],

        ..array.range(1, 19).map(i => [#i]),
    ),

    [I],
    [Đất],
    ..([],) * 16,
    [1],
    [Địa chỉ ...],
    ..([],) * 16,
    [],
    [...],
    ..([],) * 16,
    [II],
    [Nhà],
    ..([],) * 16,
    [1],
    [Địa chỉ ...],
    ..([],) * 16,
    [ ],
    [Nhà 1],
    ..([],) * 16,

    [ ],
    [Nhà ...],
    ..([],) * 16,
    [2],
    [Địa chỉ ...],
    ..([],) * 16,
    [],
    [...],
    ..([],) * 16,
    [III],
    [Xe ô tô],
    ..([],) * 16,
    [1],
    [Xe 1],
    ..([],) * 16,
    [2],
    [Xe ...],
    ..([],) * 16,

    [IV],
    [Tài sản cố định khác],
    ..([],) * 16,
    [],
    [...],
    ..([],) * 16,
)

#v(12mm)

#grid(
    columns: (1fr, 1fr),
    column-gutter: 1em,
    align: (center, center),
    rows: (auto, 30mm),
    block[
        \
        #text(weight: "bold", "NGƯỜI LẬP BIỂU") \
        #text(style: "italic", "(Ký, họ tên)") \
    ],
    block[
        #text("Ngày ____ tháng ____ năm ________") \
        #text(weight: "bold", "THỦ TRƯỞNG CƠ QUAN") \
        #text(style: "italic", "(Ký, họ tên và đóng dấu)") \
    ],

    block[], block[],
)

#v(12mm)

#text(weight: "bold", "Ghi chú:")
- Cột 2: Phần III Xe ô tô: Ghi theo nhãn hiệu và biển kiểm soát (Ví dụ: Toyota Camry 10A-9999).
- Cột 13: Ghi rõ đã thực hiện hay chưa, trường hợp đã bán thì ghi rõ hình thức bán (đấu giá, niêm yết, chỉ định), trường hợp đã thanh lý thì ghi rõ hình thức thanh lý (phá dỡ, hủy bỏ, bán đấu giá, bán niêm yết, bán chỉ định).
- Cột (15), (16) không áp dụng với đơn vị sự nghiệp công lập.
