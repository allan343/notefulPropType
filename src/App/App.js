import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';
import AddFolderError from '../AddFolder/AddFolderError';
import NoteFullError from '../NoteFullError';
import AddNote from '../AddNote/AddNote'
import AddNoteError from '../AddNote/AddNoteError'
import config from '../config';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok){
                    return foldersRes.json().then(e => Promise.reject(e));
                }
                
                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                console.log(notes);
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = (folderName,folderId) => {
        console.log("folder here");
        this.state.folders.push({name:folderName,id:folderId});
        this.setState({
            folders: this.state.folders
        });
    };
    
    
    handleAddNote = (noteName,noteId,folderId,content, modified) => {
        console.log("note here" + modified);
        this.state.notes.push({name:noteName,id:noteId, content: content, folderId: folderId, modified: modified});
        this.setState({
            notes: this.state.notes
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
               
                {/*<Route path="/add-note" component={NotePageNav} />*/}
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
            <NoteFullError>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                 <Route path="/add-folder" render={
                    (routeProps)=>{return <AddFolderError><AddFolder {...routeProps}>
                        </AddFolder></AddFolderError> 
                    }} />

<Route path="/add-note" render={
                    (routeProps)=>{return <AddNoteError><AddNote {...routeProps}>
                        </AddNote></AddNoteError> 
                    }} />

                <Route path="/note/:noteId" component={NotePageMain} />
                </NoteFullError>
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (

            <NoteFullError>
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
            </NoteFullError>
        );
    }
}

export default App;
