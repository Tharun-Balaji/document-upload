# Nested Document Management React App

This repository contains a React application for managing nested documents within applications. Users can create multiple applications, add documents to them, upload files, and navigate between documents and applications. The application is styled with Tailwind CSS.

## Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Folder Structure](#folder-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the App Locally](#running-the-app-locally)
5. [Code Snippets](#code-snippets)
   - [State Management](#state-management)
   - [Adding Applications and Documents](#adding-applications-and-documents)
   - [Navigation](#navigation)
6. [How It Works](#how-it-works)
7. [Technologies Used](#technologies-used)
8. [License](#license)

## Features

- Add multiple applications and documents.
- Upload and remove files for individual documents.
- Delete applications and their associated documents.
- Delete individual documents and their files.
- Navigate between documents and applications using a global navigation system.
- Fully responsive UI styled with Tailwind CSS.

## Demo

Live Demo: [Nested Document Management App](https://regal-choux-898f2e.netlify.app/)

## Folder Structure

```
root
├── public
│   ├── document.png
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── Components
│       ├── DocView.jsx
│       ├── EmptyApplicationState.jsx
│       ├── FooterNavigation.jsx
│       ├── Modal.jsx
│       ├── Header.jsx
│       ├── SidePanel.jsx
│       ├── TabNavigation.jsx
│       └── index.js
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
└── README.md
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nested-doc-manager.git
   cd nested-doc-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the App Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the app in your browser at `http://localhost:5173/`.

## Code Snippets

### State Management

The application uses `useState` for managing the state of applications, documents, and navigation.

```javascript
const [applications, setApplications] = useState([]);
const [currentAppIndex, setCurrentAppIndex] = useState(0);
const [currentDocIndex, setCurrentDocIndex] = useState(0);
const [isAppModalOpen, setIsAppModalOpen] = useState(false);
const [isDocModalOpen, setIsDocModalOpen] = useState(false);
```

### Adding Applications and Documents

Applications and documents are added dynamically using the following functions:

```javascript
const addApplication = (name) => {
  setApplications([...applications, { name, documents: [] }]);
};

const addDocument = (name) => {
  const newApps = [...applications];
  newApps[currentAppIndex].documents.push({ name, file: null });
  setApplications(newApps);
};
```

### Navigation

Navigate between documents and applications using the `navigate` function:

```javascript
const navigate = (direction) => {
  if (direction === "next") {
    if (currentDocIndex < applications[currentAppIndex].documents.length - 1) {
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
```

## How It Works

1. **Adding Applications and Documents:** Users can add applications and documents through modals that prompt for a name.
2. **File Management:** Users can upload and remove files for individual documents.
3. **Deletion:** Removing an application deletes all associated documents. Removing a document also removes its file.
4. **Navigation:** Users can navigate through documents and applications using global navigation buttons.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling.
- **Vite**: For bundling and running the development server.
- **JavaScript**: For application logic.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.
