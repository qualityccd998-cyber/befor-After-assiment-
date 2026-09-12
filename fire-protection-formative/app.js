const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const PREFIX = '[تكويني الوقاية] ';
const $ = id => document.getElementById(id);

const questions = [
  {id:1,outcome:'ناتج 1',text:'ما المرجعان الرئيسان اللذان يتناولهما المقرر في متطلبات الوقاية والحماية من الحريق في المنشآت؟',correct:'B',options:{A:'IEC فقط',B:'NFPA وSBC',C:'OSHA فقط',D:'ISO فقط'}},
  {id:2,outcome:'ناتج 1',text:'أي الأنظمة الآتية يُعد من أنظمة الحماية من الحريق التي تناولها المقرر؟',correct:'C',options:{A:'نظام الاتصالات الإدارية',B:'نظام الحضور والانصراف',C:'نظام الإنذار من الحريق',D:'نظام المراقبة المالية'}},
  {id:3,outcome:'ناتج 2',text:'لوحظ أثناء التفتيش تراكم الدخان في مسار الهروب، فما النظام الذي ينبغي التحقق من كفاءته بصورة أساسية؟',correct:'A',options:{A:'نظام التحكم بالدخان',B:'نظام المياه الصحية',C:'نظام الإضاءة الخارجية',D:'نظام الاتصالات'}},
  {id:4,outcome:'ناتج 2',text:'أي ترتيب يمثل الأجزاء الأساسية لمسار الخروج التي تناولها المقرر؟',correct:'D',options:{A:'المخرج ← المصعد ← المدخل',B:'الممر ← المصعد ← السطح',C:'المدخل ← المصعد ← المخرج',D:'الوصول إلى المخرج ← المخرج ← منفذ الخروج'}},
  {id:5,outcome:'ناتج 3',text:'يرمز للتيار الكهربائي المتردد بالرمز:',correct:'C',options:{A:'DC',B:'Ω',C:'AC',D:'W'}},
  {id:6,outcome:'ناتج 3',text:'يستخدم الرمز (Ω) للدلالة على:',correct:'B',options:{A:'الجهد الكهربائي',B:'المقاومة الكهربائية',C:'التيار الكهربائي',D:'القدرة الكهربائية'}},
  {id:7,outcome:'ناتج 4',text:'أثناء الفحص وُجد موصل كهربائي مكشوف يمكن أن يلامسه العاملون، فما التصرف الأكثر أمانًا؟',correct:'D',options:{A:'الاستمرار في استخدامه',B:'تغطيته مؤقتًا بالورق',C:'تجاهل الحالة',D:'فصل مصدر الكهرباء ومنع استخدامه حتى معالجة الخطر'}},
  {id:8,outcome:'ناتج 4',text:'أي مما يلي يسهم في الوقاية من انتقال التيار الكهربائي إلى جسم الإنسان؟',correct:'C',options:{A:'زيادة الأحمال الكهربائية',B:'استخدام الأسلاك المكشوفة',C:'سلامة العوازل الكهربائية',D:'تعطيل وسائل الحماية'}},
  {id:9,outcome:'ناتج 5',text:'أي مما يلي ليس من تصنيفات المواد الكيميائية الخطرة الواردة في المقرر؟',correct:'B',options:{A:'المواد القابلة للاشتعال',B:'المواد الغذائية',C:'المواد الأكّالة',D:'المواد المشعة'}},
  {id:10,outcome:'ناتج 5',text:'عند تخزين مواد كيميائية غير متوافقة مع بعضها، ما الإجراء الصحيح؟',correct:'A',options:{A:'فصلها وتخزينها وفق توافقها الكيميائي',B:'تخزينها جميعًا في مكان واحد',C:'إزالة بطاقات التعريف عنها',D:'وضعها دون تصنيف'}}
];

const hiddenCorrect = {11:'D',12:'B',13:'C',14:'A',15:'D',16:'B',17:'C',18:'B',19:'A',20:'D'};
let answers = {};
let currentIndex = 0;
let traineeName = '';

function renderQuestion(){
  const q=questions[currentIndex];
  $('progressText').textContent=`السؤال ${currentIndex+1} من ${questions.length}`;
  $('progressBar').value=currentIndex+1;
  $('questionWrap').innerHTML=`<div class="question-meta"><span>متطلبات الوقاية والحماية من الحريق</span><span>${q.outcome}</span></div><h2 class="question-title">${q.text}</h2><div class="options">${Object.entries(q.options).map(([k,v])=>`<label class="option ${answers[q.id]===k?'selected':''}"><input type="radio" name="q${q.id}" value="${k}" ${answers[q.id]===k?'checked':''}/><span class="option-key">${k}</span><span>${v}</span></label>`).join('')}</div>`;
  document.querySelectorAll(`input[name="q${q.id}"]`).forEach(i=>i.addEventListener('change',e=>{answers[q.id]=e.target.value;renderQuestion();}));
  $('prevBtn').disabled=currentIndex===0;
  $('nextBtn').textContent=currentIndex===questions.length-1?'مراجعة الإجابات':'التالي';
}

function showReview(){
  $('quizCard').classList.add('hidden');$('reviewCard').classList.remove('hidden');
  const answered=Object.keys(answers).length;
  $('reviewSummary').textContent=`أجبت عن ${answered} من ${questions.length} أسئلة.`;
  $('reviewList').innerHTML=questions.map((q,i)=>{const k=answers[q.id];return `<div class="review-item ${k?'':'missing'}"><strong>${i+1}. ${q.text}</strong><div>إجابتك: ${k?q.options[k]:'لم تتم الإجابة'}</div></div>`}).join('');
  $('submitBtn').disabled=answered!==questions.length;
  $('submitError').textContent=answered===questions.length?'':'يجب الإجابة عن جميع الأسئلة قبل الإرسال.';
}

function showResults(payload){
  $('reviewCard').classList.add('hidden');$('resultCard').classList.remove('hidden');
  const resultMap=new Map((payload.results||[]).map(r=>[r.question_id,r]));
  const score=questions.reduce((s,q)=>s+(resultMap.get(q.id)?.is_correct?1:0),0);
  $('scoreBox').innerHTML=`<div class="big-score">${score} / ${questions.length}</div><div>${(score/questions.length*100).toFixed(0)}%</div>`;
  $('resultList').innerHTML=questions.map((q,i)=>{const r=resultMap.get(q.id);const selected=answers[q.id];const ok=!!r?.is_correct;return `<div class="review-item ${ok?'correct':'incorrect'}"><strong>${i+1}. ${q.text}</strong><div>إجابتك: ${q.options[selected]||'-'}</div><div>الإجابة الصحيحة: ${q.options[q.correct]}</div><div class="status">${ok?'✓ صحيحة':'✗ غير صحيحة'}</div></div>`}).join('');
  window.scrollTo({top:0,behavior:'smooth'});
}

$('startBtn').addEventListener('click',()=>{
  $('startError').textContent=''; traineeName=$('traineeName').value.trim();
  if(traineeName.length<2){$('startError').textContent='يرجى كتابة اسم المتدرب.';return;}
  $('startCard').classList.add('hidden');$('quizCard').classList.remove('hidden');renderQuestion();
});
$('prevBtn').addEventListener('click',()=>{if(currentIndex>0){currentIndex--;renderQuestion();}});
$('nextBtn').addEventListener('click',()=>{if(currentIndex<questions.length-1){currentIndex++;renderQuestion();}else showReview();});
$('backToQuizBtn').addEventListener('click',()=>{$('reviewCard').classList.add('hidden');$('quizCard').classList.remove('hidden');const missing=questions.findIndex(q=>!answers[q.id]);if(missing>=0)currentIndex=missing;renderQuestion();});
$('submitBtn').addEventListener('click',()=>$('confirmDialog').showModal());
$('cancelSubmit').addEventListener('click',()=>$('confirmDialog').close());
$('confirmSubmit').addEventListener('click',async()=>{
  $('confirmSubmit').disabled=true;$('submitError').textContent='';
  try{
    const allAnswers={...answers,...hiddenCorrect};
    const {data,error}=await supabaseClient.rpc('submit_assessment',{p_trainee_name:PREFIX+traineeName,p_assessment_type:'قبلي',p_answers:allAnswers});
    if(error)throw error;
    $('confirmDialog').close();showResults(data);
  }catch(e){$('confirmDialog').close();$('submitError').textContent=e.message||'تعذر إرسال الإجابات.';console.error(e);}finally{$('confirmSubmit').disabled=false;}
});
