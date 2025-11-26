import { useState } from "react";
import { Result, Student } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ResultModal } from "./ResultModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { GradeBadge } from "./GradeBadge";
import { calculateGrade } from "@/utils/gradeCalculator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultsTabProps {
  results: Result[];
  students: Student[];
  onAddResult: (result: Omit<Result, "id">) => void;
  onUpdateResult: (result: Omit<Result, "id">, id: string) => void;
  onDeleteResult: (id: string) => void;
}

export const ResultsTab = ({
  results,
  students,
  onAddResult,
  onUpdateResult,
  onDeleteResult,
}: ResultsTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [studentFilter, setStudentFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  const handleEdit = (result: Result) => {
    setEditingResult(result);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDeleteResult(deleteId);
      setDeleteId(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingResult(null);
  };

  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    return student?.name || "Unknown";
  };

  const uniqueSubjects = Array.from(new Set(results.map((r) => r.subject)));

  const filteredResults = results.filter((result) => {
    if (studentFilter !== "all" && result.studentId !== studentFilter) return false;
    if (subjectFilter !== "all" && result.subject !== subjectFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Results</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Result
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <Select value={studentFilter} onValueChange={setStudentFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Filter by Student" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Students</SelectItem>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Filter by Subject" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Subjects</SelectItem>
              {uniqueSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Exam Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredResults.map((result) => (
                  <tr
                    key={result.id}
                    className="hover:bg-[hsl(var(--table-hover))] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {getStudentName(result.studentId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {result.marks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <GradeBadge grade={calculateGrade(result.marks)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {result.examDate || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(result)}
                        className="mr-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(result.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={editingResult ? onUpdateResult : onAddResult}
        result={editingResult}
        students={students}
      />

      <DeleteConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Result"
        description="Are you sure you want to delete this result? This action cannot be undone."
      />
    </div>
  );
};
