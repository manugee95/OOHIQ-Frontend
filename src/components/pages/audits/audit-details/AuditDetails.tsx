"use client";
import React, { useState } from "react";
import { useAuditsStore } from "@/components/shared/providers/AuditsProvider";
import Image from "next/image";
import AppButton from "@/components/shared/AppButton";
import useAlert from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { ApiInstance } from "@/utils";

export default function AuditDetails() {
	const { currentAudit, setCurrentAudit } = useAuditsStore();
	const { showAndHideAlert } = useAlert();
	const [isApproving, setIsApproving] = useState(false);
	const [isDisApproving, setIsDisApproving] = useState(false);

	async function updateAuditStatus(status: "APPROVED" | "DISAPPROVED") {
		try {
			if (status === "APPROVED") {
				setIsApproving(true);
			} else {
				setIsDisApproving(true);
			}

			const res = await ApiInstance.put(`/audit/status/${currentAudit?.id}`, {
				status,
			});

			if (status === "APPROVED") {
				setIsApproving(false);
			} else {
				setIsDisApproving(false);
			}

			showAndHideAlert({
				message: res.data.message,
				type: "success",
			});

			if (currentAudit) {
				setCurrentAudit({ ...currentAudit, status: res.data.status });
			}
		} catch (error) {
			const err = error as AxiosError<any>;

			showAndHideAlert({
				message:
					err?.response?.data?.error ??
					err?.response?.data?.message ??
					"An error occurred! Try again or check internet connection",
				type: "error",
			});

			if (status === "APPROVED") {
				setIsApproving(false);
			} else {
				setIsDisApproving(false);
			}
		}
	}

	const objectCounts = Object.keys(currentAudit?.objectCounts ?? {}).filter(
		(k, i) => {
			const isTargetWord =
				k.includes("car") ||
				k.includes("person") ||
				k.includes("truck") ||
				k.includes("motorcycle") ||
				k.includes("bus");

			return isTargetWord;
		}
	);

	return (
		<>
			<div className="flex items-center justify-between mb-12">
				<h1 className="text-[25px] font-semibold">{currentAudit?.boardCode}</h1>
				<div className="flex items-center gap-2">
					{["disapproved", "pending"].includes(
						currentAudit?.status.toLocaleLowerCase() ?? ""
					) && (
						<AppButton
							onClick={() => {
								updateAuditStatus("APPROVED");
							}}
							disabled={isApproving}
							showLoading={isApproving}
							label="Approve"
							className="!text-secondary px-[20px] !disabled:opacity-50"
						/>
					)}
					{["approved", "pending"].includes(
						currentAudit?.status.toLocaleLowerCase() ?? ""
					) && (
						<AppButton
							onClick={() => {
								updateAuditStatus("DISAPPROVED");
							}}
							showLoading={isDisApproving}
							label="Disapprove"
							className="!bg-[#FF5E5E] px-[20px]"
						/>
					)}
				</div>
			</div>
			<div className="w-full flex justify-between">
				<div className="w-[65%] flex flex-col gap-y-5">
					<div className="w-full bg-white p-8  flex flex-col rounded-2xl">
						<div className="pb-12">
							<h4 className="text-3xl font-semibold">Recorded Video</h4>
						</div>
						<div className="w-full h-[500px]">
							<video
								className="w-full h-full"
								controls
								muted
								src={currentAudit?.videoUrl}></video>
						</div>
					</div>
					<div className="w-full bg-white p-8  flex flex-col rounded-2xl">
						<div className="pb-12">
							<h4 className="text-3xl font-semibold">Close Shot</h4>
						</div>
						<div className="w-full h-[500px]">
							{currentAudit?.closeShotUrl && (
								<Image
									className="w-full h-full object-scale-down"
									width={500}
									height={500}
									alt="OOHIQ"
									overrideSrc={currentAudit?.closeShotUrl}
									src={""}
								/>
							)}
						</div>
					</div>
					<div className="w-full bg-white p-8  flex flex-col rounded-2xl">
						<div className="pb-12">
							<h4 className="text-3xl font-semibold">Long Shot</h4>
						</div>
						<div className="w-full h-[500px]">
							{currentAudit?.longShotUrl && (
								<Image
									className="w-full h-full object-scale-down"
									width={500}
									height={500}
									alt="OOHIQ"
									overrideSrc={currentAudit.longShotUrl}
									src={""}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="w-[34%] flex flex-col gap-y-5">
					<div className="p-5 bg-white rounded-2xl flex items-center gap-2">
						<Image
							className="w-[50px] h-[50px] rounded-full object-cover"
							width={50}
							height={50}
							alt="poster-track"
							src={currentAudit?.user.profilePicture ?? "/no-avatar.svg"}
							priority
						/>
						<span className="text-2xl font-medium">
							{currentAudit?.user.fullName}
						</span>
					</div>
					<div className=" bg-white rounded-2xl flex flex-col">
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Location</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.location}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">State</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.state}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Town</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.town}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Country</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.country}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Billboard Type</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardType.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Status</span>
							<AppButton
								className={`${
									currentAudit?.status.toLocaleLowerCase() === "approved"
										? "!bg-[#1AED0830] border-[#096102] !text-[#096102]"
										: ""
								} ${
									currentAudit?.status.toLocaleLowerCase() === "pending"
										? "!bg-[#ed8e0830] border-[#613d02] !text-[#613d02]"
										: ""
								} ${
									currentAudit?.status.toLocaleLowerCase() === "disapproved"
										? "!bg-[#FF5E5E30] border-[#FF5E5E] !text-[#FF5E5E]"
										: ""
								} !w-[108px]  border`}
								label={currentAudit?.status}
							/>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2">
							<span className="text-3xl font-medium">Date Uploaded</span>
							<span className="text-2xl text-[#6D706F]">
								{new Date(currentAudit?.createdAt ?? "").toLocaleString(
									"en-US",
									{
										month: "short",
										day: "numeric",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									}
								)}
							</span>
						</div>
					</div>
					<div className=" bg-white rounded-2xl flex flex-col">
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Industry</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.industry?.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Advertiser</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.advertiser?.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Brand</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.brand}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Board Condition</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.boardCondition.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Poster Condition</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.posterCondition.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Traffic Speed</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.trafficSpeed.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Evaluation Time</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.evaluationTime.name}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Impression Score</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.impressionScore}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 ">
							<span className="text-3xl font-medium">SOV Score</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.sovScore ?? "N/A"}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 ">
							<span className="text-3xl font-medium">LTS Score</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.ltsScore ?? "N/A"}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 ">
							<span className="text-3xl font-medium">Site Score</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.siteScore ?? "N/A"}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 ">
							<span className="text-3xl font-medium">Site Grade</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.siteGrade ?? "N/A"}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Board Level</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.siteGrade ?? "N/A"}
							</span>
						</div>
						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Board Positioning</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.boardPositioning?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">
								Distance of Visibility
							</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.distanceOfVisibility
									?.name ?? "N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">
								No. of Boards in View
							</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.noOfBoardsInView?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">
								No. of Competitive Boards
							</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.noOfCompetitiveBoards
									?.name ?? "N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">No. of Larger Boards</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.noOfLargerBoards?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Pedestrian Traffic</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.pedestrianTraffic?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Vehicular Traffic</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.vehicularTraffic?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Road Type</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.roadType?.name ?? "N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Special Features</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.specialFeatures?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Visibility Points</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.visibilityPoints?.name ??
									"N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2 border-b border-b-[#E3E3E3]">
							<span className="text-3xl font-medium">Contractor Name</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.contractorName ?? "N/A"}
							</span>
						</div>

						<div className="px-5 py-6 flex flex-col gap-2">
							<span className="text-3xl font-medium">Phone</span>
							<span className="text-2xl text-[#6D706F]">
								{currentAudit?.billboardEvaluation?.phone ?? "N/A"}
							</span>
						</div>
					</div>
					<div className=" bg-white rounded-2xl flex flex-col">
						<div className="px-5 py-6 flex flex-col gap-2">
							<span className="text-3xl font-medium">Object Counts</span>
							<div className="flex flex-col mt-5">
								{objectCounts.length > 0 &&
									objectCounts.map((k, i) => {
										return (
											<div
												key={i}
												className="flex items-center justify-between py-5 border-b border-b-[#E3E3E3] last:border-b-0">
												<span className="text-2xl font-medium">{k}</span>
												<span className="text-2xl text-[#6D706F] font-medium">
													{currentAudit?.objectCounts[k]}
												</span>
											</div>
										);
									})}

								{objectCounts.length === 0 && (
									<span className="text-2xl text-[#6D706F] font-medium">
										No Match Found!
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
