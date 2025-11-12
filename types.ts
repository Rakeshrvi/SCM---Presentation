
export enum SlideType {
  Title = 'title',
  Intro = 'intro',
  About = 'about',
  Architecture = 'architecture',
  Importance = 'importance',
  Problem = 'problem',
  Example = 'example',
  Solution = 'solution',
  Features = 'features',
  Workflow = 'workflow',
  Outcomes = 'outcomes',
  Optimization = 'optimization',
  Impact = 'impact',
  Learnings = 'learnings',
  Conclusion = 'conclusion',
}

export interface TableRow {
  [key: string]: string | number;
}

export interface TableData {
  headers: string[];
  rows: TableRow[];
}

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface ArchitectureNode {
    name: string;
    description?: string;
}

export interface KpiData {
    label: string;
    value: string;
    change?: string;
}

export interface StackInfo {
    tyreType: string;
    stackHeight: string;
    category: string;
    color: string;
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  presenter?: { name: string; institution: string };
  logos?: string[];
  mainPoints?: (string | { title: string; points: string[] })[];
  quote?: { text: string; author: string };
  table?: TableData;
  chartData?: ChartData[];
  architecture?: ArchitectureNode[];
  kpis?: KpiData[];
  stackingInfo?: StackInfo[];
  visual?: string; // for image urls
  footnote?: string;
}
