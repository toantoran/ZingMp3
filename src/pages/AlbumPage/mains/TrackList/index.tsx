// Libs
import React from "react";
// Components
import TrackItem from "../../components/TrackItem";
// Types
import { Track } from "@constants/DataTypes/TrackTypes";

interface Props {
	list: Track[];
	currentTrackIndex: number;
	currentTime: number;
	duration: number;
	setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
	setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}

const TrackList: React.FC<Props> = ({
	list,
	currentTrackIndex,
	setCurrentTrackIndex,
	setCurrentTime,
	currentTime,
	duration,
}) => {
	return (
		<div className="track-list-wrapper">
			<h2 className="text-upper">Tiếp theo</h2>
			{list.map((item, id) => (
				<TrackItem
					item={item}
					index={id}
					key={id}
					setCurrentTrackIndex={setCurrentTrackIndex}
					setCurrentTime={setCurrentTime}
					isPlaying={id === currentTrackIndex}
					currentTime={currentTime}
					duration={duration}
				/>
			))}
		</div>
	);
};

export default TrackList;
