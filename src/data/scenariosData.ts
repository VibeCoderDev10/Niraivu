import { PreventionScenario } from '../types'

export const PREVENTION_SCENARIOS: PreventionScenario[] = [
  {
    id: 'college-hostel-party',
    title: 'The Pre-Exam Hostel Gathering',
    audience: 'Students',
    context:
      'You are an engineering college student in Tamil Nadu preparing for semester exams. A senior and a close hostel mate invite you to a late-night room gathering, claiming they have something to "relieve exam tension and help you stay awake to ace tomorrow’s paper."',
    situation:
      'When you arrive, they pass around an unmarked pill and a joint, saying: "Come on, don’t be a kid. Everyone in our department takes this to crack semester exams. Just take one hit, it will relax your brain."',
    options: [
      {
        id: 'hostel-opt-1',
        text: 'Take a small amount just to fit in with seniors, thinking one time won’t harm.',
        isRecommended: false,
        outcome:
          'Dangerous choice. First-time use in high-stress states frequently leads to acute anxiety, panic attacks, or poor exam performance the next morning. It also reinforces peer vulnerability.',
        rationale:
          'Substances drastically disrupt working memory, concentration, and REM sleep architecture. Giving in once signals that your boundaries can be pushed again.',
        skillsTaught: ['Boundary Setting', 'Recognizing False Academic Shortcuts'],
      },
      {
        id: 'hostel-opt-2',
        text: 'Aggressively lecture the group on drug abuse and threaten to report them immediately to the college warden.',
        isRecommended: false,
        outcome:
          'Escalates immediate conflict. While reporting illegal behavior may be necessary in unsafe conditions, aggressive public confrontation in a closed room often provokes hostility or defensive bullying.',
        rationale:
          'Your personal safety comes first. De-escalating and exiting the immediate environment is safer than provoking an agitated group.',
        skillsTaught: ['Situational Awareness', 'Conflict De-escalation'],
      },
      {
        id: 'hostel-opt-3',
        text: 'Use the CLEAR refusal tactic: Speak calmly and firmly: "No thanks, I don’t touch that stuff. I need a clear head for tomorrow," suggest tea/coffee, and leave the room smoothly.',
        isRecommended: true,
        outcome:
          'Best practice! You protect your health, establish clear personal autonomy without provoking hostility, and safely remove yourself from a compromised environment.',
        rationale:
          'Firm, unapologetic refusal delivered without self-doubt rarely gets challenged more than twice. Immediately changing your physical location removes peer leverage.',
        skillsTaught: ['CLEAR Refusal Framework', 'Firm Body Language', 'Safe Exit Strategy'],
      },
    ],
  },
  {
    id: 'roommate-signs-crisis',
    title: 'Spotting Warning Signs in a Close Roommate',
    audience: 'Friends',
    context:
      'Over the last 4 weeks, your college roommate has stopped attending morning lectures, stays locked in the bathroom for unusually long periods, has sudden severe mood outbursts, and recently asked you for large loans citing fabricated emergencies.',
    situation:
      'Yesterday, you noticed prescription sedative blister packs hidden in their bag, and they appeared drowsy, slurring words, and burned incense to mask chemical odors. You want to help before their academic term is terminated.',
    options: [
      {
        id: 'friend-opt-1',
        text: 'Confront them furiously, call them an addict in front of mutual friends, and demand they repay your money right now.',
        isRecommended: false,
        outcome:
          'Triggers defensive shame, denial, and social isolation. Public shaming reinforces the psychological urge to use more substances to escape humiliation.',
        rationale:
          'Shame never cures addiction. Substance dependence is accompanied by neurochemical distress; aggressive public exposure closes lines of communication.',
        skillsTaught: ['Avoiding Stigma', 'Non-Violent Communication'],
      },
      {
        id: 'friend-opt-2',
        text: 'Ignore the behavior completely and lend them the money so you don’t ruin your friendship or cause them stress.',
        isRecommended: false,
        outcome:
          'Enabling behavior. Providing money or covering for missed classes directly subsidizes substance acquisition and delays life-saving clinical intervention.',
        rationale:
          'Enabling keeps the person in denial. Protecting someone from the consequences of addiction often prolongs self-harm.',
        skillsTaught: ['Stopping Enabling', 'Healthy Loyalty Boundaries'],
      },
      {
        id: 'friend-opt-3',
        text: 'Have a private, one-on-one conversation using "I" statements, express genuine concern: "I care about you and I’ve noticed you are struggling," and offer to walk with them to the university student counselor or call Tele-MANAS (14446) together.',
        isRecommended: true,
        outcome:
          'Optimal supportive approach! It breaks the silence with empathy, avoids accusations, and connects them directly with qualified psychological professionals.',
        rationale:
          'Compassionate, private intervention removes threat defensiveness. Offering accompaniment ("I will walk with you") significantly reduces fear of reaching out.',
        skillsTaught: ['Empathetic Confrontation', 'Active Listening', 'Connecting to Professional Care'],
      },
    ],
  },
  {
    id: 'parent-discovering-changes',
    title: 'A Parent Noticing Unexplained Behavioral Shifts',
    audience: 'Parents',
    context:
      'Your 19-year-old son/daughter studying in an urban college has returned home for vacation. You notice severe sleep irregularities (awake all night, asleep all day), unusual weight loss, locked bedroom doors, and missing silver items from the house.',
    situation:
      'You find a rolled currency note and strange foil residue in their travel bag. You are shocked, terrified, and heartbroken.',
    options: [
      {
        id: 'parent-opt-1',
        text: 'Lock them in their room without food, scream that they have brought utter disgrace upon the family honor, and refuse to speak to them.',
        isRecommended: false,
        outcome:
          'Extremely dangerous. Sudden unmonitored forced withdrawal can cause acute medical crises (seizures, delirium), while emotional trauma increases suicide risk.',
        rationale:
          'Addiction is a medical health issue, not a moral failure or a test of family honor. Medical withdrawal requires clinical supervision.',
        skillsTaught: ['Trauma Prevention', 'Understanding Neurobiological Dependence'],
      },
      {
        id: 'parent-opt-2',
        text: 'Stay in denial: throw away the paraphernalia, pretend you saw nothing, and hope marriage or a new job will magically fix the problem.',
        isRecommended: false,
        outcome:
          'Allows addiction to progress from manageable early stages to severe physiological dependency and potential legal or fatal consequences.',
        rationale:
          'Substance use disorders do not cure themselves through avoidance. Early medical intervention has the highest rates of sustained recovery.',
        skillsTaught: ['Facing Reality with Courage', 'Early Clinical Intervention'],
      },
      {
        id: 'parent-opt-3',
        text: 'Take a deep breath to stabilize your own panic. Speak with your child calmly without judgment: "We love you, your life matters most to us, and we are going to get through this with medical help." Immediately consult a recognized de-addiction hospital or psychiatrist.',
        isRecommended: true,
        outcome:
          'The gold standard parental response. Replaces terror with structured clinical support, opens lines of honest dialogue, and accesses professional medical detoxification.',
        rationale:
          'When patients know their family supports their recovery rather than abandoning them in shame, treatment completion rates multiply dramatically.',
        skillsTaught: ['Calm Leadership', 'Family Psychoeducation', 'De-Stigmatizing Treatment'],
      },
    ],
  },
]
