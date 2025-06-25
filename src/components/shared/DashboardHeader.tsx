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
import AppButton from "./AppButton";
import ChevronIcon from "./icons/ChevronIcon";

export default function DashboardHeader() {
	const pathname = usePathname();
	const {
		userDetails,
		setUserDetails,
		countries,
		setCurrentCountry,
		currentCountry,
	} = useRootStore();
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

			const res = await ApiInstance.put("/api/user", data, {
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

	useEffect(() => {
		if (currentCountry === null) {
			const country = countries.find((c) => c.name === "Nigeria");
			if (country) {
				setCurrentCountry(country);
			}
		}
	}, []);

	console.log(userDetails);

	return (
		<header className="h-[100px] w-full flex items-center justify-between px-[15px] bg-white sticky top-0 mb-10 border-b border-b-[#c5c5c5] z-[50]">
			<h1 className="font-bold text-[3.6rem]">
				{isDashboard && "Dashboard"}
				{isAudits && "Audits"}
				{isAuditors && "Field Auditors"}
				{isWithdrawals && "Withdrawals"}
				{isLocations && "Boards"}
			</h1>
			<div className="flex items-center gap-12">
				<Dropdown
					renderButton={({ setOpen, open }) => (
						<AppButton
							onClick={() => setOpen(!open)}
							className="!bg-transparent border border-[#787878] px-[5px] md:px-[10px] !text-secondary gap-2 md:gap-5">
							<span className="text-xl md:text-2xl">
								{currentCountry?.name}
							</span>
							<ChevronIcon fill="#787878" />
						</AppButton>
					)}
					items={countries}
					renderItem={({ item, setOpen }) => (
						<button
							onClick={() => {
								setCurrentCountry(item);
								setOpen(false);
							}}
							key={item.name}
							className="cursor-pointer py-4 px-3 border-b border-b-[#787878] last:border-b-0">
							<span className="text-2xl font-medium">{item.name}</span>
						</button>
					)}
					dropdownWidth="250px"
					right={0}
				/>
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
									<AppLoader.Secondary />
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
							<label
								className="cursor-pointer"
								key={index}
								htmlFor="profile-pic">
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
			</div>
		</header>
	);
}
