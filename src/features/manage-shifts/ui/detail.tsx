import { Button, modal } from "@beep-ds/ui";
import type { Shift } from "@/entities/shifts/types";
import DetailModal from "./detail-modal";

interface Props {
  data: Shift;
}

const Detail = ({ data }: Props) => {
  const openDetailModal = () => {
    modal.open({ title: "신청 내용", content: <DetailModal data={data} /> });
  };

  return (
    <>
      <div className="hidden lg:block">
        <Button buttonSize="small" buttonType="primary" onClick={openDetailModal}>
          신청 내용 보기
        </Button>
      </div>
      <p
        className="lg:hidden w-full text-right text-greyscale-70 text-body cursor-pointer"
        onClick={openDetailModal}
      >
        상세 보기
      </p>
    </>
  );
};

export default Detail;
