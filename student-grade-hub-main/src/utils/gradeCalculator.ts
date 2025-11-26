import { Grade } from "@/types";

export const calculateGrade = (marks: number): Grade => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
};

export const getGradeColor = (grade: Grade): string => {
  const gradeColors: Record<Grade, string> = {
    "A+": "bg-grade-a-plus text-white",
    "A": "bg-grade-a text-white",
    "B": "bg-grade-b text-white",
    "C": "bg-grade-c text-white",
    "D": "bg-grade-d text-white",
    "F": "bg-grade-f text-white",
  };
  return gradeColors[grade];
};
