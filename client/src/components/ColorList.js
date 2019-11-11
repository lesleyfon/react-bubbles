import React, { useState, useEffect } from "react";
import api from "./../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  useEffect(()=>{

  },[colorToEdit.id,])
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    api().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      // console.log(res.data)
      })
      .catch(err=>{
        throw new Error(err.response)
      })
      api().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res=>{
        window.location.reload();
      })
      .catch(err=>{
        throw new Error(err.response)
      })
      // Make a put request to save your updated color
      // think about where will you get the id from...
      // where is is saved right now?
    };
    
    const deleteColor = color => {
      // make a delete request to delete this color
      api().delete(`/api/colors/${color.id}`)
      .then(res=>{
        window.location.reload();
        })
        .catch(err=>{
          throw new Error(err.response)
        })
    console.log(color)
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => ( 
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <AddColor />
    </div>
  );
};

export default ColorList;


 function AddColor() {
  const [colors, setColor] = useState({ 
    color: '', 
    code: '',
    id : Date.now()
   })

   function handleColorFormChange (e){
     setColor({
       ...colors,
       [e.target.name]: e.target.value || {hex: e.target.value}
       //code: 
     })
     
   }
   function handleColorFormSubmit(e){
     e.preventDefault();
     console.log(colors)
     setColor({
      ...colors,
      [e.target.name]:'' || {hex: ''}
      //code: 
    })
   }
  //  {
  //   color: "aqua",
  //   code: {
  //     hex: "#00ffff"
  //   },
  //   id: 3
  // },
  return (
    <form onSubmit={ handleColorFormSubmit }>
        <input 
          type='text'
          name = 'color'
          value = {colors.color}
          onChange={ handleColorFormChange}
        />
        <input 
          type='text'
          name = 'code'
          value = {colors.code.hex}
          onChange={ handleColorFormChange}
        />
        <button>Submit</button>
    </form>
  )
}
