import React from "react";

export default function AppLoader({ size = 54 }: { size?: number }) {
	return (
		<div className="loader">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

AppLoader.Secondary = function AppLoader({
	width = "5rem",
	height = "5rem",
	border = "0.5rem",
}) {
	return (
		<div
			style={{ width, height, borderWidth: border }}
			className="rounded-full  border-[#f3fabb] border-t-secondary spin"></div>
	);
};
