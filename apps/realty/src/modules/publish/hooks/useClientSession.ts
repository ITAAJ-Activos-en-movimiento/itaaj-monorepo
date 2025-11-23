"use client";

import { useEffect, useState } from "react";

type SessionUser = { id: string; email: string; name?: string; picture?: string };
export type Session = { user: SessionUser } | { user: null } | null;

export function useClientSession() {
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        console.log(res)
        if (!res.ok) {
          if (!cancelled) setSession({ user: null });
          return;
        }

        const data = (await res.json()) as Session;
        console.log(data)
        if (!cancelled) setSession(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setSession({ user: null });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { session, loading };
}
