import {
  Home,
  Users,
  Building2,
  Newspaper,
  Scale,
  Folder,
  MapPinned,
  FileSignature,
  Archive,
  TriangleAlert,
  Handshake,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  Home,
  Users,
  Building2,
  Newspaper,
  Scale,
  Folder,
  Stethoscope,
  MapPinned,
  FileSignature,
  TriangleAlert,
  Archive,
  Handshake
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name?: string) {
  if (!name) return null;
  return icons[name as IconName] ?? null;
}