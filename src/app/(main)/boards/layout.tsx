import AuditsProvider from "@/components/shared/providers/AuditsProvider";
import { Audit, Reaudit } from "@/types";
import { ApiInstance } from "@/utils";
import React, { PropsWithChildren } from "react";

export default async function layout({ children }: {} & PropsWithChildren) {
	return <AuditsProvider>{children}</AuditsProvider>;
}
