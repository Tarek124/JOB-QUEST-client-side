import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { instance } from "../main";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const provider = new GoogleAuthProvider();
export const AppContext = createContext();
const questions = [
  {
    id: 1,
    question:
      "What is an access token and refresh token? How do they work and where should we store them on the client side?",
    description:
      "Access tokens and refresh tokens are used in authentication systems to provide secure access to resources and manage user sessions.",
    keyPoints: [
      {
        title: "Secure Access",
        description:
          "Access tokens are short-lived credentials used by clients to access protected resources on behalf of a user. They typically expire after a short period and are sent with each request to authenticate the user.",
      },
      {
        title: "Obtaining New Tokens",
        description:
          "Refresh tokens are long-lived credentials used to obtain a new access token once the current one expires. They are securely stored on the client side and sent to the server to request a new access token.",
      },
      {
        title: "Expiration",
        description:
          "Access tokens have a short expiration time to mitigate security risks associated with long-lived tokens. Refresh tokens, on the other hand, have a longer expiration time and can be used to obtain new access tokens for an extended period.",
      },
      {
        title: "Storage on Client Side",
        description:
          "Access tokens should be stored in memory or a secure storage mechanism on the client side, such as browser localStorage or secure cookies. Refresh tokens should be stored securely, such as in an HttpOnly cookie, to prevent theft or misuse.",
      },
      {
        title: "Token Rotation",
        description:
          "To enhance security, access tokens and refresh tokens can be rotated periodically. This involves issuing new tokens and invalidating old ones to prevent unauthorized access to resources.",
      },
    ],
  },
  {
    id: 2,
    question: "What is Express.js?",
    description:
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.",
    keyPoints: [
      {
        title: "Minimal and Flexible",
        description:
          "Express.js is a minimal and flexible Node.js web application framework that provides developers with the freedom to structure their applications according to their preferences.",
      },
      {
        title: "Robust Features",
        description:
          "Express.js provides a robust set of features for building web and mobile applications, including routing, middleware, templating engines, and more.",
      },
      {
        title: "Middleware",
        description:
          "Express.js supports middleware, which allows developers to extend the functionality of their applications by adding custom middleware functions to handle requests and responses.",
      },
      {
        title: "Routing",
        description:
          "Express.js simplifies routing by providing a straightforward API for defining routes and handling HTTP requests.",
      },
      {
        title: "Wide Adoption",
        description:
          "Express.js is one of the most popular Node.js frameworks, with a large and active community of developers contributing to its ecosystem.",
      },
    ],
  },
  {
    id: 3,
    question: "What is Nest.js?",
    description:
      "A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.",
    keyPoints: [
      {
        title: "Progressive Node.js Framework",
        description:
          "Nest.js is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.",
      },
      {
        title: "Modular Architecture",
        description:
          "Nest.js encourages a modular architecture, allowing developers to organize their codebase into reusable and maintainable modules.",
      },
      {
        title: "Dependency Injection",
        description:
          "Nest.js utilizes dependency injection, a design pattern widely used in software development, to manage the dependencies of application components.",
      },
      {
        title: "Support for TypeScript",
        description:
          "Nest.js is built with TypeScript, a superset of JavaScript that adds static typing and other advanced features to the language.",
      },
      {
        title: "Built-in Features",
        description:
          "Nest.js provides built-in support for various features commonly required in web applications, such as middleware, routing, authentication, and database integration.",
      },
    ],
  },
  {
    id: 4,
    question: "Explain your code",
    description:
      "At our job portal, we take pride in the code that powers our platform. Built with cutting-edge technologies and best practices in mind, our website ensures a seamless experience for both job seekers and employers alike.",
    keyPoints: [
      {
        title: "Frontend",
        description:
          "We use React.js, a popular JavaScript library for building user interfaces, to create dynamic and interactive job listings and application forms. Material-UI provides a sleek and responsive design, ensuring a consistent look and feel across different devices.",
      },
      {
        title: "Backend",
        description:
          "Powered by Node.js and Express.js, our backend infrastructure delivers reliable performance and scalability. We employ RESTful APIs to communicate between the frontend and backend, ensuring efficient data exchange.",
      },
      {
        title: "Database",
        description:
          "MongoDB serves as our database solution, offering flexibility and scalability to handle large volumes of job listings, user profiles, and application data.",
      },
      {
        title: "Job Listings",
        description:
          "Our platform provides a comprehensive list of job opportunities across various industries and sectors. With advanced search and filtering capabilities, job seekers can easily find positions that match their skills and preferences.",
      },
      {
        title: "User Authentication",
        description:
          "We prioritize the security of our users' data. Our platform implements robust authentication mechanisms, including access tokens and refresh tokens, to ensure secure user authentication and authorization.",
      },
      {
        title: "Responsive Design",
        description:
          "Whether you're accessing our website from a desktop, tablet, or smartphone, our responsive design ensures a seamless and optimized experience across all devices.",
      },
      {
        title: "Continuous Improvement",
        description:
          "We are committed to continuously improving our codebase and adding new features to enhance the user experience. Through regular updates and feedback from our users, we strive to make our job portal the go-to destination for job seekers and employers alike.",
      },
    ],
  },
];

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myTheme, setmyTheme] = useState();
  const [forUpdateAllData, setForUpdateAllData] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
    });
  }, []);

  const create = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/allJobs`
    );
    return data;
  };

  const { data: jobs = [] } = useQuery({
    queryFn: async () => await create(),
  });

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    instance
      .get("/logout")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    return signOut(auth);
  };

  const createJWT = (email) => {
    return instance
      .post("jsonwebtoken", { email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const allData = {
    createUser,
    updateUser,
    user,
    loading,
    login,
    googleSignIn,
    logout,
    jobs,
    questions,
    createJWT,
    myTheme,
    setmyTheme,
    forUpdateAllData,
    setForUpdateAllData,
  };
  const darkTheme = createTheme({
    palette: {
      mode: myTheme,
    },
  });
  return (
    <AppContext.Provider value={allData}>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
