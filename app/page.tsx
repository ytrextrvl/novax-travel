export const metadata = {
  title: "NOVAX TRAVEL — Seamless travel from Yemen to the world",
  description: "Flights, hotels, and visas—simple, secure, and fast."
};

export default function Page() {
  return (
    <main className="page" lang="ar" dir="rtl">
      <header className="header">
        <div className="container nav">
          <div className="brand">
            <div className="mark" aria-hidden="true" />
            <div className="brandText">
              <div className="brandName">NOVAX TRAVEL</div>
              <div className="brandTag">نوفاكس للسفر</div>
            </div>
          </div>

          <div className="navActions">
            <a className="link" href="#services">الخدمات</a>
            <a className="link" href="#why">لماذا نوفاكس</a>
            <a className="btnGhost" href="#contact">تواصل</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="pill">من اليمن إلى العالم — تجربة راقية وموثوقة</div>
            <h1>احجز رحلتك بثقة وبواجهة عالمية</h1>
            <p className="sub">
              طيران، فنادق، وتأشيرات — طلب سريع، متابعة واضحة، ودفع آمن عبر التحويل البنكي.
            </p>

            <div className="heroCtas">
              <a className="btn" href="#search">ابدأ البحث</a>
              <a className="btnSoft" href="#services">استعرض الخدمات</a>
            </div>

            <div className="trust">
              <div className="trustItem"><span className="dot" /> دعم 24/7</div>
              <div className="trustItem"><span className="dot" /> أسعار واضحة</div>
              <div className="trustItem"><span className="dot" /> أمان وخصوصية</div>
            </div>
          </div>

          <div className="card" id="search">
            <div className="cardTitle">بحث سريع</div>
            <div className="grid2">
              <label className="field">
                <span>الوجهة</span>
                <input placeholder="مثال: Istanbul, Cairo, Dubai" />
              </label>
              <label className="field">
                <span>نوع الخدمة</span>
                <select>
                  <option>طيران</option>
                  <option>فنادق</option>
                  <option>تأشيرات</option>
                </select>
              </label>
              <label className="field">
                <span>تاريخ</span>
                <input type="date" />
              </label>
              <label className="field">
                <span>المسافرين</span>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </label>
            </div>

            <button className="btnFull" type="button">بحث</button>

            <div className="hint">
              ملاحظة: هذا نموذج واجهة (UI). الربط مع مزود الطيران/الفنادق يتم لاحقاً عبر API.
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="why">
        <div className="container">
          <h2>لماذا NOVAX؟</h2>
          <p className="sectionSub">معايير عالمية + خبرة محلية داخل اليمن.</p>

          <div className="cards3">
            <div className="mini">
              <div className="miniTitle">آمن وموثوق</div>
              <div className="miniText">حماية وخصوصية، وسجل طلبات واضح.</div>
            </div>
            <div className="mini">
              <div className="miniTitle">تغطية واسعة</div>
              <div className="miniText">وجهات متعددة وخيارات مناسبة لاحتياجك.</div>
            </div>
            <div className="mini">
              <div className="miniTitle">دعم سريع</div>
              <div className="miniText">فريق محلي يرد بسرعة وباحتراف.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <h2>الخدمات</h2>
          <p className="sectionSub">كل شيء في مكان واحد.</p>

          <div className="cards3">
            <div className="mini">
              <div className="miniTitle">الطيران</div>
              <div className="miniText">بحث وطلب تسعير ومتابعة حتى إصدار التذكرة.</div>
            </div>
            <div className="mini">
              <div className="miniTitle">الفنادق</div>
              <div className="miniText">خيارات متعددة وتأكيد واضح للحجز.</div>
            </div>
            <div className="mini">
              <div className="miniTitle">التأشيرات</div>
              <div className="miniText">طلب مستندات وخطوات منظمة من البداية للنهاية.</div>
            </div>
          </div>

          <div className="cta">
            <div>
              <div className="ctaTitle">جاهز لتحويلها لمنتج عالمي فعلي؟</div>
              <div className="ctaText">نثبت الواجهة أولاً، ثم نربط البحث الحقيقي وطلبات الدفع والتتبع.</div>
            </div>
            <a className="btn" href="#contact">تواصل الآن</a>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container footerGrid">
          <div>
            <div className="footerBrand">NOVAX TRAVEL</div>
            <div className="footerText">شريكك الموثوق للسفر داخل اليمن وخارجها.</div>
          </div>
          <div className="footerCol">
            <div className="footerTitle">تواصل</div>
            <div className="footerText">Sana’a, Yemen</div>
            <div className="footerText">support@novaxtravel.com</div>
            <div className="footerText">+967 77 000 0000</div>
          </div>
          <div className="footerCol">
            <div className="footerTitle">روابط</div>
            <a className="footerLink" href="#services">الخدمات</a>
            <a className="footerLink" href="#why">لماذا نوفاكس</a>
            <a className="footerLink" href="#search">البحث</a>
          </div>
        </div>
        <div className="container copyright">© {new Date().getFullYear()} NOVAX TRAVEL. All rights reserved.</div>
      </footer>

      <style jsx>{`
        :global(html, body) { margin: 0; padding: 0; background: #070b14; color: #e8edf6; }
        :global(*) { box-sizing: border-box; }
        :global(a) { color: inherit; text-decoration: none; }
        .page { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; }
        .container { width: min(1100px, calc(100% - 32px)); margin: 0 auto; }
        .header { position: sticky; top: 0; z-index: 20; backdrop-filter: blur(10px); background: rgba(7,11,20,.55); border-bottom: 1px solid rgba(255,255,255,.06); }
        .nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; gap: 14px; }
        .brand { display: flex; gap: 10px; align-items: center; }
        .mark { width: 36px; height: 36px; border-radius: 12px; background: radial-gradient(circle at 30% 30%, #20bfa9, transparent 55%), radial-gradient(circle at 70% 40%, #f47c1c, transparent 55%), linear-gradient(135deg, #1b365d, #0b1226); border: 1px solid rgba(255,255,255,.14); }
        .brandName { font-weight: 800; letter-spacing: .4px; }
        .brandTag { font-size: 12px; color: rgba(232,237,246,.72); margin-top: 2px; }
        .navActions { display: flex; align-items: center; gap: 14px; }
        .link { font-size: 14px; color: rgba(232,237,246,.85); padding: 8px 10px; border-radius: 10px; }
        .link:hover { background: rgba(255,255,255,.06); }
        .btnGhost { font-size: 14px; padding: 9px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.04); }
        .btnGhost:hover { background: rgba(255,255,255,.08); }

        .hero { padding: 44px 0 28px; background:
          radial-gradient(900px 400px at 15% 5%, rgba(32,191,169,.18), transparent 60%),
          radial-gradient(900px 400px at 85% 15%, rgba(244,124,28,.16), transparent 60%),
          radial-gradient(900px 500px at 50% 90%, rgba(27,54,93,.45), transparent 55%);
        }
        .heroGrid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 20px; align-items: start; }
        .pill { display: inline-flex; padding: 7px 10px; border-radius: 999px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.04); color: rgba(232,237,246,.9); font-size: 13px; }
        h1 { margin: 14px 0 10px; font-size: clamp(28px, 4.2vw, 44px); line-height: 1.12; letter-spacing: .2px; }
        .sub { margin: 0 0 18px; color: rgba(232,237,246,.78); font-size: 15px; line-height: 1.7; max-width: 56ch; }
        .heroCtas { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 11px 14px; border-radius: 14px; background: linear-gradient(135deg, #20bfa9, #1b365d); border: 1px solid rgba(255,255,255,.12); font-weight: 700; }
        .btn:hover { filter: brightness(1.05); }
        .btnSoft { display: inline-flex; align-items: center; justify-content: center; padding: 11px 14px; border-radius: 14px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); font-weight: 700; }
        .btnSoft:hover { background: rgba(255,255,255,.09); }

        .trust { display: flex; gap: 14px; margin-top: 16px; flex-wrap: wrap; }
        .trustItem { display: inline-flex; align-items: center; gap: 8px; color: rgba(232,237,246,.78); font-size: 13px; }
        .dot { width: 9px; height: 9px; border-radius: 50%; background: #20bfa9; box-shadow: 0 0 0 4px rgba(32,191,169,.12); }

        .card { border-radius: 18px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); padding: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.35); }
        .cardTitle { font-weight: 800; margin-bottom: 10px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .field { display: grid; gap: 6px; }
        .field span { font-size: 12px; color: rgba(232,237,246,.72); }
        input, select {
          width: 100%;
          padding: 11px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(7,11,20,.65);
          color: #e8edf6;
          outline: none;
        }
        input:focus, select:focus { border-color: rgba(32,191,169,.55); box-shadow: 0 0 0 4px rgba(32,191,169,.12); }
        .btnFull { margin-top: 12px; width: 100%; padding: 12px 14px; border-radius: 14px; background: linear-gradient(135deg, #f47c1c, #20bfa9); border: 1px solid rgba(255,255,255,.12); font-weight: 800; cursor: pointer; color: #071014; }
        .btnFull:hover { filter: brightness(1.03); }
        .hint { margin-top: 10px; font-size: 12px; color: rgba(232,237,246,.62); line-height: 1.6; }

        .section { padding: 40px 0; border-top: 1px solid rgba(255,255,255,.06); }
        h2 { margin: 0; font-size: 22px; letter-spacing: .2px; }
        .sectionSub { margin: 8px 0 16px; color: rgba(232,237,246,.72); }
        .cards3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .mini { border-radius: 16px; border: 1px solid rgba(255,255,255,.10); background: rgba(255,255,255,.04); padding: 14px; }
        .miniTitle { font-weight: 800; margin-bottom: 6px; }
        .miniText { color: rgba(232,237,246,.72); font-size: 14px; line-height: 1.6; }

        .cta { margin-top: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; border-radius: 18px; border: 1px solid rgba(255,255,255,.12); background: radial-gradient(600px 200px at 20% 10%, rgba(32,191,169,.16), transparent 60%), rgba(255,255,255,.04); }
        .ctaTitle { font-weight: 900; margin-bottom: 4px; }
        .ctaText { color: rgba(232,237,246,.72); font-size: 14px; }

        .footer { padding: 26px 0 18px; border-top: 1px solid rgba(255,255,255,.06); background: rgba(0,0,0,.18); }
        .footerGrid { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; }
        .footerBrand { font-weight: 900; }
        .footerTitle { font-weight: 800; margin-bottom: 8px; }
        .footerText { color: rgba(232,237,246,.72); font-size: 14px; line-height: 1.7; }
        .footerLink { display: block; padding: 6px 0; color: rgba(232,237,246,.85); font-size: 14px; }
        .footerLink:hover { text-decoration: underline; }
        .copyright { margin-top: 14px; color: rgba(232,237,246,.55); font-size: 12px; }

        @media (max-width: 900px) {
          .heroGrid { grid-template-columns: 1fr; }
          .cards3 { grid-template-columns: 1fr; }
          .grid2 { grid-template-columns: 1fr; }
          .footerGrid { grid-template-columns: 1fr; }
          .navActions { gap: 8px; }
        }
      `}</style>
    </main>
  );
}
