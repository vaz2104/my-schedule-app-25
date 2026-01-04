import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";

export default function DashboardCompanyLayout({ children }) {
  return (
    <div className="ms-full-creen relative z-10">
      <Header />
      <main className="flex-1 pt-30 pb-22">{children}</main>
      <Footer />
    </div>
  );
}
