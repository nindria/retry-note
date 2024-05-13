class NoteApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  
    this.notes = []; 
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
        /* CSS untuk style komponen di dalam shadow DOM */
        
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
        }
        .note {
            font-family: 'poppins', sans-serif;
            background-color: #20665b;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .custom-form {
            background-color:#20665b;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: white;
        }
        form {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
        }
        form div {
            margin-bottom: 10px;
            text-align: center;
        }
        form label {
            margin-bottom: 5px;
            text-align: center;
        }
        label {
            font-weight: bold;
        }
        input {
            width: 50%;
            padding: 5px;
            border-radius: 5px;
            font-family: 'barlow', sans-serif;
        }
        textarea {
            width: 50%;
            padding: 5px;
            height: 100px;
            border-radius: 20px;
            font-family: 'barlow', sans-serif;
        }
        .delete-button  {
            padding: 5px 10px;
            background-color: maroon;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            position: absolut;
        }

        button[type="submit"] {
            background-color: #007bff; /* warna biru */
            width: 20%;
            color: #fff;
            padding: 5px 10px;
            border: none;
            cursor: pointer;
            border-radius: 15px;
        }
    </style>
    <div class="loading">${this.isLoading ? 'loading...' : ''}</div>
    <div class="grid-container"></div>
    <div class="custom-form">
        <form id="add-note-form">
            <div>
                <label for="title">Judul:</label>
                <input type="text" id="title" name="title" required>
            </div>
            <div>
                <label for="body">Catatan:</label>
                <textarea id="body" name="body" required></textarea>
            </div>
            <div class="container">
                <button type="submit">Tambah Catatan</button>
            </div>
        </form>
    </div>
    `;
    this.getNotes();
    
    const addNoteForm = this.shadowRoot.querySelector('#add-note-form');
    const addButton = addNoteForm.querySelector('button[type="submit"]');
    addButton.addEventListener('click', this.callAddNote.bind(this));
    
  }

  async getNotes() {
    try {
      this.shadowRoot.querySelector('.loading').style.display = "block";
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
    
      this.notes = data.data;
      this.isLoading = false;
      this.renderNotes();
    } catch (error) {
      
      this.isLoading = false;
    }
    this.shadowRoot.querySelector('.loading').style.display = "none";
  }
  
  async addNote(title, body) {
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        throw new Error('gagal menambahkan note');
      }
      
      const data = await response.json();
      console.log(data);
      this.notes.push(data.data);
      this.renderNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  async deleteNote(index) {
    try {
      const noteId = this.notes[index].id;
      console.log(noteId);
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('gagal menghapus note:', error);
      }

      this.notes.splice(index, 1);
      this.renderNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  renderNotes() {
    const container = this.shadowRoot.querySelector('.grid-container');
    container.innerHTML = ''; // Bersihkan container sebelum menambahkan catatan baru
  
    this.notes.forEach((note, index) => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
  
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <p><strong>Created At:</strong> ${new Date(note.createdAt).toLocaleString()}</p>
        <p><strong>Archived:</strong> ${note.archived ? 'Yes' : 'No'}</p>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
  
      container.appendChild(noteElement);
    });
  
    // Tambahkan event listener untuk tombol delete
    container.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        this.deleteNote(index);
      });
    });
  }

  callAddNote() {
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    
    this.addNote(titleInput.value, bodyInput.value);
    
    // Reset nilai input setelah menambahkan catatan
    
  }
};

customElements.define('note-app', NoteApp);