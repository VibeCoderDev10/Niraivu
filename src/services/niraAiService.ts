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

import { HELP_CENTERS_DATA, EMERGENCY_NUMBERS } from '../data/centersData'

const GROUNDED_CENTERS_SUMMARY = HELP_CENTERS_DATA.map(
  (c) =>
    `• **${c.name}** (${c.district}) — *${c.category.toUpperCase()}*\n  Phone: ${c.phone} | Address: ${c.address}\n  Services: ${c.services.join(', ')}\n  Hours: ${c.hours}`
).join('\n\n')

const GROUNDED_HELPLINES_SUMMARY = EMERGENCY_NUMBERS.map(
  (e) => `• **${e.name}**: Call **${e.number}** (${e.badge}) — ${e.description}`
).join('\n')

const NIRA_SYSTEM_PROMPT = `You are NIRA (நிறைவு), the intelligent, compassionate AI guide built specifically for the NIRAIVU platform — dedicated to Drug-Free Tamil Nadu (போதையில்லா தமிழ்நாடு).

CRITICAL INSTRUCTION — YOU ARE DEEPLY INTEGRATED INTO THE NIRAIVU WEBSITE:
You are NOT a generic chatbot. You have full awareness and direct knowledge of all pages, interactive features, and verified data of this website. You must actively reference and guide users to the website's built-in tools:

1. NIRAIVU WEBSITE FEATURES & PAGES:
- "Find Help Near Me" page ([🗺️ Open Find Help Locator](#find-help)): Has an interactive OpenStreetMap Leaflet map with a "Use My Location" GPS button that calculates exact driving distances in kilometers to the nearest de-addiction hospital in Tamil Nadu. Includes filters for Government Hospitals, De-Addiction, Rehab, and Counseling.
- "Prevention" page ([🧪 Try Scenario Challenge](#prevention)): Features our interactive "What would you do?" scenario challenge testing hostel/party peer pressure, plus playbooks for Students, Parents, and Friends using the CLEAR refusal framework.
- "Learn" page ([📚 Explore Substance Profiles](#learn)): Clinical profiles for 8 substance classes, neurobiology of dopamine hijack, and debunked myths vs facts.
- "Resources" page ([📞 Helplines & Policy Resources](#resources)): Verified government links to Tele-MANAS, NIMHANS, and National Action Plan for Drug Demand Reduction.

2. VERIFIED TAMIL NADU REHABILITATION & HOSPITAL DATABASE (CITE THESE EXACT DETAILS WHEN ASKED):
${GROUNDED_CENTERS_SUMMARY}

3. OFFICIAL 24/7 HELPLINES ACROSS TAMIL NADU:
${GROUNDED_HELPLINES_SUMMARY}

4. HOW TO ANSWER SPECIFIC USER REQUESTS:
- When a user asks "find me nearest rehab", "where can I get help", "get this data", or mentions a Tamil Nadu city/district:
  1. Highlight our interactive map right on this website: "[🗺️ Open Find Help Locator](#find-help) — you can tap the **'Use My Location'** GPS button on our map to see exact driving distances in kilometers to the nearest verified centers in Tamil Nadu!"
  2. Provide the verified facilities from our database above for their district (or prominent government and non-profit centers across Chennai, Coimbatore, Madurai, Trichy, Salem, Tirunelveli, etc.) with real phone numbers, addresses, and service types.
  3. Remind them of 24/7 free Tele-MANAS (**14446**) and 108 Emergency Ambulance.
- When a user asks "get this data", "show data", or "list all centers":
  1. Provide the structured list of verified centers grouped by district with phones and addresses.
  2. Direct them to the interactive map at [🗺️ Open Find Help Locator](#find-help).
- When a user asks about peer pressure or how to say no:
  1. Teach the CLEAR framework (*Calm, Look for exit, Emphatic no, Alternative, Remove*).
  2. Direct them: "You can also test your real-world reactions on our interactive **[🧪 What Would You Do? Scenario Challenge](#prevention)** on the Prevention page!"
- When a user asks about risks or substances:
  1. Explain the neurobiology (dopamine receptor downregulation).
  2. Direct them to explore clinical profiles at **[📚 View Substance Profiles](#learn)**.
- When a user is in crisis or emergency:
  1. Tell them to immediately dial **108** or **14446**.
  2. Give clear recovery position instructions.

CRITICAL OUTPUT COMPLETENESS & FORMATTING RULES:
- ALWAYS complete every sentence and thought fully. NEVER cut off mid-sentence, mid-word, or mid-list.
- Keep your answers beautifully structured, warm, and readable (around 200 to 350 words). Avoid overwhelming walls of text.
- Use clean bullet points, bold highlights, and clear section headers (### Header).
- Always include the relevant website link ([🗺️ Open Find Help Locator](#find-help), [🧪 Try Scenario Challenge](#prevention), or [📚 View Substance Profiles](#learn)).

Tone: Warm, empathetic, human, conversational, reassuring. Speak like an understanding mentor or senior counselor in Tamil Nadu with zero judgment. Always ground your replies in NIRAIVU's verified tools and Tamil Nadu resources.`

/**
 * Calls live Google Gemini API with real-time SSE streaming for instant responses
 */
async function callGeminiApi(
  userPrompt: string,
  history: ChatMessage[],
  apiKey: string,
  onChunk?: (streamedText: string) => void
): Promise<string> {
  const contents: { role: string; parts: { text: string }[] }[] = []

  // Add last 6 turns of conversation history
  const recentHistory = history.slice(-6)
  recentHistory.forEach((msg) => {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })
  })

  // Add current prompt
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }],
  })

  const modelName = import.meta.env.VITE_AI_MODEL || 'gemini-3.5-flash-lite'
  const isStreaming = Boolean(onChunk)
  const endpoint = isStreaming ? 'streamGenerateContent?alt=sse' : 'generateContent'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:${endpoint}&key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: NIRA_SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 3500,
      },
    }),
  })

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.statusText}`)
  }

  // Handle SSE streaming
  if (isStreaming && res.body) {
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullText = ''
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith('data: ')) {
            const jsonStr = trimmed.replace('data: ', '').trim()
            if (jsonStr === '[DONE]') continue
            try {
              const parsed = JSON.parse(jsonStr)
              const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text || ''
              if (textChunk) {
                fullText += textChunk
                onChunk!(fullText)
              }
            } catch (e) {
              // Ignore partial SSE chunks
            }
          }
        }
      }

      // Flush any trailing buffer data
      if (buffer.trim()) {
        const lines = buffer.split('\n')
        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith('data: ')) {
            const jsonStr = trimmed.replace('data: ', '').trim()
            if (jsonStr !== '[DONE]') {
              try {
                const parsed = JSON.parse(jsonStr)
                const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text || ''
                if (textChunk) {
                  fullText += textChunk
                  onChunk!(fullText)
                }
              } catch (e) {
                // Ignore
              }
            }
          }
        }
      }

      if (fullText.trim().length > 30) {
        return fullText
      }
    } catch (streamErr) {
      console.warn('Streaming error encountered, falling back to non-streaming:', streamErr)
    }
  }

  // Non-streaming fallback if stream failed or was incomplete
  const fallbackRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: NIRA_SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 3500,
      },
    }),
  })

  if (!fallbackRes.ok) {
    throw new Error(`Gemini API error: ${fallbackRes.statusText}`)
  }

  const data = await fallbackRes.json()
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!candidate) {
    throw new Error('Empty response from Gemini API')
  }
  return candidate
}

/**
 * Intelligent, conversational AI engine for NIRA.
 * Supports real-time streaming, multi-turn memory, and emergency triage.
 */
export async function generateNiraResponse(
  userPrompt: string,
  history: ChatMessage[] = [],
  onChunk?: (streamedText: string) => void
): Promise<NiraResponse> {
  const query = userPrompt.toLowerCase().trim()

  // 1. Immediate Life-Threatening Emergency Protocol
  const isEmergency = EMERGENCY_KEYWORDS.some((kw) => query.includes(kw))
  if (isEmergency) {
    return {
      isEmergency: true,
      content: `🚨 **Please stay calm, but take action right now — your safety or your friend's safety is the absolute top priority.**

If someone is unconscious, having seizures, struggling to breathe, or in immediate distress, please don't wait:

📞 **Call 108 immediately** (Tamil Nadu Free Emergency Ambulance)  
📞 **Call 14446** (Tele-MANAS 24/7 Mental Health Helpline)  
📞 **Call 112** (National Emergency)

**While the ambulance is on the way:**
- If they are unconscious, gently turn them onto their side into the **Recovery Position** so their airway stays clear and they won't choke.
- Stay right beside them. Speak softly and keep them warm.
- Don't try to give them food, black coffee, or force them to vomit.
- Be completely honest with the paramedics about what was taken. Their job is solely to save a life without judgment.

I'm right here with you. Please call **108** right now.`,
      suggestions: [
        'Call 108 Ambulance right now',
        'How to place someone in the recovery position',
        'Find nearest hospital in Tamil Nadu',
      ],
    }
  }

  // 2. Strict Safety Boundary: Sourcing / Concealment
  const isRestricted = RESTRICTED_KEYWORDS.some((kw) => query.includes(kw))
  if (isRestricted) {
    return {
      isEmergency: false,
      content: `I hear what you're asking, but I can't help with finding, buying, making, or concealing substances. My sole purpose is to keep you safe, supported, and informed.

If things feel heavy right now, or if you're dealing with stress or peer pressure, we can talk about what's really going on behind that. I'm in your corner with zero judgment. Would you like to talk about how you're feeling?`,
      suggestions: [
        'How can I handle peer pressure?',
        'What are healthy ways to deal with stress?',
        'Talk to a confidential counselor (14446)',
      ],
    }
  }

  // 3. Try Live AI API with Streaming if Key is Configured
  const apiKey =
    import.meta.env.VITE_AI_API_KEY ||
    localStorage.getItem('nira_gemini_api_key') ||
    ''

  if (apiKey && apiKey.trim() !== '') {
    try {
      const liveAiText = await callGeminiApi(userPrompt, history, apiKey.trim(), onChunk)
      return {
        isEmergency: false,
        content: liveAiText,
        suggestions: [
          'How can I help a friend who may be using drugs?',
          'Tell me more about the CLEAR refusal framework',
          'Find rehabilitation centers in Tamil Nadu',
        ],
      }
    } catch (err) {
      console.warn('Live AI fallback triggered:', err)
      // Fall through to fast local conversational engine below
    }
  }

  // 4. Multi-Turn Context Aware Conversational Responses

  // Greetings & Check-ins
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query === 'vanakkam' ||
    query.startsWith('hi ') ||
    query.startsWith('hello ') ||
    query.startsWith('hey ') ||
    query.includes('how are you')
  ) {
    return {
      isEmergency: false,
      content: `Vanakkam! Hey there 👋 

I'm really glad you stopped by to talk. I’m **NIRA**, your confidential awareness and support friend. 

You can talk to me about anything that's on your mind—whether it's dealing with hostel peer pressure, worries about a friend or roommate, questions about how certain substances affect the brain, or finding safe help in Tamil Nadu. 

How is your day going? What brought you here today?`,
      suggestions: [
        'How can I help a friend who may be using drugs?',
        'I feel pressured by my friends. What should I do?',
        'Is talking to you really confidential?',
        'Find rehabilitation centers near me',
      ],
    }
  }

  // Confidentiality & Trust Question
  if (
    query.includes('confidential') ||
    query.includes('secret') ||
    query.includes('will you tell') ||
    query.includes('safe to talk') ||
    query.includes('police')
  ) {
    return {
      isEmergency: false,
      content: `Yes, you are completely safe here. 

Your conversation with me is private and judgment-free. I don't ask for your real name, phone number, or college details, and our mission is solely to give you trusted health guidance and emotional support.

Asking questions or reaching out for help is a sign of immense courage. You are in total control of this conversation. 

What's going on that made you want to ask? I'm listening.`,
      suggestions: [
        'I need advice about a friend',
        'I feel pressured at a college party',
        'What are early signs of addiction?',
      ],
    }
  }

  // Helping a Friend
  if (
    query.includes('help a friend') ||
    query.includes('friend using') ||
    query.includes('roommate') ||
    query.includes('my friend') ||
    query.includes('someone i know')
  ) {
    return {
      isEmergency: false,
      content: `First off, I want to say: **your friend is truly lucky to have you in their corner.** It takes real love and courage to step up when someone you care about might be slipping.

It's completely normal to feel worried about how to approach them without creating tension. Here is how you can talk to them:

**1. Pick a quiet, private moment**  
Don't bring it up at a party, in front of other hostel mates, or when they seem irritable. Catch them one-on-one when things are calm.

**2. Focus on how much you care, not on blaming them**  
Instead of saying: *"Why are you doing this? You're ruining your future,"* try something warm:  
> *"Hey, I've noticed you've been carrying a lot of stress lately and seem exhausted. I care about you a lot, and I'm honestly worried about your health. How are things really going?"*

**3. Don't be the lone savior — walk beside them**  
People often avoid seeking help because they're terrified of being judged by authorities or doctors. Offer to take the first step together:  
> *"You don't have to carry this alone. If you want, I can walk with you to the college counselor, or we can call Tele-MANAS (14446) together on speaker."*

**4. Protect your own boundaries**  
Support them emotionally, but don't lend them money for unknown expenses or lie to wardens/professors to cover for them. Loving someone means not protecting them from reality.

Have you noticed any particular changes in them lately, like missing classes or pulling away?`,
      suggestions: [
        'What warning signs should I look out for?',
        'What if my friend gets angry when I bring it up?',
        'Find counseling centers in Tamil Nadu',
        'How does the 14446 helpline work?',
      ],
    }
  }

  // Peer Pressure / Hostel Life
  if (
    query.includes('peer pressure') ||
    query.includes('pressured') ||
    query.includes('force me') ||
    query.includes('hostel') ||
    query.includes('say no') ||
    query.includes('party') ||
    query.includes('seniors')
  ) {
    return {
      isEmergency: false,
      content: `I hear you loud and clear. Being in a hostel or at a party when seniors or friends are pushing you to "just try it once to relax" is one of the hardest social situations any student faces.

Here is an absolute truth: **Real friends will never condition their respect on whether you harm yourself.**

Whenever you feel cornered in that moment, use the **CLEAR** formula:

- **C — Calm & Steady:** Look them directly in the eye and speak casually. If you look down or mumble, people think they can convince you.
- **L — Look for an exit:** Keep your body angled toward the door, or stay near someone who isn't participating.
- **E — Emphatic & Short:** Keep it brief: *"No thanks, I'm good"* or *"Nah, I don't touch that stuff."* You don't need to invent a long medical excuse.
- **A — Alternative:** Shift the spotlight: *"I'm going down for some chai / food, who's coming?"*
- **R — Remove yourself:** If they keep pushing, walk away smoothly. A minute of awkwardness is 100x better than years of regret.

Have you been dealing with this at your college or hostel recently? Tell me what happened, and we can figure out the easiest way to handle it together.`,
      suggestions: [
        'What if they call me boring or uncool?',
        'Try the "What would you do?" scenario challenge',
        'How to build healthy habits to manage exam stress',
      ],
    }
  }

  // Academic Stress & Exam Shortcuts
  if (
    query.includes('exam') ||
    query.includes('study') ||
    query.includes('stay awake') ||
    query.includes('stress') ||
    query.includes('tension') ||
    query.includes('burnout')
  ) {
    return {
      isEmergency: false,
      content: `Engineering, medical, and college exams in Tamil Nadu can feel like intense pressure cookers. A lot of students hear dangerous rumors like: *"Take this pill, it will help you study for 20 hours straight"* or *"Smoking weed relaxes your brain before exams."*

Here's the honest science: **It's a trap.** 

Chemical stimulants and substances actually destroy your brain's working memory and REM sleep. You might feel awake, but during the actual exam paper the next morning, your brain experiences severe brain fog and panic rebound.

**Real ways to handle exam stress that actually boost memory:**
1. **The 25/5 Pomodoro Method:** Study for 25 minutes, take a 5-minute break away from screens.
2. **Short 15-minute walks:** A brisk walk stimulates natural dopamine and neurogenesis (brain cell growth).
3. **Protect 6 hours of sleep:** Your brain only commits formulas and concepts to long-term memory while you are sleeping!

Are you feeling stressed about upcoming exams right now? What are you studying?`,
      suggestions: [
        'How can I manage intense exam anxiety naturally?',
        'What are the real effects of study pills and stimulants?',
        'Talk to a student counselor',
      ],
    }
  }

  // Warning Signs & How to Recognize Addiction
  if (
    query.includes('sign') ||
    query.includes('symptom') ||
    query.includes('how to know') ||
    query.includes('recognize') ||
    query.includes('notice') ||
    query.includes('addicted')
  ) {
    return {
      isEmergency: false,
      content: `Spotting the signs early is what allows people to step in before severe dependence sets in. 

Rather than looking at just one bad day, watch for a **pattern across these three areas:**

👀 **1. In their physical appearance:**
- Bloodshot or glassy eyes; unusually dilated or pinpoint pupils.
- Sudden unexplained weight loss or completely skipping meals.
- Strange chemical, incense, or smoke smells on their clothes or in their room.
- Wearing long-sleeved jackets or hoodies constantly, even in warm Tamil Nadu weather.

🚪 **2. In their everyday behavior:**
- Suddenly locking their hostel or bedroom doors and whispering on calls.
- Skipping morning classes, attendance dropping below mandatory cutoffs.
- Asking for urgent money or loans with vague, fabricated reasons.
- Pulling away from longtime friends and hanging out exclusively with a new crowd.

⚡ **3. In their emotions:**
- Unpredictable mood swings: laughing one moment, intensely irritable the next.
- Losing interest in sports, gaming, projects, or hobbies they used to love.
- Becoming extremely defensive or angry if anyone asks how they're doing.

Are you noticing some of these signs in yourself, or in a friend or family member?`,
      suggestions: [
        'How to bring this up with them gently?',
        'Find de-addiction centers in Tamil Nadu',
        'Can someone recover from this completely?',
      ],
    }
  }

  // Finding Care in Tamil Nadu & Center Data Queries
  if (
    query.includes('center') ||
    query.includes('rehab') ||
    query.includes('hospital') ||
    query.includes('near me') ||
    query.includes('nearest') ||
    query.includes('data') ||
    query.includes('tamil nadu') ||
    query.includes('chennai') ||
    query.includes('madurai') ||
    query.includes('coimbatore') ||
    query.includes('trichy') ||
    query.includes('doctor') ||
    query.includes('where can i get help')
  ) {
    return {
      isEmergency: false,
      content: `I am right here with you, and you can get certified, compassionate medical care across Tamil Nadu immediately.

To find the closest certified center with exact driving distance in kilometers from your exact GPS location, click our interactive map feature right now:

👉 **[🗺️ Open Find Help Locator](#find-help)** *(Tap **"Use My Location"** on our interactive map for real-time distance calculation!)*

Here is our verified directory of trusted de-addiction hospitals and facilities across Tamil Nadu:

### 🏥 Verified Tamil Nadu Treatment Centers
- **Chennai:** **Institute of Mental Health (IMH), Kilpauk** — 📞 044-26420556  
  *Address:* Medavakkam Tank Road, Kilpauk, Chennai 600010  
  *Care:* 24/7 dedicated govt inpatient detoxification & psychiatric emergency.
- **Chennai:** **TTK Hospital, Adyar** — 📞 044-24912950  
  *Address:* 4th Main Road, Indira Nagar, Adyar, Chennai 600020  
  *Care:* India's premier non-profit residential recovery center & family therapy.
- **Coimbatore:** **CMCH De-Addiction Unit** — 📞 0422-2301393  
  *Address:* Trichy Road, Gopalapuram, Coimbatore 641018 (Govt Hospital)
- **Coimbatore:** **PSG Institute of Medical Sciences** — 📞 0422-2570170  
  *Address:* Avinashi Road, Peelamedu, Coimbatore 641004
- **Madurai:** **Government Rajaji Hospital** — 📞 0452-2532535  
  *Address:* Panagal Road, Shenoy Nagar, Madurai 625020 (Govt Hospital)
- **Tiruchirappalli:** **KAP Viswanathan Govt Medical College** — 📞 0431-2415511  
  *Address:* Collector Office Road, Cantonment, Trichy 620001
- **Salem:** **Govt Mohan Kumaramangalam Medical College** — 📞 0427-2211212  
  *Address:* Steel Plant Road, Salem 636030
- **Tirunelveli:** **TVMCH Hospital, Palayamkottai** — 📞 0462-2572733  
  *Address:* High Ground Road, Palayamkottai, Tirunelveli 627011

### 📞 24/7 Free Helplines Across Tamil Nadu:
- **Tele-MANAS (Mental Health & Counseling):** **14446** *(Toll-Free, Tamil & English, 24/7)*
- **Tamil Nadu Health Helpline:** **104**
- **Emergency Medical Ambulance:** **108**

Which district are you currently in? I can guide you to the exact closest facility!`,
      suggestions: [
        'Open Find Help locator map',
        'Call 14446 Tele-MANAS',
        'What happens when you visit a de-addiction ward?',
        'Is government treatment free in Tamil Nadu?',
      ],
    }
  }

  // Recovery & Hope
  if (
    query.includes('recover') ||
    query.includes('hope') ||
    query.includes('cure') ||
    query.includes('stop') ||
    query.includes('quit') ||
    query.includes('can i change')
  ) {
    return {
      isEmergency: false,
      content: `I want to answer this with 100% honesty and conviction: **Yes. Recovery is absolutely, unconditionally possible.**

The human brain has an incredible superpower called **neuroplasticity**. When someone has been using drugs or alcohol, the brain's reward circuits get temporarily hijacked. But the moment medical treatment begins and the brain is given clean time, counseling, and rest, those receptors regenerate and heal.

**What real recovery looks like:**
- It is rarely a straight line—there will be tough days and good days.
- Asking for medical help is not a failure; it is the moment you take your steering wheel back.
- Thousands of students and professionals right here in Tamil Nadu who once felt completely hopeless have rebuilt their careers, restored trust with their families, and found deep peace.

If you or someone you care about wants to take that first step, you don't have to leap the whole staircase at once. Just taking one step today is enough. 

Would you like to explore what medical detoxification actually looks like?`,
      suggestions: [
        'What happens during medical detox?',
        'Read illustrative recovery stories',
        'Find nearby counseling centers',
      ],
    }
  }

  // Emotional Support / Feeling Scared or Down
  if (
    query.includes('scared') ||
    query.includes('afraid') ||
    query.includes('alone') ||
    query.includes('crying') ||
    query.includes('sad') ||
    query.includes('hopeless') ||
    query.includes('feel bad') ||
    query.includes('anxious')
  ) {
    return {
      isEmergency: false,
      content: `I hear you, and I want to sit with you in this moment. Please take a gentle, deep breath. 

Whatever you are going through right now, please know that **you are not alone, and you are not broken.** Life can throw immense weight at us, and it makes complete sense that you feel overwhelmed.

You don't have to figure out the next 5 years of your life right now. You only need to get through today. 

If you want someone to speak to confidentially right this second, you can call **14446** (Tele-MANAS). They have kind, gentle counselors available 24/7 in Tamil and English who will just listen to you without judgment.

I am right here too. Would you like to tell me a little bit about what's making you feel this way?`,
      suggestions: [
        'Call 14446 Tele-MANAS (24/7 Free)',
        'I need help dealing with stress',
        'How can I help a friend who may be using drugs?',
      ],
    }
  }

  // Default Conversational Response
  return {
    isEmergency: false,
    content: `I'm really glad you brought this up. 

As your awareness guide for a **Drug-Free Tamil Nadu**, I want to make sure you get clear, supportive, and practical answers without any lectures or judgment. 

Here are a few areas we can explore together right now:
- **Helping a friend:** How to talk to a roommate or classmate gently.
- **Handling social pressure:** Practical ways to say no without feeling uncool at parties or hostels.
- **Understanding substance risks:** What alcohol, cannabis, or party pills really do to the body and brain.
- **Finding verified local care:** Getting connected with confidential doctors and counselors in Tamil Nadu.

Tell me a little more about what's on your mind, or tap one of the questions below!`,
    suggestions: [
      'How can I help a friend who may be using drugs?',
      'I feel pressured by my friends. What should I do?',
      'Find rehabilitation centers near me',
      'What are signs that someone may need help?',
      'What should I do in an emergency?',
    ],
  }
}
