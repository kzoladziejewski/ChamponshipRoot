import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const containerStyle = { display: 'flex', justifyContent: 'center' };

const cellStyle = {
  width: '50%',
};

const headerStyle = {
  ...cellStyle,
  fontWeight: 700,
};

const rows = [];

function DenseTable(props) {
  for (const player of Object.keys(props.players)) {
    if (rows.length < Object.keys(props.players).length) {
      rows.push({ name: player, fraction: props.players[player] });
    }
  }
  return (
    <div style={containerStyle}>
      <div>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Mapa</TableCell>
                <TableCell style={headerStyle}>Deck</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="Mapki">
                <TableCell style={cellStyle}>{props.map}</TableCell>
                <TableCell style={cellStyle}>{props.deck}</TableCell>
              </TableRow>
              <TableRow />
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ height: '20px' }}></div>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Gracz</TableCell>
                <TableCell style={headerStyle}>Frakcja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell style={cellStyle}>{row.name}</TableCell>
                  <TableCell style={cellStyle}>{row.fraction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default DenseTable;
