declare interface User {
  _id: string;
  name: string;
  email: string;
  googleId: string;
  dateCreated: Date;
  imageUrl: string;
  campaigns: Campaign[];
}
