import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateAbhaSection from "@/components/CreateAbhaSection";
import VerifyAbhaSection from "@/components/VerifyAbhaSection";
import { Shield, LogOut, Activity } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ABDM ABHA</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-warning/15 text-warning font-medium border border-warning/20">
              Sandbox
            </span>
          </div>
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="h-8 px-3 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">Test ABDM ABHA APIs in sandbox mode with mock responses</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CreateAbhaSection />
          <VerifyAbhaSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
