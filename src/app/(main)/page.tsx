import Overview from "@/components/pages/dashboard/Overview";
import RecentAudits from "@/components/pages/dashboard/RecentAudits";

export default function Home() {
	return (
		<section className="w-full px-[15px] pb-[20px]">
			<Overview />
			<RecentAudits />
		</section>
	);
}
