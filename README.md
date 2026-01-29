# Wiremi Business Platform

**Financial Operating System for Modern Business**

## Overview

The Wiremi Business Platform is a comprehensive financial management solution designed for businesses of all sizes. This standalone Next.js application provides everything a business needs to manage finances, payments, payroll, and operations through a single unified interface.

## Features

### 💰 Core Financial Services
- **Multi-Currency Wallets** - Manage funds in 40+ currencies
- **Payment Processing** - Accept and send payments globally
- **Currency Exchange** - Real-time exchange rates and conversions
- **Transaction Management** - Complete transaction history and tracking

### 💳 Business Modules (15+)

1. **Corporate Cards** - Virtual and physical business cards
2. **Invoicing & Billing** - Create, send, and track invoices
3. **Escrow Services** - Secure transaction escrow
4. **Crowdfunding (Seedli)** - Capital raising platform
5. **HR & Payroll** - Employee management and automated payroll
6. **Education Management** - Institution fee management
7. **Fitness Management** - Gym and fitness center operations
8. **Hospitality** - Hotel and property management
9. **Event Ticketing** - Event management and ticket sales
10. **Loyalty & Rewards** - Customer loyalty programs
11. **Add-ons Marketplace** - Extend functionality
12. **AI Insights** - Predictive analytics and recommendations
13. **Payouts** - Vendor and bulk payments
14. **Team Management** - User roles and permissions
15. **Reports & Analytics** - Custom business intelligence

### 🎨 User Experience
- **Apple Design System** - Clean, modern, minimalist interface
- **Dark/Light Themes** - Full theme support
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - Live data synchronization

### 🔐 Security & Compliance
- **Bank-Grade Security** - Enterprise-level encryption
- **2FA/MFA** - Multi-factor authentication
- **KYB Verification** - Business verification process
- **Compliance** - Regulatory compliance built-in

## Tech Stack

- **Framework**: Next.js 16.1+ (App Router)
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 4.1+
- **UI Components**: Custom component library
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks

## Project Structure

```
wiremi-business-platform/
├── app/
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── cards/        # Corporate cards module
│   │   ├── invoicing/    # Invoicing module
│   │   ├── escrow/       # Escrow services
│   │   ├── crowdfunding/ # Crowdfunding platform
│   │   ├── hr/           # HR & Payroll
│   │   ├── education/    # Education management
│   │   ├── fitness/      # Fitness management
│   │   ├── hospitality/  # Hotel management
│   │   ├── events/       # Event ticketing
│   │   ├── loyalty/      # Loyalty programs
│   │   ├── wallets/      # Multi-currency wallets
│   │   ├── payments/     # Payment processing
│   │   ├── transactions/ # Transaction history
│   │   ├── payouts/      # Vendor payouts
│   │   ├── team/         # Team management
│   │   └── ...
│   ├── signin/           # Authentication
│   ├── signup/           # Registration
│   ├── onboarding/       # Business onboarding
│   ├── dashboard/        # Main dashboard
│   └── ...
├── components/           # Reusable components
│   ├── layout/          # Layout components
│   ├── ui/              # UI primitives
│   ├── education/       # Education-specific components
│   └── loyalty/         # Loyalty-specific components
├── lib/                 # Utilities and services
│   ├── mock-data/       # Development mock data
│   ├── services/        # API services
│   └── utils.ts         # Helper functions
└── types/               # TypeScript definitions

```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository (once you've pushed to GitHub):
```bash
git clone [YOUR_BUSINESS_GITHUB_URL]
cd wiremi-business-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Access

```
Business Login: demo@business.com
Admin Login: Available on separate admin platform
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.wiremi.com
NEXT_PUBLIC_API_KEY=your_api_key

# Authentication
NEXT_PUBLIC_AUTH_URL=https://auth.wiremi.com

# Payment Processors
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
NEXT_PUBLIC_FLUTTERWAVE_KEY=your_flutterwave_key

# Currency API
NEXT_PUBLIC_CURRENCY_API_KEY=your_currency_api_key

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_INSIGHTS=true
NEXT_PUBLIC_ENABLE_MULTI_CURRENCY=true
NEXT_PUBLIC_ENABLE_CROWDFUNDING=true

```

## Module Configuration

### Enabling/Disabling Modules

Modules can be enabled/disabled per business through the admin platform or via configuration:

```typescript
// lib/config/modules.ts
export const AVAILABLE_MODULES = {
  cards: true,
  invoicing: true,
  escrow: true,
  crowdfunding: true,
  hr: true,
  education: false,  // Disabled for this business
  fitness: false,
  hospitality: false,
  events: true,
  // ... more modules
}
```

## Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

### Custom Domain Configuration

```
Production: business.wiremi.com
Staging: staging-business.wiremi.com
Development: localhost:3000
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Customization

### Branding

Update branding in `app/globals.css`:

```css
@theme {
  --color-primary-500: #2D7EF7;  /* Your brand color */
  --color-primary-600: #1E5EDD;
  /* ... more theme colors */
}
```

### Logo

Replace logo in `components/layout/Sidebar.tsx`

## API Integration

The platform is ready for API integration. Mock data is currently used for development.

### Example API Call

```typescript
// lib/services/api.ts
export async function fetchTransactions() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
```

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## Performance

- **Core Web Vitals** optimized
- **Image optimization** with Next.js Image
- **Code splitting** automatic
- **Lazy loading** for modules
- **Cache strategies** implemented

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Support

Fully responsive design optimized for:
- iOS (Safari)
- Android (Chrome)
- Tablets

## Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For platform support:
- Email: support@wiremi.com
- Documentation: https://docs.wiremi.com
- Status: https://status.wiremi.com

## Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced AI insights
- [ ] Mobile native apps
- [ ] API marketplace
- [ ] White-label solutions

## License

Proprietary - Wiremi Team © 2026

---

**Business Platform** | Separate from Admin | Independent Deployment
