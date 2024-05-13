import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "animate.css";

const Blog = () => {
  const { questions } = useAuth();
  console.log(questions);
  return (
    <Box
      className="xl:px-32 lg:py-16"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {questions.map((item, inx) => (
        <div
          key={inx}
          className="my-3 animate__bounceInRight animate__animated"
        >
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <h2 className="mt-6  mb-1 font-semibold text-xl">
                  {item?.question?.toUpperCase()}
                </h2>
                <p className="md:pr-32 lg:w-1/2">{item?.description}</p>
              </Typography>
              <div className="my-2">
                <Link to={`/viewDetails/${item.id}`}>
                  <Button size="small" variant="contained">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </Box>
  );
};

export default Blog;
