import { useState } from "react";
import { Student, Section, Result } from "@/types";
import { StudentsTab } from "@/components/StudentsTab";
import { SectionsTab } from "@/components/SectionsTab";
import { ResultsTab } from "@/components/ResultsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      sectionId: "1",
      enrollmentDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      sectionId: "1",
      enrollmentDate: "2024-01-16",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      sectionId: "2",
      enrollmentDate: "2024-01-17",
    },
  ]);

  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Section A",
      description: "Morning batch for Computer Science",
    },
    {
      id: "2",
      name: "Section B",
      description: "Afternoon batch for Information Technology",
    },
  ]);

  const [results, setResults] = useState<Result[]>([
    {
      id: "1",
      studentId: "1",
      subject: "Mathematics",
      marks: 95,
      examDate: "2024-03-15",
    },
    {
      id: "2",
      studentId: "1",
      subject: "Physics",
      marks: 88,
      examDate: "2024-03-16",
    },
    {
      id: "3",
      studentId: "2",
      subject: "Mathematics",
      marks: 72,
      examDate: "2024-03-15",
    },
    {
      id: "4",
      studentId: "3",
      subject: "Chemistry",
      marks: 58,
      examDate: "2024-03-17",
    },
  ]);

  // Student operations
  const handleAddStudent = (student: Omit<Student, "id">) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...student,
    };
    setStudents([...students, newStudent]);
  };

  const handleUpdateStudent = (student: Omit<Student, "id">, id: string) => {
    setStudents(students.map((s) => (s.id === id ? { id, ...student } : s)));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    setResults(results.filter((r) => r.studentId !== id));
  };

  // Section operations
  const handleAddSection = (section: Omit<Section, "id">) => {
    const newSection: Section = {
      id: Date.now().toString(),
      ...section,
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateSection = (section: Omit<Section, "id">, id: string) => {
    setSections(sections.map((s) => (s.id === id ? { id, ...section } : s)));
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
    setStudents(
      students.map((s) => (s.sectionId === id ? { ...s, sectionId: undefined } : s))
    );
  };

  // Result operations
  const handleAddResult = (result: Omit<Result, "id">) => {
    const newResult: Result = {
      id: Date.now().toString(),
      ...result,
    };
    setResults([...results, newResult]);
  };

  const handleUpdateResult = (result: Omit<Result, "id">, id: string) => {
    setResults(results.map((r) => (r.id === id ? { id, ...result } : r)));
  };

  const handleDeleteResult = (id: string) => {
    setResults(results.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Student Result Management System
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage students, sections, and academic results
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <StudentsTab
              students={students}
              sections={sections}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          </TabsContent>

          <TabsContent value="sections">
            <SectionsTab
              sections={sections}
              students={students}
              onAddSection={handleAddSection}
              onUpdateSection={handleUpdateSection}
              onDeleteSection={handleDeleteSection}
            />
          </TabsContent>

          <TabsContent value="results">
            <ResultsTab
              results={results}
              students={students}
              onAddResult={handleAddResult}
              onUpdateResult={handleUpdateResult}
              onDeleteResult={handleDeleteResult}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
