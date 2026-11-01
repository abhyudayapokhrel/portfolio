# Design system: dark, Obsidian-like workspace

## 1. Color tokens (dark theme)
| Token | Value | Used for |
|---|---|---|
| bg-chrome | #151515 | Tab bar, left rail, status bar, graph panel interior |
| bg-page | #1c1c1c | Main page background |
| bg-card | #262626 | Cards, search field, chips, inputs |
| bg-card-hover | #2c2c2c | Card hover, active tab |
| border | #333333 | 1px borders on cards, panels, tabs, inputs |
| text-heading | #e6e6e6 | Page titles, card titles |
| text-body | #c4c4c4 | Descriptions, paragraphs |
| text-muted | #8a8a8a | Subtitles, dates, disclaimers, status bar |
| accent | #8b9dff | Tag nodes, mascot highlights, focus rings, links |
| accent-soft | accent at 15% opacity | Selected states |
| node-note | #e6e6e6 | Graph note nodes |
| edge | white at 15 to 20% | Graph lines |

Everything is neutral gray with one cool periwinkle accent. Third-party embeds (e.g. a red Spotify banner) are not part of the theme.

## 2. Typography
- Font: Inter. Fallback: system-ui, sans-serif. Monospace (JetBrains Mono or similar) only for code and key hints.
- Page title (H1): ~56px, weight 700, letter-spacing ~-0.02em, line-height 1.1.
- Subtitle: ~18px, weight 400, muted, lowercase and casual.
- Section heading (H2): ~22px, weight 600.
- Card title: ~17px, weight 600.
- Card description: ~15px, muted, clamped to 2 lines.
- Eyebrow label: ~12px, weight 600, uppercase, letter-spacing ~0.15em, muted.
- Chips, tags, dates: 13px.
- Status bar: 12 to 13px, muted.
- Disclaimer: ~12px, muted, centered, max-width ~560px.

## 3. Layout dimensions
- Tab bar: top, 36 to 38px, full width, bg-chrome. Each tab: small document icon, 14px title, a close button on the right. Active tab uses bg-page with 1px border on top/left/right so it merges with the page. Inactive tabs are muted.
- Left rail: ~38px wide, bg-chrome, ~18px icons stacked with ~16px gaps, 1px right border. Order: home, graph, chat bubble, film, chip, RSS.
- Status bar: bottom, 26 to 28px, bg-chrome, 1px top border, text right-aligned with 16px padding; shows a hovered link's URL on the left.
- Page content: ~80px left padding on desktop (~30px on graph page), 24px on mobile. Home, Graph and Media fill the width.
- Card grid (Home): 4 columns, gap ~20px, collapsing to 3, 2, then 1.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px.

## 4. Component specs
**Home card**: 1px border, radius ~8px, bg-card, overflow hidden. 16:9 cover. Body padding ~16px: title, 2-line description, footer row (calendar icon + date left, tag pills right). Hover: border brightens, lifts ~2px, ~150ms. Visible focus ring.

**Tag pill**: bg ~#333, fully rounded, padding ~4px 10px, 13px text, written as `#tag`.

**Search field**: rounded input (radius ~8px, bg-card, 1px border), magnifier left, placeholder "Search notes", small `/` key badge right (~22px square, darker bg, 4px radius). Next to it a muted dotted-underline link ("About these writings").

**Command palette**: centered modal over dimmed backdrop. Input on top, results below, footer with up/down navigate, enter open, esc close as key badges.

**Graph page**: panel radius ~12px, 1px border, bg-chrome, full width. Controls top right: "Show tags" toggle, +, -, "Fit". Legend bottom left: light dot "Note", accent dot "Tag". Notes ~10px light circles, tags ~7px accent circles, labels ~12px muted under nodes. Below the panel: collapsed "List view" disclosure. Title has a blinking text caret.

**Chat page**: centered column ~740px, mascot ~100px on top, eyebrow, ~44px H1, 2 to 3 line muted description, status pill with dot ("Online"), tall rounded input (radius ~12px) with square up-arrow send button (~36px, radius 8px), suggestion chips (2 rows), small gray disclaimer.

**Media page**: profile card (title left, "Open Spotify" link right), playlist carousel with prev/next buttons top right, film grid below using Home card style.

## 5. Motion and behavior
- ~150ms ease transitions for hover, focus, tab changes. No large animations.
- Force-directed graph: drag nodes, scroll to zoom, hover highlights neighbours.
- Tabs open as you navigate and can be closed; each tab is a real URL.
- Keyboard: `/` opens search, `esc` closes overlays.
- Respect prefers-reduced-motion.

## 6. Voice
Short, lowercase, casual microcopy. Write your own in that spirit.

## 7. Prompt
Build my personal site with this design system. Theme: dark, Obsidian-like workspace. Colors: chrome #151515, page #1c1c1c, card #262626, border #333, heading #e6e6e6, body #c4c4c4, muted #8a8a8a, accent periwinkle #8b9dff. Font: Inter; H1 56px/700/-0.02em, subtitles 18px muted lowercase, eyebrow 12px uppercase letter-spaced. Shell: 36px top tab bar with closable tabs, 38px left icon rail, 26px bottom status bar with page counts and hovered-link URL. Cards: 8px radius, 1px border, 16:9 cover, title, 2-line description, date left and tag pills right, hover lifts 2px and brightens the border, 4-column grid collapsing to 1. Search: field with a / key badge opening a command palette with up/down/enter/esc hints. Graph: force-directed panel, light note nodes, accent tag nodes, Show tags / + / - / Fit controls, legend, list-view fallback. Chat page: centered mascot, eyebrow, 44px title, status pill, rounded input with send button, suggestion chips, small disclaimer. Casual lowercase microcopy, 150ms transitions, WCAG AA contrast, fully responsive. Use my own content and mascot. Define all of these as CSS variables in one place first, show them to me, then build.
