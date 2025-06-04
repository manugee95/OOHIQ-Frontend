"use client";
import React from "react";
import AdvertisersIcon from "@/components/shared/icons/AdvertisersIcon";
import LocationIcon from "@/components/shared/icons/LocationIcon";
import TotalAudits from "@/components/shared/icons/TotalAudits";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/utils";
import { useRootStore } from "@/components/shared/providers/RootProvider";

// {
// 	"totalBoards": 2,
//     "totalAudits": 5,
//     "totalClients": 1,
//     "totalMediaOwners": 0,
//     "totalFieldAuditors": 0
// }

export default function Overview() {
	const { currentCountry } = useRootStore();
	const { data, isLoading, error, isPending } = useQuery({
		queryKey: ["analytics", currentCountry],
		queryFn: async () => {
			const res = await ApiInstance.get(
				`/api/get-analytics-overview?country=${currentCountry?.name}`
			);
			return res.data;
		},
		retry: false,
		gcTime: 0,
		enabled: currentCountry !== null,
	});

	// console.log(data);

	return (
		<div className="grid grid-cols-3 gap-8">
			{(isLoading || isPending) && (
				<>
					{[1, 2, 3, 4, 5, 6].map((d, i) => (
						<div
							key={i}
							className="cursor-pointer p-[10px] rounded-2xl hover:bg-primary transition-all duration-100 h-[120px] bg-[#c8c8c8] animate-pulse"></div>
					))}
				</>
			)}
			{!isLoading && data && (
				<>
					<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
						<div className="flex items-center justify-between">
							<span className="text-[2rem] text-textBlack font-medium">
								Total Boards
							</span>
							<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
								<AdvertisersIcon fill="#1E1E1E" />
							</div>
						</div>
						<span className="text-[5rem] text-textBlack font-bold">
							{data.totalBoards}
						</span>
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
						<span className="text-[5rem] text-textBlack font-bold">
							{data.totalAudits}
						</span>
					</div>
					<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
						<div className="flex items-center justify-between">
							<span className="text-[2rem] text-textBlack font-medium">
								Total Clients
							</span>
							<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
								<LocationIcon fill="#1E1E1E" />
							</div>
						</div>
						<span className="text-[5rem] text-textBlack font-bold">
							{data.totalClients}
						</span>
					</div>
					<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
						<div className="flex items-center justify-between">
							<span className="text-[2rem] text-textBlack font-medium">
								Total Media Owners
							</span>
							<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
								<LocationIcon fill="#1E1E1E" />
							</div>
						</div>
						<span className="text-[5rem] text-textBlack font-bold">
							{data.totalMediaOwners}
						</span>
					</div>
					<div className="cursor-pointer p-[10px] rounded-2xl bg-white hover:bg-primary transition-all duration-100">
						<div className="flex items-center justify-between">
							<span className="text-[2rem] text-textBlack font-medium">
								Total Field Auditors
							</span>
							<div className="w-[35px] h-[35px] rounded-xl flex items-center justify-center bg-[#f4f4f4]">
								<LocationIcon fill="#1E1E1E" />
							</div>
						</div>
						<span className="text-[5rem] text-textBlack font-bold">
							{data.totalFieldAuditors}
						</span>
					</div>
				</>
			)}
		</div>
	);
}
