import { useState } from "react";
import { generateOtp, verifyOtpAndCreateAbha } from "@/services/mockAbdmApi";
import { Loader2, CheckCircle2, ChevronDown, ChevronUp, Fingerprint, Send } from "lucide-react";

const CreateAbhaSection = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [txnId, setTxnId] = useState("");
  const [step, setStep] = useState<"aadhaar" | "otp" | "done">("aadhaar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [rawJson, setRawJson] = useState<object | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  const handleGenerateOtp = async () => {
    setError("");
    setLoading(true);
    const res = await generateOtp(aadhaar);
    setLoading(false);
    if (res.success) {
      setTxnId(res.txnId!);
      setStep("otp");
    } else {
      setError(res.error!);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);
    const res = await verifyOtpAndCreateAbha(otp, txnId);
    setLoading(false);
    if (res.success) {
      setResult(res.data);
      setRawJson(res.rawResponse!);
      setStep("done");
    } else {
      setError(res.error!);
    }
  };

  const reset = () => {
    setStep("aadhaar");
    setAadhaar("");
    setOtp("");
    setTxnId("");
    setResult(null);
    setRawJson(null);
    setError("");
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Fingerprint className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">Create ABHA via Aadhaar</h3>
          <p className="text-xs text-muted-foreground">Generate OTP and create ABHA number</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      {step === "aadhaar" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Aadhaar Number</label>
            <input
              type="text"
              maxLength={12}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow font-mono tracking-wider"
              placeholder="XXXX XXXX XXXX"
            />
            <p className="text-xs text-muted-foreground mt-1">12-digit Aadhaar number (mock data accepted)</p>
          </div>
          <button
            onClick={handleGenerateOtp}
            disabled={loading || aadhaar.length !== 12}
            className="h-10 px-5 rounded-lg gradient-brand text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin-slow" /> : <Send className="w-4 h-4" />}
            {loading ? "Generating OTP..." : "Generate OTP"}
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm font-medium">
            OTP sent successfully! Transaction: {txnId.slice(0, 12)}...
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow font-mono tracking-[0.5em] text-center text-lg"
              placeholder="● ● ● ● ● ●"
            />
            <p className="text-xs text-muted-foreground mt-1">Enter any 6-digit OTP for mock testing</p>
          </div>
          <button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length !== 6}
            className="h-10 px-5 rounded-lg gradient-brand text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin-slow" /> : <CheckCircle2 className="w-4 h-4" />}
            {loading ? "Creating ABHA..." : "Confirm & Create ABHA"}
          </button>
        </div>
      )}

      {step === "done" && result && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 text-success font-semibold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              ABHA Created Successfully
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">ABHA Number</dt>
              <dd className="font-mono font-medium text-foreground">{result.abhaNumber}</dd>
              <dt className="text-muted-foreground">ABHA Address</dt>
              <dd className="font-medium text-foreground">{result.abhaAddress}</dd>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium text-foreground">{result.name}</dd>
              <dt className="text-muted-foreground">Gender</dt>
              <dd className="font-medium text-foreground">{result.gender}</dd>
              <dt className="text-muted-foreground">DOB</dt>
              <dd className="font-medium text-foreground">{result.dob}</dd>
            </dl>
          </div>

          {/* Raw JSON toggle */}
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

          <button
            onClick={reset}
            className="h-9 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateAbhaSection;
