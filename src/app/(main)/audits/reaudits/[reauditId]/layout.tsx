import AuditsProvider from "@/components/shared/providers/AuditsProvider";
import { Audit, Reaudit } from "@/types";
import { ApiInstance } from "@/utils";
import React, { PropsWithChildren } from "react";

export default async function layout({
	params,
	children,
}: {
	params: Promise<{ reauditId: string }>;
} & PropsWithChildren) {
	const { reauditId } = await params;

	let audit: Audit | null = null;

	console.log(reauditId);

	try {
		const res = await ApiInstance.get(`/api/view-reaudit/${reauditId}`);
		audit = res.data.audit;
	} catch (error) {
		audit = null;
		console.log(error);
	}

	console.log(audit, "jk");

	return <AuditsProvider currentReaudit={audit}>{children}</AuditsProvider>;
}
