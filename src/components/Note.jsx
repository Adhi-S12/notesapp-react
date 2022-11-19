import React, { useState, useEffect, useContext } from 'react';
import './Note.css';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { notesContext } from '../pages/Home/Home';
import axios from 'axios';
import NotesContext from '../context/NotesContext';
import AuthContext from '../context/AuthContext';

const Note = ({ note }) => {
	const [ editMode, setEditMode ] = useState(false);
	const { notes, setNotes } = useContext(NotesContext);
	const { token } = useContext(AuthContext);

	const [ editTitle, setEditTitle ] = useState(note.title);
	const [ editContent, setEditContent ] = useState(note.content);

	const handleDelete = async () => {
		try {
			const response = await axios.delete(`http://localhost:3000/notes/${note._id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.statusText == 'OK') {
				const filteredNotes = notes.filter((n) => n._id !== note._id);
				console.log(filteredNotes);
				setNotes([ ...filteredNotes ]);
			}
			console.log('Item deleted');
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = async () => {
		try {
			const response = await axios.patch(
				`http://localhost:3000/notes/${note._id}`,
				{ title: editTitle, content: editContent },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.statusText == 'OK') {
				const filteredNotes = notes.filter((n) => n._id !== note._id);
				setNotes([ ...filteredNotes, { ...note, title: editTitle, content: editContent } ]);
				setEditMode(false);
			}
			console.log('Item updated');
		} catch (error) {
			console.error(error);
		}
	};

	if (editMode) {
		return (
			<div className="note">
				<div className="editControl">
					<p className="editControlLabel">Title :</p>
					<input
						type="text"
						className="noteTitleEdit"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
				</div>
				<div className="editControl">
					<p className="editControlLabel">Content :</p>
					<textarea
						type="text"
						className="noteTitleEdit"
						value={editContent}
						onChange={(e) => setEditContent(e.target.value)}
					/>
				</div>
				<div className="editControlBtns">
					<button
						className="cancelEditBtn"
						onClick={() => {
							setEditMode(false);
							setEditTitle(note.title);
							setEditContent(note.content);
						}}
					>
						Cancel
					</button>
					<button className="submitEditBtn" onClick={handleEdit}>
						Submit
					</button>
				</div>
			</div>
		);
	}
	return (
		<div className="note">
			<h3 className="noteTitle">{note.title}</h3>
			<p className="noteContent">{note.content}</p>
			<p className="lastEdited">
				<span className="editedAt">Edited: {note.editedAt}</span>
			</p>

			<div className="btnContainer">
				<button className="editBtn" onClick={() => setEditMode(true)}>
					<CiEdit size={20} color="white" />
				</button>
				<button className="deleteBtn" onClick={handleDelete}>
					<CiTrash size={20} color="white" />
				</button>
			</div>
		</div>
	);
};

export default Note;
