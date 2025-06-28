import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Grid,
  ListItemText,
  Radio,
} from "@mui/material";
import ProductList from "./ProductList"; // Importing the ProductList component
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../Componments/Header";
import NavigationLinks from "../Componments/NavigationLinks";
import Navbar from "../Componments/Navbar";

const Line = styled(Box)`
  height: 1px;
  background-color: #ddd;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledImage = styled("img")`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
`;

function OffersPage() {
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([100, 99999]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDesigners, setSelectedDesigners] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShoeSizes, setSelectedShoeSizes] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSizeChange = (event) => {
    setSelectedSizes(event.target.value);
  };
  const handleRadioChange = (event) => {
    setSelectedDesigners(event.target.value);
  };
  const handleCheckboxChange = (stateUpdater) => (event) => {
    const value = event.target.value;
    stateUpdater((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  useEffect(() => {
    const storedProductCount = localStorage.getItem("productCount");

    if (storedProductCount) {
      setProductCount(parseInt(storedProductCount));
    }
  }, []);
  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLinks />
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ marginLeft: 10 }}>
              <Typography
                variant="body"
                sx={{
                  fontWeight: 300,
                  color: "#333",
                  marginBottom: 15,
                  fontSize: 24,
                  lineHeight: 1.1,
                }}
              >
                Styles at 70% off
              </Typography>
              {/* <Typography sx={{ marginTop: 2, color: "gray" }}>
                Get to the front of the queue. Shop our newest designer menswear
                in our Just In selection to ensure you don’t miss out on the
                pieces you’ve been waiting for, and, as ever with THE OUTNET,
                you’ll be wearing these styles over and over again…
              </Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              {/* <StyledImage
                src="https://thefoomer.in/cdn/shop/products/jpeg-optimizer_PATP5153.jpg?v=1680162712"
                alt="Product Image"
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Line />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginLeft: 8,
            color: "gray",
          }}
        >
          {productCount} Results
        </Typography>
        <FormControl
          variant="outlined"
          sx={{ minWidth: 200, borderColor: "gray" }}
        >
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={sortOption}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray !important",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "gray !important",
              },
              "& .MuiInputBase-input": {
                color: "gray",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "gray !important",
              },
            }}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="recommended">Recommended</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="highestdiscount">Highest Discount</MenuItem>
            <MenuItem value="pricelow-high">Price Low - High</MenuItem>
            <MenuItem value="pricehigh-low">Price High - Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Line />
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "100%",
                p: 2,
                border: "0px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      fontWeight: 100,
                      fontSize: 18,
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    Categories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {[
                      "Coco Chanel",
                      "Ralph Lauren",
                      "Tom Ford",
                      "Giorgio Armani",
                      "Donatella Versace",
                    ].map((designer) => (
                      <FormControlLabel
                        key={designer}
                        control={
                          <Radio
                            value={designer}
                            checked={selectedDesigners === designer}
                            onChange={handleRadioChange}
                            sx={{
                              color: "gray",
                              "&.Mui-checked": {
                                color: "gray",
                              },
                            }}
                          />
                        }
                        label={designer}
                        sx={{
                          color: "gray",
                        }}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    Price
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={100}
                    max={99999}
                    sx={{
                      color: "gray",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "gray",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "gray",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#ccc",
                      },
                      "& .MuiSlider-active": {
                        backgroundColor: "gray",
                      },
                      "& .MuiSlider-valueLabel": {
                        color: "gray",
                      },
                      "& .MuiSlider-valueLabel": {
                        color: "initial",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "gray",
                    }}
                  >
                    Range: {`${priceRange[0]} - ${priceRange[1]}`}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    Designers
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {["Designer A", "Designer B", "Designer C"].map(
                      (designer) => (
                        <FormControlLabel
                          key={designer}
                          control={
                            <Checkbox
                              value={designer}
                              checked={selectedDesigners.includes(designer)}
                              onChange={handleCheckboxChange(
                                setSelectedDesigners
                              )}
                              sx={{
                                color: "gray",
                                "&.Mui-checked": {
                                  color: "gray",
                                },
                              }}
                            />
                          }
                          label={designer}
                          sx={{
                            color: "gray",
                          }}
                        />
                      )
                    )}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    Colors
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {["Red", "Green", "Blue"].map((color) => (
                      <FormControlLabel
                        key={color}
                        control={
                          <Checkbox
                            value={color}
                            checked={selectedColors.includes(color)}
                            onChange={handleCheckboxChange(setSelectedColors)}
                            sx={{
                              color: "gray",
                              "&.Mui-checked": {
                                color: "gray",
                              },
                            }}
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                backgroundColor: color.toLowerCase(),
                                borderRadius: "50%",
                                marginRight: 1,
                              }}
                            />
                            {color}
                          </Box>
                        }
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    Sizes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth>
                    <Select
                      labelId="size-label"
                      id="size-select"
                      multiple
                      value={selectedSizes}
                      onChange={handleSizeChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {["M", "S", "L", "XL", "XXL", "XXXL"].map((size) => (
                        <MenuItem key={size} value={size}>
                          <Checkbox
                            checked={selectedSizes.includes(size)}
                            sx={{
                              color: "gray",
                              "&.Mui-checked": {
                                color: "gray",
                              },
                            }}
                          />
                          <ListItemText primary={size} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    Shoe Sizes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {[
                      "US 1",
                      "US 2",
                      "US 3",
                      "US 4",
                      "US 5",
                      "US 6",
                      "US 7",
                      "US 8",
                      "US 9",
                      "US 10",
                    ].map((shoeSize) => (
                      <FormControlLabel
                        key={shoeSize}
                        control={
                          <Checkbox
                            value={shoeSize}
                            checked={selectedShoeSizes.includes(shoeSize)}
                            onChange={handleCheckboxChange(
                              setSelectedShoeSizes
                            )}
                            sx={{
                              color: "gray",
                              "&.Mui-checked": {
                                color: "gray",
                              },
                            }}
                          />
                        }
                        label={shoeSize}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <ProductList />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default OffersPage;
