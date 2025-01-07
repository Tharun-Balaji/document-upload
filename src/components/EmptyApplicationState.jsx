import { Plus } from "lucide-react";
import PropTypes from "prop-types";

/**
 * EmptyApplicationState displays a placeholder view when there are no applications available.
 * It includes a message encouraging the user to add a new application and provides a button
 * to open the application modal for adding a new applicant.
 *
 * @param {function} setIsAppModalOpen - A function that opens the application modal when called.
 *
 * @returns {JSX.Element} The JSX markup for the empty application state.
 */

function EmptyApplicationState({ setIsAppModalOpen }) {
	return (
		<div className="flex-1 flex items-center justify-center bg-gray-50">
			{/* Render a default view when no applications are available */}
			<div className="text-center">
				{/* Display a placeholder icon */}
				<div className="text-gray-400 mb-4">
					<Plus size={48} className="mx-auto" />
				</div>
				{/* Display a heading and a message to explain the current state */}
				<h2 className="text-xl font-medium text-gray-900 mb-2">
					No Applications Yet
				</h2>
				<p className="text-gray-500 mb-4">
					Click the Add Applicant button to get started
				</p>
				{/* Render a button to create a new application */}
				<button
					onClick={() => setIsAppModalOpen(true)}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 transition-colors"
				>
					{/* Include a plus icon to indicate adding a new application */}
					<Plus size={16} /> Add Applicant
				</button>
			</div>
		</div>
	);
}

EmptyApplicationState.propTypes = {
	setIsAppModalOpen: PropTypes.func.isRequired,
};

export default EmptyApplicationState;
