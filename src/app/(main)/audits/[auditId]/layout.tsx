import AuditsProvider from "@/components/shared/providers/AuditsProvider";
import { Audit } from "@/types";
import { ApiInstance } from "@/utils";
import React, { PropsWithChildren } from "react";

export default async function layout({
	params,
	children,
}: {
	params: Promise<{ auditId: string }>;
} & PropsWithChildren) {
	const { auditId } = await params;

	let audit: Audit | null = null;

	console.log(auditId);

	try {
		const res = await ApiInstance.get(`/audits/${auditId}`);
		audit = res.data.audit;
	} catch (error) {
		audit = null;
		console.log(error);
	}

	console.log(audit, "jk");

	return <AuditsProvider currentAudit={audit}>{children}</AuditsProvider>;
}
