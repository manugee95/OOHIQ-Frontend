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

export interface Audit {
	advertiserId: number;
	billboardType: { name: string };
	billboardTypeId: number;
	brand: string;
	brandIdentifier: string;
	categoryId: number;
	closeShotUrl: string;
	createdAt: Date;
	id: number;
	industryId: number;
	location: string;
	longShotUrl: string;
	status: string;
	updatedAt: Date;
	user: User;
	userId: number;
	videoUrl: string;
}
