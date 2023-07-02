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
    firstName: "Kim",
    lastName: "Taehyung",
    username: "thv",
    password: "taeTae",
    bookmarks: [],
    bio: "Hey guys! My name is V and I am a good boy",
    website: "https://ibighit.com/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar2.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "G4M98HL",
    firstName: "Jeon",
    lastName: "Jungkook",
    username: "jungkook",
    password: "jungKook",
    bio: "I change my personality with every album",
    website: "https://hrishib.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar3.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "L3N67DF",
    firstName: "Lee",
    lastName: "Ji-eun",
    username: "your-IU",
    password: "IU",
    bio: "strawberrymoon",
    website: "https://rohanspage.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar4.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "T2K45VR",
    firstName: "Ahn",
    lastName: "Hye-jin",
    username: "Hwasa",
    password: "hwasa",
    bio: "Badass me!!",
    website: "https://johndoe.netlify.app/",
    avatar:
      "https://avatars.dicebear.com/api/avataaars/avatar5.svg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
