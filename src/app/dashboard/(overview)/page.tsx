'use client';
import ContentList from "@/app/components/ContentList";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
export default function Page() {
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Overview Page
			</h1>
      <ContentList content={[]}/>
		</main>
	);
}
