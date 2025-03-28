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
