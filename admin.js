const supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);

const $ = (id) => document.getElementById(id);
let questionMap = new Map();
const FORMATIVE_PREFIX = '[تكويني التفتيش] ';

async function ensureAdmin() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) return false;
  const { data, error } = await supabaseClient.from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle();
  return !error && !!data;
}

async function loadQuestionsForAdmin() {
  const { data, error } = await supabaseClient.from('questions').select('*').order('id');
  if (error) throw error;
  questionMap = new Map((data || []).map(q => [q.id, q]));
}

async function loadDashboard() {
  $('dashboardError').textContent = '';
  const { data, error } = await supabaseClient.from('attempts').select('*').order('submitted_at', { ascending: false });
  if (error) {
    $('dashboardError').textContent = 'تعذر تحميل النتائج.';
    throw error;
  }
  const attempts = (data || []).filter(a => !String(a.trainee_name || '').startsWith(FORMATIVE_PREFIX));
  $('statAttempts').textContent = attempts.length;
  $('statPre').textContent = attempts.filter(a => a.assessment_type === 'قبلي').length;
  $('statPost').textContent = attempts.filter(a => a.assessment_type === 'بعدي').length;
  const avg = attempts.length ? attempts.reduce((s, a) => s + Number(a.percentage || 0), 0) / attempts.length : 0;
  $('statAverage').textContent = `${avg.toFixed(1)}%`;
  $('attemptRows').innerHTML = attempts.map(a => `
    <tr>
      <td>${escapeHtml(a.trainee_name)}</td>
      <td>${a.assessment_type}</td>
      <td>${a.score}/${a.total_questions}</td>
      <td>${Number(a.percentage).toFixed(2)}%</td>
      <td>${new Date(a.submitted_at).toLocaleString('ar-SA')}</td>
      <td><button class="secondary small" data-attempt="${a.id}">عرض</button></td>
    </tr>`).join('') || '<tr><td colspan="6">لا توجد نتائج حتى الآن.</td></tr>';

  document.querySelectorAll('[data-attempt]').forEach(btn => btn.addEventListener('click', () => showDetails(btn.dataset.attempt)));
}

async function showDetails(attemptId) {
  const { data, error } = await supabaseClient.from('responses').select('*').eq('attempt_id', attemptId).order('question_id');
  if (error) return alert('تعذر تحميل التفاصيل');
  $('detailsBody').innerHTML = (data || []).map((r, i) => {
    const q = questionMap.get(r.question_id);
    const selectedText = q ? q[`option_${r.selected_option.toLowerCase()}`] : r.selected_option;
    const correctText = q ? q[`option_${q.correct_option.toLowerCase()}`] : '-';
    return `<div class="review-item ${r.is_correct ? 'correct' : 'incorrect'}">
      <strong>${i + 1}. ${q ? escapeHtml(q.question_text) : `السؤال ${r.question_id}`}</strong>
      <div>إجابة المتدرب: ${escapeHtml(selectedText || '-')}</div>
      <div>الإجابة الصحيحة: ${escapeHtml(correctText || '-')}</div>
      <div class="status">${r.is_correct ? '✓ صحيحة' : '✗ غير صحيحة'}</div>
    </div>`;
  }).join('');
  $('detailsDialog').showModal();
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

async function showAppState() {
  const isAdmin = await ensureAdmin();
  if (isAdmin) {
    $('loginCard').classList.add('hidden');
    $('dashboard').classList.remove('hidden');
    try {
      await loadQuestionsForAdmin();
      await loadDashboard();
    } catch (e) { console.error(e); }
  } else {
    $('loginCard').classList.remove('hidden');
    $('dashboard').classList.add('hidden');
  }
}

$('loginBtn').addEventListener('click', async () => {
  $('loginError').textContent = '';
  const email = $('adminEmail').value.trim();
  const password = $('adminPassword').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    $('loginError').textContent = 'بيانات الدخول غير صحيحة.';
    return;
  }
  if (!(await ensureAdmin())) {
    await supabaseClient.auth.signOut();
    $('loginError').textContent = 'هذا الحساب غير مخول كمشرف.';
    return;
  }
  showAppState();
});

$('refreshBtn').addEventListener('click', loadDashboard);
$('logoutBtn').addEventListener('click', async () => { await supabaseClient.auth.signOut(); showAppState(); });
$('closeDetails').addEventListener('click', () => $('detailsDialog').close());

supabaseClient.auth.onAuthStateChange(() => setTimeout(showAppState, 0));
showAppState();
setInterval(() => { if (!$('dashboard').classList.contains('hidden')) loadDashboard(); }, 15000);
