import React from "react";
import Image from "next/image";
import LoginForm from "@/components/pages/login/LoginForm";

export default function page() {
	return (
		<section className="w-full h-screen flex items-center justify-center">
			<div className="w-[40%] shadow-2xl bg-white rounded-2xl p-8">
				<div>
					<Image alt="OOHIQ" src={"/oohiq-logo.png"} width={60} height={60} />
				</div>
				<LoginForm />
			</div>
		</section>
	);
}
