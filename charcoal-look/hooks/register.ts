import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Charcoal, dark only: neutral graphite greys with a soft blue accent,
// drawn dark even when the system is in light mode.
const { theme, problems } = makeColors({
  label: 'Charcoal',
  only: 'dark',
  roles: {
    accent: '#4f8fd8',
    danger: '#e05252',
    success: '#4caf6e',
    warning: '#e0a03a',
    pro: '#a07ed6',
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#141518',
        'surface-1': '#1b1c20',
        'surface-2': '#222328',
        'surface-3': '#242529',
        'text-primary': '#eceef2',
        'text-secondary': '#c4c7ce',
        'text-muted': '#9a9ea8',
      },
    },
  },
})

const LOOK: ThemeSetArgs = { colors: theme, overrideColorScheme: 'dark' }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // The line that would stop Desktop painting this look, if a colour edit causes one.
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })
}
