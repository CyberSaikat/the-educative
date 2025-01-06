import { IconType } from "react-icons/lib";

export interface SectionContent {
  description: string;
  items: {
    color: string;
    title: string;
    descr: string;
    contents: {
      id?: number;
      icon: IconType;
      title: string;
      data: string;
    }[];
  };
}

export interface ExploreContent {
  title: string;
  sections: Record<string, SectionContent>;
}

export interface ContentData {
  explore: ExploreContent;
}

export interface Challenge {
  contents: {
    title: React.ReactNode;
    icon: IconType;
    color: string;
    data: { title: string; description: string }[];
  };
}

interface MentorshipPoint {
  title: string;
  description: string;
}

export interface MentorshipFeature {
  title: string;
  points: MentorshipPoint[];
  icon: IconType;
}

export interface MenuItems {
  icon: IconType;
  label: string;
  href: string;
  children?: MenuItems[];
  permissions?: string[];
  isRendered?: boolean;
}

export interface userdata {
  id: String;
  name: String;
  email: String;
  password: String;
  usertype: String;
  created_at: String;
  updated_at: String;
}


export interface HeadingProps {
  title: string;
  tagline?: string;
  className?: string;
}

export interface IResourcesContent {
  _id: string;
  icon: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  visible: boolean;
}

export interface ResourcesContents {
  block_1: IResourcesContent;
  block_2: IResourcesContent;
  block_3: IResourcesContent;
  block_4: IResourcesContent;
  block_5: IResourcesContent;
  block_6: IResourcesContent;
  block_7: IResourcesContent;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export interface NewResourcesContent {
  title: string;
  description: string;
  features: Feature[];
  callToAction: string;
  imageSrc: string;
  imageCredit: string;
}


export interface ResourcesInterface {
  _id: string;
  icon: string;
  name: string;
  url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  image: string;
  credit: string;
  visible: boolean;
  content: NewResourcesContent;
  contents: ResourcesContents;
}


export interface Tag {
  _id?: string;
  id?: string;
  name?: string;
  slug?: string;
}

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publish_date: Date;
  updated_date: Date;
  status: "draft" | "published" | "archived";
  category: string;
  categoryName?: string;
  subcategory: string;
  subcategoryName?: string;
  tags: string[];
  tagNames?: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  featuredImage: string | File;
  imageCredit: string;
}

export interface LinkType {
  href: string;
  label: string;
}

export interface IComment {
  _id: string;
  postId: string;
  postSlug: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  replies?: IComment[];
  comment: IComment;
  likedBy: string[];
}
