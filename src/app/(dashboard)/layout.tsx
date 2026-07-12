// import { DashboardNavbar } from "@/components/shared/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardNavbar /> */}
      <main className="flex-1 bg-muted/30">{children}</main>
    </div>
  );
}
