export interface RepoAnalysisRequest {
  repoUrl: string;
  repoName: string;
  fileExtension: string;
  includeDiagrams: boolean;
}

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'code' | 'diagram';
  language?: string;
  diagramType?: string;
}

export interface AnalysisResult {
  id: string;
  repoName: string;
  repoUrl: string;
  analyzedAt: string;
  sections: DocumentSection[];
  diagrams: string[];
}

export interface SidebarDocument {
  id: string;
  repoName: string;
  analyzedAt: string;
}