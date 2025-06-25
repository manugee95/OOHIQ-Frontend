import AdvertisersIcon from "@/components/shared/icons/AdvertisersIcon";
import React from "react";
import Link from "next/link";

export default function ManageUsers() {
	return (
		<div className="grid grid-cols-3 gap-5">
			<Link
				className="hover:drop-shadow-xl"
				href={"/manage-users/field-auditors"}>
				<div className="w-full h-[200px] rounded-2xl bg-white flex items-center justify-center gap-5 flex-col">
					<AdvertisersIcon fill={"#00100a"} />
					<span className="text-3xl font-medium text-secondary">
						Field Auditors
					</span>
				</div>
			</Link>
			<Link className="hover:drop-shadow-xl" href={"/manage-users/clients"}>
				<div className="w-full h-[200px] rounded-2xl bg-white flex items-center justify-center gap-5 flex-col">
					<AdvertisersIcon fill={"#00100a"} />
					<span className="text-3xl font-medium text-secondary">Clients</span>
				</div>
			</Link>
			<Link
				className="hover:drop-shadow-xl"
				href={"/manage-users/media-owners"}>
				<div className="w-full h-[200px] rounded-2xl bg-white flex items-center justify-center gap-5 flex-col">
					<AdvertisersIcon fill={"#00100a"} />
					<span className="text-3xl font-medium text-secondary">
						Media Owners
					</span>
				</div>
			</Link>
		</div>
	);
}
