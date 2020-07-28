import React from "react";
import { Col, Row } from "antd";
import "./style.scss";

export default function Partner() {
	return (
		<Row>
			<Col span={24}>
				<h3 className="text-upper">Đối tác</h3>
				<Row justify="space-between">
					{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
						<Col key={item}>
							<img
								src="https://static-zmp3.zadn.vn/skins/zmp3-v5.1/images/doi-tac/universal.jpeg"
								alt="Universal"
								className="img-partner"
							/>
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	);
}
