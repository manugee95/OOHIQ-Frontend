"use client";
import React from "react";
import Image from "next/image";
import AppButton from "@/components/shared/AppButton";

export default function LocationCard({ item }: { item: any }) {
	return (
		<div className="w-full rounded-2xl bg-white flex flex-col gap-y-5 overflow-hidden">
			<Image
				src={item.closeShotUrl}
				alt="OOHIQ"
				width={350}
				height={250}
				className="w-full h-[225px] object-cover object-top"
			/>
			<div className="px-5">
				<span className="text-[#6D706F] text-[1.7rem]">{item.location}</span>
			</div>
			<div className="grid grid-cols-2 gap-3 px-5 pb-5">
				<AppButton className="!text-secondary" label="Visualise" />
				<AppButton className="!text-secondary" label="View Details" />
			</div>
		</div>
	);
}
