import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 bg-[#0f0f0f] border-r border-[#222]">
          <AppSidebar />
        </aside>

        {/* Main Area */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] w-full">
          {/* <Header /> */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>


  );
}
