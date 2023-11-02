import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { FaChevronUp } from "react-icons/fa";
import { getCategeroies } from "../react-query/FetchData";

export default function CategoryList() {
  return (
    <div className="category_page">
      <div className="flex justify-between items-center">
        <h3>Category List</h3>
      </div>
      <CategoryDash />
    </div>
  );
}
function CategoryDash() {
  const { data, isLoading } = getCategeroies();

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <>
          {data.categories.map((e) => (
            <CatAccording key={e.catName} cat={e} />
          ))}
        </>
      )}
    </>
  );
}
function CatAccording({ cat }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Accordion
        expanded={expanded === cat.catName}
        onChange={handleChange(cat.catName)}
      >
        <AccordionSummary
          expandIcon={<FaChevronUp />}
          aria-controls="panel1bh-content"
          id={cat.catName}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {cat.catName} Category
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Click to see SubCategory
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {cat.subCategories ? "subCat" : "No subCategory"}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
function SubCategories(){
  return(
    <div><p></p></div>
  )
}
function SubCatFiled(){}