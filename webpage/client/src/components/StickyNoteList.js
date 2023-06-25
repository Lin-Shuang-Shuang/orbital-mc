import StickyNote from './StickyNote';
import AddStickyNote from './AddStickyNote';

const StickyNoteList = ({ notes, handleAddNote, handleDeleteNote }) => {
	return (
		<div className='StickyNoteList'>
		{notes.map((note) => (
		  <StickyNote
		    id={note.id}
            text={note.text}
            date={note.date}
            handleDeleteNote={handleDeleteNote}/>

		  ))}
		  <AddStickyNote
		  handleAddNote={handleAddNote}
		  />


		</div>
	);
};

export default StickyNoteList;