"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import Dropdown from "@/components/shared/Dropdown";
import Kebab from "@/components/shared/icons/Kebab";
import AppCheckbox from "@/components/shared/AppCheckbox";
import { Campaign, Site } from "@/types";
import { useParams } from "next/navigation";
import { ApiInstance } from "@/utils";
import { useRootStore } from "@/components/shared/providers/RootProvider";
import { useQuery } from "@tanstack/react-query";
import AppButton from "@/components/shared/AppButton";
import useAlert from "@/hooks/useAlert";
import { AxiosError } from "axios";
import Link from "next/link";

interface SiteStatusSummary {
	existent: number;
	nonExistent: number;
	unknown: number;
	totalSites: number;
}

export default function CampaignDetails() {
	const { currentCampaign, setCurrentCampaign } = useRootStore();
	const params = useParams();
	const { showAndHideAlert } = useAlert();

	const [stats, setStats] = useState<SiteStatusSummary | null>(null);
	const [isSheduling, setIsScheduling] = useState(false);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["campaignDetails", params.campaignId],
		queryFn: async () => {
			const response = await ApiInstance.get(
				`/api/campaign/${params.campaignId}`
			);

			return response.data;
		},
		gcTime: 0,
	});

	useEffect(() => {
		console.log(data);
		if (data) {
			setCurrentCampaign(data.campaign);
			setStats(data.stats);
		}
	}, [data]);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(
		(currentCampaign?.siteList.length ?? 0) / itemsPerPage
	);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	console.log(totalPages, currentCampaign?.siteList.length);

	async function scheduleNonExistentHandler() {
		try {
			setIsScheduling(true);
			await ApiInstance.post(
				`/api/campaign/schedule-audit/${params.campaignId}`
			);
			showAndHideAlert({
				message: "Unknown sites scheduled.",
				type: "error",
			});
			setIsScheduling(false);
		} catch (error) {
			const err = error as AxiosError<any>;
			showAndHideAlert({
				message:
					err?.response?.data?.error ??
					err?.response?.data?.message ??
					"An error occurred! Try again or check internet connection",
				type: "error",
			});
			setIsScheduling(false);
		}
	}

	return (
		<div className="h-full flex flex-col gap-y-10">
			{currentCampaign && (
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<span className="text-3xl font-medium">
							Campaign ID:{currentCampaign?.campaignId}
						</span>
						<span className="text-2xl font-medium text-[#787878]">
							Client :{currentCampaign?.client.fullName}
						</span>
					</div>
					{stats && stats.nonExistent > 0 && (
						<AppButton
							showLoading={isSheduling}
							onClick={async () => {
								await scheduleNonExistentHandler();
							}}
							className="!w-max px-[20px] !text-secondary">
							<span>Schedule Non Existent Sites</span>
						</AppButton>
					)}
				</div>
			)}
			{!isLoading && !isFetching && data && (
				<div className="grid grid-cols-4 gap-5">
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3 bg-white rounded-2xl drop-shadow-lg">
						<span className="text-2xl text-[#787878] font-medium">
							Total Sites
						</span>
						<span className="text-[3rem] font-bold">{stats?.totalSites}</span>
					</div>
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3 bg-white rounded-2xl drop-shadow-lg">
						<span className="text-2xl text-[#787878] font-medium">
							Existent Sites
						</span>
						<span className="text-[3rem] font-bold">{stats?.existent}</span>
					</div>
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3 bg-white rounded-2xl drop-shadow-lg">
						<span className="text-2xl text-[#787878] font-medium">
							Non Existent Sites
						</span>
						<span className="text-[3rem] font-bold">{stats?.nonExistent}</span>
					</div>
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3 bg-white rounded-2xl drop-shadow-lg">
						<span className="text-2xl text-[#787878] font-medium">
							Unknown Sites
						</span>
						<span className="text-[3rem] font-bold">{stats?.unknown}</span>
					</div>
				</div>
			)}
			{(isLoading || isFetching || data === undefined) && (
				<div className="grid grid-cols-4 gap-5">
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3  rounded-2xl  bg-[#d3d3d3] animate-pulse"></div>
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3  rounded-2xl  bg-[#d3d3d3] animate-pulse"></div>
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3  rounded-2xl  bg-[#d3d3d3] animate-pulse"></div>
					<div className="p-5 w-full h-[100px] flex flex-col gap-y-3  rounded-2xl  bg-[#d3d3d3] animate-pulse"></div>
				</div>
			)}
			<div className="grow w-full overflow-auto xl:overflow-visible">
				<table className="w-[250%] md:w-[150%] xl:w-full">
					<thead className="border-b border-t border-[#C7C7C7] border-t-[#C7C7C7] bg-[#f5f5f5]">
						<tr>
							<th className="p-5">
								<div>
									<AppCheckbox name="check-all" />
								</div>
							</th>
							<th className="text-center ">
								<span className="text-2xl font-semibold">Code</span>
							</th>
							<th>
								<span className="text-2xl font-semibold">Brand</span>
							</th>
							<th className="">
								<span className="text-2xl font-semibold">City</span>
							</th>
							<th className="">
								<span className="text-2xl font-semibold">State</span>
							</th>
							<th className="w-[215px] text-left">
								<span className="text-2xl font-semibold w-full">Address</span>
							</th>
							<th className="">
								<span className="text-2xl font-semibold">Media Owner</span>
							</th>
							<th className="">
								<span className="text-2xl font-semibold">Media Type</span>
							</th>
							<th className="">
								<span className="text-2xl font-semibold">Status</span>
							</th>
							<th className="text-center">
								<span className="text-2xl font-semibold">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{!currentCampaign &&
							[1, 2, 3, 4].map((d, i) => (
								<tr key={i} className="border-b border-b-[#B7B7B7]">
									<td>
										<div className="flex items-center gap-5 p-5">
											<div className="w-[20px] rounded-xl h-[20px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="flex items-center gap-5 p-5">
											<div className="w-[100px] rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[100px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[100px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[105px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[100px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[100px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-[100px]">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
									<td>
										<div className="p-5">
											<div className="bg-[#eaeaea] animate-pulse w-[109px] h-[50px] rounded-full object-cover object-top"></div>
										</div>
									</td>
									<td>
										<div className="p-5 w-full">
											<div className="w-full rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
										</div>
									</td>
								</tr>
							))}
						{currentCampaign &&
							currentCampaign?.siteList
								.slice(startIndex, endIndex)
								.map((d: Site, i: number) => {
									const isUnknown = d.existStatus === "Unknown";
									const isExistent = d.existStatus === "Existent";
									const isNonExistent = d.existStatus === "Non-existent";

									return (
										<tr
											key={i}
											className="border-b-[#E6E6E6] border-b bg-white 
                        ">
											<td className="text-center p-5 py-10">
												<div>
													<AppCheckbox name="check-all" />
												</div>
											</td>
											<td className="text-center">
												<span className="text-xl font-medium">{d.code}</span>
											</td>
											<td className="text-center">
												<span className="text-xl font-medium">{d.brand}</span>
											</td>
											<td className="text-center">
												<span className="text-xl font-medium text-center">
													{d.state}
												</span>
											</td>
											<td className="text-center">
												<span className="text-xl font-medium">{d.town}</span>
											</td>
											<td className="">
												<span className="text-xl font-medium">
													{d.location}
												</span>
											</td>
											<td className="text-center">
												<span className="text-xl font-medium">
													{d.mediaOwner}
												</span>
											</td>
											<td className="text-center">
												<span className="text-xl font-medium">Led</span>
											</td>
											<td className="text-center">
												<span
													className={`flex p-[5px] border-[1.5px] ${
														isUnknown
															? "border-[#FF8617] text-[#FF8617]  bg-[#FFE3CA]"
															: ""
													} ${
														isExistent
															? "border-[#1b8e41] text-[#1b8e41]  bg-[#bbe7ca]"
															: ""
													}  ${
														isNonExistent
															? "border-[#e7352b] text-[#e7352b]  bg-[#e7c1bb]"
															: ""
													} rounded-full text-2xl items-center justify-center font-medium`}>
													{isExistent && "Existent"}
													{isNonExistent && "Non Existent"}
													{isUnknown && "Unknown"}
												</span>
											</td>
											<td className="text-center">
												<Link
													href={`/campaigns/${params.clientId}/details/${params.campaignId}/audit/${d.code}`}>
													<span className="underline text-2xl text-secondary font-medium">
														View audit
													</span>
												</Link>
											</td>
										</tr>
									);
								})}
					</tbody>
				</table>
			</div>
			<div className="my-12 flex items-center justify-center md:justify-end px-5 md:px-10">
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</div>
		</div>
	);
}
