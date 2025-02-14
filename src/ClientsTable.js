import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ClientsTable = ({ clients }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Clientes Registrados
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Display Name</strong></TableCell>
            <TableCell><strong>Client Type</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.displayName || '---'}</TableCell>
              <TableCell>{client.clientType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsTable;