# Lab Intelligence

A comprehensive educational platform for teaching diagnostic reasoning and laboratory stewardship to clinicians.

## Features

- **Interactive Simulators**: Bayesian updating, Fagan nomogram, ROC curves, PPV/NPV explorer
- **Test Cascade Visualization**: See the impact of unnecessary testing
- **Stewardship Cases**: Practice evidence-based test ordering
- **Learning Modules**: Structured curriculum on diagnostic reasoning
- **Assessment Hub**: Test your knowledge with MCQs and case-based questions
- **Glossary**: Comprehensive reference of key terms
- **Mobile-First**: Responsive design optimized for all devices
- **Dark Mode**: Eye-friendly dark theme enabled by default
- **Offline Capable**: Progressive Web App with offline support

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts and D3.js
- **Routing**: React Router v6
- **State Management**: Zustand
- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa with Workbox

## Educational Content

This platform is designed for:
- Medical students (MS2-MS4)
- Residents and fellows
- Attending physicians
- Laboratory stewards

### Key Topics

1. **Diagnostic Reasoning Foundations**
   - Pre-test and post-test probability
   - Sensitivity, specificity, likelihood ratios
   - Bayesian updating

2. **Test Performance**
   - ROC curves and AUC
   - PPV/NPV vs prevalence
   - Threshold selection

3. **Diagnostic Stewardship**
   - Test cascades and their harms
   - Choosing Wisely principles
   - Evidence-based test ordering

4. **Clinical Decision Support**
   - Diagnostic algorithms
   - Informatics principles
   - Pre-analytic considerations

## Disclaimer

**FOR EDUCATIONAL USE ONLY**

This platform uses synthetic data and is designed for educational purposes only. All test characteristics are based on evidence-based diagnostic literature but should not be used for actual clinical decision-making. Always consult current clinical guidelines and institutional protocols for patient care.

## License

Educational use only. Not for clinical decision-making.
