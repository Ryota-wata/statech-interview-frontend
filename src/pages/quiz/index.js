import React, { useState, useEffect } from 'react';
import InterviewerImageHappy from '../../components/InterviewerImageHappy';
import InterviewerImageSad from '../../components/InterviewerImageSad';
import AnswerTheQuestion from '../../components/AnswerTheQuestion';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { auth } from '../../components/fire';
import { onAuthStateChanged } from 'firebase/auth';

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
      const quiz_res = await fetch(`http://localhost:8000/question/${questionNum}`);
      const quiz = await quiz_res.json();
      setCurrentQuestion(quiz);
    } catch (error) {
      console.error('質問を取得できませんでした:', error);
    }
  };

  const submitAnswer = async (answer, questionNum) => {
    const firebaseUser = auth.currentUser;
    const answerData = {
      user_id: firebaseUser.uid,
      question_id: questionNum,
      choice_id: answer.choice_id,
    };
    console.log("answer", answer);
    try {
      const response = await fetch(`http://localhost:8000/questions/${questionNum}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData),
        });
      if (response.ok) {
        console.log("回答を送信しました");
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("回答を送信できませんでした", error);
    }
  }

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
    // 回答を送信する関数
    submitAnswer(answer, currentQuestionNum);
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
