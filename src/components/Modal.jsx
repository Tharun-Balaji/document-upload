import PropTypes from "prop-types";
import { X } from "lucide-react";
import { useState } from "react";

/**
 * Modal component that displays a dialog with an input field and action buttons.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title displayed at the top of the modal.
 * @param {boolean} props.isOpen - Determines if the modal is visible.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.onSubmit - Callback function to handle submission of the input value.
 *
 * @returns {JSX.Element|null} The modal JSX element if isOpen is true, otherwise null.
 */

function Modal({ title, isOpen, onClose, onSubmit }) {
	const [value, setValue] = useState(""); // State to store the input value

	if (!isOpen) return null; // Return null if the modal is not open

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			{/* Modal backdrop with a semi-transparent background */}
			<div className="bg-white rounded-lg w-full max-w-md">
				{/* Modal container */}
				<div className="flex justify-between items-center p-4 border-b">
					{/* Header section with title and close button */}
					<h3 className="text-lg font-medium">{title}</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={20} /> {/* Close icon */}
					</button>
				</div>
				<div className="p-4">
					{/* Input field for entering a name */}
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
					{/* Footer section with Cancel and Save buttons */}
					<button
						onClick={onClose}
						className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							if (value.trim()) {
								// Ensure input is not just whitespace
								onSubmit(value); // Submit the value
								setValue(""); // Reset the input field
								onClose(); // Close the modal
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
}

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default Modal;
