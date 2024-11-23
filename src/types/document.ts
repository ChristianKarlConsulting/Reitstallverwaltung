export type Document = {
  id: string;
  title: string;
  description?: string;
  category: 'verträge' | 'formulare' | 'anleitungen' | 'sonstiges';
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  lastModified?: Date;
  tags?: string[];
  accessLevel: 'alle' | 'besitzer' | 'mitarbeiter';
};