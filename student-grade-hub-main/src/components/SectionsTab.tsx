import { useState } from "react";
import { Section, Student } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { SectionModal } from "./SectionModal";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface SectionsTabProps {
  sections: Section[];
  students: Student[];
  onAddSection: (section: Omit<Section, "id">) => void;
  onUpdateSection: (section: Omit<Section, "id">, id: string) => void;
  onDeleteSection: (id: string) => void;
}

export const SectionsTab = ({
  sections,
  students,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
}: SectionsTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (section: Section) => {
    setEditingSection(section);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDeleteSection(deleteId);
      setDeleteId(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSection(null);
  };

  const getStudentCount = (sectionId: string) => {
    return students.filter((s) => s.sectionId === sectionId).length;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Sections</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Section
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Students
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sections.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                sections.map((section) => (
                  <tr
                    key={section.id}
                    className="hover:bg-[hsl(var(--table-hover))] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {section.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {section.description || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {getStudentCount(section.id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(section)}
                        className="mr-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(section.id)}
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

      <SectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={editingSection ? onUpdateSection : onAddSection}
        section={editingSection}
      />

      <DeleteConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Section"
        description="Are you sure you want to delete this section? This action cannot be undone."
      />
    </div>
  );
};
