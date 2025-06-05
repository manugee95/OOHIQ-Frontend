"use client";
import React, { useState } from "react";
import LocationCard from "./LocationCard";
import { useQuery } from "@tanstack/react-query";
import { useRootStore } from "@/components/shared/providers/RootProvider";
import { ApiInstance } from "@/utils";
import AppLoader from "@/components/shared/AppLoader";

export default function LocationsList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { currentCountry } = useRootStore();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pending-audits", currentPage, currentCountry],
		queryFn: async function () {
			const response = await ApiInstance.get(
				`/api/all-boards?page=${currentPage}&country=${currentCountry?.name}`
			);
			return response.data;
		},
		retry: false,
		gcTime: 0,
	});

	if ((isLoading || isFetching)) {
		return (
			<div className="w-full flex flex-col gap-y-8 fle items-center justify-center min-h-screen">
				<AppLoader />;
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col gap-y-8">
			<div className="mt-8 grid grid-cols-3 gap-5">
				{(!isLoading || !isFetching) &&
					data &&
					data?.boards?.map((d: any, i: number) => (
						<LocationCard item={d} key={i} />
					))}
			</div>
		</div>
	);
}
