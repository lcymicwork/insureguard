# Bolt MedCare

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/donvito/bolt-medcare)

## Overview

Bolt MedCare is a patient management system designed to enhance healthcare administration and patient care. It offers a user-friendly interface for managing patient records, appointments, medications, and more. Built with React, TypeScript, and Tailwind CSS, it provides a modern and responsive experience.

## Features

-   **Patient Profiles:** Create, view, and manage patient information, including medical history and contact details.
-   **Appointment Management:** Schedule and track patient appointments with reminders.
-   **Medication Tracking:** Manage patient medications, dosages, and refill schedules.
-   **Medical Records:** Upload and access patient medical records, such as lab reports and clinical notes.
-   **Policy Management:** Handle insurance policies, including coverage details and documents.
-   **Claim Processing:** Submit and track insurance claims, with AI-powered analysis for eligibility.
-   **Data Insights:** Generate reports and visualizations to analyze patient data.
-   **Secure Access:** User authentication and authorization to protect patient data.
-   **Responsive UI:** A design that adapts to various screen sizes.
-   **AI Assistance:** AI-powered tools for claim analysis and policy recommendations.

## Tech Stack

-   **React:** For building the user interface.
-   **TypeScript:** For static typing and enhanced code quality.
-   **Tailwind CSS:** For rapid UI development with utility-first styling.
-   **Lucide React:** For icons.
-   **Date-fns:** For date manipulation.
-   **Recharts:** For data visualization.
-   **OpenRouter API:** For AI-powered features.

## Quick Start

1.  **Clone the repo:**

    ```bash
    git clone https://github.com/your-username/bolt-medcare.git
    cd bolt-medcare
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file.
    -   Add your OpenRouter API key:

        ```env
        VITE_OPENROUTER_API_KEY=your-api-key
        ```

4.  **Start the dev server:**

    ```bash
    npm run dev
    ```

5.  **Access the app:**

    Open `http://localhost:5173` in your browser.

## Project Structure

```
bolt-medcare/
├── .bolt/
│   ├── config.json
│   └── prompt
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── src/
│   ├── components/
│   │   ├── analysis/
│   │   ├── cards/
│   │   ├── chat/
│   │   ├── documents/
│   │   ├── forms/
│   │   ├── policy/
│   │   └── settings/
│   ├── config/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

-   `src/components`: Reusable UI elements.
-   `src/config`: Configuration settings.
-   `src/context`: React context providers.
-   `src/data`: Mock data for development.
-   `src/pages`: Page-level components.
-   `src/services`: API calls and business logic.
-   `src/types`: TypeScript type definitions.
-   `src/utils`: Utility functions.
-   `src/App.tsx`: Main application component.
-   `src/index.css`: Global CSS.
-   `src/main.tsx`: Entry point for React.
-   `vite.config.ts`: Vite configuration.
-   `tailwind.config.js`: Tailwind CSS configuration.

## Contributing

1.  Fork the repo.
2.  Create a branch for your changes.
3.  Commit your changes with clear messages.
4.  Push to your fork.
5.  Submit a pull request.

## License

MIT License
