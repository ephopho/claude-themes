import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// cmd black, dark only: the Windows Command Prompt look, near-black with
// plain grey text and the Windows terminal (Campbell) colours for status.
const { theme, problems } = makeColors({
  label: 'cmd black',
  only: 'dark',
  contrast: 'more',
  roles: {
    accent: '#3a96dd',
    danger: '#e74856',
    success: '#16c60c',
    warning: '#c19c00',
    pro: '#b4009e',
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0c0c0c',
        'surface-1': '#121212',
        'surface-2': '#181818',
        'surface-3': '#1a1a1a',
        'text-primary': '#cccccc',
        'text-secondary': '#b0b0b0',
        'text-muted': '#8a8a8a',
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
