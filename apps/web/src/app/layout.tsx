import "@/styles/globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "./providers/AuthProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
