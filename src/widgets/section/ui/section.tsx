import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  titleSuffix?: ReactNode;
  headerOptions?: ReactNode;
  mobileFilter?: ReactNode;
  children?: ReactNode;
}

const Section = ({
  icon,
  title,
  description,
  titleSuffix,
  headerOptions,
  mobileFilter,
  children,
}: Props) => {
  return (
    <section className="w-full min-h-0 flex-1 bg-static-white pt-6 flex flex-col gap-5 overflow-hidden px-4 lg:px-0 lg:pt-5 lg:rounded-large lg:shadow-modal">
      <header className="min-h-10 flex items-center gap-2 lg:h-11.5 lg:px-10">
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
      {mobileFilter && <div className="w-full lg:hidden">{mobileFilter}</div>}
      {children}
    </section>
  );
};

export default Section;
