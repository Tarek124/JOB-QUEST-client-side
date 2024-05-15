import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllJobCard = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="my-4"
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item?.employer}
          </Typography>
          <Typography sx={{ mb: 0.2 }} variant="h5" component="div">
            {item?.title}
          </Typography>
          <Typography color="text.secondary">
            Publised Date: {item?.postingDate}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Deadline: {item?.deadline}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Salary: {item?.salaryRange}
          </Typography>
        </CardContent>
        <CardActions>
          <Link className="mx-2" to={`/jobDetails/${item._id}`}>
            <Button sx={{ mb: 2 }} variant="contained">
              View Details
            </Button>
          </Link>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default AllJobCard;
