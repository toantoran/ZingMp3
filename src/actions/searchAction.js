import { searchActionTypes } from "./types";
import { setLoadingSearch } from "./loadingAction";
import axios from "axios";

export const searchSong = (query, page, pageSize) => (dispatch) => {
	dispatch(setLoadingSearch(true));
	axios({
		method: "GET",
		url: "https://deezerdevs-deezer.p.rapidapi.com/search",
		headers: {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": "3319f523f7msh49e3d6c5c3ee4b4p19f9fajsn66e90ad6334c",
			useQueryString: true,
		},
		params: {
			q: query,
			limit: pageSize,
			index: (page - 1) * pageSize,
		},
	})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: searchActionTypes.SEARCH_SONG,
					payload: response.data,
				});
				dispatch(setLoadingSearch(false));
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

export const emptySearch = () => (dispatch) => {
	dispatch({ type: searchActionTypes.EMPTY_SEARCH });
};
