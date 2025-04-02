# WeWantWaste Code Challenge

A modern, responsive UI for a skip rental service built with React, TypeScript, and TailwindCSS featuring a sleek dark theme design.

![WeWantWaste UI Screenshot](https://github.com/Ambitious905837/WeWantWaste-challenge/blob/master/src/assets/Screenshot_173.png?text=WeWantWaste+Code+Challenge+UI)

## 🌟 Features

- **Beautiful Dark Theme** - Sleek dark mode interface with vibrant accent colors
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop views
- **Interactive Skip Cards** - Vibrant, color-coded cards with smooth animations
- **Visual Feedback** - Intuitive visual cues for selected states and interactions
- **Step Navigation** - Multi-step booking process with progress visualization

## 🎨 Design Approach

The design approach was focused on transforming a functional but basic UI into a visually engaging and modern experience while maintaining the original functionality. The design evolution followed these principles:

### Initial State

The original design used:
- Basic dark background colors
- Limited visual feedback for interactive states
- Minimal animation effects
- Uniform styling across different card types
- Standard navigation indicators

### Design Principles

The redesign applied the following principles:

1. **Enhanced Visual Hierarchy** - Making important elements more prominent
2. **Micro-interactions** - Adding subtle animations and transitions for better feedback
3. **Color Psychology** - Using color strategically to create intuitive interfaces
4. **Frosted Glass Effects** - Adding depth and modern aesthetics
5. **Consistent Component Language** - Creating a unified design system

### Key Improvements

#### Color System
- Replaced flat black backgrounds with rich slate gradients
- Introduced a comprehensive color palette with primary and secondary colors
- Added dynamic card colorization based on skip size
- Enhanced selection states with color-matched highlights

#### Visual Effects
- Implemented frosted glass effects for elevated surfaces
- Added subtle background gradients and lighting effects
- Improved shadows and glows for interactive elements
- Enhanced borders with better contrast and state indicators

#### Animations & Interactions
- Added shimmer effects for buttons and selection states
- Implemented staggered loading animations for cards
- Created smooth micro-interactions for hover/active states
- Enhanced selection feedback with multiple visual indicators

#### Component Design
- Redesigned cards with better information hierarchy
- Enhanced the footer with frosted glass and status indicators
- Redesigned the navigation with clearer visual progression
- Improved loading, error, and empty states

#### Typography & Spacing
- Implemented better font hierarchy and spacing
- Enhanced readability with improved contrast
- Added gradient text effects for headings
- Better whitespace management

These design improvements create a premium, engaging experience while maintaining all the functionality of the original design.

## 🔧 Technologies

- **React** - UI component library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful, consistent icon set

## 🧱 Component Structure

The UI consists of the following key components:

- **App** - Main container component
- **NavigationBar** - Step navigation with progress indicators
- **SkipSelection** - Grid display of available skips
- **SkipCard** - Individual skip card with selection capability
- **Footer** - Fixed bottom bar with pricing and actions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/ambitious905837/WeWantWaste-challenge.git
cd WeWantWaste-challenge
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev -- --host
```

4. Open your browser

```
http://localhost:5173
```

## 💅 Customization

### Modifying Colors

The color scheme can be customized in the `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Blues
          50: '#eff6ff',
          100: '#dbeafe',
          // ...
          500: '#3b82f6',
          // ...
          900: '#1e3a8a',
        },
        secondary: {
          // Purples
          50: '#f5f3ff',
          100: '#ede9fe',
          // ...
          500: '#8b5cf6',
          // ...
          900: '#4c1d95',
        },
        slate: {
          // Dark theme base colors
          // ...
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
};
```

### Skip Card Styling

The SkipCard component uses a dynamic color system based on the skip size:

```typescript
// Generate a unique color based on skip size
const getSkipColor = (size: number) => {
  const colors = [
    { bg: 'from-blue-600/20 to-blue-800/30', text: 'text-blue-400', accent: 'blue-500', border: 'border-blue-500/50' },
    { bg: 'from-purple-600/20 to-purple-800/30', text: 'text-purple-400', accent: 'purple-500', border: 'border-purple-500/50' },
    // Additional color schemes...
  ];
  return colors[size % colors.length];
};
```

You can customize these color schemes in the SkipCard component to match your brand.

## 🏗️ Project Structure

```
skip-rental-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── NavigationBar.tsx
│   │   ├── SkipCard.tsx
│   │   └── SkipSelection.tsx
│   ├── types.ts
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── tailwind.config.js
└── README.md
```

## 📱 Responsive Behavior

The UI adapts to different screen sizes:

- **Mobile (< 768px)**: Single column layout with specialized mobile footer
- **Tablet (768px - 1024px)**: Two-column grid of skip cards
- **Desktop (> 1024px)**: Three-column grid with enhanced footer layout