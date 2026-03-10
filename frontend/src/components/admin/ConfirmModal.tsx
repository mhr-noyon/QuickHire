/* ── Confirm-delete modal ── */
import {
    Trash2,
    Plus,
    Loader2,
    Search,
    ExternalLink,
    Briefcase,
    MapPin,
    CheckCircle2,
    FileText,
    AlertTriangle,
    X,
    Mail,
    Link as LinkIcon,
    Calendar,
    User,
} from "lucide-react";

export default function ConfirmModal({
    jobTitle,
    onConfirm,
    onCancel,
    loading,
}: {
    jobTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="mx-4 w-full max-w-[420px] rounded-lg border border-[#D6DDEB] bg-white p-6 shadow-xl">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-[17px] font-semibold text-[#25324B]">
                            Delete Job Listing
                        </h3>
                        <p className="mt-1 text-[14px] text-[#7C8493]">
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-[#25324B]">
                                &ldquo;{jobTitle}&rdquo;
                            </span>
                            ? This action cannot be undone and will also remove
                            all associated applications.
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="h-10 cursor-pointer rounded-md border border-[#D6DDEB] px-5 text-[14px] font-medium text-[#515B6F] transition hover:bg-[#F8F8FD] disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-red-600 px-5 text-[14px] font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}