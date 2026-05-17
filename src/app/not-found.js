import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">

        <h1 className="text-[120px] font-bold leading-none text-gray-200 tracking-tighter">
          404
        </h1>

        <div className="w-12 h-1 bg-gray-300 mx-auto my-4 rounded-full" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page not found
        </h2>

        <p className="text-gray-500 text-base leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <Link
          href={'/'}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          ← Back to home
        </Link>

      </div>
    </div>
  );
};

export default NotFoundPage;