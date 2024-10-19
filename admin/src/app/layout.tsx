import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import Headers from "./components/header";

// Định nghĩa metadata cho ứng dụng
export const metadata: Metadata = {
  title: "ScreenTime",
  description: "ScreenTime booking tickets for movies.",
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/images/favicons/apple-touch-icon.png",
  },
  charset: "UTF-8",
  // Thêm fonts vào phần preconnect
  links: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Open+Sans:wght@300;400;600;700&display=swap"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700;800;900&display=swap"
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
    },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    },
  ],
};

// Export viewport riêng biệt
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--background)', fontFamily: "'Open Sans', sans-serif" }} className="app sidebar-mini rtl">
        <Headers />
        {children}
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.3/pace.min.js"></script>
      </body>
    </html>
  );
}
