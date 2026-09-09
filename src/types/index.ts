export interface HelpCenter {
  id: string
  name: string
  district: string
  address: string
  phone: string
  category: 'de-addiction' | 'rehabilitation' | 'government' | 'counseling' | 'mental-health' | 'emergency'
  lat: number
  lng: number
  services: string[]
  verified: boolean
  hours: string
  email?: string
  governmentAffiliated: boolean
  description: string
  distanceKm?: number
}

export interface SubstanceInfo {
  id: string
  name: string
  categoryName: string
  tagline: string
  commonNames: string[]
  riskLevel: 'Moderate' | 'High' | 'Very High' | 'Critical'
  description: string
  physicalSigns: string[]
  psychologicalSigns: string[]
  healthRisks: string[]
  withdrawalSymptoms: string[]
  emergencyTriggers: string[]
  myths: { myth: string; fact: string }[]
}

export interface ScenarioOption {
  id: string
  text: string
  isRecommended: boolean
  outcome: string
  rationale: string
  skillsTaught: string[]
}

export interface PreventionScenario {
  id: string
  title: string
  audience: 'Students' | 'Parents' | 'Friends'
  context: string
  situation: string
  options: ScenarioOption[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isEmergency?: boolean
  suggestions?: string[]
}

export interface ResourceItem {
  id: string
  title: string
  description: string
  category: 'Official Helplines' | 'Student Guides' | 'Parental Support' | 'Clinical & Medical' | 'Policy & Law'
  source: string
  phoneOrLink: string
  isDirectCall?: boolean
  badge: string
}

export interface StoryItem {
  id: string
  title: string
  personName: string
  ageGroup: string
  location: string
  background: string
  turningPoint: string
  recoveryJourney: string
  currentStatus: string
  lesson: string
}
