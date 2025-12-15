'use client';

import { Download } from 'lucide-react';

export default function DownloadApkButton({ className = "" }: { className?: string }) {
  return (
    <a 
      href="/downloads/novax-travel-release.apk" 
      download
      className={`inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl ${className}`}
    >
      <Download size={20} />
      <span>Download NOVAX App (Android)</span>
    </a>
  );
}
