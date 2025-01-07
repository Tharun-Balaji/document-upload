import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";

/**
 * TabNavigation renders a tab bar with a button for each application in the list.
 * The button displays the name of the application and the number of documents it contains.
 * When clicked, it sets the current application index and current document index to 0.
 *
 * @param {Object[]} applications - An array of objects, each representing an application.
 * @param {function} setCurrentAppIndex - A function that takes an index and sets the current application index to the given value.
 * @param {function} setCurrentDocIndex - A function that takes an index and sets the current document index to the given value.
 * @param {number} currentAppIndex - The current application index.
 * @param {function} removeApplication - A function that removes the application at the given index.
 * @returns {JSX.Element} The JSX markup for the tab bar.
 */
function TabNavigation({
	applications,
	setCurrentAppIndex,
	setCurrentDocIndex,
	currentAppIndex,
	removeApplication,
}) {
	return (
		<div className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex space-x-4 overflow-x-auto">
					{/* Render a button for each application in the list. The button displays the name of the application and the number of documents it contains. When clicked, it sets the current application index and current document index to 0. */}
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
							{/* Display the name of the application */}
							<span>{app.name}</span>
							{/* Display the number of documents in the application in parentheses */}
							<span className="text-xs text-gray-400">
								({app.documents.length})
							</span>
							{/* Display a trash can icon to delete the application */}
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
	);
}

TabNavigation.propTypes = {
	applications: PropTypes.array.isRequired,
	setCurrentAppIndex: PropTypes.func.isRequired,
	setCurrentDocIndex: PropTypes.func.isRequired,
	currentAppIndex: PropTypes.number.isRequired,
	removeApplication: PropTypes.func.isRequired,
};

export default TabNavigation;
