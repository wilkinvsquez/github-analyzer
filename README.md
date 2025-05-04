# 📊 GitHub Analyzer

GitHub Analyzer is a modern, responsive dashboard built with **Next.js** and **Tailwind CSS** that allows you to visualize and filter data from any GitHub user. It fetches public repositories, aggregates statistics, and presents insights such as:

-   Most used languages (pie chart)
-   Top repositories by stars, forks, and commits
-   Filterable and searchable list of repositories

---

## 🎯 Purpose

This project was built as a practical showcase for:

-   Learning and demonstrating full-stack data visualization using the GitHub REST API
-   Practicing advanced React/Next.js patterns with hooks, props, and dynamic filtering
-   Highlighting frontend best practices for component design, responsiveness, and UX
-   Building a strong portfolio project to demonstrate skills in interviews

---

## 🛠️ Technologies Used

| Technology       | Reason                                                          |
| ---------------- | --------------------------------------------------------------- |
| **Next.js**      | For server-side rendering, routing, and SEO-friendly pages      |
| **TypeScript**   | Type safety for better developer experience and maintainability |
| **Tailwind CSS** | For fast, utility-first styling and responsiveness              |
| **Recharts**     | To create clean, responsive data visualizations (charts)        |
| **GitHub API**   | To retrieve public data and statistics for GitHub users         |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/github-analyzer.git
cd github-analyzer
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your GitHub API token:

```bash
GITHUB_TOKEN=your_github_token
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Explore the application

You can search for any GitHub user and explore their repositories, view statistics, and filter the data as needed.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📚 Documentation

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [Recharts Documentation](https://recharts.org/en-US/)
-   [GitHub API Documentation](https://docs.github.com/en/rest)
-   [TypeScript Documentation](https://www.typescriptlang.org/docs/)
-   [React Documentation](https://reactjs.org/docs/getting-started.html)
-   [GitHub API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
-   [GitHub API Authentication](https://docs.github.com/en/rest/guides/basics-of-authentication)
-   [GitHub API Search Repositories](https://docs.github.com/en/rest/search#search-repositories)
-   [GitHub API Repositories](https://docs.github.com/en/rest/reference/repos)
-   [GitHub API Users](https://docs.github.com/en/rest/reference/users)
-   [GitHub API Rate Limit](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
-   [GitHub API GraphQL](https://docs.github.com/en/graphql)
-   [GitHub API REST](https://docs.github.com/en/rest)
