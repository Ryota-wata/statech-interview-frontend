import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import TitleLayout from './TitleLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// カスタムテーマの作成
const theme = createTheme({
  typography: {
    h2: {
      fontFamily: 'YourCuteFont, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
});

const backgroundImage =
  '/background-image.png';

export default function Title() {
  return (
    <TitleLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'rgba(127, 199, 217, 1)',
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      {/* <ThemeProvider theme={theme}>
        <Typography color="inherit" align="center" variant="h2" marked="center" style={{ whiteSpace: 'pre-line' }}>
          面接官を喜ばせろ！<br />面接官&apos;sハートキャッチ
        </Typography>
      </ThemeProvider> */}
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 40, sm: 50 } }}
      >
        面接官を終始笑顔にし、内定を獲得せよ！
      </Typography>
      <Button
        color="warning"
        variant="contained"
        size="large"
        component="a"
        href="/quiz"
        sx={{ minWidth: 200 }}
      >
        ゲームスタート
      </Button>
      {/* TODO ログイン機能実装後  */}
      {/* <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        ログインした場合は過去のプレイ履歴が見れるようになります。
      </Typography><br/>
      <Button
        color="success"
        variant="contained"
        size="large"
        component="a"
        href="/quiz"
        sx={{ minWidth: 200 }}
      >
        ログイン
      </Button> */}
    </TitleLayout>
  );
}
