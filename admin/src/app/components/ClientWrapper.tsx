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
    {pathname === '/page/login' ? (
      // Chỉ hiển thị children khi pathname là '/page/login'
      <>{children}</>
    ) : (
      // Hiển thị cả Headers và children khi pathname khác '/page/login'
      <div className="app sidebar-mini rtl">
        <Headers />
        {children}
      </div>
    )}
  </>
  
  );
}
