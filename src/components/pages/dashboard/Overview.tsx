"use client";
import React from "react";
import AdvertisersIcon from "@/components/shared/icons/AdvertisersIcon";
import LocationIcon from "@/components/shared/icons/LocationIcon";
import TotalAudits from "@/components/shared/icons/TotalAudits";

export default function Overview() {
	return (
		<div className="grid grid-cols-3 gap-8">
			<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
				<div className="flex items-center justify-between">
					<span className="text-[2rem] text-textBlack font-medium">
						Field Auditors
					</span>
					<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
						<AdvertisersIcon fill="#1E1E1E" />
					</div>
				</div>
				<span className="text-[5rem] text-textBlack font-bold">500</span>
			</div>
			<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
				<div className="flex items-center justify-between">
					<span className="text-[2rem] text-textBlack font-medium">
						Total Audits
					</span>
					<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
						<TotalAudits fill="#1E1E1E" />
					</div>
				</div>
				<span className="text-[5rem] text-textBlack font-bold">500</span>
			</div>
			<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
				<div className="flex items-center justify-between">
					<span className="text-[2rem] text-textBlack font-medium">
						Locations
					</span>
					<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
						<LocationIcon fill="#1E1E1E" />
					</div>
				</div>
				<span className="text-[5rem] text-textBlack font-bold">500</span>
			</div>
		</div>
	);
}
