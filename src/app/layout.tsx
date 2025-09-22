import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer"; 
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page-content">{children}</main>
        <Footer /> 
      </body>
    </html>
  );
}
