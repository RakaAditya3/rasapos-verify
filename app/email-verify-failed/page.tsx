"use client";

import { useSearchParams } from "next/navigation";

export default function EmailVerifyFailedPage({
  searchParams,
}: {
  searchParams: { reason?: string }
}) {

  const reason = searchParams?.reason;

  const errorText =
    reason === "invalid_hash"
      ? "Tautan verifikasi tidak valid atau telah diubah."
      : "Tautan verifikasi tidak dapat digunakan.";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-bold mb-2 text-red-600">Verifikasi Gagal</h1>
      <p className="text-gray-600 mb-6">{errorText}</p>

      <a
        href="mailto:support@rasapos.app"
        className="px-5 py-2 rounded-full border border-gray-400 text-gray-700 font-semibold"
      >
        Hubungi Support
      </a>

      <p className="text-sm text-gray-400 mt-4">
        © {new Date().getFullYear()} RasaPOS
      </p>
    </main>
  );
}
