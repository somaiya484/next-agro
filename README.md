# NextAgroHub - Agricultural Management Platform

A comprehensive agricultural management platform built with Next.js, designed for farmers, buyers, experts, and administrators.

## Features

- **Crop Management**: Track crops, manage schedules, and get AI-powered suggestions
- **Market Price Tracking**: Real-time market price analysis and trends
- **Auction System**: Buy and sell agricultural products through auctions
- **Livestock Management**: Manage livestock health, vaccination schedules, and growth
- **Youth Agripreneur Support**: Resources and guidance for young farmers
- **Community Forum**: Connect with other farmers and agricultural experts
- **Admin Panel**: Comprehensive management tools for administrators

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: Dark/Light mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd nextagrohub
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
nextagrohub/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── crops/             # Crop management
│   ├── market/            # Market price tracking
│   ├── auctions/          # Auction system
│   ├── livestock/         # Livestock management
│   ├── youth/             # Youth support
│   ├── forum/             # Community forum
│   ├── admin/             # Admin panel
│   └── layout.js          # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── form-input.js     # Form input component
│   ├── data-table.js     # Data table component
│   ├── theme-toggle.js   # Theme toggle
│   └── ...
└── lib/                  # Utility functions
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### Authentication
- Login and signup pages with role selection
- Support for Farmer, Buyer, Expert, and Admin roles
- NextAuth integration ready

### Crop Management
- Crop calendar and seasonal guides
- Fertilizer and pesticide recommendations
- AI-powered suggestions (placeholder)

### Market Tracking
- Real-time price tables with filtering
- Interactive price charts
- Location and crop-based filtering

### Auction System
- Auction listing cards
- Bidding interface
- Auction history tracking

### Livestock Management
- Livestock profile management
- Vaccination schedule tracking
- Growth monitoring with charts

### Youth Support
- Step-by-step farming guides
- Investment and profit/loss calculators
- Business model suggestions

### Community Forum
- Q&A system with tagging
- Voting and commenting system
- Expert verification

### Admin Panel
- User management
- Content moderation
- System analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
# next-agro-cst
