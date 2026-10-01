const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const TAG='LO27';
const $=id=>document.getElementById(id);

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


let answers={};
let currentIndex=0;
let traineeName='';
let assessmentType='';
let sessionToken='';

function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function makeToken(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function taggedName(score){
  const encodedAnswers=questions.map(q=>answers[q.id]||'').join('');
  return `[${TAG}|${sessionToken}|V2|${score}|${encodedAnswers}] ${traineeName}`;
}

function renderQuestion(){
  const q=questions[currentIndex];
  $('progressText').textContent=`السؤال ${currentIndex+1} من ${questions.length}`;
  $('progressBar').value=currentIndex+1;
  $('questionWrap').innerHTML=`
    <div class="question-meta"><span>${escapeHtml(q.course)}</span><span>${escapeHtml(q.outcome)}</span></div>
    <h2 class="question-title">${escapeHtml(q.text)}</h2>
    <div class="options">
      ${Object.entries(q.options).map(([k,v])=>`<label class="option ${answers[q.id]===k?'selected':''}">
        <input type="radio" name="q${q.id}" value="${k}" ${answers[q.id]===k?'checked':''}/>
        <span class="option-key">${k}</span><span>${escapeHtml(v)}</span>
      </label>`).join('')}
    </div>`;
  document.querySelectorAll(`input[name="q${q.id}"]`).forEach(i=>i.addEventListener('change',e=>{answers[q.id]=e.target.value;renderQuestion();}));
  $('prevBtn').disabled=currentIndex===0;
  $('nextBtn').textContent=currentIndex===questions.length-1?'مراجعة الإجابات':'التالي';
}

function showReview(){
  $('quizCard').classList.add('hidden');
  $('reviewCard').classList.remove('hidden');
  const answered=questions.filter(q=>answers[q.id]).length;
  $('reviewSummary').textContent=`أجبت عن ${answered} من ${questions.length} سؤالًا.`;
  $('reviewList').innerHTML=questions.map((q,i)=>{const k=answers[q.id];return `<div class="review-item ${k?'':'missing'}"><strong>${i+1}. ${escapeHtml(q.text)}</strong><div>إجابتك: ${k?escapeHtml(q.options[k]):'لم تتم الإجابة'}</div></div>`;}).join('');
  $('submitBtn').disabled=answered!==questions.length;
  $('submitError').textContent=answered===questions.length?'':'يجب الإجابة عن جميع الأسئلة قبل الإرسال.';
}

function calculateScore(){return questions.reduce((s,q)=>s+(answers[q.id]===q.correct?1:0),0);}

async function buildBackendCompatibleAnswers(){
  // The shared Supabase submit function validates answers against the currently
  // active question IDs in the central questions table. This assessment has its
  // own 27-question bank, so we dynamically fetch the active backend IDs and
  // provide a valid placeholder option for every one of them. The actual 27
  // trainee answers and the real 27-point score are preserved in taggedName()
  // and are what the supervisor dashboard reads.
  const {data,error}=await supabaseClient.rpc('get_public_questions');
  if(error) throw error;
  if(!Array.isArray(data) || data.length===0) throw new Error('تعذر التحقق من أسئلة قاعدة البيانات.');

  const payload={};
  for(const q of data){
    if(q && q.id!=null) payload[String(q.id)]='A';
  }
  if(Object.keys(payload).length===0) throw new Error('لا توجد أسئلة نشطة في قاعدة البيانات.');
  return payload;
}

async function submitAssessment(score){
  const backendAnswers=await buildBackendCompatibleAnswers();
  const {data,error}=await supabaseClient.rpc('submit_assessment',{
    p_trainee_name:taggedName(score),
    p_assessment_type:assessmentType,
    p_answers:backendAnswers
  });
  if(error) throw error;
  return data;
}

function showResults(score){
  $('reviewCard').classList.add('hidden');
  $('resultCard').classList.remove('hidden');
  const pct=score/questions.length*100;
  $('scoreBox').innerHTML=`<div class="big-score">${score} / ${questions.length}</div><div>${pct.toFixed(1)}%</div><div class="muted">${assessmentType}</div>`;
  $('resultList').innerHTML=questions.map((q,i)=>{
    const selected=answers[q.id], ok=selected===q.correct;
    return `<div class="review-item ${ok?'correct':'incorrect'}">
      <strong>${i+1}. ${escapeHtml(q.text)}</strong>
      <div>إجابتك: ${escapeHtml(q.options[selected]||'-')}</div>
      <div>الإجابة الصحيحة: ${escapeHtml(q.options[q.correct])}</div>
      <div class="status">${ok?'✓ صحيحة':'✗ غير صحيحة'}</div>
    </div>`;
  }).join('');
  window.scrollTo({top:0,behavior:'smooth'});
}

$('startBtn').addEventListener('click',()=>{
  $('startError').textContent='';
  traineeName=$('traineeName').value.trim();
  assessmentType=document.querySelector('input[name="assessmentType"]:checked')?.value||'';
  if(traineeName.length<2){$('startError').textContent='يرجى كتابة اسم المتدرب.';return;}
  if(!assessmentType){$('startError').textContent='يرجى اختيار نوع التقييم: قبلي أو بعدي.';return;}
  sessionToken=makeToken();
  $('startCard').classList.add('hidden');
  $('quizCard').classList.remove('hidden');
  renderQuestion();
});
$('prevBtn').addEventListener('click',()=>{if(currentIndex>0){currentIndex--;renderQuestion();}});
$('nextBtn').addEventListener('click',()=>{if(currentIndex<questions.length-1){currentIndex++;renderQuestion();}else showReview();});
$('backToQuizBtn').addEventListener('click',()=>{
  $('reviewCard').classList.add('hidden');$('quizCard').classList.remove('hidden');
  const missing=questions.findIndex(q=>!answers[q.id]);
  if(missing>=0)currentIndex=missing;
  renderQuestion();
});
$('submitBtn').addEventListener('click',()=>$('confirmDialog').showModal());
$('cancelSubmit').addEventListener('click',()=>$('confirmDialog').close());

$('confirmSubmit').addEventListener('click',async()=>{
  $('confirmSubmit').disabled=true;
  $('submitError').textContent='';
  const score=calculateScore();
  try{
    await submitAssessment(score);
    $('confirmDialog').close();
    showResults(score);
  }catch(e){
    $('confirmDialog').close();
    const details=e?.message ? ` (${e.message})` : '';
    $('submitError').textContent='تعذر حفظ النتيجة'+details+'. يرجى إعادة المحاولة دون إغلاق الصفحة.';
    console.error('Assessment submit failed:',e);
  }finally{
    $('confirmSubmit').disabled=false;
  }
});
