import { Grade } from "@/types";
import { getGradeColor } from "@/utils/gradeCalculator";

interface GradeBadgeProps {
  grade: Grade;
}

export const GradeBadge = ({ grade }: GradeBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(
        grade
      )}`}
    >
      {grade}
    </span>
  );
};
