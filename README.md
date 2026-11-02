# Vasavi Portfolio

A personal portfolio website showcasing my skills, experience, projects, education, and achievements.
##hi
## Project Overview

This repository contains the source code for my portfolio project. It includes a backend REST API built using Node.js, Express.js, TypeScript, PostgreSQL, and Prisma ORM.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| ORM | Prisma ORM |
| Database | PostgreSQL |
| Frontend | React / Vite |
| API Testing | Jest, Supertest |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

## Architecture

The backend follows a layered architecture:

```text
Client Request
     |
     v
   Router
     |
     v
 Controller
     |
     v
   Service
     |
     v
   Prisma ORM
     |
     v
 PostgreSQL
```

## Project Structure

```text
vasavi-portfolio/
├── .github/
│   └── workflows/
│       └── main.yml
├── frontend/
├── prisma/
├── src/
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL, if running the backend locally
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/VASAVIGUPTHA777/vasavi-portfolio.git
cd vasavi-portfolio
npm install
```

Configure the environment variables using `.env.example` as a reference.

**Important:** Never commit actual passwords, API keys, database credentials, or other secrets to GitHub.

### Run the Project

Use the scripts defined in `package.json` to run the application.

Common commands include:

```bash
npm install
npm test
npm run build
```

The available scripts depend on the project's `package.json`.

## Testing

The project includes a test suite using Jest and Supertest.

Run the tests with:

```bash
npm test
```

Build the project with:

```bash
npm run build
```

These commands should be run from the directory containing the relevant `package.json`.

## CI/CD Pipeline Using GitHub Actions

### Objective

The objective of this task is to integrate a Continuous Integration (CI) pipeline with the portfolio project using GitHub Actions.

### Workflow

The pipeline is configured in:

```text
.github/workflows/main.yml
```

The workflow is triggered when code is pushed to the configured GitHub branch.

### Pipeline Stages

1. **Trigger:** A code push starts the workflow.
2. **Build Environment:** GitHub Actions prepares an environment for running the pipeline.
3. **Dependency Installation:** Project dependencies are installed.
4. **Build and Validation:** The workflow executes the configured build or validation commands.
5. **Result:** GitHub Actions reports whether the workflow succeeds or fails.

### Verification

The CI pipeline was tested on **26 October 2026**.

The workflow execution completed successfully, as confirmed by the green check mark displayed on the GitHub Actions run page.

The successful run demonstrates that the configured pipeline executed without errors for that commit.

### Evidence

The following screenshots can be used to demonstrate the CI/CD integration:

- GitHub Actions page showing the `Portfolio CI Pipeline` workflow.
- Workflow run summary showing **Success**.
- Build job showing a green check mark.
- Commit associated with the successful workflow run.

### Continuous Integration vs Continuous Deployment

- **Continuous Integration (CI):** Automatically builds and validates code changes.
- **Continuous Deployment (CD):** Automatically deploys validated changes to the target environment.

The current workflow demonstrates successful CI execution. Automatic deployment should only be claimed if a deployment step is configured and verified.

## Deployment

The portfolio frontend is deployed through Vercel.

GitHub Actions is used to validate code changes through the CI pipeline.

The existing Vercel deployment and the GitHub Actions workflow are separate integrations unless an explicit deployment connection is configured between them.

## Version Control

The project source code is maintained in GitHub.

Repository: https://github.com/VASAVIGUPTHA777/vasavi-portfolio

## Author

**Vanaparthy Vasavi Guptha**

GitHub: https://github.com/VASAVIGUPTHA777
