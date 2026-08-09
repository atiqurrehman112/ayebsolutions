import { AuthFeedback } from "@/features/admin";

export default function AdminLoading() {
  return (
    <div className="mx-auto w-full max-w-xl py-20">
      <AuthFeedback variant="loading" title="Loading secure workspace">
        Verifying your session and preparing the administration area.
      </AuthFeedback>
    </div>
  );
}
