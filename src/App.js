import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, CircularProgress, Alert, AppBar, Toolbar, Typography, Box } from '@mui/material';
import ClientsTable from './ClientsTable';
import { getClients, registerClient } from './api';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    // Gera um GUID em maiúsculas para o Client Secret e define no estado
    setClientSecret(uuidv4().toUpperCase());

    const fetchClients = async () => {
      try {
        const clientsData = await getClients();
        setClients(clientsData);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os clientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleRegister = async () => {
    try {
      if (!clientId || !clientSecret || !clientName) {
        setError('Preencha todos os campos obrigatórios.');
        return;
      }
      setError(null);
      await registerClient({ clientId, clientSecret, clientName });
      const updatedClients = await getClients();
      setClients(updatedClients);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Erro ao registrar o cliente.');
    }
  };

  return (
    <>
      {/* Header com AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', boxShadow: 0 }}>
        <Toolbar>
          <Typography variant="h6" color="black">
            Register Clients IDP Server
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : null}

        {/* Formulário para cadastro de clientes */}
        <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
          <TextField
            label="Client Id"
            variant="outlined"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Client Secret"
            variant="outlined"
            value={clientSecret}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Client Name"
            variant="outlined"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
            Registrar Cliente
          </Button>
        </Box>

        {/* Tabela exibindo os clientes registrados */}
        <ClientsTable clients={clients} />
      </Container>
    </>
  );
}

export default App;