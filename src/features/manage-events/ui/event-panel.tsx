import { Suspense, useState } from "react";
import ChevronIcon from "@/shared/icons/chevron-icon";
import StackHeader from "@/widgets/stack-header/ui/stack-header";
import { formatEventDate } from "../utils/format-event-date";
import EventFormContainer from "./event-form-container";
import EventList from "./event-list";

interface Props {
  today: Date;
  date: string;
  onClose: () => void;
}

type Phase = { type: "list" } | { type: "form"; eventId: number | null };

const EventPanel = ({ today, date, onClose }: Props) => {
  const [phase, setPhase] = useState<Phase>({ type: "list" });

  const backToList = () => setPhase({ type: "list" });

  return (
    <div className="w-full h-full bg-static-white flex flex-col">
      <StackHeader
        title={`${formatEventDate(today)} 행사 관리`}
        onBack={phase.type === "list" ? onClose : backToList}
        icon={phase.type === "list" ? undefined : <ChevronIcon size={16} rotate={90} />}
        backLabel={phase.type === "list" ? "닫기" : "목록으로"}
      />
      <div className="safe-area-bottom-gap w-full flex-1 min-h-0 flex flex-col gap-4 px-4 pt-4 overflow-y-auto overscroll-contain">
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
              불러오는 중...
            </div>
          }
        >
          {phase.type === "list" ? (
            <EventList
              date={date}
              onAdd={() => setPhase({ type: "form", eventId: null })}
              onSelect={eventId => setPhase({ type: "form", eventId })}
            />
          ) : (
            <EventFormContainer
              date={date}
              eventId={phase.eventId}
              onDone={backToList}
              onCancel={backToList}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default EventPanel;
