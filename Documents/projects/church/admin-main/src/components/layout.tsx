import Sidebar from "./sidebar"
import Profile from '../components/profile'
import Refresh from "./refresh-button";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Profile />
        {children}
        <Refresh />
      </main>
      <div id="modal-root" />
    </div>
  );
}