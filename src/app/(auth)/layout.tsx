import "@/assets/scss/login.scss";
import PageTransition from "@/components/custom-ui/PageTransition";
import StairTransition from "@/components/custom-ui/StairTransition";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StairTransition />
      <PageTransition>
        <div className="login_page text-primary">
          <div className="background hidden md:flex w-[60%] lg:w-[70%]"></div>
          {children}
        </div>
      </PageTransition>
    </>
  );
}
