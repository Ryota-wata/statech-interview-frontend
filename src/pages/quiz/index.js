import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InterviewerImageHappy from '../../components/InterviewerImageHappy';
import InterviewerImageSad from '../../components/InterviewerImageSad';
import AnswerTheQuestion from '../../components/AnswerTheQuestion';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import Button from '../../components/Button';

const Index = () => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);  // 現在の質問数の状態管理（何問目か）
  const [displayedQuestion, setDisplayedQuestion] = useState(''); // 質問文を表示するための状態管理
  const [finishQiuz, setFinishQuiz] = useState(false); // 質問文が全て終わったかの状態管理
  const [showAnswers, setShowAnswers] = useState(false); // 回答を表示するための状態管理
  const [correctNum, setCorrectNum] = useState(0); // 正解数
  const [passQiuz, setPassQuiz] = useState(false); // 合否
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [message, setMessage] = useState("");
  const totalQuestions = 5;

  // 質問を取得する関数
  const fetchQuestion = async (questionNum) => {
    try {
      const quiz_res = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/question/${questionNum}`);
      const quiz = await quiz_res.json();
      setCurrentQuestion(quiz);
    } catch (error) {
      console.error('質問を取得できませんでした:', error);
    }
  };

  // 初回マウント時と質問が変更されたときに質問を取得
  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestion(currentQuestionNum);
    };

    fetchData();
  }, [currentQuestionNum]);

  useEffect(() => {
    const displayQuestionText = async () => {
      if (currentQuestion) {
        const questionText = currentQuestion.text;
        console.log(questionText);
        console.log(currentQuestion.choices);

        for (let index = 0; index <= questionText.length; index++) {
          setDisplayedQuestion(questionText.slice(0, index + 1));
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // 質問文が完全に表示されたら setShowAnswers(true) を呼ぶ
        setShowAnswers(true);
      }
    };

    displayQuestionText();
  }, [currentQuestion]);

  // 回答を選択したときの挙動
  const handleAnswerSelected = (answer) => {
    const isCorrect = answer.text === currentQuestion.correct_answer;

    // 正解なら正解数を増やす
    if (isCorrect) {
      setCorrectNum(prevCorrectNum => prevCorrectNum + 1);
    }

    // 次の質問が存在する場合、質問番号を増やす
    if (currentQuestionNum < totalQuestions) {
      setCurrentQuestionNum(prevNum => prevNum + 1);
      fetchQuestion(currentQuestionNum + 1);
    } else {
      setFinishQuiz(true);
      setDisplayedQuestion("");
      setMessage('不合格です。');
      if (isCorrect) {
        if (correctNum + 1 ===  totalQuestions) {
          setPassQuiz(true);
          setMessage('おめでとうございます！合格です！');
        }
      }
    }
  };

  return (
    <div>
      <Container>
        <Grid item xs={12} sm={6}>
          {finishQiuz? <InterviewerImageHappy /> : <InterviewerImageSad />}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ストーリー
                </Typography>
                {displayedQuestion && (
                  <>
                    <Typography variant="body1">
                      {displayedQuestion}
                    </Typography>
                    {showAnswers && (
                      <AnswerTheQuestion
                        choices={currentQuestion.choices}
                        onAnswerSelected={handleAnswerSelected}
                      />
                    )}
                  </>
                )}
                {finishQiuz && (
                  <>
                    {message}
                    <div style={{ marginBottom: '25px' }}></div>
                    <Link href="/">
                      <Button
                        color="warning"
                        variant="contained"
                        size="small"
                      >
                        TOPページへ
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Index;
