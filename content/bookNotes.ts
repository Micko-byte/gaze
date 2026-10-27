/*
 * The client's write-ups for her titles (22 Oct 2026), shown on each book's page under "About the book". Stay by Design
 * and The Friend in the Mirror have none yet.
 */
export type BookNote = {
  epigraph: string;
  intro: string[];
  inside: { title: string; body: string }[];
  forWhom: { title: string; body: string }[];
};

export const bookNotes: Record<string, BookNote> = {
  'my-journey-as-a-kingdom-wife-to-be': {
    epigraph: 'Becoming a Kingdom wife is not about waiting for a ring—it is about the sacred architecture of preparing your heart, spirit, and life for divine partnership.',
    intro: [
      'In a culture that often reduces marriage to romance, social status, or mere readiness, My Journey as a Kingdom Wife to Be invites women into a deeper, higher calling. True partnership in the Kingdom is not stumbled into by accident; it is cultivated through intentional spiritual alignment, personal healing, and an unyielding commitment to God’s design for covenant relationship.',
      'In this deeply honest and reflective work, Muthoni Ngugi shares her personal journey, spiritual revelations, and practical wisdom on what it truly means to prepare for a God-centered marriage. She moves past superficial relationship advice to address the internal architecture required to walk alongside a partner in purpose, peace, and spiritual strength.',
    ],
    inside: [
      { title: 'The Heart of Preparation', body: 'How to transition from seeking “the right person” to cultivating the spiritual maturity, character, and emotional health of a Kingdom partner.' },
      { title: 'Healing & Wholeness Before Covenant', body: 'Breaking free from past relational patterns, unlearning cultural misalignments, and allowing God to heal your inner world so you enter covenant whole.' },
      { title: 'The Architecture of Submission & Strength', body: 'Reclaiming the true, dignified biblical meaning of partnership, honor, and mutual yield within a Kingdom home.' },
      { title: 'Cultivating Spiritual & Spatial Peace', body: 'Practical guidance on stewarding your personal space, prayer life, and daily habits to mirror the sanctuary you intend to create in marriage.' },
    ],
    forWhom: [
      { title: 'Single & Engaged Women', body: 'who desire a marriage rooted in purpose, spiritual alignment, and divine order.' },
      { title: 'Women in Seasons of Preparation', body: 'seeking practical, spiritually grounded wisdom on emotional healing and personal readiness.' },
      { title: 'Faith-Driven Leaders', body: 'looking to align their personal lives and future families with God’s highest blueprint.' },
    ],
  },

  'children-spell-love-as-time': {
    epigraph: 'In the developmental world of a child, love is not an abstract sentiment or a list of provided goods—it is measured in the quiet, undivided currency of time.',
    intro: [
      'In a fast-paced world driven by output, career demands, and transactional living, parents often attempt to express love through provision, achievement, and material security. Yet, child psychology and Kingdom principles reveal a profound truth: a child’s heart does not process love through what we acquire for them, but through the sacred architecture of our presence.',
      'In Children Spell Love as T.I.M.E., Muthoni Ngugi delivers a deeply reflective exploration into the psychological and spiritual dynamics of intentional parenting. Grounded in developmental science, emotional alignment, and biblical wisdom, this book redefines how we raise emotionally secure, Spirit-led, and resilient children.',
      'Through this work, Muthoni moves past superficial parenting tips to examine the internal environment we create for our children—showing how intentional time builds emotional regulation, secure attachment, and a lifelong foundation of identity and faith.',
    ],
    inside: [
      { title: 'The Psychology of Presence', body: 'How undivided attention regulates a child’s nervous system, fosters secure attachment, and builds deep emotional resilience.' },
      { title: 'The Kingdom Blueprint for Parenting', body: 'Shifting from transactional parenting (managing behavior) to covenant stewardship (shaping identity and spiritual roots).' },
      { title: 'Deconstructing Performance Parenting', body: 'Unlearning the cultural pressure to over-schedule and over-provide at the expense of genuine connection and peace at home.' },
      { title: 'Architecting Daily Rituals', body: 'Practical, high-intent ways to weave meaningful micro-moments of T.I.M.E. into busy executive and entrepreneurial routines.' },
    ],
    forWhom: [
      { title: 'Parents & Guardians', body: 'seeking to build a deep, unbreakable emotional bond with their children rooted in peace and presence.' },
      { title: 'Kingdom Leaders & Entrepreneurs', body: 'balancing high-impact careers with the sacred calling of intentional family stewardship.' },
      { title: 'Educators & Caregivers', body: 'passionate about child psychology, emotional health, and spiritual formation in early development.' },
    ],
  },

  'the-artisans-anointing': {
    epigraph: 'Wealth is not merely financial accumulation—it is the physical manifestation of divine wisdom, intentional design, and master craftsmanship.',
    intro: [
      'In a world driven by short-term speculation and quick transactional gains, true wealth remains rooted in an ancient principle: the ability to take raw materials, ideas, and environments and transform them into enduring, high-value assets.',
      'In The Artisan’s Anointing, Muthoni Ngugi explores the spiritual, psychological, and practical frameworks behind the divine capacity to create wealth. Drawing deeply from Kingdom theology (Deuteronomy 8:18), spatial design, and the biblical blueprint of the master builder (Bezalel), this book reveals that true enterprise is a holy assignment—one activated by an anointed mind and executed through uncompromising excellence.',
      'Muthoni deconstructs the shift from surviving as a laborer to thriving as an anointed master artisan, offering leaders and builders the psychological and spiritual keys to architecting generational legacy.',
    ],
    inside: [
      { title: 'The Bezalel Framework', body: 'Understanding the spiritual mandate of design, craftsmanship, and economic stewardship to build things that last.' },
      { title: 'The Psychology of Mastery', body: 'Moving past mediocrity into elite execution, precision engineering, and high-value creation.' },
      { title: 'Kingdom Economics & Wealth Generation', body: 'Deconstructing Deuteronomy 8:18—how divine wisdom unlocks the capacity to produce tangible, ethical, and generational wealth.' },
      { title: 'From Labor to Enterprise', body: 'Shifting your internal identity from a worker chasing income to a Kingdom builder constructing self-sustaining systems.' },
    ],
    forWhom: [
      { title: 'Entrepreneurs & Artisans', body: 'seeking to elevate their business models, craftsmanship, and brand authority to an institutional standard.' },
      { title: 'Kingdom Leaders & Investors', body: 'called to build wealth through tangible assets, real estate, design, and industry.' },
      { title: 'Creatives & Visionaries', body: 'who want to align their spiritual purpose with high-impact economic execution.' },
    ],
  },

  'beyond-colonialism': {
    epigraph: 'History tells us what was done to us. But when we allow inherited trauma to become our operating system, we hand our past a permanent lease on our future. The cycle stops here.',
    intro: [
      'From the partitioning of the continent and the brutalities of the colonial conquests, to the violent liberation struggles, civil conflicts, and systemic upheavals that followed—the African story has long been shadowed by a heavy, generational accumulation of grief. We honor the names and the blood: from the freedom fighters in the forests and the fallen statesmen, to the silenced voices of resistance across every region. Those events happened. The wounds were real.',
      'And yet, generation after generation, we continue to carry somatic echoes of battles we were never present to fight.',
      'In Beyond Colonialism, Muthoni Ngugi issues a profound, restorative call to psychological and societal liberation. Drawing on deep philosophy, somatic awareness, and the realities of generational healing, this book challenges Africa’s builders, thinkers, and leaders to recognize a hard truth: we cannot construct a thriving, sovereign future while looking through a lens permanently fogged by unhealed trauma.',
      'Muthoni guides the reader through the necessary inner work of untangling our nervous systems from historical pain—moving the continent away from the architecture of defense and reaction, and into an era of deliberate, unburdened creation.',
    ],
    inside: [
      { title: 'The Somatic Archive', body: 'How the collective memory of historical wars, displacements, and systemic subjugation is stored in the African body, psyche, and societal reflexes.' },
      { title: 'Breaking the Intergenerational Loop', body: 'Recognizing that because we did not inherit the battlefield, we do not have to inherit the permanent posture of survival.' },
      { title: 'Moving Beyond the Trauma Lens', body: 'Shifting our cultural and institutional dialogue from what was done to us to what we have the divine power to build right now.' },
      { title: 'Designing From Peace', body: 'How to construct businesses, economies, and communities rooted in structural clarity, psychological sovereignty, and enduring peace.' },
    ],
    forWhom: [
      { title: 'Visionaries, Leaders & Builders', body: 'committed to creating world-class institutions free from the invisible anchors of the past.' },
      { title: 'Thinkers & Seekers', body: 'ready to do the deep psychological and somatic work required for true mental liberation.' },
      { title: 'Anyone Ready to Lay Down the Weight', body: 'Readers seeking to break free from cyclical narratives of pain and step into an unburdened, purposeful future.' },
    ],
  },

  'your-voice-is-dangerous': {
    epigraph: 'The most disruptive tool in the universe is not a weapon, a strategy, or a policy—it is the quiet truth you have been withholding to keep the peace.',
    intro: [
      'Silence is rarely neutral. In homes, boardrooms, relationships, and nations, silence is often the unseen tax paid by those who underestimate the power of their own conviction. We convince ourselves that remaining quiet preserves harmony, protects our standing, or keeps us safe—when in reality, postponing the message we are meant to deliver only prolongs the very friction we are trying to avoid.',
      'In Your Voice is Dangerous, Muthoni Ngugi delivers an electrifying, high-impact treatise on the transformative authority of spoken truth. Drawing on cognitive psychology, Kingdom authority, and human behavior, this book deconstructs the quiet conditioning that convinces people their words do not matter.',
      'Muthoni reveals why a truly aligned voice is feared by stagnant systems: because a single, well-timed, uncompromising message can shatter generational patterns, redefine terms, and shift the trajectory of an entire life or organization.',
    ],
    inside: [
      { title: 'The Anatomy of Postponed Truth', body: 'Why we delay the hard, necessary conversations—and the psychological cost of keeping our real message locked inside.' },
      { title: 'Why Aligned Speech Disruption Occurs', body: 'Understanding why a voice anchored in conviction, truth, and timing threatens static, comfortable environments.' },
      { title: 'Dismantling the Unspoken Contract', body: 'Breaking free from the subtle conditioning that trains high-achievers and leaders to censor their intuition for external approval.' },
      { title: 'Architecting Strategic Utterance', body: 'Practical frameworks for articulating high-stakes messages with elegance, composure, and undeniable authority.' },
    ],
    forWhom: [
      { title: 'Leaders & Executives', body: 'holding crucial directives, decisions, or hard truths that need to be delivered to transform their organizations.' },
      { title: 'Visionaries & Creators', body: 'who have dimmed their message to avoid confrontation or preserve a fragile status quo.' },
      { title: 'Anyone Ready to Break the Silence', body: 'Individuals who recognize that the very thing they have been afraid to speak is the master key to their next elevation.' },
    ],
  },

  'zarah-dubai-feels-too-much': {
    epigraph: 'Feeling deeply is not a flaw to be corrected—it is a superpower waiting for the right canvas.',
    intro: [
      'For neurodivergent children, particularly those on the autism spectrum, the world can often feel impossibly loud, intense, and overwhelming. Big emotions, heightened sensory processing, and deep internal worlds require more than words—they require a safe, tactile, and unstructured outlet where feelings can take shape without judgment or pressure.',
      'Zarah Feels Too Much was born out of a profound understanding of sensory processing and child psychology. Designed as an executive-grade expressive coloring book, this work provides a soothing, therapeutic sanctuary for children to process sensory input, navigate complex feelings, and communicate their internal experience through art.',
      'With thoughtfully structured line-art, spacious layouts, and emotionally grounding visual prompts, Zarah Feels Too Much bridges the gap between developmental therapy and creative joy—offering children and parents alike a peaceful space to slow down, regulate, and feel understood.',
    ],
    inside: [
      { title: 'Sensory-Mindful Design', body: 'Calming, heavy-weight pages and intentional line art designed specifically to avoid sensory overload and accommodate varying fine-motor comfort levels.' },
      { title: 'Emotional Regulation Through Art', body: 'Guided visual exercises that help children identify, name, and express intense feelings—turning anxiety and overwhelm into creative focus.' },
      { title: 'A Safe Space for Self-Expression', body: 'Empowering neurodivergent children to communicate their thoughts and mood states non-verbally through color, texture, and rhythm.' },
      { title: 'A Bridge for Parents & Caregivers', body: 'A gentle, non-clinical tool that opens quiet avenues of connection and conversation between parents, educators, and children with autism.' },
    ],
    forWhom: [
      { title: 'Children on the Autism Spectrum & Neurodivergent Youth', body: 'who process the world through deep sensory and emotional lenses.' },
      { title: 'Parents & Caregivers', body: 'seeking intentional, beautiful, non-digital tools to assist in emotional regulation and quiet connection at home.' },
      { title: 'Occupational Therapists, Educators & Child Psychologists', body: 'looking for high-quality, dignified art therapy resources for home or classroom settings.' },
    ],
  },
};
