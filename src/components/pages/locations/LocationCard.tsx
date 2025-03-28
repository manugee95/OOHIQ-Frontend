"use client";
import React from "react";
import Image from "next/image";
import AppButton from "@/components/shared/AppButton";

export default function LocationCard() {
	return (
		<div className="w-full rounded-2xl bg-white flex flex-col gap-y-5 overflow-hidden">
			<Image
				src={
					"https://images.unsplash.com/photo-1742943679521-f4736500a471?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
				}
				alt="OOHIQ"
				width={350}
				height={250}
				className="w-full h-[225px] object-cover object-top"
			/>
			<div className="px-5">
				<span className="text-[#6D706F] text-[1.7rem]">
					123, ABC Road, Ikoyi, Lagos
				</span>
			</div>
			<div className="grid grid-cols-2 gap-3 px-5 pb-5">
				<AppButton className="!text-secondary" label="Visualise" />
				<AppButton className="!text-secondary" label="View Details" />
			</div>
		</div>
	);
}
