import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";

const StickyNote = ({ id, text, date, handleDeleteNote }) => {
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

			</div>
		</div>
	);
};

export default StickyNote;