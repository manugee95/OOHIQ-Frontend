"use client";
import AppButton from "@/components/shared/AppButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/utils";
import { Audit, Campaign, User } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { useRootStore } from "@/components/shared/providers/RootProvider";
import Kebab from "@/components/shared/icons/Kebab";
import Modal from "@/components/shared/Modal";
// import CreateClientForm from "./CreateClientForm";
import { useParams } from "next/navigation";

export const levels: { [key: string]: string } = {
	Rookie: "/Rookie.svg",
	Challenger: "/Challenger.svg",
	Professional: "/Professional.svg",
	Ultimate: "/Ultimate.svg",
	Contender: "/Contender.svg",
};

export default function ClientCampaignsList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { currentCountry, setCurrentCampaign } = useRootStore();
	const params = useParams();
	const clientId = params.clientId;

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ["client-campaigns", currentPage, currentCountry, clientId],
		queryFn: async function () {
			const response = await ApiInstance.get(
				`/api/client/${clientId}/campaigns?page=${currentPage}&country=${currentCountry?.name}`
			);
			return response.data;
		},
		retry: false,
		gcTime: 0,
		refetchOnWindowFocus: false,
	});

	console.log(data);

	return (
		<div className="overflow-hidden w-full min-h-[70vh] rounded-2xl bg-white mt-8 flex flex-col">
			<div className="flex items-center justify-between p-8">
				<span className="text-[3rem] font-bold text-textBlack">Campaigns</span>
				<Link href={`/campaigns/${clientId}/create`}>
					<AppButton className="!w-max !px-[10px] !text-secondary">
						<span>New Campaign</span>
					</AppButton>
				</Link>
			</div>
			<div className="w-full grow overflow-auto">
				<table className="w-full">
					<thead className="border-b border-t border-[#C7C7C7] border-t-[#C7C7C7] bg-[#F7F7F7]">
						<tr>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Client
								</span>
							</th>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Email
								</span>
							</th>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Total Sites
								</span>
							</th>
							<th className="text-right"></th>
						</tr>
					</thead>
					<tbody>
						{(isLoading || isFetching) &&
							[1, 2, 3, 4].map((d, i) => (
								<tr key={i} className="border-b border-b-[#B7B7B7]">
									<td>
										<div className="flex items-center gap-5 p-5">
											<div className="bg-[#eaeaea] animate-pulse w-[50px] h-[50px] rounded-full object-cover object-top"></div>
											<div className="w-[80px] rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[170px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>

									<td>
										<div className="p-5">
											<div className="bg-[#eaeaea] animate-pulse w-[109px] h-[50px] rounded-full object-cover object-top"></div>
										</div>
									</td>
									<td>
										<div className="p-5"></div>
									</td>
								</tr>
							))}
						{!isLoading &&
							!isFetching &&
							data &&
							data.campaigns &&
							data.campaigns.map((d: Campaign, i: number) => (
								<tr key={i} className="border-b border-b-[#B7B7B7]">
									<td>
										<div className="flex items-center gap-5 p-5">
											<span className="font-medium text-2xl text-secondary">
												{d.client.fullName}
											</span>
										</div>
									</td>
									<td>
										<div className="p-5">
											<span className="font-medium text-2xl text-secondary">
												{d.client.email}
											</span>
										</div>
									</td>
									<td>
										<div className="p-5">
											<span className="font-medium text-2xl text-secondary">
												{d.totalSites}
											</span>
										</div>
									</td>
									<td>
										<div className="p-5">
											<Link href={`/campaigns/${clientId}/details/${d.id}`}>
												<AppButton
													onClick={() => {
														setCurrentCampaign(d);
													}}
													fullyRounded
													className="!bg-[#3DF3A92B] !w-max !px-[10px] !text-secondary border-primary border">
													<span>View Campaign</span>
												</AppButton>
											</Link>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className="p-10">
				<Pagination
					currentPage={currentPage}
					totalPages={data?.totalPages}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
}
