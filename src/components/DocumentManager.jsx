import React, { useState } from "react";
import {
	Trash2,
	ChevronLeft,
	ChevronRight,
	Plus,
	Upload,
	Menu,
	X,
} from "lucide-react";

const Modal = ({ isOpen, onClose, onSubmit, title }) => {
	const [value, setValue] = useState("");

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg w-full max-w-md">
				<div className="flex justify-between items-center p-4 border-b">
					<h3 className="text-lg font-medium">{title}</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={20} />
					</button>
				</div>
				<div className="p-4">
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Enter name"
						className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						autoFocus
					/>
				</div>
				<div className="p-4 border-t flex justify-end gap-2">
					<button
						onClick={onClose}
						className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							if (value.trim()) {
								onSubmit(value);
								setValue("");
								onClose();
							}
						}}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

const DocumentManager = () => {
	const [applications, setApplications] = useState([]);
	const [currentAppIndex, setCurrentAppIndex] = useState(0);
	const [currentDocIndex, setCurrentDocIndex] = useState(0);
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
	const [isAppModalOpen, setIsAppModalOpen] = useState(false);
	const [isDocModalOpen, setIsDocModalOpen] = useState(false);

	const addApplication = (name) => {
		setApplications([
			...applications,
			{
				name,
				documents: [],
			},
		]);
	};

	const addDocument = (name) => {
		const newApps = [...applications];
		newApps[currentAppIndex].documents.push({
			name,
			file: null,
		});
		setApplications(newApps);
	};

	// ... (keep other existing functions: removeApplication, removeDocument, handleFileUpload, removeFile, navigate)
	const removeApplication = (appIndex) => {
		const newApps = applications.filter((_, index) => index !== appIndex);
		setApplications(newApps);
		setCurrentAppIndex(Math.min(currentAppIndex, newApps.length - 1));
		setCurrentDocIndex(0);
	};

	const removeDocument = (appIndex, docIndex) => {
		const newApps = [...applications];
		newApps[appIndex].documents = newApps[appIndex].documents.filter(
			(_, index) => index !== docIndex
		);
		setApplications(newApps);
		setCurrentDocIndex(
			Math.min(currentDocIndex, newApps[appIndex].documents.length - 1)
		);
	};

	const handleFileUpload = (appIndex, docIndex, file) => {
		const newApps = [...applications];
		newApps[appIndex].documents[docIndex].file = file;
		setApplications(newApps);
	};

	const removeFile = (appIndex, docIndex) => {
		const newApps = [...applications];
		newApps[appIndex].documents[docIndex].file = null;
		setApplications(newApps);
	};

	const navigate = (direction) => {
		if (direction === "next") {
			const currentApp = applications[currentAppIndex];
			if (
				currentApp &&
				currentDocIndex < currentApp.documents.length - 1
			) {
				setCurrentDocIndex(currentDocIndex + 1);
			} else if (currentAppIndex < applications.length - 1) {
				setCurrentAppIndex(currentAppIndex + 1);
				setCurrentDocIndex(0);
			}
		} else {
			if (currentDocIndex > 0) {
				setCurrentDocIndex(currentDocIndex - 1);
			} else if (currentAppIndex > 0) {
				setCurrentAppIndex(currentAppIndex - 1);
				setCurrentDocIndex(
					applications[currentAppIndex - 1].documents.length - 1
				);
			}
		}
	};

	const currentDoc =
		applications[currentAppIndex]?.documents[currentDocIndex];

	return (
		<div className="min-h-screen bg-gray-50">
			<Modal
				isOpen={isAppModalOpen}
				onClose={() => setIsAppModalOpen(false)}
				onSubmit={addApplication}
				title="Add New Application"
			/>
			<Modal
				isOpen={isDocModalOpen}
				onClose={() => setIsDocModalOpen(false)}
				onSubmit={addDocument}
				title="Add New Document"
			/>

			<div className="h-screen flex flex-col">
				{/* Header */}
				<div className="bg-white border-b border-gray-200 px-4 py-4">
					<div className="flex justify-between items-center max-w-7xl mx-auto">
						<div className="flex items-center gap-4">
							<button
								onClick={() =>
									setIsSidePanelOpen(!isSidePanelOpen)
								}
								className="text-gray-500 md:hidden"
							>
								<Menu size={24} />
							</button>
							<h1 className="text-2xl font-bold text-gray-900">
								Document Upload
							</h1>
							{applications.length > 0 && (
								<span className="text-sm text-gray-500">
									{applications.length} application
									{applications.length !== 1 ? "s" : ""}
								</span>
							)}
						</div>
						<button
							onClick={() => setIsAppModalOpen(true)}
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
						>
							<Plus size={16} /> Add Applicant
						</button>
					</div>
				</div>

				{applications.length === 0 ? (
					<div className="flex-1 flex items-center justify-center bg-gray-50">
						<div className="text-center">
							<div className="text-gray-400 mb-4">
								<Plus size={48} className="mx-auto" />
							</div>
							<h2 className="text-xl font-medium text-gray-900 mb-2">
								No Applications Yet
							</h2>
							<p className="text-gray-500 mb-4">
								Click the Add Applicant button to get started
							</p>
							<button
								onClick={() => setIsAppModalOpen(true)}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 transition-colors"
							>
								<Plus size={16} /> Add Applicant
							</button>
						</div>
					</div>
				) : (
					<>
						{/* Tab Navigation */}
						<div className="bg-white border-b border-gray-200">
							<div className="max-w-7xl mx-auto px-4">
								<div className="flex space-x-4 overflow-x-auto">
									{applications.map((app, index) => (
										<button
											key={index}
											onClick={() => {
												setCurrentAppIndex(index);
												setCurrentDocIndex(0);
											}}
											className={`px-6 py-4 text-sm whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors
                        ${
							currentAppIndex === index
								? "border-blue-500 text-blue-500"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						}`}
										>
											<span>{app.name}</span>
											<span className="text-xs text-gray-400">
												({app.documents.length})
											</span>
											<button
												onClick={(e) => {
													e.stopPropagation();
													removeApplication(index);
												}}
												className="text-gray-400 hover:text-red-500"
											>
												<Trash2 size={14} />
											</button>
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Content Area with Side Panel */}
						<div className="flex-1 flex overflow-hidden">
							{/* Side Panel */}
							<div
								className={`w-64 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col
                ${isSidePanelOpen ? "block" : "hidden md:block"}`}
							>
								<div className="p-4 border-b border-gray-200">
									<div className="flex justify-between items-center">
										<h2 className="font-medium">
											Documents
										</h2>
										<span className="text-sm text-gray-500">
											{applications[currentAppIndex]
												?.documents.length || 0}{" "}
											total
										</span>
									</div>
								</div>

								{applications[currentAppIndex]?.documents
									.length === 0 ? (
									<div className="flex-1 flex items-center justify-center p-4 text-center">
										<div>
											<div className="text-gray-400 mb-2">
												<Plus
													size={32}
													className="mx-auto"
												/>
											</div>
											<p className="text-gray-500 text-sm mb-4">
												No documents added yet
											</p>
											<button
												onClick={() =>
													setIsDocModalOpen(true)
												}
												className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 mx-auto"
											>
												<Plus size={16} /> Add Document
											</button>
										</div>
									</div>
								) : (
									<div className="flex-1 overflow-y-auto">
										<div className="p-4 space-y-2">
											{applications[
												currentAppIndex
											]?.documents.map((doc, index) => (
												<button
													key={index}
													onClick={() =>
														setCurrentDocIndex(
															index
														)
													}
													className={`w-full text-left p-3 rounded-lg text-sm transition-colors
                            ${
								currentDocIndex === index
									? "bg-blue-50 text-blue-600"
									: "hover:bg-gray-50 text-gray-700"
							}`}
												>
													<div className="flex items-center justify-between">
														<span className="truncate">
															{doc.name}
														</span>
														{doc.file && (
															<div className="w-2 h-2 bg-green-500 rounded-full" />
														)}
													</div>
												</button>
											))}
										</div>
									</div>
								)}

								<div className="p-4 border-t border-gray-200">
									<button
										onClick={() => setIsDocModalOpen(true)}
										className="w-full p-3 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-2 justify-center"
									>
										<Plus size={16} /> Add Document
									</button>
								</div>
							</div>

							{/* Main Document View */}
							<div className="flex-1 overflow-auto p-6">
								{applications[currentAppIndex]?.documents[
									currentDocIndex
								] ? (
									<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
										{/* ... (keep existing document view code) ... */}
										<div className="flex justify-between items-center mb-6">
											<h3 className="text-lg font-medium">
												{currentDoc.name}
											</h3>
											<button
												onClick={() =>
													removeDocument(
														currentAppIndex,
														currentDocIndex
													)
												}
												className="text-gray-400 hover:text-red-500"
											>
												<Trash2 size={16} />
											</button>
										</div>
										<div className="flex items-center gap-2">
											{currentDoc.file ? (
												<div className="flex items-center justify-between w-full">
													<span className="text-sm text-gray-600 truncate flex-1">
														{currentDoc.file.name}
													</span>
													<button
														onClick={() =>
															removeFile(
																currentAppIndex,
																currentDocIndex
															)
														}
														className="text-gray-400 hover:text-red-500 ml-2"
													>
														<Trash2 size={16} />
													</button>
												</div>
											) : (
												<div className="w-full">
													<input
														type="file"
														onChange={(e) =>
															handleFileUpload(
																currentAppIndex,
																currentDocIndex,
																e.target
																	.files[0]
															)
														}
														className="hidden"
														id={`file-${currentAppIndex}-${currentDocIndex}`}
													/>
													<label
														htmlFor={`file-${currentAppIndex}-${currentDocIndex}`}
														className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2 w-fit cursor-pointer transition-colors"
													>
														<Upload size={14} />
														Choose File
													</label>
												</div>
											)}
										</div>
									</div>
								) : (
									<div className="flex items-center justify-center h-full">
										<div className="text-center">
											<p className="text-gray-500 mb-4">
												Select a document from the
												sidebar or add a new one
											</p>
											<button
												onClick={() =>
													setIsDocModalOpen(true)
												}
												className="text-blue-500 hover:text-blue-600 flex items-center gap-1 mx-auto"
											>
												<Plus size={16} /> Add Document
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Footer Navigation */}
						<div className="bg-white border-t border-gray-200 px-4 py-4">
							<div className="max-w-7xl mx-auto flex justify-between">
								<button
									onClick={() => navigate("prev")}
									className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
									disabled={
										currentAppIndex === 0 &&
										currentDocIndex === 0
									}
								>
									<ChevronLeft size={16} /> Back
								</button>
								<button
									onClick={() => navigate("next")}
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
									disabled={
										currentAppIndex ===
											applications.length - 1 &&
										currentDocIndex ===
											applications[currentAppIndex]
												?.documents.length -
												1
									}
								>
									Next <ChevronRight size={16} />
								</button>
							</div>
						</div>
						{/* ... (keep existing footer code) ... */}
					</>
				)}
			</div>
		</div>
	);
};

export default DocumentManager;
