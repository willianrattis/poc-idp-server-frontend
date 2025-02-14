import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, CircularProgress, Alert } from '@mui/material';
import ClientsTable from './ClientsTable';
import { getClients, registerClient } from './api';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState(''); // Estado para client secret
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
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : null}

      <form noValidate autoComplete="off" style={{ marginBottom: '2rem' }}>
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
          InputProps={{ readOnly: true }}  // Campo somente leitura
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
      </form>

      <ClientsTable clients={clients} />
    </Container>
  );
}

export default App;