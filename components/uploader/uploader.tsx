import React, { useRef, useState } from "react";
import styled from "styled-components";

const FolderUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFolderChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      setFiles(fileArray);

      // Initiate the upload process
      setIsLoading(true);
      try {
        await uploadFiles(fileArray);
        setUploadStatus("Files uploaded successfully");
      } catch (error) {
        console.error(error);
        setUploadStatus("Error uploading files");
      }
      setIsLoading(false);
    }
  };

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("filesToUpload[]", file));

    const response = await fetch("/api/upload-files", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault(); // Necessary to allow the drop event
    // Optional: Add some visual change
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    // Optional: Change appearance to indicate the drop zone
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    // Optional: Revert visual changes
  };

  const handleDrop = (event: any) => {
    event.preventDefault();

    const files = event.target.files;

    handleFileChange(files);

    // Reset the input after handling the file
    event.dataTransfer.value = "";
  };

  const handleFileChange = (files: any) => {
    console.log("files", files);

    setAdded(true);
  };

  const [added, setAdded] = useState(false);

  const [downloadLink, setDownloadLink] = useState("");

  const handleFileUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);

        setDownloadLink(`/api/download?token=${data.token}`);
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Wrapper>
      {/* <input type="file" onChange={handleFileUpload} /> */}

      {!(added || isLoading || uploadStatus) && (
        <UploadWrapper
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleDivClick}
        >
          <>
            <input
              ref={fileInputRef}
              type="file"
              // @ts-ignore
              webkitdirectory="true"
              onChange={handleFolderChange}
              style={{ display: "none" }}
            />

            <div style={{ fontSize: "16px" }}>Click to upload a folder</div>
            <div style={{ fontSize: "12px" }}>
              Select a folder with an .svf file and related resources for
              automatic processing
            </div>
            <div style={{ fontSize: "16px" }}>or</div>

            <Button>Browse for folder</Button>
          </>
        </UploadWrapper>
      )}

      {(added || isLoading || uploadStatus) && (
        <UploadWrapper>
          <List>
            <List style={{ marginBottom: "24px" }}>
              {files.map((file) => (
                <div
                  key={file.name}
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  — {file.name}
                </div>
              ))}
            </List>

            {isLoading && <StatusWrapper>Loading...</StatusWrapper>}

            {uploadStatus && <StatusWrapper>{uploadStatus}</StatusWrapper>}
          </List>
        </UploadWrapper>
      )}
    </Wrapper>
  );
};

const StatusWrapper = styled.div`
  color: white;
  font-size: 16px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  &&&&& div {
    text-align: left;
    font-size: 12px;

    & > * + * {
      margin-top: 3px;
    }
  }
`;

const Button = styled.div`
  width: 127px;
  height: 40px;
  min-height: 40px;
  background-color: #ffde14;

  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &&&&& {
    color: black;
    font-size: 16px;
  }

  pointer-events: all;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  background: #141414;
`;

const UploadWrapper = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  margin: 20px;

  border: 2px dashed #4f4f4f;

  cursor: pointer;

  overflow: hidden;

  & * {
    color: white;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  && > * + * {
    margin-top: 10px;
  }

  & div {
    text-align: center;
  }
`;

export default FolderUploader;
