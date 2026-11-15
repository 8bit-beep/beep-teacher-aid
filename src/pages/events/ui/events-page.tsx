import { useMemo } from "react";
import { useRouter } from "@b1nd/aid-kit/navigation";
import EventPanel from "@/features/manage-events/ui/event-panel";
import { parseDate } from "@/shared/utils/pare-date";

const EventsPage = () => {
  const { stack } = useRouter();
  const today = useMemo(() => new Date(), []);
  const date = parseDate(today);

  return <EventPanel today={today} date={date} onClose={stack.pop} />;
};

export default EventsPage;
