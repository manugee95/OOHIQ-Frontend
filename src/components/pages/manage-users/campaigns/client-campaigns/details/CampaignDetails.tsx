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

export default function CampaignDetails() {
	const { currentCampaign } = useRootStore();
	// const { accessToken } = useCredentials();
	// const params = useParams();
	// const { data, isLoading, isFetching } = useQuery({
	// 	queryKey: ["campaignDetails", params.campaignId],
	// 	queryFn: async () => {
	// 		const response = await ApiInstance.get(
	// 			`/campaigns/${params.campaignId}`,
	// 			{
	// 				headers: {
	// 					"auth-token": accessToken,
	// 				},
	// 			}
	// 		);

	// 		return response.data.campaign;
	// 	},
	// 	initialData: campaign,
	// });

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(
		(currentCampaign?.siteList.length ?? 0) / itemsPerPage
	);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	console.log(totalPages, currentCampaign?.siteList.length);

	return (
		<div className="h-full flex flex-col">
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
						{currentCampaign?.siteList
							.slice(startIndex, endIndex)
							.map((d: Site, i: number) => {
								const hasAssignment = true;

								const isPending = true;
								const isApproved = false;
								const disapproved = false;

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
											<span className="text-xl font-medium">{d.location}</span>
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
											{hasAssignment ? (
												<span
													className={`flex p-[5px] border-[1.5px] ${
														isPending
															? "border-[#FF8617] text-[#FF8617]  bg-[#FFE3CA]"
															: ""
													} ${
														isApproved
															? "border-[#1b8e41] text-[#1b8e41]  bg-[#bbe7ca]"
															: ""
													}  ${
														disapproved
															? "border-[#e7352b] text-[#e7352b]  bg-[#e7c1bb]"
															: ""
													} rounded-full text-2xl items-center justify-center font-medium`}>
													Pending
												</span>
											) : (
												<span
													className={`flex p-[5px] border-[1.5px] rounded-full text-2xl items-center justify-center font-medium`}>
													Unassigned
												</span>
											)}
										</td>
										<td className="text-center">
											<Dropdown
												bordered
												dropdownWidth="180px"
												right={0}
												top={100}
												renderButton={({ setOpen, open }) => (
													<button
														onClick={() => setOpen(!open)}
														className="w-[35px] h-[35px] rounded-full flex items-center justify-center">
														<Kebab />
													</button>
												)}
												items={[]}
												renderItem={({ item, index }) => (
													<div className="w-full" key={index}>
														{item}
													</div>
												)}
											/>
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
