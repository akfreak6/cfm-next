import Image from "next/image";

export default function CfmLogo() {
	return (
		<div className="flex flex-row items-center leading-none text-white">
			<Image
				src="/sitelogo.svg"
				width={100}
				height={76}
				className="block"
				alt="Site logo"
			/>
		</div>
	);
}
