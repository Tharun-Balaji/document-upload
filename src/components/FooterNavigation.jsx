import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

/**
 * FooterNavigation renders navigation buttons for traversing documents in the application.
 * It provides a "Back" button to navigate to the previous document and a "Next" button
 * to navigate to the next document. The buttons are disabled if the user is at the
 * beginning or end of the document list, respectively.
 *
 * @param {Object[]} applications - An array of application objects, each containing documents.
 * @param {number} currentAppIndex - The index of the currently selected application.
 * @param {number} currentDocIndex - The index of the currently selected document within the application.
 * @param {function} navigate - A function to navigate to the previous or next document.
 */

function FooterNavigation({
	applications,
	currentAppIndex,
	currentDocIndex,
	navigate,
}) {
	return (
		<div className="bg-white border-t border-gray-200 px-4 py-4">
			<div className="max-w-7xl mx-auto flex justify-between">
				{/*
					Back button is disabled if the user is at the very beginning of the list of documents
					(currentAppIndex === 0 && currentDocIndex === 0)
				*/}
				<button
					onClick={() => navigate("prev")}
					className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
					disabled={currentAppIndex === 0 && currentDocIndex === 0}
				>
					<ChevronLeft size={16} /> Back
				</button>
				{/*
					Next button is disabled if the user is at the very end of the list of documents
					(currentAppIndex === applications.length - 1 &&
					currentDocIndex === applications[currentAppIndex]?.documents.length - 1)
				*/}
				<button
					onClick={() => navigate("next")}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
					disabled={
						currentAppIndex === applications.length - 1 &&
						currentDocIndex ===
							applications[currentAppIndex]?.documents.length - 1
					}
				>
					Next <ChevronRight size={16} />
				</button>
			</div>
		</div>
	);
}
FooterNavigation.propTypes = {
	applications: PropTypes.array.isRequired,
	currentAppIndex: PropTypes.number.isRequired,
	currentDocIndex: PropTypes.number.isRequired,
	navigate: PropTypes.func.isRequired,
};

export default FooterNavigation;
