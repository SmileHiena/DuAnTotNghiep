"use client";
import Headers from "./header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const adminToken = document.cookie.split(';').find(c => c.trim().startsWith('adminToken='));

    if (!adminToken) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      {pathname === '/login' ? (
        <>{children}</>
      ) : (
        <div className="app sidebar-mini rtl">
          <Headers />
          {children}
        </div>
      )}
    </>

  );
}
