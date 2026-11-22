import type { ReactNode } from "react";
import Collapsible from "@/shared/ui/collapsible";
import { useSectionCollapsed } from "../hooks/use-section-collapsed";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  titleSuffix?: ReactNode;
  headerOptions?: ReactNode;
  mobileFilter?: ReactNode;
  /** 모바일에서 목록을 스크롤하면 제목 줄을 접어 목록 공간을 넓힌다. */
  collapseHeaderOnScroll?: boolean;
  children?: ReactNode;
}

const Section = ({
  icon,
  title,
  description,
  titleSuffix,
  headerOptions,
  mobileFilter,
  collapseHeaderOnScroll = false,
  children,
}: Props) => {
  const scrollCollapse = useSectionCollapsed();
  const collapseEnabled = collapseHeaderOnScroll && scrollCollapse.enabled;

  return (
    <section
      data-collapse-section={collapseEnabled ? "" : undefined}
      className={`w-full min-h-0 flex-1 bg-static-white flex flex-col overflow-hidden px-4 lg:px-0 lg:pt-5 lg:gap-5 lg:rounded-large lg:shadow-modal ${
        collapseEnabled ? "pt-[calc(24px-12px*var(--collapse-progress,0))]" : "pt-6"
      }`}
    >
      <Collapsible
        collapsed={collapseEnabled && scrollCollapse.collapsed}
        enabled={collapseEnabled}
        className="shrink-0"
      >
        <header className="min-h-10 mb-5 flex items-center gap-2 lg:mb-0 lg:h-11.5 lg:px-10">
          <div className="shrink-0 text-static-black">{icon}</div>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-baseline gap-2.5 min-w-0">
              <h2 className="text-accent lg:text-h3 whitespace-nowrap">{title}</h2>
              {titleSuffix}
            </div>
            <p className="hidden lg:flex text-caption2 text-greyscale-40">{description}</p>
          </div>
          {headerOptions && <div className="shrink-0 flex items-center gap-3">{headerOptions}</div>}
        </header>
      </Collapsible>
      {mobileFilter && <div className="w-full shrink-0 mb-5 lg:hidden">{mobileFilter}</div>}
      {children}
    </section>
  );
};

export default Section;
