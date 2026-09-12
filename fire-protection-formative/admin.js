const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const PREFIX = '[تكويني الوقاية] ';
const $ = id => document.getElementById(id);

const questions = [
  {id:1,text:'ما المرجعان الرئيسان اللذان يتناولهما المقرر في متطلبات الوقاية والحماية من الحريق في المنشآت؟',correct:'B',options:{A:'IEC فقط',B:'NFPA وSBC',C:'OSHA فقط',D:'ISO فقط'}},
  {id:2,text:'أي الأنظمة الآتية يُعد من أنظمة الحماية من الحريق التي تناولها المقرر؟',correct:'C',options:{A:'نظام الاتصالات الإدارية',B:'نظام الحضور والانصراف',C:'نظام الإنذار من الحريق',D:'نظام المراقبة المالية'}},
  {id:3,text:'لوحظ أثناء التفتيش تراكم الدخان في مسار الهروب، فما النظام الذي ينبغي التحقق من كفاءته بصورة أساسية؟',correct:'A',options:{A:'نظام التحكم بالدخان',B:'نظام المياه الصحية',C:'نظام الإضاءة الخارجية',D:'نظام الاتصالات'}},
  {id:4,text:'أي ترتيب يمثل الأجزاء الأساسية لمسار الخروج التي تناولها المقرر؟',correct:'D',options:{A:'المخرج ← المصعد ← المدخل',B:'الممر ← المصعد ← السطح',C:'المدخل ← المصعد ← المخرج',D:'الوصول إلى المخرج ← المخرج ← منفذ الخروج'}},
  {id:5,text:'يرمز للتيار الكهربائي المتردد بالرمز:',correct:'C',options:{A:'DC',B:'Ω',C:'AC',D:'W'}},
  {id:6,text:'يستخدم الرمز (Ω) للدلالة على:',correct:'B',options:{A:'الجهد الكهربائي',B:'المقاومة الكهربائية',C:'التيار الكهربائي',D:'القدرة الكهربائية'}},
  {id:7,text:'أثناء الفحص وُجد موصل كهربائي مكشوف يمكن أن يلامسه العاملون، فما التصرف الأكثر أمانًا؟',correct:'D',options:{A:'الاستمرار في استخدامه',B:'تغطيته مؤقتًا بالورق',C:'تجاهل الحالة',D:'فصل مصدر الكهرباء ومنع استخدامه حتى معالجة الخطر'}},
  {id:8,text:'أي مما يلي يسهم في الوقاية من انتقال التيار الكهربائي إلى جسم الإنسان؟',correct:'C',options:{A:'زيادة الأحمال الكهربائية',B:'استخدام الأسلاك المكشوفة',C:'سلامة العوازل الكهربائية',D:'تعطيل وسائل الحماية'}},
  {id:9,text:'أي مما يلي ليس من تصنيفات المواد الكيميائية الخطرة الواردة في المقرر؟',correct:'B',options:{A:'المواد القابلة للاشتعال',B:'المواد الغذائية',C:'المواد الأكّالة',D:'المواد المشعة'}},
  {id:10,text:'عند تخزين مواد كيميائية غير متوافقة مع بعضها، ما الإجراء الصحيح؟',correct:'A',options:{A:'فصلها وتخزينها وفق توافقها الكيميائي',B:'تخزينها جميعًا في مكان واحد',C:'إزالة بطاقات التعريف عنها',D:'وضعها دون تصنيف'}}
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
  const adjusted=attempts.map(a=>{const score=Math.max(0,Math.min(10,Number(a.score||0)-10));return {...a,actualScore:score,actualPct:score*10};});
  $('statAttempts').textContent=adjusted.length;
  const avg=adjusted.length?adjusted.reduce((s,a)=>s+a.actualPct,0)/adjusted.length:0;
  $('statAverage').textContent=`${avg.toFixed(1)}%`;
  const highest=adjusted.length?Math.max(...adjusted.map(a=>a.actualPct)):0;
  $('statHighest').textContent=`${highest.toFixed(1)}%`;
  $('statLatest').textContent=adjusted.length?new Date(adjusted[0].submitted_at).toLocaleDateString('ar-SA'):'-';
  $('attemptRows').innerHTML=adjusted.map(a=>`<tr><td>${escapeHtml(cleanName(a.trainee_name))}</td><td>${a.actualScore}/10</td><td>${a.actualPct.toFixed(0)}%</td><td>${new Date(a.submitted_at).toLocaleString('ar-SA')}</td><td><button class="secondary small" data-attempt="${a.id}" data-name="${escapeHtml(cleanName(a.trainee_name))}">عرض</button></td></tr>`).join('')||'<tr><td colspan="5">لا توجد نتائج حتى الآن.</td></tr>';
  document.querySelectorAll('[data-attempt]').forEach(btn=>btn.addEventListener('click',()=>showDetails(btn.dataset.attempt,btn.dataset.name)));
}

async function showDetails(attemptId,name){
  const {data,error}=await supabaseClient.from('responses').select('*').eq('attempt_id',attemptId).order('question_id');
  if(error)return alert('تعذر تحميل التفاصيل');
  const rows=(data||[]).filter(r=>r.question_id<=10);
  $('detailsTitle').textContent=`تفاصيل إجابات ${name||''}`;
  $('detailsBody').innerHTML=rows.map((r,i)=>{const q=questionMap.get(r.question_id);const selected=q?.options[r.selected_option]||'-';const correct=q?.options[q.correct]||'-';return `<div class="review-item ${r.is_correct?'correct':'incorrect'}"><strong>${i+1}. ${escapeHtml(q?.text||`السؤال ${r.question_id}`)}</strong><div>إجابة المتدرب: ${escapeHtml(selected)}</div><div>الإجابة الصحيحة: ${escapeHtml(correct)}</div><div class="status">${r.is_correct?'✓ صحيحة':'✗ غير صحيحة'}</div></div>`;}).join('');
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
