export interface NavigationItem {
  title: string;
  to: string;
}

export interface TeamCategory {
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  name: string;
  category: string;
  position: string;
}
