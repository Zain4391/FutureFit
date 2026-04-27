# FutureFit

**Is Your Career Future Fit?**

FutureFit is an AI-powered web application that analyzes your resume and predicts your automation risk. Upload your PDF resume, and the app uses Google Gemini to assess how likely your current role is to be automated, identify skill gaps, and provide personalized recommendations to future-proof your career.

---

## Features

- **AI Risk Assessment** – Detailed analysis of how likely your role is to be automated in the next decade
- **Skill Gap Analysis** – Identifies skills you need to stay competitive in an AI-driven job market
- **Personalized Learning Path** – Customized recommendations for courses, certifications, and resources
- **Industry Trends** – Insights into emerging technologies affecting your industry
- **Career Pivot Options** – Alternative career paths that leverage your existing skills with lower automation risk
- **Timeline Projections** – Estimated timelines for when automation may impact your role

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v7 |
| AI | Google Gemini API (`gemini-2.0-flash`) |
| PDF parsing | `pdfjs-dist` |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/Zain4391/FutureFit.git
cd FutureFit/frontend

# Install dependencies
npm install

# Create a .env file and add your Gemini API key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for production

```bash
npm run build
```

---

## How It Works

1. **Upload** – Drag and drop or select your resume/CV as a PDF file
2. **Analyze** – The Gemini AI scans your skills, experience, and industry to calculate automation risk
3. **Get Report** – Receive a detailed report with your risk score and personalised skill recommendations

> **No API key?** The app falls back to a built-in mock response so you can still explore the UI without a key.

---

## Project Structure

```
FutureFit/
└── frontend/               # React + Vite application
    ├── public/
    ├── src/
    │   ├── components/     # Reusable UI components (Hero, Features, etc.)
    │   ├── pages/          # Route-level pages (Landing, Report)
    │   ├── service/        # Gemini AI integration (gemini.js)
    │   ├── App.jsx         # Router setup
    │   └── main.jsx        # Entry point
    ├── index.html
    └── vite.config.js
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key |

---

## License

MIT © 2025 [Zain Rasool](https://github.com/Zain4391)
