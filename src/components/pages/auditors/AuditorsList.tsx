"use client";
import AppButton from "@/components/shared/AppButton";
import React, { useState } from "react";
import AuditorCard from "./AuditorCard";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/utils";

export default function AuditorsList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useQuery({
		queryKey: ["audits", currentPage],
		queryFn: async function () {
			const response = await ApiInstance.get("/auditors?page=" + currentPage);
			return response.data;
		},
		retry: false,
		gcTime: 0,
	});

	return (
		<div className="w-full flex flex-col gap-y-8">
			<div className="h-[71px] bg-white flex gap-5 w-max items-center p-5 rounded-2xl">
				<AppButton
					label="All"
					className="!w-max !h-[52px] px-[40px] !text-secondary"
				/>
				<AppButton
					label="Active"
					className="!w-max !h-[52px] px-[40px] !text-secondary !bg-[#EBEBEB]"
				/>
				<AppButton
					label="Inactive"
					className="!w-max !h-[52px] px-[40px] !text-secondary !bg-[#EBEBEB]"
				/>
			</div>
			<div className="mt-8 grid grid-cols-4 gap-5">
				<AuditorCard />
				<AuditorCard />
				<AuditorCard />
				<AuditorCard />
			</div>
		</div>
	);
}
