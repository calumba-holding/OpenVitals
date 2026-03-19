# OpenVitals Style Guide

Design system and interface guidelines for the OpenVitals web application.

---

## Typeface pairing

Three font families, each with a strict role. Never swap roles.

| Role | Family | CSS variable | Weights | Use for |
|---|---|---|---|---|
| **Display** | Source Serif 4 | `var(--font-display)` | 400–700 | Page titles, section headings, hero text, metric card values, insight titles. Italic style for emphasis words in headlines. |
| **Body** | DM Sans | `var(--font-body)` | 300–600 | Labels, descriptions, navigation, buttons, body text, form fields, card descriptions. This is the default — `<body>` inherits it. |
| **Data** | IBM Plex Mono | `var(--font-mono)` | 400–600 | Numeric values, units, timestamps, confidence scores, LOINC codes, parser versions, provenance metadata, file names, technical labels. |

### Type scale

| Token | Size | Weight | Font | Tracking | Use |
|---|---|---|---|---|---|
| Display | 32px | 500 | Display | -0.03em | Hero headlines, page titles |
| Heading 1 | 24px | 500 | Display | -0.02em | Section headings |
| Heading 2 | 18px | 500 | Display | -0.015em | Sub-section headings |
| Heading 3 | 15px | 550 | Body | 0 | Card titles, sidebar group labels |
| Body | 14px | 400 | Body | 0.005em | Descriptions, paragraphs |
| Small | 13px | 400 | Body | 0.005em | Secondary text, links, button text |
| Data value | 16px | 600 | Mono | -0.01em | Lab values, metric numbers |
| Data label | 12px | 400 | Mono | 0.02em | Units, LOINC codes, confidence |
| Caption | 11px | 500 | Mono | 0.03em | Parser versions, timestamps |
| Overline | 10–11px | 600 | Mono | 0.04–0.06em | Section labels, uppercase tags |

### Typography rules

- Apply font families via inline `style={{ fontFamily: 'var(--font-<role>)' }}` since Tailwind v4 font-family utilities reference CSS variables that aren't always available as standard utilities.
- Use `tabular-nums` (via the `.tabular-nums` utility class) on all numeric data to maintain column alignment.
- Italic serif (`fontStyle: 'italic'`) is reserved for emphasis words in hero headlines. Never use italic for body text or data.
- Primary text color is `text-neutral-900` (#141414). Never use true black (#000000).

---

## Color system

### Primary — Ultramarine Blue (`accent-*`)

The trust anchor. Used for interactive elements, active states, primary actions, links, AI identity, and chart accents. **Never used for health status indicators.**

| Token | Hex | Use |
|---|---|---|
| `accent-50` | #EEF1FF | Hover backgrounds, focus rings |
| `accent-100` | #D6DCFF | Focus ring outer, selection bg |
| `accent-200` | #B0BAFF | Badge borders, link hovers |
| `accent-500` | #3162FF | Primary actions, AI avatar, links, ring color |
| `accent-600` | #2750D9 | Emphasis text, "Learn more" links, buttons |
| `accent-700` | #1D3DB3 | Gradient end, strong emphasis |

Logo uses a gradient: `linear-gradient(135deg, #3162FF, #1D3DB3)`.

### Secondary — Lavender (`secondary-*`)

Soft surfaces for elevation and provenance metadata. Creates visual depth without competing with blue.

| Token | Hex | Use |
|---|---|---|
| `secondary-50` | #F5F5FA | Provenance pill backgrounds, feature icon backgrounds |
| `secondary-100` | #EBEBF5 | Card section backgrounds |
| `secondary-200` | #D6D6ED | Provenance pill borders |

### Neutral

Text hierarchy, borders, and structural chrome.

| Token | Hex | Use |
|---|---|---|
| `neutral-0` | #FFFFFF | Card backgrounds, input backgrounds |
| `neutral-50` | #FAFAFA | Default body background (dashboard) |
| `neutral-100` | #F2F2F2 | Table header backgrounds, muted surfaces |
| `neutral-200` | #E5E5E5 | Borders, dividers |
| `neutral-400` | #999999 | Placeholder text, tertiary labels |
| `neutral-500` | #737373 | Secondary body text, descriptions |
| `neutral-600` | #555555 | Stronger secondary text |
| `neutral-700` | #333333 | Strong labels |
| `neutral-800` | #1F1F1F | Near-primary text |
| `neutral-900` | #141414 | Primary text. This is our "black". |

Marketing pages use `#FAF9F7` (warm cream) as the base background. Dashboard uses `neutral-50`.

### Health semantic colors

**These colors are EXCLUSIVELY for health data status indicators.** They never appear in navigation, brand elements, buttons, or general UI chrome.

| Status | Foreground | Background | Border | Use |
|---|---|---|---|---|
| **Normal** | `#16A34A` | `#F0FDF4` | `#BBF7D0` | Within reference range |
| **Warning** | `#D97706` | `#FFFBEB` | `#FDE68A` | Approaching threshold, borderline |
| **Critical** | `#DC2626` | `#FEF2F2` | `#FECACA` | Outside reference range |
| **Info** | `#3162FF` | `#EEF1FF` | `#D6DCFF` | New data, AI-generated insights |

Access via CSS variables: `--color-health-normal`, `--color-health-normal-bg`, `--color-health-normal-border`, etc.

### Color rules

**Do:**
- Use `accent-*` for interactive elements, links, and navigation active states.
- Use health semantic colors only on data status indicators (badges, value coloring, trend lines).
- Use `neutral-*` for all text hierarchy and structural borders.
- Use `secondary-*` for subtle surface elevation (provenance pills, feature backgrounds).

**Don't:**
- Never use red, amber, or green in brand elements, navigation, or buttons.
- Never use blue (`accent-*`) for health status — it's reserved for brand/interactive.
- Never use true black (#000) for text — use `neutral-900` (#141414).
- Never mix semantic health colors and brand colors in the same visual context.

---

## Spacing and layout

### Content width

- Maximum content width: `max-w-[1120px]` (1120px) for dashboard and marketing pages.
- Horizontal padding: `px-6` at all breakpoints.
- Dashboard content container: `max-w-[1400px] mx-auto px-3 py-6 md:px-6 md:py-8`.

### Section spacing

- Marketing page sections: `py-20` (80px vertical padding).
- Dashboard page top margin: `mb-7` between page header and content.
- Card grid gaps: `gap-3` to `gap-4` (12–16px).
- Feature section grid: `gap-10 md:gap-16` between text and visual.

### Navigation

- Top nav height: `3.5rem` (56px), stored as `--top-nav-height`.
- Full-height pages (like AI chat) use `h-[calc(100vh-var(--top-nav-height))]`.

---

## Component patterns

### Buttons

Buttons use CVA variants. The `default` variant (dark) is the primary CTA.

| Variant | Use | Appearance |
|---|---|---|
| `default` | Primary actions, CTAs | Dark (`neutral-900`) background, white text |
| `primary` | Brand-colored actions | Blue (`accent-600`) background, white text |
| `outline` | Secondary actions | White background, neutral border |
| `ghost` | Tertiary actions, inline links | Transparent, shows on hover |
| `destructive` | Dangerous actions | Red background |

Marketing CTAs use the dark `default` variant, not blue. Blue is reserved for emphasis text and "Learn more →" links.

All buttons have `active:scale-[0.98]` micro-interaction and `focus-visible:ring-2 focus-visible:ring-accent-500`.

### Cards

Two card patterns:

**Standard card:** `rounded-xl border border-neutral-200 bg-white p-5`

**Elevated card with hover:** Uses the `.card-elevated` utility — `rounded-2xl`, `shadow-card`, hover transitions to `border-accent-300` with blue glow.

### Status badges (health data only)

The `StatusBadge` component renders a pill with a colored dot indicator:
```
<StatusBadge status="normal" label="Normal" />
<StatusBadge status="warning" label="Borderline" />
<StatusBadge status="critical" label="High" />
<StatusBadge status="info" label="New" />
<StatusBadge status="neutral" label="Discontinued" />
```

Structure: `rounded-full border px-2.5 py-[3px] text-xs font-medium` with a `1.5x1.5` dot circle. Font is `var(--font-body)`.

### Provenance pills

Small inline metadata indicators tracing data back to its source. Uses `secondary-*` palette:
```
<ProvenancePill label="Quest Diagnostics" icon="◎" />
```
Structure: `rounded-md border-secondary-200 bg-secondary-50 px-2.5 py-1 text-[11px]` with `var(--font-mono)`.

### Metric cards

Dashboard summary widgets showing a value with sparkline trend:
- Title: `text-[13px] var(--font-body) text-neutral-500`
- Value: `text-[32px] var(--font-display) font-medium tracking-[-0.03em]` — color determined by health status
- Delta: `text-xs var(--font-mono)` with directional arrow (↑/↓/→)
- Sparkline: inline SVG, color matches health status

### Lab result rows

Grid layout: `grid-cols-[1.6fr_0.9fr_1.2fr_0.8fr_1fr]`
- Metric name: `var(--font-body)`, 14px, font-medium
- Value: `var(--font-mono)`, 16px, font-semibold, health-colored
- Reference range: `var(--font-mono)`, 12px, neutral-400
- Status: `StatusBadge` component
- Trend: `MiniSparkline` SVG

Table header: `bg-neutral-50`, uppercase mono labels at `11px` with `tracking-[0.04em]`.

---

## Animations

### Available utilities

| Class | Effect |
|---|---|
| `.animate-fade-in` | 0.3s opacity fade |
| `.animate-fade-in-up` | 0.4s opacity + translateY(8px) |
| `.animate-scale-in` | 0.3s opacity + scale(0.96) |
| `.stagger-children` | Auto-stagger children with 40ms delays (up to 6 children) |
| `.skeleton` | Shimmer loading effect |

### Micro-interactions

- Buttons: `active:scale-[0.98]` on press.
- Cards: `transition: border-color 0.15s ease, box-shadow 0.15s ease` on hover.
- Nav links: `transition-colors` on hover.
- Focus rings: `focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2`.

### Loading states

Skeleton placeholders use the `.skeleton` class (shimmer gradient). Streaming AI content shows skeleton rows that match the expected layout dimensions.

---

## Marketing page patterns

### Overall aesthetic

Warm editorial tone — like a medical journal crossed with a premium product page. Background is warm cream (`#FAF9F7`), not pure white. Alternating sections use `#F5F4F1` for depth. Generous whitespace. Restrained color — blue appears only in emphasis text and "Learn more" links.

### Hero section

- **Left-aligned** text, not centered.
- Display font headline with one italic blue emphasis word.
- Two inline CTAs: dark button + ghost text link.
- Full-width product mockup below (live UI components over a placeholder landscape image background).

### Feature sections

- Alternate left-right: text on one side, visual on the other.
- Grid: `md:grid-cols-[1fr_1.3fr]` or `md:grid-cols-[1.3fr_1fr]`.
- Heading: `24px` display font, `leading-[1.25]`.
- Description: `14px` body font, `leading-[1.7]`, `text-neutral-500`.
- Link: `text-[13px] text-accent-600` with `→` suffix.
- Visuals: live UI components floating over warm gradient backgrounds with subtle shadows, or placeholder images.

### Testimonials

- Centered display heading.
- 3-column grid of quote cards.
- Quote text: `13px` body font, `leading-[1.65]`.
- Attribution: initials avatar (rounded-full, `bg-neutral-100`) + name + role.

### Trust bar

- Centered subtext: `text-[12px] text-neutral-400`.
- Provider names as text with `opacity-30` (placeholder for actual logos).

---

## Dashboard page patterns

### Page headers

Every dashboard page starts with:
```tsx
<h1 className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900"
    style={{ fontFamily: 'var(--font-display)' }}>
  Page Title
</h1>
<p className="mt-1 text-sm text-neutral-500"
   style={{ fontFamily: 'var(--font-body)' }}>
  Description text.
</p>
```

### Data tables

- Container: `rounded-xl border border-neutral-200 bg-white overflow-hidden`.
- Header row: `bg-neutral-50`, mono uppercase labels.
- Data rows: `border-b border-neutral-100`, `hover:bg-neutral-50`.
- Values: mono font, health-status-colored where applicable.
- Actions: Right-aligned sparklines or action buttons.

### Section labels within pages

Uppercase mono overline for section grouping:
```tsx
<h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-neutral-400"
    style={{ fontFamily: 'var(--font-mono)' }}>
  Key Metrics
</h3>
```

---

## AI chat patterns

### Message bubbles

- **User messages**: Right-aligned, `bg-accent-500` text-white, border-radius `16px 16px 4px 16px`.
- **AI messages**: Left-aligned, white with `border-neutral-200`, border-radius `4px 16px 16px 16px`.
- AI avatar: Blue gradient circle with logo SVG.
- AI label: `"OpenVitals AI"` in uppercase mono, `text-accent-500`.

### Provenance on AI responses

Source citations appear below AI messages as a row of `ProvenancePill` components.

### Artifact cards

Clickable cards within AI messages that open the insight panel:
`rounded-xl border-accent-200 bg-accent-50 p-3.5` with accent-colored icon.

### Chat input

Auto-growing textarea in a `rounded-2xl` container with:
- Focus state: `border-accent-300 shadow-md ring-2 ring-accent-100`.
- Send button: blue gradient when active, muted when empty.
- Disclaimer: `text-[10px] var(--font-mono) text-neutral-400` centered below.

---

## Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.03)` | Subtle lift |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` | Buttons, pill tabs |
| `shadow-card` | `0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02)` | Card default |
| `shadow-card-hover` | `0 0 0 1px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.05)` | Card hover |

Marketing page mockups use heavier shadows: `0 4px 24px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)` for the floating product UI effect.

---

## Border radius

| Token | Value | Use |
|---|---|---|
| `rounded-md` (6px) | Buttons, pills, inputs |
| `rounded-lg` (8px) | Small cards, form elements |
| `rounded-xl` (10px) | Standard cards, table containers |
| `rounded-2xl` (12px) | Elevated cards, chat input |
| `rounded-full` | Status badges, avatars |

---

## File organization

```
components/
  ui/         # Radix primitives (button, dropdown-menu, popover, etc.)
  health/     # Health-specific components (StatusBadge, MetricCard, LabResultRow, etc.)
  avatar.tsx  # Shared avatar with initials fallback
  button/     # Extended Button + IconButton with text/icon/loading props
features/
  layout/     # TopNav, PrimaryNav, Logo, etc.
  ai/         # Chat page components (ChatInput, MessageBlock, InsightPanel, etc.)
  marketing/  # Landing page sections
```

Components in `ui/` are generic primitives. Components in `health/` encode the health-specific design language (status colors, provenance, sparklines). Feature components in `features/` compose these into full page experiences.
