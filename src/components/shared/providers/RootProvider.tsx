"use client";
import { createContext, useContext, useRef, PropsWithChildren } from "react";
import { createStore, StoreApi } from "zustand/vanilla";
import { useStore } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Alert from "../Alert";
import { User } from "@/types";

export interface Alert {
	show?: boolean;
	message: string;
	type: "error" | "success";
}

interface RootStore {
	alert: Alert;
	setAlert(alert: Alert): void;
	userDetails: User | null;
	setUserDetails: (val: User) => void;
}

const RootContext = createContext<StoreApi<RootStore> | null>(null);
const queryClient = new QueryClient();

const createRootStore = (user: User | null) =>
	createStore<RootStore>()((set) => ({
		alert: {
			show: false,
			message: "A initial message",
			type: "success",
		},
		userDetails: user,
		setAlert: (val) => set((state) => ({ ...state, alert: val })),
		setUserDetails: (val) => set((state) => ({ ...state, userDetails: val })),
	}));

const RootProvider = ({
	children,
	user = null,
}: PropsWithChildren & { user?: User | null }) => {
	const rootStoreRef = useRef<StoreApi<RootStore> | null>(null);
	rootStoreRef.current = createRootStore(user);

	return (
		<QueryClientProvider client={queryClient}>
			<RootContext.Provider value={rootStoreRef.current}>
				<Alert />
				{children}
			</RootContext.Provider>
		</QueryClientProvider>
	);
};

export const useRootStore = () => {
	const ctxStore = useContext(RootContext);

	return useStore(ctxStore!, (state) => state);
};

export default RootProvider;
