import { useRouter } from "@b1nd/aid-kit/navigation";
import { Button } from "@beep-ds/ui";
import { STACK_PATHS } from "@/shared/config/tabs";

const ManageEvents = () => {
  const { stack } = useRouter();

  return (
    <Button
      buttonSize="small"
      buttonType="primary"
      showIcon
      onClick={() => stack.push(STACK_PATHS.events)}
      className="whitespace-nowrap"
    >
      교내 행사
    </Button>
  );
};

export default ManageEvents;
