export interface Student {
  id: string;
  name: string;
  email: string;
  sectionId?: string;
  enrollmentDate?: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
}

export interface Result {
  id: string;
  studentId: string;
  subject: string;
  marks: number;
  examDate?: string;
}

export type Grade = "A+" | "A" | "B" | "C" | "D" | "F";
