import { CommunityEvent } from '../types';

export const COMMUNITY_EVENTS_DATA: CommunityEvent[] = [
  {
    id: 'evt-001',
    title: 'ندوة توجيهية: فهم تعديلات قانون الإقامة السويدي واللجوء لعام 2026',
    titleSv: 'Seminarium: Nya uppehållstillståndslagar och asylregler 2026',
    titleEn: 'Seminar: Sweden Residence Permit & Asylum Law Updates 2026',
    category: 'legal',
    date: '2026-08-02',
    time: '18:00 - 20:00 (بتوقيت السويد)',
    locationType: 'online',
    city: 'عبر الإنترنت (Zoom)',
    venueName: 'بث مباشر تفاعلي عبر الإنترنت',
    organizer: 'منصة العرب في السويد - إشراف رائد شهاب بالتعاون مع حقوقيين',
    summary: 'شرح مبسط وشامل لأحدث الشروط والتغييرات التنفيذية الصادرة عن مصلحة الهجرة Migrationverket وتأثيرها على المقيمين والجدد.',
    summarySv: 'Genomgång av Migrationsverkets senaste regeländringar och krav för uppehållstillstånd 2026.',
    summaryEn: 'Detailed explanation of Migration Board changes and residence permit requirements in 2026.',
    description: `تناقش هذه الندوة التفاعلية المباشرة كافة القرارات والتعديلات القانونية المتعلقة بقوانين الهجرة والإقامة الدائمة وشروط الدخل واللغة والتكامل المجتمعي.
    
    أبرز محاور الندوة:
    • التعديلات الجديدة على متطلبات الدخل والإقامة الدائمة 2026.
    • شروط اختبارات اللغة والثقافة السويدية للمتقدمين للجنسية والإقامة.
    • إجابات مباشرة على أسئلة الحاضرين واستفسارات الحالات الخاصة.
    • نصائح قانونية لتفادي التأخير والأخطاء في الطلبات.`,
    descriptionSv: 'Vi går igenom Migrationsverkets regeländringar kring försörjningskrav, permanent uppehållstillstånd och medborgarskapsprov.',
    descriptionEn: 'We cover Migration Agency policy updates regarding maintenance requirements, permanent residency, and citizenship tests.',
    isFree: true,
    spotsLeft: 45,
    meetingUrl: 'https://zoom.us/j/sweden-legal-seminar-2026',
    targetAudience: 'جميع المقيمين والقادمين الجدد في السويد والمهتمين بالشؤون القانونية',
    tags: ['الهجرة', 'الإقامة الدائمة', 'الجنسية', 'قوانين 2026'],
  },
  {
    id: 'evt-002',
    title: 'ورشة عمل: كيفية تحضير السيرة الذاتية (CV) للشركات السويدية واجتياز المقابلة',
    titleSv: 'Workshop: Skriva CV och lyckas på jobbintervjun i Sverige',
    titleEn: 'Workshop: Writing a Swedish CV and Acing the Job Interview',
    category: 'workshop',
    date: '2026-08-08',
    time: '17:00 - 19:30',
    locationType: 'hybrid',
    city: 'Stockholm',
    venueName: 'مكتبة ستوكهولم العامة (Stockholms stadsbibliotek) + بث مباشر',
    organizer: 'مكتب العمل Arbetsförmedlingen بالتعاون مع خبراء توظيف عرب وسويديين',
    summary: 'تعلم المعايير السويدية في كتابة Personligt brev و السيرة الذاتية والطريقة الصحيحة للوصول إلى الوظائف غير المعلنة.',
    summarySv: 'Lär dig svenska normer för CV, personligt brev och nätverkande för att få jobb snabbare.',
    summaryEn: 'Learn Swedish workplace standards for CV, cover letter, and networking to land your job.',
    description: `تعتبر كتابة السيرة الذاتية بالطريقة السويدية خطوة محورية للحصول على المقابلة الأولى. في هذه الورشة العملية ستتعلم:
    • الفرق بين السيرة الذاتية العربية والسويدية والتنسيق المطلوب.
    • كيفية استخدام منصة Arbetsförmedlingen و LinkedIn للوصول لمسؤولي التوظيف.
    • أهم الأسئلة المتكررة في المقابلات الشخصية وكيفية الإجابة عليها باحترافية.
    • مراجعة فورية ومباشرة لنموذج سيرة ذاتية لأحد الحاضرين.`,
    descriptionSv: 'Informativ workshop om hur du anpassar ditt CV och Personligt brev efter svenska arbetsgivares förväntningar.',
    descriptionEn: 'Practical session on tailoring your resume and cover letter for Swedish recruiters.',
    isFree: true,
    spotsLeft: 20,
    meetingUrl: 'https://teams.microsoft.com/jobs-sweden-2026',
    targetAudience: 'الخريجون، الباحثون عن عمل، والراغبون في تعديل مسارهم المهني في السويد',
    tags: ['العمل', 'مكتب العمل', 'CV', 'مقابلة عمل'],
  },
  {
    id: 'evt-003',
    title: 'لقاء توجييي: التقديم على المساعدات والسكن عبر مصلحة التأمينات الاجتماعيه والسوسيال',
    titleSv: 'Informationsmöte: Bostadsbidrag och Försäkringskassan i praktiken',
    titleEn: 'Orientation: Housing Allowances & Social Benefits Guide',
    category: 'orientation',
    date: '2026-08-14',
    time: '18:30 - 20:00',
    locationType: 'online',
    city: 'عبر الإنترنت (Zoom)',
    venueName: 'غرفة الاجتماعات الافتراضية - التوجيه المجتمعي',
    organizer: 'منصة دليل التوجيه المجتمعي + ممثلو البلديات',
    summary: 'شرح لآلية حساب مقتطعات السكن (Bostadsbidrag) ومساعدات الأطفال ورعاية الوالدين وكيفية التقديم الإلكتروني.',
    summarySv: 'Information om hur du ansöker om bostadsbidrag och föräldrapenning hos Försäkringskassan.',
    summaryEn: 'Step-by-step guidance on applying for housing allowances and parental support in Sweden.',
    description: `تهدف هذه الجلسة إلى توضيح كافة حقوق وواجبات العائلات لدى مصلحة التأمينات الاجتماعية (Försäkringskassan) والشؤون الاجتماعية (Socialtjänsten).
    
    المحاور الأساسية:
    • شروط ومعايير استحقاق دعم السكن للأسر والشباب (Bostadsbidrag).
    • تعويضات إجازة الوالدين (Föräldrapenning) وتوزيع الأيام بين الوالدين.
    • كيفية تجنب دفع المبالغ المستردة وأخطاء الإفصاح عن الدخل.
    • خطوات التواصل السليم مع المرشد الاجتماعي بالبلدية.`,
    descriptionSv: 'Genomgång av Försäkringskassans tjänster och viktig information om bostadsbidrag och föräldraförsäkring.',
    descriptionEn: 'Clear overview of social security system benefits, eligibility criteria, and correct application process.',
    isFree: true,
    spotsLeft: 60,
    meetingUrl: 'https://zoom.us/j/sweden-social-benefits-2026',
    targetAudience: 'الأسر، العائلات مع أطفال، والمقيمون الجدد في البلديات السويدية',
    tags: ['السوسيال', 'التأمينات الاجتماعية', 'دعم السكن', 'البلدية'],
  },
  {
    id: 'evt-004',
    title: 'يوم العائلة والاندماج: أنشطة ثقافية وتعليمية للأطفال والشباب في يوتوبوري',
    titleSv: 'Familjedag och Integration: Kulturella aktiviteter för barn i Göteborg',
    titleEn: 'Family & Integration Day: Educational Activities in Gothenburg',
    category: 'family',
    date: '2026-08-22',
    time: '11:00 - 16:00',
    locationType: 'in_person',
    city: 'Göteborg',
    venueName: 'مركز الفعاليات الثقافية (Angered Kulturhus)',
    organizer: 'بلدية يوتوبوري (Göteborgs Stad) والجمعيات المحلية',
    summary: 'فعالية حضورية مفتوحة للعائلات تتضمن مسابقات تعليمية باللغتين العربية والسويدية، ورش رسم، ومعرض كتاب.',
    summarySv: 'Kulturdag med sagostunder på svenska och arabiska, pyssel och information om fritidsaktiviteter.',
    summaryEn: 'Open family event with storytimes, crafts, and guidance on sports and youth activities in Gothenburg.',
    description: `يوم حافل بالأنشطة العائلية الممتعة الموجهة لتعزيز الاندماج الثقافي والاجتماعي بين الأطفال والأهالي في مدينة يوتوبوري.
    
    برنامج الفعالية:
    • قراءة قصص للأطفال باللغتين السويدية والعربية مع توزيع هدايا وكتب.
    • زاوية تعريفية بالنوادي الرياضية والأشبال (Föreningsliv) وكيفية تسجيل الأطفال.
    • جلسة حوارية للأهالي حول النظام المدرسي السويدي (Skolan) والمساعدات المدرسية.
    • وجبات خفيفة ومشروبات ضيافة مجانية لجميع الزوار.`,
    descriptionSv: 'Rolig familjedag med fokus på gemenskap, språk och ungdomars fritidsmöjligheter.',
    descriptionEn: 'Engaging community gathering promoting language integration, children sports clubs, and school advice.',
    isFree: true,
    spotsLeft: 120,
    targetAudience: 'العائلات والأطفال والشباب في محافظة فاسترا يوتالاند ويوتوبوري',
    tags: ['عائلة', 'أطفال', 'يوتوبوري', 'ثقافة', 'رياضة'],
  },
  {
    id: 'evt-005',
    title: 'جلسة توجيهية: تقديم الإقرار الضريبي واستخراج السجل التجاري في السويد',
    titleSv: 'Webbinarium: Starta företag och deklarera hos Skatteverket',
    titleEn: 'Webinar: Starting a Business & Tax Filing with Skatteverket',
    category: 'deadline',
    date: '2026-08-28',
    time: '18:00 - 19:30',
    locationType: 'online',
    city: 'عبر الإنترنت (Zoom)',
    venueName: 'المنصة التعليمية الإلكترونية - السويد',
    organizer: 'مصلحة الضرائب Skatteverket + مستشارو تأسيس الشركات',
    summary: 'شرح خطوات إطلاق مشروعك الخاص (Enskild firma / Aktiebolag) وقواعد الضريبة المضافة (Moms) والهوية الضريبية F-skatt.',
    summarySv: 'Lär dig grunderna i att starta enskild näringsverksamhet och hantera skatter.',
    summaryEn: 'Understand sole proprietorship, corporate taxes, F-skatt certification, and VAT reporting.',
    description: `إذا كنت تفكر في تأسيس عملك التجاري في السويد أو تريد فهم التزاماتك الضريبية الشفافية، تقدم هذه الجلسة دليلاً خطوة بخطوة:
    • الفرق بين الشركات الفردية Enskild Firma والشركات المحدودة Aktiebolag.
    • كيفية التقديم على تصريح F-skatt والتسجيل في قيمة المبيعات المضافة Moms.
    • الحسابات والمصروفات الممكن خصمها رسمياً من الأرباح.
    • الإجابة على استفسارات المشاركين حول الفواتير والضرائب الشخصية.`,
    descriptionSv: 'Praktisk guidning för dig som vill starta eget företag eller förstå det svenska skattesystemet.',
    descriptionEn: 'Essential guide for aspiring entrepreneurs wanting to register a business and understand taxes in Sweden.',
    isFree: true,
    spotsLeft: 80,
    meetingUrl: 'https://zoom.us/j/skatteverket-workshop-2026',
    targetAudience: 'أصحاب الأعمال المستقبليين، المستثمرون الجدد، والمهتمون بالنظام الضريبي',
    tags: ['الضرائب', 'تأسيس شركة', 'Skatteverket', 'تجارة'],
  },
  {
    id: 'evt-006',
    title: 'ملتقى مالمو التوجيهي: منصات تعلم السويدية SFI ودورات الترسيخ السريعة',
    titleSv: 'Mässa i Malmö: SFI, yrkesutbildningar och snabbspår',
    titleEn: 'Malmö Education Fair: SFI, Vocational Training & Fast-Tracks',
    category: 'orientation',
    date: '2026-09-05',
    time: '13:00 - 17:00',
    locationType: 'in_person',
    city: 'Malmö',
    venueName: 'مركز مالمو للمعارض المؤتمرات (Malmömässan)',
    organizer: 'بلدية مالمو (Malmö stad) + إدارة التعليم الكبار (Komvux)',
    summary: 'معرض شامل للفرص الدراسية وتخصصات المهن المطلوبة بكثرة في منطقة سكونه وكيفية معادلة الشهادات الأجنبية.',
    summarySv: 'Mötesplats för alla som vill studera SFI, yrkesvux eller validera utländska betyg.',
    summaryEn: 'Exhibition showcasing SFI language tracks, vocational courses, and foreign degree equivalency.',
    description: `يجمع هذا الملتقى المفتوح ممثلين من المدارس المهنية (Yrkeshögskola) وجامعة مالمو ومراكز تعليم الكبار.
    
    أبرز معالم المعرض:
    • استشارات مباشرة لمعادلة الشهادات الجامعية عبر هيئة Universitets- och högskolerådet (UHR).
    • التسجيل المباشر في دورات السويدية التخصصية (SFI للمهندسين والأطباء والمعلمين).
    • لقاءات مع أرباب عمل يبحثون عن متدربين في مجالات الرعاية الصحية، التقنية، والمقاولات.
    • توزيع أدلة تعليمية مطبوعة مجاناً باللغات العربية والسويدية والإنكليزية.`,
    descriptionSv: 'Välkommen till Malmös stora utbildningsmässa med fokus på vuxenutbildning och karriärvägar.',
    descriptionEn: 'Welcome to Malmö\'s comprehensive education fair for adult learning and vocational pathways.',
    isFree: true,
    spotsLeft: 200,
    targetAudience: 'المقيمون في محافظة سكونه ومدينة مالمو والراغبون في متابعة تحصيلهم العلمي والمهني',
    tags: ['مالمو', 'SFI', 'التعليم', 'معادلة الشهادات', 'دراسة'],
  }
];
