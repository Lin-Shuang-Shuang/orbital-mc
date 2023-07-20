import StickyNote from './StickyNote';
import AddStickyNote from './AddStickyNote';

const StickyNoteList = ({ notes, handleAddNote, handleDeleteNote, handleShareNote }) => {
	return (
		<div className='StickyNoteList'>
		{notes.map((note) => (
		  <StickyNote
		    id={note.id}
            text={note.text}
            handleDeleteNote={handleDeleteNote}

            handleShareNote={handleShareNote}/>

		  ))}
		  <AddStickyNote
		  handleAddNote={handleAddNote}
		  />


		</div>
	);
};

export default StickyNoteList;