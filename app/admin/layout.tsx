export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout">
            {/* Hide global Navbar and Footer on admin pages */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .admin-layout ~ footer,
        body > main ~ footer,
        header.fixed {
          display: none !important;
        }
        body > main {
          padding-top: 0 !important;
        }
      `}} />
            {children}
        </div>
    );
}
