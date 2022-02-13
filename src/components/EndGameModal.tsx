import { ReactComponent as Close } from '../data/Close.svg'
import { useEffect, useState } from 'react'

import Modal from 'react-modal'
import Ok from '../data/pippi.png'
import Fail from '../data/moose.png'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

type Props = {
  isOpen: boolean
  handleClose: () => void
  styles: any
  darkMode: boolean
  gameState: string
  state: any
  currentStreak: number
  longestStreak: number
  answer: string
  translation: string
  playAgain: () => void
  avgGuessesPerGame: number
}

const avgGuessesPerGameGreatThreshold = 2.8
const avgGuessesPerGameGoodThreshold = 3.0
const avgGuessesPerGameOkayThreshold = 3.2

const streakOkayThreshold = 5
const streakGoodThreshold = 20
const streakGreatThreshold = 50

export const EndGameModal = ({
  isOpen,
  handleClose,
  styles,
  darkMode,
  gameState,
  state,
  currentStreak,
  longestStreak,
  answer,
  translation,
  playAgain,
  avgGuessesPerGame,
}: Props) => {

  const PlayAgainButton = () => {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <button
          autoFocus
          type="button"
          className="rounded-lg px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      contentLabel="Game End Modal"
    >
      <div className={darkMode ? 'dark' : ''}>
        <div className="h-full flex flex-col items-center justify-center max-w-[300px] mx-auto text-primary dark:text-primary-dark">
          <button
            className="absolute top-4 right-4 rounded-full nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark p-1 w-6 h-6 sm:p-2 sm:h-8 sm:w-8 hover:nm-inset-background dark:hover:nm-inset-background-dark"
            onClick={handleClose}
          >
            <Close />
          </button>
          {gameState === state.won && (
            <>
              <div className="text-primary dark:text-primary-dark text-4xl text-center">
                <img className="mx-auto" src={Ok} alt="success" height="auto" width="70%" />
                <h1 className=" text-3xl">Grattis! 🎉</h1>
                <p className="mt-3 text-2xl">
                  <strong>{answer}</strong> is Swedish for <strong>{translation}</strong>.
                </p>
                <p className="mt-6 text-base">
                  Current streak: <strong>{currentStreak}</strong>&nbsp;
                  {currentStreak >= streakOkayThreshold && '🔥'}
                  {currentStreak >= streakGoodThreshold && '🔥'}
                  {currentStreak >= streakGreatThreshold && '🔥'}
                </p>
                <p className="text-base">
                  Longest streak: <strong>{longestStreak}</strong>
                </p>
                <p className="text-base">
                  Average for streak: <strong>{avgGuessesPerGame}</strong>&nbsp;
                  {avgGuessesPerGame <= avgGuessesPerGameOkayThreshold && '🔥'}
                  {avgGuessesPerGame <= avgGuessesPerGameGoodThreshold && '🔥'}
                  {avgGuessesPerGame <= avgGuessesPerGameGreatThreshold && '🔥'}
                </p>
              </div>
            </>
          )}
          {gameState === state.lost && (
            <>
              <div className="text-primary dark:text-primary-dark text-4xl text-center">
                <img className="mx-auto" src={Fail} alt="fail" height="auto" width="70%" />
                <h1 className=" text-3xl">Oj då! 🌮</h1>
                <p className="mt-3 text-2xl">
                  <strong>{answer}</strong> is Swedish for <strong>{translation}</strong>.
                </p>
                <p className="mt-6 text-base">
                  Current streak: <strong>{currentStreak}</strong> {currentStreak > 4 && '🔥'}
                </p>
                <p className="text-base">
                  Longest streak: <strong>{longestStreak}</strong>
                </p>
              </div>
            </>
          )}
          <PlayAgainButton />
        </div>
      </div>
    </Modal>
  )
}
