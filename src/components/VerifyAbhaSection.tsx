import { useState } from "react";
import { verifyAbha } from "@/services/mockAbdmApi";
import { Loader2, Search, UserCheck, ChevronDown, ChevronUp } from "lucide-react";

const VerifyAbhaSection = () => {
  const [abhaId, setAbhaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [rawJson, setRawJson] = useState<object | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  const handleVerify = async () => {
    setError("");
    setResult(null);
    setRawJson(null);
    setLoading(true);
    const res = await verifyAbha(abhaId);
    setLoading(false);
    if (res.success) {
      setResult(res.data);
      setRawJson(res.rawResponse!);
    } else {
      setError(res.error!);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
          <UserCheck className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">Verify ABHA</h3>
          <p className="text-xs text-muted-foreground">Look up an existing ABHA profile</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">ABHA Number or Address</label>
          <input
            type="text"
            value={abhaId}
            onChange={(e) => setAbhaId(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
            placeholder="e.g. 91-4832-7291-6543 or testuser@abdm"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={loading || !abhaId.trim()}
          className="h-10 px-5 rounded-lg gradient-brand text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin-slow" /> : <Search className="w-4 h-4" />}
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {result && (
        <div className="mt-5 space-y-4 animate-fade-in">
          <div className="p-4 rounded-lg bg-secondary border border-border">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">ABHA Number</dt>
              <dd className="font-mono font-medium text-foreground">{result.abhaNumber}</dd>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium text-foreground">{result.name}</dd>
              <dt className="text-muted-foreground">Gender</dt>
              <dd className="font-medium text-foreground">{result.gender}</dd>
              <dt className="text-muted-foreground">DOB</dt>
              <dd className="font-medium text-foreground">{result.dob}</dd>
              <dt className="text-muted-foreground">Mobile</dt>
              <dd className="font-medium text-foreground">{result.mobile}</dd>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-medium text-foreground">{result.district}, {result.state}</dd>
            </dl>
          </div>

          <button
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {showRaw ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showRaw ? "Hide" : "Show"} Raw API Response
          </button>
          {showRaw && rawJson && (
            <pre className="p-4 rounded-lg bg-muted text-xs text-muted-foreground overflow-auto max-h-60 font-mono animate-fade-in">
              {JSON.stringify(rawJson, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyAbhaSection;
