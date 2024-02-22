"use client";

import {
	UserGroupIcon,
	HomeIcon,
	DocumentDuplicateIcon,
	BoltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: "Overview", href: "/dashboard", icon: HomeIcon },
	{
		name: "Feedback",
		href: "/dashboard/feedback",
		icon: DocumentDuplicateIcon,
	},
	{
		name: "Issues",
		href: "/dashboard/issues",
		icon: BoltIcon,
	},
	{ name: "Users", href: "/dashboard/users", icon: UserGroupIcon },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-cfm-green text-slate-200 dark:text-slate-200 hover:text-zinc-950 md:flex-none md:justify-start md:p-2 md:px-3",
							{
								"bg-cfm-green text-zinc-950 dark:text-zinc-950": pathname === link.href,
							}
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
