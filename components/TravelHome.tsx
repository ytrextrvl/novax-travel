'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Globe2,
  Headphones,
  Hotel,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

type Service = 'flight' | 'hotel' | 'car';
type Result = { reference: string; status: string } | null;

const heroImage = 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=86&w=2400';
const flightImage = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=86&w=1400';
const hotelImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=86&w=1400';
const carImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=86&w=1400';
const makkahImage = 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=84&w=1400';
const istanbulImage = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=84&w=1400';

const serviceMeta = {
  flight: { label: 'الطيران', icon: Plane, title: 'رحلات الطيران', copy: 'أرسل خط سيرك وتواريخك ونجهز لك أفضل خيار متاح قبل أي دفع.', image: flightImage },
  hotel: { label: 'الفنادق', icon: Hotel, title: 'حجوزات الفنادق', copy: 'حدد الوجهة وعدد الضيوف وميزانيتك لنجهز لك خيارات إقامة مناسبة.', image: hotelImage },
  car: { label: 'السيارات', icon: Car, title: 'تأجير السيارات', copy: 'حدد مكان الاستلام والتسليم والتواريخ ونرتب لك السيارة المناسبة.', image: carImage },
} as const;

function Field({ label, name, type = 'text', placeholder, required = true, min }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; min?: string }) {
  return <label className="field"><span>{label}</span><input name={name} type={type} placeholder={placeholder} required={required} min={min}/></label>;
}

export default function TravelHome() {
  const [service, setService] = useState<Service>('flight');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState('');
  const [fallbackText, setFallbackText] = useState('');
  const [copied, setCopied] = useState(false);
  const active = useMemo(() => serviceMeta[service], [service]);

  const resetFormState = (next?: Service) => {
    if (next) setService(next);
    setResult(null);
    setError('');
    setFallbackText('');
    setCopied(false);
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true); setError(''); setResult(null); setCopied(false);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const website = String(form.get('website') || '').trim();
    const details: Record<string,string> = {};
    for (const [key,value] of form.entries()) {
      if (!['name','phone','website'].includes(key) && String(value).trim()) details[key] = String(value).trim();
    }
    const readable = [`طلب ${active.label} جديد - NOVAX Travel`, `الاسم: ${name}`, `رقم التواصل: ${phone}`, ...Object.entries(details).map(([k,v]) => `${k}: ${v}`)].join('\n');
    setFallbackText(readable);

    try {
      const response = await fetch('https://admin.novaxtravel.com/api/public/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: service, name, phone, details, website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'REQUEST_FAILED');
      setResult({ reference: data.reference || 'NOVAX', status: data.status || 'new' });
      formElement.reset();
    } catch {
      setError('تعذر إرسال الطلب تلقائيًا الآن. يمكنك نسخ التفاصيل بالزر أدناه ولن تضيع بياناتك.');
    } finally {
      setSending(false);
    }
  };

  const copyFallback = async () => {
    try { await navigator.clipboard.writeText(fallbackText); setCopied(true); } catch { setCopied(false); }
  };

  return <main dir="rtl">
    <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(3,20,30,.92),rgba(3,20,30,.58),rgba(3,20,30,.28)),url(${heroImage})`}}>
      <nav className="shell nav">
        <a href="#top" className="brand"><span className="brandMark"><Plane size={22}/></span><span><strong>NOVAX</strong><small>TRAVEL</small></span></a>
        <div className="navLinks"><a href="#services">الخدمات</a><a href="#destinations">الوجهات</a><a href="#how">كيف نعمل</a></div>
        <a href="#booking" className="navCta">ابدأ الحجز</a>
      </nav>

      <div id="top" className="shell heroGrid">
        <div className="heroCopy">
          <span className="eyebrow"><Sparkles size={15}/> رحلتك من اليمن إلى العالم</span>
          <h1>سافر بثقة.<br/><em>ونحن نهتم بالتفاصيل.</em></h1>
          <p>طيران، فنادق وسيارات من مكان واحد. أرسل طلبك الآن، وسيقوم فريق NOVAX بمراجعة الخيارات وتجهيز العرض المناسب قبل التأكيد.</p>
          <div className="heroActions"><a href="#booking" className="primary">اطلب عرض الآن <ArrowLeft size={18}/></a><a href="#services" className="secondary">استكشف الخدمات</a></div>
          <div className="trust"><span><ShieldCheck size={17}/> مراجعة آمنة</span><span><Headphones size={17}/> متابعة مباشرة</span><span><BadgeCheck size={17}/> لا دفع قبل الموافقة</span></div>
        </div>

        <div id="booking" className="bookingCard">
          <div className="bookingHead"><div><span>طلب حجز جديد</span><h2>اختر خدمتك</h2></div><b><i/> استقبال الطلبات</b></div>
          <div className="tabs">{(Object.keys(serviceMeta) as Service[]).map(key=>{const Item=serviceMeta[key];const Icon=Item.icon;return <button key={key} type="button" className={service===key?'active':''} onClick={()=>resetFormState(key)}><Icon size={18}/>{Item.label}</button>})}</div>

          {result ? <div className="success">
            <CheckCircle2 size={52}/><h3>تم استلام طلبك بنجاح</h3><p>احتفظ بالرقم المرجعي، وسيتابع فريق NOVAX الطلب معك.</p><strong>{result.reference}</strong><button type="button" className="outlineBtn" onClick={()=>resetFormState()}>طلب جديد</button>
          </div> : <form className="form" onSubmit={submitRequest}>
            <input className="trap" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true"/>
            {service==='flight' && <><div className="grid2"><Field label="من" name="from" placeholder="مثال: عدن"/><Field label="إلى" name="to" placeholder="مثال: القاهرة"/></div><div className="grid2"><Field label="تاريخ الذهاب" name="departure_date" type="date"/><Field label="تاريخ العودة" name="return_date" type="date" required={false}/></div><div className="grid2"><Field label="عدد المسافرين" name="travelers" type="number" min="1" placeholder="1"/><Field label="درجة السفر" name="cabin" placeholder="اقتصادية / أعمال" required={false}/></div></>}
            {service==='hotel' && <><Field label="المدينة أو الوجهة" name="destination" placeholder="مثال: مكة، دبي، إسطنبول"/><div className="grid2"><Field label="تسجيل الدخول" name="check_in" type="date"/><Field label="تسجيل الخروج" name="check_out" type="date"/></div><div className="grid2"><Field label="عدد الضيوف" name="guests" type="number" min="1" placeholder="2"/><Field label="عدد الغرف" name="rooms" type="number" min="1" placeholder="1"/></div></>}
            {service==='car' && <><div className="grid2"><Field label="مكان الاستلام" name="pickup" placeholder="المطار أو المدينة"/><Field label="مكان التسليم" name="dropoff" placeholder="نفس المكان أو موقع آخر"/></div><div className="grid2"><Field label="تاريخ الاستلام" name="pickup_date" type="date"/><Field label="تاريخ التسليم" name="dropoff_date" type="date"/></div><Field label="نوع السيارة المفضل" name="car_type" placeholder="اقتصادية، SUV، عائلية..." required={false}/></>}
            <div className="grid2"><Field label="الاسم" name="name" placeholder="اسم صاحب الطلب"/><Field label="رقم التواصل" name="phone" placeholder="مثال: +967..."/></div>
            <label className="field"><span>ملاحظات إضافية</span><textarea name="notes" rows={3} placeholder="أي تفاصيل تساعدنا على تجهيز العرض"/></label>
            {error && <div className="errorBox">{error}</div>}
            <button className="submit" disabled={sending} type="submit"><Search size={18}/>{sending?'جاري إرسال الطلب...':'إرسال طلب العرض'}</button>
            {error && fallbackText && <button type="button" className="copyBtn" onClick={copyFallback}>{copied?'تم نسخ الطلب ✓':'نسخ تفاصيل الطلب'}</button>}
            <p className="note">لا يتم اعتماد سعر أو دفع أو إصدار قبل مراجعة العرض معك.</p>
          </form>}
        </div>
      </div>
    </section>

    <section id="services" className="shell section">
      <div className="sectionTitle"><div><span>خدمات NOVAX</span><h2>كل ما تحتاجه لرحلتك</h2></div><p>تجربة طلب واحدة وواضحة، صممت لتعمل يدويًا اليوم وتنتقل بسلاسة إلى الربط الآلي عند توفر Travelpayouts API.</p></div>
      <div className="services">{(Object.keys(serviceMeta) as Service[]).map(key=>{const item=serviceMeta[key];const Icon=item.icon;return <article key={key}><img src={item.image} alt={item.title}/><div className="shade"/><div className="serviceText"><span><Icon size={21}/></span><h3>{item.title}</h3><p>{item.copy}</p><button onClick={()=>{resetFormState(key);document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})}}>اطلب الآن <ArrowLeft size={16}/></button></div></article>})}</div>
    </section>

    <section id="destinations" className="destinations">
      <div className="shell"><div className="sectionTitle light"><div><span>وجهات ملهمة</span><h2>ابدأ بفكرة، واترك الباقي لنا</h2></div><p>سواء كانت رحلة عمل، عمرة، إجازة عائلية أو عطلة قصيرة، نرتب طلبك حسب احتياجك الحقيقي.</p></div>
        <div className="destGrid"><div className="dest wide" style={{backgroundImage:`url(${makkahImage})`}}><b>مكة المكرمة</b><small>عمرة وإقامة وتنقلات</small></div><div className="dest" style={{backgroundImage:`url(${istanbulImage})`}}><b>إسطنبول</b><small>مدينة وتجارب وثقافة</small></div><div className="dest" style={{backgroundImage:`url(${hotelImage})`}}><b>إقامة مميزة</b><small>فنادق تناسب رحلتك</small></div></div>
      </div>
    </section>

    <section id="how" className="shell section how"><div className="sectionTitle"><div><span>كيف نعمل</span><h2>من الطلب إلى التأكيد</h2></div><p>دورة واضحة تحفظ للعميل التحكم الكامل في القرار والسعر قبل التأكيد.</p></div>
      <div className="steps"><div><i>01</i><MapPin/><h3>أرسل التفاصيل</h3><p>اختر الخدمة والتواريخ وبيانات التواصل.</p></div><div><i>02</i><Clock3/><h3>نراجع ونجهز العرض</h3><p>نتحقق من الخيارات ونرسل السعر والتفاصيل.</p></div><div><i>03</i><BadgeCheck/><h3>وافق ثم أكد</h3><p>لا يتم التأكيد النهائي إلا بعد موافقتك.</p></div></div>
    </section>

    <section className="proof"><div className="shell proofGrid"><div><Star/><strong>تجربة أبسط</strong><span>خطوات واضحة من البداية للنهاية</span></div><div><Users/><strong>خدمة إنسانية</strong><span>متابعة حقيقية لكل طلب</span></div><div><CalendarDays/><strong>مرونة أكبر</strong><span>طيران وفندق وسيارة</span></div><div><ShieldCheck/><strong>شفافية</strong><span>القرار النهائي لك دائمًا</span></div></div></section>

    <footer><div className="shell footer"><div className="brand"><span className="brandMark"><Plane size={21}/></span><span><strong>NOVAX</strong><small>TRAVEL</small></span></div><p>رحلتك، بطريقتك. من اليمن إلى العالم.</p><div><a href="#booking">طلب حجز</a><a href="#services">الخدمات</a></div></div></footer>

    <style jsx>{`
      :global(html){scroll-behavior:smooth;background:#f5f8f8}:global(body){margin:0;background:#f5f8f8;color:#071d28;font-family:Arial,"Noto Sans Arabic",sans-serif}:global(*){box-sizing:border-box}.shell{width:min(1180px,calc(100% - 32px));margin:auto}
      .hero{min-height:860px;color:#fff;background-size:cover;background-position:center;position:relative}.hero:after{content:"";position:absolute;left:0;right:0;bottom:0;height:130px;background:linear-gradient(transparent,#f5f8f8);pointer-events:none}.nav{height:86px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.15);position:relative;z-index:3}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}.brandMark{width:44px;height:44px;border-radius:14px;background:#16b79f;display:grid;place-items:center;box-shadow:0 10px 25px rgba(22,183,159,.24)}.brand strong{display:block;font-size:20px;letter-spacing:1px}.brand small{display:block;font-size:9px;letter-spacing:4px;opacity:.66}.navLinks{display:flex;gap:28px}.navLinks a,.footer a{color:inherit;text-decoration:none;font-size:13px}.navCta{background:#fff;color:#09222d;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:900;font-size:13px}
      .heroGrid{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr .95fr;gap:58px;align-items:center;padding:84px 0 150px}.eyebrow{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);border-radius:999px;font-size:12px;font-weight:800;backdrop-filter:blur(8px)}.heroCopy h1{font-size:clamp(48px,6vw,78px);line-height:1.05;letter-spacing:-2px;margin:22px 0}.heroCopy h1 em{font-style:normal;color:#70e0ce}.heroCopy>p{font-size:17px;line-height:1.95;color:rgba(255,255,255,.8);max-width:650px}.heroActions{display:flex;gap:12px;margin-top:28px}.primary,.secondary{display:inline-flex;align-items:center;gap:8px;padding:14px 20px;border-radius:13px;text-decoration:none;font-weight:900;font-size:14px}.primary{background:#16ad96;color:#fff;box-shadow:0 16px 35px rgba(22,173,150,.27)}.secondary{color:#fff;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.07)}.trust{display:flex;flex-wrap:wrap;gap:18px;margin-top:32px;font-size:12px;color:rgba(255,255,255,.72)}.trust span{display:flex;align-items:center;gap:6px}
      .bookingCard{background:rgba(255,255,255,.97);color:#08232e;border-radius:26px;padding:24px;box-shadow:0 32px 90px rgba(0,12,18,.32);backdrop-filter:blur(16px)}.bookingHead{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.bookingHead span{font-size:11px;color:#0a8a78;font-weight:900;background:#e8f8f5;padding:6px 9px;border-radius:999px}.bookingHead h2{font-size:23px;margin:9px 0 0}.bookingHead b{font-size:10px;color:#5b727c;background:#f1f5f5;padding:7px 9px;border-radius:999px;display:flex;align-items:center;gap:6px}.bookingHead b i{width:7px;height:7px;background:#13af97;border-radius:50%;box-shadow:0 0 0 4px rgba(19,175,151,.1)}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;background:#f0f4f5;padding:6px;border-radius:14px;margin:20px 0}.tabs button{border:0;background:transparent;color:#637983;padding:11px;border-radius:10px;font-weight:900;display:flex;justify-content:center;align-items:center;gap:7px;cursor:pointer}.tabs button.active{background:#fff;color:#098372;box-shadow:0 4px 16px rgba(8,37,48,.08)}.form{display:grid;gap:12px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.field{display:grid;gap:6px}.field span{font-size:11px;font-weight:900;color:#536b75}.field input,.field textarea{width:100%;border:1px solid #dce6e8;background:#fbfcfc;border-radius:11px;padding:12px 13px;font-size:13px;outline:none;color:#092631}.field input:focus,.field textarea:focus{border-color:#18b49c;box-shadow:0 0 0 4px rgba(24,180,156,.1);background:#fff}.field textarea{resize:vertical}.trap{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;opacity:0!important}.submit,.copyBtn,.outlineBtn{border:0;border-radius:12px;padding:14px 16px;font-weight:900;cursor:pointer}.submit{background:#11a78f;color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 10px 25px rgba(17,167,143,.2)}.submit:disabled{opacity:.55;cursor:wait}.copyBtn{background:#edf7f5;color:#087c6c}.note{margin:0;text-align:center;font-size:10px;color:#80949b}.errorBox{border:1px solid #f4caca;background:#fff3f3;color:#a22b2b;border-radius:11px;padding:11px 13px;font-size:12px;line-height:1.6}.success{text-align:center;padding:26px 6px 8px}.success>svg{color:#10ab92}.success h3{font-size:24px;margin:12px 0 6px}.success p{font-size:13px;color:#6b8088}.success strong{display:block;font-size:25px;letter-spacing:1px;color:#087c6c;background:#eaf8f5;padding:13px;border-radius:13px;margin:18px 0}.outlineBtn{border:1px solid #cadbdd;background:#fff;color:#274852}
      .section{padding:96px 0}.sectionTitle{display:flex;justify-content:space-between;align-items:end;gap:40px;margin-bottom:35px}.sectionTitle span{font-size:11px;font-weight:900;color:#0a8d7b;background:#e6f8f4;padding:7px 10px;border-radius:999px}.sectionTitle h2{font-size:38px;letter-spacing:-1px;margin:12px 0 0}.sectionTitle>p{max-width:520px;color:#657d87;font-size:14px;line-height:1.9;margin:0}.services{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.services article{height:420px;border-radius:22px;overflow:hidden;position:relative;color:#fff;box-shadow:0 18px 40px rgba(7,29,40,.12)}.services img{width:100%;height:100%;object-fit:cover;transition:.5s}.services article:hover img{transform:scale(1.04)}.shade{position:absolute;inset:0;background:linear-gradient(transparent 20%,rgba(2,18,27,.87))}.serviceText{position:absolute;left:0;right:0;bottom:0;padding:25px}.serviceText>span{width:42px;height:42px;border-radius:13px;background:#16ae97;display:grid;place-items:center}.serviceText h3{font-size:24px;margin:13px 0 7px}.serviceText p{font-size:12px;line-height:1.7;color:rgba(255,255,255,.78)}.serviceText button{border:0;background:transparent;color:#72e2cf;font-weight:900;padding:0;display:flex;align-items:center;gap:7px;cursor:pointer}
      .destinations{background:#06202d;color:#fff;padding:96px 0}.sectionTitle.light span{background:rgba(113,224,207,.12);color:#75e0ce}.sectionTitle.light>p{color:#9db0b8}.destGrid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:16px}.dest{height:315px;border-radius:20px;background-size:cover;background-position:center;position:relative;overflow:hidden;padding:24px;display:flex;flex-direction:column;justify-content:flex-end}.dest:before{content:"";position:absolute;inset:0;background:linear-gradient(transparent 35%,rgba(2,18,25,.8))}.dest b,.dest small{position:relative;z-index:1}.dest b{font-size:25px}.dest small{color:rgba(255,255,255,.7);margin-top:6px}.how .sectionTitle span{color:#078a78}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.steps>div{background:#fff;border:1px solid #e0e8ea;border-radius:20px;padding:25px;box-shadow:0 12px 30px rgba(8,37,48,.05)}.steps i{font-style:normal;color:#0aa18b;font-size:11px;font-weight:900}.steps svg{display:block;margin:20px 0 10px;color:#0aa18b}.steps h3{margin:0;font-size:18px}.steps p{color:#748991;font-size:12px;line-height:1.7;margin-bottom:0}.proof{background:#fff;border-top:1px solid #e6edef;border-bottom:1px solid #e6edef}.proofGrid{display:grid;grid-template-columns:repeat(4,1fr);padding:35px 0}.proofGrid>div{padding:10px 22px;border-left:1px solid #e5ecee}.proofGrid>div:last-child{border-left:0}.proof svg{color:#0aa28c}.proof strong,.proof span{display:block}.proof strong{font-size:14px;margin-top:10px}.proof span{font-size:11px;color:#71878f;margin-top:5px}.footer{min-height:150px;display:flex;align-items:center;justify-content:space-between;gap:25px}.footer .brand{color:#08232e}.footer p{color:#70858d;font-size:12px}.footer>div{display:flex;gap:18px;color:#506b75}
      @media(max-width:900px){.navLinks{display:none}.heroGrid{grid-template-columns:1fr;gap:38px;padding-top:55px}.heroCopy{text-align:center}.heroCopy>p{margin-left:auto;margin-right:auto}.heroActions,.trust{justify-content:center}.hero{min-height:auto}.bookingCard{max-width:650px;width:100%;margin:auto}.services{grid-template-columns:1fr}.services article{height:360px}.destGrid{grid-template-columns:1fr 1fr}.dest.wide{grid-column:1/-1}.steps{grid-template-columns:1fr}.proofGrid{grid-template-columns:1fr 1fr}.proofGrid>div{border-left:0;border-bottom:1px solid #e5ecee}.sectionTitle{align-items:start;flex-direction:column;gap:15px}.sectionTitle h2{font-size:32px}}
      @media(max-width:580px){.shell{width:min(100% - 22px,1180px)}.nav{height:72px}.navCta{padding:10px 13px;font-size:11px}.brandMark{width:39px;height:39px}.heroGrid{padding:42px 0 115px}.heroCopy h1{font-size:43px;letter-spacing:-1.5px}.heroCopy>p{font-size:15px}.heroActions{flex-direction:column}.primary,.secondary{justify-content:center}.trust{gap:10px}.bookingCard{padding:17px;border-radius:20px}.bookingHead b{display:none}.grid2{grid-template-columns:1fr}.section{padding:72px 0}.services article{height:340px}.destGrid{grid-template-columns:1fr}.dest.wide{grid-column:auto}.dest{height:260px}.proofGrid{grid-template-columns:1fr}.footer{flex-direction:column;justify-content:center;text-align:center;padding:30px 0}}
    `}</style>
  </main>;
}
