import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/fan.jpg"
                sx={{ height: 250 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                1.その企業のファンになれ！
              </Typography>
              <Typography variant="h5">
                {'面接を受ける企業の情報を徹底的に調べ上げ、掲げている理念や力を入れていることをベタ褒めしよう！'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/talk.jpg"
                sx={{ height: 250 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                2.コミュ力の高さをアピールせよ！
              </Typography>
              <Typography variant="h5">
                {'仕事においてコミュニケーションを大事にしていること、また人とのコミュケーションが好きであることをアピールしよう！'}
                {'苦手な人はこの就活を機に好きになろう！'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/answer.jpg"
                sx={{ height: 250 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                3.聞かれたことに対し簡潔に答えよ！
              </Typography>
              <Typography variant="h5">
                {'簡単そうで意外と難しい！アピールに必死で長々と話してしまい、お互いに「何の話しだっけ？」とならないよう、Q & A を意識して結論から話す癖をつけよう！'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;