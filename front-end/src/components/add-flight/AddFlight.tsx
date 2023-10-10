import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Menu,
  MenuItem,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import "./AddFlight.scss";
import AllImages from "../../constant/images";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/internals/models";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  getAllAirportList,
  searchFlights,
} from "../../services/Booking.service";
import { AirportInfo } from "../../interfaces/AirportSearch.interface";
import { useForm } from "react-hook-form";
import { addFlight, editFlight } from "../../services/Flight.service";
import { AddFlightInterface } from "../../interfaces/AddFlight.interface";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";

const AddFlight = ({
  setSearchData,
  flightData,
  setIsEdit,
}: AddFlightInterface) => {
  const { register, handleSubmit, setValue: formSetvalue, reset } = useForm();
  const token = localStorage.getItem("token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
  const [file, setFile] = useState("");
  const options: string[] = ["Dubai(DXB)", "Ahmedabad(AHB)"];
  const [openSelectUserModel, setOpenSelectUserModel] =
    useState<boolean>(false);

  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [airportData, setAirportData] = useState<AirportInfo[]>([]);
  const [toAirportData, setToAirportData] = useState<AirportInfo[]>([]);
  const [files, setFiles] = useState<File>();
  const [fromAirport, setFromAirport] = useState<string>("delhi");
  const debouncedFromVal = useDebounce(fromAirport, 500);
  const [toAirport, setToAirport] = useState<string>("delhi");
  const debouncedToVal = useDebounce(toAirport, 500);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdultIncrement = () => {
    setAdults(adults + 1);
  };

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
  };

  const handleAdultDecrement = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };

  const handleChildrenDecrement = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getData = async () => {
    const data = await getAllAirportList({
      params: {
        param: fromAirport,
      },
    });
    if (data?.length > 0) setAirportData(data);
  };

  useEffect(() => {
    getData();
  }, [debouncedFromVal]);

  const getToData = async () => {
    const data = await getAllAirportList({
      params: {
        param: toAirport,
      },
    });
    if (data?.length > 0) {
      setToAirportData(data);
    }
  };

  useEffect(() => {
    getToData();
  }, [debouncedToVal]);

  const handleSelectedUser = () => {
    setOpenSelectUserModel(true);
  };

  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs(),
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFiles(selectedFile);
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = (data: any) => {
    if (token && userDetails?.userRole?.name === "flight") {
      if (flightData && flightData?.id !== null) {
        const reqObj = {
          name: data.companyName,
          departure: dayjs(data?.fromDate?.toString()).format("DD/MM/YYYY"),
          return: dayjs(data?.toDate?.toString()).format("DD/MM/YYYY"),
          from: data.fromAirport,
          to: data.toAirport,
        };
        editFlight({ params: { flightId: flightData?.id }, data: reqObj })
          .then((res) => {
            setIsEdit && setIsEdit(false);
            reset();
            toast.success("Flight details edited successfully!!!", {
              autoClose: 4000,
            });
          })
          .catch((err) => {
            toast.error(err?.message);
          });
          return;
      }
      const formData = new FormData();
      if (files) {
        formData.append("image", files, files.name);
        formData.append("from", data.fromAirport);
        formData.append("to", data.toAirport);
        formData.append(
          "departure",
          dayjs(data?.fromDate?.toString()).format("DD/MM/YYYY")
        );
        formData.append(
          "return",
          dayjs(data?.toDate?.toString()).format("DD/MM/YYYY")
        );
        formData.append("name", data.companyName);
        addFlight({ data: formData })
          .then((res) => {
            reset();
            toast.success("Flight Added Successfully!!!", { autoClose: 4000 });
          })
          .catch((err) => {
            toast.error(err?.message, { autoClose: 4000 });
          });
      }
    } else {
      const reqObj = {
        departure: dayjs(data?.fromDate?.toString()).format("DD/MM/YYYY"),
        return: dayjs(data?.toDate?.toString()).format("DD/MM/YYYY"),
        from: data?.fromAirport,
        to: data?.toAirport,
      };
      searchFlights({ data: reqObj })
        .then((res) => {
          setSearchData && setSearchData(res);
        })
        .catch((err) => {
          toast.error(err?.message, { autoClose: 4000 });
        });
    }
  };

  useEffect(() => {
    if (flightData) {
      formSetvalue("fromAirport", flightData.from);
      formSetvalue("toAirport", flightData.to);
      formSetvalue("fromDate", flightData.departure);
      formSetvalue("toDate", flightData.return);
      formSetvalue("companyName", flightData.name);
      setFile(flightData?.image);
    }
  }, [flightData]);

  return (
    <Paper
      elevation={3}
      className={`flight-container ${token && userDetails?.userRole?.name === "flight" && "modal-popup"
        }`}
    >
      {flightData && flightData?.id !== null ? (
        <h1 className="edit-flight">Edit Flight</h1>
      ) : (
        <div className="add-flight-header">
          <img src={AllImages.planeFilled} width={20} height={20} />
          <span className="add-flight">
            {token && userDetails?.userRole?.name === "flight"
              ? flightData && flightData?.id !== null
                ? "Edit Flight"
                : "+ Add Flight"
              : "Flights"}
          </span>
          <span className="active-slide" />
        </div>
      )}
      {token && userDetails?.userRole?.name === "flight" && (
        <div className="file-upload-form">
          {file ? (
            <img src={file} className="uploaded-file-preview" />
          ) : (
            <div className="image-container" />
          )}
          {!flightData && (
            <div className="file-upload-container">
              <label className="profile-label">profile picture</label>
              <label className="profile-label-placeholder">
                PNG or JPG no bigger than 800px wide and tall.
              </label>
              <input
                type="file"
                id="actual-btn"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
              />
              <label htmlFor="actual-btn" className="browse-button">
                <img src={AllImages.browseFiles} />
                Browse
              </label>
            </div>
          )}
          <Divider className="profile-divider" />
          <div className="company-name">
            <label className="profile-label">Name</label>
            <TextField
              id="standard-required"
              hiddenLabel
              placeholder="Company full name"
              variant="standard"
              className="company-name-field"
              {...register("companyName")}
            />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`sub-main ${userDetails?.userRole?.name === "flight" ? (flightData && flightData?.id !== null) ? "edit-flight-form" : "add-flight-form" : ""}`}>
          <div className="flight-container">
            <div className="flight">
              <div className="flight-form-text">Flying form</div>
              <div className="select-airport">
                <div className="flight-departure">
                  <img src={AllImages.departure} />
                </div>
                <Autocomplete
                  sx={{
                    display: "inline-block",
                    "& input": {
                      width: 93,
                      bgcolor: "background.paper",
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.background.paper
                        ),
                    },
                  }}
                  componentsProps={{
                    paper: {
                      sx: {
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "20px",
                        height: "100%",
                        borderRadius: "20px",
                        width: "460px",
                        color: "var(--light-text)",
                      },
                    },
                  }}
                  onInputChange={(event, value) => {
                    setFromAirport(value);
                  }}
                  id="custom-input-demo"
                  options={airportData}
                  onChange={(event, newValue) =>
                    formSetvalue("fromAirport", newValue?.name)
                  }
                  renderInput={(params: any) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        placeholder="Dubai(DXB)"
                      />
                    </div>
                  )}
                  getOptionLabel={(option) => option?.name}
                />
              </div>
            </div>
            <div className="flight-swap">
              <img src={AllImages.swap} />
            </div>
            <div className="flight">
              <div className="flight-form-text">Flying to</div>
              <div className="select-airport">
                <div className="flight-departure">
                  <img src={AllImages.arrival} />
                </div>
                <Autocomplete
                  sx={{
                    display: "inline-block",
                    "& input": {
                      width: 93,
                      bgcolor: "background.paper",
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.background.paper
                        ),
                    },
                  }}
                  componentsProps={{
                    paper: {
                      sx: {
                        fontFamily: "Montserrat",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "20px",
                        height: "100%",
                        borderRadius: "20px",
                        width: "460px",
                        color: "var(--light-text)",
                      },
                    },
                  }}
                  id="custom-input-demo"
                  options={toAirportData}
                  onChange={(event, newValue) =>
                    formSetvalue("toAirport", newValue?.name)
                  }
                  onInputChange={(event, value) => {
                    setToAirport(value);
                  }}
                  renderInput={(params: any) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        placeholder="Dubai(DXB)"
                      />
                    </div>
                  )}
                  getOptionLabel={(option) => option?.name}
                />
              </div>
            </div>
          </div>
          {!flightData && <Divider className="flight-details-divider" />}
          <div
            className={`custom-styling-date-picker ${flightData && flightData?.id !== null && "edit-flight-date-picker"
              }`}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DateRangePicker", "DateRangePicker"]}
              >
                <DemoItem component="DateRangePicker">
                  <DateRangePicker
                    localeText={{ start: "Departure", end: "Return" }}
                    value={value}
                    onChange={(newValue: any) => {
                      formSetvalue("fromDate", new Date(newValue[0]));
                      formSetvalue("toDate", new Date(newValue[1]));
                      setValue(newValue);
                    }}
                    className="date-range-picker"
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          {userDetails?.userRole?.name !== "flight" &&
            <>
              {<Divider className="flight-details-divider" />}
              <div className="travelers">
                <div className="traveler-text">Travelers</div>
                <div className="choose-traveler" onClick={handleSelectedUser}>
                  <div className="user-logo">
                    <img src={AllImages.users} />
                  </div>
                  <div className="selected-user">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <span>{`${adults} Adults, ${children} Children`}</span>
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      className="select-travelers"
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem className="counter" disableRipple>
                        <Box>
                          <div className="modal-container">
                            <div className="adults-main">
                              <div className="adults-text">Adults</div>
                              <div className="adult-count">
                                <span>
                                  <img
                                    src={AllImages.minus}
                                    className="plus"
                                    onClick={handleAdultDecrement}
                                    alt="Minus Icon"
                                  />
                                  <p>{adults} Adults</p>
                                  <img
                                    src={AllImages.plus}
                                    className="plus"
                                    onClick={handleAdultIncrement}
                                    alt="Plus Icon"
                                  />
                                </span>
                              </div>
                            </div>
                            <div className="adults-main">
                              <div className="adults-text">Children</div>
                              <div className="adult-count">
                                <span>
                                  <img
                                    src={AllImages.minus}
                                    className="plus"
                                    onClick={handleChildrenDecrement}
                                    alt="Minus Icon"
                                  />
                                  <p>{children} Children</p>
                                  <img
                                    src={AllImages.plus}
                                    className="plus"
                                    onClick={handleChildrenIncrement}
                                    alt="Plus Icon"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            className="selected-btn"
                            variant="contained"
                            onClick={handleClose}
                          >
                            Done
                          </Button>
                        </Box>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            </>
          }

          <Button
            className={`search-btn ${userDetails?.userRole?.name === "flight" ?
                flightData &&
                flightData?.id !== null
                ? "edit-flight-button"
                : "add-flight-button"
                :""
              }`}
            variant="contained"
            type="submit"
            startIcon={userDetails?.userRole?.name === "user" && (
                <img src={AllImages.search} />
              )
            }
          >
            {userDetails?.userRole?.name === "flight"
              ? flightData && flightData?.id !== null
                ? "Save"
                : "Add"
              : "Search"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AddFlight;
