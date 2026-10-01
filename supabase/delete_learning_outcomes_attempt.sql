-- Secure delete for the 27-question learning outcomes pre/post assessment.
-- Only authenticated users listed in public.admin_users may execute the deletion.

create or replace function public.delete_learning_outcomes_attempt(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_deleted integer := 0;
begin
  if v_uid is null or not exists (
    select 1
    from public.admin_users au
    where au.user_id = v_uid
  ) then
    raise exception 'غير مصرح بتنفيذ الحذف';
  end if;

  if p_token is null or length(trim(p_token)) < 3 then
    raise exception 'رمز المحاولة غير صالح';
  end if;

  delete from public.attempts
  where trainee_name like '[LO27|' || p_token || '|%';

  get diagnostics v_deleted = row_count;

  return jsonb_build_object(
    'success', true,
    'deleted_attempt_rows', v_deleted
  );
end;
$$;

revoke all on function public.delete_learning_outcomes_attempt(text) from public;
revoke all on function public.delete_learning_outcomes_attempt(text) from anon;
grant execute on function public.delete_learning_outcomes_attempt(text) to authenticated;
