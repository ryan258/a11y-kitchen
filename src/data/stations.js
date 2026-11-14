/**
 * @typedef {object} Criterion
 * @property {string} id
 * @property {string} title
 * @property {'A' | 'AA' | 'AAA'} level
 * @property {string} source
 * @property {string} titleVerifiedOn
 * @property {'confirmed' | 'conditional'} applicability
 */

/**
 * @typedef {object} Station
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} task
 * @property {string} barrierPattern
 * @property {Criterion[]} criteria
 * @property {'built' | 'not-built'} status
 */

const verifiedOn = '2026-11-12';

const criterion = (id, title, level, anchor, applicability = 'confirmed') => ({
  id,
  title,
  level,
  source: `https://www.w3.org/TR/WCAG22/#${anchor}`,
  titleVerifiedOn: verifiedOn,
  applicability,
});

const registry = {
  '1.1.1': criterion('1.1.1', 'Non-text Content', 'A', 'non-text-content'),
  '1.2.2': criterion('1.2.2', 'Captions (Prerecorded)', 'A', 'captions-prerecorded'),
  '1.2.3': criterion(
    '1.2.3',
    'Audio Description or Media Alternative (Prerecorded)',
    'A',
    'audio-description-or-media-alternative-prerecorded',
    'conditional',
  ),
  '1.4.1': criterion('1.4.1', 'Use of Color', 'A', 'use-of-color'),
  '1.4.13': criterion('1.4.13', 'Content on Hover or Focus', 'AA', 'content-on-hover-or-focus'),
  '2.1.1': criterion('2.1.1', 'Keyboard', 'A', 'keyboard', 'conditional'),
  '2.1.2': criterion('2.1.2', 'No Keyboard Trap', 'A', 'no-keyboard-trap', 'conditional'),
  '2.2.1': criterion('2.2.1', 'Timing Adjustable', 'A', 'timing-adjustable'),
  '2.2.2': criterion('2.2.2', 'Pause, Stop, Hide', 'A', 'pause-stop-hide'),
  '2.4.3': criterion('2.4.3', 'Focus Order', 'A', 'focus-order'),
  '2.4.7': criterion('2.4.7', 'Focus Visible', 'AA', 'focus-visible', 'conditional'),
  '2.5.8': criterion('2.5.8', 'Target Size (Minimum)', 'AA', 'target-size-minimum'),
  '3.1.5': criterion('3.1.5', 'Reading Level', 'AAA', 'reading-level'),
  '3.2.2': criterion('3.2.2', 'On Input', 'A', 'on-input'),
  '3.2.5': criterion('3.2.5', 'Change on Request', 'AAA', 'change-on-request'),
  '3.3.1': criterion('3.3.1', 'Error Identification', 'A', 'error-identification'),
  '3.3.2': criterion('3.3.2', 'Labels or Instructions', 'A', 'labels-or-instructions'),
  '3.3.3': criterion('3.3.3', 'Error Suggestion', 'AA', 'error-suggestion'),
  '3.3.4': criterion(
    '3.3.4',
    'Error Prevention (Legal, Financial, Data)',
    'AA',
    'error-prevention-legal-financial-data',
    'conditional',
  ),
  '3.3.7': criterion('3.3.7', 'Redundant Entry', 'A', 'redundant-entry'),
  '4.1.2': criterion('4.1.2', 'Name, Role, Value', 'A', 'name-role-value'),
  '4.1.3': criterion('4.1.3', 'Status Messages', 'AA', 'status-messages'),
};

const criteria = (...ids) => ids.map((id) => ({ ...registry[id] }));

/** @type {Station[]} */
export const stations = [
  {
    id: '01',
    slug: 'cancellation-form',
    title: 'The cancellation form',
    category: 'Time limits and error recovery',
    task: 'Cancel a membership',
    barrierPattern: 'Session timer, placeholder labels, destructive errors',
    criteria: criteria('2.2.1', '2.2.2', '3.3.1', '3.3.2', '3.3.3', '3.3.4', '3.3.7'),
    status: 'built',
  },
  {
    id: '02',
    slug: 'error-message',
    title: 'The error message',
    category: 'Form and input recovery',
    task: 'Fix a rejected payment',
    barrierPattern: 'Vague error with no recovery path',
    criteria: criteria('3.3.1', '3.3.3'),
    status: 'built',
  },
  {
    id: '03',
    slug: 'reading-wall',
    title: 'The reading wall',
    category: 'Readability and comprehension',
    task: 'Follow return instructions',
    barrierPattern: 'Needlessly complex legal language for a simple task',
    criteria: criteria('3.1.5'),
    status: 'built',
  },
  {
    id: '04',
    slug: 'disappearing-menu',
    title: 'The disappearing menu',
    category: 'Pointer and focus interaction',
    task: 'Reach a settings page',
    barrierPattern: 'Hover-only menu that vanishes before it can be reached',
    criteria: criteria('1.4.13', '2.1.1'),
    status: 'built',
  },
  {
    id: '05',
    slug: 'interruption',
    title: 'The interruption',
    category: 'Focus and context control',
    task: 'Book an appointment',
    barrierPattern: 'Automatic update that interrupts the task and moves focus',
    criteria: criteria('2.4.3', '3.2.2', '3.2.5', '4.1.3'),
    status: 'built',
  },
  {
    id: '06',
    slug: 'memory-tax',
    title: 'The memory tax',
    category: 'Cognitive load',
    task: 'Transfer money',
    barrierPattern: 'A confirmation code disappears before it must be entered',
    criteria: criteria('3.3.7'),
    status: 'built',
  },
  {
    id: '07',
    slug: 'keyboard-trap',
    title: 'The keyboard trap',
    category: 'Keyboard navigation',
    task: 'Close a promo overlay',
    barrierPattern: 'Focus cycles inside an overlay; a safety Escape remains available',
    criteria: criteria('2.1.2'),
    status: 'built',
  },
  {
    id: '08',
    slug: 'invisible-focus',
    title: 'The invisible focus',
    category: 'Keyboard navigation',
    task: 'Buy a ticket without a mouse',
    barrierPattern: 'A safe inspection replay shows a product path with no visible focus marker',
    criteria: criteria('2.4.7'),
    status: 'built',
  },
  {
    id: '09',
    slug: 'unlabelled-icon',
    title: 'The unlabelled icon',
    category: 'Name, role, and value',
    task: 'Delete one item',
    barrierPattern: 'Icon-only control with no accessible name',
    criteria: criteria('1.1.1', '4.1.2'),
    status: 'built',
  },
  {
    id: '10',
    slug: 'color-only-status',
    title: 'The color-only status',
    category: 'Visual distinction',
    task: 'Find the failed order',
    barrierPattern: 'Order status shown by color alone',
    criteria: criteria('1.4.1'),
    status: 'built',
  },
  {
    id: '11',
    slug: 'caption-gap',
    title: 'The caption gap',
    category: 'Audio and video media',
    task: 'Get instructions from a video',
    barrierPattern: 'Prerecorded instructions with no captions or transcript',
    criteria: criteria('1.2.2', '1.2.3'),
    status: 'built',
  },
  {
    id: '12',
    slug: 'target-too-small',
    title: 'The target too small',
    category: 'Pointer target sizing',
    task: 'Tap the right option on a phone',
    barrierPattern: 'Twenty-pixel targets separated by two pixels',
    criteria: criteria('2.5.8'),
    status: 'built',
  },
];

export const builtStations = stations.filter((station) => station.status === 'built');
