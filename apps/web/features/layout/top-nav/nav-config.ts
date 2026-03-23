import {
  LayoutDashboard,
  Clock,
  TestTubes,
  Pill,
  Upload,
  Share2,
  MessageSquare,
  Settings,
  ListChecks,
  Cable,
  Microscope,
  FileText,
  GitCompareArrows,
  HeartPulse,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: boolean;
}

// Primary navigation — main dashboard sections
export const navigation: NavItem[] = [
  { name: "Home", href: "/home", icon: LayoutDashboard },
  { name: "Timeline", href: "/timeline", icon: Clock },
  { name: "Labs", href: "/labs", icon: TestTubes },
  { name: "Medications", href: "/medications", icon: Pill },
  { name: "Conditions", href: "/conditions", icon: HeartPulse },
  { name: "Uploads", href: "/uploads", icon: Upload },
];

// Secondary nav — less frequently used
export const secondaryNav: NavItem[] = [
  { name: "Biomarkers", href: "/biomarkers", icon: ListChecks },
  { name: "Testing", href: "/testing", icon: Microscope },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Encounters", href: "/encounters", icon: Stethoscope },
  { name: "Correlations", href: "/correlations", icon: GitCompareArrows },
  // { name: 'Sharing', href: '/sharing', icon: Share2 },
  { name: "AI Chat", href: "/ai", icon: MessageSquare },
];

// All mobile nav items
export const allMobileNav: NavItem[] = [
  ...navigation,
  ...secondaryNav,
  { name: "Integrations", href: "/integrations", icon: Cable },
  { name: "Settings", href: "/settings", icon: Settings },
];
