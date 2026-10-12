import { Category } from '../types';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'sweden-democracy',
    iconName: 'Landmark',
    title: 'التعريف بالسويد والمجتمع والقيم الديمقراطية',
    titleSv: 'Sverige, demokrati och samhällsvärderingar',
    titleEn: 'Sweden, Democracy & Social Values',
    description: 'فهم النظام الديمقراطي السويدي، حرية التعبير، العلمانية، الثقافة والقيم المجتمعية السويدية.',
    descriptionSv: 'Förstå det svenska demokratiska systemet, yttrandefrihet, sekularism och grundläggande värderingar.',
    descriptionEn: 'Understand the Swedish democratic system, freedom of expression, secularism, and core societal values.',
    badgeTag: 'القيم والديمقراطية',
    lessons: [
      {
        id: 'lesson-dem-1',
        categoryId: 'sweden-democracy',
        title: 'النظام السياسي والدستور السويدي',
        titleSv: 'Det politiska systemet och grundlagarna',
        titleEn: 'The Political System & Constitution',
        readingTimeMinutes: 6,
        summary: 'السويد مملكة دستورية ديمقراطية نيابية. البرلمان السويدي (Riksdagen) هو أعلى سلطة تشريعية، والحكومة (Regeringen) هي السلطة التنفيذية.',
        summarySv: 'Sverige är en parlamentarisk demokrati och konstitutionell monarki med fyra grundlagar.',
        summaryEn: 'Sweden is a parliamentary democracy and constitutional monarchy governed by four fundamental laws.',
        fullContent: `السويد مملكة دستورية ذات نظام ديمقراطي برلماني. الملك هو رئيس الدولة وله دور رمزي وتمثيلي فقط دون سلطة سياسية.

القوانين الأساسية (الدستور السويدي):
يتكون الدستور السويدي من أربعة قوانين أساسية يصعب تعديلها:
1. شكل الحكومة (Regeringsformen): يضمن حرية التعبير والمساواة وحق الاقتراع.
2. حرية الصحافة (Tryckfrihetsförordningen): يضمن حق طباعة ونشر الأفكار بحرية.
3. حرية التعبير (Yttrandefrihetsgrundlagen): يضمن التعبير عن الرأي في وسائل الإعلام المرئية والمسموعة.
4. قانون توارث العرش (Successionsordningen): يحدد نظام الحكم الملكي.

البرلمان والحكومة:
يتكون البرلمان السويدي (Riksdagen) من 349 عضواً ينتخبهم الشعب كل 4 سنوات. البرلمان هو من يشرّع القوانين ويقر الميزانية وينتخب رئيس الوزراء.`,
        fullContentSv: `Sverige är en parlamentarisk demokrati. Kungen är statschef med endast representativa uppgifter. Riksdagen har 349 ledamöter och stiftar alla lagar.`,
        fullContentEn: `Sweden is a parliamentary democracy. The King is the head of state with ceremonial duties. The Riksdag has 349 members and passes all laws.`,
        practicalExamples: [
          'تصويت جميع المواطنين السويديين الذين بلغوا 18 عاماً في انتخابات البرلمان والبلديات والتقسيمات الإقليمية.',
          'مبدأ العلنية (Offentlighetsprincipen) يتيح لأي شخص الاطلاع على الوثائق والمراسلات الحكومية الرسمية.'
        ],
        practicalExamplesSv: [
          'Offentlighetsprincipen ger alla rätt att läsa myndigheters handlingar.',
          'Val till riksdag, region och kommun sker vart fjärde år.'
        ],
        practicalExamplesEn: [
          'The Principle of Public Access lets anyone review government documents.',
          'Elections take place every four years.'
        ],
        officialSource: 'Riksdagen & Regeringen',
        officialUrl: 'https://www.riksdagen.se',
        lastVerifiedDate: '2026-01-15',
        quiz: [
          {
            id: 'q-dem-1',
            question: 'كم عدد أعضاء البرلمان السويدي (Riksdagen)؟',
            questionSv: 'Hur många ledamöter har Sveriges riksdag?',
            questionEn: 'How many members are in the Swedish Parliament?',
            options: ['349 عضواً', '200 عضو', '500 عضو', '150 عضواً'],
            optionsSv: ['349 ledamöter', '200 ledamöter', '500 ledamöter', '150 ledamöter'],
            optionsEn: ['349 members', '200 members', '500 members', '150 members'],
            correctAnswerIndex: 0,
            explanation: 'يتكون البرلمان السويدي من 349 عضواً يتم انتخابهم عبر اقتراع ديمقراطي كل 4 سنوات.',
            explanationSv: 'Riksdagen har 349 valda ledamöter.',
            explanationEn: 'The Riksdag consists of 349 elected members.'
          },
          {
            id: 'q-dem-2',
            question: 'ما هو الدور الرئيسي للملك في السويد؟',
            questionSv: 'Vad är kungens huvudroll i Sverige?',
            questionEn: 'What is the King’s main role in Sweden?',
            options: ['دور رمزي وتمثيلي بدون سلطة سياسية', 'تشريع القوانين وإلغاؤها', 'قيادة الجيش واتخاذ قرارات الحرب', 'تعيين القضاة والوزراء'],
            optionsSv: ['Representativ roll utan politisk makt', 'Stifta lagar', 'Leda armén', 'Utnämna domare'],
            optionsEn: ['Ceremonial role without political power', 'Pass laws', 'Lead the army', 'Appoint judges'],
            correctAnswerIndex: 0,
            explanation: 'الملك في السويد هو رئيس الدولة ولكن دوره رمزي وتمثيلي بحت حسب الدستور السويدي.',
            explanationSv: 'Kungen har endast representativa plikter.',
            explanationEn: 'The King has only ceremonial representation duties.'
          }
        ]
      }
    ]
  },
  {
    id: 'rights-duties',
    iconName: 'ShieldCheck',
    title: 'الحقوق والواجبات والقوانين الأساسية',
    titleSv: 'Rättigheter, skyldigheter och grundläggande lagar',
    titleEn: 'Rights, Responsibilities & Basic Laws',
    description: 'احترام القانون السويدي، حرية الدين، سيادة القانون، ودفع الضرائب.',
    descriptionSv: 'Lagslydnad, religionsfrihet, rättssäkerhet och skyldighet att följa svensk lag.',
    descriptionEn: 'Respect for Swedish law, freedom of religion, rule of law, and tax obligations.',
    badgeTag: 'الحقوق والواجبات',
    lessons: [
      {
        id: 'lesson-rights-1',
        categoryId: 'rights-duties',
        title: 'حق التجول الحر في الطبيعة (Allemansrätten)',
        titleSv: 'Allemansrätten - Rätt och skyldighet i naturen',
        titleEn: 'Right of Public Access (Allemansrätten)',
        readingTimeMinutes: 5,
        summary: 'حق التجول الحر يتيح للجميع التنزه في الطبيعة والغابات بشرط عدم الإضرار بالبيئة أو التعدي على خصوصية الآخرين.',
        summarySv: 'Allemansrätten ger alla rätt att röra sig fritt i naturen under mottot "Inte störa – inte förstöra".',
        summaryEn: 'Allemansrätten grants freedom to roam in nature with the duty "Do not disturb - do not destroy".',
        fullContent: `حق التجول العام في الطبيعة (Allemansrätten) هو ميزة فريدة في الدستور السويدي تمنح كل شخص حق المشي والتخييم وجني الثمار البرية في الغابات والطبيعة.

القاعدة الذهبية: "لا تزعج ولا تخرب" (Inte störa – inte förstöra).

ما يمكنك فعله:
• السير والتنزه وركوب الدراجات في الغابات.
• إقامة خيمة لليلة واحدة على مسافة بعيدة عن المنازل السكنية.
• قطف الفطر والberries البرية غير المحمية بالقانون.

ما لا يمكنك فعله:
• إشعال النار على الصخور أو أثناء حظر إشعال النار الصيفي (Eldningsförbud).
• ترك القمامة أو إتلاف الأشجار والمحاصيل الزراعية.
• الصيد بدون تصريح رسمي.`,
        fullContentSv: `Allemansrätten är inskriven i grundlagen och ger rätt att vistas i naturen så länge man visar hänsyn.`,
        fullContentEn: `Allemansrätten is written into law allowing anyone to enjoy nature responsibly without damaging property.`,
        practicalExamples: [
          'يمكنك قطف التوت البري في الغابة، لكن لا يمكنك قطع أغصان الأشجار المملوكة للغير.',
          'عند إقامة خيمة، اختر مكاناً خارج نطاق النظرة المباشرة للمنازل السكنية.'
        ],
        practicalExamplesSv: [
          'Tälta inte för nära bostadshus.',
          'Skada inte växter eller träd.'
        ],
        practicalExamplesEn: [
          'Do not camp too close to private houses.',
          'Do not harm plants or trees.'
        ],
        officialSource: 'Naturvårdsverket',
        officialUrl: 'https://www.naturvardsverket.se',
        lastVerifiedDate: '2026-02-10',
        quiz: [
          {
            id: 'q-rights-1',
            question: 'ما هي القاعدة الأساسية لحق التجول الحر في الطبيعة (Allemansrätten)؟',
            questionSv: 'Vad är huvudregeln för allemansrätten?',
            questionEn: 'What is the main rule of Allemansrätten?',
            options: ['لا تزعج ولا تخرب', 'الصيد مجاني في كل مكان', 'قطع الأشجار مسموح في الغابات العامة', 'إشعال النار مسموح في أي وقت'],
            optionsSv: ['Inte störa – inte förstöra', 'Fri jakt överallt', 'Skaffa ved från levande träd', 'Eldning alltid tillåten'],
            optionsEn: ['Do not disturb - do not destroy', 'Free hunting everywhere', 'Cut live trees', 'Bonfires always allowed'],
            correctAnswerIndex: 0,
            explanation: 'القاعدة الأساسية المنظمة للتجول في الطبيعة السويدية هي عدم إزعاج الآخرين أو الحيوات البرية وعدم تخريب البيئة.',
            explanationSv: 'Grundregeln är att inte störa och inte förstöra.',
            explanationEn: 'The core motto is "Do not disturb - do not destroy".'
          }
        ]
      }
    ]
  },
  {
    id: 'residence-asylum',
    iconName: 'FileText',
    title: 'الإقامة واللجوء ولمّ الشمل والجنسية',
    titleSv: 'Uppehållstillstånd, asyl, anhöriginvandring och medborgarskap',
    titleEn: 'Residence, Asylum, Reunification & Citizenship',
    description: 'قوانين مصلحة الهجرة، تجديد الإقامات المؤقتة، شروط الإقامة الدائمة والجنسية.',
    descriptionSv: 'Migrationsverkets regler, förlängning av uppehållstillstånd, permanent uppehållstillstånd och medborgarskap.',
    descriptionEn: 'Migration rules, permit renewals, permanent residence requirements, and citizenship.',
    badgeTag: 'الإقامة والهجرة',
    lessons: [
      {
        id: 'lesson-res-1',
        categoryId: 'residence-asylum',
        title: 'شروط تحويل الإقامة المؤقتة إلى دائمة (Permanent Uppehållstillstånd - PUT)',
        titleSv: 'Krav för permanent uppehållstillstånd (PUT)',
        titleEn: 'Requirements for Permanent Residence (PUT)',
        readingTimeMinutes: 7,
        summary: 'للحصول على الإقامة الدائمة في السويد، يجب استيفاء شرط الإعالة المادية الذاتية، عدم ارتكاب جرائم، وإتقان اللغة والمعرفة المجتمعية.',
        summarySv: 'För permanent uppehållstillstånd krävs egen försörjning, laglydighet samt godkänd samhällskunskap och språk.',
        summaryEn: 'For permanent residence, self-sufficiency through income, good conduct, and language/civic knowledge are required.',
        fullContent: `تُمنح معظم الإقامات في السويد كإقامات مؤقتة (Tidsbegränsat uppehållstillstånd). للحصول على الإقامة الدائمة (PUT)، يجب تقديم طلب لمصلحة الهجرة عند تجديد الإقامة المؤقتة واستيفاء الشروط التالية:

1. شرط الإعالة المادية (Försörjningskravet):
• وجود دخل ثابت ومستمر من عمل بعقد دائم (Tillsvidareanställning) أو عمل بعقد لا يقل عن 12 شهراً.
• الدخل يجب أن يغطي إيجار السكن والمصاريف المعيشية المحددة من مصلحة الهجرة.

2. حسن السلوك (Laglydighet):
• ألا تكون حُكمت في السويد أو خارجها بجرائم خطيرة، وألا تكون عليك ديون لدى سلطة التنفيذ (Kronofogden).

3. اللغة والمعرفة المجتمعية (Språk- och samhällskunskap):
• اجتياز اختبار اللغة السويدية واختبار المعرفة المجتمعية وفق تحديثات القوانين السويدية.`,
        fullContentSv: `För att få PUT krävs stabil inkomst från arbete, godkänt språkprov samt inga allvarliga brott eller skulder.`,
        fullContentEn: `To obtain permanent residence, stable employment income, language proficiency, and clean legal records are required.`,
        practicalExamples: [
          'إذا كنت تعمل بعقد مؤقت لمدة 3 أشهر فقط، فلا يمكنك الحصول على إقامة دائمة حتى تحصل على عقد يستمر لـ 12 شهراً على الأقل.',
          'الحد الأدنى لصافي الدخل المتبقي بعد الإيجار يتم حسابه سنوياً وفق معايير مصلحة الهجرة.'
        ],
        practicalExamplesSv: [
          'Anställning måste vara varaktig (minst 12 månader).',
          'Sök i god tid innan det tillfälliga tillståndet går ut.'
        ],
        practicalExamplesEn: [
          'Employment must last at least 12 months.',
          'Apply well in advance before your permit expires.'
        ],
        officialSource: 'Migrationsverket',
        officialUrl: 'https://www.migrationsverket.se',
        lastVerifiedDate: '2026-03-01',
        quiz: [
          {
            id: 'q-res-1',
            question: 'ما هو الشرط الأساسي للدخل للحصول على الإقامة الدائمة (PUT)؟',
            questionSv: 'Vad krävs gällande inkomst för permanent uppehållstillstånd?',
            questionEn: 'What is the main income requirement for Permanent Residence?',
            options: ['دخل ثابت من عمل يستمر لمدة 12 شهراً على الأقل يغطي السكن والمعيشة', 'الاعتماد على المساعدات المالية من السوسيال', 'امتلاك حساب بنكي بمبلغ صغير', 'العمل التطوعي بدون راتب'],
            optionsSv: ['Inkomst från arbete i minst 12 månader som täcker bostad och uppehälle', 'Försörjningsstöd från socialtjänsten', 'Ett litet sparkonto', 'Frivilligarbete utan lön'],
            optionsEn: ['Work income lasting at least 12 months covering housing and living expenses', 'Social welfare benefits', 'Small bank account', 'Unpaid volunteering'],
            correctAnswerIndex: 0,
            explanation: 'تشترط مصلحة الهجرة إثبات القدرة على إعالة النفس عبر عمل بعقد يستمر 12 شهراً على الأقل براتب كافٍ.',
            explanationSv: 'Arbetet måste ge tillräcklig inkomst i minst 12 månader.',
            explanationEn: 'Work must provide sufficient income for at least 12 months.'
          }
        ]
      }
    ]
  },
  {
    id: 'housing-contracts',
    iconName: 'Home',
    title: 'السكن والعقود والتأمين',
    titleSv: 'Bostad, hyreskontrakt och hemförsäkring',
    titleEn: 'Housing, Contracts & Home Insurance',
    description: 'عقود الإيجار الأول والثاني (Förstahand / Andrahand)، حقوق المستأجر، وتأمين المنزل الإجباري.',
    descriptionSv: 'Förstahandskontrakt, andrahandsuthyrning, hyresgästföreningen och hemförsäkring.',
    descriptionEn: 'First and second-hand rental contracts, tenant rights, and home insurance.',
    badgeTag: 'السكن والتأمين',
    lessons: [
      {
        id: 'lesson-house-1',
        categoryId: 'housing-contracts',
        title: 'الفرق بين عقد الإيجار الأول والعقد الثاني والتأمين',
        titleSv: 'Förstahandskontrakt, andrahandsuthyrning och hemförsäkring',
        titleEn: 'First-Hand, Second-Hand Contracts & Home Insurance',
        readingTimeMinutes: 6,
        summary: 'عقد الإيجار الأول مباشر مع شركاء السكن، أما الثاني فهو استئجار من مستأجر آخر ويشترط موافقة المالك، وتأمين السكن أمر حيوي لحمايتك.',
        summarySv: 'Förstahandskontrakt tecknas direkt med fastighetsägaren. Andrahandsuthyrning kräver godkännande. Hemförsäkring är ett måste.',
        summaryEn: 'First-hand contracts are directly with the landlord. Second-hand subletting requires landlord approval. Home insurance is vital.',
        fullContent: `السكن في السويد ينقسم إلى عدة أنواع من العقود:

1. عقد الإيجار الأول (Förstahandskontrakt):
عقد مباشر مع شركة السكن أو المالك. يمنحك حق السكن الدائم والآمن طالما تدفع الإيجار في الموعد وتحافظ على الشقة.

2. عقد الإيجار الثاني (Andrahandskontrakt):
استئجار الشقة من المستأجر الأول. ⚠️ تحذير مهم: يجب أن يحصل صاحب الشقة على موافقة خطية رسمية من شركة السكن أو جمعية السكن (Bostadsrättsförening). التأجير بدون موافقة غير قانوني ويعرضك للإخلاء الفوري!

3. تأمين المنزل (Hemförsäkring):
تأمين السكن ليس مجرد رفاهية بل ضرورة قصوى في السويد. يعوضك التأمين في حالات الحريق، تسرب المياه، السرقة، وتكاليف المسؤولية القانونية والمساعدة القضائية.`,
        fullContentSv: `Andrahandsuthyrning utan tillstånd är olagligt. Teckna alltid hemförsäkring från dag ett.`,
        fullContentEn: `Subletting without written permission is illegal. Always get home insurance from day one.`,
        practicalExamples: [
          'لا تدفع أي مبلغ مقدم أو عربون قبل رؤية الشقة والتأكد من وجود موافقة خطية للتأجير من شركة السكن.',
          'تأمين السكن يغطي أيضاً أغراضك الشخصية خارج المنزل وحوادث السفر القصيرة.'
        ],
        practicalExamplesSv: [
          'Betala aldrig handpenning utan att ha sett lägenheten och skriftligt tillstånd.',
          'Hemförsäkringen täcker även stöld utanför hemmet.'
        ],
        practicalExamplesEn: [
          'Never pay a deposit without viewing the apartment and confirming written consent.',
          'Home insurance also covers personal items outside your apartment.'
        ],
        officialSource: 'Hyresgästföreningen & Konsumentverket',
        officialUrl: 'https://www.hyresgastforeningen.se',
        lastVerifiedDate: '2026-02-01',
        quiz: [
          {
            id: 'q-house-1',
            question: 'ما هو الشرط القانوني الضروري عند استئجار شقة بعقد إيجار ثاني (Andrahand)؟',
            questionSv: 'Vad är ett absolut krav vid andrahandsuthyrning?',
            questionEn: 'What is mandatory when renting second-hand?',
            options: ['موافقة خطية رسمية من شركة السكن أو جمعية المالكين', 'الدفع نقداً بدون إيصال', 'عدم كتابة أي عقد ورقياً', 'تغيير عنوان القيد دون إعلام المالك'],
            optionsSv: ['Skriftligt godkännande från hyresvärden eller bostadsrättsföreningen', 'Betala kontant utan kvitto', 'Inget skriftligt kontrakt', 'Ändra adress i smyg'],
            optionsEn: ['Written approval from landlord or housing association', 'Cash payment without receipt', 'No written contract', 'Change address secretly'],
            correctAnswerIndex: 0,
            explanation: 'التأجير الثاني بدون موافقة خطية من مالك العمارة يعتبر غير قانوني ويعرض المستأجر للإخلاء السريع.',
            explanationSv: 'Olovlig andrahandsuthyrning kan leda til vräkning.',
            explanationEn: 'Unapproved subletting can result in immediate eviction.'
          }
        ]
      }
    ]
  },
  {
    id: 'employment-unions',
    iconName: 'Briefcase',
    title: 'العمل والضرائب والنقابات وحقوق العمال',
    titleSv: 'Arbete, kollektivavtal, fackförbund och a-kassa',
    titleEn: 'Employment, Unions, Contracts & A-kassa',
    description: 'البحث عن عمل، الاتفاقيات الجماعية (Kollektivavtal)، النقابات (Fackförbund)، وصندوق البطالة (A-kassa).',
    descriptionSv: 'Arbetsmarknad, kollektivavtal, fackligt medlemskap och arbetslöshetskassa (A-kassa).',
    descriptionEn: 'Labor market, collective agreements, trade unions, and unemployment insurance (A-kassa).',
    badgeTag: 'العمل والنقابات',
    lessons: [
      {
        id: 'lesson-work-1',
        categoryId: 'employment-unions',
        title: 'النموذج السويدي للعمل والنقابات والصندوق (A-kassa)',
        titleSv: 'Den svenska modellen, facket och A-kassan',
        titleEn: 'The Swedish Model, Unions & Unemployment Insurance',
        readingTimeMinutes: 7,
        summary: 'تعتمد السويد على النموذج السويدي الذي يُحسم فيه الأجر وظروف العمل عبر الاتفاقيات الجماعية بين النقابات وأرباب العمل.',
        summarySv: 'Svenska modellen bygger på avtal mellan fack och arbetsgivare utan lagstadgad minimilön.',
        summaryEn: 'The Swedish model relies on agreements between trade unions and employers without statutory minimum wage.',
        fullContent: `في السويد لا يوجد قانون محدد يحدد "الحد الأدنى للأجور" (Minimilön)، بل يتم تحديد الأجور وضمانات ظروف العمل عبر الاتفاقية الجماعية (Kollektivavtal).

1. الاتفاقية الجماعية (Kollektivavtal):
اتفاق بين نقابة العمال ورابطة أرباب العمل يحدد الأدنى للراتب، ساعات العمل، التعويض عن الساعات الإضافية (OB-ersättning)، وتأمين العمل والتقاعد المهني (Tjänstepension).

2. النقابة العمالية (Fackförbund):
الانضمام للنقابة طوعي ويضمن لك الدعم القانوني في حال وقوع نزاع مع رب العمل أو الفصل غير القانوني.

3. صندوق البطالة (A-kassa):
عضوية مستقلة في صندوق البطالة تضمن لك الحصول على تعويض مالي يصل إلى 80% من راتبك السابق في حال فقدان العمل.`,
        fullContentSv: `Gå med i facket och A-kassan för att trygga din inkomst och dina rättigheter på arbetsplatsen.`,
        fullContentEn: `Join a trade union and A-kassa to protect your income and workplace rights.`,
        practicalExamples: [
          'احرص دائماً على التأكد من وجود اتفاقية جماعية (Kollektivavtal) في مكان عملك قبل توقيع العقد.',
          'سجل في صندوق البطالة (A-kassa) فور شروعك في العمل لتغطية فترة الانتظار القانونية.'
        ],
        practicalExamplesSv: [
          'Kontrollera om arbetsgivaren har kollektivavtal.',
          'Bli medlem i A-kassan så tidigt som möjligt.'
        ],
        practicalExamplesEn: [
          'Check if the employer has a collective agreement.',
          'Join A-kassa as early as possible.'
        ],
        officialSource: 'Arbetsförmedlingen & LO/TCO/Saco',
        officialUrl: 'https://arbetsformedlingen.se',
        lastVerifiedDate: '2026-01-20',
        quiz: [
          {
            id: 'q-work-1',
            question: 'كيف يتم تحديد الحد الأدنى للرواتب وظروف العمل في السويد؟',
            questionSv: 'Hur bestäms minimilön och villkor i Sverige?',
            questionEn: 'How are minimum wages and conditions decided in Sweden?',
            options: ['عبر الاتفاقيات الجماعية (Kollektivavtal) بين النقابات وأرباب العمل', 'عبر قانون حكومي ثابت للحد الأدنى للأجور', 'يقوم رب العمل بتحديد الأجر دون مرجعية', 'عبر مصلحة الضرائب فقط'],
            optionsSv: ['Genom kollektivavtal mellan fack och arbetsgivare', 'Genom lagstadgad minimilön', 'Arbetsgivaren bestämmer helt själv utan regler', 'Enbart via Skatteverket'],
            optionsEn: ['Through collective agreements (Kollektivavtal) between unions and employers', 'Through statutory minimum wage law', 'Employer decides completely alone', 'Only through tax agency'],
            correctAnswerIndex: 0,
            explanation: 'تعتمد السويد على الاتفاقيات الجماعية التي تفاوض عليها النقابات لحماية حقوق العمال وتحديد الأجور.',
            explanationSv: 'Kollektivavtal styr löner och villkor på den svenska arbetsmarknaden.',
            explanationEn: 'Collective agreements govern salaries and working conditions in Sweden.'
          }
        ]
      }
    ]
  },
  {
    id: 'taxes-finance',
    iconName: 'Calculator',
    title: 'الضرائب والاقتصاد الشخصي والديون',
    titleSv: 'Skatter, privatekonomi och skulder',
    titleEn: 'Taxes, Personal Finance & Debt',
    description: 'الإقرار الضريبي (Deklaration)، إدارة الميزانية الشخصية، والوقاية من ديون كرونوفوغدن (Kronofogden).',
    descriptionSv: 'Inkomstdeklaration, privatekonomi, budgetering och undvikande av Kronofogden.',
    descriptionEn: 'Tax declaration, personal budgeting, and debt prevention with Kronofogden.',
    badgeTag: 'الاقتصاد والضرائب',
    lessons: [
      {
        id: 'lesson-tax-1',
        categoryId: 'taxes-finance',
        title: 'فهم ضريبة الدخل والإقرار الضريبي السنوي (Deklaration)',
        titleSv: 'Inkomstskatt och årlig deklaration',
        titleEn: 'Income Tax & Annual Tax Return',
        readingTimeMinutes: 6,
        summary: 'يدفع الموظف ضريبة بلدية وإقليمية تُخصم مباشرة من الراتب، وفي فصل الربيع يقوم بتقديم الإقرار الضريبي السنوي بنقرة واحدة عبر BankID.',
        summarySv: 'Kommunalskatt dras direkt från lönen. Varje vår godkänner du din deklaration enkelt med BankID.',
        summaryEn: 'Municipal tax is deducted directly from income. Each spring, confirm your declaration via BankID.',
        fullContent: `تعتمد السويد على نظام ضريبي شفاف يُستخدم لتمويل الرعاية الصحية والمنافع الاجتماعية والتعليم المجاني.

1. ضريبة الدخل (Inkomstskatt):
تتراوح الضريبة البلدية بين 29% إلى 35% حسب البلدية التي تقطن فيها، وتُقتطع تلقائياً من قبل صاحب العمل قبل تحويل الراتب لراحتك.

2. الإقرار الضريبي السنوي (Deklaration):
في شهر مارس/أبريل من كل عام، ترسل مصلحة الضرائب مسودة الإقرار الضريبي إلكترونياً إلى حسابك في Kivra.
إذا كانت جميع البيانات صحيحة، يمكنك الموافقة عليها بنقرة واحدة عبر تطبيق BankID أو عبر الرسائل النصية القصيرة.

3. الوقاية من الملاحظات المالية (Betalningsanmärkning):
عدم دفع الفواتير أو الغرامات في موعدها قد يحول الدين إلى سلطة التنفيذ (Kronofogden)، مما يؤدي إلى تسجيل "ملاحظة مالية" تمنعك من استئجار شقة أو شراء هاتف بعقد لمدة 3 سنوات.`,
        fullContentSv: `Godkänn deklarationen i smidigt via BankID i appen eller på webben. Undvik betalningsanmärkningar.`,
        fullContentEn: `Approve your declaration easily using BankID. Avoid payment default entries.`,
        practicalExamples: [
          'عند استقبال فاتورة غير صحيحة، لا تتجاهلها! اتصل بالشركة فوراً واطلب تعليق الفاتورة خطياً (Bestrid fakturan).',
          'يمكنك إجراء خصومات ضريبية على تكاليف التنقل إلى العمل إذا كانت تتجاوز حداً معيناً.'
        ],
        practicalExamplesSv: [
          'Bestrid en felaktig faktura skriftligen direkt.',
          'Missa inte sista dagen för deklarationen.'
        ],
        practicalExamplesEn: [
          'Dispute an incorrect invoice in writing immediately.',
          'Do not miss the deadline for filing your tax return.'
        ],
        officialSource: 'Skatteverket & Konsumentverket',
        officialUrl: 'https://www.skatteverket.se',
        lastVerifiedDate: '2026-03-01',
        quiz: [
          {
            id: 'q-tax-1',
            question: 'ما هي النتيجة الخطيرة لتجاهل دفع الفواتير وتحويلها لسلطة التنفيذ (Kronofogden)؟',
            questionSv: 'Vad blir konsekvensen av obetalda skulder hos Kronofogden?',
            questionEn: 'What is the consequence of unpaid debts sent to Kronofogden?',
            options: ['تسجيل ملاحظة مالية (Betalningsanmärkning) تمنعك من استئجار سكن أو عقد هاتف لسنوات', 'إلغاء الإقامة فوراً', 'لا توجد أي نتائج قانونية', 'زيادة الراتب تلقائياً'],
            optionsSv: ['Betalningsanmärkning som spärrar hyreskontrakt och abonnemang', 'Omedelbart utvisning', 'Inga konsekvenser', 'Automatisk löneökning'],
            optionsEn: ['Payment default record blocking rental housing and subscriptions', 'Immediate deportation', 'No consequences', 'Automatic salary raise'],
            correctAnswerIndex: 0,
            explanation: 'تؤدي الملاحظة المالية لدى كرونوفوغدن إلى إعاقة معملاتك المالية وعقود السكن والائتمان لمدة 3 سنوات.',
            explanationSv: 'En betalningsanmärkning försvårar hyresavtal och lån i 3 år.',
            explanationEn: 'A payment default record hurts rental housing and loans for 3 years.'
          }
        ]
      }
    ]
  },
  {
    id: 'school-education',
    iconName: 'GraduationCap',
    title: 'التعليم والمدارس ودور ولي الأمر',
    titleSv: 'Skola, förskola, vuxenutbildning och föräldraansvar',
    titleEn: 'School, Preschool, Adult Education & Parenting',
    description: 'الروضة (Förskola)، المدرسة الإلزامية (Grundskola)، الثانوية (Gymnasiet)، الكومفوكس (Komvux/SFI)، ودور الوالدين.',
    descriptionSv: 'Förskola, grundskola, gymnasieskola, SFI/Komvux och föräldrars roll i skolan.',
    descriptionEn: 'Preschool, compulsory school, upper secondary, Komvux/SFI, and parents\' active role.',
    badgeTag: 'التعليم والمدارس',
    lessons: [
      {
        id: 'lesson-edu-1',
        categoryId: 'school-education',
        title: 'النظام المدرسي ودور ولي الأمر والتواصل مع المدرسة',
        titleSv: 'Skolsystemet och föräldrarnas delaktighet',
        titleEn: 'The School System & Parent-Teacher Collaboration',
        readingTimeMinutes: 7,
        summary: 'التعليم في السويد مجاني وإلزامي من سن 6 إلى 16 سنة. المدرسة تعتمد على الحوار والتعاون مع الوالدين عبر لقاءات التطوير (Utvecklingssamtal).',
        summarySv: 'Skolplikt gäller från 6 till 16 år. Skolan bygger på samarbete mellan hem och skola via utvecklingssamtal.',
        summaryEn: 'Compulsory schooling runs from age 6 to 16. Schools emphasize home-school cooperation via development talks.',
        fullContent: `المدرسة السويدية تهدف للتعليم وغرس قيم الديمقراطية والاحتواء واحترام الآخرين.

مراحل التعليم:
1. الروضة (Förskola): للأطفال من سن سنة واحدة، وتوفر بيئة تعليمية وتربوية متكاملة.
2. المدرسة الإلزامية (Grundskola): من الصف التمهيدي (Förskoleklass) حتى الصف التاسع (سن 6 إلى 16).
3. الثانوية (Gymnasiet): تعليم اختياري مدته 3 سنوات يؤهل للجامعة أو سوق العمل.
4. تعليم الكبار (Komvux & SFI): دراسة اللغة السويدية للمهاجرين واستكمال المواد الثانوية.

دور ولي الأمر:
• يجب إبلاغ المدرسة عند غياب الطفل بسبب المرض قبل بدء الدوام عبر المنصة الرقمية للبلدية (مثل Skolplattformen / Unikum).
• المشاركة في محادثات التطوير الفردية (Utvecklingssamtal) مرتين في السنة لمناقشة تقدم الطفل الدراسي والنفسي.`,
        fullContentSv: `Anmäl alltid frånvaro vid sjukdom på morgonen. Delta aktivt i utvecklingssamtal.`,
        fullContentEn: `Always report sick absence in the morning. Actively participate in parent development talks.`,
        practicalExamples: [
          'إذا كان طفلك مريضاً، يجب تسجيل غيابه صباحاً في تطبيق المدرسة الخاص ببلديتك لمنع تسجيل غياب غير مبرر.',
          'يحق للطفل القادم حديثاً الحصول على تعليم اللغة الأم (Modersmålsundervisning) في المدرسة.'
        ],
        practicalExamplesSv: [
          'Anmäl sjukfrånvaro via appen före skoldagens start.',
          'Rätt till modersmålsundervisning finns.'
        ],
        practicalExamplesEn: [
          'Report sick leave via the app before the school day starts.',
          'Right to mother tongue tuition is available.'
        ],
        officialSource: 'Skolverket',
        officialUrl: 'https://www.skolverket.se',
        lastVerifiedDate: '2026-02-15',
        quiz: [
          {
            id: 'q-edu-1',
            question: 'ما هو الإجراء الواجب على ولي الأمر عند مرض الطفل وعدم قدرته على الذهاب للمدرسة؟',
            questionSv: 'Vad ska föräldrar göra när barnet är sjukt?',
            questionEn: 'What must parents do when a child is sick?',
            options: ['تسجيل بلاغ الغياب صباحاً عبر التطبيق المدرسي للبلدية', 'عدم إبلاغ المدرسة والانتظار حتى عودة الطفل', 'إرسال رسالة إلى معلم آخر بعد أسبوع', 'الاتصال بالطوارئ 112'],
            optionsSv: ['Frånvaroanmäla på morgonen via skolappen', 'Göra ingenting', 'Vänta en vecka', 'Ringa 112'],
            optionsEn: ['Report absence in the morning via school app', 'Do nothing', 'Wait a week', 'Call 112'],
            correctAnswerIndex: 0,
            explanation: 'يجب إبلاغ المدرسة فوراً صباح كل يوم غياب لتفادي تسجيل الغياب القسري لحماية الطفل.',
            explanationSv: 'Anmäl frånvaro varje sjukdag på morgonen.',
            explanationEn: 'Report absence every morning of illness.'
          }
        ]
      }
    ]
  },
  {
    id: 'healthcare-1177',
    iconName: 'Activity',
    title: 'الصحة والرعاية النفسية وخدمة 1177',
    titleSv: 'Hälso- och sjukvård, tandvård, psykisk hälsa och 1177',
    titleEn: 'Healthcare, Dental Care, Mental Health & 1177',
    description: 'المراكز الصحية (Vårdcentral)، حجز المواعيد عبر 1177، الرعاية النفسية، والحد الأقصى للتكاليف (Högkostnadsskydd).',
    descriptionSv: 'Vårdcentraler, tidsbokning via 1177.se, psykiatri och högkostnadsskydd för sjukvård.',
    descriptionEn: 'Health centers, 1177 booking, mental health services, and the cost ceiling protection.',
    badgeTag: 'الصحة و1177',
    lessons: [
      {
        id: 'lesson-health-1',
        categoryId: 'healthcare-1177',
        title: 'كيفية الوصول للرعاية الصحية وحماية السقف المالي (Högkostnadsskydd)',
        titleSv: 'Söka vård, Vårdcentral och högkostnadsskydd',
        titleEn: 'Seeking Medical Care & High Cost Protection Ceiling',
        readingTimeMinutes: 7,
        summary: 'المركز الصحي (Vårdcentral) هو بوابتك الأولى للرعاية. يضمن نظام السقف المالي ألا تتجاوز رسوم الرعاية الطبية والأدوية حداً سنوياً ثابتاً.',
        summarySv: 'Kontakta din Vårdcentral i första hand. Högkostnadsskyddet begränsar dina årliga vård- och läkemedelskostnader.',
        summaryEn: 'Contact your primary health center first. The cost ceiling protects you from high annual medical expenses.',
        fullContent: `نظام الرعاية الصحية السويدي مدعوم حكومياً ويضمن جودة عالية لجميع السكان.

1. المركز الصحي (Vårdcentral):
هو الخط الأول عند المرض أو الحاجة لفحوصات. يضم أطباء الأسرة، الممرضين، والقابلات.
إذا كانت حالتك تتطلب طبيباً أخصائياً، يقوم طبيب المركز الصحي بكتابة تحويل طبي (Remiss) إلى المستشفى.

2. خدمة 1177 Vårdguiden:
يمكنك الاتصال بـ 1177 على مدار 24 ساعة للتحدث مع ممرضة باللغة العربية أو السويدية لتقييم حالتك، أو تسجيل الدخول بموقع 1177.se عبر BankID لحجز موعد وإعطاء استشارات.

3. حماية السقف المالي التراكمي (Högkostnadsskydd):
تضمن الدولة ألا يدفع المريض أكثر من مبلغ محدد سنوياً للزيارات الطبية (حوالي 1,400 كرونة) وللأدوية الموصوفة (حوالي 2,900 كرونة). بمجرد الوصول للحد، تصبح باقي الزيارات والأدوية مجانية تماماً كارت المساعدة (Frikort).`,
        fullContentSv: `1177 är öppet dygnet runt. Högkostnadsskydd ger dig frikort när taket nåtts.`,
        fullContentEn: `1177 is open 24/7. High-cost protection grants free medical care once ceiling limit is reached.`,
        practicalExamples: [
          'للحالات الطارئة جداً المهددة للحياة (مثل الأزمات القلبية أو الحوادث الشديدة)، توجه مباشرة لطوارئ المستشفى (Akutmottagning) أو اتصل بـ 112.',
          'رعاية الأطفال والحوامل مجانية بالكامل في المستوصفات الحكومية.'
        ],
        practicalExamplesSv: [
          'Vid livshotande tillstånd – sök Akutmottagningen eller ring 112.',
          'Mödrahälsovård och barnhälsovård är helt kostnadsfri.'
        ],
        practicalExamplesEn: [
          'For life-threatening emergencies - visit the ER or call 112.',
          'Maternity and child healthcare are completely free of charge.'
        ],
        officialSource: '1177 Vårdguiden & Socialstyrelsen',
        officialUrl: 'https://www.1177.se',
        lastVerifiedDate: '2026-02-28',
        quiz: [
          {
            id: 'q-health-1',
            question: 'ما هو الهدف من نظام حماية السقف المالي (Högkostnadsskydd) في السويد؟',
            questionSv: 'Vad innebär högkostnadsskyddet i svensk sjukvård?',
            questionEn: 'What is the purpose of the High Cost Protection ceiling in Sweden?',
            options: ['وضع حد أقصى سنوي لما يدفعه المريض للزيارات والأدوية وتوفير الباقي مجاناً (Frikort)', 'فرض رسوم مضاعفة على كبار السن', 'إلغاء التأمين الصحي الحكومي', 'دفع الرعاية الصحية بالكامل بالدولار'],
            optionsSv: ['Ett maxbelopp per år för vård och medicin, därefter frikort', 'Höjda avgifter för äldre', 'Avskaffa statlig sjukvård', 'Betala i utländsk valuta'],
            optionsEn: ['An annual maximum cap for medical visits and prescription drugs, after which care is free', 'Higher fees for elderly', 'Abolish public health care', 'Payment in foreign currency'],
            correctAnswerIndex: 0,
            explanation: 'يحمي السقف المالي المرضى من تكاليف العلاج المرتفعة عبر منحهم بطاقة الفريكورت المجانية عند تجاوز السقف.',
            explanationSv: 'Skyddar mot höga sjukvårdskostnader genom frikort.',
            explanationEn: 'Protects patients from high healthcare costs through a free card (Frikort).'
          }
        ]
      }
    ]
  },
  {
    id: 'family-parenting',
    iconName: 'Users',
    title: 'الأسرة والزواج والطلاق وتربية الأطفال',
    titleSv: 'Familj, äktenskap, skilsmässa och föräldraskap',
    titleEn: 'Family, Marriage, Divorce & Parenting',
    description: 'قوانين الأسرة، عقد الزواج، الحضانة المشتركة (Gemensam vårdnad)، وحقوق كلا الوالدين.',
    descriptionSv: 'Familjerätt, äktenskapsbalken, skilsmässa och gemensam vårdnad om barn.',
    descriptionEn: 'Family law, Marriage Code, divorce proceedings, and joint child custody.',
    badgeTag: 'الأسرة والوالدية',
    lessons: [
      {
        id: 'lesson-fam-1',
        categoryId: 'family-parenting',
        title: 'قانون الأسرة والحضانة المشتركة للأطفال',
        titleSv: 'Familjerätt och gemensam vårdnad om barn',
        titleEn: 'Family Law & Joint Child Custody',
        readingTimeMinutes: 6,
        summary: 'القانون السويدي يركز على مصلحة الطفل الفضلى (Barnets bästa). الحضانة تكون مشتركة مبدئياً لضمان حق الطفل في التواصل مع كلا الوالدين.',
        summarySv: 'Barnets bästa står i centrum. Huvudregeln i Sverige är gemensam vårdnad vid skilsmässa.',
        summaryEn: 'The best interest of the child is paramount. The general rule in Sweden is joint custody upon divorce.',
        fullContent: `قانون الأسرة في السويد يعامل جميع الأفراد بمساواة تامة بغض النظر عن الجنس.

1. الزواج والطلاق:
الزواج يتم إما عبر مراسم مدنية في البلدية أو مراسم دينية معترف بها رسمياً. عند طلب الطلاق، إذا كان هناك أطفال دون سن 16 عاماً، يفرض القانون فترة تفكير (Betänketid) مدتها 6 أشهر قبل صدور قرار الطلاق النهائي للحفاظ على استقرار الأسرة.

2. مصلحة الطفل والحضانة:
• المبدأ الأساسي هو الحضانة المشتركة (Gemensam vårdnad)، حيث يشارك كلا الوالدين في اتخاذ القرارات الهامة المتعلقة بتعليم الطفل وصحته وسكنه.
• لا يحق لأحد الوالدين حرمان الآخر من رؤية طفله أو السفر به خارج السويد دون موافقة خطية رسمية من الطرف الآخر.

3. المساعدة الأسرية (Familjerådgivning):
تقدم البلديات خدمات الاستشارة الأسرية لحل الخلافات ودياً وتنظيم أوقات رؤية الأطفال.`,
        fullContentSv: `Betänketid på 6 månader gäller vid skilsmässa om barn under 16 år finns. Gemensam vårdnad är normen.`,
        fullContentEn: `A 6-month consideration period applies upon divorce if children under 16 are involved. Joint custody is default.`,
        practicalExamples: [
          'السفر بالطفل خارج السويد بدون موافقة الشريك الحاضن يُعد جريمة اختطاف أطفال (Egenmäktighet med barn).',
          'يمكن للأبوين تنظيم اتصالات السكن بالتساوي (Växelvis boende).'
        ],
        practicalExamplesSv: [
          'Att föra bort ett barn utan tillstånd kan vara egenmäktighet med barn.',
          'Familjerådgivning finns i varje kommun.'
        ],
        practicalExamplesEn: [
          'Taking a child abroad without consent can constitute child abduction.',
          'Family counseling is available in every municipality.'
        ],
        officialSource: 'Domstolsverket & Socialstyrelsen',
        officialUrl: 'https://www.domstol.se',
        lastVerifiedDate: '2026-01-25',
        quiz: [
          {
            id: 'q-fam-1',
            question: 'ما هي فترة التفكير (Betänketid) عند طلب الطلاق إذا كان للزوجين أطفال تحت سن 16 سنة؟',
            questionSv: 'Hur lång är betänketiden vid skilsmässa om man har barn under 16 år?',
            questionEn: 'How long is the consideration period for divorce when children under 16 are involved?',
            options: ['6 أشهر', 'يوم واحد', '3 سنوات', 'لا توجد فترة تفكير'],
            optionsSv: ['6 månader', 'En dag', '3 år', 'Ingen betänketid'],
            optionsEn: ['6 months', 'One day', '3 years', 'No period required'],
            correctAnswerIndex: 0,
            explanation: 'يحدد القانون فترة تفكير مدتها 6 أشهر لضمان مصلحة الأطفال وإتاحة الفرصة للمراجعة.',
            explanationSv: 'Lagen kräver 6 månaders betänketid för barnens bästa.',
            explanationEn: 'Law mandates a 6-month period for the best interest of the children.'
          }
        ]
      }
    ]
  },
  {
    id: 'children-social-services',
    iconName: 'Heart',
    title: 'الأطفال وحقوق الطفل ومؤسسة السوسيال',
    titleSv: 'Barns rättigheter och Socialtjänsten',
    titleEn: 'Children\'s Rights & Social Services (Socialtjänsten)',
    description: 'حقوق الطفل في اتفاقية الأمم المتحدة (Barnkonventionen)، حظر الضرب التام، ودور السوسيال الوقائي الداعم.',
    descriptionSv: 'Barnkonventionen som svensk lag, absolut förbud mot aga och Socialtjänstens stödjande roll.',
    descriptionEn: 'UN Convention on the Rights of the Child in Swedish law, corporal punishment ban, and Social Services.',
    badgeTag: 'حماية الطفل والسوسيال',
    lessons: [
      {
        id: 'lesson-soc-1',
        categoryId: 'children-social-services',
        title: 'حقوق الطفل في القانون السويدي والدور الحقيقي للسوسيال (Socialtjänsten)',
        titleSv: 'Barns rättigheter och Socialtjänstens uppdrag',
        titleEn: 'Children\'s Rights & The Real Mission of Social Services',
        readingTimeMinutes: 8,
        summary: 'العقاب البدني للأطفال ممنوع تماماً في السويد منذ عام 1979. السوسيال مؤسسة مساعدة تهدف لدعم العائلات والوقاية وليس سحب الأطفال.',
        summarySv: 'Aga är totalförbjudet sedan 1979. Socialtjänstens primära uppgift är att stötta familjer i samarbete.',
        summaryEn: 'Corporal punishment is strictly forbidden since 1979. Social Services\' primary goal is supporting families in cooperation.',
        fullContent: `تُعتبر السويد أول دولة في العالم حظرت ضرب أو إهانة الأطفال بالقانون عام 1979. اتفاقية حقوق الطفل (Barnkonventionen) أصبحت قانوناً سويدياً نافذاً.

1. حظر العقاب البدني والنفسي (Förbud mot aga):
يُحظر تماماً ضرب الطفل، صفعه، هزّه، أو الصراخ المهين بوجهه. أي ضرب -مهما كان خفيفاً- يُعتبر جريمة يعاقب عليها القانون السويدي.

2. الحقيقة حول مؤسسة السوسيال (Socialtjänsten):
• الهدف الأول والأساسي للسوسيال هو تقديم الدعم والمساندة للعائلات داخل منازلهم عبر الاستشارات والخدمات التربوية المجانية.
• السوسيال لا يسعى إطلاقاً لـ "أخذ الأطفال"، بل يقدم برامج دعم الوالدية (Föräldrastöd) لمساعدة الآباء في التعامل مع الضغوط.
• التدخل القسري (LVU) لا يحدث إلا في حالات نادرة جداً ومأساوية عند وجود خطر مباشر وداهم على حياة الطفل أو تعرضه لإساءة شديدة أو إدمان، ويكون ذلك بقرار قضائي من المحكمة وليس برغبة موظف فردي.`,
        fullContentSv: `Aga är straffbart. Socialtjänsten arbetar i första hand med frivilligt stöd till familjer. LVU kräver domstolsbeslut.`,
        fullContentEn: `Corporal punishment is punishable. Social Services primarily works with voluntary family support. LVU requires a court ruling.`,
        practicalExamples: [
          'يمكنك الاتصال بالسوسيال بنفسك وطلب دورات دعم الوالدية (Föräldrautbildning) مجاناً.',
          'المدارس والروضات والمستشفيات ملزمة قانوناً بإرسال بلاغ قلق (Orosanmälan) للسوسيال إذا لاحظت علامات إهمال أو ضرب على الطفل.'
        ],
        practicalExamplesSv: [
          'Du kan själv kontakta socialtjänsten för att få stöd i föräldraskapet.',
          'Skolan har anmälningsplikt vid misstankar om faror för barnet.'
        ],
        practicalExamplesEn: [
          'You can contact social services yourself to receive free parenting support.',
          'Schools have a mandatory duty to report concerns for child welfare.'
        ],
        officialSource: 'Socialstyrelsen & Barnombudsmannen',
        officialUrl: 'https://www.socialstyrelsen.se',
        lastVerifiedDate: '2026-03-05',
        quiz: [
          {
            id: 'q-soc-1',
            question: 'ما هو موقف القانون السويدي من العقاب البدني (الضرب) للأطفال؟',
            questionSv: 'Vad säger svensk lag om aga (stryk) av barn?',
            questionEn: 'What does Swedish law state regarding corporal punishment of children?',
            options: ['ممنوع ومجرم تماماً بجميع أشكاله مهما كان خفيفاً', 'مسموح به داخل المنزل فقط', 'مسموح إذا كان للتهذيب البسيط', 'مسموح للأب فقط'],
            optionsSv: ['Totalförbjudet och straffbart i alla former', 'Tillåtet i hemmet', 'Tillåtet i uppfostringssyfte', 'Tillåtet för mamman'],
            optionsEn: ['Strictly forbidden and punishable in all forms', 'Allowed inside home', 'Allowed for mild discipline', 'Allowed for father only'],
            correctAnswerIndex: 0,
            explanation: 'يحظر القانون السويدي ضرب أو إهانة الطفل بأي شكل من الأشكال ويعتبر ذلك جريمة يعاقب عليها القانون.',
            explanationSv: 'All form av aga är förbjuden i lag sedan 1979.',
            explanationEn: 'All forms of corporal punishment have been illegal since 1979.'
          },
          {
            id: 'q-soc-2',
            question: 'ما هو الهدف الرئيسي لمؤسسة السوسيال (Socialtjänsten) تجاه العائلات؟',
            questionSv: 'Vad är Socialtjänstens primära mål för familjer?',
            questionEn: 'What is Social Services\' primary goal for families?',
            options: ['تقديم الدعم والتعاون والخدمات التربوية المجانية المباشرة للعائلات', 'أخذ الأطفال من أسرهم تلقائياً', 'فرض عقوبات مالية على الوالدين', 'ترحيل العائلات إلى الخارج'],
            optionsSv: ['Erbjuda frivilligt stöd och föräldrautbildning', 'Ta barn ifrån familjer automatiskt', 'Bötfälla föräldrar', 'Utvisa familjer'],
            optionsEn: ['Offer voluntary support and parenting programs in cooperation', 'Take children away automatically', 'Fine parents', 'Deport families'],
            correctAnswerIndex: 0,
            explanation: 'تعمل مؤسسة السوسيال بالدرجة الأولى كمؤسسة داعمة ومساعدة للوالدين للارتقاء بظروف تربية الأطفال.',
            explanationSv: 'Socialtjänsten arbetar i första hand med frivilliga insatser och stöd.',
            explanationEn: 'Social Services primarily provides voluntary support and assistance.'
          }
        ]
      }
    ]
  },
  {
    id: 'domestic-violence',
    iconName: 'ShieldAlert',
    title: 'المساواة والعنف الأسري والحماية القانونية',
    titleSv: 'Jämställdhet, våld i nära relationer och skydd',
    titleEn: 'Equality, Domestic Violence & Legal Protection',
    description: 'المساواة بين الجنسين، رفض العنف الأسري بكافة أنواعه، وخطوط الدعم والمأوى الآمن (Skyddat boende).',
    descriptionSv: 'Jämställdhet mellan könen, förbud mot våld i nära relationer samt skyddat boende.',
    descriptionEn: 'Gender equality, domestic violence zero tolerance, and protected housing (Skyddat boende).',
    badgeTag: 'المساواة والحماية',
    lessons: [
      {
        id: 'lesson-viol-1',
        categoryId: 'domestic-violence',
        title: 'المساواة والحماية من العنف الأسري والتهديد',
        titleSv: 'Jämställdhet och skydd mot våld i relationer',
        titleEn: 'Equality & Protection Against Domestic Violence',
        readingTimeMinutes: 6,
        summary: 'السويد تطبق مبدأ المساواة التامة بين الرجل والمرأة. العنف الجسدي والنفسي والاقتصادي جريمة يحاقب عليها القانون وتقدم الدولة حماية فورية للضحايا.',
        summarySv: 'Nolltolerans mot alla former av våld i nära relationer. Samhället erbjuder skyddat boende och stöd.',
        summaryEn: 'Zero tolerance for all domestic violence. Society offers protected shelters and confidential support.',
        fullContent: `المساواة بين الجنسين هي إحدى الدعائم الأساسية للمجتمع السويدي.

1. حظر العنف والسيطرة (Nolltolerans mot våld):
العنف لا يقتصر على الضرب الجسدي فقط، بل يشمل:
• العنف النفسي والتهديد والترهيب.
• العنف الاقتصادي (منع الشريك من التصرف بماله أو العمل).
• العنف الجنسي والقسري داخل الزواج.
• شرف الأسرة والسيطرة القسرية (Hedersrelaterat våld och förtryck).

2. الحماية والدعم الفوري:
• خط هاتف حماية النساء (Kvinnofridslinjen): 020-50 50 50 يقدم دعماً سرياً مجانياً بمترجم عربي على مدار 24 ساعة.
• السكن المحمي (Skyddat boende): توفر البلديات أماكن سكنية سرية ومحمية للنساء والأطفال المعرضين للتهديد.`,
        fullContentSv: `Ring Kvinnofridslinjen 020-50 50 50 för kostnadsfri och anonym hjälp dygnet runt. Tolk finns.`,
        fullContentEn: `Call Kvinnofridslinjen at 020-50 50 50 for free anonymous help 24/7. Interpreters available.`,
        practicalExamples: [
          'يمكن لأي شخص يتعرض للتهديد الحصول على هوية محمية (Skyddade personuppgifter) من مصلحة الضرائب.',
          'في الحالات العاجلة خط هاتف الطوارئ هو 112 للشرطة.'
        ],
        practicalExamplesSv: [
          'Skyddade personuppgifter kan beviljas av Skatteverket.',
          'Ring 112 vid akuta hot.'
        ],
        practicalExamplesEn: [
          'Protected identity status can be granted by Skatteverket.',
          'Call 112 in acute emergencies.'
        ],
        officialSource: 'Jämställdhetsmyndigheten & Kvinnofridslinjen',
        officialUrl: 'https://kvinnofridslinjen.se',
        lastVerifiedDate: '2026-02-18',
        quiz: [
          {
            id: 'q-viol-1',
            question: 'ما هو رقم الهاتف المجاني المخصص لدعم وحماية النساء المعرضات للعنف والتهديد في السويد؟',
            questionSv: 'Vilket nummer går till Kvinnofridslinjen för anonymt stöd?',
            questionEn: 'Which free phone number goes to the Kvinnofridslinjen helpline?',
            options: ['020-50 50 50', '118 118', '0700-00 00 00', '08-123 456'],
            optionsSv: ['020-50 50 50', '118 118', '0700-00 00 00', '08-123 456'],
            optionsEn: ['020-50 50 50', '118 118', '0700-00 00 00', '08-123 456'],
            correctAnswerIndex: 0,
            explanation: 'خط Kvinnofridslinjen 020-50 50 50 يعمل على مدار 24 ساعة بمترجم عربي وبسرية تامة.',
            explanationSv: '020-50 50 50 ger anonym hjälp dygnet runt med tolk.',
            explanationEn: '020-50 50 50 provides anonymous help 24/7 with interpreters.'
          }
        ]
      }
    ]
  },
  {
    id: 'police-courts',
    iconName: 'Scale',
    title: 'الشرطة والمحاكم والجرائم والمساعدة القانونية',
    titleSv: 'Polis, domstolar, brott och rättshjälp',
    titleEn: 'Police, Courts, Crime & Legal Aid',
    description: 'دور الشرطة السويدية، الإبلاغ عن الجرائم عبر 114 14، نظام المحاكم، والمساعدة القانونية (Rättshjälp).',
    descriptionSv: 'Polisens roll, brottsanmälan via 114 14, tingsrätten och rättshjälp.',
    descriptionEn: 'Role of police, crime reporting via 114 14, district courts, and legal aid.',
    badgeTag: 'الشرطة والقضاء',
    lessons: [
      {
        id: 'lesson-pol-1',
        categoryId: 'police-courts',
        title: 'الشرطة السويدية والمساعدة القانونية المجانية',
        titleSv: 'Polisens uppdrag och rätt till offentlig försvarare',
        titleEn: 'The Police Mission & Right to Public Defense Counsel',
        readingTimeMinutes: 6,
        summary: 'الشرطة السويدية مؤسسة صديقة لحماية المجتمع وتأمين أفراده. عند الشبهة في جريمة خطيرة، يحق لك محامٍ مجاني من الدولة (Offentlig försvarare).',
        summarySv: 'Polisen skyddar medborgarna. Du har rätt till offentlig försvarare vid allvarliga brottsmisstankar.',
        summaryEn: 'Police protect citizens. You have the right to a public defense attorney for serious charges.',
        fullContent: `الشرطة في السويد تُعد جهة مساعدة وموثوقة تهدف لحفظ الأمن والنظام لحماية السكان.

1. الاتصال بالشرطة:
• الرقم 112: للحالات الطارئة جداً والجرائم التي تحدث الآن أو عند وجود خطر مباشر.
• الرقم 114 14: للبلاغات غير العاجلة، تقديم بلاغ سرقة، فقدان وثائق، أو استفسارات الهوية والجوازات.

2. حقوقك القانونية أثناء التحقيق:
• عند استدعائك للتحقيق كـ مشتبه به في جريمة، يحق لك التزام الصمت وعدم الإجابة إلا بحضور محاميك.
• في الجرائم الشديدة، تعين المحكمة محامياً للمدعى عليه على نفقة الدولة (Offentlig försvarare).
• يحق لك دائماً طلب مترجم شفهي معتمد باللغة العربية في جميع جلسات التحقيق والمحكمة مجاناً.`,
        fullContentSv: `114 14 för icke-akuta ärenden. Rätt till tolk och offentlig försvarare finns vid allvarliga brott.`,
        fullContentEn: `114 14 for non-emergencies. Right to an interpreter and public defender applies.`,
        practicalExamples: [
          'إذا تعرضت للنصب الإلكتروني، احتفظ بلقطات الشاشة ورسائل المحادثة وقدم بلاغاً فوراً عبر موقع Polisen.se أو 114 14.',
          'الشرطة السويدية تمنحك الأمان ويمكنك التحدث معها بحرية دون أي خوف.'
        ],
        practicalExamplesSv: [
          'Spara alla bevis vid nätbedrägeri och anmäl på polisen.se.',
          'Du kan alltid känna dig trygg med svensk polis.'
        ],
        practicalExamplesEn: [
          'Save proof during online fraud and report on polisen.se.',
          'You can always feel safe contacting the Swedish police.'
        ],
        officialSource: 'Polisen & Domstolsverket',
        officialUrl: 'https://polisen.se',
        lastVerifiedDate: '2026-02-05',
        quiz: [
          {
            id: 'q-pol-1',
            question: 'ما هو الرقم المخصص للاتصال بالشرطة السويدية لتقديم بلاغ غير عاجل عن سرقة أو استفسار؟',
            questionSv: 'Vilket telefonnummer använder du för icke-akuta polisärenden?',
            questionEn: 'Which phone number do you call for non-emergency police reports?',
            options: ['114 14', '112', '1177', '113 13'],
            optionsSv: ['114 14', '112', '1177', '113 13'],
            optionsEn: ['114 14', '112', '1177', '113 13'],
            correctAnswerIndex: 0,
            explanation: 'الرقم 114 14 مخصص لجميع البلاغات والاستفسارات غير العاجلة لدى الشرطة السويدية.',
            explanationSv: '114 14 går till polisens kontaktcenter för icke-akuta ärenden.',
            explanationEn: '114 14 connects to the non-emergency police contact center.'
          }
        ]
      }
    ]
  },
  {
    id: 'digital-services',
    iconName: 'Smartphone',
    title: 'الخدمات الرقمية: BankID وSwish وKivra',
    titleSv: 'Digitala tjänster: BankID, Swish, Kivra och 1177',
    titleEn: 'Digital Services: BankID, Swish, Kivra & E-services',
    description: 'الهوية الرقمية (BankID)، الدفع الإلكتروني (Swish)، البريد الرقمي (Kivra)، والتعامل الآمن مع البنوك.',
    descriptionSv: 'Legitimera dig säkert med Mobilt BankID, Swish-betalningar och digital myndighetspost i Kivra.',
    descriptionEn: 'Secure authentication with Mobile BankID, Swish payments, and official digital mail in Kivra.',
    badgeTag: 'الخدمات الرقمية',
    lessons: [
      {
        id: 'lesson-dig-1',
        categoryId: 'digital-services',
        title: 'كيفية استخدام Mobilt BankID وتطبيق Kivra بأمان تام',
        titleSv: 'Använda Mobilt BankID och Kivra säkert',
        titleEn: 'Using Mobile BankID & Kivra Safely',
        readingTimeMinutes: 6,
        summary: 'Mobilt BankID هو هويتك الرسمية والتوقيع الإلكتروني القانوني في السويد. حافظ على سريته ولا تشاركه إطلاقاً مع أي شخص عبر الهاتف.',
        summarySv: 'Mobilt BankID är din personliga e-legitimation. Använd det aldrig på uppmaning av någon som ringer dig.',
        summaryEn: 'Mobile BankID is your electronic signature. Never use it when prompted by phone callers.',
        fullContent: `تُعتبر السويد من أكثر مجتمعات العالم تحولاً نحو الخدمات الرقمية.

1. الهوية الرقمية Mobilt BankID:
تُصدر من البنك الذي تملك فيه حساباً وتأكيد هويتك. يُستخدم BankID لتسجيل الدخول في مصلحة الضرائب، الهجرة، المستشفى، وتثبيت المعاملات الرسمية.
🛑 قاعدة الأمان الذهبية: لا تقم إطلاقاً بتمرير أو تسجيل الدخول بـ BankID بناءً على اتصال هاتفي وردك من شخص يدعي أنه من البنك أو الشرطة! البنك والشرطة لن يطلبوا ذلك منك عبر الهاتف أبداً.

2. تطبيق البريد الرقمي Kivra:
تطبيق يربط رقمك الشخصي لاستلام جميع الرسائل الرسمية، الفواتير، وقرارات المؤسسات الحكومية فور صدورها بدلاً من البريد الورقي.

3. تطبيق الدفع الفوري Swish:
تحويل الأموال فورياً بين الأفراد والشركات باستخدام رقم الهاتف المحمول المربوط بحسابك البنكي.`,
        fullContentSv: `Använd aldrig BankID på uppmaning av någon som kontaktar dig via telefon. Säkra din Kivra.`,
        fullContentEn: `Never use BankID at the request of anyone calling you over the phone. Secure your Kivra.`,
        practicalExamples: [
          'إذا اتصل بك شخص يدعي أنه موظف بنك أو شرطة وطلب منك فتح BankID – أغلق المكالمة فوراً! إنه احتيال.',
          'قم بتفعيل خيار الإشعارات في تطبيق Kivra لتنبهك هاتفك فور استلام أي رسالة حكومية جديدة.'
        ],
        practicalExamplesSv: [
          'Lägg på luren direkt om någon ber dig starta BankID.',
          'Slå på notiser i Kivra.'
        ],
        practicalExamplesEn: [
          'Hang up immediately if someone asks you to open BankID over the phone.',
          'Turn on notifications in Kivra.'
        ],
        officialSource: 'BankID.com & MSB (Myndigheten för samhällsskydd)',
        officialUrl: 'https://www.bankid.com',
        lastVerifiedDate: '2026-03-01',
        quiz: [
          {
            id: 'q-dig-1',
            question: 'ما هو التصرف الصحيح إذا اتصل بك شخص يزعم أنه موظف بنك وطلب منك فتح تطبيق BankID وتأكيد الكود؟',
            questionSv: 'Vad ska du göra om någon ringer och ber dig starta BankID?',
            questionEn: 'What should you do if someone calls claiming to be a bank officer asking to open BankID?',
            options: ['إغلاق المكالمة فوراً وعدم إدخال أي رمز لأن البنوك والشرطة لا تطلب ذلك أبداً عبر الهاتف', 'إعطاؤه الرمز ومساعدته', 'إرسال كلمة السر في رسالة نصية', 'فتح التطبيق والموافقة دون قراءة التفاصيل'],
            optionsSv: ['Lägga på luren direkt och inte identifiera dig', 'Göra som han säger', 'Skicka koden på SMS', 'Godkänna utan att läsa'],
            optionsEn: ['Hang up immediately and do not authenticate, as banks/police never ask this via phone', 'Follow instructions', 'SMS the password', 'Approve without reading'],
            correctAnswerIndex: 0,
            explanation: 'البنوك والمؤسسات السويدية الرسمية لا تطلب إطلاقاً تسجيل الدخول بـ BankID عبر اتصال هاتفي وارد، وهو أسلوب احتيالي شهير.',
            explanationSv: 'Banken ber dig aldrig starta BankID via ett inkommande samtal.',
            explanationEn: 'The bank will never ask you to start BankID on an incoming call.'
          }
        ]
      }
    ]
  },
  {
    id: 'emergency-authorities',
    iconName: 'PhoneCall',
    title: 'أرقام الطوارئ والجهات الرسمية',
    titleSv: 'Viktiga telefonnummer och statliga myndigheter',
    titleEn: 'Emergency Numbers & Public Authorities',
    description: 'أرقام الطوارئ 112، 1177، 114 14، 113 13، وكيفية التعامل عند وقوع الحوادث والأزمات.',
    descriptionSv: 'Nödnummer 112, 1177, 114 14, 113 13 och myndighetskontakter vid kriser.',
    descriptionEn: 'Emergency 112, 1177, 114 14, 113 13, and official contacts during crises.',
    badgeTag: 'أرقام الطوارئ',
    lessons: [
      {
        id: 'lesson-emg-1',
        categoryId: 'emergency-authorities',
        title: 'دليل الأرقام الهامة واستجابة الطوارئ في السويد',
        titleSv: 'Sveriges viktigaste nöd- och informationsnummer',
        titleEn: 'Sweden\'s Critical Emergency & Info Numbers',
        readingTimeMinutes: 5,
        summary: 'احفظ الأرقام الأربعة الرئيسية في السويد: 112 (طوارئ مهددة للحياة)، 1177 (استشارة طبية)، 114 14 (شرطة غير عاجل)، و113 13 (معلومات الأزمات).',
        summarySv: 'Kom ihåg de fyra numren: 112 (akut nödläge), 1177 (sjukvårdsrådgivning), 114 14 (polis) och 113 13 (krisinformation).',
        summaryEn: 'Remember the four key numbers: 112 (life threatening), 1177 (medical advice), 114 14 (police non-emergency), and 113 13 (crisis info).',
        fullContent: `تعتمد السويد أرقاماً مختصرة سهلة التذكر للتعامل مع كافة الظروف:

• 112 - رقم الطوارئ الموحد SOS Alarm:
يُتصل به فقط في الحالات العاجلة المهددة للحياة (إسعاف، مطافئ، حادث سير خطير، جريمة قائمة الآن). يمكنك طلب مترجم عربي فوراً بالقول: "Tolk på arabiska, tack".

• 1177 - دليل الرعاية الصحية Vårdguiden:
استشارات طبية مع ممرضين، تقييم أعراض المرض، ومعرفة المستوصف المفتوح.

• 114 14 - الشرطة السويدية (غير عاجل):
بلاغات السرقة، فقدان المحفظة أو الوثائق، وتصاريح السفر والهوية.

• 113 13 - رقم معلومات الحوادث والأزمات الكبرى:
يُستخدم أثناء الأزمات الوطنية والعواصف وانقطاع الكهرباء الكبير للاستعلام دون إشغال رقم 112.`,
        fullContentSv: `Svara på SOS-operatörens frågor lugnt. Tolk finns tillgänglig på 112 och 1177.`,
        fullContentEn: `Answer the SOS operator calmly. Interpreter is available on 112 and 1177.`,
        practicalExamples: [
          'عند الاتصال بـ 112، حدد أولاً: ماذا حدث؟ أين حدث؟ ومن يحتاج المساعدة؟',
          'يمكن للأطفال الاتصال بـ BRIS على الرقم 116 111 للحصول على محادثة سرية مع أخصائي نفسي.'
        ],
        practicalExamplesSv: [
          'Vid 112-samtal: Berätta vad som hänt, var det hänt och vem som behöver hjälp.',
          'BRIS för barn: 116 111.'
        ],
        practicalExamplesEn: [
          'When calling 112: State what happened, where it happened, and who needs help.',
          'BRIS for children: 116 111.'
        ],
        officialSource: 'SOS Alarm & Krisinformation.se',
        officialUrl: 'https://www.sosalarm.se',
        lastVerifiedDate: '2026-03-01',
        quiz: [
          {
            id: 'q-emg-1',
            question: 'متى يجب عليك الاتصال برقم الطوارئ 112؟',
            questionSv: 'När ska du ringa 112?',
            questionEn: 'When should you call 112?',
            options: ['فقط عند وجود خطر مباشر مهدد للحياة أو حادث خطير أو حريق', 'لحجز موعد عادي في المستوصف', 'للاستفسار عن مواعيد حافلات النقل', 'لتجديد جواز السفر'],
            optionsSv: ['Endast vid akuta livshotande situationer, brand eller olycka', 'För att boka tid på vårdcentral', 'För busstider', 'För att förnya pass'],
            optionsEn: ['Only in acute life-threatening situations, fire, or severe accidents', 'To book a routine doctor appointment', 'For bus schedules', 'To renew passport'],
            correctAnswerIndex: 0,
            explanation: 'رقم 112 مخصص حصرياً للطوارئ المهددة للحياة لتجنب إعاقة وصول سيارات الإسعاف والإنقاذ.',
            explanationSv: '112 är endast till för akuta nödsituationer.',
            explanationEn: '112 is strictly reserved for acute emergency situations.'
          }
        ]
      }
    ]
  },
  {
    id: 'elections-participation',
    iconName: 'Vote',
    title: 'المشاركة المجتمعية والانتخابات والجمعيات',
    titleSv: 'Val, politiskt deltagande, föreningar och integration',
    titleEn: 'Elections, Participation, Associations & Integration',
    description: 'حق التصويت في انتخابات البلدية والإقليم، تأسيس الجمعيات غير الربحية (Förening)، والاندماج الفعال.',
    descriptionSv: 'Rösträtt i kommun- och regionval, föreningslivet och deltagande i civilsamhället.',
    descriptionEn: 'Voting rights in local elections, association life (Förening), and civil participation.',
    badgeTag: 'المشاركة والانتخابات',
    lessons: [
      {
        id: 'lesson-el-1',
        categoryId: 'elections-participation',
        title: 'حق التصويت في الانتخابات والحياة الجمعوية السويدية (Föreningslivet)',
        titleSv: 'Rösträtt och det svenska föreningslivet',
        titleEn: 'Voting Rights & The Swedish Association Culture (Föreningslivet)',
        readingTimeMinutes: 6,
        summary: 'حق التصويت في البلديات متاح للمقيمين بعد 3 سنوات من القيد النفوسي حتى بدون جنسية. الجمعيات (Föreningar) هي قلب الحياة الاجتماعية السويدية.',
        summarySv: 'Du har rösträtt i kommun och region efter 3 års folkbokföring. Föreningslivet är nyckeln till gemenskap.',
        summaryEn: 'You have voting rights in local elections after 3 years of registration. Associations build strong community ties.',
        fullContent: `تُعتبر المشاركة الفعالة في المجتمع جزءاً رئيساً من نموذج الاندماج السويدي.

1. حق الاقتراع في الانتخابات (Rösträtt):
• الانتخابات العامة تُقام كل 4 سنوات في شهر سبتمبر.
• انتخابات البلدية والإقليم (Kommun- och Regionval): يحق لك التصويت فيها حتى لو لم تكن حاملاً للجنسية السويدية، بشرط مضي 3 سنوات متتالية على قيدك النفوسي في السويد!
• انتخابات البرلمان (Riksdagsval): تشترط الحصول على الجنسية السويدية وبلوغ سن 18 عاماً.

2. ثقافة الجمعيات (Föreningslivet):
تعتمد السويد على آلاف الجمعيات غير الربحية (الرياضية، الثقافية، الأسرية، البيئية). الانضمام للجمعيات يساعدك ولأطفالك في تكوين صداقات مع السويديين وممارسة الهوايات وشغل أوقات الفراغ بفعالية.`,
        fullContentSv: `Svenskt föreningsliv ger vänner och språkträning. Rösträtt i kommunval kräver 3 års folkbokföring.`,
        fullContentEn: `Swedish association life offers friends and language practice. Local voting requires 3 years registration.`,
        practicalExamples: [
          'يمكنك تسجيل أطفالك في الجمعيات الرياضية المحلية (כأنشطة كرة القدم أو السباحة) بتكلفة رمزية جداً.',
          'بطاقة الاقتراع (Röstkort) تصلك عبر البريد تلقائياً قبل الانتخابات بأسبوعين.'
        ],
        practicalExamplesSv: [
          'Anmäl barnen till idrottsföreningar.',
          'Röstkortet kommer automatiskt med posten.'
        ],
        practicalExamplesEn: [
          'Register children in local sports associations.',
          'Voting cards arrive automatically by mail.'
        ],
        officialSource: 'Valmyndigheten & Myndigheten för ungdoms- och civilsamhällesfrågor (MUCF)',
        officialUrl: 'https://www.val.se',
        lastVerifiedDate: '2026-01-10',
        quiz: [
          {
            id: 'q-el-1',
            question: 'هل يحق للمقيم الدائم غير الحامل للجنسية السويدية التصويت في انتخابات البلديات والأقاليم؟',
            questionSv: 'Har utländska medborgare rösträtt i kommunval efter 3 års folkbokföring?',
            questionEn: 'Do foreign residents have voting rights in municipal elections after 3 years registration?',
            options: ['نعم، يحق له التصويت بعد مضي 3 سنوات متتالية على قيده النفوسي في السويد', 'لا، التصويت محصور بالحاملين للجنسية فقط في جميع الانتخابات', 'نعم، فور وصوله بدون أي فترة انتظار', 'فقط إذا كان يملك شركة خاصة'],
            optionsSv: ['Ja, efter 3 års sammanhängande folkbokföring i Sverige', 'Nej, bara svenska medborgare', 'Ja, direkt från dag ett', 'Endast om man äger företag'],
            optionsEn: ['Yes, after 3 consecutive years of population registration in Sweden', 'No, only Swedish citizens can vote', 'Yes, directly from day one', 'Only if owning a business'],
            correctAnswerIndex: 0,
            explanation: 'يضمن القانون السويدي للمقيمين حق التصويت المحلي في البلدية والإقليم بعد 3 سنوات من القيد النفوسي.',
            explanationSv: 'Rösträtt i kommun och region ges efter 3 års folkbokföring.',
            explanationEn: 'Local voting rights are granted after 3 years of residence registration.'
          }
        ]
      }
    ]
  },
  {
    id: 'environment-transport',
    iconName: 'Leaf',
    title: 'البيئة وإعادة التدوير والنقل وقواعد الحياة اليومية',
    titleSv: 'Miljö, källsortering, kollektivtrafik och vardagsregler',
    titleEn: 'Environment, Recycling, Transport & Daily Rules',
    description: 'إعادة تدوير القمامة (Sopsortering)، إرجاع العلب القابلة للإرجاع (Pant)، وسائل النقل العام، والهدوء في المباني السكنية.',
    descriptionSv: 'Sopsortering i källarutrymmen, panta burkar och flaskor, kollektivtrafik och tystnadstider.',
    descriptionEn: 'Waste sorting, recycling cans (Pant), public transport, and quiet hours rules.',
    badgeTag: 'البيئة والنقل',
    lessons: [
      {
        id: 'lesson-env-1',
        categoryId: 'environment-transport',
        title: 'قواعد التدوير (Sopsortering) والهدوء في السكن والمواصلات',
        titleSv: 'Källsortering, pant och ordningsregler i boendet',
        titleEn: 'Recycling, Can Deposits (Pant) & Residential Rules',
        readingTimeMinutes: 5,
        summary: 'فرز القمامة إجباري في السويد لحماية البيئة. الهدوء في المباني السكنية مطلوب بعد الساعة 22:00 ليلاً لاحترام راحة الجيران.',
        summarySv: 'Källsortering är obligatoriskt. Visa hänsyn till grannar genom tystnadstider från kl. 22:00.',
        summaryEn: 'Waste sorting is mandatory. Show respect for neighbors with quiet hours starting at 22:00.',
        fullContent: `السويد رائدة عالمياً في حماية البيئة والتنمية المستدامة.

1. فرز القمامة (Sopsortering):
يجب فصل النفايات في المنزل وإلقاؤها في الأماكن المخصصة العمارة أو محطات التدوير (Återvinningsstation):
• البلاستيك، الورق والكرتون، الزجاج الفاتح والداكن، المعادن، والنفايات العضوية (مخلفات الطعام).

2. نظام البانت (Pant):
عند شراء علب العصير والمياه، تدفع زيادة قدرها 1 أو 2 كرونة. عند إرجاع العلب الفارغة لآلات البانت في آلات السوبرماركت، تسترجع المبلغ كقسيمة شراء!

3. قواعد الهدوء والجيرة (Tystnadstider):
• القواعد العامة في معظم المباني السكنية تفرض خفض الأصوات وتجنب الغسيل أو الثقب بالمته بالحفر بين الساعة 22:00 مساءً و07:00 صباحاً.
• عند التخطيط لإقامة حفلة صغيرة، يُستحسن تعليق ورقة تنبيه ودية للجيران في مدخل البناية قبل أيام.`,
        fullContentSv: `Panta alla flaskor i matbutiken. Respektera tystnadstider efter kl. 22:00.`,
        fullContentEn: `Deposit cans in grocery stores. Respect quiet hours after 22:00.`,
        practicalExamples: [
          'البطاريات والأجهزة الإلكترونية القديمة والمواد الكيميائية يجب نقلها إلى محطة التدوير الكبرى (Återvinningscentral).',
          'شراء التذاكر في وسائل النقل العام يتم مسبقاً عبر تطبيق النقل الخاص ببلديتك (مثل SL في ستوكهولم أو Västtrafik في غوتنبرغ).'
        ],
        practicalExamplesSv: [
          'Farligt avfall lämnas på återvinningscentralen.',
          'Köp biljett i appen före ombordstigning.'
        ],
        practicalExamplesEn: [
          'Hazardous waste goes to the recycling center.',
          'Buy transit tickets in the app before boarding.'
        ],
        officialSource: 'Naturvårdsverket & Pantamera',
        officialUrl: 'https://pantamera.nu',
        lastVerifiedDate: '2026-02-12',
        quiz: [
          {
            id: 'q-env-1',
            question: 'ما هي الساعة المعتادة لبدء أوقات الهدوء وخفض الأصوات في المباني السكنية السويدية ليلاً؟',
            questionSv: 'När brukar tystnadstiden börja i svenska flerbostadshus?',
            questionEn: 'When do quiet hours usually begin in Swedish apartment buildings?',
            options: ['الساعة 22:00 مساءً', 'الساعة 02:00 ليلاً', 'الساعة 18:00 مساءً', 'لا يوجد أوقات للهدوء'],
            optionsSv: ['Klockan 22:00', 'Klockan 02:00', 'Klockan 18:00', 'Inga tystnadstider finns'],
            optionsEn: ['At 22:00 (10 PM)', 'At 02:00 AM', 'At 18:00 (6 PM)', 'No quiet hours exist'],
            correctAnswerIndex: 0,
            explanation: 'تبدأ أوقات الهدوء في معظم العقارات السكنية من الساعة 22:00 ليلاً لاحترام نوم الجيران.',
            explanationSv: 'De flesta hyresvärdar kräver tystnad från kl 22:00.',
            explanationEn: 'Most landlords require quiet starting from 22:00.'
          }
        ]
      }
    ]
  },
  {
    id: 'pension-disability',
    iconName: 'Accessibility',
    title: 'التقاعد وكبار السن ودعم ذوي الاحتياجات الخاصة',
    titleSv: 'Pension, äldreomsorg och stöd till funktionsnedsatta',
    titleEn: 'Pension, Elderly Care & Disability Support',
    description: 'أنواع المعاشات التقاعدية (Allmän pension / Tjänstepension)، رعاية كبار السن، ودعم LSS لذوي الاحتياجات.',
    descriptionSv: 'Statlig pension, tjänstepension, äldreomsorg och rättigheter enligt LSS.',
    descriptionEn: 'State pension, occupational pension, elderly care, and rights under LSS disability act.',
    badgeTag: 'التقاعد ورعاية المسنين',
    lessons: [
      {
        id: 'lesson-pen-1',
        categoryId: 'pension-disability',
        title: 'نظام التقاعد ودعم ذوي الاحتياجات الخاصة (LSS)',
        titleSv: 'Pensionssystemet och LSS-lagen för funktionsnedsatta',
        titleEn: 'The Pension System & LSS Law for Disability Support',
        readingTimeMinutes: 6,
        summary: 'يتكون التقاعد من التقاعد الحكومي، والمهني، والضمان الاجتماعي. قانون LSS يضمن رعاية ومساعداً شخصياً لذوي الاحتياجات الخاصة.',
        summarySv: 'Pensionen består av tre delar. LSS-lagen ger rätt till personlig assistans för funktionsnedsatta.',
        summaryEn: 'Pension has three pillars. The LSS Act guarantees personal assistance for people with severe disabilities.',
        fullContent: `الضمان الاجتماعي في السويد يحيط كبار السن والأشخاص ذوي الإعاقة برعاية متكاملة.

1. أركان نظام التقاعد (Pensionssystemet):
• التقاعد العام الحكومي (Allmän pension): تُدفعه مصلحة التقاعد بناءً على سنوات عملك والضرائب المدفوعة.
• تقاعد الضمان الأدنى (Garantipension): ضمان مالي حكومي لمن عاش في السويد لكن دخل عمله كان منخفضاً أو معدوماً.
• تقاعد المهنة (Tjänstepension): مبالغ إضافية يدفعها رب العمل بموجب الاتفاقيات الجماعية وتفرّق كثيراً في قيمة راتبك التقاعدي النهائي.

2. قانون حماية ورعاية ذوي الاحتياجات الخاصة (LSS):
قانون سويدي خاص يضمن للأفراد ذوي الإعاقات الشديدة أو الدائمة الحصول على:
• مساعد شخصي (Personlig assistent) لمساعدتهم في الحياة اليومية والعمل والدراسة.
• سكن ملاءم ومكيف ووسائل نقل خاصة ميسرة (Färdtjänst).`,
        fullContentSv: `Pensionsmyndigheten hanterar din statliga pension. LSS ger rätt till personlig assistans.`,
        fullContentEn: `The Pensions Agency handles your national pension. LSS guarantees right to personal assistance.`,
        practicalExamples: [
          'يمكنك الاطلاع على تقدير راتبك التقاعدي المستقبلي عبر تسجيل الدخول بموقع minpension.se إلكترونياً.',
          'البلدية تقدم خيارات رعاية كبار السن في المنازل (Hemtjänst) لتقديم وجبات الطعام والمساعدة الطبية.'
        ],
        practicalExamplesSv: [
          'Logga in på minpension.se för prognos.',
          'Kommunal hemtjänst hjälper äldre i hemmet.'
        ],
        practicalExamplesEn: [
          'Log in to minpension.se for pension forecasts.',
          'Municipal home care helps elderly residents at home.'
        ],
        officialSource: 'Pensionsmyndigheten & Socialstyrelsen',
        officialUrl: 'https://www.pensionsmyndigheten.se',
        lastVerifiedDate: '2026-02-20',
        quiz: [
          {
            id: 'q-pen-1',
            question: 'ما هو القانون السويدي الشهير الذي يضمن حماية ومساعداً شخصياً للأفراد ذوي الاحتياجات والإعاقات الشديدة؟',
            questionSv: 'Vilken lag ger rätt till personlig assistans för personer med omfattande funktionsnedsättning?',
            questionEn: 'Which law guarantees the right to personal assistance for people with severe disabilities?',
            options: ['قانون LSS', 'قانون الإيجارات', 'قانون الضرائب', 'قانون المرور'],
            optionsSv: ['LSS-lagen', 'Hyreslagen', 'Skattelagen', 'Trafikförordningen'],
            optionsEn: ['LSS Act', 'Rent Act', 'Tax Act', 'Traffic Code'],
            correctAnswerIndex: 0,
            explanation: 'قانون LSS هو تشريع سويدي رائد يضمن دمج ودعم ذوي الإعاقات الشديدة وتوفير المساعد الشخصي.',
            explanationSv: 'LSS ger rätt till särskilt stöd och personlig assistans.',
            explanationEn: 'LSS grants the right to special support and personal assistance.'
          }
        ]
      }
    ]
  }
];
