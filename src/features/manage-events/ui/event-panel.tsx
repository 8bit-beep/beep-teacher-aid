import { Suspense, useState } from "react";
import ChevronIcon from "@/shared/icons/chevron-icon";
import { CloseIcon } from "@/shared/icons/close-icon";
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
    <div className="w-full h-full bg-static-white flex flex-col gap-4 p-4 overflow-y-auto">
      <div className="w-full flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={phase.type === "list" ? onClose : backToList}
          className="size-11 shrink-0 rounded-full bg-static-white shadow-modal flex items-center justify-center text-static-black cursor-pointer"
        >
          {phase.type === "list" ? <CloseIcon /> : <ChevronIcon size={16} rotate={90} />}
        </button>
        <h2 className="min-w-0 text-accent text-static-black truncate">
          {formatEventDate(today)} 행사 관리
        </h2>
      </div>

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
  );
};

export default EventPanel;
