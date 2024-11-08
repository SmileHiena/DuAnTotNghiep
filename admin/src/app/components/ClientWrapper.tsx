"use client"; // Đây là Client Component
import Headers from "./header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  useEffect(() => {
    const adminToken = document.cookie.split(';').find(c => c.trim().startsWith('adminToken='));
    
    if (!adminToken) {
      router.push('/page/login');
    }
  }, [router]);

  return (
    <>
      {pathname !== '/page/login' && <Headers />}
      {children}
    </>
  );
}
