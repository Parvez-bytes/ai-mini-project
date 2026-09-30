export const mockUser = {
  name: 'Parvez',
  fullName: 'Parvez Shaikh',
  email: 'parvez@example.com',
  level: 'Undergraduate Student',
  initials: 'PS',
}

export const mockHealthProfile = {
  age: 21,
  heightCm: 171,
  weightKg: 67,
  sleepHours: 6.2,
  physicalActivity: 3,
  waterLitres: 2.1,
  screenTimeHours: 6.5,
  smoking: 'No',
  alcohol: 'Occasionally',
  bloodPressure: '118/76',
  bloodGlucose: 'Not provided',
  existingConcerns: '',
}

export const mockTrends = [
  { label: 'May', bmi: 23.4, sleep: 5.7, activity: 2.2, water: 1.7 },
  { label: 'Jun', bmi: 23.3, sleep: 5.9, activity: 2.6, water: 1.8 },
  { label: 'Jul', bmi: 23.1, sleep: 6.1, activity: 2.8, water: 1.9 },
  { label: 'Aug', bmi: 22.9, sleep: 6.0, activity: 3.1, water: 2.0 },
  { label: 'Sep', bmi: 22.9, sleep: 6.2, activity: 3.0, water: 2.1 },
]

export const mockAnalysis = {
  profileGroup: 'Balanced Routine — Improvement Opportunity',
  classificationNote: 'Prototype profile classification based on the entered lifestyle inputs.',
  keyFactors: [
    { label: 'Sleep Hours', value: '6.2 h', note: 'Below the preferred project range', tone: 'amber' },
    { label: 'Physical Activity', value: '3 sessions/week', note: 'Low-to-moderate routine in this prototype', tone: 'blue' },
    { label: 'Water Intake', value: '2.1 L/day', note: 'Moderate daily intake', tone: 'teal' },
    { label: 'Screen Time', value: '6.5 h/day', note: 'Higher than the target used by the mock rules', tone: 'amber' },
  ],
  positiveHabits: [
    'No smoking reported',
    'Regular weekly activity is already present',
    'Water intake is tracked consistently',
  ],
  areasToImprove: [
    'Build a more consistent sleep window',
    'Gradually increase routine movement',
    'Create deliberate screen-free breaks',
  ],
  why: [
    'Lower sleep duration increases the priority of sleep-related lifestyle suggestions in the prototype rules.',
    'Lower activity frequency shifts the mock profile toward movement-focused recommendations.',
    'Moderate hydration supports a balanced profile while leaving room for routine consistency.',
  ],
}

export const mockRecommendations = [
  {
    id: 1,
    category: 'Sleep',
    title: 'Protect a consistent sleep window',
    reason: 'Your entered sleep duration is below the preferred project range.',
    action: 'Set a consistent bedtime and aim for a calmer 30-minute wind-down routine.',
    priority: 'High',
  },
  {
    id: 2,
    category: 'Physical Activity',
    title: 'Add short movement blocks',
    reason: 'Your weekly activity is currently on the lower side of the mock target.',
    action: 'Add two 15–20 minute walks or movement blocks on lighter days.',
    priority: 'Medium',
  },
  {
    id: 3,
    category: 'Hydration',
    title: 'Spread water intake across the day',
    reason: 'Your hydration input is moderate and can be made more consistent.',
    action: 'Keep a water bottle visible and pair water breaks with regular study sessions.',
    priority: 'Medium',
  },
  {
    id: 4,
    category: 'Screen Time',
    title: 'Create screen-free transitions',
    reason: 'Your entered screen time is higher than the target used by the mock rules.',
    action: 'Use a 5–10 minute screen-free break between long study blocks.',
    priority: 'Medium',
  },
  {
    id: 5,
    category: 'Daily Routine',
    title: 'Anchor your daily routine',
    reason: 'Consistent routines make the rest of the preventive plan easier to follow.',
    action: 'Pick fixed wake, study, movement, and wind-down anchors for weekdays.',
    priority: 'Low',
  },
]

export const goalRecommendations = {
  'Improve Sleep': [
    { title: 'Set a stable bedtime', reason: 'Regular timing is the main sleep-focused rule in this prototype.', action: 'Choose a realistic bedtime you can maintain most days.', priority: 'High', category: 'Sleep' },
    { title: 'Use a wind-down block', reason: 'A pre-sleep transition can reduce late-night routine friction.', action: 'Reserve 30 minutes for low-stimulation activities before bed.', priority: 'Medium', category: 'Sleep' },
    { title: 'Reduce late screen exposure', reason: 'Your profile reports 6.5 hours of daily screen time.', action: 'Create a screen-free final study-to-sleep transition.', priority: 'Medium', category: 'Screen Time' },
  ],
  'Increase Physical Activity': [
    { title: 'Add two walking sessions', reason: 'The profile currently records 3 activity sessions per week.', action: 'Schedule two short walks on days without structured exercise.', priority: 'High', category: 'Physical Activity' },
    { title: 'Use study-break movement', reason: 'Frequent small blocks are easier to add around college schedules.', action: 'Stand, stretch, or walk for 5 minutes between long study blocks.', priority: 'Medium', category: 'Physical Activity' },
    { title: 'Track consistency', reason: 'Tracking can make the routine visible in the journey page.', action: 'Record completed activity sessions once each day.', priority: 'Low', category: 'Daily Routine' },
  ],
  'Improve Hydration': [
    { title: 'Make water visible', reason: 'The profile records moderate daily water intake.', action: 'Keep your bottle beside your study desk.', priority: 'High', category: 'Hydration' },
    { title: 'Pair water with habits', reason: 'Habit pairing can simplify routine consistency.', action: 'Drink water at regular study transitions and meal times.', priority: 'Medium', category: 'Hydration' },
    { title: 'Review daily intake', reason: 'Simple tracking helps you notice inconsistent days.', action: 'Log your approximate daily water intake once a day.', priority: 'Low', category: 'Hydration' },
  ],
  'Improve Daily Routine': [
    { title: 'Choose four daily anchors', reason: 'A predictable skeleton supports multiple lifestyle habits.', action: 'Set fixed wake, study, movement, and wind-down anchors.', priority: 'High', category: 'Daily Routine' },
    { title: 'Plan the next day', reason: 'A short evening review can reduce missed routine steps.', action: 'Write tomorrow’s three most important routine actions.', priority: 'Medium', category: 'Daily Routine' },
    { title: 'Protect transitions', reason: 'Transitions are where routines often become inconsistent.', action: 'Use five-minute reset breaks between major tasks.', priority: 'Low', category: 'Daily Routine' },
  ],
  'General Preventive Wellness': mockRecommendations.slice(0, 3),
}

export const mockActionPlan = [
  { day: 'Day 1', action: 'Choose a fixed bedtime and a 30-minute wind-down.' },
  { day: 'Day 2', action: 'Add one 15–20 minute walk.' },
  { day: 'Day 3', action: 'Carry a water bottle and log your intake.' },
  { day: 'Day 4', action: 'Take one screen-free break during a long study block.' },
  { day: 'Day 5', action: 'Repeat the movement block and review routine consistency.' },
  { day: 'Day 6', action: 'Prepare a simple next-day routine plan.' },
  { day: 'Day 7', action: 'Review what felt sustainable and record a new snapshot.' },
]

export const mockHistory = [
  { date: 'Sep 30, 2026', type: 'Full Preventive Assessment', group: 'Balanced Routine — Improvement Opportunity', score: 72, status: 'Current' },
  { date: 'Aug 29, 2026', type: 'Lifestyle Check-in', group: 'Balanced Routine', score: 68, status: 'Recorded' },
  { date: 'Jul 28, 2026', type: 'Lifestyle Check-in', group: 'Building Consistency', score: 62, status: 'Recorded' },
  { date: 'Jun 25, 2026', type: 'Initial Assessment', group: 'Getting Started', score: 58, status: 'Recorded' },
]

export const simulatorDefaults = {
  sleepHours: mockHealthProfile.sleepHours,
  physicalActivity: mockHealthProfile.physicalActivity,
  waterLitres: mockHealthProfile.waterLitres,
  screenTimeHours: mockHealthProfile.screenTimeHours,
  weightKg: mockHealthProfile.weightKg,
}

export function calculateBmi(heightCm, weightKg) {
  const heightM = Number(heightCm) / 100
  const weight = Number(weightKg)
  if (!heightM || !weight || heightM <= 0 || weight <= 0) return null
  return weight / (heightM * heightM)
}

export function getBmiCategory(bmi) {
  if (bmi === null || Number.isNaN(bmi)) return 'Not available'
  if (bmi < 18.5) return 'Below reference range'
  if (bmi < 25) return 'Within reference range'
  if (bmi < 30) return 'Above reference range'
  return 'Higher reference range'
}

export function calculatePrototypeWellnessScore(profile) {
  let score = 50
  score += Math.min(18, Number(profile.sleepHours || 0) * 3)
  score += Math.min(18, Number(profile.physicalActivity || 0) * 3)
  score += Math.min(10, Number(profile.waterLitres || 0) * 2)
  score -= Math.max(0, Number(profile.screenTimeHours || 0) - 4) * 2
  if (profile.smoking === 'No') score += 5
  if (profile.alcohol === 'No') score += 3
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function getProfileGroup(profile) {
  const score = calculatePrototypeWellnessScore(profile)
  if (score >= 78) return 'Consistent Preventive Routine'
  if (score >= 65) return 'Balanced Routine — Improvement Opportunity'
  if (score >= 50) return 'Building Consistency'
  return 'Getting Started'
}
