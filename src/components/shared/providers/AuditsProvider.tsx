"use client";
import { createContext, useContext, useRef, PropsWithChildren } from "react";
import { createStore, StoreApi } from "zustand/vanilla";
import { useStore } from "zustand";
import { Audit, Reaudit } from "@/types";

interface AuditsStore {
	currentAudit: Audit | null;
	setCurrentAudit: (val: Audit | null) => void;
	currentReaudit: Reaudit | null;
	setCurrentReaudit: (val: Reaudit | null) => void;
}

const AuditsContext = createContext<StoreApi<AuditsStore> | null>(null);

const createAuditsStore = (
	currentAudit: Audit | null,
	currentReaudit: Reaudit | null
) =>
	createStore<AuditsStore>()((set) => ({
		currentAudit: currentAudit,
		setCurrentAudit: (val) => set((state) => ({ ...state, currentAudit: val })),
		currentReaudit: currentReaudit,
		setCurrentReaudit: (val) =>
			set((state) => ({ ...state, currentReaudit: val })),
	}));

const AuditsProvider = ({
	children,
	currentAudit = null,
	currentReaudit = null,
}: PropsWithChildren & {
	currentAudit?: Audit | null;
	currentReaudit?: Reaudit | null;
}) => {
	const AuditsStoreRef = useRef<StoreApi<AuditsStore> | null>(null);
	AuditsStoreRef.current = createAuditsStore(currentAudit, currentReaudit);

	return (
		<AuditsContext.Provider value={AuditsStoreRef.current}>
			{children}
		</AuditsContext.Provider>
	);
};

export const useAuditsStore = () => {
	const ctxStore = useContext(AuditsContext);

	return useStore(ctxStore!, (state) => state);
};

export default AuditsProvider;
