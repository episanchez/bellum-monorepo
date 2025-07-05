"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

export default function LoginPage() {
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          Sign in
        </Button>
        <Button type="button" onClick={signInWithGoogle} className="w-full">
          Sign in with Google
        </Button>
      </form>
    </main>
  );
}
