import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem,
  InputLabel
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import '../Leads/lead_css.css';
import { CasesUrl } from "../../components/ApiUrls";
import { UseForm } from "../../components/UseForm";
import { fetchData } from "../../components/FetchData";
import { Appbar } from "../../components/Appbar";

const textFieldStyled = makeStyles(() => ({
  root: {
    borderLeft: "2px solid red",
    height: "40px"
  },
  fieldHeight: {
    height: "40px"
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 310,
    },
  },
};

export const EditCases = (props) => {
  const { state } = useLocation();
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState("");
  const [msg, setMsg] = useState("");
  const [responceError, setResponceError] = useState(false);
  const navigate = useNavigate();
  const textFieldClasses = textFieldStyled();
  const theme = useTheme();

  const validatation = () => {
    let flag = true
    if (!(val.hasOwnProperty('name')) || val.name === "") {
      flag = false
      setError("*required  field")
      setMsg('name')
    }
    else if (!(val.hasOwnProperty('status')) || val.website === "") {
      setError("*required field")
      setMsg('status')
      flag = false
    } else if (!(val.hasOwnProperty('priority')) || val.phone === "") {
      setError("*required field")
      setMsg('priority')
      flag = false
    } else if (!(val.hasOwnProperty('closed_on')) || val.email === "") {
      setError("*required field")
      setMsg('closed_on')
      flag = false
    } else {
      setError("")
      setMsg('')
    }
    return flag
  }

  const submitCallBack = () => {

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "jwt " + localStorage.getItem('Token'),
      org: 3
    };
    if (validatation()) {
      fetchData(`${CasesUrl}/${state.caseId}/`, "PUT", JSON.stringify(val), headers)
      .then((data) => {
        if (!data.error) {
          setResponceError(data.error);
          navigate('/cases')
        }
        if (data.error) {
          setResponceError(data.error);
          setErrors(data.errors);
        }
      })
      .catch((error) => {
      });
    }
  };

  const backbtnHandle = () => {
    navigate('/cases')
  }

  const [val, onChange, onSubmit] = UseForm(submitCallBack);
  const module = "Cases";
  const crntPage = "Edit Cases";
  const backBtn = "Back To Cases";

  return (
    <div>
      <form onSubmit={ onSubmit }>
       <Appbar backbtnHandle={ backbtnHandle } module={ module } backBtn={ backBtn } crntPage={ crntPage }/>
        {/* contact details */}
        <div style={{ padding: "10px" }}>
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{
                    marginBottom: "15px",
                    fontWeight: "bold", color: "#1A3353"
                  }}>
                    Cases Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%' }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="fieldContainer"
                    style={{ color: "#1A3353", fontWeight: "normal" }}>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Name</div>
                      <TextField
                        error={ msg == "name" || errors.name ? true : false }
                        name="name"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        defaultValue={ state.cases_obj && state.cases_obj.name }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        required={msg == "name" || msg === "required" ? true : false}
                        helperText={
                          (error && msg === "name") || msg === "required" || responceError
                           ? errors ? errors.name ? errors.name : "" : error : ""
                        }>
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Contacts</div>
                      <TextField
                        error={ msg == "contacts" || errors.contacts ? true : false }
                        name="contacts"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        defaultValue={ state.cases_obj && state.cases_obj.contacts }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "contacts") || msg === "required" || responceError
                           ? errors ? errors.contacts ? errors.contacts : "" : error : ""
                        }>
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer"
                    style={{ color: "#1A3353", fontWeight: "normal" }}>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Status</div>
                      <FormControl sx={{
                        width: 330,
                        borderLeft: "2px solid red",
                        height: "40px"
                      }} >
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="status"
                          size="small"
                          defaultValue={state.cases_obj && state.cases_obj.status}
                          onChange={onChange}
                          MenuProps={MenuProps}
                          InputProps={{
                            classes: {
                              root: textFieldClasses.root
                            }
                          }}>
                          {
                            state.status && state.status.map((option) => (
                              <MenuItem key={option[1]} value={option[0]}>
                                {option[0]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Teams</div>
                      <TextField
                        error={msg == "teams" || errors.teams ? true : false}
                        name="teams"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "teams") || msg === "required" || responceError
                          ? errors ? errors.teams ? errors.teams : "" : error : ""
                        }>
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer"
                    style={{ color: "#1A3353", fontWeight: "normal" }}>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Priority</div>
                      <FormControl sx={{ width: 330 }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="priority"
                          size="small"
                          value={ state.cases_obj && state.cases_obj.priority }
                          onChange={ onChange }
                          MenuProps={ MenuProps }>
                          {
                            state.priority && state.priority.map((option) => (
                              <MenuItem key={ option[1]} value={option[0] }>
                                { option[0] }
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Users</div>
                      <TextField
                        error={ msg == "users_mention" || errors.users_mention ? true : false }
                        name="users_mention"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        required={ msg == "users_mention" || msg === "required" ? true : false }
                        helperText={
                          (error && msg === "users_mention") || msg === "required" || responceError
                          ? errors ? errors.users_mention ? errors.users_mention : "" : error : ""
                        }>
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer"
                    style={{ color: "#1A3353", fontWeight: "normal" }}>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Type Of Case</div>
                      <FormControl sx={{ width: 330 }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="case_type"
                          size="small"
                          value={ state.cases_obj && state.cases_obj.case_type }
                          onChange={ onChange }
                          MenuProps={ MenuProps }>
                          {
                            state.type_of_case && state.type_of_case.map((option) => (
                              <MenuItem key={option[1]} value={option[0]}>
                                {option[0]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Assigned Users</div>
                      <TextField
                        error={ msg == "assigned_to" || errors.assigned_to ? true : false }
                        name="assigned_to"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "assigned_to") || msg === "required" || responceError
                            ? errors ? errors.assigned_to ? errors.assigned_to : "" : error : ""
                        }>
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer2"
                    style={{ color: "#1A3353", fontWeight: "normal" }}>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Account</div>
                      <TextField
                        error={ msg == "account" || errors.account ? true : false }
                        name="account"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        required={ msg == "account" || msg === "required" ? true : false }
                        helperText={
                          (error && msg === "account") || msg === "required" || responceError
                          ? errors ? errors.account ? errors.account : "" : error : ""
                        }>
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Closed Date</div>
                      <TextField
                        error={ msg == "closed_on" || errors.closed_on ? true : false }
                        name="closed_on"
                        id="outlined-error-helper-text"
                        onChange={ onChange }
                        defaultValue={ state.cases_obj && state.cases_obj.closed_on }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        required={ msg == "closed_on" || msg === "required" ? true : false }
                        helperText={
                          (error && msg === "closed_on") || msg === "required" || responceError
                            ? errors ? errors.closed_on ? errors.closed_on : "" : error : ""
                        }>
                      </TextField>
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Description details  */}
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{
                    marginBottom: "15px",
                    fontWeight: "bold",
                    color: "#1A3353"
                  }}>
                    Description
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%' }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="DescriptionDetail"
                    style={{ color: "#1A3353", fontWeight: "normal" }}>
                    <div className="descriptionSubContainer">
                      <div className="descriptionTitle">Description</div>
                      <TextareaAutosize
                        aria-label="minimum height"
                        name="description"
                        minRows={ 8 }
                        defaultValue={ state.cases_obj && state.cases_obj.description }
                        onChange={ onChange } style={{ width: "80%", padding: "5px" }}
                        placeholder="Add Description"
                      />
                    </div>
                    <div>
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </form>
    </div>
  )
}