# Neuland Next Landing Page & Documentation

## 🚀 Features

- ⚡️ Next.js 15 with Turbopack for lightning-fast development
- 🌐 Internationalization support with next-intl
- 🎨 Modern UI components with shadcn/ui
- 🎭 Beautiful animations with Framer Motion
- 📱 Fully responsive design
- 📝 MDX support for content
- 🎯 TypeScript for type safety
- 🛠 Biome for linting and formatting

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Documentation:** Nextra
- **Linting/Formatting:** Biome
- **Search:** Pagefind

## 🏗️ Project Structure

```
src/
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── content/      # MDX content
├── lib/          # Utility functions and configurations
├── localization/ # Internationalization files
└── types/        # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Bun (for package management)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neuland.app-docs.git
   cd neuland.app-landing-page
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:3000`.

## 📝 Available Scripts

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run Biome linter
- `bun run fmt` - Format code with Biome
- `bun run fmt:unsafe` - Format code with Biome (including unsafe fixes)

## 🐳 Docker Support

The project includes a Dockerfile for containerized deployment. To build and run the Docker container:

```bash
docker build -t neuland-landing-page .
docker run -p 3000:3000 neuland-landing-page
```
