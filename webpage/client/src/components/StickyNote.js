import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import ShareStickyNoteButton from "./ShareStickyNoteButton";

const StickyNote = ({ id, text, date, handleDeleteNote, handleShareNote}) => {
	return (
		<div className='StickyNote'>
			<span>{text}</span>
			<div className='StickyNote-footer'>
				<small>{date}</small>
				<IconButton
				sx={{ color: "black" }}
				onClick={() => handleDeleteNote(id)}
                className='delete-icon'
                size='1.3em'>
                  <DeleteIcon />
                </IconButton>
                <ShareStickyNoteButton documentId = {id} />

			</div>
		</div>
	);
};

export default StickyNote;