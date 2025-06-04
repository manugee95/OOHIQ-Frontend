"use client";
import React, { PropsWithChildren } from "react";
import AppLoader from "./AppLoader";
import { motion, HTMLMotionProps } from "framer-motion";

interface AppButtonProps extends HTMLMotionProps<"button"> {
	label?: string;
	showLoading?: boolean;
	type?: "submit" | "button" | "reset";
	fullyRounded?: boolean;
	className?: string;
	onClick?: () => void;
}

function AppButton({
	label,
	showLoading = false,
	type = "submit",
	fullyRounded = false,
	className,
	children,
	onClick,
	...otherProps
}: AppButtonProps & PropsWithChildren) {
	return (
		<motion.button
			whileTap={{ scale: 0.87, transition: { ease: "linear" } }}
			type={type}
			onClick={onClick}
			{...otherProps}
			className={`w-full ${
				fullyRounded ? "rounded-full" : "rounded-2xl"
			} bg-primary h-[50px] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center text-2xl text-white ${className}`}
			disabled={showLoading}>
			{showLoading && <AppLoader size={34} />}
			{!showLoading && label && label}
			{!showLoading && children && children}
		</motion.button>
	);
}

export default AppButton;
