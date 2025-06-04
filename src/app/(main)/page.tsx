import Overview from "@/components/pages/dashboard/Overview";
import PendingAudits from "@/components/pages/dashboard/PendingAudits";
import PendingReaudits from "@/components/pages/dashboard/PendingReaudits";

export default function Home() {
	return (
		<section className="w-full px-[15px] pb-[20px]">
			<Overview />
			<PendingAudits />
			<PendingReaudits />
		</section>
	);
}
