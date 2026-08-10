# Bundle Builder - Wyze Camera System By Rana Nassar

A modern, interactive bundle builder for configuring and purchasing Wyze security camera systems. Built with Next.js, React, TypeScript, and Ant Design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation & Running

1. **Clone the repository**
```bash
git clone https://github.com/RanaNassar-WD/bundle-builder-rana-nassar.git
cd bundle-builder-rana-nassar
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## ✨ Features Implemented

### Core Functionality
- ✅ **Multi-step Bundle Builder**
  - Camera selection with color variants and quantities
  - Plan selection (Cam Unlimited with shipping)
  - Sensor selection with quantities
  - Extras/Review step with full summary

- ✅ **Dynamic Data Loading**
  - Camera options served from JSON (`/cameraOptions.json`)
  - Sensor options served from JSON (`/sensorOption.json`)
  - Fetched from GitHub raw URLs for production deployment

- ✅ **Collapsible Step Navigation**
  - Expandable/collapsible sections for each step
  - Visual feedback for completed steps
  - Sequential navigation with "Next" buttons

- ✅ **Real-time Summary Panel**
  - Live price calculations
  - Selected items display with thumbnails
  - Quantity adjustments from summary
  - Total price with discounts

- ✅ **Save for Later**
  - LocalStorage persistence
  - Automatic restoration on page load
  - Serializable state management (excludes React components)
  - Works seamlessly with async JSON data loading

### Technical Features
- ✅ **TypeScript** - Full type safety
- ✅ **Responsive Design** - Mobile-friendly layout
- ✅ **Ant Design Components** - Collapse, Message notifications
- ✅ **Tailwind CSS** - Custom styling with design tokens
- ✅ **State Management** - React hooks and local state
- ✅ **Error Handling** - Graceful failures with user feedback

## 🏗️ Technical Decisions & Tradeoffs

### Architecture Decisions

1. **JSON Data Source**
   - **Decision**: Serve product data from static JSON files in `/public`
   - **Rationale**: Simplicity, easy updates, no backend required for demo
   - **Tradeoff**: Not suitable for dynamic inventory management
   - **Future**: Could be replaced with API endpoints

2. **GitHub Raw URLs for Production**
   - **Decision**: Fetch from GitHub raw URLs in production
   - **Rationale**: Works immediately after deployment, acts as CDN
   - **Alternative**: Could use `/public` for local development

3. **LocalStorage for Save Feature**
   - **Decision**: Use browser localStorage for "Save for Later"
   - **Rationale**: Simple, no backend needed, instant persistence
   - **Tradeoff**: Data is device-specific, not synced across devices
   - **Future**: Could integrate with backend/database for cross-device sync

4. **State Initialization Pattern**
   - **Decision**: Separate initial saved selections from current selections
   - **Rationale**: Prevents async data loading from overwriting saved state
   - **Implementation**: Use `isInitialized` flag to control when data is restored

5. **Component Structure**
   - **Decision**: Separate components for each step (Camera, Plan, Sensor, Extras)
   - **Rationale**: Maintainability, reusability, clear separation of concerns
   - **Benefit**: Each step manages its own state independently

### Design Tradeoffs

1. **SVG Icons in JSON**
   - **Issue**: Icons are React components, not JSON-serializable
   - **Solution**: Exclude icons from saved state, reconstruct on load
   - **Impact**: Icons rendered client-side, minimal performance impact

2. **Single Plan Option**
   - **Current**: Only one plan (Cam Unlimited) available
   - **Rationale**: Matches design requirements
   - **Future**: Easy to extend for multiple plans

3. **Quantity Management**
   - **Decision**: Allow quantity adjustment both in-step and in summary
   - **Benefit**: Flexible UX, user can adjust from either location
   - **Sync**: Changes propagate through shared state

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main bundle builder page
├── components/
│   └── builder/
│       ├── CameraSelector.tsx    # Step 1: Camera selection
│       ├── PlanSelector.tsx      # Step 2: Plan selection
│       ├── SensorSelector.tsx    # Step 3: Sensor selection
│       ├── ExtrasSelector.tsx    # Step 4: Review & extras
│       ├── SummaryPanel.tsx      # Right-side summary panel
│       └── StepsHeader.tsx       # Steps progress indicator
├── types/
│   └── builder.ts          # TypeScript interfaces
└── styles/
    └── globals.css         # Global styles & Tailwind

public/
├── cameraOptions.json      # Camera product data
├── sensorOption.json       # Sensor product data
└── assets/                 # Images and icons
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS Variables** in `globals.css` for design tokens
- **Ant Design** components with custom theme overrides
- **Responsive Grid** layout (1 column mobile, 3 columns desktop)

## 🔧 Technologies Used

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **UI Library**: React 19+
- **Component Library**: Ant Design 5.x
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser LocalStorage
- **Linting**: ESLint
- **Package Manager**: npm/yarn/pnpm

## ✅ Completed Features

All requirements have been implemented:
- ✅ Multi-step bundle configuration
- ✅ Dynamic product loading from JSON
- ✅ Real-time price calculations
- ✅ Quantity management
- ✅ Color variant selection
- ✅ Responsive design
- ✅ Save for later functionality
- ✅ Loading states and error handling
- ✅ Clean, maintainable code structure

## 🚀 Deployment

The app is deployed and can be accessed at:
- **GitHub Repository**: [bundle-builder-rana-nassar](https://github.com/RanaNassar-WD/bundle-builder-rana-nassar)
- **JSON Data**: Served from GitHub raw URLs

## 📝 Notes

- The application fetches product data asynchronously to simulate real-world API usage
- Save functionality persists across page refreshes but is device-specific
- All prices and discounts are calculated dynamically based on selections
- The app gracefully handles missing or invalid data
