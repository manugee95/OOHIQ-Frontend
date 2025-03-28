"use server";
import { cookies } from "next/headers";

export const setAccessToken = async (token: string) => {
	const cookieStore = await cookies();
	cookieStore.set("hiqtk", token);
};

export const getAccessToken = async () => {
	const cookieStore = await cookies();
	const access = cookieStore.get("hiqtk");

	return access?.value;
};
