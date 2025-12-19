# NOVAX Travel Web - Security Baseline

> **آخر تحديث:** 2025-12-20

---

## نظرة عامة

موقع العملاء (Next.js) للبحث والحجز.

---

## نموذج المصادقة

### JWT من Backend
- التوكن يُخزن في HTTP-only cookie
- التحقق عبر Backend API
- انتهاء الجلسة: 24 ساعة

### الصلاحيات
- `user` للعملاء العاديين
- `agency` للوكالات

---

## Security Headers

### الحالة: مخطط للتنفيذ

### Headers المطلوبة:
```javascript
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];
```

---

## إدارة الأسرار

### القواعد:
- ✅ `.env.local` لا يُرفع لـ Git
- ✅ `.env.example` بقيم وهمية
- ✅ Vercel Environment Variables للإنتاج

### المتغيرات:
- `NEXT_PUBLIC_API_URL` (عام)
- `NEXT_PUBLIC_SITE_URL` (عام)

---

## حماية البيانات

### بيانات العملاء:
- لا تُخزن محلياً
- تُرسل مباشرة للـ Backend
- HTTPS فقط

### الدفع:
- لا معالجة دفع في Frontend
- يتم عبر Backend فقط

---

## المخاطر المعروفة

| المخاطر | الخطورة | الحالة | التخفيف |
|---------|---------|--------|---------|
| Security headers غير مفعلة | MEDIUM | مخطط | Phase 5 |

---

> **آخر تحديث:** 2025-12-20
