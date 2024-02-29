import React, { FC, memo, useState } from "react";
import { db } from "@/../db/db.model";
import { useLiveQuery } from "dexie-react-hooks";

// ... other imports
interface CFM {
	name: string;
	feedbackSubject: string;
	feedbackBody: string;
	keywords: string[];
	status: "Open" | "inIssue" | "Resolved";
	createdAt?: Date; // timestamp for tracking creation
	updatedAt?: Date; // timestamp for tracking updates
}

type StatusColor = {
	[key in CFM["status"]]: string;
};
const statusColors: StatusColor = {
	Open: "bg-red-400",
	inIssue: "bg-yellow-500",
	Resolved: "bg-green-500",
};

const ContentList: FC<{ content: CFM[] }> = ({ content }) => {
	const contentList = useLiveQuery(() => db.content.toArray());

	return (
		<div className="">
			<table>
				<tbody>
					<tr>
						<td colSpan={5}>
							<div className="grid lg:grid-cols-3 mx:grid-cols-2 gap-4 mb-4">
								{contentList?.map((i: any, index: number) => (
									<div
										key={index}
										className="grid rounded-md p-4 border border-gray-900 dark:border-gray-200 hover:shadow-md dark:hover:shadow-white"
									>
										<div
											className="grid"
											style={{ gridAutoRows: "min-content" }}
										>
											<h3
												className="mb-2 font-bold text-lg grid"
												style={{ gridRow: "1/5" }}
											>
												{i.name}
											</h3>
											<button
												style={{
													marginInlineStart: "auto",
													cursor: "default",
													gridRow: "1/5",
												}}
												className={`${
													statusColors[i.status as keyof StatusColor] ?? ""
												} text-gray-800 font-semibold py-1 px-2 border-gray-400 rounded shadow grid`}
											>
												Status: {i.status}
											</button>
										</div>
										<p className="grid text-gray-600 dark:text-gray-300">
											Feedback Subject: {i.feedbackSubject}
										</p>
										<p className="grid text-gray-600 dark:text-gray-300">
											Feedback Body: {i.feedbackBody}
										</p>
										<p className="grid text-gray-600 dark:text-gray-300">
											Keywords: {i.keywords.join(", ")}
										</p>
										<div className="grid justify-between text-xs mt-2">
											{i.createdAt && (
												<span
													className="text-gray-500 dark:text-gray-300"
													style={{ gridRow: "16/16" }}
												>
													Created at: {i.createdAt?.toLocaleString()}
												</span>
											)}
											{i.updatedAt && (
												<span
													className="text-gray-500 dark:text-gray-300"
													style={{ gridRow: "16/16" }}
												>
													Updated at: {i.updatedAt?.toLocaleString()}
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ContentList;
