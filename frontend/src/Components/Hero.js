import React from "react";
import { useState } from "react";
import axios from "axios";
import uploadLoader from "../images/uploadLoader.gif";
import Loader from "react-loader-spinner";
import { FaWindowClose } from "react-icons/fa";
import { MDBCloseIcon } from "react-icons/bs";

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
  const [id,setID]=useState("");
  const [isQuerySearched,setIsQuerySearched]=useState(false);
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
        <div className="file-form-container">
          <form className="file-form">
            <div className="description-input-container">
              <label className="description">Description</label>
              <input
                type="text"
                value={description}
                className="file-form-description-input"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <span></span>
              {descriptionError ? (
                <span className="required-input">
                  This is a required field !
                </span>
              ) : (
                ``
              )}
            </div>

            <input
              className="file-input"
              type="file"
              required
              accept=".log"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            />

            <div className="file-form-submit-btn-container">
              <button
                type="submit"
                id="btn"
                onClick={handleSubmitForFile}
                className="file-form-submit-btn"
              >
                submit
              </button>
            </div>
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
            isQuerySearched?( <article className="query-response">
            <ul className="response-ul">{showResponse(queryResponse)}</ul>
          </article>):("")
          }
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Hero;
