const COMPACT_THRESHOLD = 4;

const WIDTHS = {
  dropdown: { default: "180px", compact: "150px" },
  header: { default: "196px", compact: "166px" },
  lastHeader: { default: "220px", compact: "190px" },
} as const;

export function getClassroomTableWidths(checkpointCount: number) {
  const isCompact = checkpointCount >= COMPACT_THRESHOLD;
  return {
    dropdownWidth: isCompact ? WIDTHS.dropdown.compact : WIDTHS.dropdown.default,
    headerWidth: isCompact ? WIDTHS.header.compact : WIDTHS.header.default,
    lastHeaderWidth: isCompact ? WIDTHS.lastHeader.compact : WIDTHS.lastHeader.default,
  };
}

/**
 * 폰 화면의 교시별 상태 드롭다운 칸 폭.
 * 섹션 좌우 여백(16px×2) + 행 좌우 여백(16px×2) + 칸 간격(10px×2)을 뺀 폭을 3등분해
 * 교시 3칸이 한 화면에 들어오고, 그 이상은 가로 스크롤된다.
 */
export const MOBILE_STATUS_CELL_WIDTH = "w-[max(96px,calc((100vw-5.25rem)/3))]";
