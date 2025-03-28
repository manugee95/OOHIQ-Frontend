import { NextResponse, NextRequest } from "next/server";
import { ApiInstance } from "./utils";
import { getAccessToken } from "./actions/cookie";

export async function middleware(request: NextRequest) {
	const response = NextResponse;
	const pathname = request.nextUrl.pathname;
	const authRoutes = ["/login"];
	const isAuthRoute = authRoutes.includes(pathname);
	const accessToken = await getAccessToken();

	try {
		if (!accessToken) {
			throw new Error("Unauthenticated");
		}

		const res = await ApiInstance.get("/user/detail");

		if (isAuthRoute) {
			return response.redirect(new URL("/", request.url));
		}
	} catch (error) {
		if (isAuthRoute) {
			return response.next();
		} else {
			return response.redirect(new URL("/login", request.url));
		}
	}

	return response.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|login-illustration.svg|oohiq-logo.png|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
