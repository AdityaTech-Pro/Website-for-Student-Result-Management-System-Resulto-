import { useState, useEffect } from "react";
import { Result, Student } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (result: Omit<Result, "id">, id?: string) => void;
  result: Result | null;
  students: Student[];
}

export const ResultModal = ({
  isOpen,
  onClose,
  onSubmit,
  result,
  students,
}: ResultModalProps) => {
  const [formData, setFormData] = useState({
    studentId: "",
    subject: "",
    marks: "",
    examDate: "",
  });

  const [errors, setErrors] = useState({
    studentId: "",
    subject: "",
    marks: "",
  });

  useEffect(() => {
    if (result) {
      setFormData({
        studentId: result.studentId,
        subject: result.subject,
        marks: result.marks.toString(),
        examDate: result.examDate || "",
      });
    } else {
      setFormData({
        studentId: "",
        subject: "",
        marks: "",
        examDate: "",
      });
    }
    setErrors({ studentId: "", subject: "", marks: "" });
  }, [result, isOpen]);

  const validateForm = () => {
    const newErrors = { studentId: "", subject: "", marks: "" };
    let isValid = true;

    if (!formData.studentId) {
      newErrors.studentId = "Student is required";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    const marks = parseInt(formData.marks);
    if (!formData.marks || isNaN(marks)) {
      newErrors.marks = "Marks is required";
      isValid = false;
    } else if (marks < 0 || marks > 100) {
      newErrors.marks = "Marks must be between 0 and 100";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(
        {
          studentId: formData.studentId,
          subject: formData.subject,
          marks: parseInt(formData.marks),
          examDate: formData.examDate || undefined,
        },
        result?.id
      );
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{result ? "Edit Result" : "Add New Result"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="student">
              Student <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.studentId}
              onValueChange={(value) =>
                setFormData({ ...formData, studentId: value })
              }
            >
              <SelectTrigger
                className={`bg-background ${
                  errors.studentId ? "border-destructive" : ""
                }`}
              >
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.studentId && (
              <p className="text-sm text-destructive mt-1">{errors.studentId}</p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-destructive mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <Label htmlFor="marks">
              Marks (0-100) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="marks"
              type="number"
              min="0"
              max="100"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              className={errors.marks ? "border-destructive" : ""}
            />
            {errors.marks && (
              <p className="text-sm text-destructive mt-1">{errors.marks}</p>
            )}
          </div>

          <div>
            <Label htmlFor="examDate">Exam Date</Label>
            <Input
              id="examDate"
              type="date"
              value={formData.examDate}
              onChange={(e) =>
                setFormData({ ...formData, examDate: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{result ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
