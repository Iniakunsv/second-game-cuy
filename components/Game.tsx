'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Player from './Player';
import Room from './Room';
import ChallengeModal from './ChallengeModal';

import { clues } from '@/data/clues';
import { challenges } from '@/data/challenges';
import HUD from '@/components/HUD';

import { layout1Objects } from '@/data/layout1Objects';
import { layout2Objects } from '@/data/layout2Objects';
import { layout3Objects } from '@/data/layout3Objects';
import { layout4Objects } from '@/data/layout4Objects';

import {
  LayoutId,
  RoomObject,
  Direction,
} from '@/data/types';

const SPEED = 0.25;

export default function Game() {

  /*
   * =========================================================
   * GAME STATE
   * =========================================================
   */

  const [layout, setLayout] =
    useState<LayoutId>(1);

  const [pos, setPos] =
    useState({
      x: 50,
      y: 75,
    });

  const [direction, setDirection] =
    useState<Direction>('down');

  const [walking, setWalking] =
    useState(false);

  const [frame, setFrame] =
    useState(0);

  const [keys, setKeys] =
    useState<Record<string, boolean>>({});

  const [collectedClues, setCollectedClues] =
    useState<string[]>([]);

  const [activeClue, setActiveClue] =
    useState<string | null>(null);

  const [solved, setSolved] =
    useState<string[]>([]);

  const [isPortrait, setIsPortrait] = 
    useState(false);
  
  const [zoom, setZoom] = 
    useState(1);

  useEffect(() => {
  const checkOrientation = () => {
    setIsPortrait(
      window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches
    );
  };

  checkOrientation();

  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);

  return () => {
    window.removeEventListener('resize', checkOrientation);
    window.removeEventListener('orientationchange', checkOrientation);
  };
}, []);

  const [layout3GallonProgress, setLayout3GallonProgress] =
    useState({
      1: 0,
      2: 0,
      3: 0,
    });

  const [challenge, setChallenge] =
    useState<string | null>(null);

  const [choice, setChoice] =
    useState<string | number | null>(null);

  const [shortAnswer, setShortAnswer] =
    useState('');

  const [scrambleOrder, setScrambleOrder] = 
    useState<number[]>([]);

  const [hangmanGuessedLetters, setHangmanGuessedLetters] =
    useState<string[]>([]);

  const [feedback, setFeedback] =
    useState<
      'correct' | 'wrong' | null
    >(null);

  /*
   * =========================================================
   * INTERACTION MESSAGE
   * =========================================================
   */

  const [fakeMessage, setFakeMessage] =
    useState<string | null>(null);

  /*
   * =========================================================
   * TEACHER DESK PASSWORD
   * =========================================================
   */

  const [passwordInput, setPasswordInput] =
    useState('');

  const [passwordOpen, setPasswordOpen] =
    useState(false);

  const [teacherDeskUnlocked, setTeacherDeskUnlocked] =
    useState(false);

  /*
   * =========================================================
   * GAME FINISH / TRANSITION
   * =========================================================
   */

  const [finished, setFinished] =
  useState(false);

const [transitioning, setTransitioning] =
  useState(false);


/*
 * =========================================================
 * PLAYER LIVES
 * =========================================================
 */

const [lives, setLives] =
  useState(3);

const [gameOver, setGameOver] =
  useState(false);

  /*
   * =========================================================
   * DEBUG COLLISION
   * =========================================================
   */

  const [debugCollision, setDebugCollision] =
    useState(false);

  /*
 * =========================================================
 * RESET GAME
 * =========================================================
 */

const resetGame =
  useCallback(() => {

    /*
     * Reset layout
     */

    setLayout(1);

    /*
     * Reset player position
     */

    setPos({
      x: 50,
      y: 75,
    });

    setDirection(
      'down'
    );

    setWalking(
      false
    );

    setFrame(
      0
    );

    /*
     * Reset keyboard
     */

    setKeys({});

    /*
     * Reset clues
     */

    setCollectedClues([]);

    setActiveClue(
      null
    );

    /*
     * Reset solved challenges
     */

    setSolved([]);

    /*
     * Reset Layout 3 gallon progress
     */

    setLayout3GallonProgress({
      1: 0,
      2: 0,
      3: 0,
    });

    /*
     * Reset current challenge
     */

    setChallenge(
      null
    );

    setChoice(
      null
    );

    setShortAnswer(
      ''
    );

    /*
     * Reset word scramble
     */

    setScrambleOrder([]);

    /*
     * Reset hangman
     */

    setHangmanGuessedLetters([]);

    /*
     * Reset feedback
     */

    setFeedback(
      null
    );

    /*
     * Reset interaction message
     */

    setFakeMessage(
      null
    );

    /*
     * Reset teacher desk
     */

    setPasswordInput(
      ''
    );

    setPasswordOpen(
      false
    );

    setTeacherDeskUnlocked(
      false
    );

    /*
     * Reset transition
     */

    setTransitioning(
      false
    );

    /*
     * Reset debug
     */

    setDebugCollision(
      false
    );

    /*
     * Reset lives
     */

    setLives(
      3
    );

    /*
     * Close Game Over
     */

    setGameOver(
      false
    );

    /*
     * Reset finished state
     */

    setFinished(
      false
    );

  }, []);


  /*
   * =========================================================
   * ACTIVE CHALLENGES
   * =========================================================
   */

  const activeChallenges =
    useMemo(() => {

      return challenges.filter(
        (challengeItem) =>
          challengeItem.layout === layout
      );

    }, [
      layout,
    ]);


  /*
   * =========================================================
   * CURRENT CHALLENGE
   * =========================================================
   */

  const currentChallenge =
    useMemo(() => {

      return (
        challenges.find(
          (challengeItem) =>
            challengeItem.id === challenge
        ) ?? null
      );

    }, [
      challenge,
    ]);


  /*
   * =========================================================
   * CURRENT LAYOUT PROGRESS
   * =========================================================
   */

  const solvedInCurrentLayout =
    useMemo(() => {

      return activeChallenges.filter(
        (challengeItem) =>
          solved.includes(
            challengeItem.id
          )
      ).length;

    }, [
      activeChallenges,
      solved,
    ]);


  /*
   * =========================================================
   * CURRENT LAYOUT COMPLETED
   * =========================================================
   */

  const currentLayoutCompleted =
    useMemo(() => {

      return (
        activeChallenges.length > 0 &&
        activeChallenges.every(
          (challengeItem) =>
            solved.includes(
              challengeItem.id
            )
        )
      );

    }, [
      activeChallenges,
      solved,
    ]);


  /*
   * =========================================================
   * LAYOUT 1 — WHITEBOARD CHALLENGES
   * =========================================================
   */

  const whiteboardChallenges =
    useMemo(() => {

      return activeChallenges.filter(
        (challengeItem) =>
          challengeItem.id.startsWith(
            'layout1-whiteboard-'
          )
      );

    }, [
      activeChallenges,
    ]);


  const solvedWhiteboard =
    useMemo(() => {

      return whiteboardChallenges.filter(
        (challengeItem) =>
          solved.includes(
            challengeItem.id
          )
      ).length;

    }, [
      whiteboardChallenges,
      solved,
    ]);


  const whiteboardCompleted =
    whiteboardChallenges.length > 0 &&
    solvedWhiteboard ===
      whiteboardChallenges.length;


  /*
   * =========================================================
   * LAYOUT 1 — DRAWER CHALLENGES
   * =========================================================
   */

  const drawerChallenges =
    useMemo(() => {

      return activeChallenges.filter(
        (challengeItem) =>
          challengeItem.id.startsWith(
            'layout1-drawer-'
          )
      );

    }, [
      activeChallenges,
    ]);


  const solvedDrawer =
    useMemo(() => {

      return drawerChallenges.filter(
        (challengeItem) =>
          solved.includes(
            challengeItem.id
          )
      ).length;

    }, [
      drawerChallenges,
      solved,
    ]);


  const drawerCompleted =
    drawerChallenges.length > 0 &&
    solvedDrawer ===
      drawerChallenges.length;


  /*
   * =========================================================
   * DRAWER UNLOCK
   * =========================================================
   */

  const drawerUnlocked =
    layout !== 1 ||
    whiteboardCompleted;


  /*
   * =========================================================
   * ROOM OBJECTS
   * =========================================================
   */

  const visibleObjects =
    useMemo(() => {

      if (layout === 1) {
        return layout1Objects;
      }

      if (layout === 2) {
        return layout2Objects;
      }

      if (layout === 3) {
        return layout3Objects;
      }

      if (layout === 4) {
        return layout4Objects;
      }

      return [];

    }, [
      layout,
    ]);


  /*
   * =========================================================
   * NEAREST INTERACTIVE OBJECT
   * =========================================================
   */

  const nearObj =
    useMemo(() => {

      let nearest: RoomObject | null = null;

      let bestDistance = 8;

      for (
        const object of visibleObjects
      ) {

        if (!object.interactive) {
          continue;
        }

        const closestX =
          Math.max(
            object.x,
            Math.min(
              pos.x,
              object.x + object.w
            )
          );

        const closestY =
          Math.max(
            object.y,
            Math.min(
              pos.y,
              object.y + object.h
            )
          );

        const distance =
          Math.hypot(
            pos.x - closestX,
            pos.y - closestY
          );

        if (
          distance <= 6 &&
          distance < bestDistance
        ) {

          bestDistance = distance;
          nearest = object;

        }

      }

      return nearest;

    }, [
      pos.x,
      pos.y,
      visibleObjects,
    ]);


  /*
   * =========================================================
   * GET INTERACTION TYPE
   * =========================================================
   */

  const getInteractionType =
    useCallback(
      (
        object: RoomObject | null
      ) => {

        if (!object) {
          return null;
        }

        const objectId =
          String(
            object.id ?? ''
          ).toLowerCase();

        const objectName =
          String(
            object.name ?? ''
          ).toLowerCase();


        /*
         * WHITEBOARD
         */

        if (
          objectId.includes(
            'whiteboard'
          ) ||
          objectName.includes(
            'whiteboard'
          )
        ) {

          return 'whiteboard';

        }


        /*
         * DRAWER
         */

        if (
          objectId.includes(
            'drawer'
          ) ||
          objectName.includes(
            'drawer'
          )
        ) {

          return 'drawer';

        }


        /*
         * TEACHER DESK
         */

        if (
          objectId ===
            'l2_teacher_desk' ||
          objectName.includes(
            'teacher desk'
          )
        ) {

          return 'teacher-desk';

        }


        return null;

      },
      []
    );


  /*
   * =========================================================
   * COLLECT CLUE
   * =========================================================
   */

  const collectClue =
    useCallback(
      (
        object: RoomObject
      ) => {

        if (!object.clueId) {
          return;
        }

        const clue =
          clues.find(
            (clueItem) =>
              clueItem.id ===
              object.clueId
          );

        if (!clue) {
          return;
        }


        /*
         * Already collected
         */

        if (
          collectedClues.includes(
            clue.id
          )
        ) {

          setFakeMessage(
            `You already found this clue.\n\nThe letter ${clue.letter} is saved in your book.`
          );

          return;

        }


        /*
         * Save clue
         */

        setCollectedClues(
          (current) => [
            ...current,
            clue.id,
          ]
        );


        /*
         * Show clue
         */

        setFakeMessage(
          `YOU FOUND A CLUE!\n\nSave this letter in your book. Maybe it will be useful.\n\nLETTER: ${clue.letter}`
        );

      },
      [
        collectedClues,
      ]
    );


  /*
   * =========================================================
   * TEACHER DESK PASSWORD SUBMIT
   * =========================================================
   */

  const submitTeacherPassword =
    useCallback(() => {

      const answer =
        passwordInput
          .trim()
          .toLowerCase();


      if (
        answer !== 'headache'
      ) {

        setFakeMessage(
          'WRONG PASSWORD!\n\nThe password is not correct. Collect the hidden clues and try again.'
        );

        return;

      }


      setTeacherDeskUnlocked(
        true
      );

      setPasswordOpen(
        false
      );

      setPasswordInput(
        ''
      );


      const firstLayout2Question =
        challenges.find(
          (challengeItem) =>
            challengeItem.layout === 2 &&
            challengeItem.id.startsWith(
              'layout2-'
            )
        );


      if (
        firstLayout2Question
      ) {

        setFakeMessage(
          null
        );

        setChallenge(
          firstLayout2Question.id
        );

        setChoice(
          null
        );

        setShortAnswer(
          ''
        );

        setFeedback(
          null
        );

        return;

      }


      setFakeMessage(
        'PASSWORD CORRECT!\n\nThis challenge is unlocked, but no questions were found.'
      );

    }, [
      passwordInput,
    ]);


  /*
   * =========================================================
   * FAKE INTERACTION MESSAGE
   * =========================================================
   */

  const getFakeInteractionMessage =
    useCallback(
      (
        objectId: string
      ) => {

        switch (objectId) {

          case 'l1-tv':
            return 'The television is turned off.';

          case 'l1-drawer':
            return 'The drawer is empty.';

          case 'l1-chair-left':
            return 'It is a comfortable chair.';

          case 'l1-chair-right':
            return 'It is a comfortable chair.';

          case 'l1-plant':
            return 'The plant looks healthy.';

          case 'l1-blue-board':
            return 'There is nothing useful here yet.';

          case 'l2_projector':
            return 'The classroom projector is mounted above the room.';

          case 'l2_left_curtain':
            return 'The classroom curtain is closed.';

          case 'l2_right_curtain':
            return 'The classroom curtain is closed.';

          case 'l2_wall_decoration_upper':
            return 'A decoration hangs on the classroom wall.';

          case 'l2_whiteboard':
            return 'A board.';

          case 'l2_wall_decoration_lower':
            return 'A dark wall decoration is mounted here.';

          default:
            return 'There is nothing interesting here.';

        }

      },
      []
    );


  /*
   * =========================================================
   * OPEN NEXT CHALLENGE
   * =========================================================
   */

  const layout3GallonMap: Record<string, number> = {
  // Current gallon IDs
  'l3-water-gallon-1': 1,
  'l3-water-gallon-2': 2,
  'l3-water-gallon-3': 3,

  // Previous/alternative gallon IDs
  'l3-water-gallon-left-1': 1,
  'l3-water-gallon-right-2': 2,
  'l3-water-gallon-right-3': 3,
};


  const openNextChallenge =
    useCallback(
      (
        targetObject?: RoomObject | null
      ) => {

        const object =
          targetObject ??
          nearObj;

        if (!object) {
          return;
        }


        const interactionType =
          getInteractionType(
            object
          );


        /*
         * =====================================================
         * LAYOUT 1 — WHITEBOARD
         * =====================================================
         */

        if (
          layout === 1 &&
          interactionType ===
            'whiteboard'
        ) {

          const nextWhiteboard =
            whiteboardChallenges.find(
              (challengeItem) =>
                !solved.includes(
                  challengeItem.id
                )
            );


          if (!nextWhiteboard) {

            setFakeMessage(
              'All challenges have been completed. The next challenge is now unlocked.'
            );

            return;

          }


          setFakeMessage(
            null
          );

          setChallenge(
            nextWhiteboard.id
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setFeedback(
            null
          );

          return;

        }


        /*
         * =====================================================
         * LAYOUT 3 — GALON SEQUENCE
         * =====================================================
         */

        if (layout === 3) {

          const gallonNumber =
            layout3GallonMap[object.id];

          if (gallonNumber) {

            if (
              gallonNumber === 2 &&
              layout3GallonProgress[1] < 5
            ) {

              setFakeMessage(
                'This challenge is locked. Complete all questions first.'
              );

              return;

            }


            if (
              gallonNumber === 3 &&
              layout3GallonProgress[2] < 5
            ) {

              setFakeMessage(
                'This challenge is locked. Complete all questions first.'
              );

              return;

            }


            const gallonChallenges =
              activeChallenges.filter(
                (challengeItem) =>
                  challengeItem.id.startsWith(
                    `l3-water-gallon-${gallonNumber}-`
                  )
              );


            const nextGallonChallenge =
              gallonChallenges.find(
                (challengeItem) =>
                  !solved.includes(
                    challengeItem.id
                  )
              );


            if (!nextGallonChallenge) {

              setFakeMessage(
                `All 5 questions at Water Gallon ${gallonNumber} have been completed.`
              );

              return;

            }


            setFakeMessage(
              null
            );

            setChallenge(
              nextGallonChallenge.id
            );

            setChoice(
              null
            );

            setShortAnswer(
              ''
            );

            setFeedback(
              null
            );

            setScrambleOrder(
              []
            );

            setHangmanGuessedLetters(
              []
            );

            return;

          }

        }


        /*
         * =====================================================
         * LAYOUT 1 — DRAWER
         * =====================================================
         */

        if (
          layout === 1 &&
          interactionType ===
            'drawer'
        ) {

          if (
            !whiteboardCompleted
          ) {

            setFakeMessage(
              `This challenge is locked. Complete all ${whiteboardChallenges.length} challenges first.`
            );

            return;

          }


          const nextDrawer =
            drawerChallenges.find(
              (challengeItem) =>
                !solved.includes(
                  challengeItem.id
                )
            );


          if (!nextDrawer) {

            setFakeMessage(
              'All drawer challenges have already been completed.'
            );

            return;

          }


          setFakeMessage(
            null
          );

          setChallenge(
            nextDrawer.id
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setFeedback(
            null
          );

          return;

        }


        /*
         * =====================================================
         * OTHER LAYOUTS
         * =====================================================
         */

        const next =
          activeChallenges.find(
            (challengeItem) =>
              !solved.includes(
                challengeItem.id
              )
          );


        if (!next) {

          setFakeMessage(
            'There are no remaining challenges in this layout.'
          );

          return;

        }


        setFakeMessage(
          null
        );

        setChallenge(
          next.id
        );

        setChoice(
          null
        );

        setShortAnswer(
          ''
        );

        setFeedback(
          null
        );

      },
      [
        nearObj,
        getInteractionType,
        layout,
        activeChallenges,
        solved,
        whiteboardChallenges,
        whiteboardCompleted,
        drawerChallenges,
        layout3GallonProgress,
      ]
    );


  /*
   * =========================================================
   * MOVEMENT + COLLISION
   * =========================================================
   */

  const tryMove =
    useCallback(
      (
        dx: number,
        dy: number
      ) => {

        setPos(
          (current) => {

            const playerW = 2;
            const playerH = 3;


            const collides =
              (
                x: number,
                y: number
              ) => {

                for (
                  const object of visibleObjects
                ) {

                  if (
                    !object.solid
                  ) {

                    continue;

                  }


                  const collision =
                    x + playerW / 2 >
                      object.x &&
                    x - playerW / 2 <
                      object.x + object.w &&
                    y + playerH / 2 >
                      object.y &&
                    y - playerH / 2 <
                      object.y + object.h;


                  if (collision) {

                    return true;

                  }

                }


                return false;

              };


            const nx =
              Math.max(
                6,
                Math.min(
                  94,
                  current.x + dx
                )
              );


            const xAllowed =
              !collides(
                nx,
                current.y
              );


            const finalX =
              xAllowed
                ? nx
                : current.x;


            const ny =
              Math.max(
                12,
                Math.min(
                  89,
                  current.y + dy
                )
              );


            const yAllowed =
              !collides(
                finalX,
                ny
              );


            const finalY =
              yAllowed
                ? ny
                : current.y;


            return {
              x: finalX,
              y: finalY,
            };

          }
        );

      },
      [
        visibleObjects,
      ]
    );


  /*
   * =========================================================
   * KEYBOARD INPUT
   * =========================================================
   */

  useEffect(() => {

    const down =
      (
        event: KeyboardEvent
      ) => {

        const key =
          event.key.toLowerCase();


        if (
          key === 'arrowup' ||
          key === 'arrowdown' ||
          key === 'arrowleft' ||
          key === 'arrowright' ||
          key === ' ' ||
          key === 'f2'
        ) {

          event.preventDefault();

        }


        if (
          key === 'f2' &&
          !event.repeat
        ) {

          setDebugCollision(
            (current) => !current
          );

          return;

        }


        if (
          key === 'escape'
        ) {

          event.preventDefault();


          if (
            passwordOpen
          ) {

            setPasswordOpen(
              false
            );

            setPasswordInput(
              ''
            );

            return;

          }


          if (
            challenge
          ) {

            setChallenge(
              null
            );

            setChoice(
              null
            );

            setShortAnswer(
              ''
            );

            setFeedback(
              null
            );

            return;

          }


          if (
            fakeMessage
          ) {

            setFakeMessage(
              null
            );

            return;

          }


          return;

        }


        setKeys(
          (value) => ({
            ...value,
            [key]: true,
          })
        );


        /*
         * =====================================================
         * E — INTERACTION
         * =====================================================
         */

        if (
          key === 'e' &&
          !event.repeat &&
          nearObj &&
          !challenge &&
          !fakeMessage &&
          !passwordOpen &&
          !transitioning
        ) {

          event.preventDefault();


          const interactionType =
            getInteractionType(
              nearObj
            );


          /*
           * TEACHER DESK
           */

          if (
            layout === 2 &&
            interactionType ===
              'teacher-desk'
          ) {

            if (
              teacherDeskUnlocked
            ) {

              openNextChallenge(
                nearObj
              );

              return;

            }


            setPasswordInput(
              ''
            );

            setPasswordOpen(
              true
            );

            return;

          }


          /*
           * WHITEBOARD / DRAWER
           */

          if (
            interactionType ===
              'whiteboard' ||
            interactionType ===
              'drawer'
          ) {

            openNextChallenge(
              nearObj
            );

            return;

          }


          /*
           * ===================================================
           * LAYOUT 3 — WATER GALLONS
           * ===================================================
           */

          if (
            layout === 3 &&
            layout3GallonMap[nearObj.id]
          ) {

            openNextChallenge(
              nearObj
            );

            return;

          }


          /*
           * CLUE
           */

          if (
            nearObj.clueId
          ) {

            collectClue(
              nearObj
            );

            return;

          }


          /*
           * FAKE INTERACTION
           */

          setFakeMessage(
            getFakeInteractionMessage(
              nearObj.id
            )
          );

        }

      };


    const up =
      (
        event: KeyboardEvent
      ) => {

        const key =
          event.key.toLowerCase();

        setKeys(
          (value) => ({
            ...value,
            [key]: false,
          })
        );

      };


    const blur =
      () => {

        setKeys({});

      };


    window.addEventListener(
      'keydown',
      down
    );

    window.addEventListener(
      'keyup',
      up
    );

    window.addEventListener(
      'blur',
      blur
    );


    return () => {

      window.removeEventListener(
        'keydown',
        down
      );

      window.removeEventListener(
        'keyup',
        up
      );

      window.removeEventListener(
        'blur',
        blur
      );

    };

  }, [
    challenge,
    fakeMessage,
    passwordOpen,
    nearObj,
    transitioning,
    layout,
    teacherDeskUnlocked,
    openNextChallenge,
    getInteractionType,
    collectClue,
    getFakeInteractionMessage,
  ]);


  /*
   * =========================================================
   * MOVEMENT LOOP
   * =========================================================
   */

  useEffect(() => {

    let animationFrame = 0;


  
const updateMovement = () => {
  let dx = 0;
  let dy = 0;

  if (keys.arrowup) {
    dy -= SPEED;
  }

  if (keys.arrowdown) {
    dy += SPEED;
  }

  if (keys.arrowleft) {
    dx -= SPEED;
  }

  if (keys.arrowright) {
    dx += SPEED;
  }

  const isMoving = dx !== 0 || dy !== 0;



        setWalking(
          isMoving
        );


        if (
          dx < 0
        ) {

          setDirection(
            'left'
          );

        } else if (
          dx > 0
        ) {

          setDirection(
            'right'
          );

        } else if (
          dy < 0
        ) {

          setDirection(
            'up'
          );

        } else if (
          dy > 0
        ) {

          setDirection(
            'down'
          );

        }


        if (
          isMoving &&
          !challenge &&
          !fakeMessage &&
          !passwordOpen &&
          !transitioning
        ) {

          tryMove(
            dx,
            dy
          );

        }


        animationFrame =
          requestAnimationFrame(
            updateMovement
          );

      };


    animationFrame =
      requestAnimationFrame(
        updateMovement
      );


    return () => {

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, [
    keys,
    tryMove,
    challenge,
    fakeMessage,
    passwordOpen,
    transitioning,
  ]);


  /*
   * =========================================================
   * WALKING ANIMATION
   * =========================================================
   */

  useEffect(() => {

    if (!walking) {

      setFrame(
        0
      );

      return;

    }


    const timer =
      window.setInterval(
        () => {

          setFrame(
            (current) =>
              current === 0
                ? 1
                : 0
          );

        },
        150
      );


    return () => {

      window.clearInterval(
        timer
      );

    };

  }, [
    walking,
  ]);


  /*
   * =========================================================
   * ROOM TRANSITIONS
   * =========================================================
   */

  useEffect(() => {

    if (
      transitioning
    ) {

      return;

    }


    /*
     * LAYOUT 1 → 2
     */

    if (
      layout === 1 &&
      currentLayoutCompleted &&
      pos.x < 12 &&
      pos.y > 82
    ) {

      setTransitioning(
        true
      );

      window.setTimeout(
        () => {

          setLayout(
            2
          );

          setPos({
            x: 50,
            y: 75,
          });

          setDirection(
            'up'
          );

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setFeedback(
            null
          );

          setFakeMessage(
            null
          );

          setPasswordOpen(
            false
          );

          setPasswordInput(
            ''
          );

          setKeys({});

          setWalking(
            false
          );

          setFrame(
            0
          );

          setTransitioning(
            false
          );

        },
        700
      );

      return;

    }


    /*
     * LAYOUT 2 → 3
     */

    if (
      layout === 2 &&
      currentLayoutCompleted &&
      pos.x < 12 &&
      pos.y > 82
    ) {

      setTransitioning(
        true
      );

      window.setTimeout(
        () => {

          setLayout(
            3
          );

          setPos({
            x: 50,
            y: 82,
          });

          setDirection(
            'up'
          );

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setFeedback(
            null
          );

          setFakeMessage(
            null
          );

          setPasswordOpen(
            false
          );

          setPasswordInput(
            ''
          );

          setKeys({});

          setWalking(
            false
          );

          setFrame(
            0
          );

          setTransitioning(
            false
          );

        },
        700
      );

      return;

    }


    /*
     * LAYOUT 3 → 4
     */

    if (
      layout === 3 &&
      currentLayoutCompleted &&
      pos.x > 42 &&
      pos.x < 58 &&
      pos.y < 18
    ) {

      setTransitioning(
        true
      );

      window.setTimeout(
        () => {

          setLayout(
            4
          );

          setPos({
            x: 19,
            y: 40,
          });

          setDirection(
            'down'
          );

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setFeedback(
            null
          );

          setFakeMessage(
            null
          );

          setPasswordOpen(
            false
          );

          setPasswordInput(
            ''
          );

          setKeys({});

          setWalking(
            false
          );

          setFrame(
            0
          );

          setTransitioning(
            false
          );

        },
        700
      );

      return;

    }


    /*
     * LAYOUT 4 → 3
     */

    if (
      layout === 4 &&
      currentLayoutCompleted &&
      pos.x >= 12 &&
      pos.x <= 29 &&
      pos.y >= 29 &&
      pos.y <= 32
    ) {

      setTransitioning(
        true
      );

      window.setTimeout(
        () => {

          setLayout(
            3
          );

          setPos({
            x: 50,
            y: 20,
          });

          setDirection(
            'down'
          );

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setFeedback(
            null
          );

          setFakeMessage(
            null
          );

          setPasswordOpen(
            false
          );

          setPasswordInput(
            ''
          );

          setKeys({});

          setWalking(
            false
          );

          setFrame(
            0
          );

          setTransitioning(
            false
          );

        },
        700
      );

      return;

    }

  }, [
    pos.x,
    pos.y,
    layout,
    transitioning,
    currentLayoutCompleted,
  ]);


  /*
   * =========================================================
   * FINISH GAME
   * =========================================================
   */

  useEffect(() => {

    if (
      layout === 4 &&
      currentLayoutCompleted
    ) {

      setFinished(
        true
      );

    }

  }, [
    layout,
    currentLayoutCompleted,
  ]);


  /*
   * =========================================================
   * CONTINUE TO WHITEBOARD QUESTIONS
   * =========================================================
   */

  const continueToWhiteboardQuestions =
    useCallback(() => {

      const firstQuestion =
        whiteboardChallenges.find(
          (challengeItem) =>
            !solved.includes(
              challengeItem.id
            )
        );


      if (!firstQuestion) {
        return;
      }


      setChallenge(
        firstQuestion.id
      );

      setChoice(
        null
      );

      setShortAnswer(
        ''
      );

      setFeedback(
        null
      );

    }, [
      whiteboardChallenges,
      solved,
    ]);


  /*
   * =========================================================
   * SUBMIT CHALLENGE
   * =========================================================
   */

 const submit =
  useCallback(() => {

    if (!currentChallenge) {
      return;
    }


    /*
     * =====================================================
     * SHORT ANSWER
     * =====================================================
     */

    if (
      currentChallenge.type ===
      'short-answer'
    ) {

      const userAnswer =
        shortAnswer
          .trim()
          .toLowerCase();

      const correctAnswer =
        String(currentChallenge.answer)
        .trim()
        .toLowerCase();


      if (
        userAnswer !==
        correctAnswer
      ) {

        setFeedback(
          'wrong'
        );

        setLives(
          (currentLives) => {

            if (
              currentLives <= 1
            ) {

              setGameOver(
                true
              );

              return 0;

            }

            return currentLives - 1;

          }
        );

        return;

      }

    }


    /*
     * =====================================================
     * FIND THE WRONG WORD
     * =====================================================
     */

    else if (
      currentChallenge.type ===
      'find-error'
    ) {

      const userAnswer =
        shortAnswer
          .trim()
          .toLowerCase();

      const correctAnswer =
        String(currentChallenge.answer)
        .trim()
        .toLowerCase();


      if (
        userAnswer !==
        correctAnswer
      ) {

        setFeedback(
          'wrong'
        );

        setLives(
          (currentLives) => {

            if (
              currentLives <= 1
            ) {

              setGameOver(
                true
              );

              return 0;

            }

            return currentLives - 1;

          }
        );

        return;

      }

    }


    /*
     * =====================================================
     * WORD SCRAMBLE
     * =====================================================
     */

    else if (
      currentChallenge.type ===
      'word-scramble'
    ) {

      if (
        scrambleOrder.length === 0
      ) {

        return;

      }


      const options =
        currentChallenge.options ?? [];


      const userAnswer =
        scrambleOrder
          .map(
            (index) =>
              options[index]
          )
          .join(' ')
          .trim()
          .replace(/\s+/g, ' ')
          .replace(/[.,!?;:]+$/g, '')
          .toLowerCase();


      const correctAnswer =
        String(
          currentChallenge.answer
        )
          .trim()
          .replace(/\s+/g, ' ')
          .replace(/[.,!?;:]+$/g, '')
          .toLowerCase();


      if (
        userAnswer !==
        correctAnswer
      ) {

        setFeedback(
          'wrong'
        );

        setLives(
          (currentLives) => {

            if (
              currentLives <= 1
            ) {

              setGameOver(
                true
              );

              return 0;

            }

            return currentLives - 1;

          }
        );

        return;

      }

    }


    /*
     * =====================================================
     * HANGMAN
     * =====================================================
     */

    else if (
      currentChallenge.type ===
      'hangman'
    ) {

      const correctAnswer =
        String(currentChallenge.answer)
        .trim()
        .toLowerCase();


      const answerLetters =
        correctAnswer
          .replace(
            /[^A-Z]/g,
            ''
          );


      const hasAllLetters =
        answerLetters
          .split('')
          .every(
            (letter) =>
              hangmanGuessedLetters.includes(
                letter
              )
          );


      if (
        !hasAllLetters
      ) {

        return;

      }

    }


    /*
     * =====================================================
     * MULTIPLE CHOICE
     * =====================================================
     */

    else if (
      currentChallenge.type ===
      'multiple-choice'
    ) {

      if (
        choice === null
      ) {

        return;

      }


      const selectedAnswer =
        String(
          choice
        );

      const correctAnswer =
        String(
          currentChallenge.answer
        );


      if (
        selectedAnswer !==
        correctAnswer
      ) {

        setFeedback(
          'wrong'
        );

        setLives(
          (currentLives) => {

            if (
              currentLives <= 1
            ) {

              setGameOver(
                true
              );

              return 0;

            }

            return currentLives - 1;

          }
        );

        return;

      }

    }


    /*
     * =====================================================
     * OTHER / FALLBACK CHALLENGE
     * =====================================================
     */

    else {

      if (
        choice === null
      ) {

        return;

      }


      const selectedAnswer =
        String(
          choice
        );

      const correctAnswer =
        String(
          currentChallenge.answer
        );


      if (
        selectedAnswer !==
        correctAnswer
      ) {

        setFeedback(
          'wrong'
        );

        setLives(
          (currentLives) => {

            if (
              currentLives <= 1
            ) {

              setGameOver(
                true
              );

              return 0;

            }

            return currentLives - 1;

          }
        );

        return;

      }

    }


    /*
     * =====================================================
     * CORRECT
     * =====================================================
     */

    setFeedback(
      'correct'
    );


    /*
     * Mark solved
     */

    setSolved(
      (value) => {

        if (
          value.includes(
            currentChallenge.id
          )
        ) {

          return value;

        }


        return [
          ...value,
          currentChallenge.id,
        ];

      }
    );


    /*
     * =====================================================
     * UPDATE LAYOUT 3 GALLON PROGRESS
     * =====================================================
     */

    const gallonMatch =
      currentChallenge.id.match(
        /^l3-water-gallon-([1-3])-(\d+)$/
      );


    if (
      gallonMatch
    ) {

      const gallonNumber =
        Number(
          gallonMatch[1]
        ) as 1 | 2 | 3;

      const questionNumber =
        Number(
          gallonMatch[2]
        );


      setLayout3GallonProgress(
        (previous) => ({
          ...previous,
          [gallonNumber]:
            Math.max(
              previous[gallonNumber],
              questionNumber
            ),
        })
      );

    }


    /*
     * =====================================================
     * IMPORTANT
     *
     * DO NOT MOVE TO THE NEXT QUESTION HERE.
     *
     * The player must click
     * "GO TO NEXT QUESTION".
     * =====================================================
     */

    return;

  }, [
    currentChallenge,
    choice,
    shortAnswer,
    scrambleOrder,
    hangmanGuessedLetters,
  ]);

  const continueToNextChallenge =
  useCallback(() => {

    if (!currentChallenge) {
      return;
    }


    const solvedAfterCurrent =
      solved.includes(
        currentChallenge.id
      )
        ? solved
        : [
            ...solved,
            currentChallenge.id,
          ];


    /*
     * =====================================================
     * WHITEBOARD
     * =====================================================
     */

    if (
      currentChallenge.id.startsWith(
        'layout1-whiteboard-'
      )
    ) {

      const nextWhiteboard =
        whiteboardChallenges.find(
          (challengeItem) =>
            !solvedAfterCurrent.includes(
              challengeItem.id
            )
        );


      if (
        nextWhiteboard
      ) {

        setChallenge(
          nextWhiteboard.id
        );

        setChoice(
          null
        );

        setShortAnswer(
          ''
        );

        setScrambleOrder(
          []
        );

        setHangmanGuessedLetters(
          []
        );

        setFeedback(
          null
        );

        return;

      }


      setChallenge(
        null
      );

      setChoice(
        null
      );

      setShortAnswer(
        ''
      );

      setScrambleOrder(
        []
      );

      setHangmanGuessedLetters(
        []
      );

      setFeedback(
        null
      );

      setFakeMessage(
        'Challenge Complete!\n\nThe next challenge is now unlocked. Go find for it!.'
      );

      return;

    }


    /*
     * =====================================================
     * DRAWER
     * =====================================================
     */

    if (
      currentChallenge.id.startsWith(
        'layout1-drawer-'
      )
    ) {

      const nextDrawer =
        drawerChallenges.find(
          (challengeItem) =>
            !solvedAfterCurrent.includes(
              challengeItem.id
            )
        );


      if (
        nextDrawer
      ) {

        setChallenge(
          nextDrawer.id
        );

        setChoice(
          null
        );

        setShortAnswer(
          ''
        );

        setScrambleOrder(
          []
        );

        setHangmanGuessedLetters(
          []
        );

        setFeedback(
          null
        );

        return;

      }


      setChallenge(
        null
      );

      setChoice(
        null
      );

      setShortAnswer(
        ''
      );

      setScrambleOrder(
        []
      );

      setHangmanGuessedLetters(
        []
      );

      setFeedback(
        null
      );

      setFakeMessage(
        'Challenge Complete!\n\nAll challenges in this room are complete. The next room is now unlocked.'
      );

      return;

    }


    /*
     * =====================================================
     * LAYOUT 3 — GALON SEQUENCE
     * =====================================================
     */

    if (
      currentChallenge.id.startsWith(
        'l3-water-gallon-'
      )
    ) {

      const gallonMatch =
        currentChallenge.id.match(
          /^l3-water-gallon-([1-3])-(\d+)$/
        );


      if (
        gallonMatch
      ) {

        const gallonNumber =
          Number(
            gallonMatch[1]
          ) as 1 | 2 | 3;

        const questionNumber =
          Number(
            gallonMatch[2]
          );


        /*
         * Find next question
         * in the same gallon.
         */

        const nextGallonChallenge =
          activeChallenges.find(
            (challengeItem) =>
              challengeItem.id.startsWith(
                `l3-water-gallon-${gallonNumber}-`
              ) &&
              !solvedAfterCurrent.includes(
                challengeItem.id
              )
          );


        if (
          nextGallonChallenge
        ) {

          setChallenge(
            nextGallonChallenge.id
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setScrambleOrder(
            []
          );

          setHangmanGuessedLetters(
            []
          );

          setFeedback(
            null
          );

          return;

        }


        /*
         * GALLON 1 COMPLETE
         */

        if (
          gallonNumber === 1 &&
          questionNumber === 5
        ) {

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setScrambleOrder(
            []
          );

          setHangmanGuessedLetters(
            []
          );

          setFeedback(
            null
          );

          setFakeMessage(
            'This challenge is over!\n\nAll questions have been completed.\n\nNext challenge is now unlocked.'
          );

          return;

        }


        /*
         * GALLON 2 COMPLETE
         */

        if (
          gallonNumber === 2 &&
          questionNumber === 5
        ) {

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setScrambleOrder(
            []
          );

          setHangmanGuessedLetters(
            []
          );

          setFeedback(
            null
          );

          setFakeMessage(
            'This challenge is over!\n\nAll questions have been completed.\n\nNext challenge is now unlocked.'
          );

          return;

        }


        /*
         * GALLON 3 COMPLETE
         */

        if (
          gallonNumber === 3 &&
          questionNumber === 5
        ) {

          setChallenge(
            null
          );

          setChoice(
            null
          );

          setShortAnswer(
            ''
          );

          setScrambleOrder(
            []
          );

          setHangmanGuessedLetters(
            []
          );

          setFeedback(
            null
          );

          setFakeMessage(
            'This chaallenge is over!\n\nAll questions have been completed.\n\nAll challenges are complete. The next room is now unlocked.'
          );

          return;

        }

      }

    }


    /*
     * =====================================================
     * OTHER LAYOUTS
     * =====================================================
     */

    const nextQuestion =
      activeChallenges.find(
        (challengeItem) =>
          !solvedAfterCurrent.includes(
            challengeItem.id
          )
      );


    if (
      nextQuestion
    ) {

      setChallenge(
        nextQuestion.id
      );

      setChoice(
        null
      );

      setShortAnswer(
        ''
      );

      setScrambleOrder(
        []
      );

      setHangmanGuessedLetters(
        []
      );

      setFeedback(
        null
      );

      return;

    }


    /*
     * =====================================================
     * NO MORE QUESTIONS
     * =====================================================
     */

    setChallenge(
      null
    );

    setChoice(
      null
    );

    setShortAnswer(
      ''
    );

    setScrambleOrder(
      []
    );

    setHangmanGuessedLetters(
      []
    );

    setFeedback(
      null
    );

  }, [
    currentChallenge,
    solved,
    activeChallenges,
    whiteboardChallenges,
    drawerChallenges,
  ]);


  /*
   * =========================================================
   * FINISHED SCREEN
   * =========================================================
   */

  /*
 * =========================================================
 * GAME OVER SCREEN
 * =========================================================
 */

if (gameOver) {

  return (

    <main className="game-shell fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black p-6">

      <div className="panel w-full max-w-2xl p-10 text-center">

        <div className="text-4xl font-black text-red-400">

          GAME OVER

        </div>


        <div className="mt-5 text-xl font-black text-white">

          YOU RAN OUT OF LIVES.

        </div>


        <p className="mt-5 text-sm leading-relaxed text-slate-400">

          Your healthcare English journey
          has ended.

          <br />

          Start again from Layout 1
          and try your best!

        </p>


        <div className="mt-6 text-3xl">

          ♡ ♡ ♡

        </div>


        <button
          type="button"
          className="retro-btn mt-7 px-8 py-4 text-sm font-black"
          onClick={resetGame}
        >

          RESTART GAME

        </button>

      </div>

    </main>

  );

}


/*
 * =========================================================
 * FINISHED SCREEN
 * =========================================================
 */

  if (finished) {

    return (

      <main className="game-shell fixed inset-0 z-50 flex min-h-screen items-center justify-center p-6">

        <div className="panel max-w-2xl p-10 text-center">

          <div className="text-3xl font-black text-yellow-200">

            CONGRATULATIONS!

          </div>

          <div className="mt-5 text-xl font-black text-cyan-200">

            YOU HAVE COMPLETED THE HEALTHCARE ENGLISH CHALLENGE.

          </div>

          <p className="mt-5 text-sm text-slate-400">

            You explored all four layouts
            and completed all healthcare
            English challenges.

          </p>

          <button
            className="retro-btn mt-7 px-5 py-3"
            onClick={() =>
              location.reload()
            }
          >

            PLAY AGAIN

          </button>

        </div>

      </main>

    );

  }


  /*
   * =========================================================
   * MAIN GAME
   * =========================================================
   */

  return (

    <main className="game-shell fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden">
      {isPortrait && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#111820] p-6 text-center text-white md:hidden">
    <div className="max-w-sm">
      <div className="mb-5 text-5xl">📱 ↻</div>

      <h1 className="text-xl font-black text-cyan-300">
        PLEASE ROTATE YOUR PHONE
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        Rotate your phone to landscape for a better experience.
      </p>
    </div>
  </div>
)}

      <div className="flex h-full w-full items-center justify-center">

        <div className="relative aspect-[4/3] h-[100vh] max-h-screen w-auto max-w-screen overflow-hidden border-4 border-[#20272e] bg-[#59606a] shadow-2xl">

       <HUD lives={lives} />
          {/* =================================================
              ROOM
              ================================================= */}

          <Room
            roomObjects={
              visibleObjects
            }

            nearId={
              nearObj?.id ?? null
            }

            collected={
              new Set(
                collectedClues
              )
            }

            onInteract={
              (object) => {

                if (
                  !object.interactive ||
                  challenge ||
                  fakeMessage ||
                  passwordOpen ||
                  transitioning
                ) {

                  return;

                }


                const interactionType =
                  getInteractionType(
                    object
                  );


                /*
                 * TEACHER DESK
                 */

                if (
                  layout === 2 &&
                  interactionType ===
                    'teacher-desk'
                ) {

                  if (
                    teacherDeskUnlocked
                  ) {

                    openNextChallenge(
                      object
                    );

                    return;

                  }


                  setPasswordInput(
                    ''
                  );

                  setPasswordOpen(
                    true
                  );

                  return;

                }


                /*
                 * WHITEBOARD / DRAWER
                 */

                if (
                  interactionType ===
                    'whiteboard' ||
                  interactionType ===
                    'drawer'
                ) {

                  openNextChallenge(
                    object
                  );

                  return;

                }


                /*
                 * =================================================
                 * LAYOUT 3 — WATER GALLONS
                 * =================================================
                 */

                if (
                  layout === 3 &&
                  layout3GallonMap[object.id]
                ) {

                  openNextChallenge(
                    object
                  );

                  return;

                }


                /*
                 * CLUE
                 */

                if (
                  object.clueId
                ) {

                  collectClue(
                    object
                  );

                  return;

                }


                /*
                 * FAKE INTERACTION
                 */

                setFakeMessage(
                  getFakeInteractionMessage(
                    object.id
                  )
                );

              }
            }

            layout={
              layout
            }

          />


          {/* =================================================
              DEBUG COLLISION VISUALIZER
              ================================================= */}

          {debugCollision && (

            <div
              className="pointer-events-none absolute inset-0 z-[35]"
              aria-hidden="true"
            >

              {visibleObjects
                .filter(
                  (object) =>
                    object.solid
                )
                .map(
                  (object) => {

                    const isInteractive =
                      object.interactive;

                    const isNear =
                      nearObj?.id ===
                      object.id;


                    return (

                      <div
                        key={
                          `debug-${object.id}`
                        }
                        className={`absolute box-border border-2 ${
                          isNear
                            ? 'border-yellow-300 bg-yellow-300/20'
                            : isInteractive
                              ? 'border-cyan-300 bg-cyan-300/10'
                              : 'border-red-400 bg-red-400/10'
                        }`}
                        style={{
                          left:
                            `${object.x}%`,
                          top:
                            `${object.y}%`,
                          width:
                            `${object.w}%`,
                          height:
                            `${object.h}%`,
                        }}
                      >

                        <div
                          className={`absolute -top-4 left-0 whitespace-nowrap px-1 text-[7px] font-black ${
                            isNear
                              ? 'bg-yellow-300 text-black'
                              : isInteractive
                                ? 'bg-cyan-300 text-black'
                                : 'bg-red-400 text-black'
                          }`}
                        >

                          {object.name}

                          {isNear &&
                            ' [NEAR]'}

                        </div>

                      </div>

                    );

                  }
                )}

            </div>

          )}


          {/* =================================================
              DEBUG HUD
              ================================================= */}

          {debugCollision && (

            <div className="pointer-events-none absolute right-3 top-3 z-[60] border-2 border-yellow-300 bg-black/85 px-3 py-2 text-[9px] font-black text-yellow-200">

              <div>
                COLLISION DEBUG: ON
              </div>

              <div className="mt-1 text-red-300">
                RED = SOLID
              </div>

              <div className="text-cyan-300">
                CYAN = INTERACTIVE
              </div>

              <div className="text-yellow-200">
                YELLOW = NEAREST
              </div>

              <div className="mt-1 text-white">
                PRESS F2 TO HIDE
              </div>

            </div>

          )}


          {/* =================================================
              PLAYER
              ================================================= */}

          <Player
            x={
              pos.x
            }
            y={
              pos.y
            }
            direction={
              direction
            }
            walking={
              walking
            }
            frame={
              frame
            }
          />


          {/* =================================================
              HUD
              ================================================= */}

          <div className="absolute left-3 top-3 z-40 border-2 border-[#20272e] bg-black/75 px-3 py-2 text-[10px] font-black text-white">

            <div>
              LAYOUT {layout}
            </div>

            <div className="mt-1 text-cyan-200">

              CHALLENGES:{' '}
              {solvedInCurrentLayout}/
              {activeChallenges.length}

            </div>

            {!currentLayoutCompleted && (

              <div className="mt-1 text-yellow-200">

                COMPLETE ALL CHALLENGES

              </div>

            )}

            {currentLayoutCompleted &&
              layout < 4 && (

                <div className="mt-1 text-green-300">

                  EXIT UNLOCKED

                </div>

            )}

          </div>

          

{/* MOBILE D-PAD */}
{!challenge && (
  <div
    className="mobile-game-dpad absolute bottom-5 left-4 z-[70] grid grid-cols-3 grid-rows-3 gap-1 select-none md:hidden"
    style={{
      touchAction: 'none',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none',
    }}
    onContextMenu={(event) => {
      event.preventDefault();
    }}
  >
    {/* UP */}
    <button
      type="button"
      aria-label="Move up"
      className="col-start-2 row-start-1 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white/30 bg-[#30363f]/95 text-white active:bg-cyan-500/80"
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        setKeys((value) => ({ ...value, arrowup: true }));
      }}
      onPointerUp={() =>
        setKeys((value) => ({ ...value, arrowup: false }))
      }
      onPointerCancel={() =>
        setKeys((value) => ({ ...value, arrowup: false }))
      }
      onLostPointerCapture={() =>
        setKeys((value) => ({ ...value, arrowup: false }))
      }
    >
      ▲
    </button>

    {/* LEFT */}
    <button
      type="button"
      aria-label="Move left"
      className="col-start-1 row-start-2 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white/30 bg-[#30363f]/95 text-white active:bg-cyan-500/80"
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        setKeys((value) => ({ ...value, arrowleft: true }));
      }}
      onPointerUp={() =>
        setKeys((value) => ({ ...value, arrowleft: false }))
      }
      onPointerCancel={() =>
        setKeys((value) => ({ ...value, arrowleft: false }))
      }
      onLostPointerCapture={() =>
        setKeys((value) => ({ ...value, arrowleft: false }))
      }
    >
      ◀
    </button>

    {/* RIGHT */}
    <button
      type="button"
      aria-label="Move right"
      className="col-start-3 row-start-2 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white/30 bg-[#30363f]/95 text-white active:bg-cyan-500/80"
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        setKeys((value) => ({ ...value, arrowright: true }));
      }}
      onPointerUp={() =>
        setKeys((value) => ({ ...value, arrowright: false }))
      }
      onPointerCancel={() =>
        setKeys((value) => ({ ...value, arrowright: false }))
      }
      onLostPointerCapture={() =>
        setKeys((value) => ({ ...value, arrowright: false }))
      }
    >
      ▶
    </button>

    {/* DOWN */}
    <button
      type="button"
      aria-label="Move down"
      className="col-start-2 row-start-3 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white/30 bg-[#30363f]/95 text-white active:bg-cyan-500/80"
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        setKeys((value) => ({ ...value, arrowdown: true }));
      }}
      onPointerUp={() =>
        setKeys((value) => ({ ...value, arrowdown: false }))
      }
      onPointerCancel={() =>
        setKeys((value) => ({ ...value, arrowdown: false }))
      }
      onLostPointerCapture={() =>
        setKeys((value) => ({ ...value, arrowdown: false }))
      }
    >
      ▼
    </button>
  </div>
)}




          {/* =================================================
              E INTERACTION PROMPT
              ================================================= */}

          {nearObj &&
            !challenge &&
            !fakeMessage &&
            !passwordOpen &&
            !transitioning && (

              
<div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 border-2 border-white-300 bg-black/85 px-5 py-3 text-center text-xs font-black text-white-100 flex flex-col items-center gap-2">

  <span>{nearObj.name}</span>

  <span>Press E to Check</span>

</div>

          )}

          
{/* MOBILE INTERACT BUTTON */}
{!challenge &&
  nearObj &&
  !challenge &&
  !fakeMessage &&
  !passwordOpen &&
  !transitioning && (
    <button
      type="button"
      className="mobile-game-interact absolute bottom-7 right-4 z-[75] flex h-14 w-20 touch-manipulation items-center justify-center border-2 border-yellow-300 bg-black/65 text-[10px] font-black text-yellow-100 shadow-lg active:scale-95 md:hidden"
      onClick={() => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'e',
            bubbles: true,
          })
        );
      }}
    >
      INTERACT
    </button>
  )}


          {/* =================================================
              TEACHER DESK PASSWORD
              ================================================= */}

          {passwordOpen &&
            layout === 2 &&
            !challenge &&
            !transitioning && (

              <div className="absolute inset-0 z-[95] flex items-center justify-center bg-black/70 p-6">

                <div className="w-full max-w-xl border-4 border-[#20272e] bg-[#111820] shadow-2xl">

                  <div className="border-b-4 border-yellow-300 bg-black/80 px-5 py-4">

                    <div className="text-[10px] font-black tracking-widest text-yellow-300">

                      TEACHER DESK

                    </div>

                    <div className="mt-1 text-xl font-black text-white">

                      Find The Clue Hidden in Each Object

                    </div>

                  </div>


                  <div className="px-6 py-8">

                    <div className="border-2 border-slate-600 bg-black/50 p-6">

                      <p className="text-center text-sm font-bold leading-relaxed text-slate-200">

                        A pain or discomfort in the head or forehead. It can be caused by stress, lack of sleep, dehydration, or certain illnesses. The pain may be mild or severe and can make it difficult to concentrate or perform daily activities.

                      </p>


                      <input
                        autoFocus
                        type="text"
                        value={
                          passwordInput
                        }
                        onChange={(
                          event
                        ) =>
                          setPasswordInput(
                            event.target.value
                          )
                        }
                        onKeyDown={(
                          event
                        ) => {

                          if (
                            event.key ===
                            'Enter'
                          ) {

                            event.preventDefault();

                            submitTeacherPassword();

                          }


                          if (
                            event.key ===
                            'Escape'
                          ) {

                            event.preventDefault();

                            setPasswordOpen(
                              false
                            );

                            setPasswordInput(
                              ''
                            );

                          }

                        }}
                        placeholder="ENTER PASSWORD"
                        className="mt-6 w-full border-2 border-cyan-300 bg-black px-4 py-4 text-center text-lg font-black uppercase tracking-widest text-white outline-none placeholder:text-slate-600 focus:border-yellow-300"
                      />

                    </div>


                    <div className="mt-6 flex justify-center gap-3">

                      <button
                        type="button"
                        className="retro-btn px-7 py-3 text-xs font-black"
                        onClick={
                          submitTeacherPassword
                        }
                      >

                        UNLOCK

                      </button>


                      <button
                        type="button"
                        className="border-2 border-slate-500 bg-black px-7 py-3 text-xs font-black text-slate-300"
                        onClick={() => {

                          setPasswordOpen(
                            false
                          );

                          setPasswordInput(
                            ''
                          );

                        }}
                      >

                        CANCEL

                      </button>

                    </div>


                    <div className="mt-5 text-center text-[9px] font-black text-slate-500">

                      PRESS ENTER TO SUBMIT • ESC TO CANCEL

                    </div>

                  </div>

                </div>

              </div>

          )}


          {/* =================================================
              FAKE INTERACTION POPUP
              ================================================= */}

          {fakeMessage &&
            !challenge &&
            !transitioning && (

              <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/60 p-6"
               onClick={() => setFakeMessage(null)}
               >

                <div className="w-full max-w-xl border-4 border-[#20272e] bg-[#111820] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
                >

                  <div className="border-b-4 border-cyan-300 bg-black/80 px-5 py-4">

                    <div className="text-[10px] font-black tracking-widest text-cyan-300">

                      INTERACTION

                    </div>

                    <div className="mt-1 text-xl font-black text-white">

                      {nearObj?.name ??
                        'OBJECT'}

                    </div>

                  </div>


                  <div className="px-6 py-8">

                    <div className="border-2 border-slate-600 bg-black/50 p-6 text-center">

                      <p className="whitespace-pre-line text-base font-bold leading-relaxed text-slate-100">

                        {fakeMessage}

                      </p>

                    </div>


                    <div className="mt-6 text-center text-[10px] font-black text-slate-400">

                      PRESS ESC TO CLOSE

                    </div>


                    <div className="mt-4 flex justify-center">

                      <button
                        type="button"
                        className="retro-btn px-8 py-3 text-xs font-black"
                        onClick={() =>
                          setFakeMessage(
                            null
                          )
                        }
                      >

                        CLOSE

                      </button>

                    </div>

                  </div>

                </div>

              </div>

          )}


          {/* =================================================
              LOCKED EXIT MESSAGE
              ================================================= */}

          {(
            (
              layout === 1 &&
              pos.x < 12 &&
              pos.y > 82 &&
              !currentLayoutCompleted
            ) ||

            (
              layout === 2 &&
              pos.x < 12 &&
              pos.y > 82 &&
              !currentLayoutCompleted
            ) ||

            (
              layout === 3 &&
              pos.x > 42 &&
              pos.x < 58 &&
              pos.y < 18 &&
              !currentLayoutCompleted
            ) ||

            (
              layout === 4 &&
              pos.x >= 12 &&
              pos.x <= 29 &&
              pos.y >= 29 &&
              pos.y <= 32 &&
              !currentLayoutCompleted
            )
          ) && (

            <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 border-2 border-red-400 bg-black/85 px-5 py-3 text-center text-xs font-black text-red-200">

              NEXT ROOM LOCKED

              <div className="mt-1 text-[9px] text-white">

                COMPLETE ALL CHALLENGES FIRST

              </div>

            </div>

          )}


          {/* =================================================
              ROOM TRANSITION
              ================================================= */}

          {transitioning && (

            <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/70">

              <div className="text-center">

                <div className="text-2xl font-black text-yellow-200">

                  ENTERING NEXT ROOM...

                </div>

                <div className="mt-2 text-xs text-slate-300">

                  {layout < 4
                    ? `Room ${layout + 1}`
                    : 'RETURNING'}

                </div>

              </div>

            </div>

          )}


          {/* =================================================
              REAL CHALLENGE MODAL
              ================================================= */}

          {challenge &&
            currentChallenge && (

              <ChallengeModal

                challenge={
                  currentChallenge
                }

                index={
                  activeChallenges.findIndex(
                    (
                      challengeItem
                    ) =>
                      challengeItem.id ===
                      currentChallenge.id
                  ) + 1
                }

                total={
                  activeChallenges.length
                }

                choice={
                  choice
                }

                setChoice={
                  setChoice
                }

                shortAnswer={
                  shortAnswer
                }

                setShortAnswer={
                  setShortAnswer
                }

                scrambleOrder={
                  scrambleOrder
                }
                
                setScrambleOrder={
                  setScrambleOrder
                }

                hangmanGuessedLetters={
                  hangmanGuessedLetters
                }

                setHangmanGuessedLetters={
                  setHangmanGuessedLetters
                }

                onWrongHangmanGuess={() => {
                  setLives((currentLives) => {
                  if (currentLives <= 1) {
                  setGameOver(true);
                  return 0;
                }

                return currentLives - 1;
                   });
                }}

                onSubmit={
                  submit
                }

                onContinue={
                  continueToNextChallenge
                }

                feedback={
                  feedback
                }

                onClose={() => {

                  setChallenge(
                    null
                  );

                  setChoice(
                    null
                  );

                  setShortAnswer(
                    ''
                  );

                  setFeedback(
                    null
                  );

                }}

              />

            )}

        </div>

      </div>

    </main>

  );

}