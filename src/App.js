import { useState } from "react";

import "./App.css";
import { Table } from "./Components/Table";
import { Modal } from "./Components/Model";

const dummyRows=[{
  title: "HTMl",
  description: "Hyper Text Markup Language used to create websites ",
  category: "work",
},
{
  title: "CSS",
  description: "Cascading Style Sheets used to style the html elements",
  category: "Personal",
},
{
  title: "Javascript",
  description: "Javascript is used to build a dynamic web pages.",
  category: "others",
},
];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTitle,setserachTitle] = useState("");
  const [rows, setRows] = useState(dummyRows);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };
  const onSearchTitle=(e)=>{
    setserachTitle(e.target.value)

  }
  const filterRows=rows.filter(each=>each.title.toLowerCase().includes(searchTitle.toLowerCase()))

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="heading">Personal Notes Manager</h1>
        <input className="searcht" placeholder="...Search title" value={searchTitle} onChange={onSearchTitle}/>
      </nav>
      {filterRows.length>0 ? (<>
      <Table rows={filterRows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Create
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}</>):
      (<div className="notFound">
        <h1>Not Found ..oops</h1>
      </div>)}
    </div>
  );
}

export default App;