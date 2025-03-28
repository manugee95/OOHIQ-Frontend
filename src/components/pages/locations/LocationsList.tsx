"use client";
import React from "react";
import LocationCard from "./LocationCard";

export default function LocationsList() {
	return (
		<div className="w-full flex flex-col gap-y-8">
			<div className="mt-8 grid grid-cols-3 gap-5">
				<LocationCard />
				<LocationCard />
				<LocationCard />
			</div>
		</div>
	);
}
