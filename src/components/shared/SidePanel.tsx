"use client";
import React from "react";
import Image from "next/image";
import LogoText from "./icons/LogoText";
import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import { usePathname } from "next/navigation";
import AccountManagerIcon from "./icons/AccountManagerIcon";
import AdvertisersIcon from "./icons/AdvertisersIcon";
import LocationIcon from "./icons/LocationIcon";
import { useRootStore } from "./providers/RootProvider";
import AuditsIcon from "./icons/AuditsIcon";
import WithdrawalIcon from "./icons/WithdrawalIcon";

export default function SidePanel() {
	return (
		<aside className="shrink-0 w-[300px] bg-white h-screen sticky top-0 py-10 px-8 hidden lg:block overflow-auto">
			<SidePanelContent />
		</aside>
	);
}

export const SidePanelContent = function ({ cb }: { cb?: () => void }) {
	const pathname = usePathname();
	const { userDetails } = useRootStore();

	const isDashboard = pathname === "/";
	const isAudits = pathname.startsWith("/audits");
	const isWithdrawals = pathname.startsWith("/withdrawals");
	const isAuditors = pathname.startsWith("/auditors");
	const isLocations = pathname.startsWith("/locations");

	const role = userDetails?.role;

	if (!role) {
		return;
	}

	return (
		<>
			<div className="flex items-center gap-x-5 mb-12">
				<Image
					src={"/oohiq-logo.png"}
					width={70}
					height={70}
					alt="oohiq-logo"
				/>
			</div>
			<div className="flex flex-col xl:mt-20 gap-y-2 xl:gap-y-8">
				<Link
					onClick={() => {
						if (cb) {
							cb();
						}
					}}
					href={"/"}
					className={`flex items-center gap-5 h-[40px] rounded-lg px-5 ${
						isDashboard ? "bg-primary" : "bg-transparent"
					}`}>
					<DashboardIcon fill={isDashboard ? "#00100a" : "#6D706F"} />
					<span
						className={`${
							isDashboard ? "text-secondary" : "text-[#6D706F]"
						} text-2xl xl:text-3xl font-medium`}>
						Dashboard
					</span>
				</Link>
				<Link
					onClick={() => {
						if (cb) {
							cb();
						}
					}}
					href={"/audits"}
					className={`flex items-center gap-5 h-[40px] rounded-lg px-5 ${
						isAudits ? "bg-primary" : "bg-transparent"
					}`}>
					<AuditsIcon fill={isAudits ? "#00100a" : "#6D706F"} />
					<span
						className={`${
							isAudits ? "text-secondary" : "text-[#6D706F]"
						} text-2xl xl:text-3xl font-medium`}>
						Audits
					</span>
				</Link>
				<Link
					onClick={() => {
						if (cb) {
							cb();
						}
					}}
					href={"/audits"}
					className={`flex items-center gap-5 h-[40px] rounded-lg px-5 ${
						isWithdrawals ? "bg-primary" : "bg-transparent"
					}`}>
					<WithdrawalIcon fill={isWithdrawals ? "#00100a" : "#6D706F"} />
					<span
						className={`${
							isWithdrawals ? "text-secondary" : "text-[#6D706F]"
						} text-2xl xl:text-3xl font-medium`}>
						Withdrawals
					</span>
				</Link>
				<Link
					onClick={() => {
						if (cb) {
							cb();
						}
					}}
					href={"/auditors"}
					className={`flex items-center gap-5 h-[40px] rounded-lg px-5 ${
						isAuditors ? "bg-primary" : "bg-transparent"
					}`}>
					<AdvertisersIcon fill={isAuditors ? "#00100a" : "#6D706F"} />
					<span
						className={`${
							isAuditors ? "text-secondary" : "text-[#6D706F]"
						} text-2xl xl:text-3xl font-medium`}>
						Field Auditors
					</span>
				</Link>
				<Link
					onClick={() => {
						if (cb) {
							cb();
						}
					}}
					href={"/locations"}
					className={`flex items-center gap-5 h-[40px] rounded-lg px-5 ${
						isLocations ? "bg-primary" : "bg-transparent"
					}`}>
					<LocationIcon fill={isLocations ? "#00100a" : "#6D706F"} />
					<span
						className={`${
							isLocations ? "text-secondary" : "text-[#6D706F]"
						} text-2xl xl:text-3xl font-medium`}>
						Locations
					</span>
				</Link>
			</div>
		</>
	);
};
