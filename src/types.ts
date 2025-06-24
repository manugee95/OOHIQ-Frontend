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
	approvedAudits: number;
	[key: string]: string | number | any;
}

export type UserLevel =
	| "Rookie"
	| "Challenger"
	| "Contender"
	| "Professional"
	| "Ultimate";

interface GeolocationPoint {
	latitude: string;
	longitude: string;
}

interface BillboardType {
	name: string;
}

interface Advertiser {
	name: string;
}

interface Industry {
	name: string;
}

interface Category {
	name: string;
}

interface BoardCondition {
	name: string;
}

interface PosterCondition {
	name: string;
}

interface TrafficSpeed {
	name: string;
}

interface EvaluationTime {
	name: string;
}

interface BillboardEvaluation {
	id: number;
	auditId: number;
	boardNo: string | null;
	contractorName: string;
	phone: string;
	uploadedBy: number;

	ltsScore: number;
	siteScore: number;
	siteGrade: string;

	boardLevelId: number;
	boardLevel: { name: string };

	boardPositioningId: number;
	boardPositioning: { name: string };

	distanceOfVisibilityId: number;
	distanceOfVisibility: { name: string };

	noOfBoardsInViewId: number;
	noOfBoardsInView: { name: string };

	noOfCompetitiveBoardsId: number;
	noOfCompetitiveBoards: { name: string };

	noOfLargerBoardsId: number;
	noOfLargerBoards: { name: string };

	pedestrianTrafficId: number;
	pedestrianTraffic: { name: string };

	vehicularTrafficId: number;
	vehicularTraffic: { name: string };

	roadTypeId: number;
	roadType: { name: string };

	specialFeaturesId: number;
	specialFeatures: { name: string };

	visibilityPointsId: number;
	visibilityPoints: { name: string };

	createdAt: string;
	updatedAt: string;
}

interface ObjectCounts {
	[key: string]: number;
}

export interface Audit {
	id: number;
	userId: number;
	boardCode: string;
	billboardTypeId: number;
	location: string;
	state: string;
	town: string;
	country: string;
	geolocation: GeolocationPoint[];
	advertiserId: number;
	industryId: number;
	categoryId: number;
	brand: string;
	brandIdentifier: string;
	boardConditionId: number;
	posterConditionId: number;
	trafficSpeedId: number;
	evaluationTimeId: number;
	closeShotUrl: string;
	longShotUrl: string;
	videoUrl: string;
	status: string;
	objectCounts: ObjectCounts;
	impressionScore: number;
	sovScore: number;
	createdAt: string;
	updatedAt: string;
	user: User;
	billboardType: BillboardType;
	advertiser: Advertiser;
	industry: Industry;
	category: Category;
	boardCondition: BoardCondition;
	posterCondition: PosterCondition;
	trafficSpeed: TrafficSpeed;
	evaluationTime: EvaluationTime;
	billboardEvaluation: BillboardEvaluation;
}

export interface Reaudit {
	id: number;
	reauditId: number;
	userId: number;
	auditId: number;
	data: {
		brand: string;
		videoUrl: string;
		categoryId: number;
		categoryName: string;
		industryId: number;
		industryName: string;
		longShotUrl: string;
		advertiserId: number;
		advertiserName: string;
		closeShotUrl: string;
		objectCounts: Record<string, number>;
		trafficSpeedId: number;
		trafficSpeedName: string;
		brandIdentifier: string;
		impressionScore: number;
		boardConditionId: number;
		boardConditionName: string;
		evaluationTimeId: number;
		evaluationTimeName: string;
		posterConditionId: number;
		posterConditionName: string;
		billboardType: BillboardType;
		billboardTypeName: string;
		advertiser: Advertiser;
		industry: Industry;
		category: Category;
		boardCondition: BoardCondition;
		posterCondition: PosterCondition;
		trafficSpeed: TrafficSpeed;
		evaluationTime: EvaluationTime;
	};
	createdAt: Date;
	status: string;
	audit: Audit;
	user: User;
}
