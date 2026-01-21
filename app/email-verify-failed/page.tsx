"use client";

import { useSearchParams } from "next/navigation";

export default function EmailVerifyFailed() {
  const params = useSearchParams();
  const reason = params.get("reason");

  const errorText =
    reason === "invalid_hash"
      ? "Tautan verifikasi tidak valid atau telah diubah."
      : "Tautan verifikasi tidak dapat digunakan.";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-bold mb-2 text-red-600">Verifikasi Gagal</h1>
      <p className="text-gray-600 mb-6">{errorText}</p>

      <a
        href="https://rasapos.app/resend-verification"
        className="px-5 py-2 rounded-full border border-gray-400 text-gray-700 font-semibold"
      >
        Kirim ulang verifikasi
      </a>

      <p className="text-sm text-gray-400 mt-4">
        © {new Date().getFullYear()} RasaPOS
      </p>
    </main>
  );
}
