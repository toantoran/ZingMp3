import axios from "axios";
import { notification } from "antd";
import { Dispatch } from "react";
import { SongDetail, SongInAlbum } from "@constants/types/songDetailTypes";
import {
	favActionTypes,
	FavListAction,
	FavListStorageAction,
} from "@constants/types/favListTypes";

export const addFav = (song: SongDetail | SongInAlbum) => (
	dispatch: Dispatch<FavListAction>
) => {
	dispatch({
		type: favActionTypes.ADD_FAV,
		payload: song.id,
	});
	const list = getListFromStorage();
	if (list.length > 0) {
		list.push(song.id);
		localStorage.setItem("favList", list.join("."));
	} else {
		localStorage.setItem("favList", song.id.toString());
	}
	openSuccessNoti(song);
};

export const removeFav = (song: SongDetail | SongInAlbum) => (
	dispatch: Dispatch<FavListAction>
) => {
	dispatch({
		type: favActionTypes.REMOVE_FAV,
		payload: song.id,
	});
	const list = getListFromStorage();
	if (list.length > 0) {
		localStorage.setItem(
			"favList",
			list.filter((item) => item !== song.id).join(".")
		);
	}
	openErrorNoti(song);
};

export const getListFromStorage = () => {
	const list = localStorage.getItem("favList");
	if (list === null || list.trim().length === 0) {
		return [];
	} else {
		return list
			.trim()
			.split(".")
			.map((item) => parseInt(item));
	}
};

export const dispatchListFromStorage = () => (
	dispatch: Dispatch<FavListStorageAction>
) => {
	dispatch({
		type: favActionTypes.GET_FAV_STORAGE,
		payload: getListFromStorage(),
	});
};

export const getFullFavList = (list: number[]) => {
	const promises = list.map((id) => {
		return axios({
			method: "GET",
			url: `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
			headers: {
				"content-type": "application/octet-stream",
				"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
				"x-rapidapi-key": "3319f523f7msh49e3d6c5c3ee4b4p19f9fajsn66e90ad6334c",
				useQueryString: true,
			},
		}).then((res) => {
			if (res.status === 200) return res.data;
			else return null;
		});
	});
	return Promise.all(promises);
};

export const getFullFavItem = (id: number) => {
	return axios({
		method: "GET",
		url: `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
		headers: {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
			"x-rapidapi-key": "3319f523f7msh49e3d6c5c3ee4b4p19f9fajsn66e90ad6334c",
			useQueryString: true,
		},
	})
		.then((res) => {
			if (res.status === 200) return res.data;
			else return null;
		})
		.catch((err) => console.log(err));
};

const openSuccessNoti = (song: SongDetail | SongInAlbum) => {
	notification["success"]({
		message: "Thêm thành công",
		description: `${song.title} - ${song.artist.name} đã được thêm vào danh sách yêu thích`,
		placement: "topRight",
	});
};
const openErrorNoti = (song: SongDetail | SongInAlbum) => {
	notification["error"]({
		message: "Xóa thành công",
		description: `${song.title} - ${song.artist.name} đã được xóa khỏi danh sách yêu thích`,
		placement: "topRight",
	});
};