import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MyJobCard({ item, handleDelete }) {
  return (
    <div className="my-4">
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
          <ButtonGroup aria-label="Medium-sized button group">
            <Link className="ml-2" to={`/jobDetails/${item._id}`}>
              <Button sx={{ mb: 2 }} variant="contained">
                View Details
              </Button>
            </Link>
            <div className="mx-2">
              <Tooltip title="update">
                <Link to={`/updateJob/${item?._id}`}>
                  <Button sx={{ mb: 2 }} variant="contained">
                    <EditNoteIcon />
                  </Button>
                </Link>
              </Tooltip>
            </div>
            <Tooltip title="Delete">
              <Button
                onClick={() => handleDelete(item?._id)}
                sx={{ mb: 2 }}
                variant="contained"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardActions>
      </Card>
    </div>
  );
}
