import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import axios from 'axios';

const AddDialog = ({
  open,
  handleClose,
  handleAddNewData,
  data,
  setData,
  fetchDataEndpoint,
  label,
  itemKey,
  itemValue,
  additionalFields,
}) => {
  const [newData, setNewData] = useState({ ...data });

  useEffect(() => {
    // Fetch necessary data (e.g., etudiants, professeurs) here if not already available.
    axios.get(fetchDataEndpoint)
      .then(response => setData(response.data))
      .catch(error => console.error(`Error fetching ${label} data`, error));
  }, [fetchDataEndpoint, setData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Ajouter ${label}`}</DialogTitle>
      <DialogContent>
        {additionalFields.map((field, index) => (
          <Box key={index} mt="25px">
            <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor={field.name} mb="5px">
              {field.label}
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <Select
                label={field.label}
                value={newData[field.name]}
                onChange={(e) => setNewData({ ...newData, [field.name]: e.target.value })}
              >
                {data.map((item) => (
                  <MenuItem key={item[itemKey]} value={item[itemKey]}>
                    {item[itemValue]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}

        <TextField
          label="Année"
          variant="outlined"
          value={newData.annee}
          onChange={(e) => setNewData({ ...newData, annee: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Compte Rendu"
          variant="outlined"
          value={newData.compteRendu}
          onChange={(e) => setNewData({ ...newData, compteRendu: e.target.value })}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button
          onClick={() => {
            handleAddNewData(newData);
            handleClose();
          }}
          color="primary"
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
