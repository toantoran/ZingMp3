import {
	detailActionTypes,
	SongDetail,
	SimilarSongAction,
	CommentAction,
	EmptyAction,
} from "@constants/types/songDetailTypes";
import { setLoadingDetail } from "@actions/loadingAction";
import { LoadingDispatchAction } from "@constants/types/loadingTypes";
import axios from "axios";
import comments from "@mocks/comments";
import { proxy } from "./corsProxy";
import { Dispatch } from "react";

export const getSongDetail = (id: number) => (dispatch: Dispatch<any>) => {
	dispatch(setLoadingDetail("songdetail", true));
	dispatch(setLoadingDetail("similar", true));
	dispatch(setLoadingDetail("comments", true));

	axios({
		method: "GET",
		url: `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
		headers: {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": "3319f523f7msh49e3d6c5c3ee4b4p19f9fajsn66e90ad6334c",
			useQueryString: true,
		},
	}).then((response) => {
		if (response.status === 200) {
			dispatch({
				type: detailActionTypes.GET_SONG_DETAIL,
				payload: response.data,
			});
			dispatch(setLoadingDetail("songdetail", false));
			dispatch(getSimilarSong(response.data));
			dispatch(getComments(response.data));
		}
	});
};

export const getSimilarSong = (song: SongDetail) => (
	dispatch: Dispatch<LoadingDispatchAction | SimilarSongAction>
) => {
	const url = song.artist.tracklist.slice(0, -2) + "15";
	axios({
		method: "GET",
		url: proxy + url,
		headers: {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": "3319f523f7msh49e3d6c5c3ee4b4p19f9fajsn66e90ad6334c",
			useQueryString: true,
		},
		params: {
			q: `${song.artist.name}`,
		},
	}).then((response) => {
		if (response.status === 200) {
			dispatch({
				type: detailActionTypes.GET_SIMILAR_SONG,
				payload: response.data.data,
			});
			dispatch(setLoadingDetail("similar", false));
		}
	});
};

export const getComments = (song: SongDetail) => (
	dispatch: Dispatch<LoadingDispatchAction | CommentAction>
) => {
	setTimeout(() => {
		dispatch({
			type: detailActionTypes.GET_COMMENTS,
			payload: comments,
		});
		dispatch(setLoadingDetail("comments", false));
	}, 1500);
};

export const emptyDetail = () => (dispatch: Dispatch<EmptyAction>) => {
	dispatch({
		type: detailActionTypes.EMPTY_DETAIL,
		payload: null,
	});
};
