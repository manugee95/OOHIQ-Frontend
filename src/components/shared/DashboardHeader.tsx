"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRootStore } from "./providers/RootProvider";
import Dropdown from "./Dropdown";
import LogoutIcon from "./icons/LogoutIcon";
import UserIcon from "./icons/UserIcon";
import Image from "next/image";
import useAlert from "@/hooks/useAlert";
import AppLoader from "./AppLoader";
import { ApiInstance } from "@/utils";
import { AxiosError } from "axios";

export default function DashboardHeader() {
	const pathname = usePathname();
	const { userDetails, setUserDetails } = useRootStore();
	const [isUploading, setIsUploading] = useState(false);
	const { showAndHideAlert } = useAlert();
	const [file, setFile] = useState<File | null>();

	const isDashboard = pathname === "/";
	const isAudits = pathname.startsWith("/audits");
	const isWithdrawals = pathname.startsWith("/withdrawals");
	const isAuditors = pathname.startsWith("/auditors");
	const isLocations = pathname.startsWith("/locations");

	async function profileUploadHandler() {
		try {
			if (!file) {
				return;
			}

			setIsUploading(true);

			const data = new FormData();

			if (userDetails) {
				Object.keys(userDetails).forEach((k) => {
					if (k !== "profilePicture" && k !== "id") {
						// @ts-ignore
						data.append(k, userDetails[k]);
					}
				});
			}

			data.append(
				"profilePicture",
				new Blob([file], { type: file?.type }),
				file?.name
			);

			const res = await ApiInstance.put("/user/" + userDetails?.id, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setUserDetails({ ...userDetails, ...res.data });

			console.log(res.data);
			showAndHideAlert({ message: "Profile Picture Updated", type: "success" });
			setIsUploading(false);
			setFile(null);
		} catch (error) {
			const err = error as AxiosError<any>;

			showAndHideAlert({
				message:
					err?.response?.data?.error ??
					err?.response?.data?.message ??
					"An error occurred! Try again or check internet connection",
				type: "error",
			});

			setIsUploading(false);
			setFile(null);
		}
	}

	useEffect(() => {
		if (file) {
			profileUploadHandler();
		}
	}, [file]);

	return (
		<header className="h-[100px] w-full flex items-center justify-between px-[15px]">
			<h1 className="font-bold text-[3.6rem]">{isDashboard && "Dashboard"}</h1>
			<h1 className="font-bold text-[3.6rem]">{isAudits && "Audits"}</h1>
			<h1 className="font-bold text-[3.6rem]">
				{isAuditors && "Field Auditors"}
			</h1>
			<h1 className="font-bold text-[3.6rem]">
				{isWithdrawals && "Withdrawals"}
			</h1>
			<h1 className="font-bold text-[3.6rem]">{isLocations && "Locations"}</h1>
			<Dropdown
				renderButton={({ setOpen, open }) => (
					<button className="h-[50px]" onClick={() => setOpen(!open)}>
						{userDetails?.profilePicture && !isUploading && (
							<Image
								className="w-[50px] h-[50px] rounded-full object-cover"
								width={50}
								height={50}
								alt="poster-track"
								src={userDetails?.profilePicture}
								priority
							/>
						)}

						{!userDetails?.profilePicture && !isUploading && (
							<Image
								className="w-[50px] h-[50px] rounded-full object-cover"
								width={50}
								height={50}
								alt="poster-track"
								src="/no-avatar.svg"
								priority
							/>
						)}

						{isUploading && (
							<div className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center">
								<AppLoader size={34} />
							</div>
						)}
					</button>
				)}
				items={[
					{
						title: "Update Profile Pic",
						onClick: () => {},
						classname:
							"py-5 font-medium text-2xl text-left flex items-center gap-7",
						icon: <UserIcon />,
					},
					{
						title: "Logout",
						onClick: () => {},
						classname:
							"py-5 font-medium text-red-400 text-2xl text-left flex items-center gap-7",
						icon: <LogoutIcon />,
					},
				]}
				renderItem={({ item, index }) =>
					item.title === "Update Profile Pic" ? (
						<label className="cursor-pointer" key={index} htmlFor="profile-pic">
							<input
								type="file"
								className="absolute w-0 h-0 opacity-0 invisible"
								id="profile-pic"
								onChange={(e) => {
									const files = e.target.files;
									if (files) {
										setFile(files[0]);
									}

									e.target.value = "";
								}}
								multiple={false}
							/>
							<div key={index} className={item.classname}>
								{item.icon}
								{item.title}
							</div>
						</label>
					) : (
						<button
							onClick={item.onClick}
							key={index}
							className={item.classname}>
							{item.icon}
							{item.title}
						</button>
					)
				}
				top={80}
				right={0}
				dropdownWidth="200px"
			/>
		</header>
	);
}
