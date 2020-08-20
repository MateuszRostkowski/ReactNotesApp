import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import getNotesList from "../helpers/getNotesList";
import { ListNoteItem } from "../helpers/interfaces";
import AddNote from "./AddNote";
import { CSSTransition } from "react-transition-group";

function SideBar() {
  const [addMode, setAddMode] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [showNotesList, setShowNotesList] = useState(false);
  const { noteId } = useParams();
  useEffect(() => {
    const list = getNotesList();
    setNotesList(list);
  }, [addMode]);

  const toggleMode = () => setAddMode(!addMode);
  return (
    <>
      <div
        className="sidebar-toggle"
        onClick={() => setShowNotesList(!showNotesList)}
      >
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-1"></span>
      </div>
      <CSSTransition
        in={showNotesList}
        timeout={200}
        classNames="sidebar-wrapper"
      >
        <div className="sidebar-wrapper">
          <div className="sidebar-container">
            <h1>Notes app</h1>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
            >
              Add note
            </a>
            <div className="links-container">
              {notesList.map((item: ListNoteItem, index: number) => {
                return (
                  <Link
                    key={index}
                    to={`/${item.name}`}
                    className={noteId === item.name ? "active-item" : ""}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </CSSTransition>
      {addMode && <AddNote toggleMode={toggleMode} />}
    </>
  );
}

export default SideBar;
