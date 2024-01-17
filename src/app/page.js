import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/auth/login">Login to continue </Link>
    </main>
  );
}
