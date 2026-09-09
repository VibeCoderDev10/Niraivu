import React, { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Stethoscope,
  Compass,
  Repeat,
  Sunrise,
} from 'lucide-react'

export const RecoveryPathway: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      stepNumber: '01',
      title: 'Recognize',
      tagline: 'Breaking the Silence of Denial',
      icon: Compass,
      summary:
        'Acknowledging that substance use is impacting health, relationships, studies, or peace of mind. Self-honesty is the initial turning point.',
      details:
        'Recognizing that tolerance has developed or that life has become centered around substance use is not an admission of weakness. It is the courageous realization that you deserve better.',
      actionTip: 'Self-Check: Notice changes in energy, sleep routines, and honesty with loved ones.',
    },
    {
      stepNumber: '02',
      title: 'Reach Out',
      tagline: 'Opening a Safe Channel',
      icon: HeartHandshake,
      summary:
        'Talking to a trusted friend, family member, university counselor, or calling the confidential Tele-MANAS (14446) helpline.',
      details:
        'You never have to navigate recovery in isolation. Confidential helplines and compassionate doctors in Tamil Nadu understand addiction as a treatable health condition.',
      actionTip: 'Action: A simple message to a trusted person: “I’m struggling and I need your help finding a counselor.”',
    },
    {
      stepNumber: '03',
      title: 'Get Support',
      tagline: 'Multidisciplinary Clinical Assessment',
      icon: Stethoscope,
      summary:
        'A comprehensive medical evaluation by an addiction medicine specialist or psychiatrist to assess physical and mental health.',
      details:
        'Doctors assess physiological dependence, underlying anxiety or depression (dual diagnosis), and prepare an individualized medical treatment plan.',
      actionTip: 'Action: Schedule an outpatient consultation at a recognized government hospital or psychiatric clinic.',
    },
    {
      stepNumber: '04',
      title: 'Treatment & Detox',
      tagline: 'Safe, Supervised Physical Healing',
      icon: CheckCircle2,
      summary:
        'Medically supervised detoxification to manage withdrawal symptoms safely, without dangerous cold-turkey complications.',
      details:
        'Medical detox uses safe clinical medications to stabilize neurotransmitters, prevent seizures, alleviate insomnia, and nourish the body back to physical equilibrium.',
      actionTip: 'Key Insight: Safe detoxification significantly reduces physical cravings in a supportive medical environment.',
    },
    {
      stepNumber: '05',
      title: 'Counseling & Recovery',
      tagline: 'Rewiring Habits & Coping Skills',
      icon: Repeat,
      summary:
        'Cognitive Behavioral Therapy (CBT), group support, and family counseling to identify emotional triggers and build healthy resilience.',
      details:
        'Learning how to manage stress, navigate social situations, build new peer networks, and handle setbacks without turning to chemical substances.',
      actionTip: 'Mindset: Recovery is a gradual journey of growth, learning from challenges, and daily consistency.',
    },
    {
      stepNumber: '06',
      title: 'Rebuild & Thrive',
      tagline: 'Reclaiming Purpose & Community',
      icon: Sunrise,
      summary:
        'Returning to academics, careers, passions, and contributing to a supportive community as an empowered individual.',
      details:
        'Rebuilding self-trust, restoring damaged relationships, and discovering renewed joy in everyday achievements and personal autonomy.',
      actionTip: 'Vision: Living with fulfillment (நிறைவு), clarity, and inner peace.',
    },
  ]

  return (
    <section className="py-16 border-t border-slate-800/80 bg-[#060b19]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Healing Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recovery Is Possible
          </h2>
          <p className="text-base sm:text-lg text-teal-300 font-medium mt-2">
            “Seeking help is not a failure. It is a step toward taking back control.”
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Healing is rarely a straight line, but with the right clinical and emotional support, sustainable recovery is achieved every single day.
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isCurrent = activeStep === idx

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-gradient-to-b from-teal-950/60 to-slate-900 border-teal-400 shadow-xl shadow-teal-500/10 ring-1 ring-teal-400'
                    : 'bg-[#0a1128] hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-teal-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <Icon
                      className={`w-5 h-5 ${
                        isCurrent ? 'text-teal-300' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                  </div>

                  <h3
                    className={`text-base font-bold tracking-tight mb-1 ${
                      isCurrent ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 font-medium line-clamp-2">
                    {step.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-teal-400 font-bold">
                  <span>{isCurrent ? 'Viewing' : 'Tap to Explore'}</span>
                  <span>→</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Step Expanded Focus Box */}
        <div className="mt-8 bg-gradient-to-br from-slate-900/90 via-[#0a1430] to-slate-900/90 p-6 sm:p-8 rounded-2xl border border-teal-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30">
                  Step {steps[activeStep].stepNumber} of 06
                </span>
                <span className="text-sm font-bold text-slate-300">
                  {steps[activeStep].tagline}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                {steps[activeStep].title}: {steps[activeStep].summary}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                {steps[activeStep].details}
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 sm:w-80 shrink-0 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 block">
                Practical Action
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {steps[activeStep].actionTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
