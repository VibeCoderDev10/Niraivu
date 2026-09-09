import { SubstanceInfo } from '../types'

export const SUBSTANCES_DATA: SubstanceInfo[] = [
  {
    id: 'alcohol',
    name: 'Alcohol',
    categoryName: 'Central Nervous System Depressant',
    tagline: 'Widely normalized but carries rapid tolerance and severe systemic toxicity.',
    commonNames: ['Liquor', 'Beer', 'Spirits', 'TASMAC beverages', 'Brewed drinks'],
    riskLevel: 'Very High',
    description:
      'Alcohol slows down the central nervous system, impairing motor coordination, judgment, inhibition, and cognitive processing. Prolonged excessive consumption induces physical dependence and progressive damage to liver, cardiovascular, and neural tissue.',
    physicalSigns: [
      'Slurred speech and loss of motor coordination',
      'Flushed skin and bloodshot or glassy eyes',
      'Alcohol odor on breath or clothes',
      'Morning hand tremors or shakiness',
      'Persistent digestive issues, gastritis, or unexplained weight changes',
    ],
    psychologicalSigns: [
      'Unpredictable mood swings and irritability',
      'Denial and defensive reactions when drinking is questioned',
      'Blackouts or memory gaps of events',
      'Loss of interest in academics, hobbies, and personal hygiene',
      'Using alcohol as the sole mechanism to cope with stress or sleep',
    ],
    healthRisks: [
      'Liver cirrhosis, fatty liver disease, and liver failure',
      'Cardiomyopathy, arrhythmias, and elevated stroke risk',
      'Wernicke-Korsakoff syndrome (neurological brain damage)',
      'Heightened risk of gastrointestinal cancers',
      'Severe delirium tremens (life-threatening withdrawal seizures)',
    ],
    withdrawalSymptoms: [
      'Tremors (shakes)',
      'Severe sweating and elevated heart rate',
      'Nausea and vomiting',
      'Agitation, visual hallucinations, or grand mal seizures',
    ],
    emergencyTriggers: [
      'Inability to stay conscious or respond to voice',
      'Slow, irregular breathing (less than 8 breaths per minute)',
      'Pale, clammy, or bluish skin around lips and fingernails',
      'Persistent vomiting while semi-conscious',
      'Seizures or sudden convulsive shaking',
    ],
    myths: [
      {
        myth: 'Beer is milder than hard liquor and cannot cause dependence.',
        fact: 'Standard servings of beer, wine, and spirits contain comparable amounts of pure ethanol. Dependence can develop regardless of the beverage type.',
      },
      {
        myth: 'Black coffee or a cold shower will sober someone up quickly.',
        fact: 'Only the liver’s metabolic rate metabolizes alcohol over time (approximately 1 standard drink per hour). Coffee or showers do not reduce blood alcohol concentration.',
      },
    ],
  },
  {
    id: 'tobacco-nicotine',
    name: 'Tobacco, Nicotine & Vapes',
    categoryName: 'Stimulant / Highly Addictive Alkaloid',
    tagline: 'Extremely high addictive potential that damages pulmonary and vascular systems.',
    commonNames: ['Cigarettes', 'Beedis', 'Chewing tobacco (Gutkha/Khaini)', 'E-cigarettes/Vapes'],
    riskLevel: 'High',
    description:
      'Nicotine reaches the brain within 7 to 10 seconds of inhalation, causing a quick surge of dopamine and adrenaline. Tolerance builds swiftly, leading to intense physical and psychological dependence alongside exposure to hundreds of toxic carcinogens.',
    physicalSigns: [
      'Persistent chronic cough or wheezing',
      'Yellow staining of fingers, fingernails, and teeth',
      'Smell of smoke or artificial sweet vape flavors on clothes',
      'Frequent gum inflammation or mouth lesions',
      'Elevated resting heart rate and blood pressure',
    ],
    psychologicalSigns: [
      'Intense restlessness or irritability when unable to use nicotine',
      'Difficulty focusing in classes or meetings without frequent breaks',
      'Anxiety and panic when personal device or supply is missing',
      'Social withdrawal to secluded areas to smoke or vape',
    ],
    healthRisks: [
      'Chronic Obstructive Pulmonary Disease (COPD) and chronic bronchitis',
      'Oral cancers, esophageal cancer, and lung cancer',
      'Coronary artery disease, heart attacks, and peripheral vascular disease',
      'Vape-associated acute lung injuries (EVALI)',
      'Permanent damage to brain development in young adults under 25',
    ],
    withdrawalSymptoms: [
      'Intense cravings',
      'Irritability and frustration',
      'Sleep disturbances and insomnia',
      'Increased appetite and difficulty concentrating',
    ],
    emergencyTriggers: [
      'Sudden crushing chest pain radiating to left arm or jaw',
      'Acute shortness of breath and coughing up blood',
      'Severe dizziness with acute fainting episodes',
    ],
    myths: [
      {
        myth: 'Vaping or e-cigarettes are just water vapor and harmless.',
        fact: 'Vape aerosols contain concentrated nicotine, heavy metals (lead, nickel), volatile organic compounds, and diacetyl linked to severe irreversible lung scarring.',
      },
      {
        myth: 'Smoking relieves long-term anxiety.',
        fact: 'Smoking only relieves the acute withdrawal irritability created by previous nicotine depletion. Baseline anxiety actually rises with regular smoking.',
      },
    ],
  },
  {
    id: 'cannabis',
    name: 'Cannabis (Ganja & Hashish)',
    categoryName: 'Cannabinoid / Psychoactive Agent',
    tagline: 'Alters perception, motivation, and cognitive retention with heightened risk for young brains.',
    commonNames: ['Ganja', 'Weed', 'Pot', 'Bhang', 'Hashish', 'Charas'],
    riskLevel: 'Moderate',
    description:
      'The psychoactive component THC (delta-9-tetrahydrocannabinol) binds to cannabinoid receptors in brain areas governing pleasure, memory, thinking, concentration, and coordination. High-potency strains carry an increased risk of cannabis use disorder and drug-induced psychosis.',
    physicalSigns: [
      'Characteristic bloodshot, glassy conjunctival eyes',
      'Dry mouth and persistent throat clearing',
      'Sudden episodes of ravenous hunger ("munchies")',
      'Sluggish coordination and delayed reaction times',
      'Lethargy and unusual sleeping patterns',
    ],
    psychologicalSigns: [
      'Amotivational syndrome: apathy, skipped classes, dropped ambitions',
      'Impaired short-term working memory and retention',
      'Paranoia, acute anxiety, or panic attacks in unfamiliar settings',
      'Distorted perception of time and space',
      'Depersonalization or feeling detached from reality',
    ],
    healthRisks: [
      'Cannabis Induced Psychosis (CIP) and acceleration of latent schizophrenia',
      'Cognitive decline and memory deficits with adolescent onset',
      'Cannabinoid Hyperemesis Syndrome (cyclic debilitating nausea & vomiting)',
      'Chronic bronchial irritation similar to tobacco smoking',
    ],
    withdrawalSymptoms: [
      'Sleep difficulties and vivid disturbing dreams',
      'Loss of appetite and weight loss',
      'Irritability, anger, and restlessness',
      'Depressive mood and stomach discomfort',
    ],
    emergencyTriggers: [
      'Severe acute paranoia, panic attacks, or terrifying hallucinations',
      'Extreme rapid heart rate (tachycardia) accompanied by chest pressure',
      'Incoherence or complete disorientation to time and place',
    ],
    myths: [
      {
        myth: 'Cannabis is entirely natural, so it is impossible to get addicted.',
        fact: 'Clinical studies show roughly 1 in 6 individuals who begin using cannabis in adolescence develop Cannabis Use Disorder (dependence), experiencing marked withdrawal when stopping.',
      },
      {
        myth: 'Cannabis enhances focus and academic creativity.',
        fact: 'Medical imaging demonstrates cannabis directly disrupts hippocampus activity, impairing memory encoding and executive reasoning required for studies.',
      },
    ],
  },
  {
    id: 'opioids',
    name: 'Opioids & Prescription Painkillers',
    categoryName: 'Opioid Analgesic / CNS Suppressant',
    tagline: 'Extreme potential for physical dependence and life-threatening respiratory failure.',
    commonNames: ['Heroin', 'Brown sugar', 'Tramadol', 'Morphine', 'Codeine syrups', 'Fentanyl'],
    riskLevel: 'Critical',
    description:
      'Opioids bind strongly to mu-opioid receptors in the brain and spinal cord, blocking pain signals while flooding the reward system with intense euphoria. Rapid down-regulation occurs, causing intense tolerance and physical agony during withdrawal.',
    physicalSigns: [
      'Constricted, pinpoint pupils (even in dim light)',
      '"Nodding off" — alternating between awake and semi-conscious states',
      'Shallow, dangerously slowed breathing',
      'Track marks, bruising, or covering arms with long sleeves in hot weather',
      'Chronic constipation and itching skin',
    ],
    psychologicalSigns: [
      'Total preoccupation with securing the next dose',
      'Drastic shifts in peer groups, deception, and stealing from family',
      'Severe emotional numbness and detachment from loved ones',
      'Financial crisis and unexplained disappearance of valuables',
    ],
    healthRisks: [
      'Fatal respiratory arrest and irreversible anoxic brain injury',
      'Blood-borne infections (HIV, Hepatitis B & C) from shared needles',
      'Bacterial endocarditis (infection of heart valves) and abscesses',
      'Severe physical dependence requiring medically supervised detoxification',
    ],
    withdrawalSymptoms: [
      'Severe muscle aches, bone pain, and abdominal cramps',
      'Involuntary leg jerking and kicking movements',
      'Profuse sweating, chills, and goosebumps ("cold turkey")',
      'Intense diarrhea, nausea, and vomiting',
    ],
    emergencyTriggers: [
      'Person cannot be awakened or stimulated by shaking or yelling',
      'Breathing is slow, shallow, or has stopped completely (gasping/snoring rattle)',
      'Fingertips, fingernails, or lips are dark blue or purple',
      'Limp body and pinpoint pupils (classic opioid overdose triad)',
    ],
    myths: [
      {
        myth: 'Prescription opioids are safe because they were prescribed by a doctor.',
        fact: 'Prescription opioids carry the exact same molecular dependence risks as illicit opioids. Misusing doses or taking them without prescription causes rapid addiction.',
      },
      {
        myth: 'Someone who is overdosing will wake up if you leave them to sleep it off.',
        fact: 'Opioid overdose suppresses the brain’s respiratory drive until breathing stops completely. Leaving someone unattended is fatal. Call 108 immediately.',
      },
    ],
  },
  {
    id: 'stimulants',
    name: 'Stimulants (MDMA, Amphetamines & Cocaine)',
    categoryName: 'Central Nervous System Stimulants',
    tagline: 'Artificially forces extreme cardiovascular strain, agitation, and crash depression.',
    commonNames: ['Meth / Crystal', 'Ecstasy / MDMA', 'Speed', 'Cocaine', 'Party pills'],
    riskLevel: 'Critical',
    description:
      'Stimulants trigger massive releases of dopamine, norepinephrine, and serotonin, artificially elevating alertness, energy, and body temperature. The subsequent neurochemical depletion triggers severe suicidal depression and paranoia.',
    physicalSigns: [
      'Significantly dilated pupils and rapid eye movements',
      'Incessant talking, jaw clenching, and teeth grinding (bruxism)',
      'Excessive sweating, high body temperature, and dehydration',
      'Loss of appetite and dramatic rapid weight loss',
      'Hyperactivity, fidgeting, and staying awake for days at a time',
    ],
    psychologicalSigns: [
      'Grandiose feelings of invincibility followed by crushing paranoia',
      'Unprovoked aggression, anger outbursts, and hostility',
      'Hallucinations (auditory or feeling bugs crawling on skin)',
      'Severe depression, apathy, and anhedonia during the crash phase',
    ],
    healthRisks: [
      'Acute myocardial infarction (heart attack) and lethal cardiac arrhythmias',
      'Severe hyperthermia (overheating) leading to acute organ failure',
      'Hemorrhagic stroke from acute spikes in blood pressure',
      'Stimulant-induced psychosis with extreme persecutory delusions',
    ],
    withdrawalSymptoms: [
      'Extreme fatigue and prolonged sleep ("sleeping for 48 hours")',
      'Severe dysphoria, profound depression, and suicidal ideation',
      'Vivid unpleasant nightmares and intense drug cravings',
      'Increased appetite and physical agitation',
    ],
    emergencyTriggers: [
      'Dangerous overheating (hot, dry skin without sweat or burning fever)',
      'Sudden seizures or uncontrolled convulsive tremors',
      'Severe crushing chest pain and feeling of impending doom',
      'Violent psychosis or self-harm emergency',
    ],
    myths: [
      {
        myth: 'Study pills or party stimulants just give you an edge for exams.',
        fact: 'They destroy genuine cognitive synthesis, disrupt sleep architecture, and induce severe rebound brain fog and anxiety during test periods.',
      },
      {
        myth: 'Drinking lots of water makes MDMA or party drugs completely safe.',
        fact: 'Excessive water consumption on MDMA can cause fatal water intoxication (hyponatremia), while MDMA itself directly strains the heart and body temperature regulation.',
      },
    ],
  },
  {
    id: 'sedatives',
    name: 'Sedatives & Prescription Sleeping Pills',
    categoryName: 'Benzodiazepines & Sedative-Hypnotics',
    tagline: 'High physical dependence risk; abrupt cessation can cause fatal seizures.',
    commonNames: ['Alprazolam', 'Diazepam', 'Clonazepam', 'Nitrazepam', 'Sleeping tablets'],
    riskLevel: 'Very High',
    description:
      'Benzodiazepines and sedative hypnotics amplify GABA neurotransmitter activity, suppressing brain signaling to produce sedation. While prescribed for acute anxiety or insomnia, non-medical use or continuous use creates rapid tolerance and dangerous physiological dependence.',
    physicalSigns: [
      'Drowsiness, grogginess, and unsteadiness while walking',
      'Slurred speech and sluggish reflexes',
      'Impaired visual coordination and frequent accidental falls',
      'Slowed shallow breathing when combined with alcohol',
    ],
    psychologicalSigns: [
      'Memory blackouts and inability to recall conversations',
      'Paradoxical reactions: sudden uninhibited aggression or emotional outbursts',
      'Doctor shopping and forging or manipulating prescriptions',
      'Overwhelming panic if doses are delayed by even a few hours',
    ],
    healthRisks: [
      'Fatal respiratory arrest, especially when combined with alcohol or opioids',
      'Severe rebound anxiety that is significantly worse than initial symptoms',
      'Life-threatening withdrawal seizures upon abrupt cessation',
      'Cognitive impairment and accelerated dementia risk in long-term users',
    ],
    withdrawalSymptoms: [
      'Severe rebound insomnia and terrifying nightmares',
      'Muscle stiffness, twitching, and hypersensitivity to sound and light',
      'Tachycardia and panic attacks',
      'Grand mal epileptic seizures requiring emergency ICU care',
    ],
    emergencyTriggers: [
      'Unconsciousness with shallow, irregular, or labored breathing',
      'Extreme confusion, delirium, or inability to stand up',
      'Seizures or tremors following missed doses',
    ],
    myths: [
      {
        myth: 'It is fine to stop taking sleeping pills cold-turkey whenever you feel like it.',
        fact: 'Abruptly stopping sedatives after weeks of use can cause life-threatening withdrawal seizures. Tapering must always be medically supervised by a psychiatrist.',
      },
      {
        myth: 'Taking sleeping pills with a drink helps you sleep deeper.',
        fact: 'Combining sedatives with alcohol causes synergistic respiratory depression and is one of the most common causes of accidental fatal overdoses.',
      },
    ],
  },
  {
    id: 'inhalants',
    name: 'Inhalants & Solvents',
    categoryName: 'Volatile Solvents, Gases & Aerosols',
    tagline: 'Chemical poisons that cause immediate brain cell death and sudden cardiac arrest.',
    commonNames: ['Glue', 'Paint thinner', 'Nail polish remover', 'Correction fluid (whitener)', 'Aerosol sprays', 'Petrol'],
    riskLevel: 'Very High',
    description:
      'Inhalants encompass volatile household and industrial chemicals inhaled through sniffing or huffing to achieve a brief, dizzying intoxication. The inhaled vapors displace oxygen in the lungs and dissolve the protective myelin sheath surrounding brain neurons.',
    physicalSigns: [
      'Chemical or solvent odor on breath, clothes, or skin',
      'Paint or chemical stains on face, hands, or clothing',
      'Redness, rash, or sores around mouth and nostrils ("glue-sniffer’s rash")',
      'Watery eyes, runny nose, and bloodshot sclera',
      'Drunken stumbling appearance with slurred speech',
    ],
    psychologicalSigns: [
      'Extreme apathy and disorientation',
      'Sudden unprovoked anger, delirium, and impaired judgment',
      'Memory lapses and inability to follow simple thoughts',
      'Hiding empty solvent bottles, rags, or pressurized cans',
    ],
    healthRisks: [
      '"Sudden Sniffing Death Syndrome": lethal cardiac arrhythmia within minutes of inhalation, even in first-time users',
      'Irreversible toxic brain damage (demyelination) and loss of motor control',
      'Permanent hearing loss and peripheral neuropathy',
      'Acute liver and kidney toxicity from aromatic hydrocarbons (toluene, benzene)',
    ],
    withdrawalSymptoms: [
      'Nausea and stomach cramps',
      'Headaches and dizziness',
      'Irritability, anxiety, and sleep disturbances',
      'Hand tremors and muscle weakness',
    ],
    emergencyTriggers: [
      'Sudden loss of consciousness or collapse while inhaling',
      'Convulsions, seizures, or foaming at the mouth',
      'Irregular pulse or cardiac arrest',
      'Suffocation from plastic bags or unconscious asphyxiation',
    ],
    myths: [
      {
        myth: 'Inhalants are just office supplies or household items, so they cannot be that toxic.',
        fact: 'Industrial solvents contain toxic industrial poisons never intended for human lungs. A single session can induce lethal ventricular fibrillation or irreversible brain damage.',
      },
      {
        myth: 'The high only lasts a few minutes, so the body clears it quickly.',
        fact: 'While the sensation is short, volatile hydrocarbons accumulate in fat-rich brain tissue and continue killing neurons for days.',
      },
    ],
  },
  {
    id: 'synthetic-substances',
    name: 'Synthetic & Novel Psychoactive Substances',
    categoryName: 'Research Chemicals / Synthetic Cannabinoids & Cathinones',
    tagline: 'Unregulated chemical cocktails with unpredictable and lethal neurological outcomes.',
    commonNames: ['Synthetic cannabinoids ("Spice/K2")', 'Bath salts', 'Mephedrone', 'Flakka'],
    riskLevel: 'Critical',
    description:
      'Synthesized in illicit clandestine laboratories, these novel compounds chemically mimic traditional drugs but possess 10x to 100x greater potency and toxic impurities. Their biological activity is highly unpredictable and often triggers violent psychiatric emergencies.',
    physicalSigns: [
      'Extreme hyperthermia (dangerously high fever) and profusely sweating',
      'Severe muscular tremors and rapid, bounding heart rate',
      'Nystagmus (involuntary, rapid side-to-side eye movement)',
      'Foaming at mouth or sudden collapse',
    ],
    psychologicalSigns: [
      'Bizarre, aggressive, or violent delirium (excited delirium syndrome)',
      'Terrifying paranoia and persecutory delusions of persecution',
      'Suicidal agitation or extreme self-destructive behavior',
      'Severe auditory and visual hallucinations',
    ],
    healthRisks: [
      'Fatal cardiac arrest and acute coronary syndrome in youth',
      'Severe rhabdomyolysis (rapid muscle breakdown clogging kidneys and causing kidney failure)',
      'Intracranial hemorrhage and stroke',
      'Protracted psychosis lasting weeks after drug elimination',
    ],
    withdrawalSymptoms: [
      'Severe psychological craving and panic',
      'Uncontrollable shaking and tremors',
      'Paranoid delusions and night terrors',
      'Profound suicidal depression',
    ],
    emergencyTriggers: [
      'Violent psychosis or extreme delirium where the individual does not recognize people',
      'Very high body temperature with confusion or stiff muscles',
      'Chest pain, hyperventilation, or repeated fainting spells',
    ],
    myths: [
      {
        myth: 'Synthetic drugs are manufactured in sterile labs and are safer than street drugs.',
        fact: 'They are crude chemical mixtures created with zero quality control, contaminated with toxic reagents, and carry immense death risks.',
      },
      {
        myth: 'They can be consumed safely if taken in small micro-amounts.',
        fact: 'Their potency is so extreme that microscopic measurement errors cause lethal overdoses.',
      },
    ],
  },
]
