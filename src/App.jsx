import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import DocumentManager from "./components/DocumentManager";
import {
	DocView,
	EmptyApplicationState,
	Header,
	Modal,
	SidePanel,
	TabNavigation,
} from "./components";

function App() {
	// applications: an array of objects, each representing an application
	// the state is initialized as an empty array
	const [applications, setApplications] = useState([]);

	// currentAppIndex: the index of the currently selected application
	// initialized to 0, which means the first application is selected by default
	const [currentAppIndex, setCurrentAppIndex] = useState(0);

	// currentDocIndex: the index of the currently selected document
	// initialized to 0, which means the first document is selected by default
	const [currentDocIndex, setCurrentDocIndex] = useState(0);

	// isAppModalOpen: a boolean indicating whether the application modal is open
	// initialized to false, which means the modal is closed by default
	const [isAppModalOpen, setIsAppModalOpen] = useState(false);

	// isDocModalOpen: a boolean indicating whether the document modal is open
	// initialized to false, which means the modal is closed by default
	const [isDocModalOpen, setIsDocModalOpen] = useState(false);

	// isSidePanelOpen: a boolean indicating whether the side panel is open
	// initialized to true, which means the side panel is open by default
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

	// Add a new application to the list of applications
	const addApplication = (name) => {
		setApplications([
			...applications,
			{
				name,
				documents: [], // documents array is empty initially
			},
		]);
	};

	// Add a new document to the list of documents in the current application
	const addDocument = (name) => {
		const newApps = [...applications];
		newApps[currentAppIndex].documents.push({
			name,
			file: null, // file is null until a file is uploaded
		});
		setApplications(newApps);
	};

	// Remove the application at the specified index from the list of applications
	// and update the current application index and document index accordingly
	const removeApplication = (appIndex) => {
		const newApps = applications.filter((_, index) => index !== appIndex);
		setApplications(newApps);
		setCurrentAppIndex(Math.min(currentAppIndex, newApps.length - 1));
		setCurrentDocIndex(0); // reset document index to 0
	};

	// Remove the document at the specified index in the current application
	// and update the current document index accordingly
	const removeDocument = (appIndex, docIndex) => {
		const newApps = [...applications];
		newApps[appIndex].documents = newApps[appIndex].documents.filter(
			(_, index) => index !== docIndex
		);
		setApplications(newApps);
		setCurrentDocIndex(
			Math.min(currentDocIndex, newApps[appIndex].documents.length - 1)
		); // update document index to be the minimum of the current index and the length of the documents array - 1
	};

	// Update the state when a file is uploaded for a document
	// Update the document object in the applications array with the uploaded file
	const handleFileUpload = (appIndex, docIndex, file) => {
		// Make a shallow copy of the applications array
		// This is needed because state should be immutable
		const newApps = [...applications];

		// Update the file property of the document object
		// in the applications array with the uploaded file
		newApps[appIndex].documents[docIndex].file = file;

		// Update the state with the new applications array
		setApplications(newApps);
	};

	// Remove the file from a document
	// Set the file property of the document object in the applications array to null
	const removeFile = (appIndex, docIndex) => {
		// Make a shallow copy of the applications array
		// This is needed because state should be immutable
		const newApps = [...applications];

		// Set the file property of the document object in the applications array to null
		// This effectively removes the file from the document
		newApps[appIndex].documents[docIndex].file = null;

		// Update the state with the new applications array
		setApplications(newApps);
	};

	// Get the current application and document based on the current indices
	const currentDoc =
		applications[currentAppIndex]?.documents[currentDocIndex];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Modals for adding applications and documents */}
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
				<Header
					isSidePanelOpen={isSidePanelOpen}
					setIsSidePanelOpen={setIsSidePanelOpen}
					isAppModalOpen={isAppModalOpen}
					setIsAppModalOpen={setIsAppModalOpen}
					applications={applications}
				/>
				{/* Main content */}
				{applications.length === 0 ? (
					<EmptyApplicationState
						setIsAppModalOpen={setIsAppModalOpen}
					/>
				) : (
					<>
						<TabNavigation
							applications={applications}
							setCurrentAppIndex={setCurrentAppIndex}
							setCurrentDocIndex={setCurrentDocIndex}
							currentAppIndex={currentAppIndex}
							removeApplication={removeApplication}
						/>
						{/* Content Area with Side Panel */}
						<div className="flex-1 flex overflow-hidden">
							{/* Side Panel */}
							<SidePanel
								isSidePanelOpen={isSidePanelOpen}
								setIsDocModalOpen={setIsDocModalOpen}
								applications={applications}
								currentAppIndex={currentAppIndex}
								setCurrentDocIndex={setCurrentDocIndex}
								currentDocIndex={currentDocIndex}
							/>
							{/* Main Document View */}
							<DocView
								currentAppIndex={currentAppIndex}
								currentDocIndex={currentDocIndex}
								currentDoc={currentDoc}
								removeDocument={removeDocument}
								removeFile={removeFile}
								handleFileUpload={handleFileUpload}
								setIsDocModalOpen={setIsDocModalOpen}
								applications={applications}
							/>
						</div>
					</>
				)}
			</div>
		</div>

		// <DocumentManager />
	);
}

export default App;
