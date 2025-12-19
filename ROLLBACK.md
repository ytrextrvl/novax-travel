# NOVAX Travel - خطوات التراجع (Rollback)

> **آخر تحديث:** 2025-12-19

## التراجع عبر Vercel

1. ادخل Vercel Dashboard
2. اختر مشروع novax-travel
3. Deployments → اختر deployment سابق
4. اضغط "Promote to Production"

## التراجع عبر Git

```bash
git log --oneline -10
git revert <commit-hash>
git push origin main
```

> **آخر تحديث:** 2025-12-19
