"use client";
import AppButton from "@/components/shared/AppButton";
import Dropdown from "@/components/shared/Dropdown";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import ExportIcon from "@/components/shared/icons/ExportIcon";
import FiltersIcon from "@/components/shared/icons/FiltersIcon";
import PrintIcon from "@/components/shared/icons/PrintIcon";
import React from "react";
import * as XLSX from "xlsx";

export default function AuditTableActions({ reports }: { reports: any }) {
	function convertToFile(data: any) {
		// Convert updated data back to a file
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Cleaned Data");

		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		const fileBlob = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		// Create a download link and trigger a click event
		const url = URL.createObjectURL(fileBlob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "Cleaned_Data.xlsx"; // Default file name
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	return (
		<div className="p-8 flex flex-col gap-y-5 md:flex-row md:items-center justify-end">
			<div className="flex items-center gap-x-8">
				<Dropdown
					renderButton={({ setOpen, open }) => (
						<AppButton
							onClick={() => setOpen(!open)}
							className="!bg-[#F7F7F7] !h-[40px] px-[10px]">
							<div className="flex items-center gap-x-5">
								<ExportIcon />
								<span className="text-2xl font-medium text-[#584B4A]">
									Export
								</span>
								<div
									className={`${
										open ? "rotate-180" : "rotate-0"
									} transition-all duration-200`}>
									<ChevronIcon fill="#584B4A" />
								</div>
							</div>
						</AppButton>
					)}
					items={[
						<button
							onClick={() => convertToFile(reports)}
							className="w-full h-full text-2xl font-medium"
							key="">
							Excel
						</button>,
						<button className="w-full h-full text-2xl font-medium" key="">
							PDF
						</button>,
					]}
					renderItem={({ item, index }) => {
						return (
							<div
								className="w-full h-[35px] flex items-center px-[10px] hover:bg-[#f5f5f5] border-b border-b-gray-300"
								key={index}>
								{item}
							</div>
						);
					}}
				/>
				<AppButton className="!bg-[#F7F7F7] !h-[40px] px-[20px]">
					<div className="flex items-center gap-x-3">
						<PrintIcon />
						<span className="hidden xl:flex text-2xl font-medium text-[#584B4A]">
							Print
						</span>
					</div>
				</AppButton>
				<AppButton className="!bg-[#F7F7F7] !h-[40px] px-[20px]">
					<div className="flex items-center gap-x-3">
						<FiltersIcon />
						<span className="hidden xl:flex text-2xl font-medium text-[#584B4A]">
							Filter
						</span>
					</div>
				</AppButton>
			</div>
		</div>
	);
}
