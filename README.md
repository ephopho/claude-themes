# claude-themes

Themes for the **Claude desktop and mobile apps** (the Code tab and chats),
packaged as Claude Code mods. Each theme recolours the whole app — page,
cards, panels, text, buttons, links, code highlighting and diffs — and is
applied automatically at the start of every session.

Needs Claude Code **2.1.325 or later** (the version that added themes for
mods). Terminal Claude Code and editor extensions don't draw these themes,
and permission prompts always keep the app's own look.

## Themes

Install one theme at a time: each sets the whole look, so two would fight.

### cmd black (`cmd-black`)

The Windows Command Prompt look: near-black with plain grey text, and the
Windows terminal (Campbell) colours for status. **Dark only**, with stronger
borders so input boxes stay visible on black.

| Part | Colour |
| --- | --- |
| Page / cards / panels | `#0c0c0c` / `#121212` / `#181818` |
| Text | `#cccccc` |
| Buttons and links | cyan `#3a96dd` |
| Error / success / warning | `#e74856` / `#16c60c` / `#c19c00` |
| Values in code | `#b4009e` |

### Charcoal (`charcoal-look`)

Neutral graphite greys with a soft blue accent. **Dark only**: the app stays
dark even when your system is in light mode.

| Part | Colour |
| --- | --- |
| Page / cards / panels | `#141518` / `#1b1c20` / `#222328` |
| Text | `#eceef2` |
| Buttons and links | soft blue `#4f8fd8` |
| Error / success / warning | `#e05252` / `#4caf6e` / `#e0a03a` |
| Values in code | `#a07ed6` |

## Install

At the prompt of a terminal Claude Code session (swap in `charcoal-look`
for the other theme):

```
/plugin install cmd-black --marketplace ephopho/claude-themes
```

Answer `y` to add the marketplace, then pick the **user** scope so the theme
applies to every session. From a shell instead:

```bash
claude plugin install cmd-black --marketplace ephopho/claude-themes
```

In the desktop app, where `/plugin` doesn't run: click **+** next to the
prompt box, then **Plugins**, **Add marketplace** with
`ephopho/claude-themes`, then **Add plugin**.

The theme takes effect in the next session you start. To swap themes,
uninstall the one you have first.

## Change the colours

Edit the theme's `hooks/register.ts`, such as `cmd-black/hooks/register.ts`.
The colours are the hex values passed to `makeColors`: the `anchors` set the
greys and text, and the `roles` set the accent and status colours. Raise
`version` in that theme's `.claude-plugin/plugin.json`, then:

```bash
claude plugin marketplace update claude-themes
claude plugin update cmd-black@claude-themes
```

Each theme's `hooks/make-colors.js` turns those few colours into the app's
full palette and checks their contrast. It is copied unchanged from Claude Code's
plugin-authoring skill; refresh it from there when Claude Code updates.

## Uninstall

```bash
claude plugin uninstall cmd-black@claude-themes
```
