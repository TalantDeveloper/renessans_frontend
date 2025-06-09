import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Box,
    Paper,
    Tooltip,
} from "@mui/material";
import {BaseURL} from "../home/BaseData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Laboratory = () => {
    const [lessons, setLessons] = useState([]);
    const [expanded, setExpanded] = useState("panel0");

    // Fetch data from API
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(
                    BaseURL + "api/laboratory/"
                );
                setLessons(response.data);
            } catch (error) {
                console.error("Error fetching laboratory data:", error);
            }
        };
        fetchLessons();
    }, []);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            sx={{
                maxWidth: "1000px",
                margin: "30px auto",
                padding: "20px",
                background: "#f4f4f9",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography
                variant="h3"
                textAlign="center"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    color: "#133654",
                    marginBottom: "30px",
                }}
            >
                Laboratoriya Darslari
            </Typography>
            {lessons.map((lesson, index) => (
                <Accordion
                    key={lesson.id}
                    expanded={expanded === `panel${index}`}
                    onChange={handleAccordionChange(`panel${index}`)}
                    sx={{
                        background: "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #ddd",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        "&:before": {
                            display: "none",
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon sx={{fontSize: "2rem", color: "#fff"}}/>
                        }
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        sx={{
                            padding: "5px 20px",
                            background: "linear-gradient(to right, #133654, #245a92)",
                            color: "white",
                            borderRadius: "10px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{fontWeight: "bold", textTransform: "capitalize"}}
                        >
                            {lesson.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{padding: "20px"}}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: "20px",
                                borderRadius: "10px",
                                background: "white",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                }}
                            >
                                <Tooltip
                                    title="Laboratoriya mavzusi"
                                    placement="top"
                                    sx={{fontSize: "0.8rem", padding: "5px 10px"}}
                                >
                                    <Typography variant="h6" sx={{color: "#333"}}>
                                        <strong>
                                            Mavzu:
                                        </strong>
                                        {lesson.title_uz}
                                    </Typography>
                                </Tooltip>
                                <Tooltip
                                    title="Dars maqsadi"
                                    placement="top"
                                    sx={{fontSize: "0.8rem", padding: "5px 10px"}}
                                >
                                    <Typography variant="h6" sx={{color: "#555"}}>
                                        <strong>
                                            Maqsad:
                                        </strong>
                                        {lesson.theme_uz}
                                    </Typography>
                                </Tooltip>
                                <Tooltip
                                    title="PDF yuklab olish"
                                    placement="top"
                                    sx={{fontSize: "0.8rem", padding: "5px 10px"}}
                                >
                                    <Button
                                        variant="outlined"
                                        href={lesson.pdf_file}
                                        target="_blank"
                                        sx={{
                                            alignSelf: "start",
                                            borderColor: "#133654",
                                            color: "#133654",
                                            "&:hover": {
                                                backgroundColor: "#133654",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        PDF yuklab olish
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    title="Ish varag'i"
                                    placement="top"
                                    sx={{fontSize: "0.8rem", padding: "5px 10px"}}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={lesson.worksheet_link}
                                        target="_blank"
                                        sx={{
                                            fontWeight: "bold",
                                            padding: "10px 20px",
                                            backgroundColor: "#133654",
                                            "&:hover": {
                                                backgroundColor: "#245a92",
                                            },
                                        }}
                                    >
                                        Ish varag'ini ko'rish
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Paper>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default Laboratory;
