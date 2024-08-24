export interface NavigationItem {
  title: string;
  to: string;
}

export interface TeamMember {
  id?: string; 
  role: string;
  description: string;
  username: string;
  profile: string;
}
