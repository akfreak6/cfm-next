import React, { FC, useMemo, useState } from "react";
import { CFM, db } from "./../../../db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import MultiSelectDropdown from "./MultiSelectDropdown";
import _ from "lodash";
import KeywordFilter from "./KeywordFilter";
const ContentMngmt: FC = () => {
	const [isAddMode, setIsAddMode] = useState(true);
	const [showMode, setShowMode] = useState(true);
	const [content, setContent] = React.useState({
		name: "",
		feedbackSubject: "",
		feedbackBody: "",
		keywords: [""],
		status: [""],
		id: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const toggleTable = () => {
		setShowMode(!showMode);
		setContent({
			name: "",
			feedbackSubject: "",
			feedbackBody: "",
			keywords: [""],
			status: [],
			id: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		}); // Clear form on toggle
	};

	const toggleInputForm = () => {
		setIsAddMode(!isAddMode);
		setContent({
			name: "",
			feedbackSubject: "",
			feedbackBody: "",
			keywords: [""],
			status: [],
			id: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		}); // Clear form on toggle
	};
	// dexie hook to get live data
	const contentList = useLiveQuery(() => db.content.toArray());
	const allKeywords = useMemo(() => {
		return _.uniq(_.flatMap(contentList, "keywords")) || []; // Flatten and deduplicate
	}, [contentList]);
	const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
	const filteredContent = useMemo(() => {
		// Filter contents based on selectedKeywords using Lodash's _.some and _.isEmpty
		return _.filter(contentList, (content) => {
			if (_.isEmpty(selectedKeywords)) {
				return true; // Show all contents if no keywords are selected
			}
			return _.some(selectedKeywords, (keyword) =>
				_.includes(content.keywords, keyword)
			);
		});
	}, [contentList, selectedKeywords]);
	//const filteredContentCount = filteredContent.length; //  _.size(filteredContent)
	const filteredKeywordNamesArray = useMemo(() => {
		return _.flatMap(filteredContent, (content) => {
			const overlappedKeywords = _.intersection(
				content.keywords,
				selectedKeywords
			);
			return overlappedKeywords.map((keyword) => `${keyword}: ${content.name}`);
		});
	}, [filteredContent, selectedKeywords]);

	//add contents
	const addContent = React.useCallback(async () => {
		if (
			content?.name &&
			content?.feedbackSubject &&
			content?.feedbackBody &&
			content?.keywords.some((keyword) => keyword !== "") &&
			content?.status.length == 1 &&
			content?.status.some((skill) => skill !== "")
		) {
			try {
				await db.content.add({
					name: content?.name,
					feedbackSubject: String(content?.feedbackSubject),
					feedbackBody: String(content?.feedbackBody),
					keywords: content.keywords,
					status: content.status,
					createdAt: new Date(),
				});
				setContent({
					name: "",
					feedbackSubject: "",
					feedbackBody: "",
					keywords: [""],
					status: [],
					id: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			} catch (error) {
				console.error("Error adding content:", error);
			}
		}
	}, [content]);
	// update content
	const updateContent = React.useCallback(async () => {
		if (
			content?.id &&
			content?.name &&
			content?.feedbackSubject &&
			content?.feedbackBody &&
			content?.keywords.some((keyword) => keyword !== "") &&
			content?.status.length > 0 &&
			content?.status.some((skill) => skill !== "")
		) {
			await db.content.put({
				id: content?.id,
				name: content?.name,
				feedbackSubject: String(content?.feedbackSubject),
				feedbackBody: String(content?.feedbackBody),
				keywords: content?.keywords,
				status: content?.status,
				updatedAt: new Date(),
			});
			setContent({
				name: "",
				feedbackSubject: "",
				feedbackBody: "",
				keywords: [""],
				status: [],
				id: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
	}, [content]);

	// delete content
	const deleteContent = React.useCallback(async (id: any) => {
		await db.content.delete(id);
	}, []);

	const ContentList: React.FC<{ content: CFM[] }> = ({ content }) => {
		return (
			<div className="">
				<table>
					<tbody>
						<tr>
							<td>
								<button
									className="bg-cfm-green dark:bg-transparent hover:bg-cfm-grey hover:dark:bg-cfm-green text-cfm-grey dark:text-cfm-green font-semibold hover:text-cfm-green hover:dark:text-cfm-grey py-2 px-4 border border-lime-500 hover:border-transparent rounded my-5"
									onClick={toggleTable}
								>
									{showMode ? "Show Table" : "Hide Table"}
								</button>
								{showMode || (
									<table>
										<tbody>
											<tr>
												<td>
													<table>
														<tbody>
															<tr>
																<th style={{ width: "5%" }}>ID</th>
																<th style={{ width: "5%" }}>Name</th>
																<th style={{ width: "10%" }}>Feed Sub </th>
																<th style={{ width: "20%" }}>Feed Bod </th>
																<th style={{ width: "10%" }}>Keywords</th>
																<th style={{ width: "10%" }}>Status</th>
																<th style={{ width: "10%" }}>Created at</th>
																<th style={{ width: "10%" }}>Updated at</th>
																<th style={{ width: "2.5%" }}>DEL </th>
																<th style={{ width: "2.5%" }}>UPD </th>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td>
													<table>
														{contentList?.map((i: any, index: number) => {
															return (
																<>
																	<tbody>
																		<tr key={index}>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "5%",
																				}}
																			>
																				<span
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.id}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "5%",
																				}}
																			>
																				<span
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.name}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "10%",
																				}}
																			>
																				{" "}
																				<span
																					style={{
																						width: "200px",
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.feedbackSubject}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "15%",
																				}}
																			>
																				{" "}
																				<span
																					style={{
																						width: "200px",
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.feedbackBody}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "5%",
																				}}
																			>
																				{" "}
																				<span
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.keywords.join(", ")}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "5%",
																				}}
																			>
																				{" "}
																				<span
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.status}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "12.5%",
																				}}
																			>
																				{" "}
																				<span
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.createdAt?.toLocaleString()}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "12.5%",
																				}}
																			>
																				{" "}
																				<span
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																					}}
																				>
																					{i.updatedAt?.toLocaleString()}
																				</span>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "5%",
																				}}
																			>
																				{" "}
																				<button
																					onClick={addContent}
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																						marginLeft: "10px",
																					}}
																					onClickCapture={() =>
																						deleteContent(i.id)
																					}
																				>
																					DEL
																				</button>
																			</td>
																			<td
																				style={{
																					paddingTop: "10px",
																					width: "5%",
																				}}
																			>
																				<button
																					onClick={() => setContent({ ...i })}
																					style={{
																						paddingLeft: "10px",
																						paddingRight: "10px",
																						marginLeft: "10px",
																					}}
																				>
																					UPD
																				</button>
																			</td>
																		</tr>
																	</tbody>
																</>
															);
														})}
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								)}
							</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td colSpan={7}>
								<div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
									{contentList?.map((i: any, index: number) => (
										<div
											key={index}
											className="rounded-md p-4 border border-gray-200 hover:shadow-md"
										>
											<div className="md:grid-col-2">
												<h3 className="mb-2 font-bold text-lg">{i.name}</h3>
												<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border-gray-400 rounded shadow cursor-not-allowed">
													Status: {i.status}
												</button>
											</div>
											<p className="text-gray-600">
												Feedback Subject: {i.feedbackSubject}
											</p>
											<p className="text-gray-600">
												Feedback Body: {i.feedbackBody}
											</p>
											<p className="text-gray-600">
												Keywords: {i.keywords.join(", ")}
											</p>
											<p className="text-gray-600"></p>
											<div className="flex justify-end mt-4">
												<button
													onClick={addContent}
													className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-700"
												>
													DELETE
												</button>
												<button
													onClick={() => setContent({ ...i })}
													className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700"
												>
													UPDATE
												</button>
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

	// Add and Update Form Component
	return (
		<div>
			<div style={{ paddingLeft: "30px" }}>
				<h2 style={{ marginBottom: "20px", marginTop: "20px" }}>
					{content?.id ? "Update" : "Add"} Feedback{" "}
				</h2>
				<button
					className="bg-cfm-green dark:bg-transparent hover:bg-cfm-grey hover:dark:bg-cfm-green text-cfm-grey dark:text-cfm-green font-semibold hover:text-cfm-green hover:dark:text-cfm-grey py-2 px-4 border border-lime-500 hover:border-transparent rounded mt-5"
					onClick={toggleInputForm}
				>
					{isAddMode ? "Add Feedback" : "Hide Feedback Form"}
				</button>
				{isAddMode || (
					<div className="w-full max-w-xl my-5">
						<div className="flex flex-wrap -mx-3 mb-6">
							<div
								className="w-full md:w-1/4 px-3 mb-6 md:mb-0"
								id="nameFields"
								style={{ display: "block" }}
							>
								<label
									className="block uppercase racking-wide text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
									htmlFor="Name"
									style={{ display: "block", paddingRight: "10px" }}
								>
									Name
								</label>
								<input
									className="appearance-none block w-full bg-gray-300 dark:bg-gray-200 text-gray-700 border border-gray-800 dark:border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									type="text"
									value={content?.name}
									onChange={(e) =>
										setContent({ ...content, name: e.target.value })
									}
									placeholder="Name"
									name="Name"
									style={{ color: "#000", marginRight: "30px" }}
								/>
							</div>
							<div
								className="w-full md:w-3/4 px-3"
								id="feedbackSubjectFields"
								style={{ display: "block" }}
							>
								<label
									className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
									htmlFor="Feedback Subject"
									style={{ display: "block", paddingRight: "10px" }}
								>
									Feedback Subject{" "}
								</label>
								<input
									className="appearance-none block w-full bg-gray-300 dark:bg-gray-200 text-gray-700 border border-gray-800 dark:border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									type="text"
									value={content?.feedbackSubject}
									onChange={(e) =>
										setContent({ ...content, feedbackSubject: e.target.value })
									}
									placeholder="Feedback Subject"
									name="FeedbackSubject"
									style={{ color: "#000" }}
								/>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div
								className="w-full px-3"
								id="feedbackBodyFields"
								style={{ display: "block" }}
							>
								<label
									className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
									htmlFor="Feedback Body"
									style={{ display: "block", paddingRight: "10px" }}
								>
									Feedback Body{" "}
								</label>
								<input
									className="appearance-none block w-full bg-gray-300 dark:bg-gray-200 text-gray-700 border border-gray-800 dark:border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									type="text"
									value={content?.feedbackBody}
									onChange={(e) =>
										setContent({ ...content, feedbackBody: e.target.value })
									}
									placeholder="Feedback Body"
									name="FeedbackBody"
									style={{ color: "#000" }}
								/>
							</div>
						</div>
						<div id="keywordFields" style={{ display: "block" }}>
							<div className="flex-wrap -mx-3 mb-6">
								{content.keywords.map((keyword, index) => (
									<div
										className="w-full md:w-3/4 px-3 mb-6 md:mb-0 inline-block"
										key={index}
									>
										<div className="w-full md:w-2/3 pr-3 inline-block">
											<label
												className="block uppercase racking-wide text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
												htmlFor="Name"
												style={{ display: "block", paddingRight: "10px" }}
											>
												Keywords
											</label>
											<input
												className="appearance-none w-full bg-gray-300 dark:bg-gray-200 text-gray-700 border border-gray-800 dark:border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white inline-block"
												style={{ color: "#000" }}
												type="text"
												value={keyword}
												onChange={(e) =>
													setContent({
														...content,
														keywords: [
															...content.keywords.slice(0, index),
															e.target.value,
															...content.keywords.slice(index + 1),
														],
													})
												}
												placeholder={`Keyword ${index + 1}`}
											/>
										</div>
										{index !== 0 && (
											<div className="w-full md:w-[30%] px-3 inline-block">
												<button
													className="bg-cfm-green dark:bg-transparent hover:bg-cfm-grey hover:dark:bg-cfm-green text-cfm-grey dark:text-cfm-green font-semibold hover:text-cfm-green hover:dark:text-cfm-grey hover:border-transparent mt-5 appearance-none block w-full border border-cfm-green rounded py-2 px-4 leading-[24px] focus:outline-none focus:bg-white focus:border-gray-500"
													onClick={() =>
														setContent({
															...content,
															keywords: content.keywords.filter(
																(_, i) => i !== index
															),
														})
													}
												>
													Remove
												</button>
											</div>
										)}
									</div>
								))}
								<div className="w-full md:w-1/4 px-3 inline-block">
									<button
										className="bg-cfm-green dark:bg-transparent hover:bg-cfm-grey hover:dark:bg-cfm-green text-cfm-grey dark:text-cfm-green font-semibold hover:text-cfm-green hover:dark:text-cfm-grey py-2 px-4 border border-lime-500 hover:border-transparent rounded mt-5"
										onClick={() =>
											setContent({
												...content,
												keywords: [...content.keywords, ""],
											})
										}
									>
										+ Keyword
									</button>
								</div>
							</div>
						</div>
						<div id="status" style={{ display: "block" }}>
							<label
								className="block uppercase racking-wide text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
								htmlFor="Status"
								style={{ display: "block", paddingRight: "10px" }}
							>
								Status
							</label>
							<MultiSelectDropdown
								label=""
								options={["Open", "inIssue", "Resolved"]}
								selectedValues={content.status[0]}
								onValuesChange={(value) =>
									setContent({ ...content, status: value })
								}
							/>
						</div>
						{content?.id ? (
							<button
								className="bg-cfm-green dark:bg-transparent hover:bg-cfm-grey hover:dark:bg-cfm-green text-cfm-grey dark:text-cfm-green font-semibold hover:text-cfm-green hover:dark:text-cfm-grey py-2 px-4 border border-lime-500 hover:border-transparent rounded mt-5"
								onClick={updateContent}
								style={{
									paddingLeft: "10px",
									paddingRight: "10px",
									marginLeft: "10px",
								}}
							>
								SUBMIT
							</button>
						) : (
							<button
								className="bg-cfm-green dark:bg-transparent hover:bg-cfm-grey hover:dark:bg-cfm-green text-cfm-grey dark:text-cfm-green font-semibold hover:text-cfm-green hover:dark:text-cfm-grey py-2 px-4 border border-lime-500 hover:border-transparent rounded mt-5"
								onClick={addContent}
								style={{
									paddingLeft: "10px",
									paddingRight: "10px",
									marginLeft: "10px",
								}}
							>
								ADD
							</button>
						)}
					</div>
				)}
				<div>
					<KeywordFilter
						allKeywords={allKeywords}
						selectedKeywords={selectedKeywords}
						onSelectedKeywordChange={setSelectedKeywords}
					/>
				</div>
				<div>{/* <FilterApp/> */}</div>
				<div>
					<br />
					{/*<h2>Filtered Content</h2>
           <p>Number of filtered content: {filteredContentCount}</p> */}
					<p>
						<br />
						Selected keywords and content with those keywords:
						<br />
						{filteredKeywordNamesArray}
					</p>
				</div>

				<h2 style={{ marginBottom: "20px", marginTop: "20px" }}>
					Content List
				</h2>
				<div>
					<ContentList content={filteredContent} />
				</div>
			</div>
		</div>
	);
};
export default ContentMngmt;
