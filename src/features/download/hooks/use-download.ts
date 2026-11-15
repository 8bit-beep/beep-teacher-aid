import { toast } from "@cher1shrxd/toast";
import { useDownloadExcel } from "@/entities/histories/mutations";
import { useDateStore } from "@/features/filter/stores/date";
import { TOAST_ISSUE_DURATION } from "@/shared/constants/toast";
import { AidBridgeError } from "@/shared/lib/aid-bridge";
import { useFileSave } from "@/shared/lib/file-save";

export const useDownload = () => {
  const { mutateAsync: downloadExcel } = useDownloadExcel();
  const { date } = useDateStore();
  const { saveFile } = useFileSave();

  const handleDownloadExcel = async () => {
    try {
      const { data } = await downloadExcel(date);
      await saveFile({
        url: data.url,
        fileName: `출석기록_${date}.xlsx`,
      });
    } catch (error) {
      if (error instanceof AidBridgeError) {
        toast.error("엑셀 다운로드 실패", error.message, TOAST_ISSUE_DURATION);
      }
    }
  };

  return handleDownloadExcel;
};
