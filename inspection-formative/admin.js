const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const PREFIX = '[تكويني التفتيش] ';
const $ = id => document.getElementById(id);

const questions = [
{id:1,question_text:'ما المرجع النظامي الذي ينبغي أن يستند إليه مفتش السلامة عند تنفيذ أعمال التفتيش وضبط المخالفات؟',options:{A:'الاجتهاد الشخصي للمفتش',B:'اللوائح والأنظمة والتعليمات المعتمدة',C:'رغبة صاحب المنشأة',D:'التقارير الشفهية فقط'}},
{id:2,question_text:'ما الغرض الرئيس من تطبيق قواعد التفتيش والضبط على المنشآت؟',options:{A:'زيادة زمن الجولة',B:'تقليل عدد المفتشين',C:'توحيد إجراءات التفتيش والتحقق من الالتزام بالمتطلبات',D:'الاستغناء عن التقارير'}},
{id:3,question_text:'أي مما يلي يمثل أحد أهداف الكشف والتفتيش الواردة في المقرر؟',options:{A:'اكتشاف أوجه القصور والعيوب التي قد تؤثر في سلامة المنشأة',B:'زيادة مساحة المنشأة',C:'تحديد القيمة المالية للمبنى',D:'تحديد عدد العاملين الإداريين'}},
{id:4,question_text:'أي صفة تعد أساسية لمفتش السلامة؟',options:{A:'الاعتماد على الآخرين في كتابة التقرير',B:'الاكتفاء بالخبرة دون أنظمة',C:'تجنب استخدام أدوات القياس',D:'الإلمام بلوائح وأنظمة السلامة والقدرة على كتابة التقارير'}},
{id:5,question_text:'إذا شاهد المفتش حالة خطرة يمكن أن تسهم في حدوث حريق أو تساعد على انتشاره، فما مسؤوليته؟',options:{A:'تجاهلها إذا لم تكن ضمن سبب الزيارة',B:'تأجيلها إلى الزيارة التالية',C:'توثيقها والإبلاغ عنها وفق الإجراءات',D:'إبلاغ العاملين شفهيًا فقط'}},
{id:6,question_text:'قبل زيارة منشأة سبق تفتيشها، ما الإجراء الأنسب للمفتش؟',options:{A:'البدء بجولة جديدة دون الاطلاع على السابق',B:'مراجعة التقارير السابقة والملاحظات والإجراءات المطلوبة',C:'سؤال صاحب المنشأة فقط',D:'إعداد التقرير قبل الزيارة'}},
{id:7,question_text:'عند وصول المفتش إلى المنشأة، ما التصرف الصحيح قبل بدء الجولة؟',options:{A:'الدخول إلى جميع المواقع مباشرة',B:'طلب إخلاء المبنى',C:'البدء بالتصوير دون إشعار',D:'التعريف بنفسه وطلب مقابلة المسؤول عن المنشأة'}},
{id:8,question_text:'ما الأسلوب الأفضل لتدوين الملاحظات أثناء الجولة؟',options:{A:'الاعتماد على الذاكرة',B:'تسجيل المخالفات الخطرة فقط',C:'استخدام أسلوب منظم يسمح بالرجوع إلى الملاحظات عند إعداد التقرير',D:'تأجيل الكتابة إلى عدة أيام'}},
{id:9,question_text:'أثناء الجولة التفتيشية، ما المنهج الأنسب؟',options:{A:'فحص أجزاء محددة فقط',B:'اتباع مسار منظم وفحص أقسام المنشأة دون إغفال المناطق ذات العلاقة بالسلامة',C:'التركيز على المكاتب الإدارية فقط',D:'الاكتفاء بالمعلومات المقدمة من المسؤول'}},
{id:10,question_text:'في منشأة تعليمية، أي عامل يستدعي اهتمامًا خاصًا من المفتش؟',options:{A:'وجود مواد أو ممارسات قد تسبب الحريق مع كثافة شاغلي المنشأة',B:'لون الجدران',C:'نوع الأثاث الإداري فقط',D:'عدد المكاتب'}},
{id:11,question_text:'لماذا تمثل أماكن التجمع العام أهمية خاصة أثناء التفتيش؟',options:{A:'لارتفاع قيمتها المالية دائمًا',B:'لصغر مساحتها',C:'لأنها لا تحتاج إلى مخارج طوارئ',D:'لاحتمال وجود أعداد كبيرة من الأشخاص وما يترتب على ذلك من تحديات الإخلاء'}},
{id:12,question_text:'عند تفتيش مستودع يحتوي على مواد قابلة للاشتعال، ما الذي يجب أن يحظى بأولوية عالية؟',options:{A:'ترتيب المكاتب',B:'مصادر الاشتعال وطريقة التخزين والفصل بين المواد',C:'عدد الموظفين الإداريين',D:'لون العبوات'}},
{id:13,question_text:'متى يفضل إعداد تقرير التفتيش؟',options:{A:'بعد مرور عدة أسابيع',B:'عند وقوع حادث فقط',C:'في أسرع وقت بعد انتهاء التفتيش',D:'عند طلب صاحب المنشأة'}},
{id:14,question_text:'أي أسلوب هو الأفضل في صياغة تقرير التفتيش؟',options:{A:'وصف الملاحظات والوقائع بدقة وربطها بمتطلبات السلامة',B:'استخدام عبارات عامة وغامضة',C:'ذكر الآراء الشخصية فقط',D:'حذف الملاحظات البسيطة دائمًا'}},
{id:15,question_text:'أي جهاز يستخدم للتحقق من القيم الكهربائية أثناء أعمال التفتيش؟',options:{A:'جهاز قياس شدة الضوضاء',B:'جهاز اختبار كاشف الدخان',C:'القدمة ذات الورنية',D:'الأفوميتر'}},
{id:16,question_text:'أي وسيلة تستخدم للتحقق من استجابة كاشف الدخان أثناء التفتيش؟',options:{A:'جهاز قياس سماكة الأنابيب',B:'جهاز اختبار كاشف الدخان',C:'جهاز قياس شدة الضوضاء',D:'القدمة ذات الورنية'}},
{id:17,question_text:'أي مما يلي يدخل ضمن متطلبات السلامة التي يتحقق منها المفتش؟',options:{A:'الأثاث المكتبي فقط',B:'الشكل المعماري الخارجي فقط',C:'أنظمة الإنذار والإطفاء ومخارج الطوارئ',D:'عدد المركبات الخاصة بالموظفين'}},
{id:18,question_text:'عند استلام نظام الرشاشات، ما الذي ينبغي التحقق منه قبل اعتماده؟',options:{A:'لون الأنابيب فقط',B:'إجراء الفحص والاختبارات المطلوبة والتحقق من سلامة النظام وعدم وجود تسرب',C:'اسم الشركة دون فحص',D:'تشغيل مضخة واحدة فقط'}},
{id:19,question_text:'متى يبدأ فحص أجهزة التحكم في أنظمة الإنذار والحماية بعد تركيبها؟',options:{A:'بعد استلامها وتركيبها ثم وفق جدول الفحص والصيانة المعتمد',B:'بعد وقوع أول حادث',C:'بعد خمس سنوات فقط',D:'عند تغيير مالك المنشأة'}},
{id:20,question_text:'في جداول تصنيف مخالفات كود البناء السعودي الواردة بالمقرر، أي المجموعات تقع ضمن الفئة الأعلى في الجدول؟',options:{A:'Group R-3 و Group R-4 فقط',B:'Group B فقط',C:'Group S-2 فقط',D:'Group U و Group H'}}
];
const questionMap = new Map(questions.map(q=>[q.id,q]));

function escapeHtml(s){return String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));}
function cleanName(name){return String(name||'').startsWith(PREFIX)?String(name).slice(PREFIX.length):String(name||'');}

async function ensureAdmin(){
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(!session)return false;
  const {data,error}=await supabaseClient.from('admin_users').select('user_id').eq('user_id',session.user.id).maybeSingle();
  return !error&&!!data;
}

async function loadDashboard(){
  $('dashboardError').textContent='';
  const {data,error}=await supabaseClient.from('attempts').select('*').order('submitted_at',{ascending:false});
  if(error){$('dashboardError').textContent='تعذر تحميل النتائج.';throw error;}
  const attempts=(data||[]).filter(a=>String(a.trainee_name||'').startsWith(PREFIX));
  $('statAttempts').textContent=attempts.length;
  const avg=attempts.length?attempts.reduce((s,a)=>s+Number(a.percentage||0),0)/attempts.length:0;
  $('statAverage').textContent=`${avg.toFixed(1)}%`;
  const highest=attempts.length?Math.max(...attempts.map(a=>Number(a.percentage||0))):0;
  $('statHighest').textContent=`${highest.toFixed(1)}%`;
  $('statLatest').textContent=attempts.length?new Date(attempts[0].submitted_at).toLocaleDateString('ar-SA'):'-';
  $('attemptRows').innerHTML=attempts.map(a=>`<tr><td>${escapeHtml(cleanName(a.trainee_name))}</td><td>${a.score}/${a.total_questions}</td><td>${Number(a.percentage).toFixed(2)}%</td><td>${new Date(a.submitted_at).toLocaleString('ar-SA')}</td><td><button class="secondary small" data-attempt="${a.id}" data-name="${escapeHtml(cleanName(a.trainee_name))}">عرض</button></td></tr>`).join('')||'<tr><td colspan="5">لا توجد نتائج حتى الآن.</td></tr>';
  document.querySelectorAll('[data-attempt]').forEach(btn=>btn.addEventListener('click',()=>showDetails(btn.dataset.attempt,btn.dataset.name)));
}

async function showDetails(attemptId,name){
  const {data,error}=await supabaseClient.from('responses').select('*').eq('attempt_id',attemptId).order('question_id');
  if(error)return alert('تعذر تحميل التفاصيل');
  $('detailsTitle').textContent=`تفاصيل إجابات ${name||''}`;
  $('detailsBody').innerHTML=(data||[]).map((r,i)=>{const q=questionMap.get(r.question_id);const selectedText=q?q.options[r.selected_option]:r.selected_option;const correctText=q?q.options[r.is_correct?r.selected_option:({'A':'C','B':'B','C':'A','D':'D'}[r.selected_option]||r.selected_option)]:'-';return `<div class="review-item ${r.is_correct?'correct':'incorrect'}"><strong>${i+1}. ${q?escapeHtml(q.question_text):`السؤال ${r.question_id}`}</strong><div>إجابة المتدرب: ${escapeHtml(selectedText||'-')}</div><div>الحالة: <span class="status">${r.is_correct?'✓ صحيحة':'✗ غير صحيحة'}</span></div></div>`;}).join('');
  $('detailsDialog').showModal();
}

async function showAppState(){
  const isAdmin=await ensureAdmin();
  if(isAdmin){$('loginCard').classList.add('hidden');$('dashboard').classList.remove('hidden');try{await loadDashboard();}catch(e){console.error(e);}}
  else{$('loginCard').classList.remove('hidden');$('dashboard').classList.add('hidden');}
}

$('loginBtn').addEventListener('click',async()=>{
  $('loginError').textContent='';
  const email=$('adminEmail').value.trim(),password=$('adminPassword').value;
  const {error}=await supabaseClient.auth.signInWithPassword({email,password});
  if(error){$('loginError').textContent='بيانات الدخول غير صحيحة.';return;}
  if(!(await ensureAdmin())){await supabaseClient.auth.signOut();$('loginError').textContent='هذا الحساب غير مخول كمشرف.';return;}
  showAppState();
});
$('refreshBtn').addEventListener('click',loadDashboard);
$('logoutBtn').addEventListener('click',async()=>{await supabaseClient.auth.signOut();showAppState();});
$('closeDetails').addEventListener('click',()=>$('detailsDialog').close());
supabaseClient.auth.onAuthStateChange(()=>setTimeout(showAppState,0));
showAppState();
setInterval(()=>{if(!$('dashboard').classList.contains('hidden'))loadDashboard();},15000);
