import React from "react";

export default function NewsItem() {
	return (
		<div className="d-flex " style={{ padding: "15px 0" }}>
			<img
				src="https://znews-photo.zadn.vn/w480/Uploaded/wyhktpu/2020_07_14/Thumb_Top_1_nua_dau_2020.jpg"
				alt="news"
				width={100}
				height={66}
			/>
			<div style={{ fontSize: 15, marginLeft: 15 }}>
				Bích Phương, Binz được nhiều hơn mất khi đối đầu Sơn Tùng M-TP?
			</div>
		</div>
	);
}