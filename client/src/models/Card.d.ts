declare interface Card {
  _id: string;
  campaign: Campaign;
  dateCreated: Date;
  dateLastModified: Date;
  description: string;
  name: string;
  imageUrl: string;
  privateDescription: string;
  tags: Tag[];
  hidden: boolean;
}
