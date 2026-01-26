# Recipe Keeper - TikTok Recipe Manager

A modern Vue 3 + TypeScript web application for managing and organizing TikTok recipe videos with AI-powered metadata extraction.

## Features

- 🎥 **TikTok Integration**: Fetch recipe metadata directly from TikTok URLs
- 🤖 **AI-Powered Organization**: Automatic title, description, and tag generation using Groq API
- 📅 **Meal Planning**: Set planned dates for recipes and view them in a timeline
- 🏷️ **Tag-Based Filtering**: Organize recipes by custom tags
- 🔍 **Full-Text Search**: Search across titles, descriptions, authors, and tags
- 💾 **Local Storage**: All data is stored locally in the browser
- 🎨 **Beautiful UI**: Responsive design with Tailwind CSS
- 📱 **Gallery & Timeline Views**: Two different ways to browse your recipes

## Tech Stack

- **Frontend Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **AI API**: Groq (LLaMA 3.1)

## Project Structure

```
src/
├── components/          # Vue components
│   ├── Header.vue
│   ├── RecipeCard.vue
│   ├── RecipeModal.vue
│   ├── ViewRecipeModal.vue
│   ├── GalleryView.vue
│   ├── TimelineView.vue
│   └── ...
├── composables/         # Vue composables for state management
│   ├── useRecipes.ts
│   └── useAiSettings.ts
├── services/            # API and business logic
│   └── aiService.ts
├── utils/               # Utility functions
│   └── dateUtils.ts
├── App.vue              # Root component
├── main.ts              # Entry point
└── style.css            # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Configuration

### AI Settings

To use AI-powered recipe organization:

1. Get a free API key from [Groq Console](https://console.groq.com)
2. Click the AI Settings button in the app header
3. Enter your API key and enable the feature

Your API key is stored locally and only sent to Groq's servers.

## Data Storage

- **Recipes**: Stored in browser's localStorage under `tiktokRecipes`
- **AI Settings**: Stored in browser's localStorage under `groqApiKey` and `aiEnabled`
- All data remains on your device - no cloud sync

## Component Architecture

### Key Components

- **Header**: Navigation and search bar
- **RecipeCard**: Individual recipe display in gallery view
- **RecipeModal**: Add/Edit recipe dialog
- **ViewRecipeModal**: View recipe details
- **GalleryView**: Grid view of recipes
- **TimelineView**: Timeline view of planned recipes
- **TimelineSection & TimelineCard**: Timeline organization

### Composables

- **useRecipes**: Recipe state management and CRUD operations
- **useAiSettings**: AI configuration management

### Services

- **aiService**: TikTok metadata fetching, AI processing, and tag suggestions
- **dateUtils**: Date formatting and comparison utilities

## Features in Detail

### Recipe Management

- Add recipes from TikTok URLs with auto-metadata extraction
- Edit recipe details including title, description, and tags
- Delete recipes with confirmation
- View comprehensive recipe details

### AI-Powered Features

- Automatic title cleaning and formatting
- Description extraction and organization
- Smart tag generation based on recipe content
- Groq LLaMA 3.1 integration for natural language processing

### Planning Features

- Set "Plan to Cook" dates for recipes
- View planned recipes in a beautiful timeline
- Categorize by: Today, Tomorrow, This Week, Coming Up, Past
- Quick date formatting and status indicators

### Search & Filter

- Real-time search across all recipe fields
- Tag-based filtering
- Multi-filter support
- Case-insensitive matching

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
