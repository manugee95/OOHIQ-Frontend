"use client";
import AppInput from "@/components/shared/AppInput";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";
import useAlert from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import AppButton from "@/components/shared/AppButton";
import { ApiInstance } from "@/utils";
import { setAccessToken } from "@/actions/cookie";

const schema = Yup.object().shape({
	email: Yup.string()
		.required()
		.email("Please provide a valid email address")
		.label("Email"),
	password: Yup.string().required().label("Password"),
});

interface LoginData {
	email: string;
	password: string;
}

export default function LoginForm() {
	const { showAndHideAlert } = useAlert();
	const router = useRouter();

	const initialValues: LoginData = {
		email: "",
		password: "",
	};

	const submitHandler = async function (
		values: LoginData,
		{ setSubmitting }: FormikHelpers<LoginData>
	) {
		try {
			const response = await ApiInstance.post("/login", values);
			await setAccessToken(response.data.token);

			showAndHideAlert({
				message: "Logged in successfully",
				type: "success",
			});

			router.replace("/");
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
			onSubmit={submitHandler}
			initialValues={initialValues}
			validationSchema={schema}>
			{({ values, errors, isSubmitting }) => (
				<Form className="w-full mt-10 gap-y-5 flex flex-col">
					<AppInput
						label="Email"
						placeholder="Enter your email address"
						name="email"
						type="email"
					/>
					<AppInput.Password
						label="Password"
						placeholder="**********"
						name="password"
						type="password"
					/>
					<AppButton
						showLoading={isSubmitting}
						label="Login"
						className="!text-secondary"
					/>
				</Form>
			)}
		</Formik>
	);
}
