"use client";
import AppButton from "@/components/shared/AppButton";
import AppInput from "@/components/shared/AppInput";
import Dropdown from "@/components/shared/Dropdown";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import { useRootStore } from "@/components/shared/providers/RootProvider";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";
import useAlert from "@/hooks/useAlert";
import { ApiInstance } from "@/utils";
import { AxiosError } from "axios";

const userSchema = yup.object().shape({
	fullName: yup
		.string()
		.required("Full name is required")
		.min(2, "Full name must be at least 2 characters")
		.max(100, "Full name must not exceed 100 characters")
		.matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
		.trim(),

	email: yup
		.string()
		.required("Email is required")
		.email("Please enter a valid email address")
		.lowercase()
		.trim(),

	country: yup
		.string()
		.required("Country is required")
		.min(2, "Country must be at least 2 characters")
		.max(50, "Country must not exceed 50 characters")
		.trim(),

	role: yup
		.string()
		.required("Role is required")
		.oneOf(
			["CLIENT", "MEDIA_OWNER"],
			"Role must be either CLIENT or MEDIA_OWNER"
		),
});

interface UserData {
	fullName: string;
	email: string;
	country: string;
	role: "CLIENT" | "MEDIA_OWNER";
}

export default function CreateMediaOwnerForm({
	callback,
}: {
	callback: () => void;
}) {
	const { countries, currentCountry } = useRootStore();
	const { showAndHideAlert } = useAlert();

	const initialValues: UserData = {
		fullName: "",
		email: "",
		country: currentCountry?.name ?? "",
		role: "MEDIA_OWNER",
	};

	const submitHandler = async function (
		values: UserData,
		{ setSubmitting }: FormikHelpers<UserData>
	) {
		try {
			await ApiInstance.post("/api/create-user", values);

			showAndHideAlert({
				message: "Media created successfully",
				type: "success",
			});

			callback();
		} catch (error) {
			const err = error as AxiosError<any>;
			showAndHideAlert({
				message:
					err?.response?.data?.error ??
					err?.response?.data?.message ??
					"An error occurred! Try again or check internet connection",
				type: "error",
			});
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={userSchema}
			onSubmit={submitHandler}>
			{({ setFieldValue, values, errors, isSubmitting }) => (
				<Form className="w-full p-5">
					<div className="flex py-3 items-center justify-between">
						<h4 className="text-[2.5rem] font-bold">Add New Media Owner</h4>
					</div>
					<div className="mt-5 flex flex-col gap-y-8">
						<AppInput
							label="Full Name"
							name="fullName"
							placeholder="Full Name"
						/>
						<AppInput
							label="Email Address"
							name="email"
							placeholder="Email Address"
						/>
						<Dropdown
							renderButton={({ setOpen, open }) => (
								<div className="flex flex-col gap-y-5 w-full">
									<span className="text-[1.7rem] text-appBlack font-semibold">
										Country
									</span>
									<AppButton
										type="button"
										onClick={() => setOpen(!open)}
										className="!w-full !bg-[#f5f5f5] px-[5px] md:px-[10px] !text-secondary gap-2 md:gap-5 !justify-between">
										<span className="text-xl md:text-2xl">
											{values.country}
										</span>
										<ChevronIcon fill="#787878" />
									</AppButton>
								</div>
							)}
							items={countries}
							renderItem={({ item, setOpen }) => (
								<button
									type="button"
									onClick={() => {
										setFieldValue("country", item.name, false);
										setOpen(false);
									}}
									key={item.name}
									className="cursor-pointer py-4 px-3 border-b border-b-[#787878] last:border-b-0">
									<span className="text-2xl font-medium">{item.name}</span>
								</button>
							)}
							dropdownWidth="100%"
							right={0}
							top={-100}
						/>
						<AppButton
							className="!text-secondary"
							label="Submit"
							showLoading={isSubmitting}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
