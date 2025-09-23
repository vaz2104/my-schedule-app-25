import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="ms-full-creen p-4">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
