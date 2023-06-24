import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "XJK73BZ",
    firstName: "Tony",
    lastName: "Stark",
    username: "tonyStark",
    password: "TonyStark123",
    bookmarks: [],
    bio: "Aspring FullStack Developer",
    website: "https://adarshbalak.netlify.app",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar1.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "9PQ21YW",
    firstName: "Anuj",
    lastName: "Kumar",
    username: "anujkumar",
    password: "anujy05",
    bookmarks: [],
    bio: "Aspring FrontEnd Developer",
    website: "https://anujkumar.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar2.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "G4M98HL",
    firstName: "Hrishi",
    lastName: "Bar",
    username: "hrishi11",
    password: "hrishi112",
    bio: "Something",
    website: "https://hrishib.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar3.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "L3N67DF",
    firstName: "Rohan",
    lastName: "Bond",
    username: "rohanB",
    password: "rohanBB",
    bio: "I am open to marry please DM me",
    website: "https://rohanspage.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar4.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "T2K45VR",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "john05",
    bio: "Something",
    website: "https://johndoe.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar5.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
