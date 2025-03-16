# Stack AI Integrations

![Stack AI Logo](https://www.stack-ai.com/_next/static/media/stack.77c3de30.svg)  
_A modern integration platform built with Next.js, TailwindCSS, and ShadCN/ui to showcase Stack AI's integrations._

Welcome to the **Stack AI Integrations** project! This application provides a beautiful and intuitive interface to explore and interact with Stack AI's integrations. It features dynamic pages for integrations and their actions, leveraging real-time data from Stack AI APIs.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Install Dependencies](#step-2-install-dependencies)
  - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
  - [Step 4: Run the Development Server](#step-4-run-the-development-server)
- [Usage](#usage)
  - [Step 1: Navigate the Homepage](#step-1-navigate-the-homepage)
  - [Step 2: Explore Integration Detail Page](#step-2-explore-integration-detail-page)
  - [Step 3: View Action Detail Page](#step-3-view-action-detail-page)
  - [Step 4: Refresh Data](#step-4-refresh-data)
- [Sitemap and SEO](#sitemap-and-seo)
- [Contact](#contact)

---

## Overview

This project is a Next.js application designed to display Stack AI's integrations in a user-friendly manner. It includes:

- A homepage listing all available integrations.
- Detailed pages for each integration, showing metadata and actions.
- Action-specific pages with input/output parameter details.
- SEO optimization with a sitemap and robots.txt.

The design is inspired by Stack AI's product aesthetic, featuring a purple and gray color scheme, card-based layouts, and smooth transitions.

---

## Features

- Dynamic Integration List: Fetches and displays integrations from https://stack-us-east-1.onrender.com/connections/available.
- Detailed Integration Pages: Shows metadata and actions from https://stack-us-east-1.onrender.com/tools/stackai (with Authorization Bearer token).
- Action Details: Displays input and output parameters for each action.
- Data Refresh: Allows manual refresh of API data with loading states.
- SEO Optimization: Includes sitemap, robots.txt, and meta tags for search engine visibility.
- Responsive Design: Works seamlessly on desktop, tablet, and mobile devices.
- Beautiful UI: Utilizes TailwindCSS and ShadCN/ui for a modern, intuitive interface.

---

## Technologies

- Framework: Next.js (v15+ with App Router)
- Styling: TailwindCSS for utility-first CSS
- UI Components: ShadCN/ui for reusable components
- HTTP Requests: Axios or native fetch for API calls
- Type Safety: TypeScript
- APIs: Stack AI endpoints (/connections/available and /tools/stackai)
- SEO: Dynamic sitemap and robots.txt generation and metadata generation for each page

---

## Setup

### Step 1: Clone the Repository

git clone https://github.com/your-username/stack-ai-integrations.git
cd stack-ai-integrations

### Step 2: Install Dependencies

npm install

# or

yarn install

### Step 3: Configure Environment Variables

Create a .env.local file in the root directory and add the following:
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_TOKEN=YOUR_API_TOKEN_HERE # Replace with your Stack AI API token

### Step 4: Run the Development Server

npm run dev

Open http://localhost:3000 in your browser.

---

## Usage

### Step 1: Navigate the Homepage

Visit /integrations to view a grid of all integrations. Click an integration card to see details.

### Step 2: Explore Integration Detail Page

Navigate to /integrations/[id] (e.g., /integrations/airtable) to explore metadata and actions for a specific integration. Use the "Refresh Data" button to update the data.

### Step 3: View Action Detail Page

Click an action on the integration detail page to navigate to /integrations/[id]/[actionId] (e.g., /integrations/linkedin/linkedin_search) and view detailed information about the action, including input and output parameters.

### Step 4: Refresh Data

Click the "Refresh Data" button on any page to fetch the latest data from the Stack AI APIs. A loading state will be displayed during the refresh.

---

## Sitemap and SEO

- Sitemap: A dynamic sitemap is generated at /sitemap.xml, including all integrations and actions. Submit this to search engines like Google Search Console for indexing.
- Robots.txt: Located at /robots.txt, it allows all crawlers and points to the sitemap.
- Metadata: Each page includes SEO-friendly meta tags (title, description, keywords, Open Graph tags) for better search engine visibility.

## Contact

- Author: [Aman Kumar Bairagi](mailto:amanbairagi1089@gmail.com)
