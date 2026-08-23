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
  Star,
  Users,
} from 'lucide-react';

type Service = 'flight' | 'hotel' | 'car';

const heroImage = 'https://images.unsplash.com/photo-1767734715858-0b08e85224f6?auto=format&fit=crop&fm=jpg&q=82&w=2400';
const flightImage = 'https://images.unsplash.com/photo-1775309142261-a0c9c1921717?auto=format&fit=crop&fm=jpg&q=82&w=1400';
const hotelImage = 'https://images.unsplash.com/photo-1776761363416-c58a8fe7c711?auto=format&fit=crop&fm=jpg&q=82&w=1400';
const carImage = 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?auto=format&fit=crop&fm=jpg&q=82&w=1400';

const serviceMeta = {
  flight: {
    label: 'الطيران',
    icon: Plane,
    title: 'رحلات الطيران',
    copy: 'أرسل تفاصيل رحلتك وسنراجع أفضل الخيارات المتاحة ونجهز لك عرضًا واضحًا قبل التأكيد.',
    image: flightImage,
  },
  hotel: {
    label: 'الفنادق',
    icon: Hotel,
    title: 'حجوزات الفنادق',
    copy: 'اختر الوجهة والتواريخ وعدد الضيوف وسنجهز لك خيارات مناسبة حسب ميزانيتك وتفضيلاتك.',
    image: hotelImage,
  },
  car: {
    label: 'السيارات',
    icon: Car,
    title: 'تأجير السيارات',
    copy: 'حدد مكان الاستلام والتسليم والتواريخ وسنجهز لك أفضل خيار متاح حسب طلبك.',
    image: carImage,
  },
} as const;

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

export default function HomePage() {
  const [service, setService] = useState<Service>('flight');
  const [requestSent, setRequestSent] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [copied, setCopied] = useState(false);

  const active = useMemo(() => serviceMeta[service], [service]);

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = Array.from(form.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${value}`);

    const text = [`طلب ${active.label} جديد - NOVAX Travel`, ...lines].join('\n');
    setRequestText(text);
    setRequestSent(true);
    setCopied(false);
  };

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main dir="rtl">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,23,38,.88), rgba(5,23,38,.48)), url(${heroImage})` }}>
        <nav className="nav shell">
          <a className="brand" href="#top" aria-label="NOVAX Travel">
            <span className="brandMark"><Plane size={22} /></span>
            <span><strong>NOVAX</strong><small>TRAVEL</small></span>
          </a>
          <div className="navLinks">
            <a href="#services">الخدمات</a>
            <a href="#how">كيف نعمل</a>
            <a href="#destinations">الوجهات</a>
          </div>
          <a className="navCta" href="#booking">ابدأ الحجز</a>
        </nav>

        <div id="top" className="heroContent shell">
          <div className="heroText">
            <div className="eyebrow"><Globe2 size={16} /> من اليمن إلى العالم</div>
            <h1>رحلتك تبدأ هنا.<br /><span>أسهل، أوضح، وأجمل.</span></h1>
            <p>احجز طيرانك، فندقك أو سيارتك من مكان واحد. نراجع طلبك بعناية ونجهز لك العرض المناسب قبل التأكيد.</p>
            <div className="heroActions">
              <a className="primaryBtn" href="#booking">اطلب عرض الآن <ArrowLeft size={18} /></a>
              <a className="ghostBtn" href="#services">استكشف الخدمات</a>
            </div>
            <div className="trustRow">
              <span><ShieldCheck size={18} /> خدمة موثوقة</span>
              <span><Headphones size={18} /> دعم مباشر</span>
              <span><BadgeCheck size={18} /> تأكيد واضح</span>
            </div>
          </div>

          <div id="booking" className="bookingCard">
            <div className="bookingTop">
              <div>
                <span className="miniLabel">طلب حجز جديد</span>
                <h2>ماذا تريد أن تحجز؟</h2>
              </div>
              <span className="liveBadge"><span /> جاهز لاستقبال الطلبات</span>
            </div>

            <div className="tabs" role="tablist" aria-label="خدمات الحجز">
              {(Object.keys(serviceMeta) as Service[]).map((key) => {
                const item = serviceMeta[key];
                const Icon = item.icon;
                return (
                  <button key={key} type="button" className={service === key ? 'tab active' : 'tab'} onClick={() => { setService(key); setRequestSent(false); }}>
                    <Icon size={18} /> {item.label}
                  </button>
                );
              })}
            </div>

            {!requestSent ? (
              <form className="bookingForm" onSubmit={submitRequest}>
                {service === 'flight' && (
                  <>
                    <div className="grid2"><Field label="من" name="من" placeholder="مثال: عدن" /><Field label="إلى" name="إلى" placeholder="مثال: القاهرة" /></div>
                    <div className="grid2"><Field label="تاريخ الذهاب" name="تاريخ الذهاب" type="date" /><Field label="تاريخ العودة" name="تاريخ العودة" type="date" required={false} /></div>
                    <div className="grid2"><Field label="عدد المسافرين" name="عدد المسافرين" type="number" placeholder="1" /><Field label="درجة السفر" name="درجة السفر" placeholder="اقتصادية / أعمال" required={false} /></div>
                  </>
                )}
                {service === 'hotel' && (
                  <>
                    <Field label="المدينة أو الوجهة" name="الوجهة" placeholder="مثال: مكة، دبي، إسطنبول" />
                    <div className="grid2"><Field label="تسجيل الدخول" name="تسجيل الدخول" type="date" /><Field label="تسجيل الخروج" name="تسجيل الخروج" type="date" /></div>
                    <div className="grid2"><Field label="عدد الضيوف" name="عدد الضيوف" type="number" placeholder="2" /><Field label="عدد الغرف" name="عدد الغرف" type="number" placeholder="1" /></div>
                  </>
                )}
                {service === 'car' && (
                  <>
                    <div className="grid2"><Field label="مكان الاستلام" name="مكان الاستلام" placeholder="المطار أو المدينة" /><Field label="مكان التسليم" name="مكان التسليم" placeholder="نفس المكان أو موقع آخر" /></div>
                    <div className="grid2"><Field label="تاريخ الاستلام" name="تاريخ الاستلام" type="date" /><Field label="تاريخ التسليم" name="تاريخ التسليم" type="date" /></div>
                    <Field label="نوع السيارة المفضل" name="نوع السيارة" placeholder="اقتصادية، SUV، عائلية..." required={false} />
                  </>
                )}
                <div className="grid2"><Field label="الاسم" name="الاسم" placeholder="اسم صاحب الطلب" /><Field label="رقم التواصل" name="رقم التواصل" placeholder="مع رمز الدولة" /></div>
                <label className="field"><span>ملاحظات إضافية</span><textarea name="ملاحظات" rows={3} placeholder="أي تفاصيل تساعدنا على تجهيز العرض" /></label>
                <button className="searchBtn" type="submit"><Search size={18} /> إرسال طلب عرض</button>
                <p className="formNote">لا يتم أي دفع أو تأكيد نهائي قبل مراجعة العرض معك.</p>
              </form>
            ) : (
              <div className="successBox">
                <CheckCircle2 size={48} />
                <h3>تم تجهيز طلبك</h3>
                <p>الطلب جاهز للإرسال لفريق NOVAX. انسخه الآن، وسنربط الإرسال المباشر بالنظام بمجرد تفعيل قناة الاستقبال.</p>
                <pre>{requestText}</pre>
                <button className="searchBtn" type="button" onClick={copyRequest}>{copied ? 'تم النسخ ✓' : 'نسخ تفاصيل الطلب'}</button>
                <button className="textBtn" type="button" onClick={() => setRequestSent(false)}>تعديل الطلب</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="section shell">
        <div className="sectionHead">
          <div><span className="miniLabel green">خدمات NOVAX</span><h2>كل رحلتك في مكان واحد</h2></div>
          <p>نفس تجربة الطلب الواضحة لكل خدمة، مع إمكانية ربط المزودين وTravelpayouts لاحقًا دون تغيير تجربة العميل.</p>
        </div>
        <div className="serviceGrid">
          {(Object.keys(serviceMeta) as Service[]).map((key) => {
            const item = serviceMeta[key];
            const Icon = item.icon;
            return (
              <article className="serviceCard" key={key}>
                <img src={item.image} alt={item.title} />
                <div className="serviceOverlay" />
                <div className="serviceContent">
                  <span className="serviceIcon"><Icon size={22} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <button type="button" onClick={() => { setService(key); setRequestSent(false); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}>اطلب الآن <ArrowLeft size={16} /></button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="destinations" className="destinations">
        <div className="shell">
          <div className="sectionHead light">
            <div><span className="miniLabel">وجهات ملهمة</span><h2>خطط لرحلتك القادمة</h2></div>
            <p>من رحلات العمل إلى الإجازات العائلية والعمرة، NOVAX يبني طلبك حول احتياجك الحقيقي.</p>
          </div>
          <div className="destinationGrid">
            <div className="destination big" style={{ backgroundImage: `url(${heroImage})` }}><span>دبي</span><small>مدينة، شاطئ، وتجارب عالمية</small></div>
            <div className="destination" style={{ backgroundImage: `url(${hotelImage})` }}><span>إقامة مميزة</span><small>فنادق ومنتجعات مختارة</small></div>
            <div className="destination" style={{ backgroundImage: `url(${carImage})` }}><span>رحلات برية</span><small>سيارة تناسب رحلتك</small></div>
          </div>
        </div>
      </section>

      <section id="how" className="section shell howSection">
        <div className="sectionHead">
          <div><span className="miniLabel green">كيف نعمل</span><h2>ثلاث خطوات فقط</h2></div>
          <p>تجربة بسيطة اليوم، ومصممة لتتطور لاحقًا إلى حجز آلي كامل عند توفر الـAPI.</p>
        </div>
        <div className="steps">
          <div className="step"><span>01</span><MapPin size={24} /><h3>حدد طلبك</h3><p>اختر طيران أو فندق أو سيارة وأرسل التواريخ والتفاصيل.</p></div>
          <div className="step"><span>02</span><Clock3 size={24} /><h3>نراجع الخيارات</h3><p>نجهز العرض المناسب ونتأكد من السعر والتفاصيل قبل التأكيد.</p></div>
          <div className="step"><span>03</span><BadgeCheck size={24} /><h3>أكد واحجز</h3><p>بعد موافقتك يتم التأكيد ومتابعة الطلب حتى اكتماله.</p></div>
        </div>
      </section>

      <section className="confidence">
        <div className="shell confidenceInner">
          <div><Star size={28} /><strong>تجربة سفر أبسط</strong><span>وضوح من أول طلب حتى التأكيد</span></div>
          <div><Users size={28} /><strong>خدمة إنسانية</strong><span>مراجعة حقيقية لاحتياج كل عميل</span></div>
          <div><CalendarDays size={28} /><strong>مرونة أعلى</strong><span>رحلات، فنادق وسيارات في طلب واحد</span></div>
          <div><ShieldCheck size={28} /><strong>أمان وشفافية</strong><span>لا تأكيد قبل موافقتك النهائية</span></div>
        </div>
      </section>

      <footer>
        <div className="shell footerInner">
          <div className="brand footerBrand"><span className="brandMark"><Plane size={22} /></span><span><strong>NOVAX</strong><small>TRAVEL</small></span></div>
          <p>رحلتك، بطريقتك. منصة سفر حديثة تبدأ من اليمن إلى العالم.</p>
          <div className="footerLinks"><a href="#booking">طلب حجز</a><a href="#services">الخدمات</a><a href="https://admin.novaxtravel.com">الإدارة</a></div>
        </div>
      </footer>

      <style jsx>{`
        :global(html){scroll-behavior:smooth;background:#f5f8fa}
        :global(body){margin:0;font-family:Inter,Arial,sans-serif;background:#f5f8fa;color:#0b1f2a}
        :global(*){box-sizing:border-box}
        .shell{width:min(1180px,calc(100% - 32px));margin:0 auto}
        .hero{min-height:850px;background-size:cover;background-position:center;position:relative;color:white}
        .hero:after{content:'';position:absolute;inset:auto 0 0;height:160px;background:linear-gradient(transparent,#f5f8fa);pointer-events:none}
        .nav{height:88px;display:flex;align-items:center;justify-content:space-between;position:relative;z-index:2;border-bottom:1px solid rgba(255,255,255,.16)}
        .brand{display:flex;align-items:center;gap:10px;color:white;text-decoration:none}.brandMark{width:44px;height:44px;border-radius:14px;background:#18b7a2;display:grid;place-items:center;box-shadow:0 8px 24px rgba(24,183,162,.28)}.brand strong{display:block;font-size:20px;letter-spacing:.8px}.brand small{display:block;font-size:9px;letter-spacing:4px;opacity:.75;margin-top:2px}
        .navLinks{display:flex;gap:28px}.navLinks a,.footerLinks a{color:inherit;text-decoration:none;font-size:14px}.navCta{background:white;color:#0b2834!important;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:800;font-size:13px}
        .heroContent{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr .95fr;gap:60px;align-items:center;padding:88px 0 150px}
        .heroText{padding-top:12px}.eyebrow,.miniLabel{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:800;letter-spacing:.2px;padding:8px 11px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(255,255,255,.1);backdrop-filter:blur(10px)}.miniLabel.green{color:#0d8f7d;background:#e8fbf7;border-color:#c8f1e9}.heroText h1{font-size:clamp(46px,6vw,78px);line-height:1.03;margin:20px 0 22px;letter-spacing:-2.5px}.heroText h1 span{color:#70dfce}.heroText p{font-size:18px;line-height:1.9;max-width:640px;color:rgba(255,255,255,.82)}
        .heroActions{display:flex;gap:12px;margin-top:30px}.primaryBtn,.ghostBtn{display:inline-flex;align-items:center;gap:9px;padding:14px 20px;border-radius:13px;text-decoration:none;font-weight:900;font-size:14px}.primaryBtn{background:#18b7a2;color:white;box-shadow:0 14px 36px rgba(24,183,162,.32)}.ghostBtn{border:1px solid rgba(255,255,255,.28);color:white;background:rgba(255,255,255,.08);backdrop-filter:blur(8px)}
        .trustRow{display:flex;flex-wrap:wrap;gap:18px;margin-top:34px;color:rgba(255,255,255,.78);font-size:12px}.trustRow span{display:flex;align-items:center;gap:7px}
        .bookingCard{background:rgba(255,255,255,.97);color:#0b1f2a;border-radius:26px;padding:24px;box-shadow:0 28px 80px rgba(2,13,20,.28);border:1px solid rgba(255,255,255,.75);backdrop-filter:blur(18px)}.bookingTop{display:flex;align-items:start;justify-content:space-between;gap:12px}.bookingTop h2{font-size:22px;margin:8px 0 0}.bookingTop .miniLabel{color:#148e7f;background:#eaf9f6;border-color:#d8f3ee;padding:6px 9px}.liveBadge{font-size:10px;color:#42616e;display:flex;align-items:center;gap:6px;background:#f0f6f7;padding:7px 9px;border-radius:999px}.liveBadge span{width:7px;height:7px;background:#17b79f;border-radius:50%;box-shadow:0 0 0 4px rgba(23,183,159,.12)}
        .tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:#f1f5f6;padding:6px;border-radius:14px;margin:20px 0}.tab{border:0;border-radius:10px;padding:11px 8px;background:transparent;color:#607681;font-weight:800;display:flex;align-items:center;justify-content:center;gap:7px;cursor:pointer}.tab.active{background:white;color:#0c8174;box-shadow:0 4px 16px rgba(10,41,53,.08)}
        .bookingForm{display:grid;gap:12px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.field{display:grid;gap:6px}.field span{font-size:11px;font-weight:800;color:#506a75}.field input,.field textarea{width:100%;border:1px solid #dce6e9;background:#fbfcfd;border-radius:11px;padding:12px 13px;outline:none;color:#0c2632;font-size:13px;transition:.2s}.field input:focus,.field textarea:focus{border-color:#21b9a5;box-shadow:0 0 0 4px rgba(33,185,165,.1);background:white}.field textarea{resize:vertical}.searchBtn{border:0;border-radius:12px;padding:14px 16px;background:#13a991;color:white;font-weight:900;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 9px 24px rgba(19,169,145,.22)}.formNote{margin:0;text-align:center;color:#78909a;font-size:10px}.successBox{text-align:center;padding:24px 4px 6px}.successBox>svg{color:#12aa92}.successBox h3{font-size:23px;margin:10px 0 7px}.successBox p{color:#6a8089;font-size:13px;line-height:1.7}.successBox pre{text-align:right;white-space:pre-wrap;background:#f4f8f8;border:1px solid #e1ebed;padding:14px;border-radius:12px;font:12px/1.7 monospace;max-height:180px;overflow:auto}.textBtn{border:0;background:transparent;color:#0d8879;font-weight:800;margin-top:10px;cursor:pointer}
        .section{padding:100px 0}.sectionHead{display:flex;align-items:end;justify-content:space-between;gap:40px;margin-bottom:36px}.sectionHead h2{font-size:38px;letter-spacing:-1px;margin:11px 0 0}.sectionHead>p{max-width:520px;line-height:1.9;color:#68808a;font-size:14px;margin:0}.serviceGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.serviceCard{height:430px;position:relative;border-radius:22px;overflow:hidden;background:#0b1f2a;box-shadow:0 18px 45px rgba(19,39,48,.12)}.serviceCard img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.serviceCard:hover img{transform:scale(1.04)}.serviceOverlay{position:absolute;inset:0;background:linear-gradient(transparent 28%,rgba(4,21,31,.92))}.serviceContent{position:absolute;inset:auto 24px 24px;color:white}.serviceIcon{width:44px;height:44px;border-radius:13px;background:#18b7a2;display:grid;place-items:center;margin-bottom:14px}.serviceContent h3{font-size:24px;margin:0 0 8px}.serviceContent p{font-size:12px;line-height:1.7;color:rgba(255,255,255,.75);min-height:62px}.serviceContent button{border:0;background:transparent;color:#7be2d2;font-weight:900;padding:0;display:flex;gap:8px;align-items:center;cursor:pointer}
        .destinations{background:#071d28;color:white;padding:90px 0}.sectionHead.light>p{color:#abc0c9}.sectionHead.light .miniLabel{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.14)}.destinationGrid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:16px}.destination{min-height:330px;border-radius:22px;background-size:cover;background-position:center;position:relative;overflow:hidden;padding:24px;display:flex;flex-direction:column;justify-content:end}.destination:before{content:'';position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(3,17,25,.82))}.destination span,.destination small{position:relative}.destination span{font-size:28px;font-weight:900}.destination small{color:rgba(255,255,255,.72);margin-top:6px}.destination.big{min-height:420px}
        .howSection{padding-bottom:110px}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.step{background:white;border:1px solid #e6edef;border-radius:20px;padding:26px;position:relative}.step>span{position:absolute;left:20px;top:18px;font-size:34px;font-weight:900;color:#e5efef}.step>svg{color:#10a68f;margin-bottom:28px}.step h3{font-size:19px;margin:0 0 8px}.step p{font-size:13px;line-height:1.8;color:#6e838b;margin:0}
        .confidence{background:#ecf8f6;border-top:1px solid #dcf0ec;border-bottom:1px solid #dcf0ec}.confidenceInner{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:34px 0}.confidenceInner>div{display:grid;gap:6px}.confidenceInner svg{color:#0fa78f}.confidenceInner strong{font-size:14px}.confidenceInner span{font-size:11px;color:#698087;line-height:1.6}
        footer{background:#061923;color:#d6e4e8;padding:46px 0}.footerInner{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:32px}.footerBrand{color:white}.footerInner p{font-size:12px;color:#8ca5ae}.footerLinks{display:flex;gap:18px;color:#c7d7dc}
        @media(max-width:900px){.navLinks{display:none}.hero{min-height:auto}.heroContent{grid-template-columns:1fr;padding:58px 0 130px;gap:34px}.heroText{text-align:center}.heroText p{margin-left:auto;margin-right:auto}.heroActions,.trustRow{justify-content:center}.section{padding:72px 0}.sectionHead{align-items:start;flex-direction:column;gap:14px}.serviceGrid,.steps{grid-template-columns:1fr}.serviceCard{height:360px}.destinationGrid{grid-template-columns:1fr 1fr}.destination.big{grid-column:1/-1}.confidenceInner{grid-template-columns:1fr 1fr}.footerInner{grid-template-columns:1fr;text-align:center;justify-items:center}}
        @media(max-width:560px){.shell{width:min(100% - 22px,1180px)}.nav{height:74px}.navCta{padding:10px 13px}.heroContent{padding-top:40px}.heroText h1{font-size:43px;letter-spacing:-1.5px}.heroText p{font-size:15px}.heroActions{flex-direction:column}.heroActions a{justify-content:center}.bookingCard{padding:17px;border-radius:20px}.bookingTop{display:block}.liveBadge{display:none}.grid2{grid-template-columns:1fr}.tabs{gap:4px}.tab{font-size:12px}.sectionHead h2{font-size:31px}.destinationGrid{grid-template-columns:1fr}.destination.big{grid-column:auto}.destination,.destination.big{min-height:300px}.confidenceInner{grid-template-columns:1fr}.trustRow{font-size:11px}.footerLinks{flex-wrap:wrap;justify-content:center}}
      `}</style>
    </main>
  );
}
