import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts =  [
  {
    _id: "R8S19MC",
    content:
      "I snap!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName:"Tony",
    lastName:"Stark",
    username: "tonyStark",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comment:[],
    following:[],
    followers:[],
    img:"https://culturedvultures.com/wp-content/uploads/2016/11/18375601324_cacd540a4d_z.jpg"

  },
    {
    _id: "R8S19MC",
    content:
      "I am Ironman!! 🔥",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    firstName:"Tony",
    lastName:"Stark",
    username: "tonyStark",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comment:[],
    following:[],
    followers:[],
    img:""

  },
  {
    _id: "B2V76XK",
    content:
      "Rewatching battle between naruto vs pain, Naruto makes an entrance into the Hidden Leaf Village, but doesn’t recognize his surroundings. Naruto is unable to sense the Chakra of many beloved to him, including his teacher Kakashi Hatake.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName:"Naruto",
    username: "narutoUzumaki",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comment:[],
    following:[],
    followers:[],
    img:"https://loremflickr.com/500/500"
  },
  {
    _id: "F5D83NP",
    content:
      "Waiting for Attack on Titan Final episode",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
      
    },
    firstName:"Kakshi",
    username: "kakshiOfTheSharigan",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comment:[],
    following:[],
    followers:[],
    img:"https://picsum.photos/seed/pic1/500/500"
  },
  {
    _id: "H6Q42JT",
    content:
      "Hope soon vegeta will get ultra instinct",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName:"Tanjiro",
    username: "TanjiroTheSunBreather",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comment:[],
    following:[],
    followers:[],
    img:"https://loremflickr.com/500/500/nature"
  },
  {
    _id: "W1Z95YL",
    content:
      "Waiting for Satoru Gojo to unleash his full power",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName:"Vegeta",
    username: "PrinceVegeta",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comment:[],
    following:[],
    followers:[],
    img:"https://loremflickr.com/500/500/abstract"
  },
];
