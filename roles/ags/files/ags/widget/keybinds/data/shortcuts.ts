// TODO: Update keybindings
// COLUMN1
const column1 = [
  {
    icon: '',
    name: 'Windows: Workspaces & Actions',
    binds: [
      { keys: ['⌘', '+', '0 - 9'], action: 'Go to x Workspace' },
      { keys: ['⌘', '+', 'scroll'], action: 'Go to Adjacent Workspace' }, 
      { keys: ['⌘', '+', '󰘶', '+', '0 - 9'], action: 'Move X Window to X to Workspace' },
      { keys: ['⌘', '+', '󰳾'], action: 'Pick Up & Move Window'},
      { keys: ['⌘', '+', '󰳽'], action: 'Resize Window Upon Window Border'},
      { keys: ['⌘', '+', 'Q'], action: 'Quit Window' },
      { keys: ['⌘', '+', 'P'], action: 'Pass SUPER key through to a VM' },
      { keys: ['⌘', '+', '󱊷'], action: 'Regrab SUPER key from the VM' },
    ],
    appeartick: 1
  },

  {
    icon: '',
    name: 'Windows: Type',
    binds: [
      { keys: ['⌘', '󰘶', '+', 'F'], action: 'Fullscreen' },
      { keys: ['⌘', '+', '<direction>'], action: 'Focus window' },
      { keys: ['⌘', '+', 'T'], action: 'Toggle Fake Floating' },
      { keys: ['⌘', '+', 'J'], action: 'Flip Window position' },
      { keys: ['⌘', '+', 'G'], action: 'Display Window Name'},
    ],
    appeartick: 1
  },
]

// COLUMN2
const column2 = [
  {
    icon: '󰜬',
    name: 'Widgets (AGS)',
    binds: [
      { keys: ['󰘲', '+', '󰘴', '+', 'R'], action: 'Restart AGS' },
      { keys: ['⌘', '+', '󰘴', '+', '󰌑'], action: 'Toggle App Launcher' },
      { keys: ['⌘', '+', ''], action: 'Toggle Overview' },
      { keys: ['⌘', '+', '󱊮'], action: 'Toggle Power Menu' },
      { keys: ['⌘', '+', '/'], action: 'Toggle Shortcuts Menu' },
    ],
    appeartick: 2
  },
  {
    icon: '',
    name: 'Screen Utilities',
    binds: [
      { keys: ['PrtScr'], action: 'Selective Screenshot' },
      { keys: ['󰘴', '+', 'PrtScr'], action: 'Screenshot Full screen' },
      { keys: ['⌘', '+', '󱊶'], action: 'Selective Record' },
    ],
    appeartick: 2
  },
  {
    icon: '',
    name: 'Session Shortcuts',
    binds: [
      { keys: ['⌘', '+', 'L'], action: 'Lock session' },
    ],
    appeartick: 2
  },
]

// COLUMN3
const column3 = [
  {
    icon: '󱓞',
    name: 'Apps',
    binds: [
      { keys: ['⌘', '+', '󰌑'], action: 'Launch Terminal: Wezterm' },
      { keys: ['⌘', '+', 'B'], action: 'Launch Browser: Zed Browser' },
      { keys: ['⌘', '+', 'E'], action: 'Launch File Manager: Nautilus' },
      { keys: ['󰘴', '+', '󰘵', '+', '󰆴'], action: 'Launch System Monitor: Mission Control' }, 
    ],
    appeartick: 3
  },
  {
    icon: '󰯃',
    name: 'Scripts',
    binds: [
      { keys: ['⌘', '+', '󰘵', '+', 'G'], action: 'Enable/Disable Gaming Mode' },
      { keys: ['󰘴', '+', '⌘', '+', 'N'], action: 'Toggle Night Light' },
    ],
    appeartick: 3
  }
]

export default [column1, column2, column3]
