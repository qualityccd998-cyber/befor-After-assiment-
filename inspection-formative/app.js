const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const PREFIX = '[تكويني التفتيش] ';

const questions = [
  {id:1,category:'معارف',outcome_code:'ع1',learning_outcome:'أن يفسر المتدرب الأنظمة واللوائح المنظمة لأعمال الكشف والتفتيش وضبط المخالفات.',question_text:'ما المرجع النظامي الذي ينبغي أن يستند إليه مفتش السلامة عند تنفيذ أعمال التفتيش وضبط المخالفات؟',options:{A:'الاجتهاد الشخصي للمفتش',B:'اللوائح والأنظمة والتعليمات المعتمدة',C:'رغبة صاحب المنشأة',D:'التقارير الشفهية فقط'}},
  {id:2,category:'معارف',outcome_code:'ع1',learning_outcome:'أن يفسر المتدرب الأنظمة واللوائح المنظمة لأعمال الكشف والتفتيش وضبط المخالفات.',question_text:'ما الغرض الرئيس من تطبيق قواعد التفتيش والضبط على المنشآت؟',options:{A:'زيادة زمن الجولة',B:'تقليل عدد المفتشين',C:'توحيد إجراءات التفتيش والتحقق من الالتزام بالمتطلبات',D:'الاستغناء عن التقارير'}},
  {id:3,category:'معارف',outcome_code:'ع2',learning_outcome:'أن يوضح المتدرب أهداف الكشف والتفتيش وصفات ومسؤوليات مفتش السلامة.',question_text:'أي مما يلي يمثل أحد أهداف الكشف والتفتيش الواردة في المقرر؟',options:{A:'اكتشاف أوجه القصور والعيوب التي قد تؤثر في سلامة المنشأة',B:'زيادة مساحة المنشأة',C:'تحديد القيمة المالية للمبنى',D:'تحديد عدد العاملين الإداريين'}},
  {id:4,category:'معارف',outcome_code:'ع2',learning_outcome:'أن يوضح المتدرب أهداف الكشف والتفتيش وصفات ومسؤوليات مفتش السلامة.',question_text:'أي صفة تعد أساسية لمفتش السلامة؟',options:{A:'الاعتماد على الآخرين في كتابة التقرير',B:'الاكتفاء بالخبرة دون أنظمة',C:'تجنب استخدام أدوات القياس',D:'الإلمام بلوائح وأنظمة السلامة والقدرة على كتابة التقارير'}},
  {id:5,category:'معارف',outcome_code:'ع2',learning_outcome:'أن يوضح المتدرب أهداف الكشف والتفتيش وصفات ومسؤوليات مفتش السلامة.',question_text:'إذا شاهد المفتش حالة خطرة يمكن أن تسهم في حدوث حريق أو تساعد على انتشاره، فما مسؤوليته؟',options:{A:'تجاهلها إذا لم تكن ضمن سبب الزيارة',B:'تأجيلها إلى الزيارة التالية',C:'توثيقها والإبلاغ عنها وفق الإجراءات',D:'إبلاغ العاملين شفهيًا فقط'}},
  {id:6,category:'مهارات',outcome_code:'هـ1',learning_outcome:'أن يطبق المتدرب إجراءات الاستعداد والتخطيط للجولة التفتيشية وفق منهج منظم.',question_text:'قبل زيارة منشأة سبق تفتيشها، ما الإجراء الأنسب للمفتش؟',options:{A:'البدء بجولة جديدة دون الاطلاع على السابق',B:'مراجعة التقارير السابقة والملاحظات والإجراءات المطلوبة',C:'سؤال صاحب المنشأة فقط',D:'إعداد التقرير قبل الزيارة'}},
  {id:7,category:'مهارات',outcome_code:'هـ1',learning_outcome:'أن يطبق المتدرب إجراءات الاستعداد والتخطيط للجولة التفتيشية وفق منهج منظم.',question_text:'عند وصول المفتش إلى المنشأة، ما التصرف الصحيح قبل بدء الجولة؟',options:{A:'الدخول إلى جميع المواقع مباشرة',B:'طلب إخلاء المبنى',C:'البدء بالتصوير دون إشعار',D:'التعريف بنفسه وطلب مقابلة المسؤول عن المنشأة'}},
  {id:8,category:'مهارات',outcome_code:'هـ1',learning_outcome:'أن يطبق المتدرب إجراءات الاستعداد والتخطيط للجولة التفتيشية وفق منهج منظم.',question_text:'ما الأسلوب الأفضل لتدوين الملاحظات أثناء الجولة؟',options:{A:'الاعتماد على الذاكرة',B:'تسجيل المخالفات الخطرة فقط',C:'استخدام أسلوب منظم يسمح بالرجوع إلى الملاحظات عند إعداد التقرير',D:'تأجيل الكتابة إلى عدة أيام'}},
  {id:9,category:'مهارات',outcome_code:'هـ1',learning_outcome:'أن يطبق المتدرب إجراءات الاستعداد والتخطيط للجولة التفتيشية وفق منهج منظم.',question_text:'أثناء الجولة التفتيشية، ما المنهج الأنسب؟',options:{A:'فحص أجزاء محددة فقط',B:'اتباع مسار منظم وفحص أقسام المنشأة دون إغفال المناطق ذات العلاقة بالسلامة',C:'التركيز على المكاتب الإدارية فقط',D:'الاكتفاء بالمعلومات المقدمة من المسؤول'}},
  {id:10,category:'مهارات',outcome_code:'هـ2',learning_outcome:'أن يحلل المتدرب الأخطار المحتملة في المنشآت وفق طبيعة استخدامها وإشغالها.',question_text:'في منشأة تعليمية، أي عامل يستدعي اهتمامًا خاصًا من المفتش؟',options:{A:'وجود مواد أو ممارسات قد تسبب الحريق مع كثافة شاغلي المنشأة',B:'لون الجدران',C:'نوع الأثاث الإداري فقط',D:'عدد المكاتب'}},
  {id:11,category:'مهارات',outcome_code:'هـ2',learning_outcome:'أن يحلل المتدرب الأخطار المحتملة في المنشآت وفق طبيعة استخدامها وإشغالها.',question_text:'لماذا تمثل أماكن التجمع العام أهمية خاصة أثناء التفتيش؟',options:{A:'لارتفاع قيمتها المالية دائمًا',B:'لصغر مساحتها',C:'لأنها لا تحتاج إلى مخارج طوارئ',D:'لاحتمال وجود أعداد كبيرة من الأشخاص وما يترتب على ذلك من تحديات الإخلاء'}},
  {id:12,category:'مهارات',outcome_code:'هـ2',learning_outcome:'أن يحلل المتدرب الأخطار المحتملة في المنشآت وفق طبيعة استخدامها وإشغالها.',question_text:'عند تفتيش مستودع يحتوي على مواد قابلة للاشتعال، ما الذي يجب أن يحظى بأولوية عالية؟',options:{A:'ترتيب المكاتب',B:'مصادر الاشتعال وطريقة التخزين والفصل بين المواد',C:'عدد الموظفين الإداريين',D:'لون العبوات'}},
  {id:13,category:'مهارات',outcome_code:'هـ3',learning_outcome:'أن يعد المتدرب تقرير التفتيش بصورة واضحة ودقيقة وموثقة.',question_text:'متى يفضل إعداد تقرير التفتيش؟',options:{A:'بعد مرور عدة أسابيع',B:'عند وقوع حادث فقط',C:'في أسرع وقت بعد انتهاء التفتيش',D:'عند طلب صاحب المنشأة'}},
  {id:14,category:'مهارات',outcome_code:'هـ3',learning_outcome:'أن يعد المتدرب تقرير التفتيش بصورة واضحة ودقيقة وموثقة.',question_text:'أي أسلوب هو الأفضل في صياغة تقرير التفتيش؟',options:{A:'وصف الملاحظات والوقائع بدقة وربطها بمتطلبات السلامة',B:'استخدام عبارات عامة وغامضة',C:'ذكر الآراء الشخصية فقط',D:'حذف الملاحظات البسيطة دائمًا'}},
  {id:15,category:'مهارات',outcome_code:'هـ4',learning_outcome:'أن يستخدم المتدرب النماذج والأجهزة والوسائل المناسبة لأعمال الكشف والفحص.',question_text:'أي جهاز يستخدم للتحقق من القيم الكهربائية أثناء أعمال التفتيش؟',options:{A:'جهاز قياس شدة الضوضاء',B:'جهاز اختبار كاشف الدخان',C:'القدمة ذات الورنية',D:'الأفوميتر'}},
  {id:16,category:'مهارات',outcome_code:'هـ4',learning_outcome:'أن يستخدم المتدرب النماذج والأجهزة والوسائل المناسبة لأعمال الكشف والفحص.',question_text:'أي وسيلة تستخدم للتحقق من استجابة كاشف الدخان أثناء التفتيش؟',options:{A:'جهاز قياس سماكة الأنابيب',B:'جهاز اختبار كاشف الدخان',C:'جهاز قياس شدة الضوضاء',D:'القدمة ذات الورنية'}},
  {id:17,category:'معارف',outcome_code:'ع3',learning_outcome:'أن يوضح المتدرب متطلبات السلامة الأساسية الواجب التحقق منها في أنظمة الحماية من الحريق.',question_text:'أي مما يلي يدخل ضمن متطلبات السلامة التي يتحقق منها المفتش؟',options:{A:'الأثاث المكتبي فقط',B:'الشكل المعماري الخارجي فقط',C:'أنظمة الإنذار والإطفاء ومخارج الطوارئ',D:'عدد المركبات الخاصة بالموظفين'}},
  {id:18,category:'مهارات',outcome_code:'هـ5',learning_outcome:'أن يتحقق المتدرب من جودة فحص واختبار وصيانة أنظمة ومعدات السلامة.',question_text:'عند استلام نظام الرشاشات، ما الذي ينبغي التحقق منه قبل اعتماده؟',options:{A:'لون الأنابيب فقط',B:'إجراء الفحص والاختبارات المطلوبة والتحقق من سلامة النظام وعدم وجود تسرب',C:'اسم الشركة دون فحص',D:'تشغيل مضخة واحدة فقط'}},
  {id:19,category:'مهارات',outcome_code:'هـ5',learning_outcome:'أن يتحقق المتدرب من جودة فحص واختبار وصيانة أنظمة ومعدات السلامة.',question_text:'متى يبدأ فحص أجهزة التحكم في أنظمة الإنذار والحماية بعد تركيبها؟',options:{A:'بعد استلامها وتركيبها ثم وفق جدول الفحص والصيانة المعتمد',B:'بعد وقوع أول حادث',C:'بعد خمس سنوات فقط',D:'عند تغيير مالك المنشأة'}},
  {id:20,category:'مهارات',outcome_code:'هـ6',learning_outcome:'أن يستخدم المتدرب متطلبات كود البناء السعودي وجداول المخالفات في تقييم حالة المنشأة.',question_text:'في جداول تصنيف مخالفات كود البناء السعودي الواردة بالمقرر، أي المجموعات تقع ضمن الفئة الأعلى في الجدول؟',options:{A:'Group R-3 و Group R-4 فقط',B:'Group B فقط',C:'Group S-2 فقط',D:'Group U و Group H'}}
];

let answers = {};
let currentIndex = 0;
let traineeName = '';
const $ = id => document.getElementById(id);
const startCard = $('startCard');
const quizCard = $('quizCard');
const reviewCard = $('reviewCard');
const resultCard = $('resultCard');
$('progressBar').max = questions.length;

function optionEntries(q){return Object.entries(q.options);}
function escapeHtml(s){return String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));}

function renderQuestion(){
  const q=questions[currentIndex];
  $('progressText').textContent=`السؤال ${currentIndex+1} من ${questions.length}`;
  $('progressBar').value=currentIndex+1;
  $('questionWrap').innerHTML=`
    <div class="question-meta"><span>${q.category} – ${q.outcome_code}</span><span>الكشف والتفتيش وضبط المخالفات</span></div>
    <div class="muted" style="margin-top:10px">ناتج التعلم: ${escapeHtml(q.learning_outcome)}</div>
    <h2 class="question-title">${escapeHtml(q.question_text)}</h2>
    <div class="options">${optionEntries(q).map(([key,text])=>`
      <label class="option ${answers[q.id]===key?'selected':''}">
        <input type="radio" name="q${q.id}" value="${key}" ${answers[q.id]===key?'checked':''}/>
        <span class="option-key">${key}</span><span>${escapeHtml(text)}</span>
      </label>`).join('')}</div>`;
  document.querySelectorAll(`input[name="q${q.id}"]`).forEach(input=>input.addEventListener('change',e=>{answers[q.id]=e.target.value;renderQuestion();}));
  $('prevBtn').disabled=currentIndex===0;
  $('nextBtn').textContent=currentIndex===questions.length-1?'مراجعة الإجابات':'التالي';
  window.scrollTo({top:0,behavior:'smooth'});
}

function showReview(){
  quizCard.classList.add('hidden');reviewCard.classList.remove('hidden');
  const answered=Object.keys(answers).length;
  $('reviewSummary').textContent=`أجبت عن ${answered} من ${questions.length} سؤالًا.`;
  $('reviewList').innerHTML=questions.map((q,i)=>{const selected=answers[q.id];const text=selected?q.options[selected]:'لم تتم الإجابة';return `<div class="review-item ${selected?'':'missing'}"><strong>${i+1}. ${escapeHtml(q.question_text)}</strong><div>إجابتك: ${escapeHtml(text)}</div></div>`;}).join('');
  $('submitBtn').disabled=answered!==questions.length;
  $('submitError').textContent=answered===questions.length?'':'يجب الإجابة عن جميع الأسئلة قبل الإرسال.';
  window.scrollTo({top:0,behavior:'smooth'});
}

function showResults(payload){
  reviewCard.classList.add('hidden');resultCard.classList.remove('hidden');
  $('scoreBox').innerHTML=`<div class="big-score">${payload.score} / ${payload.total}</div><div>${payload.percentage}%</div>`;
  $('resultList').innerHTML=questions.map((q,i)=>{const r=payload.results.find(x=>x.question_id===q.id);const selectedText=q.options[r.selected_option]||'-';const correctText=q.options[r.correct_option]||'-';return `<div class="review-item ${r.is_correct?'correct':'incorrect'}"><strong>${i+1}. ${escapeHtml(q.question_text)}</strong><div>إجابتك: ${escapeHtml(selectedText)}</div><div>الإجابة الصحيحة: ${escapeHtml(correctText)}</div><div class="status">${r.is_correct?'✓ صحيحة':'✗ غير صحيحة'}</div></div>`;}).join('');
  window.scrollTo({top:0,behavior:'smooth'});
}

$('startBtn').addEventListener('click',()=>{
  $('startError').textContent='';traineeName=$('traineeName').value.trim();
  if(traineeName.length<2){$('startError').textContent='يرجى كتابة اسم المتدرب.';return;}
  startCard.classList.add('hidden');quizCard.classList.remove('hidden');renderQuestion();
});
$('prevBtn').addEventListener('click',()=>{if(currentIndex>0){currentIndex--;renderQuestion();}});
$('nextBtn').addEventListener('click',()=>{if(currentIndex<questions.length-1){currentIndex++;renderQuestion();}else showReview();});
$('backToQuizBtn').addEventListener('click',()=>{reviewCard.classList.add('hidden');quizCard.classList.remove('hidden');const firstMissing=questions.findIndex(q=>!answers[q.id]);if(firstMissing>=0)currentIndex=firstMissing;renderQuestion();});
$('submitBtn').addEventListener('click',()=>$('confirmDialog').showModal());
$('cancelSubmit').addEventListener('click',()=>$('confirmDialog').close());
$('confirmSubmit').addEventListener('click',async()=>{
  $('confirmSubmit').disabled=true;$('submitError').textContent='';
  try{
    const {data,error}=await supabaseClient.rpc('submit_assessment',{p_trainee_name:PREFIX+traineeName,p_assessment_type:'بعدي',p_answers:answers});
    if(error)throw error;
    $('confirmDialog').close();showResults(data);
  }catch(e){$('confirmDialog').close();$('submitError').textContent=e.message||'تعذر إرسال الإجابات.';console.error(e);}finally{$('confirmSubmit').disabled=false;}
});
