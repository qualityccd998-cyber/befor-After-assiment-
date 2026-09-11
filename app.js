const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);

let questions = [];
let answers = {};
let currentIndex = 0;
let traineeName = '';
let assessmentType = 'قبلي';

const $ = (id) => document.getElementById(id);
const startCard = $('startCard');
const quizCard = $('quizCard');
const reviewCard = $('reviewCard');
const resultCard = $('resultCard');

async function loadQuestions() {
  const { data, error } = await supabaseClient.rpc('get_public_questions');
  if (error) throw error;
  questions = data || [];
  $('progressBar').max = questions.length;
}

function optionEntries(q) {
  return [
    ['A', q.option_a],
    ['B', q.option_b],
    ['C', q.option_c],
    ['D', q.option_d]
  ];
}

function renderQuestion() {
  const q = questions[currentIndex];
  $('progressText').textContent = `السؤال ${currentIndex + 1} من ${questions.length}`;
  $('progressBar').value = currentIndex + 1;
  $('questionWrap').innerHTML = `
    <div class="question-meta"><span>${q.course}</span><span>${q.outcome_code}</span></div>
    <h2 class="question-title">${q.question_text}</h2>
    <div class="options">
      ${optionEntries(q).map(([key, text]) => `
        <label class="option ${answers[q.id] === key ? 'selected' : ''}">
          <input type="radio" name="q${q.id}" value="${key}" ${answers[q.id] === key ? 'checked' : ''} />
          <span class="option-key">${key}</span>
          <span>${text}</span>
        </label>
      `).join('')}
    </div>
  `;
  document.querySelectorAll(`input[name="q${q.id}"]`).forEach(input => {
    input.addEventListener('change', (e) => {
      answers[q.id] = e.target.value;
      renderQuestion();
    });
  });
  $('prevBtn').disabled = currentIndex === 0;
  $('nextBtn').textContent = currentIndex === questions.length - 1 ? 'مراجعة الإجابات' : 'التالي';
}

function showReview() {
  quizCard.classList.add('hidden');
  reviewCard.classList.remove('hidden');
  const answered = Object.keys(answers).length;
  $('reviewSummary').textContent = `أجبت عن ${answered} من ${questions.length} سؤالًا.`;
  $('reviewList').innerHTML = questions.map((q, i) => {
    const selected = answers[q.id];
    const text = selected ? optionEntries(q).find(([k]) => k === selected)?.[1] : 'لم تتم الإجابة';
    return `<div class="review-item ${selected ? '' : 'missing'}"><strong>${i + 1}. ${q.question_text}</strong><div>إجابتك: ${text}</div></div>`;
  }).join('');
  $('submitBtn').disabled = answered !== questions.length;
  $('submitError').textContent = answered === questions.length ? '' : 'يجب الإجابة عن جميع الأسئلة قبل الإرسال.';
}

function showResults(payload) {
  reviewCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
  $('scoreBox').innerHTML = `<div class="big-score">${payload.score} / ${payload.total}</div><div>${payload.percentage}%</div>`;
  $('resultList').innerHTML = questions.map((q, i) => {
    const r = payload.results.find(x => x.question_id === q.id);
    const selectedText = optionEntries(q).find(([k]) => k === r.selected_option)?.[1] || '-';
    const correctText = optionEntries(q).find(([k]) => k === r.correct_option)?.[1] || '-';
    return `<div class="review-item ${r.is_correct ? 'correct' : 'incorrect'}">
      <strong>${i + 1}. ${q.question_text}</strong>
      <div>إجابتك: ${selectedText}</div>
      <div>الإجابة الصحيحة: ${correctText}</div>
      <div class="status">${r.is_correct ? '✓ صحيحة' : '✗ غير صحيحة'}</div>
    </div>`;
  }).join('');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('startBtn').addEventListener('click', async () => {
  $('startError').textContent = '';
  traineeName = $('traineeName').value.trim();
  assessmentType = document.querySelector('input[name="assessmentType"]:checked').value;
  if (traineeName.length < 2) {
    $('startError').textContent = 'يرجى كتابة اسم المتدرب.';
    return;
  }
  try {
    if (!questions.length) await loadQuestions();
    if (!questions.length) throw new Error('لا توجد أسئلة متاحة حاليًا.');
    startCard.classList.add('hidden');
    quizCard.classList.remove('hidden');
    renderQuestion();
  } catch (e) {
    $('startError').textContent = 'تعذر تحميل الأسئلة. حاول مرة أخرى.';
    console.error(e);
  }
});

$('prevBtn').addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; renderQuestion(); }
});

$('nextBtn').addEventListener('click', () => {
  if (currentIndex < questions.length - 1) { currentIndex++; renderQuestion(); }
  else showReview();
});

$('backToQuizBtn').addEventListener('click', () => {
  reviewCard.classList.add('hidden');
  quizCard.classList.remove('hidden');
  const firstMissing = questions.findIndex(q => !answers[q.id]);
  if (firstMissing >= 0) currentIndex = firstMissing;
  renderQuestion();
});

$('submitBtn').addEventListener('click', () => $('confirmDialog').showModal());
$('cancelSubmit').addEventListener('click', () => $('confirmDialog').close());

$('confirmSubmit').addEventListener('click', async () => {
  $('confirmSubmit').disabled = true;
  $('submitError').textContent = '';
  try {
    const { data, error } = await supabaseClient.rpc('submit_assessment', {
      p_trainee_name: traineeName,
      p_assessment_type: assessmentType,
      p_answers: answers
    });
    if (error) throw error;
    $('confirmDialog').close();
    showResults(data);
  } catch (e) {
    $('confirmDialog').close();
    $('submitError').textContent = e.message || 'تعذر إرسال الإجابات.';
    console.error(e);
  } finally {
    $('confirmSubmit').disabled = false;
  }
});
