import { Plus, Trash2, Upload } from "lucide-react";
import PropTypes from "prop-types";

/**
 * The DocView component renders a document view based on the currently selected application and document.
 * If the selected application and document exist, it renders the document name, delete button, and file upload / remove file button.
 * If the selected application and document do not exist, it renders a message and an add document button.
 *
 * @param {number} currentAppIndex - The index of the currently selected application.
 * @param {number} currentDocIndex - The index of the currently selected document.
 * @param {Object} currentDoc - The currently selected document.
 * @param {Object[]} applications - An array of objects, each representing an application.
 * @param {function} removeDocument - A function that removes the document at the specified index in the current application.
 * @param {function} removeFile - A function that removes the file at the specified index in the current application.
 * @param {function} handleFileUpload - A function that uploads a file to the server and updates the state of the application.
 * @param {function} setIsDocModalOpen - A function that opens the document modal when called.
 *
 * @returns {JSX.Element} The JSX markup for the document view.
 */
function DocView({
	currentAppIndex,
	currentDocIndex,
	currentDoc,
	applications,
	removeDocument,
	removeFile,
	handleFileUpload,
	setIsDocModalOpen,
}) {
	return (
		<div className="flex-1 overflow-auto p-6">
			{/* If the selected application and document exist, render the document view */}
			{applications[currentAppIndex]?.documents[currentDocIndex] ? (
				<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					{/* Document name and delete button */}
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-medium">
							{applications[currentAppIndex].name}-
							{currentDoc.name}
						</h3>
						<button
							onClick={() =>
								removeDocument(currentAppIndex, currentDocIndex)
							}
							className="text-gray-400 hover:text-red-500"
						>
							{/* Delete button */}
							<Trash2 size={16} />
						</button>
					</div>

					{/* File upload / remove file button */}
					<div className="flex items-center gap-2">
						{/* If a file is uploaded, display the file name and a delete button */}
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
									{/* Delete button */}
									<Trash2 size={16} />
								</button>
							</div>
						) : (
							<div className="w-full">
								{/* Hidden file input for uploading a file */}
								<input
									type="file"
									onChange={(e) =>
										handleFileUpload(
											currentAppIndex,
											currentDocIndex,
											e.target.files[0]
										)
									}
									className="hidden"
									id={`file-${currentAppIndex}-${currentDocIndex}`}
								/>
								{/* Visible label for the file input */}
								<label
									htmlFor={`file-${currentAppIndex}-${currentDocIndex}`}
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2 w-fit cursor-pointer transition-colors"
								>
									{/* Upload icon */}
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
							Select a document from the sidebar or add a new one
						</p>
						<button
							onClick={() => setIsDocModalOpen(true)}
							className="text-blue-500 hover:text-blue-600 flex items-center gap-1 mx-auto"
						>
							{/* Add document button */}
							<Plus size={16} /> Add Document
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

DocView.propTypes = {
	currentAppIndex: PropTypes.number.isRequired,
	currentDocIndex: PropTypes.number.isRequired,
	currentDoc: PropTypes.object.isRequired,
	applications: PropTypes.array.isRequired,
	removeDocument: PropTypes.func.isRequired,
	removeFile: PropTypes.func.isRequired,
	handleFileUpload: PropTypes.func.isRequired,
	setIsDocModalOpen: PropTypes.func.isRequired,
};

export default DocView;
