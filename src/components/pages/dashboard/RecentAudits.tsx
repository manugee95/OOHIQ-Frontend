"use client";
import AppButton from "@/components/shared/AppButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RecentAudits() {
	return (
		<div className="overflow-hidden w-full min-h-[70vh] rounded-2xl bg-white mt-8 flex flex-col">
			<div className="flex items-center justify-between p-8">
				<span className="text-[2rem] font-semibold text-textBlack">
					Recent Audits
				</span>
				<Link
					href={"/audits"}
					className="text-2xl font-medium text-textBlack underline">
					View all
				</Link>
			</div>
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
						<tr className="border-b border-b-[#B7B7B7]">
							<td>
								<div className="flex items-center gap-5 p-5">
									<Image
										src={
											"https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										}
										alt="OOHIQ"
										width={50}
										height={50}
										className="w-[50px] h-[50px] rounded-full object-cover object-top"
									/>
									<span className="font-medium text-2xl text-secondary">
										Raphael Ajayi
									</span>
								</div>
							</td>
							<td>
								<div className="p-5 w-[170px]">
									<span className="line-clamp-2 font-medium text-2xl text-secondary">
										24, Hamington Way, Isolo, Lagos State.
									</span>
								</div>
							</td>
							<td>
								<div className="p-5">
									<span className="font-medium text-2xl text-secondary">
										LED
									</span>
								</div>
							</td>
							<td>
								<div className="p-5">
									<AppButton
										className="!bg-[#1AED0830] !w-[108px] !text-[#096102] border-[#096102] border"
										label="Passed"
									/>
								</div>
							</td>
							<td>
								<div className="p-5 w-[170px]">
									<div className="p-5">
										<span className="line-clamp-2 font-medium text-2xl text-secondary">
											27 Jan, 2024
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
					</tbody>
				</table>
			</div>
		</div>
	);
}
