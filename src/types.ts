export interface User {
	email: string;
	fullName: string;
	id: number;
	profilePicture: string;
	role: "ADMIN";
	level: UserLevel;
	auditCount: number;
	task: number;
	walletBalance: number;
	[key: string]: string | number | any;
}

export type UserLevel =
	| "Rookie"
	| "Challenger"
	| "Contender"
	| "Professional"
	| "Ultimate";