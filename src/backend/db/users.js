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
      "https://res.cloudinary.com/anujy0510/image/upload/v1652788469/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513_ac8h4f.jpg",
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
      "https://res.cloudinary.com/anujy0510/image/upload/v1652788722/Profile-pic_tuz4io.png",
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
      "https://res.cloudinary.com/anujy0510/image/upload/v1653386642/151260930_420560685681454_256005377522807930_n.jpg_s4tt5l.jpg",
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
      "https://res.cloudinary.com/anujy0510/image/upload/v1653386885/125404086_664416567582674_1469284624591573101_n.jpg_g0nqyn.jpg",
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
      "https://res.cloudinary.com/anujy0510/image/upload/v1652872171/pexels-photo-1516680_xtfewh.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
