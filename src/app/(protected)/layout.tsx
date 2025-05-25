import SessionGuard from "@/components/global/session-guard";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <SessionGuard>
    //   <>{children}</>
    // </SessionGuard>
    <>
      {children}
    </>
  );
};

export default ProtectedLayout;