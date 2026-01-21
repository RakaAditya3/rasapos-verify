"use client";

import { useSearchParams } from "next/navigation";
export default function EmailVerifiedPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {

  const status = searchParams?.status;

  const title =
    status === "already_verified"
      ? "Email sudah diverifikasi sebelumnya"
      : "Email berhasil diverifikasi!";

  const subtitle =
    status === "already_verified"
      ? "Akun kamu sudah aktif sebelumnya. Silakan buka aplikasi untuk login."
      : "Akun kamu sekarang aktif. Silakan buka aplikasi untuk login.";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      <a
        href="rasapos://login"
        className="px-5 py-2 rounded-full bg-purple-600 text-white font-semibold"
      >
        Buka Aplikasi
      </a>

      <p className="text-sm text-gray-400 mt-4">
        © {new Date().getFullYear()} RasaPOS
      </p>
    </main>
  );
}
