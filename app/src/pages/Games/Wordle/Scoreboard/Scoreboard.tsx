import { Label, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react'

const data = [
  { user: 'Theo', score: 394 },
  { user: 'Léon', score: 96 },
  { user: 'Franck', score: 374 },
  { user: 'Theo', score: 5843 },
  { user: 'Theo', score: 895 },
]

const Scoreboard = () => {
  return (
    <div>
      <h2 className='text-center'>Scoreboard :</h2>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Nom</TableHeaderCell>
            <TableHeaderCell>Score</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            data.sort((a, b) => b.score - a.score).map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {
                    index === 0 ?
                      <Label ribbon color='yellow'>#1</Label>
                    :
                      index === 1 ?
                        <Label ribbon color='grey'>#2</Label>
                      :
                        index === 2 ?
                          <Label ribbon color='brown'>#3</Label>
                        :
                        <>{index + 1}</>
                  }
                  
                </TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
    </Table>
    </div>
  )
}

export default 
Scoreboard