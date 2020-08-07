import { datetimeFormat } from "./chart";
import { Comment } from "@constants/types/songDetailTypes";
import { EMPTY_COMMENT } from "@constants/emptyValue/songDetail";

const comments: Comment[] = new Array(3).fill(EMPTY_COMMENT);
const generateComment: () => Comment = () => ({
	author: {
		id: 2529,
		name: "dadbond",
		link: "https://www.deezer.com/profile/2529",
		picture: "https://api.deezer.com/user/2529/image",
	},
	text:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	date: datetimeFormat(
		new Date(new Date().getTime() - Math.floor(Math.random() * 999999999))
	),
});

export default comments.map(() => generateComment());