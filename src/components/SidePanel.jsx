import { Plus } from "lucide-react";
import PropTypes from "prop-types";

/**
 * The SidePanel component displays a list of documents for the currently selected application.
 * It has a header section with a title and a count of the total number of documents, and a footer section with a button to add a new document.
 * If the application has no documents, it displays a placeholder view with a message and a button to add a new document.
 * If the application has documents, it displays them in a list. Each list item displays the name of the document and a small green circle if the document has been uploaded.
 * When a document is selected, the component calls the setCurrentDocIndex function with the index of the selected document.
 *
 * @param {boolean} isSidePanelOpen - Whether the side panel is currently open or closed.
 * @param {function} setIsDocModalOpen - A function that opens the document modal when called.
 * @param {Object[]} applications - An array of objects, each representing an application.
 * @param {number} currentAppIndex - The index of the currently selected application.
 * @param {function} setCurrentDocIndex - A function that sets the current document index to the given value.
 * @param {number} currentDocIndex - The current document index.
 * @returns {JSX.Element} The JSX markup for the side panel.
 */
function SidePanel({
	isSidePanelOpen,
	setIsDocModalOpen,
	applications,
	currentAppIndex,
	setCurrentDocIndex,
	currentDocIndex,
}) {
	return (
		<div
			className={`w-64 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col
                ${isSidePanelOpen ? "block" : "hidden md:block"}`}
		>
			{/* Header section with title and total number of documents */}
			<div className="p-4 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<h2 className="font-medium">Documents</h2>
					<span className="text-sm text-gray-500">
						{/* Display the number of documents in the current application */}
						{applications[currentAppIndex]?.documents.length || 0}{" "}
						total
					</span>
				</div>
			</div>

			{/* If no documents have been added yet, display a placeholder view */}
			{applications[currentAppIndex]?.documents.length === 0 ? (
				<div className="flex-1 flex items-center justify-center p-4 text-center">
					<div>
						<div className="text-gray-400 mb-2">
							{/* Display a plus icon to indicate adding a new document */}
							<Plus size={32} className="mx-auto" />
						</div>
						<p className="text-gray-500 text-sm mb-4">
							No documents added yet
						</p>
						<button
							onClick={() => setIsDocModalOpen(true)}
							className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 mx-auto"
						>
							{/* Display a plus icon and a button to add a new document */}
							<Plus size={16} /> Add Document
						</button>
					</div>
				</div>
			) : (
				/* If there are documents, display them in a list */
				<div className="flex-1 overflow-y-auto">
					<div className="p-4 space-y-2">
						{applications[currentAppIndex]?.documents.map(
							(doc, index) => (
								<button
									key={index}
									onClick={() => setCurrentDocIndex(index)}
									className={`w-full text-left p-3 rounded-lg text-sm transition-colors
                            ${
								currentDocIndex === index
									? "bg-blue-50 text-blue-600"
									: "hover:bg-gray-50 text-gray-700"
							}`}
								>
									<div className="flex items-center justify-between">
										<span className="truncate">
											{/* Display the name of the document */}
											{doc.name}
										</span>
										{doc.file && (
											/* Display a small green circle if the document has been uploaded */
											<div className="w-2 h-2 bg-green-500 rounded-full" />
										)}
									</div>
								</button>
							)
						)}
					</div>
				</div>
			)}

			{/* Footer section with a button to add a new document */}
			<div className="p-4 border-t border-gray-200">
				<button
					onClick={() => setIsDocModalOpen(true)}
					className="w-full p-3 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-2 justify-center"
				>
					<Plus size={16} /> Add Document
				</button>
			</div>
		</div>
	);
}

SidePanel.propTypes = {
	isSidePanelOpen: PropTypes.bool.isRequired,
	setIsSidePanelOpen: PropTypes.func.isRequired,
	setIsDocModalOpen: PropTypes.func.isRequired,
	applications: PropTypes.array.isRequired,
	currentAppIndex: PropTypes.number.isRequired,
	setCurrentAppIndex: PropTypes.func.isRequired,
	setCurrentDocIndex: PropTypes.func.isRequired,
	currentDocIndex: PropTypes.number.isRequired,
};

export default SidePanel;
