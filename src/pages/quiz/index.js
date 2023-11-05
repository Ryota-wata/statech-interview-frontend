import React, { useState, useEffect } from 'react';
import InterviewerImageHappy from '../../components/InterviewerImageHappy';
import InterviewerImageSad from '../../components/InterviewerImageSad';
import AnswerTheQuestion from '../../components/AnswerTheQuestion';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';

// 質問、回答、正誤を定義
const questions = [
  { question: '初めまして。本日の面接を担当させて頂きます、株式会社走る技術の代表のひざしゅです。よろしくお願いいたします。それでは早速ですが自己紹介をお願いします。', 
    answers: [
      { text: '次へ', nextQuestionNum: 1, isCorrect: true },
    ] 
  },
  { question: 'ありがとうございます。続きまして、弊社を志望した理由をお聞かせください。', 
    answers: [{ text: '次へ', nextQuestionNum: 2, isCorrect: true }] 
  },
  { question: 'ありがとうございます。次に、あなたの描いているキャリアプランを教えてください。', 
    answers: [{ text: '次へ', nextQuestionNum: 3, isCorrect: true }] 
  },
  { question: '「エンジニア転職チャンネル」を知っていますか？', 
    answers: [
      { text: 'なんですかそれ？', nextQuestionNum: 4, isCorrect: false },
      { text: 'いつも楽しみに見てます！', nextQuestionNum: 4, isCorrect: true }
    ] 
  },
  { question: '「スタートアップこそ最高のキャリアである」を知ってますか？', 
    answers: [
      { text: '知らないです。', nextQuestionNum: 5, isCorrect: false },
      { text: '感銘を受けました！', nextQuestionNum: 5, isCorrect: true }
    ] 
  },
  { question: 'お酒は好きですか？', 
    answers: [
      { text: '嫌いです。', nextQuestionNum: 6, isCorrect: false },
      { text: '飲みニケーションが全てだと思ってます！', nextQuestionNum: 6, isCorrect: true }
    ] 
  },
  { question: '最強のエディターはなんだと思いますか？', 
    answers: [
      { text: 'VScode', nextQuestionNum: 7, isCorrect: false },
      { text: 'vim', nextQuestionNum: 7, isCorrect: true }
    ] 
  },
  { question: 'X（twitter）はしてますか？', 
    answers: [
      { text: '興味ないです。', nextQuestionNum: 8, isCorrect: false },
      { text: '仕事だと思ってます', nextQuestionNum: 8, isCorrect: true }
    ] 
  },
];

const Index = () => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);  // 現在の質問数の状態管理（何問目か）
  const [displayedQuestion, setDisplayedQuestion] = useState(''); // 質問文を表示するための状態管理
  const [QuestionIndex, setQuestionIndex] = useState(0); // 質問文を一文字ずつ表示するための状態管理
  const [showAnswers, setShowAnswers] = useState(false); // 回答を表示するための状態管理
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(true); // 回答が正解か不正解かの状態管理
  const [isAllAnswersCorrect, setIsAllAnswersCorrect] = useState(true); // 全ての質問に正解したか否かの状態管理
  // const [questions, setQuestions] = useState([]);

  // TODO /questions エンドポイントを呼び出して質問を取得する
  // useEffect(() => {
  //   fetch('/questions')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // 質問データをセットする
  //       setQuestions(data);
  //     })
  //     .catch((error) => {
  //       console.error('質問を取得できませんでした:', error);
  //     });
  // }, []);
  
  // 質問を一文字ずつ表示
  useEffect(() => {
    if (currentQuestionNum < questions.length) {
        const questionText = questions[currentQuestionNum].question;
      // 質問文の文字数分を0.1秒ごとに一文字表示
      if (QuestionIndex < questionText.length) {
        const timer = setInterval(() => {
          setDisplayedQuestion(questionText.slice(0, QuestionIndex + 1));
          setQuestionIndex(QuestionIndex + 1);
        }, 100);
        return () => clearInterval(timer);
      } else {
        // 質問が完全に表示されたら回答を表示
        setShowAnswers(true);
      }
    }
  }, [currentQuestionNum, QuestionIndex]);

  // 回答を選択したときの挙動
  const handleAnswerSelected = (answer) => {
    const nextQuestionNum = questions[currentQuestionNum].answers.find((a) => a.text === answer.text).nextQuestionNum; // 次の質問番号を取得
    setIsAnswerCorrect(answer.isCorrect); // 回答の正誤判定
    setCurrentQuestionNum(nextQuestionNum);
    setDisplayedQuestion('');
    setQuestionIndex(0);
    setShowAnswers(false); // 回答を非表示に戻す
    setIsAnswerCorrect(answer.isCorrect); // 正解かどうかの判定
    // TODO DBを参照して一つでも不正解があった場合はfalseにする
    if (!answer.isCorrect) {
      setIsAllAnswersCorrect(false);
    }
  };


  // 全問正解の場合に合格メッセージを出す
  useEffect(() => {
    if (currentQuestionNum === questions.length) {
      if (isAllAnswersCorrect) {
        setIsAllAnswersCorrect('おめでとうございます！合格です！');
      } else {
        setIsAllAnswersCorrect('申し訳ありません、不合格です。');
      }
    }
  }, [currentQuestionNum, isAllAnswersCorrect]);

  return (
    <div>
      <Container>
        <Grid item xs={12} sm={6}>
          {isAnswerCorrect ? <InterviewerImageHappy /> : <InterviewerImageSad />}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ストーリー
                </Typography>
                {currentQuestionNum < questions.length ? (
                  <>
                    <Typography variant="body1">
                      {displayedQuestion}
                    </Typography>
                    {showAnswers && (
                      <AnswerTheQuestion
                        answers={questions[currentQuestionNum].answers}
                        onAnswerSelected={handleAnswerSelected}
                      />
                    )}
                  </>
                ) : (
                  <Typography variant="h5" color="secondary">
                    {isAllAnswersCorrect ? 'おめでとうございます！合格です！' : '申し訳ありません、不合格です。'}
                  </Typography>
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
