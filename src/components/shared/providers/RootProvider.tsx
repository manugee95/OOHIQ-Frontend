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

export interface Country {
	id: number;
	name: string;
}

interface RootStore {
	alert: Alert;
	setAlert(alert: Alert): void;
	userDetails: User | null;
	setUserDetails: (val: User) => void;
	countries: Country[];
	setCountries: (val: Country[]) => void;
	currentCountry: Country | null;
	setCurrentCountry: (val: Country) => void;
}

const RootContext = createContext<StoreApi<RootStore> | null>(null);
const queryClient = new QueryClient();

const createRootStore = (user: User | null, countries: Country[]) =>
	createStore<RootStore>()((set) => ({
		alert: {
			show: false,
			message: "A initial message",
			type: "success",
		},
		countries,
		currentCountry: null,
		setCurrentCountry: (val) =>
			set((state) => ({ ...state, currentCountry: val })),
		userDetails: user,
		setCountries: (val) => set((state) => ({ ...state, countries: val })),
		setAlert: (val) => set((state) => ({ ...state, alert: val })),
		setUserDetails: (val) => set((state) => ({ ...state, userDetails: val })),
	}));

const RootProvider = ({
	children,
	user = null,
	countries = [],
}: PropsWithChildren & { user?: User | null; countries: Country[] }) => {
	const rootStoreRef = useRef<StoreApi<RootStore> | null>(null);
	rootStoreRef.current = createRootStore(user, countries);

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
