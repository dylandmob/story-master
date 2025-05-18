declare interface Campaign {
  _id: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateLastModified: Date;
  imageUrl: string;
  users: any[];
  chapters: any[];
  hidden: boolean;
  wiki: Tag[];
  tags: Tag[];
}
