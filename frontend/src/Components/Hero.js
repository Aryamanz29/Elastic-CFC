import React from "react";
import { useState } from "react";
import axios from "axios";
import uploadLoader from "../images/uploadLoader.gif";
import Loader from "react-loader-spinner";
import { FaWindowClose } from "react-icons/fa";
import { MDBCloseIcon } from "react-icons/bs";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Welcome from "./Welcome";



const Input = styled('input')({
  display: 'none',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Hero = () => {
  const [descriptionError, setDescriptionError] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileLineResponse, setFileLineResponse] = useState([]);
  const [query, setQuery] = useState("");
  const [searchSection, setSearchSection] = useState(false);
  const [queryResponse, setQueryResponse] = useState([]);
  const [id, setID] = useState("");
  const [isQuerySearched, setIsQuerySearched] = useState(false);
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);



  const handleSubmitForFile = async (e) => {
    e.preventDefault();
    if (!checkDescription(description)) {
      setDescriptionError(true);
      return;
    }
    setIsFileUploading(true);
    let response = await getResonse(description);

    setDescriptionError(false);
    let lines = await getLogLines(response.id);
    setTimeout(() => {
      setIsFileUploading(false);
      setIsFileUploaded(true);
      setSearchSection(true);
    }, 1000);
  };
  const getResonse = async (description) => {
    let formData = new FormData();
    console.log("from get_response", file, description);
    formData.append("log_file", file, file.name);
    formData.append("name", description);
    console.log(formData);
    const url = `http://localhost:8000/api/document/`;
    try {
      let response = await axios.post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }

    return null;
  };
  const getLogLines = async (id) => {
    setID(id);
    axios
      .get(`http://localhost:8000/api/get-some-log-lines/${id}/`)
      .then((res) => setFileLineResponse(res.data));
  };

  const getLogLines2 = (data) => {
    let html = data.map((line) => {
      return <li key={line.id}>{line.line}</li>;
    });
    console.log(html);
    return html;
  };
  const showResponse = (data) => {
    let html = data.map((line) => {
      return <li key={line.count}>{line.line}</li>;
    });
    return html;
  };
  const checkDescription = (description) => (description === "" ? false : true);

  const checkFile = () => {
    return false;
  };
  const handleSubmitForQuery = async (e) => {
    e.preventDefault();
    let response = await getQueryResponse(query, fileLineResponse);
  };
  const getQueryResponse = async (query, fileLineResponse) => {

    let r = axios
      .get(
        `http://localhost:8000/api/search/?q=${query}&file_id=${id}`
      )
      .then((res) => setQueryResponse(res.data));
    setIsQuerySearched(true);

    console.log(queryResponse);
  };
  return (
    <>
      <section className="hero-section">
          <Welcome></Welcome>
        <div className="file-form-container">

          <form className="file-form">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '70ch' },
              }}
              noValidate
              autoComplete="off"
              >
              <TextField id="outlined-basic" label="Description" variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                
              />
              {descriptionError ? (
                <div id="outlined-basic" style={{ color: 'red' }} variant="outlined"
                
                

                >Required Field</div>
                
              ) : (
                ``
                )}
            </Box>
            {/* <div className="description-input-container">
              <label className="description">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="file-form-description-input"
                />

              </div> */}


            <Stack spacing={6}>
              {/* <div className="m-5 p-5">

                <label htmlFor="contained-button-file" className="m-5 p-5" margin="dense">
                  <Input id="contained-button-file" required type="file"



                  />
                  <Button variant="contained" margin="dense" >
                    Upload
                  </Button>
                </label>

              </div> */}
              <label htmlFor="contained-button-file">
                <Input id="contained-button-file"
                  accept=".log"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                    setSubmitButtonEnabled(true)
                  }}

                  type="file" />
                <Button variant="contained" component="span">
                  Upload log file
                </Button>
              </label>


              <div className="m-5 p-5">
                <Button variant="contained"
                  type="submit"
                  id="btn"
                  onClick={handleSubmitForFile}
                  disabled={!submitButtonEnabled}
                >Submit</Button>

              </div>

            </Stack>

            {/* <input
              className="file-input"
              type="file"
              required
              accept=".log"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            /> */}

            {/* <div className="file-form-submit-btn-container">
              <button
                type="submit"
                id="btn"
                onClick={handleSubmitForFile}
                className="file-form-submit-btn"
              >
                submit
              </button>
            </div> */}

          </form>
        </div>
        {isFileUploading ? (
          <article className="upload-file-loader">
            <h4>uploading...</h4>

            <Loader type="ThreeDots" color="#00BFFF" height={120} width={130} />
          </article>
        ) : (
          ``
        )}
        {isFileUploaded ? (
          <article className="file-upload-success">
            <div className="close-btn-container">
              <FaWindowClose
                className="file-upload-success-close"
                onClick={() => setIsFileUploaded(false)}
              />
            </div>
            <div className="file-content">
              <ul>{getLogLines2(fileLineResponse)}</ul>
            </div>
          </article>
        ) : (
          ""
        )}
      </section>
      {searchSection ? (
        <section className="searchQuery">
          <form className="query-form">
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-btn-container">
              <button className="search-btn" onClick={handleSubmitForQuery}>
                search
              </button>
            </div>
          </form>
          {
            isQuerySearched ? (<article className="query-response">
              <ul className="response-ul">{showResponse(queryResponse)}</ul>
            </article>) : ("")
          }
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Hero;
