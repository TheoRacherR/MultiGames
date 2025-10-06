import { TableHead, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material'
import { QuizFormatedScoreboard } from '../@types/guiz'
import { countryObject } from '../utils/Default/Default'

const Scoreboard = ({data}: { data: QuizFormatedScoreboard[]}) => {
  return (
    <div>
      <h2 className='text-center'>Scoreboard :</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f9fafb' }}>
            <TableRow>
              <TableCell sx={{ width: '20%', fontWeight: 'bold' }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Pays</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Nom</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{countryObject[item.user.country].flag}</TableCell>
                <TableCell>{item.user.pseudo}</TableCell>
                <TableCell>{item.score}s</TableCell> {/* TODO second and minutes */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default 
Scoreboard