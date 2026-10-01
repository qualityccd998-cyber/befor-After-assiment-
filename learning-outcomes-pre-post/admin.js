const supabaseClient=supabase.createClient(window.SUPABASE_URL,window.SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id);
const TAG='LO27';

const questions = [
{id:1,course:'إجراءات أعمال السلامة الميدانية',outcome:'تطبيق متطلبات وإجراءات السلامة الميدانية',text:'أثناء جولة سلامة في أحد المواقع بالمشاعر المقدسة لوحظ سقوط أحد أعمدة الكهرباء نتيجة الرياح ووجود أشخاص بالقرب منه، فما الإجراء الأكثر سلامة؟',correct:'B',options:{A:'السماح بالمرور مع التنبيه الشفهي',B:'إبعاد الأشخاص عن منطقة الخطر ومنع الاقتراب منها حتى معالجة الحالة',C:'تصوير الموقع ثم استكمال الجولة',D:'نقل العمود يدويًا بعيدًا عن المسار'}},
{id:2,course:'إجراءات أعمال السلامة الميدانية',outcome:'تنفيذ إجراءات العمل والتعامل المهني مع الجمهور',text:'راجع أحد المستفيدين مركز السلامة للاستفسار عن معاملة، فما التصرف الأكثر توافقًا مع أسلوب الاستقبال الجيد؟',correct:'C',options:{A:'توجيهه للانتظار دون توضيح',B:'الاكتفاء بإعطائه رقم الجهة المختصة',C:'الترحيب به والتعريف بالإجراء وإنهاء معاملته بالسرعة الممكنة',D:'مطالبته بالعودة في وقت آخر'}},
{id:3,course:'إجراءات أعمال السلامة الميدانية',outcome:'تنظيم أعمال الدوريات والتفتيش والمتابعة الميدانية',text:'أي مما يلي يعد مثالًا مباشرًا على التخطيط التنفيذي لأعمال السلامة؟',correct:'A',options:{A:'إعداد جدول أعمال دوريات السلامة والمهام اليومية',B:'تحديد الرؤية المستقبلية للجهة لخمس سنوات',C:'إعداد الهيكل التنظيمي للمديرية',D:'تحديد السياسة العامة للدفاع المدني'}},

{id:4,course:'السلامة والصحة المهنية',outcome:'تفسير مبادئ السلامة والصحة المهنية والمسؤولية الشخصية',text:'أي عبارة تعبر بصورة أدق عن مبدأ المسؤولية الشخصية في السلامة المهنية؟',correct:'B',options:{A:'السلامة مسؤولية مختص السلامة فقط',B:'العامل مسؤول عن سلامته والالتزام بالتعليمات ومعدات الوقاية أثناء أداء العمل',C:'مسؤولية السلامة تبدأ بعد وقوع الحادث',D:'معدات الوقاية اختيارية عند توفر الخبرة'}},
{id:5,course:'السلامة والصحة المهنية',outcome:'تحليل مخاطر بيئة العمل وتقييمها',text:'بعد تحديد مصدر خطر في موقع العمل وتحديد الأشخاص الذين قد يتأثرون به، ما الخطوة التالية في إدارة المخاطر؟',correct:'B',options:{A:'تجاهل الخطر إذا لم يقع حادث',B:'تقييم مستوى الخطر',C:'شراء معدات جديدة مباشرة',D:'إيقاف النشاط نهائيًا في جميع الحالات'}},
{id:6,course:'السلامة والصحة المهنية',outcome:'تطبيق اشتراطات السلامة ومعدات الوقاية الشخصية',text:'قبل مباشرة مهمة ميدانية تتضمن مخاطر متوقعة، ما الإجراء الصحيح؟',correct:'B',options:{A:'الاعتماد على الخبرة السابقة دون تجهيزات',B:'استخدام معدات الوقاية الشخصية المناسبة لطبيعة المهمة',C:'استخدام أي معدات متوفرة بغض النظر عن نوع الخطر',D:'ارتداء معدات الوقاية فقط بعد ظهور الخطر'}},

{id:7,course:'الثقافة الأمنية',outcome:'تطبيق مبادئ الأمن الذاتي والأمن الفكري والوقاية من المهددات',text:'أي ممارسة تعد من إجراءات تعزيز الأمن الذاتي لرجل الأمن؟',correct:'C',options:{A:'الإفصاح عن طبيعة عمله لكل من يسأله',B:'اتباع نمط حركة ثابت يوميًا',C:'المحافظة على سرية المعلومات وتغيير الأنماط الحركية عند الحاجة',D:'نشر موقعه ومهامه في وسائل التواصل'}},
{id:8,course:'الثقافة الأمنية',outcome:'تحليل متطلبات حماية المنشآت والمعلومات والوثائق',text:'ما الغرض الأساسي من إجراء الفحص الأمني للمنشأة؟',correct:'B',options:{A:'قياس رضا العاملين',B:'الكشف عن أوجه القصور والثغرات الأمنية ووضع الحلول المناسبة لها',C:'إعداد جدول الدوام',D:'حصر الممتلكات فقط'}},
{id:9,course:'الثقافة الأمنية',outcome:'تفسير مفاهيم الأمن الوطني والحس الأمني',text:'لاحظ رجل أمن تحركات غير معتادة ومتكررة بالقرب من منشأة حساسة، فما التصرف الذي يعكس الحس الأمني؟',correct:'B',options:{A:'تجاهلها لعدم وقوع حادث',B:'مراقبة المؤشرات والإبلاغ عنها للجهة المختصة وفق الإجراءات',C:'نشر الملاحظة للعامة',D:'مواجهة الأشخاص دون اتباع الإجراءات'}},

{id:10,course:'التربية البدنية',outcome:'تفسير مبادئ الإعداد البدني وعلاقتها بالكفاءة المهنية',text:'ما العلاقة الأساسية بين الإعداد البدني والكفاءة المهنية لرجل الأمن؟',correct:'B',options:{A:'الإعداد البدني يقتصر على المظهر العام',B:'تطوير القدرات البدنية والحركية يساعد رجل الأمن على أداء واجباته المهنية بكفاءة',C:'اللياقة البدنية غير مرتبطة بالأعمال الميدانية',D:'الإعداد البدني مطلوب في فترة التدريب فقط'}},
{id:11,course:'التربية البدنية',outcome:'تطبيق برامج وطرق تدريب الإعداد البدني',text:'إذا كان الهدف من الوحدة التدريبية تطوير التحمل الهوائي، فأي نشاط يعد أكثر ملاءمة؟',correct:'A',options:{A:'الجري لمسافة مناسبة بإيقاع تدريبي منظم',B:'تمارين مرونة قصيرة فقط',C:'تمرين واحد للقوة القصوى',D:'الجلوس والاستشفاء طوال الوحدة'}},
{id:12,course:'التربية البدنية',outcome:'تقويم عناصر اللياقة البدنية',text:'ما الأسلوب الأفضل للتحقق من مقدار التحسن في عنصر من عناصر اللياقة البدنية؟',correct:'B',options:{A:'الاعتماد على الانطباع الشخصي',B:'تطبيق اختبار بدني مقنن ومقارنة النتائج وفق معيار موحد',C:'سؤال المتدرب عن شعوره فقط',D:'الاكتفاء بعدد أيام التدريب'}},

{id:13,course:'قراءة مخططات السلامة',outcome:'تصنيف المنشآت واستنتاج متطلبات السلامة',text:'عند البدء بمراجعة مخطط سلامة لمنشأة، ما المعلومات الأساسية التي تساعد على تحديد متطلبات السلامة المطلوبة؟',correct:'B',options:{A:'لون المبنى فقط',B:'نوع الإشغال ودرجة الخطورة',C:'اسم المقاول فقط',D:'عمر صاحب المنشأة'}},
{id:14,course:'قراءة مخططات السلامة',outcome:'تفسير الرموز ومفاتيح الرسم والأبعاد ومقاييس الرسم',text:'ما الذي يمكّن مدقق المخطط من التمييز بين العناصر المعمارية والميكانيكية والكهربائية في مخطط السلامة؟',correct:'A',options:{A:'مفاتيح ورموز الرسم المستخدمة',B:'لون غلاف المخطط',C:'تاريخ طباعة المخطط فقط',D:'عدد صفحات المخطط'}},
{id:15,course:'قراءة مخططات السلامة',outcome:'التحقق من مطابقة المخططات للواقع الميداني',text:'أثناء الاستلام الميداني تبين أن أحد عناصر السلامة المنفذة يختلف عن المخطط المعتمد، فما الإجراء الصحيح؟',correct:'B',options:{A:'اعتماد الوضع القائم دون مراجعة',B:'مقارنة التنفيذ بالمخطط المعتمد وتوثيق أوجه الاختلاف والقصور',C:'تعديل المخطط شفهيًا',D:'تجاهل الاختلاف إذا كان المبنى مكتملًا'}},

{id:16,course:'أنظمة الوقاية والحماية من الحريق',outcome:'تحديد متطلبات وسائل الهروب ومخارج الطوارئ',text:'في مبنى مكون من أربعة طوابق أو أكثر، ما الحد الأدنى الوارد في المقرر لمقاومة جدران مخارج الطوارئ للحريق؟',correct:'C',options:{A:'30 دقيقة',B:'ساعة واحدة',C:'ساعتان',D:'أربع ساعات'}},
{id:17,course:'أنظمة الوقاية والحماية من الحريق',outcome:'تمييز مكونات وأنواع أنظمة كشف وإنذار الحريق',text:'أي نظام إنذار يستطيع تحديد الكاشف الذي أرسل إشارة الحريق وموقعه بصورة محددة؟',correct:'B',options:{A:'النظام التقليدي Conventional',B:'النظام المعنون Addressable',C:'جرس الإنذار اليدوي فقط',D:'إنارة الطوارئ'}},
{id:18,course:'أنظمة الوقاية والحماية من الحريق',outcome:'تفسير متطلبات أنظمة الإطفاء ومضخات الحريق',text:'ما وظيفة مضخة الجوكي Jockey Pump في شبكة مكافحة الحريق؟',correct:'B',options:{A:'تشغيل نظام الإخلاء الصوتي',B:'تعويض الفقد البسيط في ضغط الشبكة الناتج عن التسرب',C:'استبدال مضخة الديزل بالكامل',D:'كشف الدخان داخل المبنى'}},

{id:19,course:'المفاهيم الأساسية لتحليل المخاطر',outcome:'تطبيق الخطوات المنهجية لتحليل المخاطر',text:'بعد وصف النظام المراد تحليله وتحديد نطاق الدراسة، ما الخطوة الأساسية التالية؟',correct:'A',options:{A:'تحديد الأخطار المحتملة',B:'قبول المخاطرة مباشرة',C:'شراء معدات الوقاية',D:'إغلاق الموقع نهائيًا'}},
{id:20,course:'المفاهيم الأساسية لتحليل المخاطر',outcome:'حساب مستوى الخطورة باستخدام مصفوفة المخاطر',text:'إذا كانت احتمالية وقوع الخطر = 5 وشدة أثره = 5، فما درجة الخطورة في المصفوفة الخماسية؟',correct:'D',options:{A:'5',B:'10',C:'15',D:'25'}},
{id:21,course:'المفاهيم الأساسية لتحليل المخاطر',outcome:'اختيار وسائل التحكم والسيطرة المناسبة',text:'إذا أمكن التخلص نهائيًا من مصدر خطر في موقع العمل، فما الإجراء الذي ينبغي تفضيله؟',correct:'B',options:{A:'الاكتفاء بمعدات الوقاية الشخصية',B:'إزالة مصدر الخطر',C:'وضع لوحة تحذيرية فقط',D:'تقليل وقت العمل دون معالجة المصدر'}},

{id:22,course:'الكشف والتفتيش وضبط المخالفات',outcome:'تطبيق إجراءات الكشف والتفتيش وفق اللوائح',text:'قبل البدء في التفتيش على منشأة، ما الإجراء الذي نصت عليه إجراءات التفتيش؟',correct:'B',options:{A:'إصدار مخالفة مسبقًا',B:'الاطلاع على سجل السلامة ومكافحة الحريق ومراجعة بياناته',C:'إخلاء المنشأة مباشرة',D:'تصوير جميع العاملين'}},
{id:23,course:'الكشف والتفتيش وضبط المخالفات',outcome:'التحقق من استيفاء متطلبات السلامة باستخدام النماذج',text:'لماذا يستخدم مفتش السلامة نموذج كشف معتمد أثناء تفتيش المنشأة؟',correct:'A',options:{A:'لتوحيد التحقق من المتطلبات وتوثيق نتائج الكشف بصورة منظمة',B:'لتقليل عدد عناصر التفتيش',C:'للاستغناء عن المعاينة الميدانية',D:'لتسجيل بيانات المفتش فقط'}},
{id:24,course:'الكشف والتفتيش وضبط المخالفات',outcome:'توثيق نتائج التفتيش وتصنيف المخالفات',text:'ضبط المفتش مخالفة تنطوي على درجة عالية من الخطورة وتهدد الأرواح والممتلكات، فما الإجراء المناسب؟',correct:'B',options:{A:'الاكتفاء بتنبيه شفهي',B:'إثبات المخالفة في المحضر وسجل السلامة واتخاذ الإجراء النظامي المناسب لخطورتها',C:'تأجيل توثيقها للزيارة التالية',D:'تجاهلها إذا كانت المخالفة لأول مرة'}},

{id:25,course:'مبادئ السلامة والحماية ومبادئ الكود السعودي',outcome:'تفسير مبادئ وأهداف الوقاية والمرجعيات القانونية',text:'ما المرجع الرئيس الذي يستند إليه حاليًا في تطبيق متطلبات الحماية من الحريق في المباني بالمملكة وفق المقرر؟',correct:'B',options:{A:'تعليمات كل منشأة منفردة',B:'كود البناء السعودي ومتطلبات الحماية من الحريق ذات العلاقة',C:'تعليمات شركات التأمين فقط',D:'دليل الصيانة الخاص بالمبنى'}},
{id:26,course:'مبادئ السلامة والحماية ومبادئ الكود السعودي',outcome:'تحديد متطلبات SBC 201 وSBC 801 وفق حالة المنشأة',text:'منشأة قائمة سيجرى عليها توسعة وتغيير في الاستخدام، فما الإجراء الصحيح وفق ما ورد في المقرر؟',correct:'B',options:{A:'لا تطبق عليها متطلبات الكود لأنها منشأة قائمة',B:'تطبق متطلبات كود البناء السعودي ذات العلاقة على الحالة الجديدة',C:'يكتفى بمتطلبات وقت إنشاء المبنى',D:'يترك تطبيق المتطلبات لرغبة المالك'}},
{id:27,course:'مبادئ السلامة والحماية ومبادئ الكود السعودي',outcome:'تطبيق متطلبات الكود واللوائح عند الكشف والمراقبة',text:'أثناء الكشف على منشأة جديدة لاحظ المفتش عدم تنفيذ أحد متطلبات نظام الوقاية والحماية من الحريق، فما الإجراء الذي يتفق مع مهام مراقبة تطبيق الكود؟',correct:'A',options:{A:'توثيق عدم الالتزام وضبطه وفق متطلبات الكود والإجراءات المعتمدة',B:'اعتماد المنشأة دون ملاحظة',C:'الاكتفاء بإبلاغ المالك شفهيًا دون توثيق',D:'تأجيل الملاحظة حتى وقوع حادث'}}
];

const questionMap=new Map(questions.map(q=>[q.id,q]));
let sessions=[];
let currentFilter='all';

function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function parseTagged(name){
  const m=String(name||'').match(/^\[LO27\|([^|]+)\|([AB])\|(\d+)\]\s*(.*)$/);
  return m?{token:m[1],part:m[2],score:Number(m[3]),name:m[4]}:null;
}
async function ensureAdmin(){
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(!session)return false;
  const {data,error}=await supabaseClient.from('admin_users').select('user_id').eq('user_id',session.user.id).maybeSingle();
  return !error&&!!data;
}

function calculateAverage(items){return items.length?items.reduce((s,x)=>s+x.percentage,0)/items.length:0;}
function filteredSessions(){
  if(currentFilter==='قبلي')return sessions.filter(s=>s.assessment_type==='قبلي');
  if(currentFilter==='بعدي')return sessions.filter(s=>s.assessment_type==='بعدي');
  return sessions;
}
function updateStats(){
  $('statAttempts').textContent=sessions.length;
  $('statPre').textContent=sessions.filter(s=>s.assessment_type==='قبلي').length;
  $('statPost').textContent=sessions.filter(s=>s.assessment_type==='بعدي').length;
  $('filterAllCount').textContent=sessions.length;
  $('filterPreCount').textContent=sessions.filter(s=>s.assessment_type==='قبلي').length;
  $('filterPostCount').textContent=sessions.filter(s=>s.assessment_type==='بعدي').length;
}
function updateFilterUi(){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active',b.dataset.filter===currentFilter));
  const visible=filteredSessions();
  const avg=calculateAverage(visible);
  $('statAverage').textContent=`${avg.toFixed(1)}%`;
  if(currentFilter==='قبلي'){
    $('statAverageLabel').textContent='متوسط التقييم القبلي';
    $('resultsTitle').textContent='نتائج التقييم القبلي';
    $('filterSummary').textContent=`تم فرز ${visible.length} نتيجة قبلية`;
  }else if(currentFilter==='بعدي'){
    $('statAverageLabel').textContent='متوسط التقييم البعدي';
    $('resultsTitle').textContent='نتائج التقييم البعدي';
    $('filterSummary').textContent=`تم فرز ${visible.length} نتيجة بعدية`;
  }else{
    $('statAverageLabel').textContent='المتوسط العام';
    $('resultsTitle').textContent='جميع النتائج';
    $('filterSummary').textContent=`عرض جميع النتائج: ${visible.length}`;
  }
}
function renderRows(){
  const visible=filteredSessions();
  $('attemptRows').innerHTML=visible.map(s=>`<tr>
    <td>${escapeHtml(s.name)}</td>
    <td><span class="type-badge ${s.assessment_type==='قبلي'?'pre':'post'}">${s.assessment_type}</span></td>
    <td>${s.score}/27</td>
    <td>${s.percentage.toFixed(1)}%</td>
    <td>${new Date(s.submitted_at).toLocaleString('ar-SA')}</td>
    <td><button class="secondary small" data-token="${s.token}">عرض</button></td>
  </tr>`).join('')||'<tr><td colspan="6">لا توجد نتائج ضمن هذا الفرز.</td></tr>';
  document.querySelectorAll('[data-token]').forEach(b=>b.addEventListener('click',()=>showDetails(b.dataset.token)));
  updateFilterUi();
}

async function loadDashboard(){
  $('dashboardError').textContent='';
  const {data,error}=await supabaseClient.from('attempts').select('*').order('submitted_at',{ascending:false});
  if(error){$('dashboardError').textContent='تعذر تحميل النتائج.';throw error;}
  const groups=new Map();
  for(const a of (data||[])){
    const t=parseTagged(a.trainee_name);
    if(!t)continue;
    if(!groups.has(t.token))groups.set(t.token,{token:t.token,name:t.name,score:t.score,assessment_type:a.assessment_type,parts:{},submitted_at:a.submitted_at});
    const g=groups.get(t.token);
    g.parts[t.part]=a;
    g.score=t.score;
    if(new Date(a.submitted_at)>new Date(g.submitted_at))g.submitted_at=a.submitted_at;
  }
  sessions=[...groups.values()].filter(g=>g.parts.A&&g.parts.B).map(g=>({...g,percentage:g.score/27*100})).sort((a,b)=>new Date(b.submitted_at)-new Date(a.submitted_at));
  updateStats();
  renderRows();
}

async function showDetails(token){
  const s=sessions.find(x=>x.token===token);
  if(!s)return;
  const ids=[s.parts.A.id,s.parts.B.id];
  const {data,error}=await supabaseClient.from('responses').select('*').in('attempt_id',ids).order('question_id');
  if(error)return alert('تعذر تحميل التفاصيل');
  const partA=new Map((data||[]).filter(r=>r.attempt_id===s.parts.A.id).map(r=>[r.question_id,r.selected_option]));
  const partB=new Map((data||[]).filter(r=>r.attempt_id===s.parts.B.id).map(r=>[r.question_id,r.selected_option]));
  $('detailsTitle').textContent=`تفاصيل ${s.name} - ${s.assessment_type}`;
  $('detailsBody').innerHTML=questions.map((q,i)=>{
    const selected=q.id<=20?partA.get(q.id):partB.get(q.id-20);
    const ok=selected===q.correct;
    return `<div class="review-item ${ok?'correct':'incorrect'}">
      <div class="question-meta"><span>${escapeHtml(q.course)}</span><span>${escapeHtml(q.outcome)}</span></div>
      <strong>${i+1}. ${escapeHtml(q.text)}</strong>
      <div>إجابة المتدرب: ${escapeHtml(q.options[selected]||'-')}</div>
      <div>الإجابة الصحيحة: ${escapeHtml(q.options[q.correct])}</div>
      <div class="status">${ok?'✓ صحيحة':'✗ غير صحيحة'}</div>
    </div>`;
  }).join('');
  $('detailsDialog').showModal();
}
function setFilter(f){currentFilter=f;renderRows();}

async function showAppState(){
  const isAdmin=await ensureAdmin();
  if(isAdmin){
    $('loginCard').classList.add('hidden');$('dashboard').classList.remove('hidden');
    try{await loadDashboard();}catch(e){console.error(e);}
  }else{
    $('loginCard').classList.remove('hidden');$('dashboard').classList.add('hidden');
  }
}
$('loginBtn').addEventListener('click',async()=>{
  $('loginError').textContent='';
  const email=$('adminEmail').value.trim(),password=$('adminPassword').value;
  const {error}=await supabaseClient.auth.signInWithPassword({email,password});
  if(error){$('loginError').textContent='بيانات الدخول غير صحيحة.';return;}
  if(!(await ensureAdmin())){await supabaseClient.auth.signOut();$('loginError').textContent='هذا الحساب غير مخول كمشرف.';return;}
  showAppState();
});
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
$('refreshBtn').addEventListener('click',loadDashboard);
$('logoutBtn').addEventListener('click',async()=>{await supabaseClient.auth.signOut();showAppState();});
$('closeDetails').addEventListener('click',()=>$('detailsDialog').close());
supabaseClient.auth.onAuthStateChange(()=>setTimeout(showAppState,0));
showAppState();
setInterval(()=>{if(!$('dashboard').classList.contains('hidden'))loadDashboard();},15000);
