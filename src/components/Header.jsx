import { Menu, Plus } from "lucide-react";
import PropTypes from "prop-types";

/**
 * The Header component is the top-most component in the application. It displays the title of the application and provides a button to add a new application.
 *
 * @param {boolean} isSidePanelOpen - Whether the side panel is currently open or closed.
 * @param {function} setIsSidePanelOpen - A function that takes a boolean argument to set the state of the side panel.
 * @param {function} setIsAppModalOpen - A function that takes a boolean argument to set the state of the application modal.
 * @param {Object[]} applications - An array of objects, each representing an application.
 *
 * @returns {JSX.Element} The Header component.
 */
function Header({
	isSidePanelOpen,
	setIsSidePanelOpen,
	setIsAppModalOpen,
	applications,
}) {
	return (
		<div className="bg-white border-b border-gray-200 px-4 py-4">
			<div className="flex justify-between items-center max-w-7xl mx-auto">
				<div className="flex items-center gap-4">
					{/* The menu button is only visible on mobile devices (due to the md:hidden class). Clicking it toggles the side panel open or closed. */}
					<button
						onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
						className="text-gray-500 md:hidden"
					>
						{/* The Menu icon is used here to represent the menu button. */}
						<Menu size={24} />
					</button>
					{/* The heading displays the title of the application. */}
					<h1 className="text-2xl font-bold text-gray-900">
						Document Upload
					</h1>
					{/* This span displays the number of applications that have been added. */}
					{applications.length > 0 && (
						<span className="text-sm hidden md:inline text-gray-500">
							{applications.length} application
							{applications.length !== 1 ? "s" : ""}
						</span>
					)}
				</div>
				{/* This button is used to add a new application. When it is clicked, the setIsAppModalOpen function is called with true as its argument. This opens the application modal. */}
				<button
					onClick={() => setIsAppModalOpen(true)}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
				>
					{/* The Plus icon is used here to represent the button. */}
					<Plus size={16} /> Add Applicant
				</button>
			</div>
		</div>
	);
}

Header.propTypes = {
	isSidePanelOpen: PropTypes.bool.isRequired,
	setIsSidePanelOpen: PropTypes.func.isRequired,
	setIsAppModalOpen: PropTypes.func.isRequired,
	applications: PropTypes.array.isRequired,
};

export default Header;
