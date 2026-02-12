import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="max-w-xl space-y-4 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Welcome to the Auth System
        </h1>
        <p className="text-gray-600">
          A simple Next.js + MongoDB authentication demo with protected
          dashboard and admin area.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}

