import React from 'react';
import { useEffect, useState } from 'react';
import removeIcon from '../icons/remove.png';
import ButtonCustom from '../components/ButtonCustom'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ModuleCard = ({ moduleId}) => {
  const [moduleName, setModuleName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/getmodule/${moduleId}`)
      .then(response => response.json())
      .then(data => {
        setModuleName(data.moduleName);
        setDescription(data.moduleDescription);
      })
      .catch(error => {
        console.error('Error fetching module data:', error);
      });
  }, [moduleId]);

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm To Delete',
      message: 'This will permenantly delete the module are you sure?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
    // fetch(`http://localhost:5000/api/deletemodule/${moduleId}`, {
    //   method: 'DELETE'
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Module deleted:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error deleting module:', error);
    //   });
  };

  const handleView = () => {
    console.log('View module:', moduleId);
  };

  const moduleCardStyle ={
      background: "RGBA(0, 0, 0, 0.8)",
      width: "390px",
      height: "439px",
      borderRadius: "20px",
      position: "relative",
      flexShrink: "0",
      boxShadow: "3px 8px 10px 2px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",      
  };

  const deleteButtonStyle ={
      background: "transparent",
      border: "none",
      marginTop: "31px",
      marginLeft: "311px",
      flexShrink: "0",
      position: "absolute",
      cursor: "pointer",
  };  
   
  const moduleNameStyle ={
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "normal",
    color: " white",
    textAlign: "center",
    marginTop: "131px",
  };

  const moduleDescriptionStyle ={
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "normal",
    color: " white",
    textAlign: "center",
    marginTop: "31px",
    marginBottom: "30px",
  };

  return (
    <div className="module-card" style={moduleCardStyle}>

        <button className="delete-button" onClick={handleDelete} style={deleteButtonStyle}>
         <img src={removeIcon} alt='Remove Button'/>
        </button>
        <h3 className="module-name" style={moduleNameStyle}>{moduleName}</h3>
        <p className="module-description" style={moduleDescriptionStyle}>{description}</p>
        <ButtonCustom label='View' onClick={handleView} width="192px" height="50px"/>

    </div>
  );
};

export default ModuleCard;
