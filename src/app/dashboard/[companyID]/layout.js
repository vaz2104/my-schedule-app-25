import Footer from "@/app/components/admin/Footer";
import Header from "@/app/components/admin/Header";

export default function DashboardCompanyLayout({ children }) {
  return (
    <div className="ms-full-creen relative z-10">
      <Header />
      <main className="flex-1 pt-16 pb-22">{children}</main>
      <Footer />
    </div>
  );
}
