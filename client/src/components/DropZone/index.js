import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { useStyles } from "./styles.js";


const DropZone = ({ onFileUploaded })  => {
  const classes = useStyles();
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
     
    const fileUrl = URL.createObjectURL(file);
    
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, 
    accept: 'image/*'
  });

  return (
    <div className={classes.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      { selectedFileUrl 
        ? <img src={selectedFileUrl} alt="Point thumbnail"/>
        : (
          <p>
            <CloudUploadIcon />
            NFT image
          </p>
        )
      }
    </div>
  );
}

export default DropZone;