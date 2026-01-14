# Bashkeveprimi - Humanitarian Organization Website

A modern, responsive website for Bashkeveprimi, a humanitarian organization in Kosovo dedicated to supporting families, orphans, and communities in need.

## 📚 Documentation

- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - Complete project overview, features, and Django backend specifications
- **[DJANGO_BACKEND_SETUP.md](./DJANGO_BACKEND_SETUP.md)** - Step-by-step guide for setting up the Django backend

## 🌟 Features

### Current Implementation
- **Home Page**: Dynamic slider showcasing active causes, organization features, and donation progress
- **Orphans & Projects Pages**: Regional impact stories (Ferizaj, Gjilan, Prishtina)
- **About Us**: Organization information, statistics, video content, and contact form
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, accessible, and user-friendly interface

### Key Components
- Auto-rotating cause slider
- Progress bars for donation tracking
- Contact form with validation
- Video showcase sections
- Regional project displays
- Organization statistics dashboard

## 💻 Technology Stack

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS v4.1.17
- **Routing**: React Router DOM 7.9.6
- **Node Version**: 22.12.0 (managed via nvm)
- **Dev Server Port**: 5175 (configurable in `vite.config.ts`)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v22.12.0 or higher
- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) - recommended for version management
- npm (comes with Node.js)

## 🚀 Getting Started

### 1. Install Node.js via nvm

```bash
# Install and use the correct Node.js version
nvm install
nvm use
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will run on **http://localhost:5175**

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, videos
├── components/      # React components
├── constants/       # Router and menu configurations
├── pages/           # Page components
├── utils/           # Utility functions
├── App.tsx          # Root component
├── main.tsx         # Application entry point
└── index.css        # Global styles (Tailwind)
```

## 🔧 Configuration

### Port Configuration

The development server runs on port 5175 by default. To change it, edit `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // Change to desired port
  },
})
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 🌐 Backend Integration

This frontend is designed to work with a Django backend. See the documentation files for complete backend setup:

- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - API endpoints, data models, and specifications
- **[DJANGO_BACKEND_SETUP.md](./DJANGO_BACKEND_SETUP.md)** - Complete Django setup guide

## 🎨 Customization

### Tailwind CSS

Styles are managed through Tailwind CSS v4. The configuration is handled through the Vite plugin. Custom utilities are defined in `src/index.css`.

### Theme Colors

Main brand colors used throughout the application:
- Primary: `#00CFD0` (Turquoise)
- Secondary: `#00A5A6` (Dark Turquoise)
- Accent: `#088B8C` (Deep Turquoise)
- Background: `#F3F2E7` (Cream)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Branch Structure
- `main` - Production-ready code
- `develop` - Active development branch (current)

### Code Quality
- TypeScript strict mode enabled
- ESLint configured for React and TypeScript
- Consistent code formatting

## 🐛 Known Issues

- Requests page is currently under development (empty page)

## 📞 Contact

**Organization**: Bashkeveprimi  
**Location**: Gjilan, Kosovo  
**Email**: bashkeveprimi@gmail.com  
**Phone**: +383 048 225 402

## 📄 License

This project is proprietary software developed for Bashkeveprimi organization.

---

**Note**: For detailed project specifications, API documentation, and backend setup instructions, please refer to the documentation files listed above.
