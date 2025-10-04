import { TableHead, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material'

const Scoreboard = ({data}: { data: {user: string, score: number}[]}) => {
  return (
    <div>
      <h2 className='text-center'>Scoreboard :</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f9fafb' }}>
            <TableRow>
              <TableCell sx={{ width: '20%', fontWeight: 'bold' }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Nom</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sort((a, b) => b.score - a.score).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.score}</TableCell>
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