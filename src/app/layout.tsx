import type { Metadata, Viewport } from "next";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export const metadata: Metadata = {
	title: "Complaints and Feedback Management (CFM)",
	description: "QED42 product",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
