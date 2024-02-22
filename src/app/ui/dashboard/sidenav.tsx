import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import CfmLogo from "@/app/ui/cfm-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2 bg-cfm-grey">
			<Link
				className="mb-2 flex h-20 items-end justify-start rounded-md bg-cfm-grey p-4 md:h-40"
				href="/"
			>
				<div className="w-32 text-slate-200 md:w-40">
					<CfmLogo />
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1">
				<NavLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-cfm-grey md:block"></div>
				<form>
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-cfm-grey p-3 text-sm font-medium hover:bg-cfm-green hover:text-zinc-950 md:flex-none md:justify-start md:p-2 md:px-3">
						<PowerIcon className="w-6" />
						<div className="hidden md:block">Sign Out</div>
					</button>
				</form>
			</div>
		</div>
	);
}
