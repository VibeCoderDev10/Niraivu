import { ChatMessage } from '../types'

export interface NiraResponse {
  content: string
  isEmergency: boolean
  suggestions?: string[]
}

const EMERGENCY_KEYWORDS = [
  'overdose',
  'unconscious',
  'not breathing',
  'hard to breathe',
  'passed out',
  'seizure',
  'convulsion',
  'suicide',
  'kill myself',
  'want to die',
  'dying',
  'swallowed a lot of pills',
  'bleeding',
  'chest pain',
  'foaming',
  'blue lips',
]

const RESTRICTED_KEYWORDS = [
  'how to buy',
  'where to buy',
  'how to make',
  'how to cook meth',
  'recipe for',
  'how to hide',
  'pass a drug test fast',
  'conceal drugs',
  'how much to get high',
  'good dose',
]

/**
 * Intelligent local NLP response engine for NIRA.
 * Provides empathetic, evidence-based guidance and strict emergency triage.
 */
export async function generateNiraResponse(
  userPrompt: string,
  history: ChatMessage[] = []
): Promise<NiraResponse> {
  const query = userPrompt.toLowerCase().trim()

  // 1. Check for Emergency / Life-Threatening Situations
  const isEmergency = EMERGENCY_KEYWORDS.some((kw) => query.includes(kw))
  if (isEmergency) {
    return {
      isEmergency: true,
      content: `🚨 **IMMEDIATE EMERGENCY PROTOCOL**

I am glad you reached out, but **your safety is the absolute top priority right now**. If you or someone near you is in medical distress, experiencing severe difficulty breathing, unconscious, having seizures, or having thoughts of self-harm, please act immediately:

1. **Call 108 immediately** (Tamil Nadu Free Emergency Ambulance Service).
2. **Call 112** (National Unified Emergency Response).
3. **Call 14446** (Tele-MANAS 24/7 Mental Health Crisis Line — Tamil & English).

**Immediate First-Aid Guidelines:**
• If the person is unconscious but breathing, turn them onto their side into the **Recovery Position** to keep their airway open and prevent choking.
• Stay with them. Keep them calm and warm.
• Do not give them food, black coffee, or attempt to induce vomiting.
• Inform emergency responders honestly about what was taken so they can administer the right antidote without delay.

*You do not have to face this alone. Help is on the way.*`,
      suggestions: [
        'Call 108 Emergency Ambulance',
        'Call 14446 Tele-MANAS',
        'How to place someone in the recovery position?',
        'Find nearest emergency hospital in Tamil Nadu',
      ],
    }
  }

  // 2. Check for Prohibited / Dangerous Queries
  const isRestricted = RESTRICTED_KEYWORDS.some((kw) => query.includes(kw))
  if (isRestricted) {
    return {
      isEmergency: false,
      content: `I cannot assist with instructions for obtaining, manufacturing, concealing, or consuming controlled substances. My purpose is strictly to provide confidential health awareness, prevention strategies, and recovery support.

If you or a loved one are experiencing cravings, feeling overwhelmed, or looking for ways to cope with stress, I am here to help you find safe, judgment-free support. Would you like to explore healthy alternatives or talk to a confidential counselor?`,
      suggestions: [
        'How can I handle peer pressure?',
        'What are healthy ways to manage stress?',
        'Find confidential de-addiction centers near me',
        'Speak to a Tele-MANAS counselor',
      ],
    }
  }

  // 3. Contextual Responses Based on Intent

  // Helping a friend
  if (
    query.includes('help a friend') ||
    query.includes('friend using') ||
    query.includes('roommate') ||
    query.includes('someone i know')
  ) {
    return {
      isEmergency: false,
      content: `I’m really glad you reached out. Stepping forward to help a friend shows deep care and courage. Here is how you can support them without judgment or confrontation:

### 1. Choose the Right Moment
• Talk in a quiet, private setting when neither of you is stressed, angry, or under the influence.
• Avoid cornering them in front of others, which triggers defensiveness and shame.

### 2. Use Empathetic "I" Statements
• Say: *"I care about you, and I’ve noticed you’ve been seeming stressed and exhausted lately. I’m worried about your health."*
• Avoid blaming statements like: *"You are ruining your life"* or *"Why are you doing drugs?"*

### 3. Avoid Enabling
• Don’t cover for their absences, lend money for unknown expenses, or make excuses for them. Loving someone means not protecting them from the reality of their health.

### 4. Offer Accompaniment
• Fear of judgment often prevents people from seeking help. Offer to take the first step together:
  - *"Would you like me to walk with you to the college counselor?"*
  - *"We can call the Tamil Nadu 104 helpline or Tele-MANAS (14446) together right now."*

### 5. Remember Your Own Boundaries
• You can support them, but you cannot cure them alone. Involve professional medical guidance early.`,
      suggestions: [
        'What are early warning signs to watch for?',
        'Find de-addiction centers in Tamil Nadu',
        'What is the CLEAR refusal method?',
        'How does Tele-MANAS work?',
      ],
    }
  }

  // Handling Peer Pressure
  if (
    query.includes('peer pressure') ||
    query.includes('pressured') ||
    query.includes('force me') ||
    query.includes('party') ||
    query.includes('hostel') ||
    query.includes('say no')
  ) {
    return {
      isEmergency: false,
      content: `It takes immense personal strength to pause and say no when everyone around you seems to be participating. Remember: **Real friends will never condition their respect on your self-harm.**

Here is the **CLEAR Refusal Framework**, tested by student psychologists:

• **C — Calm & Confident:** Maintain eye contact and a steady tone. Hesitation or looking down invites pushy peers to insist.
• **L — Look for an Exit:** Keep your body angled toward the door or a safer group.
• **E — Emphatic & Short:** Say: *"No thanks, I don’t do that"* or *"I’m good with my drink."* You never owe anyone an elaborate medical excuse.
• **A — Alternative Suggestion:** *"I’m heading down to get some tea / food; coming with?"* If they persist, you have already transitioned away.
• **R — Remove Yourself:** If they keep pushing, walk away smoothly. A momentary awkward silence is far better than years of regret.

### Practical Tips for College & Hostels:
1. Always keep your own beverage cup in your hand so people don't offer you another.
2. Find at least one peer who shares your values. Even two people together create an unbreakable boundary.
3. Have a predefined exit plan (e.g., a family call or early morning commitment).`,
      suggestions: [
        'Try the interactive "What would you do?" scenario',
        'What are the effects of cannabis and party pills?',
        'How to build healthy stress coping habits?',
      ],
    }
  }

  // Finding Centers / Tamil Nadu Help
  if (
    query.includes('center') ||
    query.includes('rehab') ||
    query.includes('hospital') ||
    query.includes('near me') ||
    query.includes('tamil nadu') ||
    query.includes('chennai') ||
    query.includes('madurai') ||
    query.includes('coimbatore')
  ) {
    return {
      isEmergency: false,
      content: `Tamil Nadu has an established network of recognized government psychiatric hospitals, District Mental Health Programmes (DMHP), and specialized de-addiction centers:

### Verified Key Facilities:
• **Chennai:** Institute of Mental Health (IMH), Kilpauk — 044-26420556 (24/7 Govt Inpatient & Detox)
• **Chennai:** TTK Hospital, Adyar — 044-24912950 (Pioneering residential de-addiction institution)
• **Madurai:** Government Rajaji Hospital Psychiatry Unit — 0452-2532535
• **Coimbatore:** Coimbatore Medical College Hospital (CMCH) — 0422-2301393
• **Tiruchirappalli:** KAP Viswanathan Govt Medical College Hospital — 0431-2415511
• **Salem:** Govt Mohan Kumaramangalam Medical College Hospital — 0427-2211212
• **Tirunelveli:** Tirunelveli Medical College Hospital (TVMCH) — 0462-2572733

### Statewide 24/7 Helplines:
• **Tele-MANAS (Mental Health & Substance Advisory):** Call **14446** (Toll-Free, Tamil & English)
• **TN Health Information Line:** Call **104**
• **Emergency Ambulance:** Call **108**

You can also use our interactive **Find Help Near Me** map page to view real-time distances, exact addresses, and filter by government vs counseling facilities!`,
      suggestions: [
        'Open Find Help Locator page',
        'Is de-addiction treatment confidential?',
        'What happens during medical detoxification?',
      ],
    }
  }

  // Warning Signs / How to Recognize
  if (
    query.includes('sign') ||
    query.includes('symptom') ||
    query.includes('how to know') ||
    query.includes('recognize') ||
    query.includes('notice')
  ) {
    return {
      isEmergency: false,
      content: `Recognizing warning signs early can save lives. Warning signs typically emerge across three distinct dimensions:

### 1. Physical Changes
• Bloodshot or glassy eyes; pinpoint or widely dilated pupils
• Unexplained weight loss or gain; deteriorating personal hygiene
• Slurred speech, unsteady gait, or unexplained hand tremors
• Strange chemical or smoke odors on clothing and breath
• Wearing long sleeves even in hot Tamil Nadu weather to hide puncture marks or bruising

### 2. Behavioral Shifts
• Sudden drop in academic performance, missed classes, or absenteeism
• Increased secrecy: locking bedroom doors, hiding bags, whispering on phone calls
• Unexplained financial requests or disappearing valuables from home
• Drastic change in friend circles; abandonment of longtime hobbies

### 3. Emotional & Psychological Shifts
• Unprovoked anger flare-ups, extreme irritability, or sudden hostility
• Severe lethargy, lack of motivation, or alternating bouts of hyperactivity and exhaustion
• Paranoia, anxiety, or emotional numbness

*Notice: Having one sign doesn't automatically imply substance use, but a cluster of these signs warrants a gentle, caring conversation.*`,
      suggestions: [
        'How to start a conversation with someone showing these signs?',
        'Find nearby counseling centers',
        'Can you explain the effects of drug abuse?',
      ],
    }
  }

  // Effects of Drugs
  if (
    query.includes('effect') ||
    query.includes('harm') ||
    query.includes('danger') ||
    query.includes('what happens') ||
    query.includes('why bad')
  ) {
    return {
      isEmergency: false,
      content: `Substance abuse creates profound disruptions throughout the entire human body and social life:

### 1. The Brain & Dopamine Hijack
Natural activities (eating, exercising, achieving a goal) release moderate dopamine spikes. Drugs flood the brain's reward center with 2x to 10x unnatural dopamine surges. Over time, the brain down-regulates its receptors:
• Everyday life loses all joy (anhedonia).
• The individual requires the drug just to feel normal, not high.

### 2. Physical Health Impacts
• **Cardiovascular:** Extreme blood pressure spikes, irregular heartbeats, and heart attacks (especially stimulants).
• **Respiratory:** Fatal breathing suppression (opioids, sedatives, alcohol combinations).
• **Neurological:** Permanent cognitive decline, memory impairment, and psychosis.
• **Organ Damage:** Cirrhosis of the liver, acute kidney failure, and weakened immune defense.

### 3. Relationships & Life Trajectory
• Broken trust with parents, spouses, and close friends.
• Disrupted university degrees, career stagnation, and severe financial debt.
• Legal vulnerabilities and police prosecution under the NDPS Act.

**The Good News:** The brain has remarkable neuroplasticity. With evidence-based medical treatment and psychological support, recovery and rebuilding are 100% possible.`,
      suggestions: [
        'What are the 6 stages of recovery?',
        'How does medical detoxification work?',
        'Find rehabilitation centers near me',
      ],
    }
  }

  // General Welcoming / Default Response
  return {
    isEmergency: false,
    content: `I’m glad you reached out. I am **NIRA**, your confidential awareness and support guide dedicated to building a **Drug-Free Tamil Nadu**.

You don’t have to handle stress, questions, or concerns alone. Here are a few ways I can assist you right now:

• **Educational Insights:** Understand how different substances affect the brain and body.
• **Practical Prevention:** Learn the CLEAR refusal framework to handle peer pressure in college hostels or social events.
• **Helping Others:** Get gentle, non-judgmental guidance on supporting a friend or family member.
• **Finding Local Care:** Locate verified government hospitals and de-addiction facilities across Tamil Nadu.
• **Crisis Guidance:** Immediate emergency protocols and verified helplines (108, 104, 14446).

What would you like to explore together today?`,
    suggestions: [
      'How can I help a friend who may be using drugs?',
      'I feel pressured by my friends. What should I do?',
      'Find rehabilitation centers near me',
      'What are signs that someone may need help?',
      'What should I do in an emergency?',
    ],
  }
}
