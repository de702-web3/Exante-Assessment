# Solar Irradiation Dashboard - Exante Assessment

## Overview

This project is a Vue 3 application that visualizes solar irradiation data using a custom gauge chart component. The dashboard displays the percentage of expected solar energy received by solar panels, along with additional information such as the total expected energy and when data collection started.

## Features

- **Custom CSS Gauge Chart**: A pure CSS implementation without SVG or external libraries
- **Responsive Design**: Built with Tailwind CSS for a mobile-first approach
- **Data Visualization**: Shows percentage of expected solar energy received
- **Date Formatting**: Uses Moment.js to format dates in a user-friendly way
- **Loading & Error States**: Provides visual feedback during data loading and error scenarios

## Technologies Used

- **Vue 3**: With Composition API and `<script setup>` syntax
- **TypeScript**: For type safety and better developer experience
- **Vite**: For fast development and optimized production builds
- **Tailwind CSS**: For utility-first styling
- **Tanstack Query (Vue Query)**: For data fetching and state management
- **Moment.js**: For date formatting

## Project Structure

```
/src
  /components
    - GaugeChart.vue        # The custom gauge chart component
  /composables
    - useIrradiationData.ts # Composable for fetching and processing irradiation data
    - usePolicyData.ts      # Composable for policy data
  /data
    - irradiation.json      # Mock data for solar irradiation
    - policies.json         # Mock data for policies
  /typings
    - types.ts              # TypeScript type definitions
  - App.vue                 # Main application component
  - main.ts                 # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Bun (for package management)

### Installation

```bash
# Clone the repository
git clone https://github.com/de702-web3/Exante-Assessment.git
cd Exante-Assessment

# Install dependencies
bun install

# Start the development server
bun dev
```

### Building for Production

```bash
bun run build
```

## Key Components

### GaugeChart.vue

A custom gauge chart component that visualizes the percentage of expected solar energy received. The component features:

- Pure CSS implementation with dynamic styling
- Configurable through props (percentage, title, isLoading, error)
- Responsive design that works across different screen sizes
- Clear visual indicators for different percentage ranges

### useIrradiationData.ts

A composable that fetches and processes solar irradiation data. It provides:

- Loading and error states
- Calculated values for total actual and expected energy
- Formatted date strings using Moment.js
- Percentage calculations for the gauge chart

## License

MIT
