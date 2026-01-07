# SchemaCanvas

Generate ERD dari MySQL/PostgreSQL secara cepat dan rapi dengan UI modern.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (New York style)
- **Diagram**: React Flow (@xyflow/react)
- **State Management**: Zustand
- **Toast**: Sonner

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page (/)
│   ├── connect/page.tsx          # Database connection form (/connect)
│   ├── erd/page.tsx              # ERD Viewer (/erd)
│   ├── privacy/page.tsx          # Privacy Policy (/privacy)
│   ├── terms/page.tsx            # Terms of Service (/terms)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── erd/                      # ERD-specific components
│   │   ├── table-node.tsx        # React Flow node untuk tabel
│   │   ├── sidebar-navigator.tsx # Sidebar dengan search & tree view
│   │   ├── viewer-toolbar.tsx    # Toolbar zoom/fit/reset
│   │   ├── erd-canvas.tsx        # Main React Flow canvas
│   │   ├── empty-state.tsx       # Empty state component
│   │   ├── loading-state.tsx     # Loading skeleton
│   │   └── index.ts              # Barrel export
│   │
│   ├── layout/                   # Layout components
│   │   ├── header.tsx            # Site header/navbar
│   │   ├── footer.tsx            # Site footer
│   │   └── index.ts              # Barrel export
│   │
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── tabs.tsx
│       └── ...
│
├── lib/
│   ├── schema/                   # Schema processing
│   │   ├── mock-data.ts          # Mock schema untuk demo
│   │   ├── parser.ts             # Schema parser & node/edge builder
│   │   └── index.ts              # Barrel export
│   │
│   ├── store/                    # State management
│   │   └── erd-store.ts          # Zustand store untuk ERD state
│   │
│   └── utils.ts                  # Utility functions (cn, etc)
│
├── types/
│   └── schema.ts                 # TypeScript types untuk schema, ERD, dll
│
├── constants/
│   └── index.ts                  # App constants (dialects, ports, etc)
│
└── public/                       # Static assets
```

## Features

### Landing Page (/)

- Hero section dengan value proposition
- Feature highlights
- CTA ke /connect

### Connect Page (/connect)

- Form input: host, port, username, password, database, SSL
- Tab untuk connection URL
- Test connection (mock)
- Generate ERD button
- Security notice

### ERD Viewer (/erd)

- Interactive diagram dengan React Flow
- Draggable table nodes
- Sidebar navigator dengan search
- Click to focus/highlight
- Zoom controls & minimap
- Reset layout

### Legal Pages

- Privacy Policy (/privacy)
- Terms of Service (/terms)

## Security Checklist

✅ **DO:**

- Process credentials in-memory only
- Use SSL connections
- Clear credentials after use
- Show security notices to users

❌ **DON'T:**

- Store passwords in localStorage
- Log credentials to console
- Send credentials to analytics
- Persist credentials to disk

## Hook Points untuk Backend

File `lib/schema/parser.ts` berisi hook points untuk integrasi backend:

```typescript
// Fetch schema dari API
export async function fetchSchemaFromAPI(
  connectionId: string
): Promise<DatabaseSchema>;

// Test koneksi database
export async function testConnection(
  config: ConnectionConfig
): Promise<TestResult>;
```

## Mock Schema Format

```json
{
  "tables": [
    {
      "name": "users",
      "columns": [
        { "name": "id", "type": "uuid", "pk": true },
        { "name": "email", "type": "varchar", "unique": true }
      ]
    }
  ],
  "relations": [
    {
      "fromTable": "orders",
      "fromColumn": "user_id",
      "toTable": "users",
      "toColumn": "id",
      "type": "many-to-one"
    }
  ]
}
```

## Demo Mode

Akses `/erd?demo=true` untuk melihat ERD dengan mock schema.

## License

MIT
