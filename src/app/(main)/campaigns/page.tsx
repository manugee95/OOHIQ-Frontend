import ClientsList from "@/components/pages/manage-users/clients/ClientsList";
import React from "react";

export default function page() {
	return (
		<section className="w-full px-[15px] pb-[20px]">
			<ClientsList forCampaigns />
		</section>
	);
}
