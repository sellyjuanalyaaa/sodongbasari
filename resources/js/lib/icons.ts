import {
  Home,
  Users,
  Building2,
  Newspaper,
  Scale,
  Folder,
  Image,
  MapPinned,
  FileSignature,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  Home,
  Users,
  Building2,
  Newspaper,
  Scale,
  Folder,
  Image,
  MapPinned,
  FileSignature,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name?: string) {
  if (!name) return null;
  return icons[name as IconName] ?? null;
}