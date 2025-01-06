import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import DocumentManager from "./components/DocumentManager";

function App() {
	const [applications, setApplications] = useState([]);
	const [currentAppIndex, setCurrentAppIndex] = useState(0);
	const [currentDocIndex, setCurrentDocIndex] = useState(0);

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

	return <div className="min-h-screen bg-gray-50"></div>;
}

export default App;
