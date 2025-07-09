Your Life Calendar

Live Demo: https://yourlifecalendar.co.uk

![your-life-calendar-screenshot png](https://github.com/user-attachments/assets/3bfa7687-2e71-4753-bc53-e3d30d116cc0)


Introduction

"Your Life Calendar" is a web application inspired by a desire to make the most of the time we have left in life. It provides a powerful visualisation of your life in weeks, helping you to appreciate the time you have. By entering your date of birth and an estimated life expectancy, you can see how many weeks you've lived and how many you might have left.

The core philosophy of this project is privacy-first. All calculations are performed directly in your browser. No personal data (like your date of birth) is ever stored, saved, or sent to a server.

Key Features

Life in Weeks Grid: Visualise your entire life on a single screen, with each box representing one week. See your past, present, and future at a glance.
Live Countdown: A real-time countdown to your estimated end date, broken down into days, hours, minutes, and seconds.
Quirky Metrics: Get a unique perspective on your remaining time with unconventional metrics like "Fridays Left," "Birthdays Left," and "Summer Olympics Left."
Inspirational Quotes: Choose from several categories of quotes (Motivational, Stoic, Funny, Brutal) to keep you inspired. Your preference is saved locally for your next visit.
High-Quality PDF Export: Download a print-ready PDF of your full life calendar, perfect for reflection or as a physical reminder.
100% Private: Your dates are only used for in-browser calculations and are immediately gone when you close the tab. The application does not use cookies or tracking services for personal data.

Technology Stack

This project is a modern single-page application built with a focus on performance and a clean user experience.

Framework: [React](https://reactjs.org/)
Language: [TypeScript](https://www.typescriptlang.org/)
Build Tool: [Vite](https://vitejs.dev/)
Styling: [Tailwind CSS](https://tailwindcss.com/)
Date & Time: [Luxon](https://moment.github.io/luxon/) for robust date and time calculations.
PDF Generation: [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/) for client-side PDF creation.
Animations: [Framer Motion](https://www.framer.com/motion/) for smooth, performant animations.
Hosting: Deployed on [Vercel](https://vercel.com/), with analytics provided by Vercel Analytics and Speed Insights.

Getting Started (Local Development)

To run this project on your local machine, follow these steps:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/your-life-calendar.git](https://github.com/your-username/your-life-calendar.git)
    cd your-life-calendar
    ```

2.  Install dependencies:
    This project uses `npm`. Run the following command to install the necessary packages.
    ```bash
    npm install
    ```
    *This will install all dependencies listed in the `package-lock.json` file.*

3.  Run the development server:
    ```bash
    npm run dev
    ```
    *This command starts the Vite development server, typically available at `http://localhost:5173`.*

4.  Available Scripts:
    * `npm run build`: Builds the application for production.
    * `npm run lint`: Lints the code using ESLint to check for errors and style issues.
    * `npm run preview`: Serves the production build locally to preview it.

Contributing

Contributions are welcome! This project is open-source, and we encourage you to help improve it. Whether it's fixing a bug, adding a feature, or improving documentation, your help is appreciated.

To contribute, please follow this workflow:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-amazing-feature`).
3.  Make your changes and commit them (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/your-amazing-feature`).
5.  Open a Pull Request.

Please provide a clear description of the changes in your pull request.

License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
