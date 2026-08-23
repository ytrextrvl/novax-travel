'use client';

import { PlaneTakeoff, User } from 'lucide-react';
import DownloadApkButton from '@/components/DownloadApkButton';

const popularFlights = [
  { from: 'CAI', to: 'IST', duration: '2h 15m', price: '$420' },
  { from: 'DXB', to: 'LHR', duration: '7h 30m', price: '$650' },
  { from: 'JED', to: 'CAI', duration: '2h 00m', price: '$180' },
];

export default function HomePage() {
  return (
    <main className="novaxPage">
      <header className="appBar">
        <div className="appBarInner">
          <div className="appTitle">NOVAX Travel</div>
          <button className="profileButton" type="button" aria-label="Profile">
            <User size={22} strokeWidth={2} />
          </button>
        </div>
      </header>

      <section className="content">
        <div className="downloadRow">
          <div>
            <div className="downloadTitle">NOVAX on Android</div>
            <div className="downloadText">Install the same NOVAX experience on your phone.</div>
          </div>
          <DownloadApkButton className="downloadButton" />
        </div>

        <section className="searchCard" aria-label="Flight search">
          <label className="field">
            <span className="srOnly">From</span>
            <input type="text" placeholder="From" autoComplete="off" />
          </label>
          <label className="field">
            <span className="srOnly">To</span>
            <input type="text" placeholder="To" autoComplete="off" />
          </label>
          <label className="field">
            <span className="srOnly">Departure Date</span>
            <input type="text" placeholder="Departure Date" onFocus={(e) => (e.currentTarget.type = 'date')} onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text'; }} />
          </label>

          <button className="searchButton" type="button">
            Search Flights
          </button>
        </section>

        <section className="popularSection" aria-labelledby="popular-heading">
          <h2 id="popular-heading">Popular Flights</h2>
          <div className="flightList">
            {popularFlights.map((flight) => (
              <article className="flightCard" key={`${flight.from}-${flight.to}`}>
                <div className="flightIcon" aria-hidden="true">
                  <PlaneTakeoff size={22} />
                </div>
                <div className="flightInfo">
                  <div className="route">{flight.from} → {flight.to}</div>
                  <div className="meta">Non-stop · {flight.duration}</div>
                </div>
                <div className="price">{flight.price}</div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <style jsx>{`
        .novaxPage {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
        }

        .appBar {
          position: sticky;
          top: 0;
          z-index: 20;
          background: #ffffff;
          border-bottom: 1px solid #eef2f7;
        }

        .appBarInner {
          width: min(760px, 100%);
          margin: 0 auto;
          min-height: 64px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .appTitle {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .profileButton {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #0f172a;
          cursor: pointer;
        }

        .profileButton:hover {
          background: #f1f5f9;
        }

        .content {
          width: min(760px, 100%);
          margin: 0 auto;
          padding: 16px;
        }

        .downloadRow {
          display: flex;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 14px 16px;
          border: 1px solid #dbe7e5;
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.05);
        }

        .downloadTitle {
          font-weight: 700;
          font-size: 15px;
        }

        .downloadText {
          margin-top: 3px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }

        :global(.downloadButton) {
          flex: 0 0 auto;
          white-space: nowrap;
          font-size: 13px;
          padding: 10px 13px !important;
        }

        .searchCard {
          padding: 16px;
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 3px 14px rgba(15, 23, 42, 0.10);
        }

        .field {
          display: block;
          margin-bottom: 12px;
        }

        .field input {
          width: 100%;
          min-height: 50px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0 14px;
          outline: none;
          background: #f8fafc;
          color: #0f172a;
          font-size: 15px;
          transition: border-color 120ms ease, box-shadow 120ms ease, background 120ms ease;
        }

        .field input::placeholder {
          color: #64748b;
        }

        .field input:focus {
          border-color: #14b8a6;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.10);
        }

        .searchButton {
          width: 100%;
          min-height: 52px;
          margin-top: 0;
          border: 0;
          border-radius: 12px;
          background: #14b8a6;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 120ms ease, transform 120ms ease;
        }

        .searchButton:hover {
          background: #0f9f91;
        }

        .searchButton:active {
          transform: translateY(1px);
        }

        .popularSection {
          margin-top: 24px;
        }

        .popularSection h2 {
          margin: 0 0 12px;
          font-size: 18px;
          line-height: 1.4;
          font-weight: 700;
        }

        .flightList {
          display: grid;
          gap: 12px;
        }

        .flightCard {
          min-height: 82px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid #edf1f5;
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.07);
        }

        .flightIcon {
          width: 44px;
          height: 44px;
          flex: 0 0 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(20, 184, 166, 0.10);
          color: #14b8a6;
        }

        .flightInfo {
          min-width: 0;
          flex: 1;
        }

        .route {
          font-weight: 700;
          font-size: 15px;
        }

        .meta {
          margin-top: 4px;
          color: #64748b;
          font-size: 13px;
        }

        .price {
          flex: 0 0 auto;
          color: #f97316;
          font-size: 16px;
          font-weight: 700;
        }

        .srOnly {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 580px) {
          .content {
            padding: 16px;
          }

          .downloadRow {
            align-items: stretch;
            flex-direction: column;
          }

          :global(.downloadButton) {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
