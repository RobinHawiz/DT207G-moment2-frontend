# DT207-moment2-frontend

A TypeScript frontend for managing personal work experiences via a RESTful CRUD API.

---

## 🧱 Project Structure

The `ts/` folder contains all TypeScript source files, organized by page and responsibility:

```
.
└── src/
    └── ts/
        ├── about/       → About page-specific logic and styling
        ├── add/         → Add page-specific logic and styling
        ├── edit/        → Edit page-specific logic and styling
        ├── home/        → Homepage-specific logic and styling
        ├── types/       → Shared type aliases
        └── utils/       → Reusable utilities and helper functions
            ├── api/     → API communication modules
            ├── dom/     → DOM-related utilities
            ├── error/   → Error handlers and type guards
            └── ui/      → UI behavior utilities
```
