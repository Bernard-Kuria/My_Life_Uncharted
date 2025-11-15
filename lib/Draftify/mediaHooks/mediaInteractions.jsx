export function dropHandler(e, setFile, setFileName) {
  e.preventDefault();
  [...e.dataTransfer.items].forEach((item) => {
    if (item.kind === "file") {
      const fileObj = item.getAsFile();
      if (fileObj) {
        setFile(fileObj); // store actual File
        setFileName(fileObj.name);
      }
    }
  });
}

export function onFileChange(e, setFile, setFileName) {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile); // store actual File
    setFileName(selectedFile.name);
  }
}

export function dragHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "blue";
  }
}

export function dragLeaveHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "grey";
  }
}
