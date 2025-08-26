import Header from "@/components/landing-header";
import LoginForm from "@/components/login-form";
import Footer from "@/components/landing-footer";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <Header />
      <main className="lg:pt-48">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
