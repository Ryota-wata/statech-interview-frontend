import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

const Index = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/result`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const resultData = await response.json();
          const formattedRows = resultData.map((row) => [
            new Intl.DateTimeFormat('ja-JP', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }).format(new Date(row.created_at)),
            row.passed,
          ]);
          setRows(formattedRows);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TableContainer sx={{ maxWidth: 300, textAlign: 'center' }} component={Paper}>
          <Table sx={{ maxWidth: 300, fontSize: '0.8rem' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>受験日</TableCell>
                <TableCell>合否</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell>{row[1] ? '合格' : '不合格'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Index;
