import { Button, modal } from "@beep-ds/ui";
import CreateAbsenceModal from "./create-absence-modal";

interface Props {
  size?: "small" | "medium";
}

const CreateAbsence = ({ size = "medium" }: Props) => {
  return (
    <Button
      buttonSize={size}
      buttonType="primary"
      onClick={() =>
        modal.open({
          title: "외박자 추가하기",
          content: <CreateAbsenceModal />,
        })
      }
    >
      {size === "small" ? "외박자 추가" : "외박자 추가하기"}
    </Button>
  );
};

export default CreateAbsence;
