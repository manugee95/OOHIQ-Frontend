"use client";
import AppButton from "@/components/shared/AppButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/utils";
import { Audit, User } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { useRootStore } from "@/components/shared/providers/RootProvider";
import Kebab from "@/components/shared/icons/Kebab";
import Modal from "@/components/shared/Modal";
import CreateMediaOwnerForm from "./CreateMediaOwnerForm";
// import CreateClientForm from "./CreateClientForm";

export const levels: { [key: string]: string } = {
	Rookie: "/Rookie.svg",
	Challenger: "/Challenger.svg",
	Professional: "/Professional.svg",
	Ultimate: "/Ultimate.svg",
	Contender: "/Contender.svg",
};

export default function MediaOwnersList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { currentCountry } = useRootStore();
	const [create, setCreate] = useState(false);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ["pending-audits", currentPage, currentCountry],
		queryFn: async function () {
			const response = await ApiInstance.get(
				`/user/media_owners?page=${currentPage}&country=${currentCountry?.name}`
			);
			return response.data;
		},
		retry: false,
		gcTime: 0,
		refetchOnWindowFocus: false,
	});

	return (
		<div className="overflow-hidden w-full min-h-[70vh] rounded-2xl bg-white mt-8 flex flex-col">
			<Modal
				showModal={create}
				hideModal={() => {
					setCreate(false);
				}}>
				<CreateMediaOwnerForm
					callback={() => {
						setCreate(false);
						refetch();
					}}
				/>
			</Modal>
			<div className="flex items-center justify-between p-8">
				<span className="text-[3rem] font-bold text-textBlack">
					Media Owners
				</span>
				<AppButton
					onClick={() => {
						setCreate(true);
					}}
					className="!w-max !px-[10px] !text-secondary">
					<span>Add Media Owner</span>
				</AppButton>
			</div>
			<div className="w-full grow overflow-auto">
				<table className="w-full">
					<thead className="border-b border-t border-[#C7C7C7] border-t-[#C7C7C7] bg-[#F7F7F7]">
						<tr>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Media Owners
								</span>
							</th>
							<th>
								<span className="text-2xl font-semibold text-[#B0B0B0] p-5 flex">
									Email
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
								</tr>
							))}
						{!isLoading &&
							!isFetching &&
							data &&
							data.mediaOwners &&
							data.mediaOwners.map((d: User, i: number) => (
								<tr key={i} className="border-b border-b-[#B7B7B7]">
									<td>
										<div className="flex items-center gap-5 p-5">
											<Image
												width={50}
												height={50}
												src={d.profilePicture}
												alt="OOHIQ"
												className="rounded-full"
											/>
											<span className="font-medium text-2xl text-secondary">
												{d.fullName}
											</span>
										</div>
									</td>
									<td>
										<div className="p-5">
											<span className="font-medium text-2xl text-secondary">
												{d.email}
											</span>
										</div>
									</td>
									<td>
										<div className="p-5">
											<AppButton
												fullyRounded
												className="!bg-[#3DF3A92B] !w-[108px] !text-secondary border-primary border">
												<Kebab />
											</AppButton>
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
