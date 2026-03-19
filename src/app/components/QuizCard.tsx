'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import React, { useState } from 'react'

interface QuizQuestion {
question: string;
options: string[];
correctAnswer: string;
}
interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total:number) => void;
  
}


const QuizCard: React.FC<QuizCardProps> = ({questions, onComplete}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const currentQ = questions[currentIndex];

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect){
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length -1){
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      }else{
        setIsFinished(true);
        onComplete(score + (isCorrect ? 1 : 0), questions.length);
      }
    }, 1200);
  }
  if (isFinished) {
    return (
      <Card className="w-full border-2 border-primary/20 bg-primary/5">
        <CardHeader className="text-center">
          <CardTitle>Quiz Complete! 🎉</CardTitle>
          <p className="text-2xl font-bold mt-2">
            You scored {score} out of {questions.length}
          </p>
        </CardHeader>
      </Card>
    );
  }
  if (!currentQ){
    return <div className='p-4 text-center'>Loading Questions...</div>
  }

  return (
    <div className='bg-background w-full animate-message-fade'>
      {questions.length > 0 ? (
          <Card className='w-full rounded-lg shadow-md border-slate-200'>
            <CardHeader>
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>Question {currentIndex + 1} of  {questions.length} </span>
                <span>Score: {score}</span>
              </div>
              <CardTitle className='text-lg font-semibold'>{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-2'>
              {currentQ.options.map((option,index) => {
                const isSelected = selectedOption === option;
                const isCorrect = isSelected && option === currentQ.correctAnswer;
                const isWrong = isSelected && option !== currentQ.correctAnswer;
                return (
                  <Button key={index} variant='secondary' onClick={() => handleOptionClick(option)}
                  className={`justify-start text-left h-auto py-3 px-4 transition-all 
                  ${isCorrect ? 'bg-green-500 text-black border-green-500 hover:bg-green-100': 
                    isWrong ? 'bg-red-100 border-red-500' : 'hover:bg-slate-100 hover:text-black/80 '}`}
                  >
                  <span>{option}</span>
                  {isCorrect && <CheckCircle2 className='w-6 h-6 ml-2 text-green-500' />}
                  {isWrong && <XCircle className='w-4 h-4 ml-2 text-red-600' />}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

      ): (<div className='p-4 text-center'>No questions available</div>)}
    

    </div>

  )
}


export default QuizCard;