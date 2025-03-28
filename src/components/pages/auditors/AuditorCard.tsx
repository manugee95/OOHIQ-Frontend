"use client";
import React from "react";
import Image from "next/image";
import AppButton from "@/components/shared/AppButton";

export default function AuditorCard() {
	return (
		<div className="w-full rounded-2xl bg-white p-5 flex flex-col gap-y-5">
			<div>
				<span className="bg-[#B4F2AE] px-6 py-3 border-secondary border-[1.5px] text-xl font-medium flex items-center justify-center rounded-full w-max">
					Active
				</span>
			</div>
			<div className="flex items-center gap-5">
				<Image
					src={
						"https://images.unsplash.com/photo-1742943679521-f4736500a471?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
					}
					alt="OOHIQ"
					width={50}
					height={50}
					className="w-[50px] h-[50px] rounded-full object-cover object-top"
				/>
				<span className="text-[2rem] text-secondary font-semibold">
					Raphael Ajayi
				</span>
			</div>
			<div>
				<span className="text-[#6D706F] text-[1.7rem]">
					256 tasks completed
				</span>
			</div>
			<div>
				<AppButton className="!text-secondary" label="Activate" />
			</div>
		</div>
	);
}
