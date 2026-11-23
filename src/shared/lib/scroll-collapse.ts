/**
 * 목록 스크롤에 맞춰 상단(헤더·제목 줄)을 먼저 접고, 다 접힌 뒤에 목록 내용이 스크롤되게 한다.
 *
 * - 접힘 정도(0~1)를 app-shell의 CSS 변수 `--collapse-progress`에 쓰고, 헤더 여백·섹션 여백·
 *   제목 줄 높이는 CSS calc로 이 값을 따라간다.
 * - 접히는 총 높이(D)만큼 스크롤할 때까지는, 상단이 줄어든 만큼 스크롤 중인 목록에 같은 크기의
 *   padding-top을 더해 상쇄한다. 그래서 그동안 내용은 손가락과 1:1로 상단을 따라 올라가기만 하고
 *   목록 자체는 넘어가지 않는다. D를 넘으면 평소처럼 스크롤된다.
 * - 접히는 동안 목록 컨테이너가 커지는 만큼 내용도 같이 늘어나 스크롤 범위가 그대로라,
 *   짧은 목록에서 scrollTop이 줄었다 늘었다 하는 되먹임 떨림이 없다.
 * - 매 프레임 React를 다시 렌더링하지 않도록 requestAnimationFrame에서 한 번에 쓴다.
 */
export const COLLAPSE_PROGRESS_VAR = "--collapse-progress";
const COLLAPSE_OFFSET_VAR = "--collapse-offset";

/** 헤더가 접히며 줄어드는 높이: 위아래 여백 24px → 8px */
const HEADER_SHRINK = 32;
/** 섹션 위 여백이 줄어드는 높이: 24px → 12px */
const SECTION_SHRINK = 12;

/** 지금 화면에서 접히는 총 높이(px). 각 Collapsible이 재 둔 펼친 높이를 더한다. */
const measureCollapseDistance = (root: HTMLElement) => {
  let distance = HEADER_SHRINK;

  root.querySelectorAll<HTMLElement>("[data-collapsible]").forEach(element => {
    distance += Number.parseFloat(element.style.getPropertyValue("--collapsible-height")) || 0;
  });

  if (root.querySelector("[data-collapse-section]")) {
    distance += SECTION_SHRINK;
  }

  return distance;
};

export const createScrollCollapse = () => {
  let frame = 0;
  let shell: HTMLElement | null = null;
  let scroller: HTMLElement | null = null;
  let progress = 0;

  const resetScroller = (element: HTMLElement | null) => {
    if (!element) return;
    element.style.removeProperty(COLLAPSE_OFFSET_VAR);
    delete element.dataset.collapseScroller;
  };

  const paint = () => {
    frame = 0;

    if (!shell) return;

    progress = 0;

    if (scroller) {
      const distance = measureCollapseDistance(shell);
      const offset = Math.min(Math.max(0, scroller.scrollTop), distance);

      progress = distance > 0 ? offset / distance : 0;
      scroller.style.setProperty(COLLAPSE_OFFSET_VAR, `${offset}px`);
    }

    shell.style.setProperty(COLLAPSE_PROGRESS_VAR, progress.toFixed(4));
  };

  const schedule = () => {
    if (!frame) {
      frame = requestAnimationFrame(paint);
    }
  };

  return {
    /** 스크롤 이벤트마다 호출. 접힘 진행도(0~1)를 돌려준다. */
    onScroll(nextShell: HTMLElement | null, target: HTMLElement) {
      shell = nextShell;

      if (scroller !== target) {
        resetScroller(scroller);
        scroller = target;
        scroller.dataset.collapseScroller = "";
      }

      schedule();

      const distance = shell ? measureCollapseDistance(shell) : 0;
      return distance > 0 ? Math.min(1, Math.max(0, target.scrollTop) / distance) : 0;
    },
    /** 탭 전환 등으로 처음 상태로 되돌린다. */
    reset(nextShell: HTMLElement | null) {
      shell = nextShell;
      resetScroller(scroller);
      scroller = null;
      schedule();
    },
  };
};
