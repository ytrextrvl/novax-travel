'use client';

import { Download } from 'lucide-react';

const APK_URL = 'https://github.com/ytrextrvl/novax-mobile/releases/download/android-latest/novax-travel.apk';

export default function DownloadApkButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={APK_URL}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-4 py-3 font-bold text-white shadow-sm transition hover:bg-[#0F9F91] focus:outline-none focus:ring-4 focus:ring-[#14B8A6]/20 ${className}`}
      aria-label="Download NOVAX Travel for Android"
    >
      <Download size={18} />
      <span>Download Android App</span>
    </a>
  );
}
