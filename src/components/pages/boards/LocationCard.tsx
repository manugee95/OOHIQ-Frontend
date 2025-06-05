"use client";
import React, { useState } from "react";
import Image from "next/image";
import AppButton from "@/components/shared/AppButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuditsStore } from "@/components/shared/providers/AuditsProvider";

export default function LocationCard({ item }: { item: any }) {
	const router = useRouter();
	const { setCurrentAudit } = useAuditsStore();
	const [loading, setLoading] = useState(false);

	return (
		<div className="w-full rounded-2xl bg-white flex flex-col gap-y-5 overflow-hidden">
			<Image
				src={item.closeShotUrl}
				alt="OOHIQ"
				width={350}
				height={250}
				className="w-full h-[225px] object-cover object-top"
			/>
			<div className="px-5 flex flex-col gap-2">
				<span className="text-3xl font-bold">{item.boardCode}</span>
				<span className="text-[#6D706F] text-[1.7rem]">{item.location}</span>
			</div>
			<div className="grid grid-cols-2 gap-3 px-5 pb-5">
				<AppButton className="!text-secondary" label="Visualise" />
				<AppButton
					showLoading={loading}
					onClick={() => {
						setLoading(true);
						setCurrentAudit(item);
						router.push(`/boards/${item.id}`);
					}}
					className="!text-secondary"
					label="View Details"
				/>
			</div>
		</div>
	);
}
