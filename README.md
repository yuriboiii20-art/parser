# Production-Ready PDF Resume Parser Engine

A modular, scalable, production-ready Full Stack JavaScript web application that extracts structured information from PDF resumes using Node.js 22 LTS, Express.js, `pdf-parse`, modular regex parsers, and React 19 + Tailwind CSS.

---

## 🌟 Key Features

- 📄 **PDF Text Extraction & Normalization**: Extracts raw text from PDF buffers using `pdf-parse` and normalizes whitespace, zero-width spaces, and carriage returns.
- 🎯 **Smart Section Detector**: Identifies headings (Personal Info, Summary/Objective, Skills, Experience, Education, Projects, Certifications, Achievements) across various resume layouts.
- 🧩 **Modular Regex Engine**: Individual parser modules in separate files without heavy NLP libraries:
  - `personalParser.js`: Name, Email, Phone, LinkedIn, GitHub, Portfolio Website, Location.
  - `skillsParser.js`: Categorizes into Languages, Frameworks, Libraries, Databases, Tools, and Technologies.
  - `experienceParser.js`: Company, Job Title, Duration, Location, and Description bullets.
  - `educationParser.js`: Degree, College, University, CGPA, Percentage, Start/End Year.
  - `projectsParser.js`: Project Name, Description, Technologies Used, GitHub link.
  - `certificationsParser.js` & `achievementsParser.js`: Certifications, Awards, and Honors.
- 🎨 **Modern Responsive UI**: React 19 + Vite + Tailwind CSS v4 with glassmorphism, Dark/Light mode theme toggle, smooth micro-animations, drag-and-drop file upload, PDF previewer, visual cards dashboard, and syntax-highlighted JSON viewer with copy/download options.
- 🧪 **Automated Testing Suite**: Built-in Jest & Supertest unit and integration tests covering parser regex logic and Express REST endpoints.

---

## 📁 Folder Structure

```
resume-parser/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── DragDropUpload.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── PDFPreview.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── JSONViewer.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Result.jsx
│   │   │   ├── JSONViewerPage.jsx
│   │   │   ├── About.jsx
│   │   │   └── NotFound.jsx
│   │   ├── hooks/
│   │   │   └── useTheme.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── appConfig.js
│   ├── controllers/
│   │   └── parserController.js
│   ├── middlewares/
│   │   ├── uploadMiddleware.js
│   │   └── errorHandler.js
│   ├── parsers/
│   │   ├── personal/personalParser.js
│   │   ├── summary/summaryParser.js
│   │   ├── skills/skillsParser.js
│   │   ├── experience/experienceParser.js
│   │   ├── education/educationParser.js
│   │   ├── projects/projectsParser.js
│   │   ├── certifications/certificationsParser.js
│   │   └── achievements/achievementsParser.js
│   ├── routes/
│   │   └── parserRoutes.js
│   ├── services/
│   │   ├── sectionDetector.js
│   │   └── parserService.js
│   ├── utils/
│   │   ├── regexHelpers.js
│   │   └── textUtils.js
│   ├── uploads/
│   ├── output/
│   ├── tests/
│   │   ├── parser.test.js
│   │   └── api.test.js
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🚀 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/parser/upload` | Accepts PDF file via Multer (`resume`), parses text, and returns structured JSON. |
| `GET` | `/api/parser/sample` | Returns sample structured resume JSON. |
| `GET` | `/api/parser/download/:id` | Downloads the extracted JSON file by ID. |
| `GET` | `/api/health` | Server health check endpoint. |

---

## ⚙️ Running Locally

### 1. Install Dependencies
```bash
# In the server directory
cd server
npm install

# In the client directory
cd ../client
npm install
```

### 2. Run Backend Server
```bash
cd server
npm start
# Server runs at http://localhost:5000
```

### 3. Run Frontend App
```bash
cd client
npm run dev
# Vite server runs at http://localhost:5173
```

### 4. Run Automated Tests
```bash
cd server
npm test
```
