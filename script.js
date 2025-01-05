document.addEventListener('DOMContentLoaded', () => {
    const lightThemeBtn = document.getElementById('light-theme-btn');
    const darkThemeBtn = document.getElementById('dark-theme-btn');
    const newNoteBtn = document.getElementById('new-note-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const noteName = document.getElementById('note-name');
    const noteContent = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');
    const noteEditor = document.getElementById('note-editor');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentTheme = localStorage.getItem('theme') || 'light';

    function applyTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${note.name} <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>`;
            li.addEventListener('click', () => editNote(index));
            notesList.appendChild(li);
            setTimeout(() => li.style.animation = 'fadeIn 0.5s', 0);
        });
    }

    function editNote(index) {
        noteName.value = notes[index].name;
        noteContent.value = notes[index].content;
        noteEditor.classList.remove('hidden');
        saveNoteBtn.onclick = () => updateNote(index);
    }

    window.editNote = editNote;

    function updateNote(index) {
        notes[index] = { name: noteName.value, content: noteContent.value };
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        noteEditor.classList.add('hidden');
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }

    window.deleteNote = deleteNote;

    newNoteBtn.addEventListener('click', () => {
        noteName.value = '';
        noteContent.value = '';
        noteEditor.classList.remove('hidden');
        saveNoteBtn.onclick = saveNote;
    });

    function saveNote() {
        const name = noteName.value;
        const content = noteContent.value;
        if (name.trim() && content.trim()) {
            notes.push({ name, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            noteEditor.classList.add('hidden');
        }
    }

    lightThemeBtn.addEventListener('click', () => applyTheme('light'));
    darkThemeBtn.addEventListener('click', () => applyTheme('dark'));

    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    applyTheme(currentTheme);
    renderNotes();
});
