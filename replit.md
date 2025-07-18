# Mayim Dazzle Polytech - EPDM Rubber Granules Manufacturing

## Overview

This is a modern full-stack web application for Mayim Dazzle Polytech, a subsidiary of MayimDazzle India Private Limited that specializes in manufacturing EPDM rubber granules. The application serves as a company website showcasing their products, services, and company information with a focus on manufacturing excellence and custom solutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for smooth, interactive animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot module replacement with Vite integration

### Design System
- **Component Library**: Custom implementation based on shadcn/ui
- **Theme**: New York style with neutral base colors
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Color System**: CSS custom properties for light/dark mode support
- **Typography**: Inter font family for modern, readable text

## Key Components

### Frontend Components
- **AnimatedHero**: Hero section with floating granule animations
- **AnimatedNavbar**: Responsive navigation with scroll effects
- **ProductShowcase**: Interactive product display with size and color variations
- **CompanyTimeline**: Animated company history timeline
- **ContactForm**: Form with validation and toast notifications
- **ParticleBackground**: Dynamic background effects
- **FloatingGranules**: Animated particle system representing rubber granules

### Backend Components
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Interface**: Abstracted data access layer with in-memory and database implementations
- **Route Registration**: Modular route system for API endpoints
- **Vite Integration**: Development server with hot reload capabilities

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Zod schemas for type-safe data validation
- **Migration System**: Drizzle Kit for database schema management

## Data Flow

### Client-Side Data Flow
1. React components fetch data using TanStack Query
2. API requests go through centralized query client
3. Form data is validated with Zod schemas
4. State updates trigger re-renders with optimistic updates
5. Animations are managed through Framer Motion

### Server-Side Data Flow
1. Express receives HTTP requests
2. Middleware handles logging and error processing
3. Routes process business logic
4. Storage interface abstracts database operations
5. Responses are serialized and sent back to client

### Development Flow
1. Vite dev server handles frontend assets
2. Express serves API routes
3. Hot module replacement updates frontend code
4. Database migrations manage schema changes

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, Lucide React icons
- **Animation**: Framer Motion for component animations
- **Data Fetching**: TanStack Query for server state
- **Validation**: Zod for schema validation
- **Styling**: Tailwind CSS, class-variance-authority for component variants

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: express-session with connect-pg-simple
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Build Tools
- **Vite**: Frontend build tool with React plugin
- **TypeScript**: Type checking and compilation
- **ESBuild**: Fast bundling for production
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite bundles React app into static assets
2. **Backend Build**: ESBuild compiles TypeScript server code
3. **Database Setup**: Drizzle migrations ensure schema compatibility
4. **Asset Optimization**: Vite handles CSS/JS minification and bundling

### Environment Configuration
- **Development**: Hot reload with Vite dev server
- **Production**: Static file serving with Express
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Replit Integration**: Special handling for Replit environment

### File Structure
- **Client**: React application in `client/` directory
- **Server**: Express application in `server/` directory
- **Shared**: Common schemas and types in `shared/` directory
- **Build Output**: Static files in `dist/public/`, server bundle in `dist/`

### Key Features
- **Hot Module Replacement**: Fast development cycles
- **TypeScript**: Full type safety across frontend and backend
- **Responsive Design**: Mobile-first approach with Tailwind
- **Animation System**: Smooth interactions with Framer Motion
- **Database Abstraction**: Flexible storage layer with Drizzle ORM
- **Component Library**: Consistent UI with shadcn/ui components