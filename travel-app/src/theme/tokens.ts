// Colour tokens from the flock design system (style B). Light first, dark mirrors every key.
export const lightColors = {
  bg: '#FFFFFF',
  surface: '#F6F4EF',
  ink: '#1B1B1F',
  inkMuted: '#55555E',
  line: '#E8E4DA',
  lineStrong: '#CFCAC0',
  primary: '#1B1B1F',
  onPrimary: '#FFFFFF',
  highlight: '#FFC93C',
  onHighlight: '#1B1B1F',
  soft: '#FFF1C7',
  onSoft: '#1B1B1F',
  tileFlights: '#CFE8FF',
  tileStays: '#D3F2E3',
  tileExpenses: '#FFE0D1',
  tileIcon: 'rgba(255, 255, 255, 0.7)',
  nav: '#1B1B1F',
  navLine: '#1B1B1F',
  navInk: '#D4D4DA',
  disabled: '#BDB9B0',
  danger: '#B42318',
  scrim: 'rgba(22, 22, 26, 0.45)',
  toast: '#1B1B1F',
  onToast: '#FFFFFF',
  sample: '#5A6664',
};

export type Colors = typeof lightColors;

export const darkColors: Colors = {
  bg: '#0E1416',
  surface: '#182124',
  ink: '#EEF3F2',
  inkMuted: '#A3B1AE',
  line: '#263236',
  lineStrong: '#3A4A47',
  primary: '#FFC93C',
  onPrimary: '#1B1B1F',
  highlight: '#FFC93C',
  onHighlight: '#1B1B1F',
  soft: '#2B2A1C',
  onSoft: '#FFE08A',
  tileFlights: '#16283A',
  tileStays: '#14302A',
  tileExpenses: '#36231B',
  tileIcon: 'rgba(255, 255, 255, 0.08)',
  nav: '#182124',
  navLine: '#263236',
  navInk: '#A3B1AE',
  disabled: '#3A4447',
  danger: '#FF8A80',
  scrim: 'rgba(0, 0, 0, 0.6)',
  toast: '#EEF3F2',
  onToast: '#0E1416',
  sample: '#5A6664',
};

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24 } as const;

export const radius = { sm: 16, md: 20, lg: 24, xl: 28, pill: 999 } as const;

export const TAP_MIN = 44;
