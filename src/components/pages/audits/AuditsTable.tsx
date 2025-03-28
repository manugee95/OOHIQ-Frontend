"use client";
import AppButton from "@/components/shared/AppButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/utils";
import { Audit } from "@/types";
import Pagination from "@/components/shared/Pagination";
import AuditTableActions from "./AuditTableActions";

export default function AuditsTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useQuery({
		queryKey: ["audits", currentPage],
		queryFn: async function () {
			const response = await ApiInstance.get("/audits?page=" + currentPage);
			return response.data;
		},
		retry: false,
		gcTime: 0,
	});

	return (
		<div className="overflow-hidden w-full min-h-[70vh] rounded-2xl bg-white mt-8 flex flex-col">
			<AuditTableActions reports={[]} />
			<div className="w-full grow overflow-auto">
				<table className="w-full">
					<thead className="border-b border-t border-[#C7C7C7] border-t-[#C7C7C7] bg-[#F7F7F7]">
						<tr>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Field Auditor
								</span>
							</th>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Location
								</span>
							</th>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Billboard Type
								</span>
							</th>
							<th className="text-center">
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Status
								</span>
							</th>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Date Uploaded
								</span>
							</th>
							<th className="text-right"></th>
						</tr>
					</thead>
					<tbody>
						{isLoading
							? [1, 2, 3, 4].map((d, i) => (
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
												<div className="w-[80px] rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
											</div>
										</td>
										<td>
											<div className="p-5">
												<div className="bg-[#eaeaea] animate-pulse w-[109px] h-[50px] rounded-full object-cover object-top"></div>
											</div>
										</td>
										<td>
											<div className="p-5 w-[170px]">
												<div className="p-5">
													<div className="w-[80px] rounded-full h-[5px] bg-[#eaeaea] animate-pulse"></div>
												</div>
											</div>
										</td>
										<td>
											<div className="p-5">
												<div className="bg-[#eaeaea] animate-pulse w-[109px] h-[50px] rounded-full object-cover object-top"></div>
											</div>
										</td>
									</tr>
							  ))
							: data.audits.map((d: Audit, i: number) => (
									<tr key={i} className="border-b border-b-[#B7B7B7]">
										<td>
											<div className="flex items-center gap-5 p-5">
												<Image
													src={d.user.profilePicture}
													alt="OOHIQ"
													width={50}
													height={50}
													className="w-[50px] h-[50px] rounded-full object-cover object-top"
												/>
												<span className="font-medium text-2xl text-secondary">
													{d.user.fullName}
												</span>
											</div>
										</td>
										<td>
											<div className="p-5 w-[170px]">
												<span className="line-clamp-2 font-medium text-2xl text-secondary">
													{d.location}
												</span>
											</div>
										</td>
										<td>
											<div className="p-5">
												<span className="font-medium text-2xl text-secondary">
													{d.billboardType.name}
												</span>
											</div>
										</td>
										<td>
											<div className="p-5">
												<AppButton
													className={`${
														d.status === "approved"
															? "!bg-[#1AED0830] border-[#096102] !text-[#096102]"
															: ""
													} ${
														d.status === "pending"
															? "!bg-[#ed8e0830] border-[#613d02] !text-[#613d02]"
															: ""
													} ${
														d.status === "disapproved"
															? "!bg-[#FF5E5E30] border-[#FF5E5E] !text-[#FF5E5E]"
															: ""
													} !w-[108px]   border`}
													label={d.status}
												/>
											</div>
										</td>
										<td>
											<div className="p-5 w-[170px]">
												<div className="p-5">
													<span className="line-clamp-2 font-medium text-2xl text-secondary">
														{new Date(d.createdAt).toLocaleDateString("en-US", {
															month: "short",
															day: "2-digit",
															year: "numeric",
														})}
													</span>
												</div>
											</div>
										</td>
										<td>
											<div className="p-5">
												<AppButton
													fullyRounded
													className="!bg-[#3DF3A92B] !w-[108px] !text-secondary border-primary border"
													label="View"
												/>
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
