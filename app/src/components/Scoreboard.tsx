import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { countryObject } from "../utils/Default/Default";
import { useEffect } from "react";
import { FormatedScoreboard } from "../@types/games";
import { Link } from "react-router-dom";

const Scoreboard = ({ data }: { data: FormatedScoreboard[] }) => {
  useEffect(() => console.log(data), []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f9fafb" }}>
          <TableRow>
            <TableCell sx={{ width: "20%", fontWeight: "bold" }}>
              Position
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Pays</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nom</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{countryObject[item.user.country].flag}</TableCell>
              <TableCell><Link to={`/user/${item.user.id}`}>{item.user.pseudo}</Link></TableCell>
              <TableCell>{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Scoreboard;
