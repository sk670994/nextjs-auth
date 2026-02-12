import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="max-w-xl space-y-4 text-center">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <p className="text-gray-600">
          This demo doesn&apos;t implement a separate admin auth flow. Use a
          user account with the <span className="font-semibold">admin</span>{" "}
          role to access the admin panel.
        </p>
        <Link
          href="/login"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Go to main login
        </Link>
      </div>
    </main>
  );
}
