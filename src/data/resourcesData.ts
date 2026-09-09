import { ResourceItem, StoryItem } from '../types'

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'tele-manas',
    title: 'Tele-MANAS Tamil Nadu (National Tele Mental Health Programme)',
    description:
      '24/7 comprehensive, confidential, toll-free digital mental health and psychological counseling service operating in Tamil, English, and other regional languages.',
    category: 'Official Helplines',
    source: 'Ministry of Health and Family Welfare / Government of Tamil Nadu',
    phoneOrLink: '14446',
    isDirectCall: true,
    badge: '24/7 Toll-Free Helpline',
  },
  {
    id: 'tn-health-104',
    title: 'Tamil Nadu Health Helpline (104)',
    description:
      'Official round-the-clock telephone health advisory offering medical guidance, referral to government psychiatric hospitals, and immediate substance abuse counseling.',
    category: 'Official Helplines',
    source: 'Department of Health & Family Welfare, Govt of Tamil Nadu',
    phoneOrLink: '104',
    isDirectCall: true,
    badge: 'State Govt Helpline',
  },
  {
    id: 'tn-108-ambulance',
    title: '108 Emergency Ambulance Services',
    description:
      'Immediate medical dispatch for overdose, severe withdrawal delirium, poisoning, respiratory arrest, or acute psychiatric crises across all 38 districts of Tamil Nadu.',
    category: 'Clinical & Medical',
    source: 'Tamil Nadu Health Systems Project (TNHSP) & GVK EMRI',
    phoneOrLink: '108',
    isDirectCall: true,
    badge: 'Critical Life Emergency',
  },
  {
    id: 'ncb-manas-1933',
    title: 'MANAS Toll-Free National Anti-Narcotics Helpline',
    description:
      'Narcotics Control Bureau central helpline for confidential reporting of illegal drug trafficking, student assistance, and rehabilitation referrals.',
    category: 'Policy & Law',
    source: 'Narcotics Control Bureau (NCB), Ministry of Home Affairs',
    phoneOrLink: '1933',
    isDirectCall: true,
    badge: 'National Anti-Drug Line',
  },
  {
    id: 'nimhans-addiction-guides',
    title: 'NIMHANS Centre for Addiction Medicine (CAM) Clinical Resources',
    description:
      'Evidence-based clinical guidelines, patient education booklets, and family intervention manuals created by India’s apex psychiatric research institute.',
    category: 'Clinical & Medical',
    source: 'National Institute of Mental Health and Neurosciences (NIMHANS)',
    phoneOrLink: 'https://nimhans.ac.in',
    isDirectCall: false,
    badge: 'Clinical Evidence Guide',
  },
  {
    id: 'mosje-nasha-mukt',
    title: 'Nasha Mukt Bharat Abhiyaan (NMBA) Portal',
    description:
      'Community outreach initiative focusing on vulnerable districts, colleges, and higher educational institutions with prevention modules and de-addiction directories.',
    category: 'Student Guides',
    source: 'Ministry of Social Justice and Empowerment, Government of India',
    phoneOrLink: 'https://nmba.dosje.gov.in',
    isDirectCall: false,
    badge: 'Youth Outreach Portal',
  },
  {
    id: 'parental-communication-guide',
    title: 'Parent & Educator Substance Prevention Framework',
    description:
      'Practical psychoeducational playbook on noticing early adolescent behavioral changes, establishing non-violent dialogue, and setting safe boundaries without alienation.',
    category: 'Parental Support',
    source: 'NIRAIVU Clinical Advisory Panel',
    phoneOrLink: 'tel:104',
    isDirectCall: true,
    badge: 'Parent Playbook',
  },
]

export const ILLUSTRATIVE_STORIES: StoryItem[] = [
  {
    id: 'story-karthik',
    title: 'Breaking the Cycle of Hostel Peer Pressure',
    personName: 'Karthik S.',
    ageGroup: '21 Years • Engineering Student',
    location: 'Chennai / Coimbatore College Hostel',
    background:
      'Entered college with top board scores, but faced intense academic stress in third semester. Began using cannabis and party stimulants after seniors insisted it was the only way to endure late-night coding hackathons.',
    turningPoint:
      'Within six months, attendance slipped, panic attacks began before practical exams, and a severe anxiety blackout during semester exams forced him to stop denying the problem.',
    recoveryJourney:
      'Confided in the campus student counselor who connected him with the District Mental Health Programme (DMHP) outpatient team. Completed 8 weeks of Cognitive Behavioral Therapy (CBT) and joined a student marathon training group.',
    currentStatus:
      'Graduated with honors, now working as a cloud systems engineer and voluntarily mentoring first-year college students on healthy stress management.',
    lesson:
      '“You do not need chemical shortcuts to be brilliant. The moment I learned to say no without guilt, I regained my focus and my self-respect.”',
  },
  {
    id: 'story-priya',
    title: 'Stepping Out of Silent Prescription Dependence',
    personName: 'Priya M.',
    ageGroup: '32 Years • Tech Team Lead',
    location: 'Tiruchirappalli / Chennai',
    background:
      'Was prescribed sedative sleeping tablets following a period of acute corporate burnout and personal bereavement. Over two years, escalated the dosage independently without psychiatric review.',
    turningPoint:
      'Experienced a severe hand tremor during a client presentation and realized she could not leave her apartment without carrying blister packs in her handbag.',
    recoveryJourney:
      'Contacted the Tamil Nadu 104 health helpline, which referred her to a supervised tapering program at a recognized medical college. Under psychiatric supervision, gradually tapered off over 14 weeks with sleep hygiene therapy.',
    currentStatus:
      'Completely free of sedatives for 2.5 years, sleeping naturally, and actively advocating for mental health awareness in IT companies.',
    lesson:
      '“Prescription pills can be just as dangerous as street substances when unmonitored. Asking for medical help was not weakness—it saved my life.”',
  },
  {
    id: 'story-selvam',
    title: 'A Father’s Unconditional Support Across Recovery',
    personName: 'Selvam & Vignesh',
    ageGroup: '52 Years (Father) & 24 Years (Son)',
    location: 'Madurai District',
    background:
      'Vignesh struggled with severe alcohol dependency following prolonged youth unemployment after graduation. Communication had devolved into frequent loud arguments at home.',
    turningPoint:
      'After Vignesh collapsed with acute alcohol withdrawal gastritis, Selvam realized anger and societal shame were driving his son further away. He decided to replace anger with medical care.',
    recoveryJourney:
      'Admitted Vignesh to a 30-day inpatient medical detoxification and rehabilitation facility in Madurai. Selvam attended every family counseling session to understand the science of addiction and rebuilt trust.',
    currentStatus:
      'Vignesh has maintained sobriety for over 3 years, running a successful agricultural supply business alongside his father.',
    lesson:
      '“When parents replace shame with compassionate medical guidance, children find the courage to fight their way back into the light.”',
  },
]
